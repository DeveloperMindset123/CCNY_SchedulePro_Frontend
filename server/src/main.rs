#[macro_use]
extern crate rocket;
/// https://api.rocket.rs/v0.5/rocket/form/struct.Form
use rocket::form::Form;
use rocket::form::FromForm;
use rocket::serde::json::Json;
use rocket::fs::{relative, FileServer};
use rocket::response::stream::{Event, EventStream};
use rocket::serde::{Deserialize, Serialize};
use rocket::tokio::sync::broadcast::{channel, error::RecvError, Sender};
use rocket::{Shutdown, State};
use rocket::tokio::select;

/// @see https://api.rocket.rs/v0.4/rocket/attr.post --> explains in-depth how routing logic works
///
/// Note the following in rust
///
/// &str : use for immutable strings, since reference strings CANNOT be modified
///
/// String : use for mutable strings, since owned strings CAN be modified
///
/// @Shutdown : manually closes down the server (according to the docs, in a "graceful manner")
///
/// Potential implemenation logic
/// one api endpoint for sending
/// The room number needs to be generated on the frontend side
/// while packet is being constructed
/// the list of currently open channels needs to be stored in a hashset
///
///
/// and we need to search and check if the newly generated room number already exists within the hashset, if so, we need to generate a new room number. (@see https://api.rocket.rs/v0.5/rocket_ws/struct.WebSocket#method.channel --> explains how potential websocket can be implemented)
///
/// the source and destination should be connected via socket ports --> websocket portion of rocket will handle this
///
/// we will need to register the sockets via the room two distinct users are occupying
/// we will need to setup websocket based communication.
/// example of how a "get" router will be defined
/// define the structure of the message
#[derive(Debug, Clone, FromForm, Serialize, Deserialize)]
#[cfg_attr(test, derive(PartialEq, UriDisplayQuery))]
#[serde(crate = "rocket::serde")]

/// NOTE
/// when we broadcast the message
/// we will look for the subscriber whose room value matches the current broadcast
/// the room will be attached via a hashmap
/// the hashmap will contain the key as the room number
/// and the value as the (sender, reciever) in the form of tuples
/// when initiating conversation
struct Message {
    // @see https://api.rocket.rs/master/rocket/form/validate/fn.len
    //
    // this is a type of form validator
    #[field(validate = len(1..20))]
    // chat rooms should be uniquely generated and distinguishable
    // should be different per user
    pub room: String,
    // we need a method to distinguish users
    #[field(validate = len(1..50))]
    pub user_email: String,
    // define the id of the reciever
    // that should be attached to the message struct
    // the reciever address will be attached to the message
    // the sender will also be attached to the address
    // to help distinguish
    // a sequence number can also be used to keep track of the current number of message that has been sent
    pub sender : String,
    pub reciever : String,
    pub sequenceNumber : u32,
    pub message: String,
}

/// this is just an example code
/// Go to http://localhost:8000, and this message will be displayed
/// TODO : Remove later once basic functionality has been implemented
#[get("/")]
fn hello() -> &'static str {
    "This is the basic API route"
}

/// @see https://api.rocket.rs/v0.5/rocket/struct.Shutdown
/// Call on this endpoint at the end of each message execution
///
/// NOTE : if you want to define api endpoints with queries, note the following syntax below
/// The syntax also shows how dynamic api placeholder values can be made
/// "/some_api_endpoint/<dynamicVal1>/<dynamicVal2>?<queryParam1>&<queryParam2>"
///
/// For additional reference, see the following link below:
/// @see https://www.youtube.com/watch?v=2vxvSMkm5Lg&t=433s
///

// example showing how dynamic api endpoint can be implement
// also shows how to make query params either required or optional
// for general reference
// use &str if no string manipulations needs to be done
// otherwise use String
// in this case, msg is required query parameter
// msg2 is an optional query parameter
// thus we wrap it around Option wrapper
#[get("/dynamic_endpoint/<placeholder1>/<placeholder2>?<msg>&<msg2>")]
fn handle_dynamic_routes(placeholder1: &str, placeholder2: &str, msg: &str, msg2: Option<&str>) {
    // not sure what to implement here at this point
    println!("{}", placeholder1);
}

/// manually shuts down the server side
#[get("/shudown")]
fn shutdown(shutdown: Shutdown) -> &'static str {
    shutdown.notify();
    "Shutting down..."
}


/// define the API endpoint for event broadcasting to the particular reciever
/// the API endpoint will be dynamic
/// events returns an infinite stream of events
#[get("/events/<reciever>")]
async fn events(reciever : &str, queue : &State<Sender<Message>>, mut end : Shutdown) -> EventStream![] {
    // this will attach a subscriptor
    // think of broadcast channel as a network
    // and network is interconnected devices linked together
    // whereas the subscriptor are the devices within a network
    // subscriptor wait to recieve messages that has been broadcasted by a certain device
    // the device broadcast the message and the device(s) that are reigstered as a subscriptor
    let mut rx = queue.subscribe();
    EventStream! {
        loop {
            // the select! macro in Rust's tokio library allows you to wait on multiple asynchronous operations simultaneously

            // proceeding with the first one that becomes ready

            // allows for us to handle "multiple futures concurrently"

            // what do we mean by "multiple futures concurrently" --> In rust, "futures" are a way to represent values that may not be available yet
            let msg = select! {

                // match in rust is simlar to
                // switch statement
                // and instead of case
                // match contains "arms"
                // and supports wider range of concepts
                msg = rx.recv() => match msg {
                  // in the event that
                    Ok(msg) => msg,
                    Err(RecvError::Closed) => break,
                    Err(RecvError::Lagged(_)) => continue,
                },
                _ = &mut end => break,
            };

            // returns the message in JSON format
            println!("Message sent successfully!");
            yield Event::json(&msg);
        }
    }
}

// below is a test route to check if the endpoints are working as intended
#[derive(FromForm)]
struct User<'r> {
    id : u8,
    name: &'r str,
    // metadata: Json<Metadata>
}

// TESTED and worked
// implcit type definition to reduce likelihood of errors
#[get("/users/<id>")]
fn user(id: u8) {
  // @see https://stackoverflow.com/questions/63477161/how-can-i-return-json-from-a-rust-rocket-http-endpoint

  // following syntax below explains how we can pass data based on structs we have previously defined
  // performs in-place modification
  Json(User {
    id : id,
    name : "Ayan"
  });
  // println!("{:#?}", userData);
  // return "Success";
}
// recieve a message from a form submission and broadcast it to any recievers
// TODO : broadcast or send directly by first determining the two users within a particular chatroom?
// the T = Message, where T is a generic type placeholder


// NOTE : we may need to wrap this around a JSON instead of Form
#[post("/message_send", format="json", data = "<form>")]
fn post(form: Form<Message>, queue: &State<Sender<Message>>) {
    // A send "fails" if there are no active subscribers
    // that is okay
    // @see https://api.rocket.rs/v0.5/rocket/form/struct.Form#method.into_inner
    //
    // consumes the self and returns the inner value
    let _res = queue.send(form.into_inner());

    // unpack the values from the form as needed
    // into_inner() also allows us to gain ownership
    // let data = form.into_inner();
    // let room_number = data.room;
    // let user_email = data.user_email;

    // because format! generally doesn't return anything
    // so using println! to check what I get back on the server
    format!("The response is {:#?}", _res);
    println!("The response is {:#?}", _res);

    // // additional print statements to test
    // println!("The data extracted is : {:#?}", data);
    // println!("The room number from extracted data is : {:#?}", room_number);
    // println!("The email from extracted data is : {:?}", user_email);
}

// #[post("/test_submission")]
// the return type is automatically inferrred when set to _
// #[launch] indicates function to execute when server starts
#[launch]
fn rocket() -> _ {
    // the launch function returns an instance of
    // Rocket<Build> from a function named rocket
    // routes parameter takes in an array of values
    // specifies the type for the channel
    // to be of the same as the struct we have defined
    // the .build() method creates a new Rocket application using the default configuration provider

    // the routes! macro takes in array containing information
    // regarding each of the functions corresponding to the routes
    // "/chat" specifies the base url
    // in this case, that would be http://localhost:8000/chat/message_send for example --> this post method will contain the JSON data as the payload.
    rocket::build().manage(channel::<Message>(1024).0).mount("/chat", routes![post, events, shutdown, hello, user])
}

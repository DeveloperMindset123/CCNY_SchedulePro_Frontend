#[macro_use]
extern crate rocket;
/// https://api.rocket.rs/v0.5/rocket/form/struct.Form
use rocket::form::Form;
use std::option::Option;
use rocket::form::FromForm;
use rocket::serde::json::{Json, Value};
use rocket::fs::{relative, FileServer};
use rocket::response::stream::{Event, EventStream};
use rocket::serde::{Deserialize, Serialize, json};
use rocket::tokio::sync::broadcast::{channel, error::RecvError, Sender};
use rocket::{Shutdown, State};
use rocket::tokio::select;
// @see https://www.youtube.com/watch?v=Alyr-JN2pdQ&t=214s --> refernece video
// library to make server side API calls using reqwest
use reqwest::Client;

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
///
/// derive provides basic behavior for traits
#[derive(Debug, Clone, FromForm, Serialize, Deserialize)]
#[cfg_attr(test, derive(PartialEq, UriDisplayQuery))]
#[serde(crate = "rocket::serde")]
struct Message {
    // @see https://api.rocket.rs/master/rocket/form/validate/fn.len
    #[field(validate = len(1..20))]
    pub room: String,
    #[field(validate = len(1..50))]
    pub user_email: String,
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

#[get("/dynamic_endpoint/<placeholder1>/<placeholder2>?<msg>&<msg2>")]
fn handle_dynamic_routes(placeholder1: &str, placeholder2: &str, msg: &str, msg2: Option<&str>) {
    // not sure what to implement here at this point
    // if a parameter is marked as optional using Option
    // then you must wrap the datatype around using Option<datatype_name>
    println!("{}, {}, {}, {:?}", placeholder1, placeholder2, msg, Some(msg2));
}

#[get("/shudown")]
fn shutdown(shutdown: Shutdown) -> &'static str {
    shutdown.notify();
    "Shutting down..."
}

#[get("/events/<reciever>")]
async fn events(reciever : &str, queue : &State<Sender<Message>>, mut end : Shutdown) -> EventStream![] {
    let mut rx = queue.subscribe();
    EventStream! {
        loop {
            let msg = select! {
                msg = rx.recv() => match msg {
                    Ok(msg) => msg,
                    Err(RecvError::Closed) => break,
                    Err(RecvError::Lagged(_)) => continue,
                },
                _ = &mut end => break,
            };

            println!("Message sent successfully!");
            yield Event::json(&msg);
        }
    }
}
// #[derive()] is used to attach specific implementation of traits in rust (default definition, can be modified as needed)
// Debug : allows us to print this struct out via console

#[derive(Serialize, Deserialize, Debug)]
#[serde(crate="rocket::serde")]
struct User {
    id : u8,
    name : String,
}

// pass in the struct as the data
// first test with basic api endpoint
// because the goal is to return json data
// the return datatype needs to be wrapped around Json(data)
// example code to show how data can be returned in json format
#[get("/users")]
fn user() -> Json<User> {
  let data = User {
    id : 4,
    name : "Ayan".to_string()
  };

  let string = json::to_string(&data).unwrap();
  let data : User = json::from_str(&string).unwrap();
  println!("{:?}", data);
  Json(data)
}


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


// define the function we can use to make our api calls
// 2 parameters accepted
async fn make_api_calls(client : &Client, apiEndpoint : &str) -> Result<Value, reqwest::Error> {
  // we can format the url using the format!() macro
  // the return type will either be successful (Value) or result in an error that will be "containerized"
  let endpoint_url = format!("http://localhost:8000/{apiEndpoint}");
  let response = client.get(&endpoint_url).send().await?;

  // convert the response into json data format
  let result_value = response.json::<Value>().await?;
  // explicit return
  Ok(result_value)

}

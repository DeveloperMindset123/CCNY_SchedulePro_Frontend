#[macro_use]
extern crate rocket;
/// https://api.rocket.rs/v0.5/rocket/form/struct.Form
use rocket::form::Form;
use std::option::Option;
use rocket::form::FromForm;
use rocket::serde::json::Value;
use rocket::serde::{Deserialize, Serialize, json::Json};
use rocket::fs::{relative, FileServer};
use rocket::response::stream::{Event, EventStream};
// use rocket::serde::{Deserialize, Serialize, json};
use rocket::tokio::sync::broadcast::{channel, error::RecvError, Sender};
use rocket::{Shutdown, State};
use rocket::tokio::select;
// use rocket::request::Form;
// @see https://www.youtube.com/watch?v=Alyr-JN2pdQ&t=214s --> refernece video
// library to make server side API calls using reqwest
use reqwest::Client;

mod utils;

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

#[derive(Deserialize, Debug)]
#[serde(crate = "rocket::serde")]
struct Task<'r> {
    desciption : &'r str,
    complete: bool
}
// handler function name
// MUST match the name of the api route

/// note the following is how the API call needs to be made
/// POST http://localhost:8000/chat/todo
/// Content-Type:application/json
//  pass in payload
/// { "desciption" : "Some random description", "complete" : true }
/// we need to wrap the struct around Json so that it can take in
#[post("/todo", data = "<task>")]
fn new(task : Json<Task<'_>>) {
  // outputs the following when I print it out:

// creates a wrapper around the struct that is Json type
//   Json(
//     Task {
//         desciption: "Some random description",
//         complete: true,
//     },
// )
    println!("{:#?}", &task);
    utils::get_datatype(&task);
    // let unwrap_data = json::to_string(&task).unwrap();
    // println!("{:?}", unwrap_data);

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
    rocket::build().manage(channel::<Message>(1024).0).mount("/chat", routes![post, events, shutdown, new])
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

#[allow(unused_imports)]
#[allow(dead_code)]
#[allow(unused_variables)]
#[macro_use] extern crate rocket;
#[cfg(test)] mod test;
// use std::borrow::Cow;
// use rocket::tokio::sync::Mutex;
// use rocket::serde::json::json;
// use rocket::form::Form;
// use std::option::Option;
// use rocket::form::FromForm;
// use rocket::serde::json::Value;
// use rocket::serde::{Deserialize, Serialize, json::Json};
// use rocket::serde::json;
// use rocket::fs::{relative, FileServer};
// use rocket::response::stream::{Event, EventStream};
// use rocket::tokio::sync::broadcast::{channel, error::RecvError, Sender};
// use rocket::{Shutdown, State};
// use rocket::tokio::select;
// use reqwest::Client;
use rocket::serde::json::{json, Value};
use rocket::{State, Shutdown};
use rocket::fs::{relative, FileServer};
use rocket::form::Form;
use rocket::response::stream::{EventStream, Event};
use rocket::serde::{Serialize, Deserialize};
use rocket::tokio::sync::broadcast::{channel, Sender, error::RecvError};
use rocket::tokio::select;
mod utils;

// type Id = usize;
// type MessageList = Mutex<Vec<String>>;
// type Messages<'r> = &'r State<MessageList>;   // nested type alias

/// only primary modification has been made to Message
// #[derive(Debug, Clone, FromForm, Serialize, Deserialize)]
// #[cfg_attr(test, derive(PartialEq, UriDisplayQuery))]
// #[serde(crate = "rocket::serde")]
// struct Message {
//     #[field(validate = len(1..20))]
//     pub room: String,
//     #[field(validate = len(1..50))]
//     pub user_email: String,
//     pub sender : String,
//     pub reciever : String,
//     // TODO : uncomment later
//     // pub sequenceNumber : u32,

//     #[field(validate=len(1..300))]
//     pub message: String,
// }

#[derive(Debug, Clone, FromForm, Serialize, Deserialize)]
#[cfg_attr(test, derive(PartialEq, UriDisplayQuery))]
#[serde(crate = "rocket::serde")]
struct Message {
    #[field(validate = len(2..30))]
    pub room: String,

    #[field(validate = len(2..20))]
    pub user_email: String,
    pub message: String,
}

// #[get("/dynamic_endpoint/<placeholder1>/<placeholder2>?<msg>&<msg2>")]
// fn handle_dynamic_routes(placeholder1: &str, placeholder2: &str, msg: &str, msg2: Option<&str>) {
//     // not sure what to implement here at this point
//     // if a parameter is marked as optional using Option
//     // then you must wrap the datatype around using Option<datatype_name>
//     println!("{}, {}, {}, {:?}", placeholder1, placeholder2, msg, Some(msg2));
// }

#[get("/shudown")]
fn shutdown_custom(shutdown: Shutdown) -> &'static str {
    shutdown.notify();
    "Shutting down..."
}

/// recieve a message from a form submission and broadcast it to any recievers
/// /events/<reciever> originally
#[get("/chat/events")]
async fn events(
  queue : &State<Sender<Message>>, mut end : Shutdown) -> EventStream![] {
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

            // println!("Message sent successfully!");
            yield Event::json(&msg);
        }
    }
}

#[post("/chat/message", data = "<form>")]
fn post(form: Form<Message>, queue: &State<Sender<Message>>) {
    let _res = queue.send(form.into_inner());

    // format!("The response is {:#?}", _res);
    println!("The response is {:#?}", _res);
}

// handles HTTP 404 code, returns this messages
#[catch(404)]
fn not_found() -> Value {
  json!({
    "status" : "error",
    "reason" : "Resource was not found."
  })
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
    rocket::build().manage(channel::<Message>(1024).0).mount("/", routes![post,
    events,
    shutdown_custom
    ])
}


// // define the function we can use to make our api calls
// // 2 parameters accepted
// async fn make_api_calls(client : &Client, apiEndpoint : &str) -> Result<Value, reqwest::Error> {
//   // we can format the url using the format!() macro
//   // the return type will either be successful (Value) or result in an error that will be "containerized"
//   let endpoint_url = format!("http://localhost:8000/{apiEndpoint}");
//   let response = client.get(&endpoint_url).send().await?;

//   // convert the response into json data format
//   let result_value = response.json::<Value>().await?;
//   // explicit return
//   Ok(result_value)

// }

/// This file is to be purely used for reference
/// and documentation
/// relevant code is only part of the src directory for backend
/// not all the libraries are being used at the moment
#[macro_use]
extern crate rocket;
/// https://api.rocket.rs/v0.5/rocket/form/struct.Form
use rocket::form::Form;
use rocket::form::FromForm;
use rocket::fs::{relative, FileServer};
use rocket::response::stream::{Event, EventStream};
use rocket::serde::json::{Json, Value};
use rocket::serde::{json, Deserialize, Serialize};
use rocket::tokio::select;
use rocket::tokio::sync::broadcast::{channel, error::RecvError, Sender};
use rocket::{Shutdown, State};
use std::option::Option;
// @see https://www.youtube.com/watch?v=Alyr-JN2pdQ&t=214s --> refernece video
// library to make server side API calls using reqwest
use reqwest::Client;

mod utils;

/// this is just an example code
/// Go to http://localhost:8000, and this message will be displayed
#[get("/")]
fn hello() -> &'static str {
    "This is the basic API route"
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(crate = "rocket::serde")]
struct User {
    id: u8,
    name: String,
}

// pass in the struct as the data
// first test with basic api endpoint
// because the goal is to return json data
// the return datatype needs to be wrapped around Json(data)
// example code to show how data can be returned in json format
#[get("/users")]
fn user() -> Json<User> {
    // this is dummy data
    // data should be coming from user instead
    let data = User {
        id: 4,
        name: "Ayan".to_string(),
    };
    println!("datatype of newly instantiated struct...");

    // ensure that your borrowing rather than directly passing in the parameters
    // since they are binded to the variables
    // and we don't plan on making any kind of modification to them
    utils::get_datatype(&data); // returns server::User

    let string = json::to_string(&data).unwrap();
    let my_data: User = json::from_str(&string).unwrap();

    utils::get_datatype(&string); // returns alloc::string::String (owned string type is what the struct is converted to)
    utils::get_datatype(&my_data); // returns server::User
    println!("{:?}", my_data);
    utils::get_datatype(&Json(&my_data)); // returns rocket::serde::json::Json<&server::User> --> creates a wrapper around the struct
    Json(my_data)
}

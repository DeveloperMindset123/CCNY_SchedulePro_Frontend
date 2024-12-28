#[macro_use]
extern crate rocket;
use reqwest::Client;
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
mod utils;

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

    let string = json::to_string(&data).unwrap(); // similar to JSON.stringify() in js/ts : returns a json string format data
    let my_data: User = json::from_str(&string).unwrap(); // similar to JSON.parse() in js/ts : converts to actual json object

    utils::get_datatype(&string); // returns alloc::string::String (owned string type is what the struct is converted to)
    utils::get_datatype(&my_data); // returns server::User
    println!("{:?}", my_data);
    utils::get_datatype(&Json(&my_data)); // returns rocket::serde::json::Json<&server::User> --> creates a wrapper around the struct
    Json(my_data)
}

/// example code showing how to pass in json based payload data
#[derive(Deserialize, Debug)]
#[serde(crate = "rocket::serde")]
struct Task<'r> {
    desciption: &'r str,
    complete: bool,
}

#[post("/todo", data = "<task>")]
fn new(task: Json<Task<'_>>) {
    println!("{:#?}", &task);
    utils::get_datatype(&task);
}

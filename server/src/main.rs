#[macro_use]
extern crate rocket;

/// example of how a "get" router will be defined
#[get("/")]
fn hello() -> &'static str {
    "This is the basic API route"
}

#[post("/message_send")]
#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![hello])
}

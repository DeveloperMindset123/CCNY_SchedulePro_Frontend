use std::time::Instant;
use actix::*;
use actix_files::NamedFile;

/// get : creates route handler (so we can use #[get("/custom_route_name")])
/// post : creates route handler (so we can use #[post("/custom_route_name")])
/// web : essential helper functions and types for application registration
/// Error (NOTE : this may cause error) : It may be error::Error (could be documentation related update) --> the other type of error comes from std::io::Error
/// HttpRequest : struct to handle an incoming request
/// HttpResponse : struct to handle an outgoing response
/// Responder : creates a response with OK status code, correct content type header and serailized JSON payload. (this is a trait)
use actix_web::{get, post, web, Error, HttpRequest, HttpResponse, Responder};
use actix_web_actors::ws;   // websocket
use diesel::{
  prelude::*,
  r2d2::{self, ConnectionManager},
};
use serde_json::json;   // macro within which json data can be passed
use uuid::Uuid;   // assigns unique identifiers to entities (helpful for database/network protocols)
use crate::db;
use crate::server;
use crate::session;

/// NOTE : this file is corresponding to React rather than react-native
/// NOTE : NamedFile::open_async file that is being passed in doesn't exist
/// this may cause error
/// intended for the purpose of adding a route for embedding the home page to the root URL
pub async fn index() -> impl Responder {
  NamedFile::open_async("./static/index.html").await.unwrap()
}

pub type PostgresPool = r2d2::Pool<ConnectionManager<PgConnection>>;

pub async fn chat_server(
  req : HttpRequest,
  stream : web::Payload,
  pool : web::Data<PostgresPool>,
  srv : web::Data<Addr<server::ChatServer>>
) -> Result<HttpResponse, Error> {
  ws::start(
    session::WsChatSession {
      id : 0,
      hb : Instant::now(),
      room : "main".to_string(),
      name : None,
      addr : srv.get_ref().clone(),
      db_pool : pool
    },
    &req,
    stream
  )
}

// TODO : Implement a route named /users/login
#[post("/users/login")]
pub async fn login_user(form : web::Json<models::RegisteredUser>) -> Result<HttpResponse, Error> {
  // javascript equivalent of Throew New Error("not yet implemented");
  unimplemented!("Not yet implemented");

}

/// route for authentication/user registration
#[post("/users/create")]
pub async fn create_user(
  pool : web::Data<PostgresPool>,

  // this is where the request body is coming from
  // refer to models.rs to see the schema implementation of NewUser
  // NewUser should be a serializable,deserializable struct to be passed in as payload
  form : web::Json<models::NewUser>
) -> Result<HttpResponse, Error> {
  let user = web::block(move || {
    let mut conn = pool.get()?;

    // we want only distinct emails
    // refer to db.rs to see the implementation of insert_new_user function (requires 3 params)
    // .map_err(actix_web::error:)
    // TODO : needs additional fields related information during onboarding
    db::insert_new_user(&mut conn, &form.username, &form.email, &form.password)
  }).await?
.map_err(actix_web::error::ErrorUnprocessableEntity)?;
Ok(HttpResponse::Ok().json(user))   // successful request will return the JSON format of the user that has been created
}


/// function to retrieve information about an user given their id
#[get("/users/{user_id}")]
pub async fn get_user_by_id(
  // web::Data<PostgresPool> : Application data wrapper and extractor that extracts data within PostgresPool
  pool : web::Data<PostgresPool>,

  // web::Path<Uuid> : Extracts Uuid from a path using serde
  // web::block : executes blocking function (something to do with threads sequence of execution)
  id : web::Path<Uuid>
) -> Result<HttpResponse, Error> {
  let user_id = id.to_owned();

  // transfers ownership. captures closure environment
  let user = web::block(move || {
    let mut conn = pool.get()?;

    // find_user_by_uid is a function within db.rs
    db::find_user_by_uid(&mut conn, user_id)
  }).await?.map_err(actix_web::error::ErrorInternalServerError)?;

  // try + catch block equivalent
  if let Some(user) = user {
    Ok(HttpResponse::Ok().json(user))
  } else {

    // error handler logic (constructs a json error response if api call fails)
    // to_string() at the end of neccessary, otherwise, cannot be wrapped around Ok
    // will throw an error instead
    let res = HttpResponse::NotFound().body(
      json!({
        "error" : 404,
        "message" : format!("No user found with user id : {id}")
      }).to_string(),
    );
    Ok(res)   // Ok(res) prints out the error message here, not to be confused
  }
}

/// function to define an user given their email
/// originally /users/phone/{phone_number}
/// TODO : update the .services method within main.rs
#[get("/users/email/{email_address}")]
pub async fn get_user_by_email(
  pool : web::Data<PostgresPool>,
  email : web::Path<String>,
) -> Result<HttpResponse, Error> {
  let user_email = email.to_owned();    // originally email.to_string()

  // captures a closure's environment by value
  // || means no parameters are needed when invoking closure
  // can be called as user() since that's where it has been captured
  let user = web::block(move || {
    let mut conn = pool.get()?;

    // TODO : remove later --> primarily for debugging purposes
    // println!("The current conn is {:?}", conn);  # Debug attribute not implemented
    db::find_user_by_email(&mut conn, user_email);    // takes in 2 params : the database connection, and the user_email for implementing the filtering logic
  }).await?.map_err(actix_web::error::ErrorInternalServerError)?;

  // store the result of sending the json response
  if let Some(user) = user {
    Ok(HttpResponse::Ok().json(user))
  } else {
    let res = HttpResponse::NotFound().body(
      json!({
        "error" : 404,
        // TODO : test this string
        // "message" : format!("No user found with email: {email.to_string()}")
        "message" : format!("Not user found with email : {}", email.to_owned())
      }).to_string()
    );
    Ok(res)
  }

}

// TODO : fix this
/// function that attempts to retrieve conversation history
/// given a particular room/user id (not entirely sure)
/// actix_web::error::ErrorInternalServerError : helper function to wrap the errors and instead generating "INTERNAL_SERVER_ERROR" response instead
#[get("/conversations/{uid}")]
pub async fn get_conversation_by_id(
  pool : web::Data<PostgresPool>,
  uid : web::Path<Uuid>,
) -> Result<HttpResponse, Error> {
  let room_id = uid.to_owned();

  // define conversations as a closure
  let conversations = web::block(move || {
    let mut conn = pool.get()?;
    db::get_conversation_by_room_id(&mut conn, room_id)
  })
  .await?
  .map_err(actix_web::error::ErrorInternalServerError)?;
  if let Some(data) = conversations {
    Ok(HttpResponse::Ok().json(data))
  } else {
    let res = HttpResponse::NotFound().body(
      json!({
        "error" : 404,
        "message" : format!("No conversation with room id : {room_id}")
      }).to_string(),
    );
    Ok(res);
  }
}

#[get("/rooms")]
pub async fn get_rooms(
  pool : web::Data<PostgresPool>
) -> Result<HttpResponse, Error> {

  // map_err : is used to transform one type of error to another
  let rooms = web::block(move || {
    let mut conn = pool.get()?;
    db::get_all_rooms(&mut conn)
  })
  .await?
  .map_err(actix_web::error::ErrorInternalServerError)?;

  // conditional checking if currently rooms are available
  if !rooms.is_empty() {
    Ok(HttpResponse::Ok().json(rooms))
  } else {
    let res = HttpResponse::NotFound().body(
      json!({
        "error" : 404,
        "message" : "No Rooms available at the moment"
      }).to_string(),
    );

    Ok(res)
  }
}

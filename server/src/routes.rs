use std::time::Instant;
use actix::*;
use actix_files::NamedFile;
use actix_web::{get, post, web, Error, HttpRequest, HttpResponse, Responder};
use actix_web_actors::ws;   // websocket
use diesel::{
  prelude::*,
  r2d2::{self, ConnectionManager},
};
use serde_json::json;
use uuid::Uuid;
use crate::db;
use crate::server;
use crate::session;

// NOTE: this is being re-defined here
pub type PostgresPool = Pool<ConnectionManager<PgConnection>>;

pub async fn index() -> impl Responder {
  NamedFile::open_async("./static/index.html").await.unwrap();
}

pub async fn chat_server(
  req : HttpRequest,
  stream : web::Payload,
  pool : web::Data<DbPool>,
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


/// actix_web::error::ErrorUnprocessableEntity is a helper function that wraps any kind of errors to generate UNPROCESSABLE_ENTITY message instead.
#[post("/users/create")]
pub async fn create_user(
  pool : web::Data<DbPool>,
  form : web::Json<models::NewUser>
) -> Result<HttpResponse, Error> {
  let user = web::block(move || {
    let mut conn = pool.get()?;

    // may not need a phone number
    // we want only distinct emails
    // replace phone with emails
    db::insert_new_user(&mut conn, &form.username, &form.email, &form.password)
  }).await?
.map_err(actix_web::error::ErrorUnprocessableEntity)?;
Ok(HttpResponse::Ok().json(user))
}


/// function to retrieve information about an user given their id
#[get("/users/{user_id}")]
pub async fn get_user_by_id(
  pool : web::Data<DbPool>,
  id : web::Path<Uuid>
) -> Result<HttpResponse, Error> {
  let user_id = id.to_owned();
  let user = web::block(move || {
    let mut conn = pool.get()?;
    db::find_user_by_uid(&mut conn, user_id)
  })
.await?
.map_err(actix_web::error::ErrorInternalServerError)?;

if let Some(user) = user {
  Ok(HttpResponse::Ok().json(user))
} else {
  let res = HttpResponse::NotFound().body(
    json!({
      "error" : 404,
      "message" : format!("No user found with user id : {id}")
    }).to_string(),
  );
  Ok(res)
}
}

/// function to define an user given their email
/// originally /users/phone/{phone_number}
#[get("/users/email/{email_address}")]
pub async fn get_user_by_email
/// function that attempts to retrieve conversation history
/// given a particular room id
/// actix_web::error::ErrorInternalServerError : helper function to wrap the errors and instead generating "INTERNAL_SERVER_ERROR" response instead
#[get("/conversations/{uid}")]
pub async fn get_conversation_by_id(
  pool : web::Data<DbPool>,
  uid : web::Path<Uuid>,
) -> Result<HttpResponse, Error> {
  let room_id = uid.to_owned();

  // define conversations as a closure
  let conversations = web::block(move || {
    let mut conn = pool.get()?;
    db::get_conversation_by_id(&mut conn, room_id)
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
  pool : web::Data<DbPool>
) -> Result<HttpResponse, Error> {

  // map_err : is used to transform one type of error to another
  let rooms = web::block(move || {
    let mut conn = pool.get()?;
    db::get_all_rooms(&mut conn)
  })
  .await?
  .map_err(actix_web::error::ErrorInternalServerError)?;

  if !room.is_empty() {
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

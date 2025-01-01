/// recieve a message and save it to the database
/// send it back to the participant within the room
///
/// Duration : a Duration type to represent a span of time, typically used for system timeouts
/// Each duration is composed of a whole number of seconds and a fractional part represented in nanoseconds
use std::time::{Duration, Instant};
use actix::prelude::*;
use actix_web::web;
use actix_web_actors::ws;

/// serialize : breaks down data into a format that can be transmitted over the network
/// deserialize : reconstructs data that has been transmitted over network to readable object
use serde::{Deserialize, Serialize};
use diesel::{
  prelude::*,
  r2d2::{self, ConnectionManager},
};

/// absolute path import (doesn't require using mod db, mod models, etc.)
/// crate=src/main.rs (root)
use crate::db;
use crate::models::NewConversation;
use crate::server;
use crate::types;

/// the websocket connection can be modified here
const HEARTBEAT : Duration = Duration::from_secs(5);    // 5 seconds
const CLIENT_TIMEOUT : Duration = Duration::from_secs(10);  // 10 seconds

// type already exists within types::PostgresPool
// type dbPool = r2d2::Pool<ConnectionManager<PgConnection>>;

/// WsChatSession : makes a custom implementation of the actix_web_actor

#[derive(debug)]  // ensures the struct can be printed out for debugging purposes
pub struct WsChatSession {
  pub id : usize,
  pub hb : Instant,
  pub room : String,
  pub name : Option<String>,  // name can be String or None
  pub addr : Addr<server::ChatServer>,
  pub db_pool : web::Data<types::PostgresPool>,
}

/// eq checks for complete equivalency
/// PartialEq checks for conditional equivalency
#[derive(PartialEq,Serialize,Deserialize)]
pub enum ChatType {

  // think of them as "states"
  TYPING,
  TEXT,
  CONNECT,
  DISCONNECT
}

/// ChatMessage : defines the object that will be sent and recieved from the user
#[derive(Serialize, Deserialize)]
struct ChatMessage {
  pub chat_type : ChatType,   // can be one of the 4 variatizons (Typing, text, connect, disconnect)
  pub value : Vec<String>,
  pub room_id : String,
  pub user_id : String,
  pub id : usize
}

/// attaches the Actor trait to the WsChatSession struct
impl Actor for WsChatSession {
  type Context = ws::WebSocketContext<Self>;
  fn started(&mut self, ctx : &mut Self::Context) {
    self.hb(ctx);
    let addr = ctx.address();
    self.addr.send(server::Connect {

    })
  }
}

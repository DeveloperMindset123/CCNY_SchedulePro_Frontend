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
/// refer to the rust playground to see worked out examples of how the actor trait
/// from actix::prelude::Actor works
impl Actor for WsChatSession {
  type Context = ws::WebSocketContext<Self>;

  // event 1 for keeping track of when this websocket starts
  fn started(&mut self, ctx : &mut Self::Context) {
    self.hb(ctx);
    let addr = ctx.address();
    self.addr.send(server::Connect {
      addr : addr.recipient(),
    })
    .into_actor(self)
    .then(|res, act, ctx| {
      match res {
        // Ok and Err are variants of the Result Enum
        Ok(res) => act.id = res,
        _ => ctx.stop()   // generic placeholder to catch all remaining errors
      }
      fut::ready(())    // this is coming from actix::prelude::fut
    })
    .wait(ctx);
  }

  // event 2 for keeping track of when this websocket stops
  // Running is an enum variant that comes from ActorState, there's 4 different available : [Started, Running, Stopping, Stopped]
  fn stopping(&mut self, _ : &mut Self::Context) -> Running {


    // NOTE : server::Disconnect comes from server.rs, which is a struct encapsulated by #[derive(Message,Debug)]
    self.addr.do_send(server::Disconnect { id : self.id });
    Running::Stop
  }
}

/// implement the Handler trait such that server::Message type messages can be sent over the network when web socket chat session opens up
impl Handler<server::Message> for WsChatSession {
  type Result = ();   // returns the generic/default return type, void return type for MessageResponse

  // meaning the handle method that's associated with the Handler trait should not return anything
  fn handle(&mut self, msg : server::Message, ctx : &mut Self::Context) -> Self::Result {
    ctx.text(msg.0);    // TODO : figure this out later
  }
}

/// attaches the trait StreamHanlder<T> to WsChatSession struct
/// actix_web_actors::ws::Message : Message is an enum with variants representing websocket message
///
/// the original definition of the Message enum is the following (Based on the docs):
/// commented out so we don't run into error (mainly for documentation purposes)
///
// pub enum Message {
//   // comes from bytestring::ByteString (would require seperate installation)
//   // Text Message
//   Text(ByteString),

//   // comes from bytes::Bytes
//   // Binary Message
//   Binary(Bytes),

//   // comes from actix_http::ws::Item
//   // Continuation
//   Continuation(Item),

//   Ping(Bytes),    // Simple Ping message
//   Pong(Bytes),    // Simple Pong Message

//   // CloseReason is a struct that comes from actix_web_actors::ws::CloseReason
//   // consist of two components : code and description (self-explanatory)
//   Close(Option<CloseReason>),   // Close message with optional reason

//   Nop   // No-Op. Useful for low-level services.
// }

impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for WsChatSession {
  fn handle(&mut self, item : Result<ws::Message, ws::ProtocolError>, ctx : &mut Self::Context) {

    // use match control flow to determine if the message has been successfully sent
    let msg = match item {
      Err(_) => {
        ctx.stop();   // recall that this is one of the methods that comes from actix::prelude::Context
        return;
      }
      Ok(msg) => msg,   // returns msg, stored within the msg variable
    };

    match msg {
      // send a ping in the form of msg
      ws::Message::Ping(msg) => {
        self.hb = Instant::now();
        ctx.pong(&msg);   // respond to the ping message with a pong
      }

      ws::Message::Pong(_) => {
        // watch for Ping events
        self.hb = Instant::now();
      }

      ws::Message::Text(text) => {

        // TODO : test this out on the rust playground
        // converts the ChatMessage struct into a string based json data
        // equivalent to JSON.parse() in javascript a specific object
        let data_json = serde_json::from_str::<ChatMessage>(&text.to_string());
        if let Err(err) = data_json {   // in the event an error occurs for data_json, print it out
          println!("{err}");
          println!("Failed to parse message : {text}");
          return;   // ends execution pre-maturely since error occured when message was attempted to be parsed
        }

        let input = data_json.as_ref().unwrap();    // immutable reference
        match &input.chat_type {
          ChatType::TYPING => {   // ChatType is an enum defined above
            let chat_msg = ChatMessage {
              chat_type : ChatType::TYPING,
              value : input.value.to_vec(),
              id : self.id,

              // // avoid unneccessary memory allocation using to_string()
              room_id : input.room_id.to_owned(),
              user_id : input.room_id.to_owned(),
            };
            let msg = serde_json::to_string(&chat_msg).unwrap();
            self.addr.do_send(server::ClientMessage {
              id : self.id,
              msg,  // may cause borrow checker errors here
              room : self.room.clone()    // since room is borrowed, we can clone and bind it to room here for the struct
            })
          }

          ChatType::TEXT => {
            let input = data_json.as_ref().unwrap();
            let chat_msg = ChatMessage {
              chat_type : ChatType::TEXT,
              value : input.value.to_vec(),
              id : self.id,
              room_id : input.room_id.to_owned(),   // NOTE : originally to_string()
              user_id : input.user_id.to_owned(),  // NOTE : originally to_string()
            };

            let mut conn = self.db_pool.get().unwrap();

            // the struct NewConversation comes from model::NewConversation
            // NOTE : there's no checker checking if the value being checked is null or not when instantiating the struct
            let new_conversation = NewConversation {
              user_id : input.user_id.to_owned(),
              room_id : input.room_id.to_owned(),
              message : input.value.join(""), // joins the vector of string into a single string, keeping the ordering of the whitespace
            };

            // inserts the newly instantiated conversataion into the database
            let _ = db::insert_new_conversation(&mut conn, new_conversation);
            let msg = serde_json::to_string(&chat_msg).unwrap();    // convert to string of json msg
            self.addr.do_send(server::ClientMessage {
              id : self.id,
              msg,
              room : self.room.clone(),
            })
          }
          _ => {}   // do nothing if error occurs, handles all other edge cases as well
        }
      }

      // NOTE : these are all enums from ws::Message enum (refer to the docs for reference)
      ws::Message::Binary(_) => println!("Unsupported binary"),
      ws::Message::Close(reason) => {
        ctx.close(reason);
        ctx.stop();   // trigger the stop event
      }

      ws::Message::Continuation(_) => {
        ctx.stop()
      }

      ws::Message::Nop => (),   // perform no more operations
    }
  }
}

// define the methods relevant to WsChatSession struct defined previously : polymorphism
// hb is a method that can be accessed after the struct has been instantiated and bounded to a variable
impl WsChatSession {
  fn hb(&self, ctx : &mut ws::WebSocketContext<Self>) {

    // TODO : find out where act is coming from
    ctx.run_interval(HEARTBEAT, |act, ctx| {
      if Instant::now().duration_since(act.hb) > CLIENT_TIMEOUT  {

        // disconnect if client timeout limit is smaller than the time since the socket has been opened and no message has been recieved
        act.addr.do_send(server::DISCONNECT {
          id : act.id
        });
        ctx.stop();
        return;   // early terminiation of program execution
      }

      ctx.ping(b"");    // otherwise, send an acknoledgement
    });
  }
}


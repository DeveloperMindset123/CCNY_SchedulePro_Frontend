use crate::session;
use actix::prelude::*;
use rand::{self, rngs::ThreadRng, Rng};
use serde_json::json;
/// handle websocket connection
use std::collections::{HashMap, HashSet};

/// #[derive(Message)] comes from actix::Message itself
/// Not to be confused with the Message struct defined
///
/// Message will be in the form of a string
/// message that is being passed between 2 or more users
#[derive(Message)]
#[rtype(result = "()")]
pub struct Message(pub String);

#[derive(Message)]
#[rtype(usize)]
pub struct Connect {
    pub addr: Recipient<Message>,
}

#[derive(Message)]
#[rtype(result = "()")]
pub struct Disconnect {
    pub id: usize,
}

// define
#[derive(Message)]
#[rtype(result = "()")]
pub struct ClientMessage {
    pub id: usize,
    pub msg: String,
    pub room: String,
}

pub struct ListRooms;

impl actix::Message for ListRooms {
    type Result = Vec<String>;
}

#[derive(Message)]
#[rtype(result = "()")]
pub struct Join {
    pub id: usize,
    pub name: String,
}

/// below are implementation of the traits to manage the WebSocket connections
/// will handle all incoming message from users and
/// send it back to participants within a chat room
///
#[derive(Debug)]
pub struct ChatServer {
    sessions: HashMap<usize, Recipient<Message>>,
    rooms: HashMap<String, HashSet<usize>>,
    rng: ThreadRng,
}

impl ChatServer {
    // define the constructor function for ChatServer
    // initialize a new hashmap for the rooms
    //
    // the values being hashset
    // hashset representing the users within a particular chatroom
    //
    // the key being "main"
    // NOTE : assert_eq!("main".to_string() == "main".to_owned());
    pub fn new() -> ChatServer {
        let mut rooms = HashMap::new();
        rooms.insert("main".to_string(), HashSet::new());
        Self {
            sessions: HashMap::new(),
            rooms,
            rng: rand::thread_rng(),
        }
    }
}

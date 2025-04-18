use crate::session;
use actix::prelude::*;
use rand::{self, rngs::ThreadRng, Rng};
use serde_json::json;
use std::collections::{HashMap, HashSet};


/// Not to be confused with the Message struct defined
///
/// Message will be in the form of a string since Message is an enum and all it's variant takes in string as a parameter
/// message that is being passed between 2 or more users
///
/// rtype : response type (my assumption)
#[derive(Debug,Message)]    // comes from actix::prelude::Message
#[rtype(result = "()")]
pub struct Message(pub String);

#[derive(Debug,Message)]
#[rtype(usize)]
pub struct Connect {
    pub addr: Recipient<Message>,   // comes from actix::prelude::Recipient
}

#[derive(Debug,Message)]
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
    // initialize a new hashmap for the rooms (no parameters needed)
    //
    // the values being hashset
    // hashset representing the users within a particular chatroom
    //
    // the key being "main"
    // NOTE : assert_eq!("main".to_string() == "main".to_owned());
    pub fn new() -> ChatServer {
        let mut rooms = HashMap::new();
        rooms.insert("main".to_owned(), HashSet::new());

        // NOTE : Self references the struct tiself (self reference in python)
        // passing in the values to instantiate a new object during call ChatServer::new()
        //
        // no values are being passed in as parameters in this case
        Self {
            sessions: HashMap::new(),
            rooms,
            rng: rand::thread_rng(),
        }
    }

    // method to send the message after object has been instantiated using ChatServer::new()
    fn send_message(&self, room: &str, message: &str, skip_id: usize) {
        // this method is similar to defining arrow functions
        // when it comes to typescript/javascript
        //
        // since whatever the function we define returns is stored within sessions
        // Some wrapper is used to handle possibillity of null values being returned
        // checks if current session exists based on the room number
        //
        // if so, send the message
        if let Some(sessions) = self.rooms.get(room) {
            for id in sessions {
              // *id : references id
                if *id != skip_id {
                    if let Some(addr) = self.sessions.get(id) {
                        addr.do_send(Message(message.to_owned()));
                    }
                }
            }
        }
    }
}

impl Actor for ChatServer {
    type Context = Context<Self>;
}

/// the connect struct has been set as a trait bound
/// TODO : look into why this has been implemented in this manner
/// Handler<Connect> is used to attach the Connect struct as a trait to the Handler method : may be somewhat difficult to wrap your head around as of right now
impl Handler<Connect> for ChatServer {
    type Result = usize;

    // Self::Result returns usize (unsigned integer data of variable size)
    fn handle(&mut self, msg: Connect, _: &mut Context<Self>) -> Self::Result {
        let id = self.rng.gen::<usize>();
        self.sessions.insert(id, msg.addr);
        self.rooms
            .entry("main".to_string())
            .or_insert_with(HashSet::new)
            .insert(id);

        // note that this was a method that has been defined
        // previously by ChatServer (refer to the above implementation)
        //
        // accesses the send_message method that has been defined previously
        // passes in three params, room in this case is "main", message is a json payload and skip_id is 0
        //
        // this logic executes only when
        self.send_message(
            "main",
            &json!({
              "value" : vec![format!("{}", id)],
              "chat_type" : session::ChatType::CONNECT
            })
            .to_string(),
            0,
        );

        // return type value
        id
    }
}

/// this method would most likely be used to remove someone from a particular chat group
/// or an event that gets triggered when an user leaves a chat-room
impl Handler<Disconnect> for ChatServer {
    // successful implementation expects Ok() to be returned
    type Result = ();
    fn handle(&mut self, msg: Disconnect, _: &mut Self::Context) -> Self::Result {
        let mut rooms: Vec<String> = vec![];

        if self.sessions.remove(&msg.id).is_some() {
            for (name, sessions) in &mut self.rooms {
                // println!("{:?}", &msg.id);
                if self.sessions.remove(&msg.id).is_some() {
                    rooms.push(name.to_owned());
                }
            }
        }
        for room in rooms {
            self.send_message(
                "main",
                &json!({
                  "room" : room,
                  "value" : vec![format!("Someone disconnected!")],
                  "chat_type" : session::ChatType::DISCONNECT
                })
                .to_string(),
                0,
            );
        }
    }
}

impl Handler<ClientMessage> for ChatServer {
    type Result = ();
    fn handle(&mut self, msg: ClientMessage, _: &mut Self::Context) -> Self::Result {
        self.send_message(&msg.room, &msg.msg, msg.id);
    }
}

impl Handler<ListRooms> for ChatServer {
    // Message Result also comes from Actix
    // just as "Message"
    type Result = MessageResult<ListRooms>;
    fn handle(&mut self, _: ListRooms, _: &mut Self::Context) -> Self::Result {
        let mut rooms = vec![];
        for key in self.rooms.keys() {
            rooms.push(key.to_owned());

            // TODO : for debugging purpose, remove later
            println!("Current room is : {:?}", rooms);
        }
        MessageResult(rooms)
    }
}

impl Handler<Join> for ChatServer {
    type Result = ();
    fn handle(&mut self, msg: Join, _: &mut Self::Context) -> Self::Result {
        // msg contains the id and name (since it's of the Join type struct)
        // that are being deconstructed to instantiate the Join struct
        //
        // the join struct has been attached as a trait for this handler
        let Join { id, name } = msg;
        let mut rooms = vec![];

        // iterates over the keys and values within
        // self.rooms
        for (n, sessions) in &mut self.rooms {
            if sessions.remove(&id) {
                rooms.push(n.to_owned());
            }
        }

        for room in rooms {
            self.send_message(
                &room,
                &json!({
                  "room" : room,
                  "value" : vec![format!("Someone disconnect!")],   // will output ["Someone disconnect!"] on console
                  "chat_type" : session::ChatType::DISCONNECT
                })
                .to_string(),
                0,
            );
        }
        self.rooms
            .entry(name.clone())
            .or_insert_with(HashSet::new)
            .insert(id);
    }
}

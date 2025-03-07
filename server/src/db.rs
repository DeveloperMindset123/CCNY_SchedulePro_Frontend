// TODO : Implement the insert_new_user function here
// TODO : migrate the existing datbase related functions here
// TODO : define a function named find_user_by_uid() here (router.rs is using it)
// TODO : figure out how to make everything run as intended.
use rand::random;
use chrono::{DateTime, Utc};
use diesel::prelude::*;
use std::{
  collections::{HashMap, HashSet},
  time::SystemTime,
};
use uuid::Uuid;
use crate::models::{Conversation, NewConversation, Room, RoomResponse, User};

// from my understanding types seems to be locally scoped
type DbError = Box<dyn std::error::Error + Send + Sync>;

fn iso_date() -> String {
  let now = SystemTime::now();    // comes from chrono
  let now : DateTime<Utc> = now.into();
  return now.to_rfc3339();    // returns an RFC 3339 and ISO 8601 date and time string with subseconds formatted as per SecondsFormat
}

// TODO : fix this
// define the function to search a user given an email
// pub fn find_user_by_email(
//   conn : &mut PgConnection,   // comes from diesel::prelude::PgConnection
//   user_email : String,
// ) -> Result<Option<User>, DbError> {
//   // TODO : connect messaging_user to users via the foreign key constriant
//   use crate::schema::messaging_user::dsl::messaging_user;
//   use diesel::{
//     expression::AsExpression,
//     helper_types::{AsSelect, Eq, FindBy, Limit, Select},
//     pg::Pg,
//     prelude::*,
//     query_dsl::methods::{self, LimitDsl, LoadQuery, SelectDsl},
//     sql_types::SqlType
//   }

//   // TODO : implement function to insert data
//   // filter the database by the particular email
//   // let user = messaging_user::table.filter(user_email)).first::<User>(&conn).optional()?;
//   // let user = messaging_user::table.filter(;
//   Ok(user)
// }


// TODO : Fix this
// define the function to add a particular user
// instantiate the struct with the new user data and push it to the database
// pub fn insert_new_user(conn : &mut PgConnection, name : &str, email : &str) -> Result<User, DbError> {
//   use crate::schema::messaging_user::dsl::*;
//   let new_user = User {
//     username : name.to_string(),
//     email : email.to_string(),
//     created_at : Utc::now().naive_utc()
//   };

//   diesel::insert_into(messaging_user).values(&new_user).execute(conn)?;
//   Ok(new_user)  // return successful insertion response
// }

// after new user has been added, new conversations can be inserted
// NOTE : return type is Result<Conversation, DbError>
// NOTE : partially implemented function
pub fn insert_new_conversation(
  conn : &mut PgConnection,
  new_convo : NewConversation,
) {
  use crate::schema::conversations::dsl::*;

  // instantiate and store the struct
  let new_conversation = Conversation {
    id : rand::random::<i32>(),
    user_id : new_convo.user_id,
    room_id : new_convo.room_id,
    message_content : new_convo.message,
    created_at : Utc::now().naive_utc()
    // created_at : String
  };

  // diesel::insert_into(conversations).values(&new_conversation).execute(conn)?;
  println!("This function has not yet been fully implemented");
  // Ok(new_conversation)
}

// TODO : implement this
// pub fn get_all_rooms(conn : &mut PgConnection) -> Result<Vec<RoomResponse>, DbError> {
//   use crate::schema::rooms;
//   use crate::schema::messaging_user;
//   let rooms_data : Vec<Room> = rooms::table.get_results(conn)?;
//   let mut ids = HashSet::new();
//   let mut rooms_map = HashMap::new();
//   let data = rooms_data.to_vec();
//   for room in &data {
//     let user_ids = room.participant_ids.split(",").into_iter().collect::<Vec<_>>();

//     for id in user_ids.to_vec() {
//       ids.insert(id.to_string());
//     }

//     rooms_map.insert(room.id.to_string(), user_ids.to_vec());
//   }

//   let ids = ids.into_iter().collect::<Vec<_>>();
//   let users_data : Vec<User> = messaging_user::table.filter(messaging_user::id.eq_any(ids)).get_results(conn)?;
//   let users_map : HashMap<String, User> = HashMap::from_iter(
//     users_data.into_iter().map(|item| (item.id.to_string(), item)),
//   );

//   let response_rooms = rooms_data.into_ite().map(|room| {
//     let users = rooms_map.get(&room.id.to_string()).unwrap().into_iter().map(|id| users_map.get(id.to_owned()).unwrap().clone()).collect::<Vec<_>>();
//   return RoomResponse { room, users };
//   }).collect::<Vec<_>>();
//   Ok(response_rooms)
// }

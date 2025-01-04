/// TODO : Define a struct named NewUser
/// NOTE : NewUser struct's body should follow what's already on the existing database
/// NOTE : instead of NewUser, would be best to just replace it with RegisteredUser for clarity
use serde::{Deserialize, Serialize};
// use crate::schema::*;
use crate::schema::messaging_user::username;
use crate::schema::messaging_user::email;
use crate::schema::messaging_user::created_at;

pub fn find_user_by_email() {
  unimplemented!("Not yet implemented");
}

pub fn find_user_by_uid() {
  unimplemented!("Not yet implemented");
}

pub fn get_conversation_by_room_id() {
  unimplemented!("Not yet implemented");
}

pub fn get_all_rooms() {
  unimplemented!("Not yet implemented");
}

// attach the attributes for the particular structs
#[derive(Debug, Clone, Serialize, Deserialize, Queryable, Insertable)]
pub struct User {   // corresponds to message_user table
  pub id : String,
  pub username : String,
  pub email : String,
  pub created_at : String
}

#[derive(Debug, Clone, Serialize, Deserialize, Queryable, Insertable)]
pub struct Conversation {
  pub id : String,
  pub room_id : String,
  pub user_id : String,
  pub message_content : String,
  pub created_at : String
}

#[derive(Debug, Clone, Serialize, Deserialize, Queryable, Insertable)]
pub struct Room {
  pub id : String,
  pub name : String,
  pub last_message : String,
  pub participant_ids : String,
  pub created_at : String
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NewConversation {
  pub user_id : String,
  pub room_id : String
}

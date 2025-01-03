/// TODO : Define a struct named NewUser
/// NOTE : NewUser struct's body should follow what's already on the existing database
/// NOTE : instead of NewUser, would be best to just replace it with RegisteredUser for clarity

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

/// TODO : implement this
struct NewConversation {
  user_id : String,
  room_id : String,
  message : String   // originally, the vector of strings is constructed into a single string using the join statement, refer to session.rs to see the implementation logic
};

pub fn insert_new_conversation(connection_url, conversataion_data : NewConversation) {
  unimplemented!("Not yet implemented!");
}

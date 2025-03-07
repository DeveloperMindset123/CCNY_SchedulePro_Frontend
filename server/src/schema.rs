// @generated automatically by Diesel CLI.

diesel::table! {
    conversations (id) {
        id -> Int4,
        room_id -> Text,
        user_id -> Text,
        message_content -> Text,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

diesel::table! {
    messaging_user (id) {
        id -> Int4,
        username -> Text,
        email -> Text,
        created_at -> Timestamp,
    }
}

diesel::table! {
    rate_my_professor_data (id) {
        id -> Int4,
        department -> Varchar,
        avg_difficulty -> Numeric,
        avg_ratings -> Numeric,
        would_take_again -> Bool,
        num_ratings -> Nullable<Int4>,
        comments -> Nullable<Array<Nullable<Text>>>,
        sentiments_data -> Nullable<Array<Nullable<Json>>>,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

diesel::table! {
    rooms (id) {
        id -> Int4,
        name -> Varchar,
        last_message -> Nullable<Text>,
        participant_ids -> Nullable<Text>,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

diesel::table! {
    users (id) {
        id -> Int4,
        user_name -> Text,
        email -> Text,
        user_password -> Varchar,
        gender -> Varchar,
        date_of_birth -> Date,
        pronouns -> Varchar,
        major -> Varchar,
        hobbies -> Nullable<Array<Nullable<Text>>>,
        college_year -> Int4,
        degree_type -> Varchar,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    conversations,
    messaging_user,
    rate_my_professor_data,
    rooms,
    users,
);

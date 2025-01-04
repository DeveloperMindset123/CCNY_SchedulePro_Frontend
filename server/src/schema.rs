// @generated automatically by Diesel CLI.

diesel::table! {
    _prisma_migrations (id) {
        #[max_length = 36]
        id -> Varchar,
        #[max_length = 64]
        checksum -> Varchar,
        finished_at -> Nullable<Timestamptz>,
        #[max_length = 255]
        migration_name -> Varchar,
        logs -> Nullable<Text>,
        rolled_back_at -> Nullable<Timestamptz>,
        started_at -> Timestamptz,
        applied_steps_count -> Int4,
    }
}

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
        name -> Text,
        email -> Nullable<Text>,
        password -> Nullable<Varchar>,
        gender -> Nullable<Varchar>,
        date_of_birth -> Nullable<Date>,
        pronouns -> Nullable<Varchar>,
        major -> Nullable<Varchar>,
        hobbies -> Nullable<Array<Nullable<Text>>>,
        college_year -> Nullable<Int4>,
        degree_type -> Nullable<Varchar>,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    _prisma_migrations,
    conversations,
    rate_my_professor_data,
    rooms,
    users,
);

// @generated automatically by Diesel CLI.

diesel::table! {
    RateMyProfessorComments (generated_id) {
        professor_name -> Text,
        department -> Text,
        comments -> Nullable<Array<Nullable<Text>>>,
        foreign_linker_id -> Text,
        generated_id -> Text,
        sentimentData -> Nullable<Array<Nullable<Jsonb>>>,
    }
}

diesel::table! {
    RateMyProfessorData (id) {
        id -> Text,
        department -> Text,
        professorName -> Text,
        avgDifficulty -> Float8,
        avgRatings -> Float8,
        wouldTakeAgain -> Text,
        numRatings -> Int4,
    }
}

diesel::table! {
    RefreshTokens (id) {
        id -> Text,
        hashedToken -> Text,
        userId -> Text,
        revoked -> Bool,
        createdAt -> Timestamp,
        updatedAt -> Timestamp,
    }
}

diesel::table! {
    User (id) {
        id -> Text,
        email -> Text,
        password -> Text,
        createdAt -> Timestamp,
        updatedAt -> Timestamp,
        plainTextPassword -> Nullable<Text>,
    }
}

diesel::table! {
    UserRegistrationDetails (userID) {
        userID -> Int4,
        username -> Text,
        major -> Text,
        DOB -> Nullable<Text>,
        CollegeYear -> Int4,
        pronouns -> Nullable<Text>,
        Hobbies -> Nullable<Text>,
        Gender -> Text,
        emailDuplicate -> Text,
        degreeType -> Text,
    }
}

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
    posts (id) {
        id -> Int4,
        title -> Varchar,
        body -> Text,
        published -> Bool,
    }
}

diesel::joinable!(RateMyProfessorComments -> RateMyProfessorData (foreign_linker_id));
diesel::joinable!(RefreshTokens -> User (userId));

diesel::allow_tables_to_appear_in_same_query!(
    RateMyProfessorComments,
    RateMyProfessorData,
    RefreshTokens,
    User,
    UserRegistrationDetails,
    _prisma_migrations,
    posts,
);

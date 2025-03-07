/// organize all the appropriate return types here that has been abstracted for simplfication
use diesel::{
  prelude::*,
  r2d2::{self, ConnectionManager},
};
use diesel::r2d2;
// NOTE: this is being re-defined here
// defines the type for the Postgres connection
// originally : r2d2::Pool<ConnectionManager<SqliteConnection>>;
// abstracted the response handler type, since it is being repeated
pub type PostgresPool = r2d2::Pool<ConnectionManager<PgConnection>>;
pub type Response_Handler = Result<HttpResponse, Error>;

#![feature(trivial_bounds)]
#[allow(unused_imports)]
/// understanding the purpose of marco_use:
/// purpose 1 : it can be used to make a module's macro scope not end when the module is closed
/// purpose 2 : it cna be used to import macros from another crate
/// the target in this case is diesel
#[macro_use]
extern crate diesel;
use actix::*;   // imports all relevant methods within actix using wildcard (*)
use actix_cors::Cors;   // imports the Cors struct to configure middleware
use actix_files::Files;
use actix_web::{http, web, App, HttpServer};
use diesel::{
    prelude::*,
    r2d2::{self, ConnectionManager, Pool},
};
use diesel::pg::PgConnection;   // neccessary to connect with postgres
use std::env;   // module to load relevant environmental variables
mod db;   // this will allow us to use the functions within db.rs
mod models; // this will allow us to use the functions within models.rs
mod routes; // this will allow us to use the functions within routes.rs
mod schema; // this will allow us to use the functions within schema.rs
mod session;  // this will allow us to use the functions within session.rs
mod server;   // this will allow us to use the functions within server.rs

pub type PostgresPool = Pool<ConnectionManager<PgConnection>>;

// pub async fn get_pool() -> PostgresPool {
//   dotenv().ok();
//   let url = env::var("DATABASE_URL").expect("no DB URL");

//   let migr = ConnectionManager::<PgConnection>::new(url);
//   r2d2::Pool::builder().build(migr).expect("could not build connection pool")
// }

/// NOTE : std::io::Result does indeed take in a single argument
/// the original format is std::io::Result<T> where T is a placeholder for the return datatype
//return_type : -> std::io::Result<()>


// reference : https://github.com/actix/examples/blob/master/websockets/chat-actorless/README.md
#[actix_web::main]
async fn main() {
  let server = server::ChatServer::new().start();
  let server_addr = "127.0.0.1";
  let server_port = "8080";
  // let pool = get_pool().await;

  let connection_url = env::var("DATABASE_URL").expect("no DB URL");
  let manager = ConnectionManager::<PgConnection>::new(connection_url);
  let pg_pool = r2d2::Pool::builder().build(manager).expect("failed to create pool");

  let app = HttpServer::new(move || {
    let cors = Cors::default().allowed_origin("http://localhost:3000").allowed_origin("http://localhost:8080").allowed_methods(vec!["GET","POST"]).allowed_headers(vec![http::header::AUTHORIZATION, http::header::ACCEPT]).allowed_header(http::header::CONTENT_TYPE).max_age(3600);

    App::new().app_data(web::Data::new(server.clone())).app_data(web::Data::new(pg_pool.clone())).wrap(cors).service(web::resource("/").to(routes::index)).route("/ws", web::get().to(routes::chat_server))
            // .service(routes::create_user)    // TODO : implement this
            // .service(routes::get_user_by_id)   // TODO : fix
            // .service(routes::get_user_by_email)  // TODO : fix
            // .service(routes::get_conversation_by_id)   // TODO : fix
            // .service(routes::get_rooms) // TODO : implement this
            .service(Files::new("/", "./static"))
  });
  // .workers(2).bind((server_addr, server_port))?.run();
  println!("Server running at http://{server_addr}:{server_port}/");

  // closure
  app;
  // Ok(())
}

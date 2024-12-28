#[macro_use]
extern crate diesel;
use actix::*;
use actix_cors::Cors;
use actix_files::Files;
use actix_web::{http, web, App, HttpServer};
use diesel::{
    prelude::*,
    r2d2::{self, ConnectionManager},
};
use diesel::pg::PgConnection;
use std::env;
mod db;
mod models;
mod routes;
mod schema;
mod session;

pub type PostgresPool = Pool<ConnectionManager<PgConnection>>;

pub async fn get_pool() -> PostgresPool {
  dotenv().ok();
  let url = env::var("DATABASE_URL").expect("no DB URL");

  let migr = ConnectionManager::<PgConnection>::new(url);
  r2d2::Pool::builder().build(migr).expect("could not build connection pool")
}

// TODO : Test this
#[actix_web::main]
async fn main() -> std::io::Result<()> {
  let server = server::ChatServer::new().start;
  let server_addr = "127.0.0.1";
  let server_port = "8080";
  let pool = get_pool().await;
  let app = HttpServer::new(move || {
    let cors = Cors::default().allowed_origin("http://localhost:3000").allowed_origin("http://localhost:8080").allowed_methods(vec!["GET","POST"]).allowed_headers(vec![http::header::Authorization, http::header::ACCEPT]).allowed_header(http::header::CONTENT_TYPE).max_age(3600);

    // TODO : change from /ws to /websocket for clarity
    // after functionality has been established
    App::new().app_data(web::Data::new(server.clone())).app_data(web::Data::new(pool.clone())).wrap(cors).service("/ws", web::get().to(routes::chat_server)).service(routes::create_user).service(routes::get_user_by_id).service(routes::get_user_by_phone).service(routes::get_conversation_by_id).service(routes::get_rooms).service(Files::new("/", "/.static"))
  }).workers(2).bind({server_addr, server_port})?.run();
  println!("Server running at http://{server_addr}:{server_port}/");

  // closure
  app.await();
}

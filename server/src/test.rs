// use std::ops::Range;
// use rand::{thread_rng, Rng};
// use rand::distributions::Alphanumeric;
// use rocket::http::{ContentType, Status};
// use rocket::http::uri::fmt::{UriDisplay, Query};
// use rocket::local::asynchronous::{Client, LocalResponse};
// use rocket::tokio::{sync, join};
// use rocket::tokio::io::{BufReader, AsyncBufReadExt};
// use rocket::serde::json;
// use super::*;
// use pretty_assertions::{assert_eq, assert_ne};

// /// The routes are broken down into the following
// /// (events) : /events route (since that's the name of the handler function within main.rs, same applies for the route below)
// ///
// /// (post) : /message route
// async fn send_message<'c>(client : &'c Client, message : &Message) -> LocalResponse<'c> {
//   client.post(uri!(post)).header(ContentType::Form).body((message as &dyn UriDisplay<Query>).to_string()).dispatch().await
// }

// fn gen_string(len : Range<usize>) -> String {
//   thread_rng().sample_iter(&Alphanumeric).take(thread_rng().gen_range(len)).map(char::from).collect()
// }

// fn gen_nums(len : Range<usize>) -> u32 {
//   thread_rng().gen_range(len).try_into().unwrap()
// }

// #[async_test]
// async fn messages() {
//   let client = Client::tracked(rocket()).await.unwrap();
//   let start_barrier = sync::Barrier::new(2);
//   let shutdown_message = Message {
//     room : ":control".into(),
//     user_email : ":control".into(),
//     sender : ":control".into(),
//     reciever : ":control".into(),
//     message : "shutdown".into(),
//   };

//   // generate somewhere between 60 to 80 messages
//   let mut test_messages = vec![];
//   for _ in 0..thread_rng().gen_range(60..80) {
//     test_messages.push(Message {
//     room : gen_string(10..30),
//     user_email : gen_string(10..30),
//     sender : gen_string(2..10),
//     reciever : gen_string(2..10),
//     message : gen_string(10..100),
//   })
//   }

//   let send_messages = async {
//     start_barrier.wait().await;
//     for message in &test_messages {
//       send_message(&client, message).await;
//     }

//     send_message(&client, &shutdown_message).await;
//   };

//   let recieve_messages = async {
//     let response = client.get(uri!(events)).dispatch().await;
//     start_barrier.wait().await;
//     println!("The Response is : {:#?}", response);  // returns 404 Not Found

//     let mut messages = vec![];
//     let mut reader = BufReader::new(response).lines();
//     while let Ok(Some(line)) = reader.next_line().await {
//       if !line.starts_with("data:") {
//         continue;
//       }

//       let data : Message = json::from_str(&line[5..]).expect("message JSON");
//       if &data == &shutdown_message {
//         client.rocket().shutdown().notify();
//         continue;
//       }
//       messages.push(data);
//     }

//     messages
//   };

//   let recieved_messages = join!(send_messages, recieve_messages).1;
//   assert!(test_messages.len() >= 60);
//   assert_eq!(test_messages, recieved_messages);  // error : recieve_messages is empty --> left != right
// }

use std::ops::Range;

use rand::{thread_rng, Rng};
use rand::distributions::Alphanumeric;

use rocket::http::{ContentType, Status};
use rocket::http::uri::fmt::{UriDisplay, Query};
use rocket::local::asynchronous::{Client, LocalResponse};

use rocket::tokio::{sync, join};
use rocket::tokio::io::{BufReader, AsyncBufReadExt};
use rocket::serde::json;
use pretty_assertions::{assert_eq, assert_ne};

use super::*;

async fn send_message<'c>(client: &'c Client, message: &Message) -> LocalResponse<'c> {
    client.post(uri!(post))
        .header(ContentType::Form)
        .body((message as &dyn UriDisplay<Query>).to_string())
        .dispatch()
        .await
}

fn gen_string(len: Range<usize>) -> String {
    thread_rng()
        .sample_iter(&Alphanumeric)
        .take(thread_rng().gen_range(len))
        .map(char::from)
        .collect()
}

#[async_test]
async fn messages() {
    let client = Client::tracked(rocket()).await.unwrap();
    let start_barrier = sync::Barrier::new(2);

    let shutdown_message = Message {
        room: ":control".into(),
        user_email: ":control".into(),
        message: "shutdown".into(),
    };

    // Generate somewhere between 75 and 100 messages.
    let mut test_messages = vec![];
    for _ in 0..thread_rng().gen_range(40..60) {
        test_messages.push(Message {
            room: gen_string(10..30),
            user_email: gen_string(10..20),
            message: gen_string(10..100),
        })
    }

    let send_messages = async {
        // Wait for the other task to start listening.
        start_barrier.wait().await;

        // Send all of the messages.
        for message in &test_messages {
            send_message(&client, message).await;
        }

        // Send the special "shutdown" message.
        send_message(&client, &shutdown_message).await;
    };

    let receive_messages = async {
        let response = client.get(uri!(events)).dispatch().await;

        // We have the response stream. Let the receiver know to start sending.
        start_barrier.wait().await;

        let mut messages = vec![];
        let mut reader = BufReader::new(response).lines();
        while let Ok(Some(line)) = reader.next_line().await {
            if !line.starts_with("data:") {
                continue;
            }

            let data: Message = json::from_str(&line[5..]).expect("message JSON");
            if &data == &shutdown_message {
                // Test shutdown listening: this should end the stream.
                client.rocket().shutdown().notify();
                continue;
            }

            messages.push(data);
        }

        messages
    };

    let received_messages = join!(send_messages, receive_messages).1;
    assert!(test_messages.len() >= 40);
    assert_eq!(test_messages, received_messages);
}

#[async_test]
async fn test_shutdown() {
  let client = Client::tracked(rocket()).await.unwrap();
  let response = client.get(uri!(shutdown_custom)).dispatch().await;
  println!("Response : {:?}", response);
  // assert_eq!((client.rocket().shutdown().notify()), response);
}
// #[async_test]
// async fn bad_messages() {
//     // Generate a bunch of bad messages.
//     let mut bad_messages = vec![];
//     for _ in 0..thread_rng().gen_range(75..100) {
//         bad_messages.push(Message {
//             room: gen_string(30..40),
//             user_email: gen_string(20..30),
//             message: gen_string(10..100),
//         });
//     }

//     // Ensure they all result in a rejected request.
//     let client = Client::tracked(rocket()).await.unwrap();
//     for message in &bad_messages {
//         let response = send_message(&client, message).await;
//         assert_eq!(response.status(), Status::PayloadTooLarge);
//     }
// }





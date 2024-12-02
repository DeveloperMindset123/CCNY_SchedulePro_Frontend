// import { db } from './db';
// /**
//  * TODO : Implement this
//  * Purpose of this file is to take the information from Nur's File
//  * Store it within the database
//  * Alongside the information regarding the comments
//  * Simplifying existing logic
//  */

// // import the data we will be parsing
// import * as rmp from 'ratemyprofessor-api';
// import { Prisma } from '@prisma/client';

// // NOTE : returns 3359 rows worth of data
// // Meaning this function is working as intended
// export const sendRMPDataToDataBase = async (jsonObject: any) => {
//   const school = await rmp.searchSchool('City College of New York');
//   // initialize school id to be 0
//   let schoolId = '';
//   if (school !== undefined) {
//     schoolId = school[0].node.id.toString();
//   }
//   jsonObject.forEach(async (individual_data) => {
//     // NOTE : data should reset here
//     //console.log(`Current sentime data is : ${sentiments}`);
//     // individual_data.comments.forEach((comment) => {
//     //   store_comments.push(comment.text);
//     //   // push the data as an array
//     //   // divided based on their index for the positive, neutral and negative analysis value/percentage
//     //   const sentimentData = [
//     //     {
//     //       positiveSentiment: comment.pos,
//     //       neutralSentiment: comment.neu,
//     //       negativeSentiment: comment.neg,
//     //     },
//     //   ] as Prisma.JsonArray;
//     //   // test to see if this throws any kind of error
//     //   sentiments.push(sentimentData);
//     // });

//     // retrieve data about the professor based on the information collected
//     // get the data about the current professor
//     const getProfessorRating = await rmp.getProfessorRatingAtSchoolId(
//       individual_data.professor_name,
//       schoolId
//     );

//     // console.log(`Current Sentiment Data is : ${sentiments}`);

//     // now we push the data onto the database
//     // use ternary operator to determine where to extract data from
//     const currentData = await db.rateMyProfessorData.create({
//       data: {
//         department: individual_data.department
//           ? individual_data.department
//           : getProfessorRating.department,

//         professorName: individual_data.professor_name
//           ? individual_data.professor_name
//           : getProfessorRating.formattedName,

//         avgDifficulty: getProfessorRating.avgDifficulty ? getProfessorRating.avgDifficulty : -1.0,

//         // a value of -1.00 indicates no such data exists
//         avgRatings: getProfessorRating.avgRating ? getProfessorRating.avgRating : -1.0,

//         wouldTakeAgain: getProfessorRating.wouldTakeAgainPercent
//           ? getProfessorRating.wouldTakeAgainPercent + '%'
//           : 'unknown',

//         numRatings: getProfessorRating.numRatings ? getProfessorRating.numRatings : 0,

//         // this has been trasferred over to the next table
//         // place the stored comments within the database
//         // comments: store_comments,
//         // sentimentData: sentiments,
//       },
//     });
//     console.log(`The current data is ${currentData}`);
//   });
// };

// // // the data that's being passed in is the json object
// export const sendRMPSummarySentiment = async (jsonData: any) => {
//   // this should first find the professor by their name
//   // and their department
//   // then store the corresponding comments
//   // and sentimenet analysis per professor
//   jsonData.forEach(async (individual_data: any) => {
//     // we want to make sure we reset them each time
//     const store_comments: string[] = [];
//     const sentiments: any[] = [];
//     const findId = await db.rateMyProfessorData.findFirst({
//       where: {
//         professorName: individual_data.professor_name,
//         department: individual_data.department,
//       },
//     });

//     // query should return an object
//     // printing out data successfully
//     // TODO : Remove later, intended for testing purpose
//     console.log(`Result of findId is : ${JSON.stringify(findId)}`);
//     // if id exist, we parse throguh the comments
//     // so that we can link it to the foregn id
//     individual_data.comments.forEach(async (comment) => {
//       store_comments.push(comment.text);
//       const sentimentData = [
//         {
//           positiveSentiment: comment.pos,
//           neutralSentiment: comment.neu,
//           negativeSentiment: comment.neg,
//         },
//       ] as Prisma.JsonArray;
//       // test to see if this throws any kind of error
//       sentiments.push(sentimentData);
//       // TODO : remove later, intended for testing purposes
//       console.log(`Current sentiment data : ${JSON.stringify(sentimentData)}`);
//     });

//     // create the data
//     // remove the one-to-one relation for now
//     if (findId) {
//       // NOTE : make sure to add await, otherwise, data object will be empty
//       const newData = await db.rateMyProfessorComments.create({
//         data: {
//           // findId will always have a value
//           professor_name: individual_data.professor_name,
//           department: individual_data.department,
//           comments: store_comments,
//           sentimentData: sentiments,
//           // set id
//           foreign_linker_id: findId.id,
//         },
//       });

//       // TODO : Remove later
//       console.log(`Created New Data Table : ${JSON.stringify(newData)}`);
//     }
//   });
// };

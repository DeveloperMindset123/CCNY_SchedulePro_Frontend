import scraped_comments from 'scraped_comments.json'; // needs
import authRouter from './auth/auth.routes';
import express from 'express';
import userRouter from './users/users.routes';
import onboardingRouter from './onboarding/onboarding.routes';
//import { createMap, gatherSummaryByDepartment } from '../utils/RMPScraper';
//import { gatherRMPSummary } from '../utils/RMPScraper';
// import { department_list, department_professor_object } from '../utils/data/constants';
import { sendRMPDataToDataBase, sendRMPSummarySentiment } from '../utils/RMPData';

// import fs from 'fs';

const app = express();
// ** needed to add express.json()
app.use(express.json());
//@see https://medium.com/@pierrephilip/better-route-registration-with-express-js-740c0f342c10
const router = express.Router();
router.use(express.json());
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/onboarding', onboardingRouter);
//http://localhost:4001/auth/register --> example API call
app.use(router);
app.get('/test', (req, res) => {
  console.log('hello world');
  res.send('Hello from A!').status(200);
});

// this is temporary, just to get a better understanding of what the stored data looks like
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const saveToJson = async () => {
//   // TODO : call on the final function here
//   //await gatherSummaryByDepartment(inputMap, 'american studies'); --> this function gets called in the scraper itself
//   const inputMap = await createMap(department_list, department_professor_object);
//   const result: string[][] = await completeProfessorSummary(inputMap);
//   const test = sendToDatabase(result);
//   console.log(`Current JSON Data : ${test}`);
//   // test using the newly created function
//   const result_json = JSON.stringify(result);
//   fs.writeFile('results.json', result_json, (err) => {
//     if (err) {
//       console.error('Error writting to file : ', err);
//     } else {
//       console.log('successfull!');
//     }
//   });
// };
app.listen('4001', async () => {
  //await sendSummaryAndCommentsToDatabase();
  // await searchDatabase('Micheal Grove', 'English');
  // await sendRMPDataToDataBase(scraped_comments);
  await sendRMPSummarySentiment(scraped_comments);
});

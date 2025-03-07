import scraped_comments from 'scraped_comments.json';
import { sendRMPSummarySentiment, sendRMPDataToDataBase } from './database.services';
import { Router } from 'express';
import { db } from '@/lib/utils/db';
// set the router
// TODO : define routes for making get request to send to client side as well
// HINT : look into findMany method within prisma
const databaseRouter = Router();

// works
// TODO : perform additional tests for verification
databaseRouter.post('/sendRMPData', async (req, res, next) => {
  try {
    await sendRMPDataToDataBase(scraped_comments);
    res.status(200).send('Data Sent Successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error!');
    next(err);
  }
});

// works
// TODO : perform additional further tests for verifications
databaseRouter.post('/sendRMPSummary', async (req, res, next) => {
  try {
    await sendRMPSummarySentiment(scraped_comments);
    res.status(200).send('Data Sent Successfully!');
    console.log('Data Done Sending');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
    next(err);
  }
});

// _req is not being used in this case
// works
// TODO : perform further tests for verifications
databaseRouter.get('/getRMPData', async (_req, res, next) => {
  try {
    // return all the data that the database contains
    const RMPData = await db.rateMyProfessorData.findMany();
    console.log(`The retrieved data is : ${JSON.stringify(RMPData)}`);
    res.status(200).send(RMPData);
  } catch (error) {
    console.log('There was an error retrieving data : ', error);
    res.status(500).send('Internal Server Error');
    next(error);
  }
});

// works
// TODO : perform further tests for verification
databaseRouter.get('/getRMPSummary', async (_req, res, next) => {
  try {
    // return all the data that the database contains
    const RMPSummary = await db.rateMyProfessorComments.findMany();
    console.log(`The retrieved data is : ${JSON.stringify(RMPSummary)}`);
    res.status(200).send(RMPSummary);
  } catch (error) {
    console.log('There was an error retrieving data : ', error);
    res.status(500).send('Internal Server Error');
    next(error);
  }
});

// TODO : test this
databaseRouter.get('/comments/:name/:department', async (req, res, next) => {
  // extract the information provided in the query params
  try {
    const { name, department } = req.query;
    const result = await db.rateMyProfessorData.findFirst({
      where: {
        professorName: name as any,
        department: department as any,
      },
    });

    res.status(200).send(result);
  } catch (error) {
    console.log('There was an error processing your request : ', error);
    res.status(500).send('Internal Serveer Error');
    next(error);
  }
});
// export out the router containing the post routes we have just defined
export default databaseRouter;

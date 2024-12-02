import scraped_comments from 'scraped_comments.json';
import { sendRMPSummarySentiment, sendRMPDataToDataBase } from './database.services';
import { Router } from 'express';

// set the router
// TODO : define routes for making get request to send to client side as well
// HINT : look into findMany method within prisma
const databaseRouter = Router();
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

databaseRouter.post('/sendRMPSummary', async (req, res, next) => {
  try {
    await sendRMPSummarySentiment(scraped_comments);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
    next(err);
  }
});

// export out the router containing the post routes we have just defined
export default databaseRouter;

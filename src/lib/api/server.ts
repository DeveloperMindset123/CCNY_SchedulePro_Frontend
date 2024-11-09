import authRouter from './auth/auth.routes';
import express from 'express';
import userRouter from './users/users.routes';
import onboardingRouter from './onboarding/onboarding.routes';
//import { createMap, gatherSummaryByDepartment } from '../utils/RMPScraper';
//import { gatherRMPSummary } from '../utils/RMPScraper';
//import { department_list, department_professor_object } from '../utils/data/constants';

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

app.listen('4001', async () => {
  // TODO : call on the final function here
  //await gatherSummaryByDepartment(inputMap, 'american studies'); --> this function gets called in the scraper itself
  console.log(`Listening to port 4001`);
});

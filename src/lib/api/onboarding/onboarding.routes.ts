import { Router } from 'express';
//import { insertUserInformationDetails } from './onboarding.services';

// function to generate a landom string
function makeid(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const onboardingRouter = Router();
// ** use this to store the data
// initialize with default values
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const retrievedData = {
  username: makeid(Math.floor(Math.random() * 10)),
  //email: 'exampleUsername',
  emailDuplicate: 'example@123.com',
  degreeType: 'Undecided',
  major: 'Undecided',
  DOB: '0/0/0',
  CollegeYear: 1,
  pronouns: 'undecided',
  Hobbies: '',
  Gender: '',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
onboardingRouter.post('/onboarding1Data', async (req, res, next) => {
  try {
    const data = req.body;
    if (!data) {
      res.status(400);
      throw new Error('There was a problem in data retrieval');
    } else {
      // TODO : add it to the object
      res.send(data);
    }
  } catch (err) {
    throw new Error('Not yet implemented');
  }
});
// TODO : Define a function that will handle autoamtically calling the data using axios
onboardingRouter.post('/onboarding2Data', async (req, res, next) => {
  try {
    const data = req.body;
    if (!data) {
      res.status(400);
      throw new Error('Either degree or major field is empty');
    } else {
      setOnboarding2Data(data);
      res.send(data);
    }
  } catch (err) {
    res.status(500).send('Internal Server Error');
    console.error(err);
    next(err);
  }
});

onboardingRouter.post('/onboarding3Data', async (req, res, next) => {
  // Not sure if this is fully correct or not
  const data = req.body;
  if (!data) {
    res.status(400);
    next();
    throw new Error('Some of the data is missing');
  } else {
    res.send('Successfully sent data');
    setOnboarding3Data(data);
    res.send(data);
  }
});
// TODO : Define a class, use setters and getter functions
// @see https://www.typescripttutorial.net/typescript-tutorial/typescript-getters-setters/
// above link explains potential implementation using classes
// this is the use case appropriate
export const setOnboarding2Data = (onboarding2Data: any) => {
  console.log(onboarding2Data);
  return onboarding2Data;
};

export const setOnboarding3Data = (onboarding3Data: any) => {
  console.log(onboarding3Data);
  return onboarding3Data;
};

export default onboardingRouter;

import { Router } from 'express';

const onboardingRouter = Router();
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
    setOnboarding3Data(data);
    res.send(data);
  }
});

export const setOnboarding2Data = (onboarding2Data: any) => {
  console.log(onboarding2Data);
  return onboarding2Data;
};

export const setOnboarding3Data = (onboarding3Data: any) => {
  console.log(onboarding3Data);
  return onboarding3Data;
};

export default onboardingRouter;

import { Router } from 'express';

const onboardingRouter = Router();
// TODO : Define a function that will handle autoamtically calling the data using axios
onboardingRouter.post('/onboarding2Data', async (req, res, next) => {
  try {
    const { degree, major } = req.body;
    if (!degree || !major) {
      res.status(400);
      throw new Error('Either degree or major field is empty');
    } else {
      setOnboarding2Data({
        degree: degree,
        major: major,
      });
      res.send({
        degree: degree,
        major: major,
      });
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
    throw new Error('Some of the data is missing');
  } else {
    setOnboarding3Data(data);
    res.send(data);
  }
});

export const setOnboarding2Data = (onboarding2Data: any) => {
  return onboarding2Data;
};

export const setOnboarding3Data = (onboarding3Data: any) => {
  return onboarding3Data;
};

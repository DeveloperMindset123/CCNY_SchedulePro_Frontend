import { Router } from 'express';

const onboardingRouter = Router();
// TODO : Define a function that will handle autoamtically calling the data using axios
// TODO : the axios method will be a get method, since we want to return the data
onboardingRouter.post('/onboarding2Data', async (req, res, next) => {
  try {
    const { degree, major } = req.body;
    if (!degree || !major) {
      res.status(400);
      throw new Error('Either degree or major field is empty');
    } else {
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

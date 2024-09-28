// TODO : remove this later once the values are being used
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { generateAccessAndRefreshTokens } from '../../utils/jwt';
import { addRefreshTokenToWhiteList } from './auth.services';
import { findUserByEmail, createUserByEmailAndPassword } from '../users/users.services';

//const app = express();
//@see https://expressjs.com/en/guide/routing.html
const authRouter = Router();

// TODO : Test this route using CURL
authRouter.post('/register', async (req, res, next) => {
  try {
    // object destructuring to help retrieve
    // @see https://www.geeksforgeeks.org/how-to-post-json-data-using-curl/
    // this is the data we provide during an API call
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error('You must provide an email and a password.');
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      res.status(404).send({
        message: `The email ${email} is already in use, please login instead.`,
      });
      throw new Error('The email is already in use');
    }

    const user = await createUserByEmailAndPassword({ email, password });
    // @see https://stackoverflow.com/questions/20342058/which-uuid-version-to-use
    const jti = uuidv4();
    const { accessToken, refreshToken } = generateAccessAndRefreshTokens(user, jti);
    // TODO : remove this comment maybe
    // jti is the unique id assigned to the newly created user, think of it as the primary key
    await addRefreshTokenToWhiteList({ jti, refreshToken, userId: user.id });
    /*res.status(200).send({
      message: 'Successfully created new user!',
    }); */

    res
      .json({
        accessToken,
        refreshToken,
      })
      .status(200);
  } catch (err) {
    //next(err);
    console.error(err);
  }
});

//export default authRouter;
/*
app.use('/auth', authRouter);
app.listen('4000', () => {
  try {
    console.log('Connection successful!');
  } catch (err) {
    console.error(err);
  }
});
*/
export { authRouter };

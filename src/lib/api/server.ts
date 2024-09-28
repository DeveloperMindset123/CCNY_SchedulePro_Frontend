/* eslint-disable @typescript-eslint/no-unused-vars */
//! use this to add all the relevant main routes here

//import { authRouter } from './auth/auth.routes';
import express from 'express';

const app = express();
// ** needed to add express.json()
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const router = express.Router();
//router.use('/auth', authRouter);
//http://localhost:4001/auth/register

app.get('/test', (req, res) => {
  console.log('hello world');
  res.send('Hello from A!').status(200);
});

app.listen('4001', () => {
  console.log(`Listening to port 4001`);
});

import { v4 as uuidv4 } from 'uuid';
import { generateAccessAndRefreshTokens } from '../utils/jwt';
import { addRefreshTokenToWhiteList } from './auth/auth.services';
import { findUserByEmail, createUserByEmailAndPassword } from './users/users.services';

//const app = express();
//@see https://expressjs.com/en/guide/routing.html
const authRouter = express.Router();

// TODO : Test this route using CURL
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.post('/register', async (req, res, next) => {
  try {
    // @see https://www.geeksforgeeks.org/how-to-post-json-data-using-curl/
    // ! issue here
    if (req.body) {
      console.log('body', req.body);
      // console.log('lot', JSON.parse(req.body));
    } else {
      console.log('Unable to extract data');
    }

    //return;
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

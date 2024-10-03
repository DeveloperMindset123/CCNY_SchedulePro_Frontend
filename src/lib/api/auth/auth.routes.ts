import { encryptToken } from '@/lib/utils/tokenization';
import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { generateAccessAndRefreshTokens } from '../../utils/jwt';
import {
  addRefreshTokenToWhiteList,
  decryptToken,
  deleteRefreshToken,
  findRefreshTokenById,
  revokeTokens,
} from './auth.services';
import {
  findUserByEmail,
  createUserByEmailAndPassword,
  findUserById,
} from '../users/users.services';
const bcrypt = import('bcrypt-ts');
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
interface userSchema {
  email: string;
  plainTextPassword: string;
  password: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

//type existingUserTypes = userSchema;
type payloadTypes = string | JwtPayload | any;

// * @see https://expressjs.com/en/guide/routing.html
const authRouter = Router();

// TODO : Clean up bloated comments
// ! add the /register endpoint
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

    const user = await createUserByEmailAndPassword({
      email,
      password,
      plainTextPassword: password,
    });

    console.log(`newly created user : ${user}`);
    //user.plainTextPassword = password;
    // @see https://stackoverflow.com/questions/20342058/which-uuid-version-to-use
    const jti = uuidv4();
    const { accessToken, refreshToken } = generateAccessAndRefreshTokens(user, jti);
    // encrypts before adding it
    await addRefreshTokenToWhiteList({ jti, refreshToken, userId: user.id });
    res
      .json({
        accessToken,
        refreshToken,
      })
      .status(200);
  } catch (err) {
    //next(err);
    res.status(500).send('Internal Server Error!');
    console.error(err);
    next(err);
  }
});

authRouter.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send('Missing either email or password');
      throw new Error('You must provide an email and a password.');
    }
    // otherwise, check if the user exists by email
    const existingUser: userSchema | any = await findUserByEmail(email);
    // in the event that user doesn't exist, provide an error stating that
    if (!existingUser) {
      res.status(403).send({
        message: `There is no user with the email ${email}, please register first before signing in.`,
      });
    }

    //@see https://typescript-eslint.io/rules/ban-ts-comment/
    // ** This always seems to return true even if the password is incorrect
    const validPassword = (await bcrypt).compare(password, String(existingUser.password).trim());
    const checkForValidity: boolean = password === existingUser?.plainTextPassword ? true : false;

    if (!validPassword || !checkForValidity) {
      res.status(403).send('The passwords do not match, please try again');
      throw new Error('Invalid login credentials');
    }
    const jti = uuidv4();
    const { accessToken, refreshToken } = generateAccessAndRefreshTokens(existingUser, jti);
    await addRefreshTokenToWhiteList({ jti, refreshToken, userId: existingUser?.id });
    res.status(200).send({
      'access token': accessToken,
      'refresh token': refreshToken,
      'current userid': existingUser?.id,
    });
  } catch (err) {
    res.status(500).send('Internal Server Error!');
    console.error(err);
    next(err);
  }
});

// TODO : Broken, fix later, helpful for recurring login and should be used alongside /login, ideally
authRouter.post('/refreshToken', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const originalRefreshToken = decryptToken(refreshToken);
    // TODO : Figure out why this api endpoint isn't working as intended, low priority
    console.log(`The original refreshToken is : ${originalRefreshToken}`);
    if (!originalRefreshToken) {
      res.status(400).send('Invalid Refresh Token');
      throw new Error('Missing refresh token');
    }
    const payload: payloadTypes = jwt.verify(
      originalRefreshToken,
      process.env.JWT_REFRESH_SECRET ? process.env.JWT_REFRESH_SECRET : 'MYOTHERSECRET321'
    );

    const savedRefreshToken = await findRefreshTokenById(payload.jti);

    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      res.status(401).send('Not authorized to enter');
      console.log(`Payload : ${payload}`);
      console.log(`Saved Refreshed Token : ${JSON.stringify(savedRefreshToken)}`);
      throw new Error('Unauthorized entry');
    }

    const hashedToken = encryptToken(refreshToken);
    if (hashedToken !== savedRefreshToken.hashedToken) {
      res.status(401);
      throw new Error('Unauthorized Entry, mismatch of refresh tokens');
    }

    const user: any = findUserById(payload.userId);
    if (!user) {
      res.status(401).send({
        message: 'User does not exist',
      });
      throw new Error('Unauthorized, user does not exist');
    }
    await deleteRefreshToken(savedRefreshToken.id);
    const jti = uuidv4();
    const { accessToken, refreshToken: newRefreshToken } = generateAccessAndRefreshTokens(
      user,
      jti
    );
    await addRefreshTokenToWhiteList({
      jti,
      refreshToken: newRefreshToken,
      userId: user.id,
    });

    res.json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    res.status(500).send('Internal Server Error!');
    console.error(err);
    next(err);
  }
});

// TODO : Broken, fix later, need /refreshToken to work before revokeRefreshToken can work, intended for use in the event that user decides to reset their password.
authRouter.post('/revokeRefreshTokens', async (req, res, next) => {
  try {
    const { userId } = req.body;
    await revokeTokens(userId);
    res.status(200).send({
      message: `Tokesn revoked for use with id #${userId}`,
    });
  } catch (err) {
    res.status(500).send({
      message: 'Internal Server Error',
    });
    console.error(err);
    // default error handler function
    next(err);
  }
});

// ? @see https://medium.com/@xiaominghu19922/proper-error-handling-in-express-server-with-typescript-8cd4ffb67188#:~:text=The%20default%20error%20handler%20takes,any)%20in%20the%20middleware%20stack. --> to understand how the express error handling function works by default.
export default authRouter;

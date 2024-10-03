import { Router, Request, Response, NextFunction } from 'express';
import express from 'express';
import { isAuthenticated } from '@/middleware';
import { findUserById } from './users.services';
import { User } from '@prisma/client';

//@see https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types
// ! Not fully sure if this approach is correct
type Partial<T> = {
  [P in keyof T]?: T[P];
};
type customUserType = Partial<User> | undefined | null;
const userRouter = Router();
// to allow for the routes to accept data in application/json format
userRouter.use(express.json());
userRouter.get(
  '/profile',
  isAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.payload;
      // TODO : Remove later, just to check to see if it exists or not
      console.log(`The user id is : ${userId}`);
      const user: customUserType = await findUserById(userId);
      // ! if I don't use the above approach, delete causes an error
      //@see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
      // * we are concerned mainly with deleting the password here
      delete user?.password;
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

export default userRouter;

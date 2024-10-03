import { Router, Request, Response, NextFunction } from 'express';
import express from 'express';
import { isAuthenticated } from '@/middleware';
import { findUserById } from './users.services';
import { User } from '@prisma/client';

//@see https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types
type Partial<T> = {
  [P in keyof T]?: T[P];
};
type customUserType = Partial<User> | undefined | null;
const userRouter = Router();
userRouter.use(express.json());
userRouter.get(
  '/profile',
  isAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.payload;
      const user: customUserType = await findUserById(userId);
      // ! if I don't use the above approach, delete causes an error, might be a better workaround solution to this
      //@see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
      delete user?.password;
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

export default userRouter;

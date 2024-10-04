import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).send({
      message: 'User not authorized to enter',
    });
    throw new Error('🚫 Un-Authorized 🚫');
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET ? process.env.JWT_ACCESS_SECRET : 'MYSECRET321'
    );
    //@see custom.d.ts for custom type override for Request
    // appends payload as one of the object's property
    req.payload = payload;
    // TODO : Delete this when functional
    console.log(`Payload being printed out : ${payload}`);
  } catch (err) {
    console.error(err);
    res.status(404).send('Error in execution');
    throw new Error('Unauthorized Entry');
  }
  return next();
}

/* eslint-disable @typescript-eslint/no-explicit-any */
// ? for encryption
import * as jwt from 'jsonwebtoken';

// TODO : Remove later
// see if it exists
console.log(process.env.JWT_ACCESS_SECRET);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generateAccessToken(user: any) {
  // ** @see https://jwt.io/introduction
  return jwt.sign(
    {
      userId: user?.id,
    },
    // TODO : Remove string before commiting
    process.env.JWT_ACCESS_SECRET ? process.env.JWT_ACCESS_SECRET : 'MYSECRET321',
    {
      expiresIn: '5m',
    }
  );
}

// TODO : Remove this once the function is invoked with the appropriate params
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generateRefreshToken(user: { id: any }, jti: any) {
  return jwt.sign(
    {
      userId: user.id,
      jti,
    },
    process.env.JWT_REFRESH_SECRET ? process.env.JWT_REFRESH_SECRET : 'MYOTHERSECRET321',
    {
      // TODO : Modify this as needed
      expiresIn: '8h',
    }
  );
}

// TODO : Remove this once the functon is invoked with the appropriate params
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generateAccessAndRefreshTokens(user: any, jti: any) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  console.log(`The access token is ${accessToken}\n`);
  console.log(`The refresh token is ${refreshToken}`);
  return {
    accessToken,
    refreshToken,
  };
}

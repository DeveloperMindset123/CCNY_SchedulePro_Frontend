/* eslint-disable @typescript-eslint/no-explicit-any */
// ? for encryption
import * as jwt from 'jsonwebtoken';

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

export function generateRefreshToken(user: { id: any }, jti: any) {
  return jwt.sign(
    {
      userId: user.id,
      jti,
    },
    process.env.JWT_REFRESH_SECRET ? process.env.JWT_REFRESH_SECRET : 'MYOTHERSECRET321',
    {
      expiresIn: '8h',
    }
  );
}

export function generateAccessAndRefreshTokens(user: any, jti: any) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  // TODO : Remove these, these were simply methods to check if everything is working as intended
  console.log(`The access token is ${accessToken}\n`);
  console.log(`The refresh token is ${refreshToken}`);
  return {
    accessToken,
    refreshToken,
  };
}

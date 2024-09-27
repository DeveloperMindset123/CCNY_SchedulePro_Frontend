/* eslint-disable @typescript-eslint/no-unused-vars */
import db from '@/lib/utils/db';
import hashToken from '@/lib/utils/hashToken';

// TODO : too many errors being raised with using any
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function addRefreshTokenToWhiteList({
  jti,
  refreshToken,
  userId,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jti: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refreshToken: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userId: any;
}) {
  return db.refreshTokens.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      userId,
    },
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function findRefreshTokenById(id: any) {
  return db.refreshTokens.findUnique({
    where: {
      id,
    },
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function deleteRefreshToken(id: any) {
  return db.refreshTokens.updateMany({
    where: {
      id,
    },
    data: {
      revoked: true,
    },
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function revokeTokens(userId: any) {
  return db.refreshTokens.updateMany({
    where: {
      userId,
    },
    data: {
      revoked: true,
    },
  });
}

// TODO : Continue at STEP 7

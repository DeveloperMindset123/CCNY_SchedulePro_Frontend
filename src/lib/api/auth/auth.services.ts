/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from '../../utils/db';
import * as cryptoTS from 'crypto-ts';

export function encryptToken(token: any) {
  const cipherText = cryptoTS.AES.encrypt(
    JSON.stringify(token),
    process.env.MY_ENCRYPTION_KEY ? process.env.MY_ENCRYPTION_KEY.toString() : 'MYENCRYPTIONKEY'
  );
  return cipherText.toString();
}

export function decryptToken(token: any) {
  const cipherText = encryptToken(token);
  const bytes = cryptoTS.AES.decrypt(
    cipherText.toString(),
    process.env.MY_DECRYPTION_KEY ? process.env.MY_DECRYPTION_KEY.toString() : 'MYDECRYPTIONKEY'
  );
  const decryptedData = JSON.parse(bytes.toString(cryptoTS.enc.Utf8));
  return decryptedData;
}
export function addRefreshTokenToWhiteList({
  jti,
  refreshToken,
  userId,
}: {
  jti: any;
  refreshToken: any;
  userId: any;
}) {
  return db.refreshTokens.create({
    data: {
      id: jti,
      hashedToken: encryptToken(refreshToken),
      userId,
    },
  });
}
export function findRefreshTokenById(id: any) {
  return db.refreshTokens.findUnique({
    where: {
      id,
    },
  });
}
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

/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from '../../utils/db';
import * as cryptoTS from 'crypto-ts';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
//import { encryptToken } from '@/lib/utils/tokenization';
// TODO : Remove later

function encryptToken(token: any) {
  const cipherText = cryptoTS.AES.encrypt(
    JSON.stringify(token),
    process.env.MY_ENCRYPTION_KEY ? process.env.MY_ENCRYPTION_KEY.toString() : 'MYENCRYPTIONKEY'
  );
  return cipherText.toString();
}

function decryptToken(token: any) {
  const cipherText = encryptToken(token);
  const bytes = cryptoTS.AES.decrypt(
    cipherText.toString(),
    process.env.MY_DECRYPTION_KEY ? process.env.MY_DECRYPTION_KEY.toString() : 'MYDECRYPTIONKEY'
  );
  const decryptedData = JSON.parse(bytes.toString(cryptoTS.enc.Utf8));
  return decryptedData;
}
//import crypto from 'crypto';
//import { PrismaClient } from "@prisma/client";

/*
const db = new PrismaClient();

export default function hashToken(token: crypto.BinaryLike) {
  // TODO : hashing logic, modify as needed
  return crypto.createHash('sha512').update(token).digest('hex');
} */
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

/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as cryptoTS from 'crypto-ts';

export function encryptToken(token: any) {
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

module.exports = {
  encryptToken,
  decryptToken,
};

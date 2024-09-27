import crypto from 'crypto';

export default function hashToken(token: crypto.BinaryLike) {
  // TODO : hashing logic, modify as needed
  return crypto.createHash('sha512').update(token).digest('hex');
}

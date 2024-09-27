import { hashSync } from 'bcrypt-ts';
import db from '@/lib/utils/db';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
function findUserByEmail(email: any) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createUserByEmailAndPassword(user: any) {
  // TODO : Modify this as needed
  user.password = hashSync(user.password, 12);
  return db.user.create({
    data: user,
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function findUserById(id: any) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}

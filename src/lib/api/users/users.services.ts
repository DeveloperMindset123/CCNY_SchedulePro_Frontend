import { hashSync } from 'bcrypt-ts';
import { db } from '/Users/ayandas/Desktop/VS_Code_Projects/CCNY_SchedulePro/src/lib/utils/db';

export function findUserByEmail(email: any) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

export function createUserByEmailAndPassword(user: any) {
  // store plainText before hashing
  user.plainTextPassword = user.password;
  user.password = hashSync(user.password, 12);
  return db.user.create({
    data: user,
  });
}

export function findUserById(id: any) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}

import { hashSync } from 'bcrypt-ts';
import { db } from "/Users/ayandas/Desktop/VS_Code_Projects/CCNY_SchedulePro/src/lib/utils/db";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export function findUserByEmail(email: any) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createUserByEmailAndPassword(user: any) {
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

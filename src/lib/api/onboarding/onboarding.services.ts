// TODO : define database logic here
import { db } from '@/lib/utils/db';
import { Prisma } from '@prisma/client';

// This will update information relevant to the user
export const insertUserInformationDetails = (RegisteredUser: any) => {
  const UserDetail: Prisma.UserRegistrationDetailsCreateInput = {
    // Generates a random userID
    userID: Math.floor(Math.random() * 10000) + 1,
    username: RegisteredUser.username,
    emailDuplicate: RegisteredUser.email,
    degreeType: RegisteredUser.degreeType,
    major: RegisteredUser.major,
    DOB: RegisteredUser.DOB,
    CollegeYear: RegisteredUser.CollegeYear,
    pronouns: RegisteredUser.pronouns ? RegisteredUser.pronouns : ' ',
    Hobbies: RegisteredUser.hobbies ? RegisteredUser.hobbies : 'Not Specified',
    Gender: RegisteredUser.gender ? RegisteredUser.Gender : 'Other',
  };

  return db.userRegistrationDetails.create({
    data: UserDetail,
  });
};

// TODO : Implement the logic for this
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const updateUserInformationDetails = (ExistingUser: any) => {
  throw new Error('Not yet implemented!');
};

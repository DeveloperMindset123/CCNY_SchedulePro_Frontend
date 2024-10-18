import { findUserByEmail } from '@/lib/api/users/users.services';

export const checkIfUserExists = async (inputEmail: any) => {
  try {
    const existingUser = await findUserByEmail(inputEmail);
    if (existingUser) {
      console.log('This function has been successfully executed');
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    throw new Error('Unable to execute this function');
  }
};

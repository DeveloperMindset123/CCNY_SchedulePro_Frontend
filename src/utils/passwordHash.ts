import { genSaltSync, hashSync, compareSync } from 'bcrypt-ts';

export const hashPassword = (plainPassword: string): string => {
  return hashSync(plainPassword, genSaltSync(5));
};

// provide 2 params : the password the user entered and the hashed password stored within the database
// this will check and compare if the user input matches the hashed password, if so, return true, otherwise return false
export const comparePassword = (
  user_password_input: string,
  database_hashed_password: string
): boolean => {
  return compareSync(user_password_input, database_hashed_password);
};

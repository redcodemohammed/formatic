import { compare, hash } from "bcrypt";

export const hashPassword = (password: string): Promise<string> => {
  return hash(password, 10);
};

export const verifyPassword = (password: string, hashedPassword: string): Promise<Boolean> => {
  return compare(password, hashedPassword);
};

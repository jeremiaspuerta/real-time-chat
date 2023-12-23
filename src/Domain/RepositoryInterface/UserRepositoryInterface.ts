import { User } from "@prisma/client";

export type UserCreation = {
  name: string;
  email: string;
  password: string;
}
export interface UserRepositoryInterface {
  getUsers(): Promise<User[]>;
  // eslint-disable-next-line no-unused-vars
  findUser(email: string): Promise<User|null>;
  // eslint-disable-next-line no-unused-vars
  createUser(user: UserCreation): Promise<boolean>;
}

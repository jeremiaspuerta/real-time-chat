import { Prisma, User } from "@prisma/client";

export type UserCreation = {
  name: string;
  email: string;
  password: string;
};

export type UserLogIn = {
  email: string;
  password: string;
};
export interface UserRepositoryInterface {
  // eslint-disable-next-line no-unused-vars
  findMany(where?: Prisma.UserWhereInput): Promise<User[]>;
  // eslint-disable-next-line no-unused-vars
  find(email: string): Promise<User | null>;
  // eslint-disable-next-line no-unused-vars
  createUser(user: UserCreation): Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  update(userId: string, data: Partial<User>): Promise<boolean>;
}

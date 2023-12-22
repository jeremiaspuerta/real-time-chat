import { User } from "@prisma/client";

export interface UserRepositoryInterface {
  getUsers(): Promise<User[]>;
}

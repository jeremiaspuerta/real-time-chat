import { PrismaClient, User } from "@prisma/client";
import { UserCreation, UserRepositoryInterface } from "../Domain/RepositoryInterface/UserRepositoryInterface";
import {hash} from "bcrypt";

export class UserRepository implements UserRepositoryInterface {
  private prisma = new PrismaClient();

  async getUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return users;
  }

  async findUser(email: string): Promise<User|null> {
    try {
      const user = await this.prisma.user.findFirstOrThrow({
        where: {
          email: email
        }
      })

      return user;
    } catch (error) {
      return null;
    }

  }

  async createUser(user: UserCreation): Promise<boolean> {
    // TODO
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const password = await hash(user.password,5) as string;

    try {
      await this.prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: password ,
          createdAt: new Date().toISOString(),
          status: "offline",
        }
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }

  }


}


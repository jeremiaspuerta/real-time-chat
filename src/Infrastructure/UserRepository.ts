import { Prisma, PrismaClient, User } from "@prisma/client";
import {
  UserCreation,
  UserRepositoryInterface,
} from "../Domain/RepositoryInterface/UserRepositoryInterface";
import { hash } from "bcrypt";

export class UserRepository implements UserRepositoryInterface {
  private prisma = new PrismaClient();

  async find(email: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findFirstOrThrow({
        where: {
          email: email,
        },
      });

      return user;
    } catch (error) {
      return null;
    }
  }

  async findMany(where?: Prisma.UserWhereInput): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where,
    });

    return users;
  }

  async createUser(user: UserCreation): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const password = await hash(user.password, 5);

    try {
      await this.prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          password: password,
          createdAt: new Date().toISOString(),
          status: "offline",
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

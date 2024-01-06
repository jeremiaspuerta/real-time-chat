import { Prisma, User } from "@prisma/client";
import { UserRepositoryInterface } from "@/domain/RepositoryInterface/UserRepositoryInterface";
import { hash } from "bcrypt";
import { UserCreation } from "@/types";
import PrismaClientHelper from "@/helpers/PrismaClientHelper";

export class UserRepository implements UserRepositoryInterface {
  private prisma = PrismaClientHelper;

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
    const password = await hash(user.password, 5);

    try {
      await this.prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
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

  async update(userId: string, data: Partial<User>): Promise<boolean> {
    try {
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data,
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}

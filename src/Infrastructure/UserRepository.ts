import { UserRepositoryInterface } from "@/Domain/RepositoryInterface/UserRepositoryInterface";
import { PrismaClient, User } from "@prisma/client";

export class UserRepository implements UserRepositoryInterface {
  private prisma = new PrismaClient();

  async getUsers(): Promise<User[]> {
    const data = await this.prisma.user.findMany();

    return data;
  }
}

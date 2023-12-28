import prismaClient from "../Helper/PrismaClientHelper";
import { MessageRepositoryInterface } from "../Domain/RepositoryInterface/MessageRepositoryInterface";

export class MessageRepository implements MessageRepositoryInterface {
  private prisma = prismaClient;

  async create(
    chatId: string,
    userId: string,
    message: string,
  ): Promise<boolean> {
    try {
      await this.prisma.message.create({
        data: {
          chatId,
          userId,
          text: message,
          createdAt: new Date().toISOString(),
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

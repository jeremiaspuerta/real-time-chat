import { Chat } from "@prisma/client";
import { ChatRepositoryInterface } from "../Domain/RepositoryInterface/ChatRepositoryInterface";
import prismaClient from "../Helper/PrismaClientHelper";

export class ChatRepository implements ChatRepositoryInterface {
  private prisma = prismaClient;

  async find(chatId: string): Promise<false | Chat> {
    try {
      const chat = await this.prisma.chat.findFirst({
        where: {
          id: chatId,
        },
        include: {
          Message: {
            include: { user: true },
          },
          ChatUser: {
            include: { user: true },
          },
        },
      });

      return chat;
    } catch (error) {
      return false;
    }
  }

  async create(userIds: string[]): Promise<Chat | false> {
    try {
      const chat = await this.prisma.chat.create({
        data: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ChatUser: {
            createMany: {
              data: userIds.map((userId) => ({
                userId,
              })),
            },
          },
        },
        include: {
          ChatUser: true,
        },
      });

      return chat;
    } catch (error) {
      return false;
    }
  }

  async findByUserIds(userIds: string[]): Promise<Chat | false> {
    try {
      const chat = await this.prisma.chat.findFirst({
        where: {
          ChatUser: {
            every: {
              userId: {
                in: userIds,
              },
            },
          },
        },
        include: {
          ChatUser: true,
        },
      });

      return chat ?? false;
    } catch (error) {
      return false;
    }
  }
}

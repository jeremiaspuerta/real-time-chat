import { Chat } from "@prisma/client";
import { ChatRepositoryInterface } from "../Domain/RepositoryInterface/ChatRepositoryInterface";
import prismaClient from "../Helper/PrismaClientHelper";

export class ChatRepository implements ChatRepositoryInterface {
  private prisma = prismaClient;

  async createChat(userIds: string[]): Promise<Chat | false> {
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

  async findChatByUserIds(userIds: string[]): Promise<Chat | false> {
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

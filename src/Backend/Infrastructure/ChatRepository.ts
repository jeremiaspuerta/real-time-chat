import { Chat } from "@prisma/client";
import { ChatRepositoryInterface } from "@/domain/RepositoryInterface/ChatRepositoryInterface";
import PrismaClientHelper from "@/helpers/PrismaClientHelper";

export class ChatRepository implements ChatRepositoryInterface {
  private prisma = PrismaClientHelper;

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

      if (!chat) {
        return false;
      }

      chat.Message.forEach((message) => {
        if (message.createdAt) {
          const createdAtDate = new Date(message.createdAt);
          const formattedDate = `${createdAtDate.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })} ${createdAtDate.toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          })}`;

          message.createdAt = formattedDate;
        }
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

  async findManyByUserIds(userIds: string[]): Promise<Chat[] | false> {
    try {
      const chat = await this.prisma.chat.findMany({
        where: {
          ChatUser: {
            some: {
              userId: {
                in: userIds,
              },
            },
          },
        },
        include: {
          ChatUser: {
            include: {
              user: true,
            },
          },
        },
      });

      return chat ?? false;
    } catch (error) {
      return false;
    }
  }
}

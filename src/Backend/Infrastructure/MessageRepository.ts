import { MessageRepositoryInterface } from "@/domain/RepositoryInterface/MessageRepositoryInterface";
import PrismaClientHelper from "@/helpers/PrismaClientHelper";
import { MessageWithUser } from "@/types";

export class MessageRepository implements MessageRepositoryInterface {
  private prisma = PrismaClientHelper;

  async create(
    chatId: string,
    userId: string,
    message: string,
  ): Promise<MessageWithUser | false> {
    try {
      const creationMessage = await this.prisma.message.create({
        data: {
          chatId,
          userId,
          text: message,
          createdAt: new Date().toISOString(),
        },
      });
      const createdMessage = await this.prisma.message.findFirst({
        where: {
          id: creationMessage.id,
        },
        include: {
          user: true,
        },
      });

      if (createdMessage === null) return false;

      if (createdMessage.createdAt) {
        const createdAtDate = new Date(createdMessage.createdAt);
        const formattedDate = `${createdAtDate.toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })} ${createdAtDate.toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        })}`;

        createdMessage.createdAt = formattedDate;
      }

      return createdMessage;
    } catch (error) {
      return false;
    }
  }
}

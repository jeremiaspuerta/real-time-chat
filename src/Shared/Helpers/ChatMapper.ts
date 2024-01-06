import { Message, User } from "@prisma/client";
import { ChatType } from "@/domain/UseCase/GetChatUseCase";

export type ChatMapperType = {
  id: string;
  updatedAt: string;
  messages: Array<Message>;
  users: Array<{
    name: string;
    email: string;
    rol: "sender" | "recipient";
    status: string;
  }>;
};

export function chatMapper(
  chat: ChatType,
  senderEmail: string,
): ChatMapperType {
  const chatMapped: ChatMapperType = {
    id: chat.id,
    updatedAt: chat.updatedAt,
    messages: chat.Message,
    users: chat.ChatUser.map((item: { user: User }) => ({
      name: item.user.name,
      email: item.user.email,
      rol: item.user.email == senderEmail ? "sender" : "recipient",
      status: item.user.status,
    })),
  };
  return chatMapped;
}

export function manyChatsMapper(
  chats: Partial<ChatType>[],
  senderEmail: string,
): Partial<ChatMapperType>[] {
  const chatsMapped: Partial<ChatMapperType>[] = chats.map((chat) => ({
    id: chat.id,
    updatedAt: chat.updatedAt,
    users: chat.ChatUser.map((item: { user: User }) => ({
      name: item.user.name,
      email: item.user.email,
      rol: item.user.email == senderEmail ? "sender" : "recipient",
      status: item.user.status,
    })),
  }));

  return chatsMapped;
}

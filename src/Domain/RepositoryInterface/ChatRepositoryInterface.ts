import { Chat } from "@prisma/client";

export interface ChatRepositoryInterface {
  // eslint-disable-next-line no-unused-vars
  createChat(usersIds: string[]): Promise<Chat | false>;
  // eslint-disable-next-line no-unused-vars
  findChatByUserIds(usersIds: string[]): Promise<Chat | false>;
}

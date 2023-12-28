import { Chat } from "@prisma/client";

export interface ChatRepositoryInterface {
  // eslint-disable-next-line no-unused-vars
  find(chatId: string): Promise<Chat | false>;
  // eslint-disable-next-line no-unused-vars
  create(usersIds: string[]): Promise<Chat | false>;
  // eslint-disable-next-line no-unused-vars
  findByUserIds(usersIds: string[]): Promise<Chat | false>;
  // eslint-disable-next-line no-unused-vars
  findManyByUserIds(userIds: string[]): Promise<Chat[] | false>;
}

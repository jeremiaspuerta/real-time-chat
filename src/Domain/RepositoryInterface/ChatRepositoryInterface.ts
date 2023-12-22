import { Chat } from "@prisma/client";

export interface ChatRepositoryInterface {
    createChat(usersIds: string[]): Promise<Chat|false>;
    findChatByUserIds(usersIds: string[]): Promise<Chat|false>;
}
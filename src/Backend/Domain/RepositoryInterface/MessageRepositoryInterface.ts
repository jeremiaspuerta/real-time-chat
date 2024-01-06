/* eslint-disable no-unused-vars */
import { MessageWithUser } from "@/types";

export interface MessageRepositoryInterface {
  create(
    chatId: string,
    userId: string,
    message: string,
  ): Promise<MessageWithUser | false>;
}

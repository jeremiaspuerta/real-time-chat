import { Message, User } from "@prisma/client";
import { ChatRepository } from "@/infrastructure/ChatRepository";

export type ChatType = {
  id: string;
  updatedAt: string;
  createdAt: string;
  Message: Array<Message>;
  ChatUser: Array<{ user: User }>;
};

export class GetChatUseCase {
  private chatRepository: ChatRepository;

  constructor(chatRepository: ChatRepository) {
    this.chatRepository = chatRepository;
  }

  public async execute(chatId: string): Promise<ChatType> {
    const chat = await this.chatRepository.find(chatId);

    if (chat === false) {
      throw new Error("Chat not found.");
    }

    return chat as ChatType;
  }
}

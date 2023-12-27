import { Chat } from "@prisma/client";
import { ChatRepository } from "../../Infrastructure/ChatRepository";
import { UserRepository } from "../../Infrastructure/UserRepository";

export class CreateChatUseCase {
  private chatRepository: ChatRepository;
  private userRepository: UserRepository;

  constructor(chatRepository: ChatRepository, userRepository: UserRepository) {
    this.chatRepository = chatRepository;
    this.userRepository = userRepository;
  }

  public async execute(authUserEmail: string, userIdTo: string): Promise<Chat> {
    const { id: authUserId } = await this.userRepository.find(authUserEmail);

    const userIds = [authUserId, userIdTo];

    const findChat = await this.chatRepository.findByUserIds(userIds);

    if (typeof findChat == "object") {
      throw new Error("Chat exists!");
    }

    const chat = await this.chatRepository.create(userIds);

    if (chat === false) {
      throw new Error("An error ocurred trying to create the chat!");
    }

    return chat;
  }
}

import { ChatRepository } from "@/infrastructure/ChatRepository";
import { UserRepository } from "@/infrastructure/UserRepository";

export class GetChatsUseCase {
  private chatRepository: ChatRepository;
  private userRepository: UserRepository;

  constructor(chatRepository: ChatRepository, userRepository: UserRepository) {
    this.chatRepository = chatRepository;
    this.userRepository = userRepository;
  }

  public async execute(authUserEmail: string): Promise<unknown> {
    const user = await this.userRepository.find(authUserEmail);

    if (user === null) {
      throw new Error("User doesn't exists");
    }

    const { id: userId } = user;

    const chat = await this.chatRepository.findManyByUserIds([userId]);

    if (chat === false) {
      throw new Error("An error ocurred trying to get all the chats.");
    }

    return chat as unknown;
  }
}

import { UserRepository } from "../../Infrastructure/UserRepository";
import { MessageRepository } from "../../Infrastructure/MessageRepository";

export class SendMessageUseCase {
  private messageRepository: MessageRepository;
  private userRepository: UserRepository;

  constructor(
    messageRepository: MessageRepository,
    userRepository: UserRepository,
  ) {
    this.messageRepository = messageRepository;
    this.userRepository = userRepository;
  }

  public async execute(
    authUserEmail: string,
    chatId: string,
    message: string,
  ): Promise<void> {
    const { id: authUserId } = await this.userRepository.find(authUserEmail);

    const messageCreated = await this.messageRepository.create(
      chatId,
      authUserId,
      message,
    );

    if (!messageCreated) {
      throw new Error("An error ocurred trying to send the message");
    }
  }
}

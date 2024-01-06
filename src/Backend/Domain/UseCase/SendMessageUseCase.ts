import { MessageWithUser } from "@/types";
import { MessageRepository } from "@/infrastructure/MessageRepository";
import { UserRepository } from "@/infrastructure/UserRepository";

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
  ): Promise<MessageWithUser> {
    const user = await this.userRepository.find(authUserEmail);

    if (user === null) {
      throw new Error("User doesn't exists.");
    }

    const { id: authUserId } = user;

    const messageCreated = await this.messageRepository.create(
      chatId,
      authUserId,
      message,
    );

    if (messageCreated === false) {
      throw new Error("An error ocurred trying to send the message");
    }

    return messageCreated;
  }
}

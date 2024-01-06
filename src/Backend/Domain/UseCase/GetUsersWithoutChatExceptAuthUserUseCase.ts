import { User } from "@prisma/client";
import { UserRepository } from "@/infrastructure/UserRepository";
import { ChatRepository } from "@/infrastructure/ChatRepository";

type ChatUserType = {
  id: string;
  chatId: string;
  userId: string;
};

type ChatsByUserIdsType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  ChatUser: ChatUserType[];
};

export class GetUsersWithoutChatExceptAuthUserUseCase {
  private userRepository: UserRepository;
  private chatRepository: ChatRepository;

  constructor(userRepository: UserRepository, chatRepository: ChatRepository) {
    this.userRepository = userRepository;
    this.chatRepository = chatRepository;
  }

  public async execute(authUserEmail: string): Promise<User[]> {
    const allUsers = await this.userRepository.findMany({
      NOT: {
        email: authUserEmail,
      },
    });
    const usersIds = allUsers.map((user: User) => user.id);

    const chatsByUserIds = (await this.chatRepository.findManyByUserIds(
      usersIds,
    )) as unknown as ChatsByUserIdsType[];

    const usersWithChat = chatsByUserIds
      .map((chat: ChatsByUserIdsType) =>
        chat.ChatUser.map((chatUser: ChatUserType) => chatUser.userId),
      )
      .flat();

    const usersWithoutChat = await this.userRepository.findMany({
      AND: {
        id: {
          notIn: usersWithChat,
        },
        email: {
          not: authUserEmail,
        },
      },
    });

    return usersWithoutChat;
  }
}

import { User } from "@prisma/client";
import { UserRepository } from "../../Infrastructure/UserRepository";

export class GetUsersExceptAuthUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(authUserEmail: string): Promise<User[]> {
    const users = await this.userRepository.findMany({
      NOT: {
        email: authUserEmail,
      },
    });

    return users;
  }
}

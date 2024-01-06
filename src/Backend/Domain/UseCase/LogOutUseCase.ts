import { User } from "@prisma/client";
import { UserRepository } from "@/infrastructure/UserRepository";

export class LogOutUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(email: string): Promise<void> {
    const user = await this.getUser(email);
    await this.updateUserStatus(user.id);
  }

  private async updateUserStatus(userId: string): Promise<void> {
    const userUpdate = await this.userRepository.update(userId, {
      status: "offline",
    });

    if (!userUpdate) {
      throw new Error(`An error ocurred trying to update the user`);
    }
  }

  private async getUser(email: string): Promise<User> {
    const user = await this.userRepository.find(email);

    if (!user) {
      throw new Error(`User with this email doesn't exist`);
    }

    return user;
  }

}

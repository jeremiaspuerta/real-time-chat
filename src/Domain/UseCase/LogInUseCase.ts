import { User } from "@prisma/client";
import { UserRepository } from "../../Infrastructure/UserRepository";
import { compare } from "bcrypt";
import * as jwt from "jsonwebtoken";

export class LogInUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(email: string, password: string): Promise<string> {
    const user = await this.getUser(email);
    await this.validatePassword(password, user.password);
    await this.updateUserStatus(user.id);
    const userJwt = this.getUserJWT(email);

    return userJwt;
  }

  private async updateUserStatus(userId: string): Promise<void> {
    const userUpdate = await this.userRepository.update(userId, {
      status: "online",
    });

    if (!userUpdate) {
      throw new Error(`An error ocurred trying to update the user`);
    }
  }

  private getUserJWT(email: string): string {
    const userJwt = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        email,
      },
      "secret",
    );

    return userJwt;
  }

  private async validatePassword(
    plainPass: string,
    encryptedPass: string,
  ): Promise<void> {
    const isSamePassword = await compare(plainPass, encryptedPass);

    if (!isSamePassword) {
      throw new Error(`The password is wrong`);
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

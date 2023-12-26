import { User } from "@prisma/client";
import { UserRepository } from "../../Infrastructure/UserRepository";
import { compare } from "bcrypt";
import * as jwt from "jsonwebtoken";

export class LogInUseCase {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  public async execute(email: string, password: string): Promise<string> {
    const user = await this.getUser(email);
    await this.validatePassword(password, user.password);
    const userJwt = this.getUserJWT(email);

    return userJwt;
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
    const user = await this.repository.find(email);

    if (!user) {
      throw new Error(`User with this email doesn't exist`);
    }

    return user;
  }
}

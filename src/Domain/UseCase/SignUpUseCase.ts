import { UserRepository } from "../../Infrastructure/UserRepository";
import { UserCreation } from "../RepositoryInterface/UserRepositoryInterface";

export class SignUpUseCase {
  private repository: UserRepository

  constructor(repository: UserRepository){
    this.repository = repository;
  }

  public async execute(user: UserCreation): Promise<void>{
    await this.validateIfUserExists(user.email);

    const isUserCreated = await this.repository.createUser(user);

    if(!isUserCreated){
      throw new Error("Something went wrong. We're on it. Please try again later.");
    }
  }

  private async validateIfUserExists(email: string): Promise<void> {
    const user = await this.repository.findUser(email);
  
    if(user){
      throw new Error(`User with this email already exists`);
    }
  
  }
}
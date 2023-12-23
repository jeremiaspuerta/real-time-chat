import { NextRequest } from "next/server";
import { LogInUseCase } from "../../../../Domain/UseCase/LogInUseCase";
import { UserRepository } from "../../../../Infrastructure/UserRepository";
import { ErrorExceptionHelper } from "../../../../Helper/ErrorExceptionHelper";
import { CustomResponse } from "../../../../Helper/CustomResponse";
import { UserLogIn } from "../../../../Domain/RepositoryInterface/UserRepositoryInterface";

export interface SignUpRequest extends NextRequest {
  json(): Promise<UserLogIn>;
}

export async function POST(req: SignUpRequest) {
  const user = await req.json();

  const userRepository = new UserRepository();
  const logInUseCase = new LogInUseCase(userRepository);

  try {
    const jwtToken = await logInUseCase.execute(user.email, user.password);

    return new CustomResponse({ token: jwtToken }).ok();
  } catch (error) {
    const errorMessage = ErrorExceptionHelper.getMessage(error);
    return new CustomResponse({ message: errorMessage }).conflict();
  }
}

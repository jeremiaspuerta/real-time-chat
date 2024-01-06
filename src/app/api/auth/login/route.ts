import { NextRequest } from "next/server";
import { LogInUseCase } from "@/domain/UseCase/LogInUseCase";
import { UserRepository } from "@/infrastructure/UserRepository";
import { ErrorExceptionHelper } from "@/helpers/ErrorExceptionHelper";
import { CustomResponse } from "@/helpers/CustomResponse";
import { UserLogInType } from "@/types";

export interface SignUpRequest extends NextRequest {
  json(): Promise<UserLogInType>;
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

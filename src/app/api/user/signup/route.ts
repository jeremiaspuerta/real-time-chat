import { UserRepository } from "@/infrastructure/UserRepository";
import { NextRequest } from "next/server";
import { SignUpUseCase } from "@/domain/UseCase/SignUpUseCase";
import { ErrorExceptionHelper } from "@/helpers/ErrorExceptionHelper";
import { CustomResponse } from "@/helpers/CustomResponse";
import { UserCreation } from "@/types";

export interface SignUpRequest extends NextRequest {
  json(): Promise<UserCreation>;
}

export async function POST(req: SignUpRequest) {
  const user = await req.json();

  const signUpUseCase = new SignUpUseCase(new UserRepository());

  try {
    await signUpUseCase.execute(user);
  } catch (error) {
    const errorMessage = ErrorExceptionHelper.getMessage(error);
    return new CustomResponse({ message: errorMessage }).conflict();
  }

  return new CustomResponse({ message: "User created successfully" }).ok();
}

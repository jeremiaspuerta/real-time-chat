import { UserRepository } from "../../../../Infrastructure/UserRepository";
import { UserCreation } from "../../../../Domain/RepositoryInterface/UserRepositoryInterface";
import { NextRequest } from "next/server";
import { SignUpUseCase } from "../../../../Domain/UseCase/SignUpUseCase";
import { ErrorExceptionHelper } from "../../../../Helper/ErrorExceptionHelper";
import { CustomResponse } from "../../../../Helper/CustomResponse";

export interface SignUpRequest extends NextRequest {
  // let's say our request accepts name and age property
  json(): Promise<UserCreation>;
}

export async function POST(req: SignUpRequest) {
  
  const user = await req.json();

  const signUpUseCase = new SignUpUseCase(new UserRepository());

  try {
    await signUpUseCase.execute(user);
  } catch (error) {
    const errorMessage = ErrorExceptionHelper.getMessage(error);
    return (new CustomResponse({message: errorMessage})).conflict();
  }
  
  return (new CustomResponse({message: 'User created successfully'})).ok();
}


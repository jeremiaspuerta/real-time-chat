import { NextRequest, NextResponse } from "next/server";
import { UserRepository } from "../../../../Infrastructure/UserRepository";
import { GetUsersExceptAuthUserUseCase } from "../../../../Domain/UseCase/GetUsersExceptAuthUserUseCase";
import { getAuthTokenFromCookie } from "../../../../Helper/GetAuthTokenFromCookie";
import { decodeJwt } from "../../../../Helper/DecodeJwt";
import { ErrorExceptionHelper } from "../../../../Helper/ErrorExceptionHelper";
import { CustomResponse } from "../../../../Helper/CustomResponse";

export async function GET(req: NextRequest) {
  try {
    const authToken = getAuthTokenFromCookie(req);
    const { email } = decodeJwt(authToken);
    const getUsersExceptAuthUserUseCase = new GetUsersExceptAuthUserUseCase(
      new UserRepository(),
    );
    const users = await getUsersExceptAuthUserUseCase.execute(email);
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    const errorMessage = ErrorExceptionHelper.getMessage(error);
    return new CustomResponse({ message: errorMessage }).conflict();
  }
}

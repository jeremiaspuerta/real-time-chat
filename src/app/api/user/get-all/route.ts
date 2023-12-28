import { NextRequest, NextResponse } from "next/server";
import { UserRepository } from "../../../../Infrastructure/UserRepository";
import { getAuthTokenFromCookie } from "../../../../Helper/GetAuthTokenFromCookie";
import { decodeJwt } from "../../../../Helper/DecodeJwt";
import { ErrorExceptionHelper } from "../../../../Helper/ErrorExceptionHelper";
import { CustomResponse } from "../../../../Helper/CustomResponse";
import { GetUsersWithoutChatExceptAuthUserUseCase } from "../../../../Domain/UseCase/GetUsersWithoutChatExceptAuthUserUseCase";
import { ChatRepository } from "../../../../Infrastructure/ChatRepository";

export async function GET(req: NextRequest) {
  try {
    const authToken = getAuthTokenFromCookie(req);
    const { email } = decodeJwt(authToken);
    const userRepository = new UserRepository();
    const chatRepository = new ChatRepository();
    const getUsersWithoutChatExceptAuthUserUseCase =
      new GetUsersWithoutChatExceptAuthUserUseCase(
        userRepository,
        chatRepository,
      );
    const users = await getUsersWithoutChatExceptAuthUserUseCase.execute(email);
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    const errorMessage = ErrorExceptionHelper.getMessage(error);
    return new CustomResponse({ message: errorMessage }).conflict();
  }
}

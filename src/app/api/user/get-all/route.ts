import { NextRequest, NextResponse } from "next/server";
import { UserRepository } from "@/infrastructure/UserRepository";
import { decodeJwt } from "@/helpers/DecodeJwt";
import { ErrorExceptionHelper } from "@/helpers/ErrorExceptionHelper";
import { CustomResponse } from "@/helpers/CustomResponse";
import { GetUsersWithoutChatExceptAuthUserUseCase } from "@/domain/UseCase/GetUsersWithoutChatExceptAuthUserUseCase";
import { ChatRepository } from "@/infrastructure/ChatRepository";
import { AuthCookiesHelper } from "@/helpers/AuthCookiesHelper";

export async function GET(req: NextRequest) {
  try {
    const authCookiesHelper = new AuthCookiesHelper(req.cookies.getAll());
    const authToken = authCookiesHelper.getToken();
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

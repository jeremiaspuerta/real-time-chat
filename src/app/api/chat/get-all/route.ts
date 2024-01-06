import { NextRequest, NextResponse } from "next/server";
import { ErrorExceptionHelper } from "@/helpers/ErrorExceptionHelper";
import { CustomResponse } from "@/helpers/CustomResponse";
import { ChatRepository } from "@/infrastructure/ChatRepository";
import { decodeJwt } from "@/helpers/DecodeJwt";
import { manyChatsMapper } from "@/helpers/ChatMapper";
import { GetChatsUseCase } from "@/domain/UseCase/GetChatsUseCase";
import { UserRepository } from "@/infrastructure/UserRepository";
import { AuthCookiesHelper } from "@/helpers/AuthCookiesHelper";
import { ChatType } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const authCookiesHelper = new AuthCookiesHelper(req.cookies.getAll());
    const authToken = authCookiesHelper.getToken();
    const { email } = decodeJwt(authToken);
    const userRepository = new UserRepository();
    const chatRepository = new ChatRepository();
    const getChatUseCase = new GetChatsUseCase(chatRepository, userRepository);
    const chats = (await getChatUseCase.execute(email)) as ChatType[];
    const chatMapped = manyChatsMapper(chats, email);
    return NextResponse.json(chatMapped, { status: 200 });
  } catch (error) {
    const errorMessage = ErrorExceptionHelper.getMessage(error);
    return new CustomResponse({ message: errorMessage }).conflict();
  }
}

import { NextRequest, NextResponse } from "next/server";
import { ErrorExceptionHelper } from "@/helpers/ErrorExceptionHelper";
import { CustomResponse } from "@/helpers/CustomResponse";
import { GetChatUseCase } from "@/domain/UseCase/GetChatUseCase";
import { ChatRepository } from "@/infrastructure/ChatRepository";
import { decodeJwt } from "@/helpers/DecodeJwt";
import { chatMapper } from "@/helpers/ChatMapper";
import { AuthCookiesHelper } from "@/helpers/AuthCookiesHelper";

export async function GET(req: NextRequest) {
  try {
    const authCookiesHelper = new AuthCookiesHelper(req.cookies.getAll());
    const authToken = authCookiesHelper.getToken();
    const { email } = decodeJwt(authToken);
    const chatId = req.nextUrl.pathname.split("/")[3];
    const chatRepository = new ChatRepository();
    const getChatUseCase = new GetChatUseCase(chatRepository);
    const chat = await getChatUseCase.execute(chatId);
    const chatMapped = chatMapper(chat, email);
    return NextResponse.json(chatMapped, { status: 200 });
  } catch (error) {
    const errorMessage = ErrorExceptionHelper.getMessage(error);
    return new CustomResponse({ message: errorMessage }).conflict();
  }
}

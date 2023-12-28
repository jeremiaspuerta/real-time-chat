import { NextRequest, NextResponse } from "next/server";
import { ErrorExceptionHelper } from "../../../../Helper/ErrorExceptionHelper";
import { CustomResponse } from "../../../../Helper/CustomResponse";
import { GetChatUseCase } from "../../../../Domain/UseCase/GetChatUseCase";
import { ChatRepository } from "../../../../Infrastructure/ChatRepository";
import { getAuthTokenFromCookie } from "../../../../Helper/GetAuthTokenFromCookie";
import { decodeJwt } from "../../../../Helper/DecodeJwt";
import { chatMapper } from "../../../../Helper/ChatMapper";

export async function GET(req: NextRequest) {
  try {
    const authToken = getAuthTokenFromCookie(req);
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

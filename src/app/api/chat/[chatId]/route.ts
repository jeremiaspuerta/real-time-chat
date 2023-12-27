import { NextRequest, NextResponse } from "next/server";
import { ErrorExceptionHelper } from "../../../../Helper/ErrorExceptionHelper";
import { CustomResponse } from "../../../../Helper/CustomResponse";
import {
  ChatType,
  GetChatUseCase,
} from "../../../../Domain/UseCase/GetChatUseCase";
import { ChatRepository } from "../../../../Infrastructure/ChatRepository";
import { Message, User } from "@prisma/client";
import { getAuthTokenFromCookie } from "../../../../Helper/GetAuthTokenFromCookie";
import { decodeJwt } from "../../../../Helper/DecodeJwt";

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

export type ChatMapperType = {
  id: string;
  updatedAt: string;
  messages: Array<Message>;
  users: Array<{
    name: string;
    email: string;
    rol: "sender" | "recipient";
    status: string;
  }>;
};

function chatMapper(chat: ChatType, senderEmail: string): ChatMapperType {
  const chatMapped: ChatMapperType = {
    id: chat.id,
    updatedAt: chat.updatedAt,
    messages: chat.Message,
    users: chat.ChatUser.map((item: { user: User }) => ({
      name: item.user.name,
      email: item.user.email,
      rol: item.user.email == senderEmail ? "sender" : "recipient",
      status: item.user.status,
    })),
  };

  return chatMapped;
}

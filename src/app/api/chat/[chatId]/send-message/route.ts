import { NextRequest, NextResponse } from "next/server";
import { HTTP_OK } from "../../../../../Constants/HttpStatusCode";
import { ErrorExceptionHelper } from "../../../../../Helper/ErrorExceptionHelper";
import { CustomResponse } from "../../../../../Helper/CustomResponse";
import { getAuthTokenFromCookie } from "../../../../../Helper/GetAuthTokenFromCookie";
import { decodeJwt } from "../../../../../Helper/DecodeJwt";
import { UserRepository } from "../../../../../Infrastructure/UserRepository";
import { SendMessageUseCase } from "../../../../../Domain/UseCase/SendMessageUseCase";
import { MessageRepository } from "../../../../../Infrastructure/MessageRepository";

interface SendMessageRequest extends NextRequest {
  json(): Promise<{
    message: string;
  }>;
}

export async function POST(req: SendMessageRequest) {
  const { message } = await req.json();
  const chatId = req.nextUrl.pathname.split("/")[3];

  try {
    const authToken = getAuthTokenFromCookie(req);

    const { email } = decodeJwt(authToken);

    const userRepository = new UserRepository();
    const messageRepository = new MessageRepository();

    const sendMessageUseCase = new SendMessageUseCase(
      messageRepository,
      userRepository,
    );

    await sendMessageUseCase.execute(email, chatId, message);

    return NextResponse.json([], { status: HTTP_OK });
  } catch (error) {
    const errorMessage = ErrorExceptionHelper.getMessage(error);

    return new CustomResponse({ message: errorMessage }).conflict();
  }
}

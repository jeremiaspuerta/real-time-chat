import { NextRequest, NextResponse } from "next/server";
import { HTTP_OK } from "@/constants/HttpStatusCode";
import { ErrorExceptionHelper } from "@/helpers/ErrorExceptionHelper";
import { CustomResponse } from "@/helpers/CustomResponse";
import { decodeJwt } from "@/helpers/DecodeJwt";
import { UserRepository } from "@/infrastructure/UserRepository";
import { SendMessageUseCase } from "@/domain/UseCase/SendMessageUseCase";
import { MessageRepository } from "@/infrastructure/MessageRepository";
import { AuthCookiesHelper } from "@/helpers/AuthCookiesHelper";

interface SendMessageRequest extends NextRequest {
  json(): Promise<{
    message: string;
  }>;
}

export async function POST(req: SendMessageRequest) {
  const { message } = await req.json();
  const chatId = req.nextUrl.pathname.split("/")[3];

  try {
    const authCookiesHelper = new AuthCookiesHelper(req.cookies.getAll());
    const authToken = authCookiesHelper.getToken();

    const { email } = decodeJwt(authToken);

    const userRepository = new UserRepository();
    const messageRepository = new MessageRepository();

    const sendMessageUseCase = new SendMessageUseCase(
      messageRepository,
      userRepository,
    );

    const createdMessage = await sendMessageUseCase.execute(
      email,
      chatId,
      message,
    );

    return NextResponse.json({ message: createdMessage }, { status: HTTP_OK });
  } catch (error) {
    const errorMessage = ErrorExceptionHelper.getMessage(error);

    return new CustomResponse({ message: errorMessage }).conflict();
  }
}

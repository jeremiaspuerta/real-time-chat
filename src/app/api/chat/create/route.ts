import { NextRequest, NextResponse } from "next/server";
import { ChatRepository } from "@/infrastructure/ChatRepository";
import { HTTP_OK } from "@/constants/HttpStatusCode";
import { CreateChatUseCase } from "@/domain/UseCase/CreateChatUseCase";
import { ErrorExceptionHelper } from "@/helpers/ErrorExceptionHelper";
import { CustomResponse } from "@/helpers/CustomResponse";
import { decodeJwt } from "@/helpers/DecodeJwt";
import { UserRepository } from "@/infrastructure/UserRepository";
import { AuthCookiesHelper } from "@/helpers/AuthCookiesHelper";

interface CreateChatRequest extends NextRequest {
  json(): Promise<{
    userId: string;
  }>;
}

export async function POST(req: CreateChatRequest) {
  const { userId } = await req.json();

  try {
    const authCookiesHelper = new AuthCookiesHelper(req.cookies.getAll());
    const authToken = authCookiesHelper.getToken();

    const { email } = decodeJwt(authToken);

    const chatRepository = new ChatRepository();
    const userRepository = new UserRepository();

    const createChatUseCase = new CreateChatUseCase(
      chatRepository,
      userRepository,
    );

    const chat = await createChatUseCase.execute(email, userId);

    return NextResponse.json(chat, { status: HTTP_OK });
  } catch (error) {
    const errorMessage = ErrorExceptionHelper.getMessage(error);
    const response = new CustomResponse({ message: errorMessage }).conflict();
    return response;
  }
}

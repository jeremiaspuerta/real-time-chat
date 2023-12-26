import { NextRequest, NextResponse } from "next/server";
import { ChatRepository } from "../../../../Infrastructure/ChatRepository";
import { HTTP_OK } from "../../../../Constants/HttpStatusCode";
import { CreateChatUseCase } from "../../../../Domain/UseCase/CreateChatUseCase";
import { ErrorExceptionHelper } from "../../../../Helper/ErrorExceptionHelper";
import { CustomResponse } from "../../../../Helper/CustomResponse";
import { getAuthTokenFromCookie } from "../../../../Helper/GetAuthTokenFromCookie";
import { decodeJwt } from "../../../../Helper/DecodeJwt";
import { UserRepository } from "../../../../Infrastructure/UserRepository";

interface CreateChatRequest extends NextRequest {
  json(): Promise<{
    userId: string;
  }>;
}

export async function POST(req: CreateChatRequest) {
  const { userId } = await req.json();

  try {
    const authToken = getAuthTokenFromCookie(req);

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

    return new CustomResponse({ message: errorMessage }).conflict();
  }
}

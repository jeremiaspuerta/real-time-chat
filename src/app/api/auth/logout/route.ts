import { NextRequest } from "next/server";
import { UserRepository } from "@/infrastructure/UserRepository";
import { ErrorExceptionHelper } from "@/helpers/ErrorExceptionHelper";
import { CustomResponse } from "@/helpers/CustomResponse";
import { LogOutUseCase } from "@/domain/UseCase/LogOutUseCase";
import { AuthCookiesHelper } from "@/helpers/AuthCookiesHelper";
import { decodeJwt } from "@/helpers/DecodeJwt";

export async function DELETE(req: NextRequest) {
  const authCookiesHelper = new AuthCookiesHelper(req.cookies.getAll());
  const authToken = authCookiesHelper.getToken();
  const { email } = decodeJwt(authToken);

  try {
    const userRepository = new UserRepository();
    const logOutUseCase = new LogOutUseCase(userRepository);
    await logOutUseCase.execute(email);

    return new CustomResponse([]).ok();
  } catch (error) {
    const errorMessage = ErrorExceptionHelper.getMessage(error);
    return new CustomResponse({ message: errorMessage }).conflict();
  }
}

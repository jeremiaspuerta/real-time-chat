import { NextRequest, NextResponse } from "next/server";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { AuthCookiesHelper } from "@/helpers/AuthCookiesHelper";
import { ValidateTokenUseCase } from "@/domain/UseCase/ValidateTokenUseCase";

export function middleware(request: NextRequest) {
  try {
    const requestCookies: RequestCookie[] = request.cookies.getAll();

    const authCookiesHelper = new AuthCookiesHelper(requestCookies);

    const authToken = authCookiesHelper.getToken();

    const validateTokenUseCase = new ValidateTokenUseCase();

    validateTokenUseCase.execute(authToken);
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/api/chat/:path*", "/api/user/get-all", "/chat/:path*"],
};

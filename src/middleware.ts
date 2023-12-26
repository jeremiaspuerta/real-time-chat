import { NextRequest, NextResponse } from "next/server";
import { ValidateTokenUseCase } from "./Domain/UseCase/ValidateTokenUseCase";
import { getAuthTokenFromCookie } from "./Helper/GetAuthTokenFromCookie";

export function middleware(request: NextRequest) {
  try {
    const authToken = getAuthTokenFromCookie(request);
    new ValidateTokenUseCase().execute(authToken);
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/api/chat/:path*", "/api/user/get-all", "/chat/:path*"],
};

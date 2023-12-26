import { NextRequest, NextResponse } from "next/server";
import { ValidateTokenUseCase } from "./Domain/UseCase/ValidateTokenUseCase";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const cookies = request.cookies.getAll();
  const tokenCookieFilter = cookies.filter(
    (cookie) => cookie.name === "AUTH_TOKEN",
  );

  if (tokenCookieFilter.length === 0) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const authToken = tokenCookieFilter[0].value;

  try {
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

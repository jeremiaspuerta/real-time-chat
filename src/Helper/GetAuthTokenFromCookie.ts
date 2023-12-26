import { NextRequest } from "next/server";

export function getAuthTokenFromCookie(req: NextRequest): string {
  const cookies = req.cookies.getAll();
  const tokenCookieFilter = cookies.filter(
    (cookie) => cookie.name === "AUTH_TOKEN",
  );

  if (tokenCookieFilter.length === 0) {
    throw new Error("Token is missing in cookie");
  }

  const authToken = tokenCookieFilter[0].value;

  return authToken;
}

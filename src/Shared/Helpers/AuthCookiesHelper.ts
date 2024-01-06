import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export class AuthCookiesHelper {
  constructor(private cookies: RequestCookie[] = cookies) {}

  public getToken(): string {
    const tokenCookieFilter = this.cookies.filter(
      (cookie) => cookie.name === "AUTH_TOKEN",
    );

    if (tokenCookieFilter.length === 0) {
      throw new Error("Token is missing in cookie");
    }

    const authToken = tokenCookieFilter[0].value;

    return authToken;
  }
}

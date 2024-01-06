type DecodedToken = {
  exp: number;
  email: string;
  iat: number;
};

export function decodeJwt(token: string): DecodedToken {
  return JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString(),
  ) as DecodedToken;
}

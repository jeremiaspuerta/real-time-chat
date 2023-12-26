type DecodedToken = {
  exp: number;
  email: string;
  iat: number;
};

export class ValidateTokenUseCase {
  public execute(token: string) {
    const decodedToken = this.decodeJwt(token);
    this.validateExp(decodedToken.exp);
  }

  private decodeJwt(token: string): DecodedToken {
    return JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString(),
    ) as DecodedToken;
  }

  private validateExp(exp: number): void {
    const currentDatetime = Math.floor(Date.now() / 1000);

    if (currentDatetime > exp) {
      throw new Error("Expired token");
    }
  }
}

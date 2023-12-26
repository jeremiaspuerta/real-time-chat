import { decodeJwt } from "../../Helper/DecodeJwt";

export class ValidateTokenUseCase {
  public execute(token: string) {
    const decodedToken = decodeJwt(token);
    this.validateExp(decodedToken.exp);
  }

  private validateExp(exp: number): void {
    const currentDatetime = Math.floor(Date.now() / 1000);

    if (currentDatetime > exp) {
      throw new Error("Expired token");
    }
  }
}

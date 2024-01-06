export class ErrorExceptionHelper {
  static getMessage(error: unknown) {
    const stringError = String(error);
    const message = stringError.replace("Error: ", "");

    return message;
  }
}

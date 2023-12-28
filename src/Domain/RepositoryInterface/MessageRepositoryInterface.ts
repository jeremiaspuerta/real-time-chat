export interface MessageRepositoryInterface {
  // eslint-disable-next-line no-unused-vars
  create(chatId: string, userId: string, message: string): Promise<boolean>;
}

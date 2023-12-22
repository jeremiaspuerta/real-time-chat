import { HttpHelperType } from "../../Helper/HttpHelper";
import { Chat } from "@prisma/client";

export async function startChatUseCase(
  fetch: HttpHelperType,
  userIds: string[],
): Promise<Chat> {
  const response = await fetch.post("/api/chat", {
    userIds: ["6584e39ad035056c4c9b19a8", userIds[0]],
  });
  const chat = response as Chat;

  return chat;
}

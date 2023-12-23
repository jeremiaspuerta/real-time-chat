import { NextRequest, NextResponse } from "next/server";
import { ChatRepository } from "../../../Infrastructure/ChatRepository";
import { HTTP_CONFLICT, HTTP_OK } from "../../../Constants/HttpStatusCode";

interface CreateChatRequest extends NextRequest {
  json(): Promise<{
    userIds: string[];
  }>;
}

export async function POST(req: CreateChatRequest) {
  const { userIds } = await req.json();

  const chatRepository = new ChatRepository();
  const findChat = await chatRepository.findChatByUserIds(userIds);

  if (typeof findChat == "object") {
    return NextResponse.json({ message: "Chat exists!" }, { status: HTTP_CONFLICT });
  }

  const chat = await chatRepository.createChat(userIds);

  if (!chat) {
    return NextResponse.json({ message: "error" }, { status: HTTP_CONFLICT });
  }

  return NextResponse.json(chat, { status: HTTP_OK });
}

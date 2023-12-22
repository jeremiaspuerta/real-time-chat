import { NextRequest, NextResponse } from "next/server";
import { ChatRepository } from "../../../Infrastructure/ChatRepository";

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
    return NextResponse.json({ message: "Chat exists!" }, { status: 409 });
  }

  const chat = await chatRepository.createChat(userIds);

  if (!chat) {
    return NextResponse.json({ message: "error" }, { status: 409 });
  }

  return NextResponse.json(chat, { status: 200 });
}

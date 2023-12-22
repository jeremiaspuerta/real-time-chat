import { ChatRepository } from '@/Infrastructure/ChatRepository';
import type { NextApiRequest } from 'next'
import { NextRequest, NextResponse } from "next/server";

interface CreateChatRequest extends NextApiRequest {
  body:{
    userIds: string[]
  }
}

export async function POST(
  req: NextRequest
){
  const { userIds } = await req.json();

  const chatRepository = new ChatRepository();
  const findChat = await chatRepository.findChatByUserIds(userIds);

  if(typeof findChat == 'object'){
    return NextResponse.json({message:'Chat exists!'}, { status: 409 });
  }

  const chat = await chatRepository.createChat(userIds);

  if(!chat){
      return NextResponse.json({message:'error'}, { status: 409 });
  }

  return NextResponse.json(chat,{status: 200});
}
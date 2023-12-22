import { UserRepository } from '@/Infrastructure/UserRepository';
import type { NextApiRequest } from 'next'
import { NextResponse } from "next/server";

export async function GET(
  req: NextApiRequest
){
  const users = await (new UserRepository()).getUsers()

  return NextResponse.json(users, { status: 200 });
}
import { NextResponse } from "next/server";
import { UserRepository } from "../../../../Infrastructure/UserRepository";

export async function GET() {
  const users = await new UserRepository().getUsers();

  return NextResponse.json(users, { status: 200 });
}

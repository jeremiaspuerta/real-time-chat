import { Message, User } from "@prisma/client";

export type UserCreation = {
  name: string;
  email: string;
  password: string;
};

export type UserLogInType = {
  email: string;
  password: string;
};

export type MessageWithUser = Message & { user: User };

export type ChatType = {
  id: string;
  updatedAt: string;
  createdAt: string;
  ChatUser: Array<{ user: User }>;
};

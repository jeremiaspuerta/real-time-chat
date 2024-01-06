import { Chat, User } from "@prisma/client";
import { useEffect, useState } from "react";
import * as fetch from "@/helpers/HttpHelper";
import { useRouter } from "next/navigation";
import { HTTP_OK } from "@/constants/HttpStatusCode";
import toast from "react-hot-toast";

export function useLayoutHook() {
  const [users, setUsers] = useState<Array<unknown>>([]);
  const [chats, setChats] = useState<unknown[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function init() {
      await fetchUsers();
      await fetchChats();
    }
    void init();
  }, []);

  async function fetchUsers(): Promise<void> {
    const usersRequest = await fetch.get("/api/user/get-all");

    if (usersRequest.httpStatus === HTTP_OK) {
      const users = usersRequest.body as unknown as User[];
      setUsers(users);
    } else {
      toast.error(usersRequest.body.message as string);
    }
  }

  async function fetchChats(): Promise<void> {
    const chatsRequest = await fetch.get("/api/chat/get-all");

    if (chatsRequest.httpStatus === HTTP_OK) {
      const chats = chatsRequest.body as unknown as unknown[];
      setChats(chats);
    } else {
      toast.error(chatsRequest.body.message as string);
    }
  }

  function handleClickOnChat(chatId: string): void {
    router.push(`/chat/${chatId}`);
  }

  async function handleClickOnUser(userId: string): Promise<void> {
    const chatCreateRequest = await fetch.post("/api/chat/create", {
      userId,
    });

    if (chatCreateRequest.httpStatus === HTTP_OK) {
      const chat = chatCreateRequest.body as unknown as Chat;

      router.push(`/chat/${chat.id}`);
    } else {
      toast.error(chatCreateRequest.body.message as string);
    }
  }

  return {
    users,
    chats,
    handleClickOnUser,
    handleClickOnChat,
  };
}

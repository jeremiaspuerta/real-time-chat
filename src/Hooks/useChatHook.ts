"use client";

import { useEffect, useState } from "react";
import * as fetch from "../Helper/HttpHelper";
import { usePathname } from "next/navigation";
import { Chat } from "@prisma/client";
import { HTTP_OK } from "../Constants/HttpStatusCode";
import toast from "react-hot-toast";

export function useChatHook() {
  const [chat, setChat] = useState<null | Chat>();
  const pathname = usePathname();

  useEffect(() => {
    async function init() {
      const chatId = pathname.split("/")[2];
      const chatRequest = await fetch.get(`/api/chat/${chatId}`);

      if (chatRequest.httpStatus === HTTP_OK) {
        const chat = chatRequest.body as unknown as Chat;
        setChat(chat);
      } else {
        toast.error(chatRequest.body.message);
      }
    }
    void init();
  }, []);

  return {
    chat,
  };
}

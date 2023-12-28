"use client";

import { useEffect, useState } from "react";
import * as fetch from "../Helper/HttpHelper";
import { usePathname } from "next/navigation";
import { HTTP_OK } from "../Constants/HttpStatusCode";
import toast from "react-hot-toast";
import { ChatMapperType } from "../Helper/ChatMapper";

export function useChatHook() {
  const [chat, setChat] = useState<null | ChatMapperType>();
  const pathname = usePathname();
  const chatId = pathname.split("/")[2];

  useEffect(() => {
    async function init() {
      const chatRequest = await fetch.get(`/api/chat/${chatId}`);

      if (chatRequest.httpStatus === HTTP_OK) {
        const chat = chatRequest.body as unknown as ChatMapperType;
        setChat(chat);
      } else {
        toast.error(chatRequest.body.message);
      }
    }
    void init();
  }, []);

  async function handleSendMessage(message: string): Promise<void> {
    const sendMessageRequest = await fetch.post(
      `/api/chat/${chatId}/send-message`,
      {
        message,
      },
    );

    if (sendMessageRequest.httpStatus != HTTP_OK) {
      toast.error(sendMessageRequest.body.message);
    }
  }

  return {
    chat,
    handleSendMessage,
  };
}

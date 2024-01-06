"use client";

import { useEffect, useState } from "react";
import * as fetch from "@/helpers/HttpHelper";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import io from "socket.io-client";
import { HTTP_OK } from "@/constants/HttpStatusCode";
import { ChatMapperType } from "@/helpers/ChatMapper";
import { MessageWithUser } from "@/types";

export function useChatHook() {
  const [chat, setChat] = useState<null | ChatMapperType>();
  const [messages, setMessages] = useState<MessageWithUser[]>([]);
  const pathname = usePathname();
  const chatId = pathname.split("/")[2];

  useEffect(() => {
    
    async function init() {
      const socket = io(`${process.env.SOCKET_URL}:${process.env.SOCKET_PORT}`);
      socket.on("receive_msgs", (updatedMessages: MessageWithUser[]) => {
        setMessages(updatedMessages);
      });
      const chatRequest = await fetch.get(`/api/chat/${chatId}`);

      if (chatRequest.httpStatus === HTTP_OK) {
        socket.emit("start_chat", chatId);
        const chat = chatRequest.body as unknown as ChatMapperType;
        setChat(chat);
        setMessages(chat.messages as unknown as MessageWithUser[]);
      } else {
        toast.error(chatRequest.body.message as string);
      }
      return () => {
        socket.disconnect();
      }
    }
    void init();

  }, [chatId]);

  async function handleSendMessage(message: string): Promise<void> {
    const socket = io(`${process.env.SOCKET_URL}:${process.env.SOCKET_PORT}`);
    const sendMessageRequest = await fetch.post(
      `/api/chat/${chatId}/send-message`,
      {
        message,
      },
    );

    if (sendMessageRequest.httpStatus != HTTP_OK) {
      toast.error(sendMessageRequest.body.message as string);
    }

    if (sendMessageRequest.httpStatus == HTTP_OK) {
      const sentMessage = sendMessageRequest.body
        .message as unknown as MessageWithUser;
      const messagesUpdated = [...messages, sentMessage];
      socket.emit("send_msgs", messagesUpdated, chatId);
    }
  }

  return {
    chat,
    messages,
    handleSendMessage,
  };
}

"use client";

import { useChatHook } from "@/hooks/useChatHook";
import styles from "@/styles/chat-page.module.css";
import LoadingChatComponent from "@/components/chat/Loading";
import { BubbleUser } from "@/components/shared/BubbleUser";
import { ContainerCurrentChat } from "@/components/chat/ContainerCurrentChat";
import { ChatMessagesComponent } from "@/components/chat/ChatMessagesComponent";
import { ChatTextBoxComponent } from "@/components/chat/ChatTextBoxComponent";

export default function ChatPage() {
  const { chat, messages, sendMessage } = useChatHook();

  if (!chat) {
    return <LoadingChatComponent />;
  }

  const recipient = chat.users.filter((user) => user.rol === "recipient")[0];
  const recipientName = recipient.name;
  const recipientStatus = recipient.status;

  return (
    <ContainerCurrentChat>
      <BubbleUser name={recipientName} isOnline={recipientStatus == "online"} />
      {messages.length === 0 && <div className={styles.empty_chat} />}
      {messages.length > 0 && <ChatMessagesComponent messages={messages} />}
      <ChatTextBoxComponent
        handleSendMessage={(message: string) => sendMessage(message)}
      />
    </ContainerCurrentChat>
  );
}

"use client";

import { useChatHook } from "../../../../Hooks/useChatHook";
import { ChatMessagesComponent } from "../../../../UI/chat/ChatMessagesComponent";
import { ChatTextBoxComponent } from "../../../../UI/chat/ChatTextBoxComponent";
import { ContainerCurrentChat } from "../../../../UI/chat/ContainerCurrentChat";
import { BubbleUser } from "../../../../UI/shared/BubbleUser";
import styles from "../../../../UI/styles/chat-page.module.css";

export default function ChatPage() {
  const { chat, handleSendMessage } = useChatHook();

  if (!chat) {
    return <p>Loading...</p>;
  }

  const recipient = chat.users.filter((user) => user.rol === "recipient")[0];
  const recipientName = recipient.name;
  const recipientStatus = recipient.status;
  const { messages } = chat;

  return (
    <ContainerCurrentChat>
      <BubbleUser name={recipientName} isOnline={recipientStatus == "online"} />
      {messages.length === 0 && <div className={styles.empty_chat} />}
      {messages.length > 0 && <ChatMessagesComponent messages={messages} />}
      <ChatTextBoxComponent
        handleSendMessage={(message: string) => handleSendMessage(message)}
      />
    </ContainerCurrentChat>
  );
}

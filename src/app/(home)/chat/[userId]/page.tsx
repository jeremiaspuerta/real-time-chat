"use client";

import { useChatHook } from "../../../../Hooks/useChatHook";
import { ContainerCurrentChat } from "../../../../UI/chat/ContainerCurrentChat";

export default function ChatPage() {
  const { chat } = useChatHook();

  return <ContainerCurrentChat chat={chat} />;
}

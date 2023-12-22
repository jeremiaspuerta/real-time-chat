import { Component } from "react";
import { ChatTextBoxComponent } from "./ChatTextBoxComponent";
import { ChatMessagesComponent } from "./ChatMessagesComponent";
import { BubbleUser } from "../shared/BubbleUser";

interface PropsInterface {
  inputMessage?: Component;
  messages?: Component;
}

export const ContainerCurrentChat = ({
  inputMessage,
  messages,
}: PropsInterface) => {
  return (
    <div className="flex flex-col h-screen w-screen p-5 gap-5 bg-white shadow-lg">
      <BubbleUser user_id={1} username="Carlos Perez" is_online={true} />
      <ChatMessagesComponent />
      <ChatTextBoxComponent />
    </div>
  );
};

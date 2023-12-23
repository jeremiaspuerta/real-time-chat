import { ChatTextBoxComponent } from "./ChatTextBoxComponent";
import { ChatMessagesComponent } from "./ChatMessagesComponent";
import { BubbleUser } from "../shared/BubbleUser";

export const ContainerCurrentChat = () => {
  return (
    <div className="flex flex-col h-screen w-screen p-5 gap-5 bg-white shadow-lg">
      <BubbleUser name="Carlos Perez" isOnline={true} />
      <ChatMessagesComponent />
      <ChatTextBoxComponent />
    </div>
  );
};

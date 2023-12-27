import { ChatTextBoxComponent } from "./ChatTextBoxComponent";
import { ChatMessagesComponent } from "./ChatMessagesComponent";
import { BubbleUser } from "../shared/BubbleUser";
import { ChatMapperType } from "../../app/api/chat/[chatId]/route";

type Props = {
  chat: ChatMapperType;
};

export const ContainerCurrentChat = ({ chat }: Props) => {
  if (!chat) {
    return <p>Loading...</p>;
  }

  const recipient = chat.users.filter((user) => user.rol === "recipient")[0];
  const recipientName = recipient.name;
  const recipientStatus = recipient.status;

  return (
    <div className="flex flex-col h-screen w-screen p-5 gap-5 bg-white shadow-lg">
      <BubbleUser name={recipientName} isOnline={recipientStatus == "online"} />
      <ChatMessagesComponent />
      <ChatTextBoxComponent />
    </div>
  );
};

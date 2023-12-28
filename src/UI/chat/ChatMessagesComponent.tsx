import { ScrollShadow } from "@nextui-org/react";
import { BubbleMessage } from "./BubbleMessage";
import { Message } from "@prisma/client";
import styles from "../../UI/styles/chat-message.module.css";

type Props = {
  messages: Message[];
};

export const ChatMessagesComponent = ({ messages }: Props) => {
  return (
    <ScrollShadow hideScrollBar className={styles.scroll_shadow}>
      {messages.map((message: Message) => (
        <BubbleMessage key={message.id} align={"end"} text={message.text} />
      ))}
    </ScrollShadow>
  );
};

import { ScrollShadow } from "@nextui-org/react";
import { BubbleMessage } from "@/components/chat/BubbleMessage";
import { Message, User } from "@prisma/client";
import styles from "@/styles/chat-message.module.css";
import { useCookies } from "next-client-cookies";
import { decodeJwt } from "@/helpers/DecodeJwt";

type MessageWithUser = Message & { user: User };

type Props = {
  messages: Array<MessageWithUser>;
};

export const ChatMessagesComponent = ({ messages }: Props) => {
  const cookies = useCookies();
  const authToken = cookies.get("AUTH_TOKEN");
  if (authToken === undefined) return;
  const { email } = decodeJwt(authToken);

  return (
    <ScrollShadow hideScrollBar className={styles.scroll_shadow}>
      {messages.map((message: MessageWithUser) => (
        <BubbleMessage
          key={message.id}
          align={email === message.user.email ? "end" : "start"}
          text={message.text}
          datetime={message.createdAt}
        />
      ))}
    </ScrollShadow>
  );
};

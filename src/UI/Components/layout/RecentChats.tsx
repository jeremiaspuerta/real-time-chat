"use client";

import { Card } from "@nextui-org/react";
import styles from "@/styles/chat-layout.module.css";

type Props = {
  readonly children: React.ReactNode;
};

export const RecentChatsComponent = ({ children }: Props) => {
  return (
    <Card className={styles.users_container}>
      <p className={styles.text}>Recent Chats</p>
      {children}
    </Card>
  );
};

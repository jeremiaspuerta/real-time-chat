"use client";

import { Card } from "@nextui-org/react";
import styles from "@/styles/chat-layout.module.css";

type Props = {
  readonly children: React.ReactNode;
};

export const ListUsersComponent = ({ children }: Props) => {
  return (
    <Card className={styles.users_container}>
      <p className={styles.text}>People</p>
      {children}
    </Card>
  );
};

import React from "react";
import { Card, Skeleton } from "@nextui-org/react";
import styles from "@/styles/chat-loading.module.css";

export default function LoadingChatComponent() {
  return (
    <Card className={styles.card}>
      <Skeleton className={styles.skeleton}>
        <div className={styles.skeleton_div}></div>
      </Skeleton>
      <Skeleton className={styles.skeleton}>
        <div className={styles.skeleton_div}></div>
      </Skeleton>
    </Card>
  );
}

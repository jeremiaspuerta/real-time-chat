import { Card } from "@nextui-org/react";
import styles from "@/styles/chat-loading.module.css";

type Props = {
  readonly children: React.ReactNode;
};

export const ContainerCurrentChat = ({ children }: Props) => {
  return <Card className={styles.card}>{children}</Card>;
};

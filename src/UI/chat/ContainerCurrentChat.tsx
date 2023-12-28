import styles from "../styles/container-current-chat.module.css";

type Props = {
  readonly children: React.ReactNode;
};

export const ContainerCurrentChat = ({ children }: Props) => {
  return <div className={styles.flex_container}>{children}</div>;
};

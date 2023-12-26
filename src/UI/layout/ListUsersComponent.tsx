"use client";

import styles from "../styles/chat-layout.module.css";

type Props = {
  readonly children: React.ReactNode;
};

export const ListUsersComponent = ({ children }: Props) => {
  return (
    <div className={styles.users_container}>
      <p className={styles.text}>People</p>
      {children}
    </div>
  );
};

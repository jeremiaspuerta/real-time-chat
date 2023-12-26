"use client";

import styles from "../styles/bubble-user.module.css";
import { Avatar, Chip } from "@nextui-org/react";

type Props = {
  name: string;
  isOnline: boolean;
  // eslint-disable-next-line no-unused-vars
  handleClick?: () => Promise<void>;
};

export const BubbleUser = ({ name, isOnline, handleClick }: Props) => {
  return (
    <div className={styles.container} onClick={() => handleClick()}>
      <Avatar
        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        className={styles.avatar}
      />
      <div className={styles.text_container}>
        <p>{name}</p>
        {isOnline && (
          <Chip color="success" variant="dot" className={styles.chip}>
            Active now
          </Chip>
        )}
        {!isOnline && (
          <Chip color="default" variant="dot" className={styles.chip}>
            Offline
          </Chip>
        )}
      </div>
    </div>
  );
};

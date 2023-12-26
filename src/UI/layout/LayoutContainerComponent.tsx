"use client";

import styles from "../styles/chat-layout.module.css";
import { ListUsersComponent } from "./ListUsersComponent";

import { useLayoutHook } from "../../Hooks/useLayoutHook";
import { User } from "@prisma/client";
import { ScrollShadow } from "@nextui-org/react";
import { BubbleUser } from "../shared/BubbleUser";

export const LayoutContainerComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { users, handleClickOnUser } = useLayoutHook();

  return (
    <div className={styles.main_container}>
      {users === null && <p>Loading</p>}
      {users != null && (
        <ListUsersComponent>
          <ScrollShadow hideScrollBar className={styles.scroll_shadow}>
            {users.map((user: User) => (
              <BubbleUser
                key={user.id}
                name={user.name}
                isOnline={user.status === "online"}
                handleClick={() => handleClickOnUser(user.id)}
              />
            ))}
          </ScrollShadow>
        </ListUsersComponent>
      )}
      {children}
    </div>
  );
};

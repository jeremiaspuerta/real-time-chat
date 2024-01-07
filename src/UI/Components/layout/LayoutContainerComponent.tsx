"use client";

import styles from "@/styles/chat-layout.module.css";
import { ListUsersComponent } from "@/components/layout/ListUsersComponent";
import { useLayoutHook } from "@/hooks/useLayoutHook";
import { User } from "@prisma/client";
import { Button, ScrollShadow } from "@nextui-org/react";
import { BubbleUser } from "@/components/shared/BubbleUser";
import { ChatMapperType } from "@/helpers/ChatMapper";
import { RecentChatsComponent } from "@/components/layout/RecentChats";
import { useLogOutHook } from "@/hooks/useLogOutHook";
import logout_syles from "@/styles/log-out-button.module.css";

export const LayoutContainerComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { chats, users, handleClickOnUser, goToChat } =
    useLayoutHook();
  const { handleLogOut } = useLogOutHook();

  return (
    <div className={styles.main_container}>
      <div className={styles.chats_users_container}>
        {chats === null && <p>Loading</p>}
        {chats != null && (
          <RecentChatsComponent>
            <ScrollShadow hideScrollBar className={styles.scroll_shadow}>
              {chats.map((chat: Partial<ChatMapperType>) => (
                <BubbleUser
                  key={chat.id}
                  name={
                    chat.users.filter(
                      (user: { rol: "sender" | "recipient" }) =>
                        user.rol === "recipient",
                    )[0].name
                  }
                  isOnline={
                    chat.users.filter(
                      (user: { rol: "sender" | "recipient" }) =>
                        user.rol === "recipient",
                    )[0].status === "online"
                  }
                  handleClick={() => goToChat(chat.id)}
                />
              ))}
            </ScrollShadow>
          </RecentChatsComponent>
        )}
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
        <Button
          className={logout_syles.button}
          color="danger"
          onClick={() => handleLogOut()}
        >
          Log Out
        </Button>
      </div>

      {children}
    </div>
  );
};

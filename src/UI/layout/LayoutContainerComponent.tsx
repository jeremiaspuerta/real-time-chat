"use client";

import { ScrollShadow } from "@nextui-org/react";
import { useLayoutHook } from "../../Hooks/useLayoutHook";
import { ListUsersComponent } from "./ListUsersComponent";
import { User } from "@prisma/client";
import { BubbleUser } from "../shared/BubbleUser";

export const LayoutContainerComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { users, handleClickOnUser } = useLayoutHook();

  // TODO

  return (
    <div className="w-full h-screen flex flex-row gap-4 bg-white">
      {users === null && <p>Loading</p>}
      {users != null && (
        <ListUsersComponent>
          <ScrollShadow hideScrollBar className="flex flex-col gap-5">
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

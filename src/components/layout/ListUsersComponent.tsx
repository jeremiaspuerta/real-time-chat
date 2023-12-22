"use client";

import { ScrollShadow } from "@nextui-org/react";
import { User } from "@prisma/client";
import { BubbleUser } from "@/components/shared/BubbleUser"

type Props = {
  users: User[];
  handleClickOnUser: (userId: string) => void
}

export const ListUsersComponent = ({users,handleClickOnUser}: Props) => {
  return (
    <div className="flex flex-col gap-5 w-1/2 max-w-md p-5 bg-white h-screen rounded-2xl">
      <p className="text-slate-900 text-2xl font-bold">People</p>
      <ScrollShadow hideScrollBar className="flex flex-col gap-5">
        {users.map((user: User) => (
            <BubbleUser
              key={user.id}
              user_id={user.id}
              name={user.name}
              isOnline={user.status === "online"}
              handleClick={() => handleClickOnUser(user.id)}
            />
        ))}
      </ScrollShadow>
    </div>
  );
};

'use client';

import { useLayoutHook } from "@/Hooks/useLayoutHook";
import { ListUsersComponent } from "./ListUsersComponent";

export const LayoutContainerComponent = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    const { users,handleClickOnUser } = useLayoutHook()

    // TODO
  
    return (
        <div className="w-full h-screen flex flex-row gap-4 bg-white">
            {users === null && <p>Loading</p>}
            {users != null && <ListUsersComponent users={users} handleClickOnUser={handleClickOnUser}/>}
            {children}
        </div>
    );
}
'use client';

import { ScrollShadow } from "@nextui-org/react"
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { BubbleUser } from "./bubbleUser"
import {users} from "@/lib/data";

export const HistoryMessages = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
  
    function handleClick(user_id: number) {
      const params = new URLSearchParams(searchParams);
  
      if (user_id) {
        params.set('chat_with_user', user_id.toString());
      }
  
      if (!user_id) {
        params.delete('chat_with_user');
      }
  
      replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex flex-col gap-5 w-1/2 max-w-md p-5 bg-white h-screen rounded-2xl">
            <p className="text-slate-900 text-2xl font-bold">People</p>
            <ScrollShadow hideScrollBar className="flex flex-col gap-5">
                {
                    users.map((user) => <BubbleUser key={user.id} user_id={user.id} username={user.username} is_online={user.is_online} handleClick={handleClick}/>)
                }
            </ScrollShadow>
        </div>
    )
}
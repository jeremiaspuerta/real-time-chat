import { useEffect, useState } from "react";
import { Message } from "@prisma/client";

export function useChatController(userId: string){
    const [messages, setMessages] = useState<null|Message>(null);

    useEffect(() => {
        async function init() {
          const initialUsers = await getUsers();
          setUsers(initialUsers);
        }
        init();
      }, []);

      return {
        users
      }
}
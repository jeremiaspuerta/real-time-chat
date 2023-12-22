import { getUsersUseCase } from "@/Domain/UseCase/UserUseCases";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import * as fetch from '@/Helper/HttpHelper';
import { startChatUseCase } from "@/Domain/UseCase/ChatUseCases";
import { useRouter } from "next/navigation";

export function useLayoutHook(){
    const [users, setUsers] = useState<null|User[]>(null);
    const router = useRouter();

    useEffect(() => {
        async function init() {
          const allUsers = await getUsersUseCase(fetch);
          setUsers(allUsers);
        }
        init();
      }, []);

    async function handleClickOnUser(userId: string){
      //TODO primero buscar el chat. Si existe, redireccionar. Sino, crear y luego redireccionar

      // TODO tomar id del usuario logueado y formar un array con el userId del parametro
      const chat = await startChatUseCase(fetch,[userId])

      router.push(`/chat/${chat.id}`);

    }

      return {
        users,
        handleClickOnUser
      }
    
}
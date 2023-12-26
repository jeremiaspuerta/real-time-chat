import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import * as fetch from "../Helper/HttpHelper";
import { startChatUseCase } from "../Domain/UseCase/ChatUseCases";
import { useRouter } from "next/navigation";
import { HTTP_OK } from "../Constants/HttpStatusCode";
import toast from "react-hot-toast";
// import { getUsersUseCase } from "../Domain/UseCase/SignUpUseCase";

export function useLayoutHook() {
  const [users, setUsers] = useState<Array<unknown>>([]);
  const router = useRouter();

  useEffect(() => {
    async function init() {
      const usersRequest = await fetch.get("/api/user/get-all");

      if (usersRequest.httpStatus === HTTP_OK) {
        const users = usersRequest.body as unknown as User[];
        setUsers(users);
      } else {
        toast.error(usersRequest.body.message);
      }

      //
    }
    void init();
  }, []);

  async function handleClickOnUser(userId: string): Promise<void> {
    //TODO primero buscar el chat. Si existe, redireccionar. Sino, crear y luego redireccionar

    // TODO tomar id del usuario logueado y formar un array con el userId del parametro
    const chat = await startChatUseCase(fetch, [userId]);

    router.push(`/chat/${chat.id}`);
  }

  return {
    users,
    handleClickOnUser,
  };
}

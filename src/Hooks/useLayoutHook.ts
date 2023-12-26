import { Chat, User } from "@prisma/client";
import { useEffect, useState } from "react";
import * as fetch from "../Helper/HttpHelper";
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
    console.log("hola");

    const chatCreateRequest = await fetch.post("/api/chat/create", {
      userId,
    });

    if (chatCreateRequest.httpStatus === HTTP_OK) {
      const chat = chatCreateRequest.body as unknown as Chat;

      router.push(`/chat/${chat.id}`);
    } else {
      toast.error(chatCreateRequest.body.message);
    }
  }

  return {
    users,
    handleClickOnUser,
  };
}

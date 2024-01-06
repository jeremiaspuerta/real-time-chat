"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCookies } from "next-client-cookies";
import { deleteHttpMethod } from "@/helpers/HttpHelper";
import { HTTP_OK } from "@/constants/HttpStatusCode";

export function useLogOutHook() {
  const router = useRouter();
  const cookies = useCookies();

  async function handleLogOut(): Promise<void> {

    const signUpRequest = await deleteHttpMethod("/api/auth/logout",{});

    if (signUpRequest.httpStatus === HTTP_OK) {
      cookies.remove("AUTH_TOKEN");
      router.push("/login");
    } else {
      toast.error(signUpRequest.body.message as string);
    }
  }

  return {
    handleLogOut,
  };
}

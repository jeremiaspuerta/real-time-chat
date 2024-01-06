"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCookies } from "next-client-cookies";
import { UserLogInType } from "@/types";
import { post } from "@/helpers/HttpHelper";
import { HTTP_OK } from "@/constants/HttpStatusCode";

export function useLogInHook() {
  const router = useRouter();
  const cookies = useCookies();

  async function handleLogIn(user: UserLogInType): Promise<void> {
    const bodyRequest = {
      email: user.email,
      password: user.password,
    };

    const signUpRequest = await post("/api/auth/login", bodyRequest);

    if (signUpRequest.httpStatus === HTTP_OK) {
      cookies.set("AUTH_TOKEN", signUpRequest.body.token as string);
      router.push("/");
    } else {
      toast.error(signUpRequest.body.message as string);
    }
  }

  return {
    handleLogIn,
  };
}

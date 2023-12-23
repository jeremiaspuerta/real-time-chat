"use client";

import { HTTP_OK } from "../Constants/HttpStatusCode";
import { useRouter } from "next/navigation";
import { post } from "../Helper/HttpHelper";
import toast from "react-hot-toast";
import { UserLogIn } from "../Domain/RepositoryInterface/UserRepositoryInterface";

export function useLogInHook() {
  const router = useRouter();

  async function handleLogIn(user: UserLogIn): Promise<void> {
    const bodyRequest = {
      email: user.email,
      password: user.password,
    };

    const signUpRequest = await post("/api/auth/login", bodyRequest);

    if (signUpRequest.httpStatus === HTTP_OK) {
      localStorage.setItem("AUTH_TOKEN", signUpRequest.body.token as string);
      router.push("/");
    } else {
      toast.error(signUpRequest.body.message);
    }
  }

  return {
    handleLogIn,
  };
}
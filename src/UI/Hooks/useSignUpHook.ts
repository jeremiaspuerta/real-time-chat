"use client";

import { post } from "@/helpers/HttpHelper";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { HTTP_OK } from "@/constants/HttpStatusCode";
import { UserCreation } from "@/types";

export function useSignUpHook() {
  const router = useRouter();

  async function handleSignUp(user: UserCreation): Promise<void> {
    const signUpRequest = await post("/api/user/signup", user);

    if (signUpRequest.httpStatus === HTTP_OK) {
      toast.success(signUpRequest.body.message as string);
      router.push("/login");
    } else {
      toast.error(signUpRequest.body.message as string);
    }
  }

  return {
    handleSignUp,
  };
}

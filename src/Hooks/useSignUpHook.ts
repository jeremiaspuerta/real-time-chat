"use client";

import { HTTP_OK } from "../Constants/HttpStatusCode";
import { UserCreation } from "../Domain/RepositoryInterface/UserRepositoryInterface";
import { useRouter } from "next/navigation";
import { post } from "../Helper/HttpHelper";
import toast from "react-hot-toast";

export function useSignUpHook() {
  const router = useRouter();

  async function handleSignUp(user: UserCreation): Promise<void> {
    const signUpRequest = await post("/api/user/sign-up", user);

    if (signUpRequest.httpStatus === HTTP_OK) {
      toast.success(signUpRequest.body.message);
      router.push("/login");
    } else {
      toast.error(signUpRequest.body.message);
    }
  }

  return {
    handleSignUp,
  };
}

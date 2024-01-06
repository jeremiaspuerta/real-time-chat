"use client";

import { SignUpForm } from "@/components/SignUpForm";
import { SignUpLogInContainer } from "@/components/shared/SignUpLogInContainer";
import { useSignUpHook } from "@/hooks/useSignUpHook";
import { UserCreation } from "@/types";

export default function SignUpPage() {
  const { handleSignUp } = useSignUpHook();

  return (
    <SignUpLogInContainer>
      <h1 className="text-xl mb-5 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Create your Account
      </h1>
      <SignUpForm
        handleSignUp={(useCreation: UserCreation) => handleSignUp(useCreation)}
      />
    </SignUpLogInContainer>
  );
}

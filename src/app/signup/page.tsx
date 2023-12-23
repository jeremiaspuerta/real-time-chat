"use client";

import { UserCreation } from "../../Domain/RepositoryInterface/UserRepositoryInterface";
import { useSignUpHook } from "../../Hooks/useSignUpHook";
import { SignUpForm } from "../../UI/SignUpForm";
import { SignUpLogInContainer } from "../../UI/shared/SignUpLogInContainer";

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

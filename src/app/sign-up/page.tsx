"use client";

import { UserCreation } from "../../Domain/RepositoryInterface/UserRepositoryInterface";
import { useSignUpHook } from "../../Hooks/useSignUpHook";
import { SignUpForm } from "../../UI/SignUpForm";
import { SignInUpContainer } from "../../UI/shared/SignInUpContainer";

export default function SignUpPage() {
  const { handleSignUp } = useSignUpHook();

  return (
    <SignInUpContainer>
      <h1 className="text-xl mb-5 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Create your Account
      </h1>
      <SignUpForm
        handleSignUp={(useCreation: UserCreation) => handleSignUp(useCreation)}
      />
    </SignInUpContainer>
  );
}

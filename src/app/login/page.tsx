"use client";

import { LogInForm } from "../../UI/LogInForm";
import { useLogInHook } from "../../Hooks/useLogInHook";
import { UserLogIn } from "../../Domain/RepositoryInterface/UserRepositoryInterface";
import { SignUpLogInContainer } from "../../UI/shared/SignUpLogInContainer";

export default function LoginPage() {
  const { handleLogIn } = useLogInHook();
  return (
    <SignUpLogInContainer>
      <h1 className="text-xl mb-5 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Log in to your account
      </h1>
      <LogInForm
        handleLogIn={(userLogIn: UserLogIn) => handleLogIn(userLogIn)}
      />
    </SignUpLogInContainer>
  );
}

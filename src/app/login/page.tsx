"use client";

import { LogInForm } from "@/components/LogInForm";
import { useLogInHook } from "@/hooks/useLogInHook";
import { SignUpLogInContainer } from "@/components/shared/SignUpLogInContainer";
import { UserLogInType } from "@/types";

export default function LoginPage() {
  const { handleLogIn } = useLogInHook();
  return (
    <SignUpLogInContainer>
      <h1 className="text-xl mb-5 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Log in to your account
      </h1>
      <LogInForm
        handleLogIn={(UserLogInType: UserLogInType) =>
          handleLogIn(UserLogInType)
        }
      />
    </SignUpLogInContainer>
  );
}

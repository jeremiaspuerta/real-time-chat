/* eslint-disable max-lines */
"use client";

import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { UserCreation } from "../Domain/RepositoryInterface/UserRepositoryInterface";

type Props = {
  // eslint-disable-next-line no-unused-vars
  handleSignUp(userCreation: UserCreation): Promise<void>;
};

export const SignUpForm = ({ handleSignUp }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCreation>();
  const onSubmit: SubmitHandler<UserCreation> = (data) => {
    setIsLoading(true);
    void handleSignUp(data);
    setIsLoading(false);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form
      style={{ display: "flex", flexDirection: "column", gap: "2vh" }}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormFields register={register} errors={errors} />

      <Button type="submit" color="primary" isLoading={isLoading}>
        Sign Up
      </Button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link
          href={"/login"}
          className="font-medium hover:underline dark:text-primary-500"
          style={{ color: "#338DF3" }}
        >
          Login here
        </Link>
      </p>
    </form>
  );
};

type FormFieldsProps = {
  readonly register: UseFormRegister<UserCreation>;
  readonly errors: FieldErrors<UserCreation>;
};

const FormFields = ({ register, errors }: FormFieldsProps) => {
  return (
    <>
      <div>
        <Input
          type="text"
          label="Name"
          labelPlacement={"outside"}
          variant="bordered"
          placeholder="John Doe"
          isInvalid={Boolean(errors.name)}
          errorMessage={errors.name ? "This field is required" : ""}
          {...register("name", { required: true })}
        />
      </div>
      <div>
        <Input
          type="email"
          label="Email"
          labelPlacement={"outside"}
          variant="bordered"
          placeholder="name@company.com"
          isInvalid={Boolean(errors.email)}
          errorMessage={errors.email ? "This field is required" : ""}
          {...register("email", { required: true })}
        />
      </div>
      <div>
        <Input
          type="password"
          label="Password"
          labelPlacement={"outside"}
          variant="bordered"
          placeholder="••••••••"
          isInvalid={Boolean(errors.password)}
          errorMessage={errors.password ? "This field is required" : ""}
          {...register("password", { required: true })}
        />
      </div>
    </>
  );
};

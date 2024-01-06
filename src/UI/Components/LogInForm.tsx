"use client";

import { UserLogInType } from "@/types";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";

type Props = {
  // eslint-disable-next-line no-unused-vars
  handleLogIn(user: UserLogInType): Promise<void>;
};

export const LogInForm = ({ handleLogIn }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogInType>();
  const onSubmit: SubmitHandler<UserLogInType> = (data) => {
    setIsLoading(true);
    void handleLogIn(data);
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
        Log in
      </Button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Don’t have an account yet?{" "}
        <Link
          href={"/signup"}
          className="font-medium  hover:underline dark:text-primary-500"
          style={{ color: "#338DF3" }}
        >
          Sign up
        </Link>
      </p>
    </form>
  );
};

type FormFieldsProps = {
  readonly register: UseFormRegister<UserLogInType>;
  readonly errors: FieldErrors<UserLogInType>;
};

const FormFields = ({ register, errors }: FormFieldsProps) => {
  return (
    <>
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

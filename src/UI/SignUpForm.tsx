/* eslint-disable max-lines */
"use client";

import { Button } from "@nextui-org/react";
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
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
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
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Name
        </label>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="John Doe"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <p style={{ color: "red", marginTop: ".5vh" }}>
            This field is required
          </p>
        )}
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@company.com"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <p style={{ color: "red", marginTop: ".5vh" }}>
            This field is required
          </p>
        )}
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <p style={{ color: "red", marginTop: ".5vh" }}>
            This field is required
          </p>
        )}
      </div>
    </>
  );
};

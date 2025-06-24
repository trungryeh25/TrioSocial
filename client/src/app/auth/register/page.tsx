"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

type RegisterForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "USER" | "ADMIN";
  adminKey?: string;
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();

  const [serverError, setServerError] = useState("");
  const router = useRouter();

  const role = watch("role", "USER");

  const onSubmit = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      setServerError("Passwords are not matching");
      return;
    }

    try {
      await api.post("auth/register", {
        username: data.username,
        email: data.email,
        password: data.password,
        adminKey: data.role === "ADMIN" ? data.adminKey : undefined,
      });
      router.push("auth/login");
    } catch (err: any) {
      setServerError(err.response?.data?.message || "Register is failed");
    }
  };

  return (
    <main className="max-w-md mx-auto mt-20 p-4 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>

      {serverError && (
        <p className="text-red-600 text-sm mb-2">{serverError}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Enter an username"
          {...register("username", { required: "Username is required" })}
          className="input input-bordered"
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}

        <input
          type="email"
          placeholder="Enter an email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email",
            },
          })}
          className="input input-bordered"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Enter a password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password at least 8 characters",
            },
          })}
          className="input input-bordered"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <input
          type="password"
          placeholder="Re-enter a password"
          {...register("confirmPassword", {
            required: "Please re-enter a password",
          })}
          className="input input-bordered"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}

        <select {...register("role")} className="select select-bordered">
          <option value="USER">User</option>
          {process.env.NODE_ENV === "development" && (
            <option value="ADMIN">Admin (internal only)</option>
          )}
        </select>

        {role === "ADMIN" && (
          <>
            <input
              type="password"
              placeholder="Admin secret key"
              {...register("adminKey", { required: "Admin key is required" })}
              className="input input-bordered"
            />
            {errors.adminKey && (
              <p className="text-red-500 text-sm">{errors.adminKey.message}</p>
            )}
          </>
        )}

        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>
      </form>
    </main>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { api } from "../../../../lib/api";
import { useRouter } from "next/navigation";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const [serverError, setServerError] = useState("");
  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    try {
      await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });
      router.push("/dashboard");
    } catch (err: any) {
      setServerError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <main className="max-w-md mx-auto mt-20 p-4 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

      {serverError && (
        <p className="text-red-600 text-sm mb-2">{serverError}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email",
            },
          })}
          className="border p-2 rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          className="border p-2 rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      <p className="text-sm text-center mt-4">
        Forgot your password?{" "}
        <a
          href="/auth/forgot-password"
          className="text-primary hover:underline"
        >
          Reset
        </a>
      </p>
    </main>
  );
}

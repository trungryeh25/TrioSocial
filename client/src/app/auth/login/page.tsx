"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { api } from "@/lib/api";
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

  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await api.post("/auth/login", data);
      const user = res.data.user;

      console.log("User Role:", user.role);
      console.log("Login response:", res.data);

      localStorage.setItem("token", res.data.accessToken);
      // Optional: set user info to state or localStorage when we need.
      localStorage.setItem("role", user.role);
      localStorage.setItem("userId", user.id);

      console.log("AccessToken:", res.data.accessToken);

      // router.push(user.role === "ADMIN" ? "/dashboard" : "/news-feed");
      if (user.role === "ADMIN") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setServerError(
        err.response?.data?.message || "Email or password is incorrecting."
      );
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
          placeholder="Enter an email"
          {...register("email", { required: "Email is required" })}
          className="input input-bordered"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Enter a password"
          {...register("password", { required: "Password is required" })}
          className="input input-bordered"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <p className="text-sm text-right">
          <a
            href="/auth/forgot-password"
            className="text-blue-600 hover:underline"
          >
            Forgot password?
          </a>
        </p>

        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
      </form>
    </main>
  );
}

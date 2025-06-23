"use client";

import { useForm } from "react-hook-form";
import { api } from "@/lib/api";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();
  const [message, setMessage] = useState("");

  const onSubmit = async (data: { email: string }) => {
    try {
      await api.post("/auth/forgot-password", data);
      setMessage("Password reset has been sent via email.");
    } catch {
      setMessage("Email does not exist or an error occurred.");
    }
  };

  return (
    <main className="max-w-md mx-auto mt-20 p-4 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Quên mật khẩu</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Enter an email"
          {...register("email", { required: true })}
          className="input input-bordered"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">Email is required</p>
        )}
        <button type="submit" className="btn btn-primary w-full">
          Send request
        </button>
        {message && <p className="text-green-600 mt-2 text-sm">{message}</p>}
      </form>
    </main>
  );
}

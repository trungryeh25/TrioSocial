"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { api } from "../../../lib/api";

type ForgotPasswordForm = {
  email: string;
};

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>();

  const [serverMessage, setServerMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      await api.post("/auth/forgot-password", {
        email: data.email,
      });
      setServerMessage("Check your email for reset instructions.");
    } catch (err: any) {
      setServerMessage(
        err.response?.data?.message || "Failed to send reset email"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto mt-20 p-4 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Forgot Password</h1>

      {serverMessage && (
        <p className="text-green-600 text-sm mb-2 text-center">
          {serverMessage}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Enter your email"
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

        <button
          type="submit"
          disabled={loading}
          className={`bg-primary text-white px-4 py-2 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {loading ? "Sending..." : "Send Reset Email"}
        </button>
      </form>
    </main>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { api } from "../../../../lib/api";
import DashboardLayout from "@/components/layout/DashboardLayout";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type PostForm = {
  title: string;
  content: string;
};

export default function CreatePostPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostForm>();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: PostForm) => {
    setLoading(true);
    try {
      await api.post("/posts", data);
      toast.success("Post created successfully!");
      router.push("/dashboard/posts");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Create failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 max-w-xl"
      >
        <input
          type="text"
          placeholder="Post title"
          {...register("title", { required: "Title is required" })}
          className="border p-2 rounded"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}

        <textarea
          placeholder="Content"
          {...register("content", { required: "Content is required" })}
          className="border p-2 rounded h-40"
        />
        {errors.content && (
          <p className="text-red-500 text-sm">{errors.content.message}</p>
        )}

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </DashboardLayout>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { api } from "../../../../lib/api";
import DashboardLayout from "@/components/layout/DashboardLayout";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Post } from "../../../../types/post";

type PostForm = {
  title: string;
  content: string;
};

export default function EditPostPage() {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostForm>();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fake fetch post data
  useEffect(() => {
    // Gọi API thật nếu có
    const fetchData = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        const post: Post = res.data;
        reset({ title: post.title, content: post.content });
      } catch (err: any) {
        toast.error("Failed to load post");
        router.push("/dashboard/posts");
      }
    };
    fetchData();
  }, [id, reset, router]);

  const onSubmit = async (data: PostForm) => {
    setLoading(true);
    try {
      await api.put(`/posts/${id}`, data);
      toast.success("Post updated successfully!");
      router.push("/dashboard/posts");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
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
          {loading ? "Updating..." : "Update Post"}
        </button>
      </form>
    </DashboardLayout>
  );
}

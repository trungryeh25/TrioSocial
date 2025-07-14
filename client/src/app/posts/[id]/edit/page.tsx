"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import { Post } from "@/types/post";
import { useForm } from "react-hook-form";

type EditPostForm = {
  title: string;
  content: string;
};

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditPostForm>();

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        // Reset form với dữ liệu mới
        reset({
          title: res.data.title,
          content: res.data.content,
        });
      } catch (error) {
        toast.error("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, reset]);

  const onSubmit = async (data: EditPostForm) => {
    try {
      await api.patch(`/posts/${id}`, data);
      toast.success("Post updated successfully!");
      router.push(`/posts/${id}`);
    } catch (error) {
      toast.error("Failed to update post");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading post...</p>;
  }

  return (
    <main className="max-w-2xl mx-auto mt-10 p-4 border rounded-lg shadow animate-fadeIn">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <input
            type="text"
            placeholder="Title"
            {...register("title", { required: "Title is required" })}
            className="border p-2 w-full rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <textarea
            placeholder="Content"
            rows={10}
            {...register("content", { required: "Content is required" })}
            className="border p-2 w-full rounded"
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isSubmitting ? "Updating..." : "Update Post"}
        </button>
      </form>
    </main>
  );
}

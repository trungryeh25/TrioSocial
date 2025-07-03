"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "@/lib/api";

interface Props {
  postId: string;
}

type FormData = {
  content: string;
};

export default function CommentForm({ postId }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await api.post(`/posts/${postId}/comments`, data);
      toast.success("Comment added!");
      reset();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to add comment");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 flex flex-col gap-2"
    >
      <textarea
        placeholder="Write a comment..."
        {...register("content", { required: "Comment cannot be empty" })}
        className="border p-2 rounded"
      />
      {errors.content && (
        <p className="text-red-500 text-sm">{errors.content.message}</p>
      )}
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Comment
      </button>
    </form>
  );
}

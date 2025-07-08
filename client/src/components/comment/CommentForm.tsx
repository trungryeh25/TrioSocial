"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "../../lib/api";
import { Comment } from "../../types/comment";

interface Props {
  postId: string;
  parentId?: string;
  onAdded?: (comment: Comment) => void;
}

type FormData = {
  content: string;
};

export default function CommentForm({ postId, parentId, onAdded }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await api.post(`/posts/${postId}/comments`, {
        ...data,
        parentId,
      });
      toast.success("Comment added!");
      reset();
      if (onAdded) {
        onAdded(res.data);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to add comment");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <textarea
        placeholder="Write a comment..."
        {...register("content", { required: "Comment cannot be empty" })}
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {errors.content && (
        <p className="text-red-500 text-sm">{errors.content.message}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? "Adding..." : "Add Comment"}
      </button>
    </form>
  );
}

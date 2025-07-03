"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Comment } from "@/types/comment";
import toast from "react-hot-toast";

interface Props {
  postId: string;
}

export default function CommentList({ postId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await api.get(`/posts/${postId}/comments`);
        setComments(res.data);
      } catch (err: any) {
        toast.error("Failed to load comments");
      }
    };
    fetchComments();
  }, [postId]);

  return (
    <div className="space-y-3">
      {comments.length > 0 ? (
        comments.map((c) => (
          <div key={c.id} className="border p-2 rounded">
            <p className="text-sm font-semibold">{c.author.username}</p>
            <p className="text-gray-700">{c.content}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No comments yet.</p>
      )}
    </div>
  );
}

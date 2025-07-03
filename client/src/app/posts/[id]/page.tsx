"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "../../../../lib/api";
import toast from "react-hot-toast";
import { Post } from "../../../../types/post";
import CommentList from "@/components/comment/CommentList";
import CommentForm from "@/components/comment/CommentForm";

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err: any) {
        toast.error("Failed to load post");
      }
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return <p className="text-center mt-10">Loading post...</p>;
  }

  return (
    <main className="max-w-3xl mx-auto mt-10 p-4 border rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-4">by {post.author.username}</p>
      <p className="mb-6">{post.content}</p>

      <div className="flex items-center gap-4 mb-6">
        <button
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => toast.success("Liked! (fake logic)")}
        >
          ❤️ Like
        </button>
        <button
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          onClick={() => toast.success("Shared! (fake logic)")}
        >
          🔗 Share
        </button>
      </div>

      <h3 className="text-xl font-bold mb-2">Comments</h3>
      <CommentList postId={post.id} />
      <CommentForm postId={post.id} />
    </main>
  );
}

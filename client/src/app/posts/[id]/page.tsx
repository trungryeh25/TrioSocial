"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import { Post } from "@/types/post";
import CommentList from "@/components/comment/CommentList";
import CommentForm from "@/components/comment/CommentForm";

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
      } catch (error) {
        toast.error("Failed to load post");
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading post...</p>;
  }

  if (!post) {
    return <p className="text-center mt-10 text-red-500">Post not found.</p>;
  }

  return (
    <main className="max-w-3xl mx-auto mt-10 p-4 border rounded-lg shadow animate-fadeIn">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

      <div className="flex items-center gap-2 mb-4 text-gray-500 text-sm">
        {post.author.avatar ? (
          <img
            src={post.author.avatar}
            alt={post.author.username}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-white">
            {post.author.username[0]?.toUpperCase()}
          </div>
        )}
        <span>By {post.author.username}</span>
        <span>•</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>

      <p className="mb-6 whitespace-pre-line">{post.content}</p>

      <div className="flex items-center gap-4 mb-8">
        <button
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => toast.success("Liked! (fake logic)")}
        >
          ❤️ Like
        </button>
        <button
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
          onClick={() => toast.success("Shared! (fake logic)")}
        >
          🔗 Share
        </button>
      </div>

      <h3 className="text-xl font-bold mb-2">Comments</h3>
      <CommentForm postId={post.id} />
      <CommentList postId={post.id} />
    </main>
  );
}

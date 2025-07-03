"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Post } from "@/types/post";
import { useState } from "react";
import toast from "react-hot-toast";

const demoPosts: Post[] = [
  {
    id: "1",
    title: "My first post",
    content: "This is my first post content...",
    author: {
      id: "u1",
      username: "alice",
      email: "alice@example.com",
      bio: "",
    },
  },
  {
    id: "2",
    title: "Next.js Tips",
    content: "Here are some Next.js tips for beginners...",
    author: {
      id: "u1",
      username: "alice",
      email: "alice@example.com",
      bio: "",
    },
  },
];

export default function ManagePostsPage() {
  const [posts, setPosts] = useState<Post[]>(demoPosts);

  const handleDelete = (id: string) => {
    // Fake delete
    setPosts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Post deleted");
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Manage Posts</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h4 className="font-bold">{post.title}</h4>
              <p className="text-sm text-gray-600">
                {post.content.slice(0, 80)}...
              </p>
            </div>
            <button
              onClick={() => handleDelete(post.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
        {posts.length === 0 && (
          <p className="text-gray-500">No posts available.</p>
        )}
      </div>
    </DashboardLayout>
  );
}

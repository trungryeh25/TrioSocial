"use client";

import { useAuthGuard } from "../../hooks/useAuthGuard";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { Post } from "../../types/post";
import PostCard from "@/components/post/PostCard";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, isChecking } = useAuthGuard("ADMIN");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    api
      .get("/posts")
      .then((res) => setPosts(res.data))
      .catch(() => setPosts([]))
      .finally(() => setIsLoading(false));
  }, [user]);

  if (isChecking || !user) {
    return null; // Hoặc có thể render spinner
  }

  return (
    <>
      <main className="container mx-auto px-4 py-8 space-y-6">
        <h1 className="text-2xl font-bold">Admin Dashboard - Manage Posts</h1>

        {isLoading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={() => router.push(`/dashboard/posts/edit/${post.id}`)}
              onDelete={() => handleDelete(post.id)}
            />
          ))
        )}
      </main>
    </>
  );

  function handleDelete(postId: string) {
    if (confirm("Are you sure you want to delete this post?")) {
      api
        .delete(`/posts/${postId}`)
        .then(() => {
          setPosts((prev) => prev.filter((p) => p.id !== postId));
          alert("Deleted successfully!");
        })
        .catch(() => alert("Failed to delete."));
    }
  }
}

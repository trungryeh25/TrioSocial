"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { Post } from "@/types/post";
import toast from "react-hot-toast";
import PostCard from "@/components/post/PostCard";

export default function ManageMyPostsPage() {
  const { user, isChecking } = useAuthGuard("USER");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    api
      .get(`/posts/user/${user.id}`)
      .then((res) => setPosts(res.data))
      .catch(() => toast.error("Failed to load your posts"))
      .finally(() => setIsLoading(false));
  }, [user]);

  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await api.delete(`/posts/${postId}`);
      setPosts((prev) => prev.filter((p) => p.id !== postId));
      toast.success("Deleted successfully");
    } catch {
      toast.error("Failed to delete post");
    }
  };

  if (isChecking || !user) return null;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">My Posts</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500">You have no posts yet.</p>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={() => router.push(`/posts/${post.id}/edit`)}
              onDelete={() => handleDelete(post.id)}
            />
          ))}
        </div>
      )}
    </main>
  );
}

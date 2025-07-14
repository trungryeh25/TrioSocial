"use client";

import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { User } from "../../types/user";
import { Post } from "../../types/post";
import PostCard from "@/components/post/PostCard";
import { useRouter } from "next/navigation";
import CreatePostForm from "@/components/post/CreatePostForm";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    api
      .get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        return api.get(`/posts?authorId=${res.data.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
      .then((res) => setPosts(res.data))
      .catch(() => {
        router.push("/auth/login");
      })
      .finally(() => setIsLoading(false));
  }, [router]);

  const handlePostCreated = async () => {
    if (!user) return;

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await api.get(`/posts?authorId=${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (error) {
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <img
          src={user.avatar || "/default_avatar.svg"}
          alt="avatar"
          className="w-20 h-20 rounded-full object-cover border"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.username}</h1>
          <p className="text-gray-600">{user.bio}</p>
          <p className="text-sm text-gray-500">
            Joined: {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Form tạo bài viết mới */}
      <CreatePostForm user={user} onPostCreatedAction={handlePostCreated} />

      <h2 className="text-xl font-semibold mt-8 mb-4">Your Posts</h2>

      {isLoading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>You have no posts yet.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} currentUser={user} />
          ))}
        </div>
      )}
    </main>
  );
}

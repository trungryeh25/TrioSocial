"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { User } from "@/types/user";
import { Post } from "@/types/post";
import PostCard from "@/components/post/PostCard";
import { useRouter } from "next/navigation";

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
      .get("/auth/me")
      .then((res) => {
        setUser(res.data);
        api
          .get(`/posts/user/${res.data.id}`)
          .then((res) => setPosts(res.data))
          .catch(() => setPosts([]))
          .finally(() => setIsLoading(false));
      })
      .catch(() => {
        router.push("/auth/login");
      });
  }, [router]);

  if (!user) {
    return null;
  }

  return (
    <>
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

        <h2 className="text-xl font-semibold mb-4">Your Posts</h2>

        {isLoading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p>You have no posts yet.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

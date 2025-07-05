"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import PostCard from "@/components/post/PostCard";
import { Post } from "@/types/post";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      setIsLoading(false);
      return;
    }

    api
      .get("/auth/me")
      .then((res) => {
        setUser(res.data);
        setIsLoggedIn(true);

        if (res.data.role === "ADMIN") {
          api
            .get("/posts")
            .then((res) => setPosts(res.data))
            .catch(() => setPosts([]))
            .finally(() => setIsLoading(false));
        } else {
          api
            .get(`/posts/user/${res.data.id}`)
            .then((res) => setPosts(res.data))
            .catch(() => setPosts([]))
            .finally(() => setIsLoading(false));
        }
      })
      .catch(() => {
        setUser(null);
        setIsLoggedIn(false);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <main className="container mx-auto px-4 py-8">
        {!isLoggedIn ? (
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Trios Community</h1>
            <p className="mt-4 text-gray-600">
              Join and share your thoughts with the community!
            </p>
          </div>
        ) : isLoading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p>No posts found.</p>
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

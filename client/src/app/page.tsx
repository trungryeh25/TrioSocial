"use client";

import { useEffect, useState } from "react";
import { api } from "../lib/api";
import PostCard from "@/components/post/PostCard";
import CreatePostForm from "@/components/post/CreatePostForm";
import { Post } from "../types/post";
import { User } from "../types/user";
import toast from "react-hot-toast";

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      setIsLoading(false);
      return;
    }

    api
      .get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setIsLoggedIn(true);
      })
      .catch(() => {
        setUser(null);
        setIsLoggedIn(false);
        toast.error("Session expired. Please login again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!user) return;

    setIsLoading(true);

    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        let res;
        if (user.role === "ADMIN") {
          res = await api.get("/posts", {
            headers: { Authorization: `Bearer ${token}` },
          });
        } else {
          res = await api.get(`/posts?authorId=${user.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }
        setPosts(res.data);
      } catch (error) {
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  const handlePostCreated = async () => {
    if (!user) return;

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      let res;
      if (user.role === "ADMIN") {
        res = await api.get("/posts", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        res = await api.get(`/posts?authorId=${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setPosts(res.data);
    } catch (error) {
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      {!isLoggedIn ? (
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold mb-4">Trio Vie Community</h1>
          <p className="mt-4 text-gray-600">
            Join and share your thoughts with the community!
          </p>
        </div>
      ) : isLoading ? (
        <p>Loading posts...</p>
      ) : (
        <>
          {/* Form tạo bài viết mới */}
          {user && (
            <CreatePostForm
              user={user}
              onPostCreatedAction={handlePostCreated}
            />
          )}

          {/* Danh sách bài viết */}
          <div className="space-y-4 mt-6">
            {posts.length === 0 ? (
              <p className="text-gray-500 text-center">No posts yet.</p>
            ) : (
              posts.map((post) => (
                <PostCard key={post.id} post={post} currentUser={user} />
              ))
            )}
          </div>
        </>
      )}
    </main>
  );
}

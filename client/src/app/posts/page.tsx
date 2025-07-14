"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Post } from "../../types/post";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../lib/api";
import { decodeJWT } from "../../lib/jwt";

export default function ManagePostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to be logged in as admin");
      return;
    }

    let decoded: any;
    try {
      decoded = decodeJWT(token);
    } catch (error) {
      toast.error("Invalid token");
      return;
    }

    if (decoded.role !== "ADMIN") {
      toast.error("Access denied: Admins only");
      return;
    }

    api
      .get("/posts", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        toast.error("Failed to fetch posts");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized");
      return;
    }

    try {
      await api.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };

  return (
    <DashboardLayout>
      {loading ? (
        <p>Loading...</p>
      ) : (
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
      )}
    </DashboardLayout>
  );
}

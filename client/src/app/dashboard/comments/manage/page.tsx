"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { Comment } from "@/types/comment";

export default function ManageCommentsPage() {
  const { user, isChecking } = useAuthGuard("ADMIN");
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    api
      .get("/comments")
      .then((res) => setComments(res.data))
      .catch(() => setComments([]))
      .finally(() => setIsLoading(false));
  }, [user]);

  if (isChecking || !user) return null;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Manage Comments</h1>
      {isLoading ? (
        <p>Loading comments...</p>
      ) : comments.length === 0 ? (
        <p>No comments found.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Author</th>
              <th className="p-2 border">Content</th>
              <th className="p-2 border">Post ID</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((c) => (
              <tr key={c.id} className="border-b">
                <td className="p-2 border">{c.author.username}</td>
                <td className="p-2 border">{c.content}</td>
                <td className="p-2 border">{c.postId}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );

  function handleDelete(commentId: string) {
    if (confirm("Are you sure you want to delete this comment?")) {
      api
        .delete(`/comments/${commentId}`)
        .then(() => {
          setComments((prev) => prev.filter((c) => c.id !== commentId));
          alert("Deleted successfully!");
        })
        .catch(() => alert("Failed to delete comment."));
    }
  }
}

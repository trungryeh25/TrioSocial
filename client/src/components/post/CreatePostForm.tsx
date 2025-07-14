"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import { User } from "@/types/user";
import UploadImage from "./UploadImage";

interface CreatePostFormProps {
  user: User;
  onPostCreatedAction?: () => void;
}

export default function CreatePostForm({
  user,
  onPostCreatedAction,
}: CreatePostFormProps) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmitAction = async () => {
    if (!content.trim() || !title.trim()) {
      toast.error("Title and content cannot be empty");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      await api.post(
        "/posts",
        { title, content, image: imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Post created successfully!");
      setContent("");
      setTitle("");
      setImageUrl(null);
      onPostCreatedAction && onPostCreatedAction();
    } catch (error) {
      toast.error("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded p-4 shadow-sm bg-white animate-fadeIn">
      <p className="mb-2 text-gray-600">
        What's on your mind, {user.username}?
      </p>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-3 py-2 mb-2 rounded"
      />

      <textarea
        placeholder="Write something..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border px-3 py-2 mb-2 rounded resize-none"
        rows={3}
      />

      <UploadImage onUploaded={(url) => setImageUrl(url)} />

      <button
        onClick={handleSubmitAction}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </div>
  );
}

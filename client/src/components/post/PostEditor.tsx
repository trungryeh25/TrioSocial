"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "@/lib/api";

export type PostEditorForm = {
  title: string;
  content: string;
};

interface PostEditorProps {
  defaultValues?: PostEditorForm;
  defaultImage?: string;
  onSubmitAction: (data: PostEditorForm & { image?: string }) => Promise<void>;
}

export default function PostEditor({
  defaultValues,
  defaultImage,
  onSubmitAction,
}: PostEditorProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostEditorForm>({
    defaultValues,
  });

  const [imageUrl, setImageUrl] = useState<string | undefined>(defaultImage);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setImageUrl(res.data.url);
      toast.success("Uploaded successfully!");
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data) =>
        onSubmitAction({ ...data, image: imageUrl })
      )}
      className="flex flex-col gap-4"
    >
      <div>
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: "Title is required" })}
          className="border p-2 w-full rounded"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div>
        <textarea
          placeholder="Content"
          rows={10}
          {...register("content", { required: "Content is required" })}
          className="border p-2 w-full rounded"
        />
        {errors.content && (
          <p className="text-red-500 text-sm">{errors.content.message}</p>
        )}
      </div>

      <div>
        <label className="font-medium text-sm">Upload Image (optional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handleUpload(e.target.files[0]);
            }
          }}
          disabled={uploading}
          className="block mt-1"
        />
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Uploaded"
            className="w-full h-60 object-cover rounded mt-2"
          />
        )}
      </div>

      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        disabled={uploading}
      >
        Save Post
      </button>
    </form>
  );
}

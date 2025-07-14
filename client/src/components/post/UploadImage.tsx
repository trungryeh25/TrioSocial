"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface UploadImageProps {
  onUploadedAction: (url: string) => void;
}

export default function UploadImage({ onUploadedAction }: UploadImageProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      setPreview(data.url);
      onUploadedAction(data.url);
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-32 h-32 object-cover rounded mt-2 border"
        />
      )}
    </div>
  );
}

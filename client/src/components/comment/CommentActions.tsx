"use client";

import { useState } from "react";
import { Comment } from "@/types/comment";
import toast from "react-hot-toast";

interface Props {
  comment: Comment;
  voteAction: (id: string) => void;
  deleteAction: (id: string) => void;
  editAction: (id: string, newContent: string) => void;
}

export default function CommentActions({ comment, voteAction, deleteAction, editAction }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const handleSave = () => {
    if (!editContent.trim()) {
      toast.error("Content cannot be empty");
      return;
    }
    editAction(comment.id, editContent);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-2 mt-2">
      {isEditing ? (
        <>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="border p-2 rounded w-full text-sm"
          />
          <div className="flex gap-2">
            <button onClick={handleSave} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Save</button>
            <button onClick={() => setIsEditing(false)} className="border px-3 py-1 rounded">Cancel</button>
          </div>
        </>
      ) : (
        <div className="flex gap-3 text-xs text-gray-500">
          <button onClick={() => voteAction(comment.id)} className="hover:underline">❤️ {comment.votes || 0}</button>
          <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:underline">Edit</button>
          <button onClick={() => deleteAction(comment.id)} className="text-red-500 hover:underline">Delete</button>
        </div>
      )}
    </div>
  );
}

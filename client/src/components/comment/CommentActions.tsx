"use client";

import { useState } from "react";
import { Comment } from "../../types/comment";

interface Props {
  comment: Comment;
  voteAction: (id: string) => void;
  deleteAction: (id: string) => void;
  editAction: (id: string, newContent: string) => void;
}

export default function CommentActions({
  comment,
  voteAction,
  deleteAction,
  editAction,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editAction(comment.id, content);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setContent(comment.content);
    setIsEditing(false);
  };

  return (
    <div className="flex gap-2 mt-2 text-sm">
      <button
        onClick={() => voteAction(comment.id)}
        className="text-green-500 hover:underline"
      >
        👍 {comment.votes || 0}
      </button>

      {isEditing ? (
        <>
          <button
            onClick={handleSave}
            className="text-blue-500 hover:underline"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="text-gray-500 hover:underline"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <button
            onClick={handleEdit}
            className="text-blue-500 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => deleteAction(comment.id)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </>
      )}

      {isEditing && (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-1 rounded mt-1"
        />
      )}
    </div>
  );
}

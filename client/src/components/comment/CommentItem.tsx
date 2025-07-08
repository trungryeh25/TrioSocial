"use client";

import { Comment } from "../../types/comment";
import { useState } from "react";
import CommentForm from "./CommentForm";

interface Props {
  comment: Comment;
  postId: string;
}

export default function CommentItem({ comment, postId }: Props) {
  const [showReply, setShowReply] = useState(false);

  return (
    <div className="border p-2 rounded mb-2">
      <p className="text-sm font-semibold">{comment.author.username}</p>
      <p className="text-gray-700 mb-2">{comment.content}</p>

      <button
        onClick={() => setShowReply(!showReply)}
        className="text-blue-500 text-sm hover:underline"
      >
        {showReply ? "Cancel" : "Reply"}
      </button>

      {showReply && (
        <div className="ml-4 mt-2">
          <CommentForm postId={postId} parentId={comment.id} />
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-4 mt-2">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} postId={postId} />
          ))}
        </div>
      )}
    </div>
  );
}

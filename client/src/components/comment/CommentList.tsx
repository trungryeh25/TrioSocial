"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Comment } from "@/types/comment";
import toast from "react-hot-toast";
import CommentActions from "@/components/comment/CommentActions";
import ConfirmModal from "@/components/common/ConfirmModal";
import CommentForm from "@/components/comment/CommentForm";

interface Props {
  postId: string;
}

export default function CommentList({ postId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [replyTo, setReplyTo] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await api.get(`/posts/${postId}/comments`);
        setComments(res.data);
      } catch (err: any) {
        toast.error("Failed to load comments");
      }
    };
    fetchComments();
  }, [postId]);

  const handleVoteAction = (id: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, votes: (c.votes || 0) + 1 } : c))
    );
    toast.success("Voted!");
  };

  const handleDeleteAction = (id: string) => {
    setDeleteId(id);
  };

  const confirmDeleteAction = () => {
    if (!deleteId) return;
    setComments((prev) => prev.filter((c) => c.id !== deleteId));
    toast.success("Comment deleted");
    setDeleteId(null);
  };

  const cancelDeleteAction = () => {
    setDeleteId(null);
  };

  const handleEditAction = (id: string, newContent: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, content: newContent } : c))
    );
    toast.success("Comment updated");
  };

  const handleReply = (id: string) => {
    setReplyTo(id);
  };

  const handleReplyAdded = (newComment: Comment) => {
    setComments((prev) => [...prev, newComment]);
    setReplyTo(null);
  };

  return (
    <div className="space-y-3">
      {comments.length > 0 ? (
        comments.map((c) => (
          <div key={c.id} className="border p-3 rounded">
            <p className="text-sm font-semibold">{c.author.username}</p>
            <p className="text-gray-700">{c.content}</p>

            <CommentActions
              comment={c}
              voteAction={handleVoteAction}
              deleteAction={handleDeleteAction}
              editAction={handleEditAction}
            />

            <button
              onClick={() => handleReply(c.id)}
              className="text-blue-500 text-sm mt-1"
            >
              Reply
            </button>

            {replyTo === c.id && (
              <div className="mt-2 ml-4">
                <CommentForm
                  postId={postId}
                  parentId={c.id}
                  onAdded={handleReplyAdded}
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No comments yet.</p>
      )}

      {deleteId && (
        <ConfirmModal
          title="Delete Comment"
          description="Are you sure you want to delete this comment? This action cannot be undone."
          confirmAction={confirmDeleteAction}
          cancelAction={cancelDeleteAction}
        />
      )}
    </div>
  );
}

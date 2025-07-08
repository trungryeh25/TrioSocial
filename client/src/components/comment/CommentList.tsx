"use client";

import { useEffect, useRef, useState } from "react";
import { api } from "../../lib/api";
import { Comment } from "../../types/comment";
import toast from "react-hot-toast";
import CommentActions from "@/components/comment/CommentActions";
import ConfirmModal from "@/components/common/ConfirmModal";
import CommentForm from "@/components/comment/CommentForm";
import clsx from "clsx";

interface Props {
  postId: string;
  parentId?: string;
  level?: number;
}

export default function CommentList({ postId, parentId, level = 0 }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [showReplies, setShowReplies] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [replyCounts, setReplyCounts] = useState<{ [key: string]: number }>({});
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const highlightedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await api.get(`/posts/${postId}/comments`, {
          params: { parentId },
        });
        setComments(res.data);

        // Fetch reply counts
        const counts: { [key: string]: number } = {};
        for (const comment of res.data) {
          const resReplies = await api.get(`/posts/${postId}/comments`, {
            params: { parentId: comment.id },
          });
          counts[comment.id] = resReplies.data.length;
        }
        setReplyCounts(counts);
      } catch (err: any) {
        toast.error("Failed to load comments");
      }
    };
    fetchComments();
  }, [postId, parentId]);

  useEffect(() => {
    if (highlightedRef.current) {
      highlightedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [highlightedId]);

  // ---------------- OPTIMISTIC VOTE ----------------
  const handleVoteAction = async (id: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, votes: (c.votes || 0) + 1 } : c))
    );

    try {
      await api.post(`/comments/${id}/vote`);
      toast.success("Voted!");
    } catch (err: any) {
      setComments((prev) =>
        prev.map((c) => (c.id === id ? { ...c, votes: (c.votes || 1) - 1 } : c))
      );
      toast.error(err.response?.data?.message || "Vote failed");
    }
  };

  // ---------------- OPTIMISTIC DELETE ----------------
  const confirmDeleteAction = async () => {
    if (!deleteId) return;

    const prevComments = comments;
    setComments((prev) => prev.filter((c) => c.id !== deleteId));

    try {
      await api.delete(`/comments/${deleteId}`);
      toast.success("Comment deleted");
    } catch (err: any) {
      setComments(prevComments);
      toast.error(err.response?.data?.message || "Failed to delete comment");
    } finally {
      setDeleteId(null);
    }
  };

  const cancelDeleteAction = () => {
    setDeleteId(null);
  };

  const handleDeleteAction = (id: string) => {
    setDeleteId(id);
  };

  // ---------------- OPTIMISTIC EDIT ----------------
  const handleEditAction = async (id: string, newContent: string) => {
    const prevComments = comments;
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, content: newContent } : c))
    );

    try {
      await api.patch(`/comments/${id}`, { content: newContent });
      toast.success("Comment updated");
    } catch (err: any) {
      setComments(prevComments);
      toast.error(err.response?.data?.message || "Failed to update comment");
    }
  };

  // ---------------- REPLY ----------------
  const handleReply = (id: string) => {
    setReplyTo(id);
  };

  const handleReplyAdded = (newComment: Comment) => {
    setComments((prev) => [...prev, newComment]);
    setReplyTo(null);
    setHighlightedId(newComment.id);
  };

  const toggleReplies = (id: string) => {
    setShowReplies((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-3" style={{ marginLeft: level * 20 }}>
      {comments.length > 0
        ? comments.map((c) => (
            <div
              key={c.id}
              ref={highlightedId === c.id ? highlightedRef : null}
              className={clsx(
                "border p-3 rounded transition",
                highlightedId === c.id && "border-blue-500 bg-blue-50"
              )}
            >
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
                <div className="mt-2">
                  <CommentForm
                    postId={postId}
                    parentId={c.id}
                    onAdded={handleReplyAdded}
                  />
                </div>
              )}

              {replyCounts[c.id] > 0 && (
                <button
                  onClick={() => toggleReplies(c.id)}
                  className="text-gray-500 text-xs mt-1 hover:underline"
                >
                  {showReplies[c.id]
                    ? "Hide replies"
                    : `Show replies (${replyCounts[c.id]})`}
                </button>
              )}

              {showReplies[c.id] && (
                <CommentList
                  postId={postId}
                  parentId={c.id}
                  level={level + 1}
                />
              )}
            </div>
          ))
        : parentId === undefined && (
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

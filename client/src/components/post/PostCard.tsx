"use client";

import Link from "next/link";
import { Post } from "../../types/post";

interface Props {
  post: Post;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function PostCard({ post, onEdit, onDelete }: Props) {
  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition relative">
      <Link href={`/post/${post.id}`}>
        <h2 className="text-xl font-bold hover:underline">{post.title}</h2>
      </Link>
      <p className="text-sm text-gray-600 mt-1">By {post.author.username}</p>

      <p className="mt-2 text-gray-800 line-clamp-3">
        {post.content.length > 100
          ? `${post.content.slice(0, 100)}...`
          : post.content}
      </p>

      {(onEdit || onDelete) && (
        <div className="flex gap-2 mt-4">
          {onEdit && (
            <button
              onClick={onEdit}
              className="text-blue-600 hover:underline text-sm"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="text-red-600 hover:underline text-sm"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { Post } from "@/types/post";

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <Link href={`/post/${post.id}`}>
        <h2 className="text-xl font-bold hover:underline">{post.title}</h2>
      </Link>
      <p className="text-sm text-gray-600 mt-1">By {post.author.username}</p>

      <p className="mt-2 text-gray-800 line-clamp-3">
        {post.content.length > 100 ? `${post.content.slice(0, 100)}...` : post.content}
      </p>

      {/* Optional footer section (votes, comments, hashtags) */}
      {/* 
      <div className="text-xs text-gray-500 mt-2">
        ❤️ {post.votes?.length || 0} · 💬 {post.comments?.length || 0} · #
        {post.hashtags?.join(", ")}
      </div>
      */}
    </div>
  );
}

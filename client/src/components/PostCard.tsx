'use client';

import { Post } from "@/types/post";
import Link from "next/link";

type Props = {
    post: Post;
}

export default function PostCard({ post }: Props) {
    return (
        <div className="border rounder-xl p-4 shadow-sm hover:shadow-md transition">
            <Link href={`/post/${post.id}`}>
                <h2 className="text-xl font-bold">{post.title}</h2>    
            </Link>
            <p className="text-sm text-gray-600">{post.author.username}</p>
            <p className="mt-2 text-gray-800 line-clamp-3">{post.content}</p>
        </div>
    );
}
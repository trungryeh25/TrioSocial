import { Post } from "@/types/post";

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <div className="border p-4 rounded-md">
      <h4 className="font-bold text-lg">{post.title}</h4>
      <p className="text-sm text-gray-600 mt-1">
        {post.content.slice(0, 100)}...
      </p>
      {/* <div className="text-xs text-gray-400 mt-2">
        ❤️ {post.votes?.length || 0} · 💬 {post.comments?.length || 0} · #
        {post.hashtags?.join(", ")}
      </div> */}
    </div>
  );
}

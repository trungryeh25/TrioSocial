import { Post } from "../../../types/post";

export default function UserPosts({ posts }: { posts: Post[] }) {
  return (
    <div className="w-3/5">
      <h3 className="text-lg font-semibold mb-3">Posts</h3>
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border p-4 rounded-md bg-white shadow-sm"
          >
            <h4 className="font-bold text-lg">{post.title}</h4>
            <p className="text-sm text-gray-600 mt-1">
              {post.content.slice(0, 100)}...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

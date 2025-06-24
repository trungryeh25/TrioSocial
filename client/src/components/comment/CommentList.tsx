import { Comment } from "@/types/comment";

export default function CommentList({ comments }: { comments: Comment[] }) {
  return (
    <ul className="space-y-2">
      {comments.map((c) => (
        <li key={c.id} className="border-b pb-2">
          <p className="text-sm">{c.content}</p>
          <p className="text-xs text-gray-400">By {c.author.username}</p>
        </li>
      ))}
    </ul>
  );
}

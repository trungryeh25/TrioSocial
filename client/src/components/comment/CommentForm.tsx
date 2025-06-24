import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CommentForm({
  onSubmit,
}: {
  onSubmit: (content: string) => void;
}) {
  const [content, setContent] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(content);
        setContent("");
      }}
    >
      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Write a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button type="submit">Comment</Button>
    </form>
  );
}

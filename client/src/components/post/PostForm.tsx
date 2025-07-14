import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function PostForm({
  onSubmit,
}: {
  onSubmit: (data: { title: string; content: string }) => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ title, content });
      }}
    >
      {/* <input
        className="border p-2 w-full mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /> */}
      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button type="submit">Post</Button>
    </form>
  );
}

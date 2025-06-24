import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function UserForm({
  initialEmail = "",
  initialUsername = "",
  onSave,
}: {
  initialEmail?: string;
  initialUsername?: string;
  onSave: (data: { email: string; username: string }) => void;
}) {
  const [email, setEmail] = useState(initialEmail);
  const [username, setUsername] = useState(initialUsername);

  return (
    <div>
      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Username</label>
        <input
          className="border p-2 w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <Button onClick={() => onSave({ email, username })}>Save</Button>
    </div>
  );
}

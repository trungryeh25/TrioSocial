"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "../../../../../../lib/api";
import { User } from "../../../../../../types/user";
import { Button } from "@/components/ui/button";
import { routes } from "@/routes";

export default function UserDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setEmail(res.data.email);
        setUsername(res.data.username);
      });
  }, [id]);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    await api.patch(
      `/users/${id}`,
      { email, username },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    router.push(routes.userProfile(id as string));
  };

  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Personal Information</h1>

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

      <Button onClick={handleSave}>Save Changes</Button>
    </div>
  );
}

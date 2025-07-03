"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "../../../../../lib/api";
import { User } from "../../../../../types/user";
import { Button } from "@/components/ui/button";

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"USER" | "ADMIN">("USER");

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get(`/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setEmail(res.data.email);
        setUsername(res.data.username);
        setRole(res.data.role);
      });
  }, [id]);

  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    api
      .patch(
        `/admin/users/${id}`,
        {
          email,
          username,
          password: password || undefined, // tránh gửi chuỗi rỗng
          role,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => router.push("/dashboard/users"));
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>

      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full"
          placeholder="Leave blank to keep current password"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as "USER" | "ADMIN")}
          className="border p-2 w-full"
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </div>

      <Button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        Update
      </Button>
    </div>
  );
}

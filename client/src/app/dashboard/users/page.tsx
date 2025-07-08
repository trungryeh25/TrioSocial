"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../../lib/api";
import { User } from "../../../types/user";
import { Button } from "@/components/ui/button";

export default function AdminUserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get("/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data));
  }, []);

  const handleDelete = (id: string) => {
    const token = localStorage.getItem("token");
    api
      .delete(`/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setUsers((prev) => prev.filter((u) => u.id !== id)));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td className="p-2 border text-center">{index + 1}</td>
              <td className="p-2 border text-center">{user.email}</td>
              <td
                className="p-2 border text-blue-600 hover:underline cursor-pointer text-center"
                onClick={() => router.push(`/user/profile/${user.id}`)}
              >
                {user.username}
              </td>
              <td className="p-2 border text-center">{user.role}</td>
              <td className="p-2 border space-x-2 text-center">
                <Button
                  variant="outline"
                  className="bg-[#004C99] font-roboto font-bold text-white hover:bg-[#0080FF]"
                  onClick={() => router.push(`/dashboard/users/${user.id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  className="bg-[#BA1B1B] font-roboto font-bold text-white hover:bg-[#DA5151]"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

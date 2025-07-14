"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { User } from "@/types/user";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import Link from "next/link";

export default function ManageUsersPage() {
  const { user, isChecking } = useAuthGuard("ADMIN");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    api
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch(() => setUsers([]))
      .finally(() => setIsLoading(false));
  }, [user]);

  if (isChecking || !user) {
    return null; // Hoặc spinner
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      {isLoading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Username</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b">
                <td className="p-2 border">{u.username}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">{u.role}</td>
                <td className="p-2 border">
                  <Link
                    href={`/dashboard/users/edit/${u.id}`}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );

  function handleDelete(userId: string) {
    if (confirm("Are you sure to delete this user?")) {
      api
        .delete(`/users/${userId}`)
        .then(() => {
          setUsers((prev) => prev.filter((u) => u.id !== userId));
          alert("Deleted successfully!");
        })
        .catch(() => alert("Failed to delete user."));
    }
  }
}

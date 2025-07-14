"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { Notification } from "@/types/notification";

export default function ManageNotificationsPage() {
  const { user, isChecking } = useAuthGuard("ADMIN");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    api
      .get("/notifications")
      .then((res) => setNotifications(res.data))
      .catch(() => setNotifications([]))
      .finally(() => setIsLoading(false));
  }, [user]);

  if (isChecking || !user) return null;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Manage Notifications</h1>
      {isLoading ? (
        <p>Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Content</th>
              <th className="p-2 border">User ID</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((n) => (
              <tr key={n.id} className="border-b">
                <td className="p-2 border">{n.type}</td>
                <td className="p-2 border">{n.message}</td>
                <td className="p-2 border">{n.userId}</td>
                <td className="p-2 border">{n.isRead ? "Read" : "Unread"}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDelete(n.id)}
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

  function handleDelete(notificationId: string) {
    if (confirm("Are you sure you want to delete this notification?")) {
      api
        .delete(`/notifications/${notificationId}`)
        .then(() => {
          setNotifications((prev) =>
            prev.filter((n) => n.id !== notificationId)
          );
          alert("Deleted successfully!");
        })
        .catch(() => alert("Failed to delete notification."));
    }
  }
}

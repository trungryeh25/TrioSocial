"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Notification } from "../src/types/notification";

export function useNotification(userId: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!userId) return;

    const socket = io(process.env.NEXT_PUBLIC_API_URL!, {
      transports: ["websocket"],
    });

    socketRef.current = socket;

    // Register user
    socket.emit("register", userId);

    // Listen new notification
    socket.on("notification", (notif: Notification) => {
      console.log("New notification:", notif);
      setNotifications((prev) => [notif, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return {
    notifications,
    markAsRead: async (id: string) => {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/notification/${id}/read`,
        {
          method: "PATCH",
        }
      );
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    },
  };
}

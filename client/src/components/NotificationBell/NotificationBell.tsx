"use client";

import { useNotification } from "../../hooks/useNotification";
import { useEffect, useState } from "react";
import { Notification } from "../../types/notification";

interface Props {
  userId: string;
}

export default function NotificationBell({ userId }: Props) {
  const { notifications, markAsRead } = useNotification(userId);
  const [showList, setShowList] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    if (notifications.length > 0) {
      // You can show toast here, for example using react-hot-toast
      // toast("You have a new notification!");
    }
  }, [notifications]);

  return (
    <div className="relative">
      <button
        onClick={() => setShowList((prev) => !prev)}
        className="relative p-2 rounded-full bg-gray-200 hover:bg-gray-300"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {showList && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg overflow-hidden z-50">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No notifications
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-3 border-b hover:bg-gray-100 ${
                  notif.isRead ? "text-gray-500" : "font-semibold"
                }`}
              >
                <div>{notif.message}</div>
                {!notif.isRead && (
                  <button
                    onClick={() => markAsRead(notif.id)}
                    className="mt-1 text-blue-500 text-sm"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

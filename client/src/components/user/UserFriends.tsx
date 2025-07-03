"use client";

import { User } from "@/types/user";
import { useRouter } from "next/navigation";

export default function UserFriends({ friends }: { friends: User[] }) {
  const router = useRouter();
  return (
    <div className="w-1/5 bg-gray-50 p-4 rounded-md border">
      <h3 className="font-semibold mb-2">Friends</h3>
      {friends.length === 0 ? (
        <p className="text-sm text-gray-500">No friends yet.</p>
      ) : (
        <ul className="space-y-2">
          {friends.map((friend) => (
            <li
              key={friend.id}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded"
              onClick={() => router.push(`/user/profile/${friend.id}`)}
            >
              <img
                src={friend.avatar ?? "/default_avatar.svg"}
                onError={(e) => (e.currentTarget.src = "/default_avatar.svg")}
                alt="friend"
                className="w-8 h-8 rounded-full border border-gray-300"
              />
              <span className="text-sm">{friend.username}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

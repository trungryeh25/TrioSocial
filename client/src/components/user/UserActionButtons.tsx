"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";

interface Props {
  userId: string; // ID của user đang xem
  currentUserId: string; // ID của user đang đăng nhập
}

export default function UserActionButtons({ userId, currentUserId }: Props) {
  const [isFriend, setIsFriend] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || currentUserId === userId) return;

    // Kiểm tra có đang là bạn bè không
    api.get(`/users/${currentUserId}/friends`).then((res) => {
      const friendIds = res.data.map((u: any) => u.id);
      setIsFriend(friendIds.includes(userId));
    });

    // Kiểm tra đang follow không
    api.get(`/users/${currentUserId}/following`).then((res) => {
      const followingIds = res.data.map((u: any) => u.id);
      setIsFollowing(followingIds.includes(userId));
    });
  }, [userId, currentUserId]);

  const handleFriend = async () => {
    const token = localStorage.getItem("token");
    if (isFriend) {
      await api.delete(`/friends/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsFriend(false);
    } else {
      await api.post(
        "/friends",
        { friendId: userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsFriend(true);
    }
  };

  const handleFollow = async () => {
    const token = localStorage.getItem("token");
    if (isFollowing) {
      await api.delete(`/users/${userId}/follow`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsFollowing(false);
    } else {
      await api.post(
        `/users/${userId}/follow`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsFollowing(true);
    }
  };

  if (currentUserId === userId) return null; // Không hiển thị khi xem chính mình

  return (
    <div className="flex flex-col gap-2 mt-4">
      <Button variant="default" onClick={handleFriend}>
        {isFriend ? "Unfriend" : "Add Friend"}
      </Button>
      <Button variant="secondary" onClick={handleFollow}>
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
}

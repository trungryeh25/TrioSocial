"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "../../../../../lib/api";
import { decodeJWT } from "../../../../../lib/jwt";
import { User } from "../../../../../types/user";
import { Post } from "../../../../../types/post";
import UserAvatar from "@/components/user/UserAvatar";
import UserInfoCard from "@/components/user/UserInfoCard";
import UserPosts from "@/components/user/UserPosts";
import UserFriends from "@/components/user/UserFriends";
import UserActionButtons from "@/components/user/UserActionButtons";

export default function UserProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [friends, setFriends] = useState<User[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log("Token:", token);

    if (token) {
      try {
        const payload = decodeJWT(token);
        setCurrentUserId(payload.id || payload.sub); // fallback key nếu backend dùng `sub`
      } catch (err) {
        console.error("Failed to decode token", err);
      }
    }
    api
      .get(`/users/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setUser(res.data));
    api.get(`/posts?authorId=${id}`).then((res) => setPosts(res.data));
    api.get(`/users/${id}/friends`).then((res) => setFriends(res.data));
  }, [id]);

  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <div className="px-4 py-6 max-w-none">
      <div className="sticky top-0 bg-white z-10 py-4 border-b mb-6 flex items-center gap-4">
        <UserAvatar avatar={user.avatar} username={user.username} />
        <div>
          <h2 className="text-xl font-bold">{user.username}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        <div className="ml-auto">
          {user && currentUserId && (
            <UserActionButtons userId={user.id} currentUserId={currentUserId} />
          )}
        </div>
      </div>

      <div className="flex gap-4 flex-wrap lg:flex-nowrap">
        <UserInfoCard user={user} isOwnProfile={false} />
        <UserPosts posts={posts} />
        <UserFriends friends={friends} />
      </div>
    </div>
  );
}

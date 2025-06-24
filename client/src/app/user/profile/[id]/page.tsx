"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { User } from "@/types/user";
import { Post } from "@/types/post";
import { Button } from "@/components/ui/button";
import { routes } from "@/routes";

export default function UserProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [friends, setFriends] = useState<User[]>([]); // Giả sử API bạn bè đã kết nối

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data));

    api.get(`/posts?authorId=${id}`).then((res) => setPosts(res.data));

    api.get(`/users/${id}/friends`).then((res) => setFriends(res.data)); // optional
  }, [id]);

  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <div className="px-4 py-6 max-w-none">
      {/* Header cố định */}
      <div className="sticky top-0 bg-white z-10 py-4 border-b mb-6 flex items-center gap-4">
        <img
          src={user.avatar ?? "/default_avatar.svg"}
          onError={(e) => (e.currentTarget.src = "/default_avatar.svg")}
          alt="avatar"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-xl font-bold">{user.username}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Body: chia 3 cột */}
      <div className="flex gap-4 flex-wrap lg:flex-nowrap">
        {/* LEFT COLUMN: Thông tin cá nhân */}
        <div className="w-1/5 bg-gray-50 p-4 rounded-md border">
          <h3 className="font-semibold mb-2">Personal Info</h3>
          <p className="text-sm mb-1 flex items-center gap-2"><img src="/heart.ico" alt="heart" className="w-4 h-4" /> Single</p>
          <p className="text-sm mb-1">Joined {new Date(user.createdAt).toLocaleDateString()}</p>
          <Button
            className="mt-4 w-full"
            onClick={() => router.push(routes.userProfileDetail(id as string))}
          >
            Edit Info
          </Button>
        </div>

        {/* CENTER COLUMN: Bài viết */}
        <div className="w-3/5">
          <h3 className="text-lg font-semibold mb-3">Posts</h3>
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="border p-4 rounded-md bg-white shadow-sm">
                <h4 className="font-bold text-lg">{post.title}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {post.content.slice(0, 100)}...
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Bạn bè đã kết nối */}
        <div className="w-1/5 bg-gray-50 p-4 rounded-md border">
          <h3 className="font-semibold mb-2">Friends</h3>
          {friends.length === 0 ? (
            <p className="text-sm text-gray-500">No friends yet.</p>
          ) : (
            <ul className="space-y-2">
              {friends.map((friend) => (
                <li key={friend.id} className="flex items-center gap-2">
                  <img
                    src={friend.avatar ?? "/default_avatar.svg"}
                    onError={(e) => (e.currentTarget.src = "/default_avatar.svg")}
                    alt="friend"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm">{friend.username}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

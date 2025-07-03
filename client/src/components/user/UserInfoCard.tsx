"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { routes } from "@/routes";

export default function UserInfoCard({ user, isOwnProfile }: any) {
  const router = useRouter();
  return (
    <div className="w-1/5 bg-gray-50 p-4 rounded-md border">
      <h3 className="font-semibold mb-2">Personal Info</h3>
      <p className="text-sm mb-1 flex items-center gap-2">
        <img src="/heart.ico" alt="heart" className="w-4 h-4" /> Single
      </p>
      <p className="text-sm mb-1">
        Joined {new Date(user.createdAt).toLocaleDateString()}
      </p>
      {isOwnProfile && (
        <Button
          className="mt-4 w-full"
          onClick={() => router.push(routes.userProfileDetail(user.id))}
        >
          Edit Info
        </Button>
      )}
    </div>
  );
}

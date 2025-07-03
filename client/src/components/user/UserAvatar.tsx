"use client";

import Image from "next/image";

export default function UserAvatar({ avatar, username }: { avatar?: string; username: string }) {
  return (
    <Image
      src={avatar ?? "/default_avatar.svg"}
      onError={(e) => (e.currentTarget.src = "/default_avatar.svg")}
      alt="avatar"
      width={64}
      height={64}
      className="w-16 h-16 rounded-full"
    />
  );
}
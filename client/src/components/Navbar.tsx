"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { api } from "@/lib/api";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b shadow-sm">
      <Link className="text-xl font-bold" href="/">
        Community
      </Link>

      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="text-sm">Hi, {user.username}</span>
            <img
              src={user.avatar || "/default-avater.png"}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
          </>
        ) : (
          <>
            <Link href="/auth/login" className="text-sm">
              Login
            </Link>
            <Link href="/auth/register" className="text-sm">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

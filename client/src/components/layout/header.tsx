"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "../../types/user";
import { api } from "../../lib/api";

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoggedIn(false);
      setUser(null);
      return;
    }

    api
      .get("/auth/me")
      .then((res) => {
        setUser(res.data);
        setIsLoggedIn(true);
      })
      .catch(() => {
        setUser(null);
        setIsLoggedIn(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    router.push("/auth/login");
  };

  return (
    <header className="bg-[#dfdfdf] border-b py-4 px-6 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <span className="flex items-center">
          <img
            src="/logo.png"
            alt="logo"
            className="w-12 h-12 object-contain"
          />
          <img
            src="/logo-name.png"
            alt="logo name"
            className="h-12 object-contain"
          />
        </span>
        <nav className="flex items-center space-x-4">
          {isLoggedIn && user ? (
            <>
              <span className="text-sm">Hi, {user.username}</span>
              <img
                src={user.avatar || "/default-avatar.png"}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />

              {user.role === "ADMIN" && (
                <Link href="/dashboard" className="hover:underline text-sm">
                  Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="text-red-600 hover:underline text-sm"
              >
                Logout
              </button>
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
        </nav>
      </div>
    </header>
  );
}

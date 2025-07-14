"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
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
              <span className="text-sm"><Link href="/profile">Hi, {user.username} </Link></span>
              {user.role === "ADMIN" && (
                <Link
                  href="/dashboard/posts"
                  className="hover:underline text-sm"
                >
                  Dashboard
                </Link>
              )}
              {user.role === "USER" && (
                <Link href="/" className="hover:underline text-sm">
                  New feed
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

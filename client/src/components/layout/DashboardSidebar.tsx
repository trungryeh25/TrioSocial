"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    pathname === href ? "font-bold underline text-blue-500" : "hover:underline";

  return (
    <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <nav className="flex flex-col gap-2">
        <Link href="/" className={linkClass("/")}>
          Home
        </Link>
        <Link href="/dashboard/users" className={linkClass("/dashboard/users")}>
          Users
        </Link>
        <Link href="/dashboard/posts" className={linkClass("/dashboard/posts")}>
          Posts
        </Link>
      </nav>
    </aside>
  );
}

"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <nav className="flex flex-col gap-2">
          <Link href="/dashboard" className="hover:underline">
            Overview
          </Link>
          <Link href="/dashboard/posts" className="hover:underline">
            Manage Posts
          </Link>
          <Link href="/dashboard/posts/create" className="hover:underline">
            Create Post
          </Link>
          <Link href="/profile/edit" className="hover:underline">
            Edit Profile
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

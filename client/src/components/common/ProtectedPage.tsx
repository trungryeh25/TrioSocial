"use client";

import { useAuth } from "@/contexts/AuthContext"; // Đường import đúng theo cấu trúc của bạn
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) return null; // Hoặc có thể show loading/skeleton

  return <>{children}</>;
}

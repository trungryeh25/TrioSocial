"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { User } from "@/types/user";

export function useAuthGuard(requiredRole?: "ADMIN" | "USER") {
  const [user, setUser] = useState<User | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    api
      .get("/auth/me")
      .then((res) => {
        const userData = res.data;
        // Nếu có yêu cầu role và role không khớp → redirect
        if (requiredRole && userData.role !== requiredRole) {
          if (userData.role === "USER") {
            router.push("/profile");
          } else {
            router.push("/");
          }
          return;
        }

        setUser(userData);
      })
      .catch(() => {
        router.push("/auth/login");
      })
      .finally(() => {
        setIsChecking(false);
      });
  }, [requiredRole, router]);

  return { user, isChecking };
}

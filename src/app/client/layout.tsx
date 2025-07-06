'use client';

import { decodeJWT } from "@/helpers/decodeJWT";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === 'checking') return;

    if (!user?.token) {
      router.replace("/login");
      return;
    }

    const payload = decodeJWT(user.token);
    if (!payload || payload.role !== "User") {
      router.replace("/");
    }
  }, [user, status, router]);

  if (status === "checking" || !user) {
    return <div>Cargando...</div>;
  }

  return <>{children}</>;
}

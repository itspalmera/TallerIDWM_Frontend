'use client';

import { decodeJWT } from "@/helpers/decodeJWT";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, status } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Espera a que termine la hidratactión
        if (status === 'checking') return;
        console.log("Datos del user:", user);
        if (!user?.token) {
            router.replace('/login');
            return;
        }
        const payload = decodeJWT(user.token);
        console.log("payload: ", payload);
        if (!payload || payload.role !== 'Admin') {
            router.replace('/');
            return;
        }


    }, [user, status, router]);

    if (status === 'checking' || !user) return <div>Cargando...</div>;

    return (
        <div>
            <main>
                {children}
            </main>
        </div>
    )
}
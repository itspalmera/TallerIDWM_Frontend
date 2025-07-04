'use client';

import { decodeJWT } from "@/helpers/decodeJWT";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({children} : {children: React.ReactNode}) {
    const {user, status} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user?.token){
            return;
        }
        const payload = decodeJWT(user.token);
        if (!payload || payload.role !== 'Admin') {
            router.replace('/');
            return;
        }

    }, [user, status, router]);

    if (status === 'checking' || !user) return <div>Cargando...</div>;

    return (
        <div>
            <h1>Admin panel</h1>
            <main>
                {children}
            </main>
        </div>
    )
}
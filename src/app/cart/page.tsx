'use client';

import { useAuth } from "@/hooks/useAuth";
import { CartPage } from "@/views/cartPage/CartPage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Cart() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    if (!user) {
        return null;
    }

    return <CartPage />;
}
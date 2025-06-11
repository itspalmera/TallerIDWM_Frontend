import { AuthProvider } from "@/contexts/auth/AuthContext";
import { Children } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            {/* Products*/}
            {/*Users*/}
            {children}
        </AuthProvider>
    );
}
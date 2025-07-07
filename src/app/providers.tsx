"use client"

import { AuthProvider } from "@/contexts/auth/AuthContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"

export function Providers({ children }: { children: ReactNode }) {
  // Este estado asegura que el QueryClient se cree una sola vez
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </QueryClientProvider>
  )
}
"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [search, setSearch] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      router.push(`/productos?search=${encodeURIComponent(search)}`)
    }
  }

  const isHome = pathname === "/"

  return (
    <header className="bg-purple-500 px-6 py-4 text-black">
      <div
        className={`flex flex-col md:flex-row items-center justify-between gap-4 ${
          isHome ? "" : "md:items-center"
        }`}
      >
        {/* Logo */}
        <div className="text-2xl font-black italic">BLACKCAT</div>

        {/* Solo en home: mostrar buscador */}
        {isHome && (
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 flex-1 max-w-md mx-4"
          >
            <Input
              type="text"
              placeholder="Buscar producto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white"
            />
            <button type="submit" className="text-white">
              <Search className="w-5 h-5" />
            </button>
          </form>
        )}

        {/* Navegación */}
        <nav className="flex gap-6 font-semibold">
          <Link href="/">Productos</Link>
          <Link href="carrito">Carrito</Link>
          <Link href="login">Cuenta</Link>
        </nav>
      </div>
    </header>
  )
}

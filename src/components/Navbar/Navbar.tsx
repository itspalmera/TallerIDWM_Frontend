"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCartIcon, UserIcon } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useCartStore } from "@/stores/CartStore"
import { Button } from "../ui/button"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  const { items: cart } = useCartStore();
  const { user, logout} = useAuth();
  const [search, setSearch] = useState("")

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      router.push('/productos?search=${encodeURIComponent(search)}')
    }
  }

  const isHome = pathname === "/"

  return (
    <header className="bg-purple-500 px-6 py-4 text-black">
      <div
        className={`flex flex-col md:flex-row items-center justify-between gap-4 ${isHome ? "" : "md:items-center"
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
        
        <nav className="flex items-center gap-6 font-semibold">

        {/* NO AUTENTICADO */}
        {!user && (
          <>
            {/* Productos */}
            <Link href="/">Productos</Link>
            
            {/* Carrito */}
            <Link
              href="/login"
              className="relative flex items-center hover:bg-purple-400 rounded-full p-2 transition-all"
            >
              <ShoppingCartIcon className="w-6 h-6" />
            </Link>

            {/* Iniciar sesión */}
            <Link href="/login">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full">
                <UserIcon className="w-4 h-4 mr-2" /> Iniciar sesión
              </Button>
            </Link>
          </>
        )}

        {/* CLIENTE */}
        {user?.role === 'User' && (
          <>
            {/* Productos */}
            <Link href="/">Productos</Link>
            
            {/* Carrito */}
            <Link
              href="/cart"
              className="relative flex items-center hover:bg-purple-400 rounded-full p-2 transition-all"
            >
              <ShoppingCartIcon className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Perfil */}
            <Link href="/client/editProfile">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full">
                <UserIcon className="w-2 h-2 mr-2" />
                {user.name}
              </Button>
            </Link>

            {/* Cerrar sesión */}
            <Button 
              onClick={() => {
                logout();
                router.push('/login');
              }} 
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full"
            >
              Cerrar sesión
            </Button>
          </>
        )}

        {/* ADMIN */}
        {user?.role === 'Admin' && (
          <>
            {/* Productos */}
            <Link href="/admin/products">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full">
                Gestionar Productos
              </Button>
            </Link>
            
            {/* Clientes */}
            <Link href="/admin/clients">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full">
                Clientes
              </Button>
            </Link>

            {/* Cerrar sesión */}
            <Button
              onClick={() => {
                logout();
                router.push('/login');
              }} 
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full"
            >
              Cerrar sesión
            </Button>
          </>
        )}
      </nav>

      </div>
    </header>
  )
}
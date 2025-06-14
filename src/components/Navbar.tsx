import Link from "next/link";
import { MarsStroke, MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";


export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <nav className="bg-purple-500">
            <link href="https://fonts.googleapis.com/css?family=Inter:400,700,900italic&display=swap" rel="stylesheet"></link>
            <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
                <div className="text-[50px]"><span className="font-inter-italic">BLACKCAT</span></div>

                {/* Barra de Búsqueda */}
                <div className="hidden md:flex items-center space-x-4 text-[22px]">
                    <input 
                        type="text" 
                        placeholder="Buscar producto..." 
                        className="px-4 py-2 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    <Button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors fa-solid fa-magnifying-glass">
                        Buscar
                    </Button>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-8 font-medium text-[28px] items-center font-inter-bold">
                    <li><Link href="/" className="hover:text-gray-700">Productos</Link></li>
                    <li><Link href="#" className="hover:text-gray-700">Carrito</Link></li>
                    <li><Link href="#" className="hover:text-gray-700">Cuenta</Link></li>
                </ul>


                {/* Mobile Hamburger */}
                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        {menuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                    </button>
                </div>
            </div>  

                {/* Mobile Menu */}
                { menuOpen && (
                    <div className="md:hidden flex flex-col items-center text-[28px] bg-purple-600 space-y-4 py-4 font-inter-bold">
                        <Link href="/" onClick={toggleMenu} className="hover:text-gray-700">Productos</Link>
                        <Link href="#" onClick={toggleMenu} className="hover:text-gray-700">Carrito</Link>
                        <Link href="#" onClick={toggleMenu} className="hover:text-gray-700">Cuenta</Link>
                    </div>
                )}  
        </nav>
    )
}
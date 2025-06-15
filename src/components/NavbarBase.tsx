import Link from "next/link";
import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";


export const NavbarBase = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <nav style={{ backgroundColor: "#B962DE" }} >
            <link href="https://fonts.googleapis.com/css?family=Inter:400,700,900italic&display=swap" rel="stylesheet"></link>
            <div className="max-w-7xl mx-auto py-6 flex justify-between items-center">
                <div className="text-[50px]"><span className="font-inter-italic">BLACKCAT</span></div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex mx-4 space-x-8 font-medium text-[28px] items-center font-inter-bold">
                    <li><Link href="/" className="hover:text-gray-700">Productos</Link></li>
                    <li><Link href="#" className="hover:text-gray-700">Carrito</Link></li>
                    <li><Link href="login" className="hover:text-gray-700">Cuenta</Link></li>
                </ul>


                {/* Mobile Hamburger */}
                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        {menuOpen ? <XIcon className="m-4 h-6 w-6" /> : <MenuIcon className="m-4 h-6 w-6" />}
                    </button>
                </div>
            </div>  

                {/* Mobile Menu */}
                { menuOpen && (
                    <div className="md:hidden flex flex-col items-center text-[28px] bg-purple-600 space-y-4 py-4 font-inter-bold">
                        <Link href="/" onClick={toggleMenu} className="hover:text-gray-700">Productos</Link>
                        <Link href="#" onClick={toggleMenu} className="hover:text-gray-700">Carrito</Link>
                        <Link href="login" onClick={toggleMenu} className="hover:text-gray-700">Cuenta</Link>
                    </div>
                )}  
        </nav>
    )
}
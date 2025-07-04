import { Product } from "@/interfaces/Products/Product"
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { LoginDialog } from "./LoginDialog";
import { useState } from "react";
import { useCartStore } from "@/stores/CartStore";

interface ProductCardProps {
    product: Product;
    onClick?: () => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {

    const { addToCart } = useCartStore();

    const { user } = useAuth();
    const [showDialog, setShowDialog] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!user) {
            setShowDialog(true);
            return;       
        }
        addToCart(product.id, 1);
        alert(`Producto ${product.title} agregado al carrito`);
    }

    const router = useRouter();
    return (
        <div>
            <div className="bg-white rounded-lg  cursor-pointer transition hover:scale-105">
                <div onClick={onClick}>
                    <div className="relative w-full h-32 flex items-center justify-center"
                    >
                        <Image src={product.imageUrl[0]} alt={product.title} width={200} height={200} className="object-contain" />
                    </div>
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-center">
                            {product.title}
                        </h3>
                        <p className="mt-2 font-bold text-xl text-center">${product.price}</p>
                    </div>
                </div>
                <Button className="mt-1 w-full text-[14px]"
                    style={{
                        backgroundColor: "#D0EBFF",
                        color: "#003D69",
                        boxShadow: "2px 3px 2px rgba(0,0,0,0.2)"
                    }}
                    // onClick={handleAddToCart}
                    >
                    Agregar al carrito
                </Button>
            </div>

            {/* <LoginDialog open={showDialog} onClose={() => setShowDialog(false)}/> */}
        </div>
    )
}

function useAuth(): { user: any; } {
    throw new Error("Function not implemented.");
}

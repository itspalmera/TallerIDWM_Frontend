'use client';

import { CartItem } from "@/interfaces/Products/Product";
import Image from "next/image";
import { CircleMinus, PlusIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/CartStore";

interface CartItemCardProps {
    item: CartItem;
}

export const CartItemCard = ({ item }: CartItemCardProps) => {
    const { addToCart, removeFromCart } = useCartStore();

    const handleRemoveItem = () => {
        removeFromCart(item.productId, item.quantity);
        console.log(`Producto ${item.productId} eliminado del carrito.`);
    };

    return (
        <div className="bg-white p-4 rounded shadow flex flex-col md:flex-row gap-4">
            <Image
                src={item.imageUrl?.[0] || ''}
                alt={item.name}
                width={100}
                height={100}
                className="object-contain border rounded mx-auto md:mx-0"
            />
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h2 className="font-semibold text-base md:text-lg">{item.name}</h2>
                    <p className="text-sm text-gray-500">$ {item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2 gap-2 flex-wrap">
                        <span className="text-sm">Cantidad: </span>
                        <Button
                            size={'sm'}
                            onClick={() => removeFromCart(item.productId, 1)}
                            className="bg-black text-white"
                        >
                            <CircleMinus />
                        </Button>
                        <span className="text-sm">{item.quantity}</span>
                        <Button
                            size={'sm'}
                            onClick={() => addToCart(item.productId, 1)}
                            className="bg-blue-500 text-white">
                            <PlusIcon />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex md:flex-col justify-between md:items-end items-start md:text-right text-left font-bold md:w-32 w-full">
                <div className="text-sm">
                    <span className="font-semibold text-black">Subtotal:</span><br />
                    $ {(item.price * item.quantity).toFixed(2)}
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:bg-red-100"
                    onClick={handleRemoveItem}>
                    <Trash2Icon className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
};

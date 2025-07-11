'use client';

import { useCartStore } from "@/stores/CartStore";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CartItemCard } from "@/components/Cart/CartItemCard";
import { useAuth } from "@/hooks/useAuth";

export const CartPage = () => {
    const { items: cart, totalPrice, fetchCart, createOrder, removeFromCart } = useCartStore();
    const { user } = useAuth();

    useEffect(() => {
        fetchCart();
    }, []);

    const handleCheckout = () => {
        if (!user) {
            alert("Debes iniciar sesión para realizar un pedido.");
            return;
        }
        if (cart.length === 0) {
            alert("El carrito está vacío. Agrega productos antes de realizar el pedido.");
            return;
        }
        createOrder()
            .then(() => {
                console.log("Pedido creado exitosamente");
                alert(`Pedido realizado exitosamente. Total a pagar: $${totalPrice}`);
            })
            .catch((error) => {
                console.error("Error al crear el pedido:", error);
                alert("Hubo un error al realizar el pedido. Inténtalo de nuevo más tarde.");
            });
    };

    const handleEmptyCart = async () => {
        await Promise.all(
            cart.map(item => removeFromCart(item.productId, item.quantity))
        );
        fetchCart();
    };

    return (
        <div className="bg-gray-100 min-h-screen py-10 px-4 md:px-10 pt-20">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">
                    {cart.map(item => (
                        <CartItemCard key={item.productId} item={item} />
                    ))}
                </h1>

                <div className="bg-white p-6 rounded shadow h-fit">
                    <h2 className="text-lg font-bold mb-4">Resumen de Compra</h2>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between font-bold text-lg border-t pt-2">
                            <span>TOTAL:</span>
                            <span>$ {totalPrice}</span>
                        </div>
                    </div>
                    <div className="mt-6 space-y-2">
                        {!user && (
                            <div className="text-red-600 font-semibold text-center mb-2">
                                Debes iniciar sesión para realizar un pedido.
                            </div>
                        )}
                        <Button
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                            onClick={handleCheckout}
                            disabled={!user}
                        >
                            Hacer Pedido
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={handleEmptyCart}
                        >
                            Vaciar Carrito
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
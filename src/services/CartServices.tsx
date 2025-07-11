import { ApiBackend } from "@/clients/axios";
import { ResponseAPI } from "@/interfaces/ResponseAPI";


export const CartService = {
    fetchCart: async () => {
        try {
            const response = await ApiBackend.get<ResponseAPI>('basket');
            console.log("Cart fetched successfully:", response.data);
            return response.data?.data;
        } catch (error) {
            console.error("Error fetching cart:", error);
            throw error;
        }
    },

    addToCart: async (productId: number, quantity: number) => {
        try {
            const response = await ApiBackend.post<ResponseAPI>('basket', null, {
                params: { productId, quantity }
            });
            console.log("Product added to cart successfully:", response.data);
            return response.data?.data;
        } catch (error) {
            console.error("Error adding to cart:", error);
            throw error;
        }
    },
    removeFromCart: async (productId: number, quantity: number) => {
        try {
            const response = await ApiBackend.delete<ResponseAPI>('basket', {
                params: { productId, quantity }
            });
            console.log("Product removed from cart successfully:", response.data);
            return response.data?.data;
        } catch (error) {
            console.error("Error removing from cart:", error);
            throw error;
        }
    },

    createOrder: async () => {
        try {
            const response = await ApiBackend.post<ResponseAPI>('order');
            console.log("Order created successfully:", response.data);
            return response.data?.data;
        } catch (error) {
            console.error("Error creating order:", error);
            throw error;
        }
    }
}
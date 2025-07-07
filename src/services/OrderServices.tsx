import { ApiBackend } from "@/clients/axios";
import { OrderFilters } from "@/interfaces/Orders/OrderFilters";
import { ResponseAPI } from "@/interfaces/ResponseAPI";

export const OrderService = {
  fetchOrders: async (filters?: OrderFilters) => {
    try {
      const response = await ApiBackend.get<ResponseAPI>('order', {
        params: filters,
      });
      return response.data?.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },
};
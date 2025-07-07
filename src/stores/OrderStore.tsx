import { create } from "zustand";
import { OrderService } from "@/services/OrderServices";
import { Order } from "@/interfaces/Orders/Order";
import { OrderFilters } from "@/interfaces/Orders/OrderFilters";

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  filters: OrderFilters;
  fetchOrders: (filters?: any) => Promise<void>;
  setFilters: (filters?: Partial<OrderFilters>) => void;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  loading: false,
  error: null,
  filters: {
    price: undefined,
    registeredFrom: undefined,
    registeredTo: undefined,
    orderBy: "dateDesc",
  },
  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const { filters } = get();
      const data = await OrderService.fetchOrders(filters);
      set({ orders: data || [], loading: false });
    } catch (error: any) {
      set({ loading: false, error: error.message || "Error al obtener órdenes" });
    }
  },
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
}));
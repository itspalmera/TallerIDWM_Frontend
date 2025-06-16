import { Product } from "@/interfaces/Products/Product";
import { ProductFilters } from "@/interfaces/Products/ProductFilters";
import { ProductServices } from "@/services/ProductServices";
import { create } from "zustand";


interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
    filters: ProductFilters;
    fetchProducts: () => Promise<void>;
    setFilters: (filters: Partial<ProductFilters>) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
    products: [],
    loading: false,
    error: null,
    filters: { pageNumber: 1, pageSize: 10, search: "", categories: undefined, brands: undefined, sortBy: undefined },
    fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
            const { filters } = get();
            const data = await ProductServices.fetchProducts(filters);
            console.log("Productos obtenidos:", data);
            set({ products: data, loading: false})
        } catch (error: any) {
            set({ loading: false, error: error.message || "Error al obtener los productos." });
        }
    },
    setFilters: (newFilters) => 
        set((state) => ({
            filters: { ...state.filters, ...newFilters }
        }))
}));

// TODO: Add the rest of the methods to manage the products, such as add, update, delete, etc.
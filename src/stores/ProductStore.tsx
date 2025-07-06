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
    addProduct: (formData: FormData) => Promise<void>;
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
            set({ products: data, loading: false })
        } catch (error: any) {
            set({ loading: false, error: error.message || "Error al obtener los productos." });
        }
    },
    setFilters: (newFilters) =>
        set((state) => ({
            filters: { ...state.filters, ...newFilters }
        })),
    addProduct: async (formData: FormData) => {
        try {
            await ProductServices.createProduct(formData);
            await get().fetchProducts();
        } catch (error: any) {
            console.error("Error al crear producto:", error);
            if (error.response) {
                console.error("Detalles del backend:", error.response.data);
            }
            throw new Error(error.message || "No se pudo crear el producto");
        }
    }
}));

// TODO: Add the rest of the methods to manage the products, such as update, delete, etc.
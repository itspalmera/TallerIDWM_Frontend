import { Product } from "@/interfaces/Products/Product";
import { ProductFilters } from "@/interfaces/Products/ProductFilters";
import { ProductServices } from "@/services/ProductServices";
import { PaginationMetaData } from "@/interfaces/PaginationMetaData"; // crea esta interfaz si no existe
import { create } from "zustand";

interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
    filters: ProductFilters;
    metadata: PaginationMetaData | null;
    fetchProducts: () => Promise<void>;
    setFilters: (filters: Partial<ProductFilters>) => void;
    addProduct: (formData: FormData) => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
    products: [],
    loading: false,
    error: null,
    filters: { pageNumber: 1, pageSize: 10, search: "", categories: undefined, brands: undefined, sortBy: undefined },
    metadata: null,
    fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
            const { filters } = get();
            const { products, metadata } = await ProductServices.fetchProducts(filters);
            set({ products, metadata, loading: false });
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
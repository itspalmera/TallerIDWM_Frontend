import { ApiBackend } from "@/clients/axios";
import { Product } from "@/interfaces/Products/Product";
import { ProductFilters } from "@/interfaces/Products/ProductFilters";
import { ResponseAPI } from "@/interfaces/ResponseAPI";

export const ProductServices = {
    async fetchProducts(filters: ProductFilters) {
        const { data } = await ApiBackend.get<ResponseAPI>("product", {
            params: { ...filters }
        });

        if (!data.success) {
            throw new Error(data.message || "Error al obtener los productos.");
        }

        if (!data.data || !Array.isArray(data.data)) {
            throw new Error("No se encontraron productos.");
        }

        if (data.errors) {
            console.error("Errors: ", data.errors)
        }

        return data.data as Product[];
    },
    async createProduct(formData: FormData) {
        const { data } = await ApiBackend.post<ResponseAPI>("product", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        if (!data.success) {
            throw new Error(data.message || "Error al crear el producto.");
        }

        if (data.errors) {
            console.error("Errors: ", data.errors)
        }

        return data.data;
    }
}
import { ApiBackend } from "@/clients/axios";
import { PaginationMetaData } from "@/interfaces/PaginationMetaData";
import { Product } from "@/interfaces/Products/Product";
import { ProductFilters } from "@/interfaces/Products/ProductFilters";
import { ResponseAPI } from "@/interfaces/ResponseAPI";

export const ProductServices = {
    async fetchProducts(filters: ProductFilters) {
        const response = await ApiBackend.get<ResponseAPI>("product", {
            params: { ...filters }
        });

        const data = response.data;
        console.log("Response Data:", data);
        const paginationHeader = response.headers['pagination'];
        console.log("Pagination Header:", paginationHeader);

        let metadata: PaginationMetaData | null = null;
        if (paginationHeader) {
            try {
                metadata = JSON.parse(paginationHeader);
            } catch (e) {
                console.error("Error parsing pagination header:", e);
            }
        }

        if (!data.success) {
            throw new Error(data.message || "Error al obtener los productos.");
        }

        if (!data.data || !Array.isArray(data.data)) {
            throw new Error("No se encontraron productos.");
        }

        if (data.errors) {
            console.error("Errors: ", data.errors)
        }

        return {
            products: data.data as Product[],
            metadata, 
        };
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
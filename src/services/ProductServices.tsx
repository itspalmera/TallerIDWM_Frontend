import { ApiBackend } from "@/clients/axios";
import { Product } from "@/interfaces/Products/Product";
import { ProductFilters } from "@/interfaces/Products/ProductFilters";
import { ProductListItem } from "@/interfaces/Products/ProductListItem";
import { ResponseAPI } from "@/interfaces/ResponseAPI";

export const ProductServices = {
  // === CLIENTE ===
  async fetchProducts(filters: ProductFilters): Promise<Product[]> {
    const { data } = await ApiBackend.get<ResponseAPI>("product", {
      params: { ...filters }
    });

    if (!data.success) {
      throw new Error(data.message || "Error al obtener los productos.");
    }

    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("No se encontraron productos.");
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

    return data.data;
  },

  // === ADMINISTRADOR ===

  async fetchAdminProducts(): Promise<ProductListItem[]> {
    const { data } = await ApiBackend.get<ResponseAPI>("product/admin");

    if (!data.success) {
      throw new Error(data.message || "Error al obtener productos (admin).");
    }

    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("No se encontraron productos.");
    }

    return data.data as ProductListItem[];
  },

  async getProductById(id: number): Promise<ProductListItem> {
    const { data } = await ApiBackend.get<ResponseAPI>(`product/${id}`);

    if (!data.success) {
      throw new Error(data.message || "Producto no encontrado.");
    }

    return data.data as ProductListItem;
  },

  async updateProduct(id: number, formData: FormData) {
    const { data } = await ApiBackend.put<ResponseAPI>(`product/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (!data.success) {
      throw new Error(data.message || "Error al actualizar el producto.");
    }

    return data.data;
  },

  async deleteProduct(id: number) {
    const { data } = await ApiBackend.delete<ResponseAPI>(`product/${id}`);

    if (!data.success) {
      throw new Error(data.message || "Error al eliminar producto.");
    }

    return data.data;
  },
};


export interface CreateProductDto {
    title: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    brand: string;
    condition: string;
    imageFile: unknown,
}
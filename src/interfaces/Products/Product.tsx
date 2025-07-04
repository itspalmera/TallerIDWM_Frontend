export interface Product {
    id: number;
    title: string;
    price: number;
    imageUrl: string[];
    description?: string;
    stock: number;
    category?: string;
    brand?: string;
}

export interface CartItem {
    productId: number;
    name: string;
    quantity: number;
    price: number;
    imageUrl: string;
    category: string;
    brand: string;
}

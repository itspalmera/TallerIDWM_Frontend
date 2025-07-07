export interface ProductListItem {
  id: number;
  title: string;
  price: number;
  stock: number;
  category: string;
  brand: string;
  condition: "nuevo" | "usado";
  createdAt: string;
  updatedAt?: string;
  isVisible: boolean;
}

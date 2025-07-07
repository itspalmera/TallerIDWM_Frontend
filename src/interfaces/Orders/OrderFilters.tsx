export interface OrderFilters {
  price?: number;
  registeredFrom?: string; // formato 'YYYY-MM-DD'
  registeredTo?: string;   // formato 'YYYY-MM-DD'
  orderBy?: "dateDesc" | "dateAsc" | "priceDesc" | "priceAsc";
}
export interface Direction {
  id: number;
  street: string;
  number: string;
  region: string;
  commune: string;
  postalCode: string;
  userId: string;
  // Puedes agregar más campos si necesitas detalles del usuario
}

export interface OrderItemDto {
  // Ajusta estos campos según tu modelo real de OrderItemDto
  id: number;
  name: string;
  imageUrl: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  createdAt: string; // ISO string, puedes usar Date si lo conviertes
  address: Direction;
  total: number;
  items: OrderItemDto[];
}
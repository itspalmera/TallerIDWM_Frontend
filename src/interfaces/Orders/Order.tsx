export interface Direction {
  id: number;
  street: string;
  number: string;
  region: string;
  commune: string;
  postalCode: string;
  userId: string;
}

export interface OrderItemDto {
  id: number;
  name: string;
  imageUrl: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  createdAt: string; 
  address: Direction;
  total: number;
  items: OrderItemDto[];
}
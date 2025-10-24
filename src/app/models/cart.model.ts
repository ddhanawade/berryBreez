import { Product } from './product.model';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedUnit?: string;
  addedAt: Date;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
}

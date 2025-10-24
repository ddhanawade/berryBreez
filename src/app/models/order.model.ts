import { CartItem } from './cart.model';
import { Address } from './user.model';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  deliveryAddress: Address;
  paymentMethod: 'cod' | 'card' | 'upi' | 'netbanking';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  orderStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  orderDate: Date;
  estimatedDelivery: Date;
  deliveredDate?: Date;
  trackingId?: string;
  notes?: string;
}

export interface OrderSummary {
  totalOrders: number;
  activeOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalSpent: number;
}

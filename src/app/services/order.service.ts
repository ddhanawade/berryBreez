import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Order, OrderSummary } from '../models/order.model';
import { Cart } from '../models/cart.model';
import { Address } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  orders$ = this.ordersSubject.asObservable();

  constructor() {
    this.loadOrdersFromStorage();
  }

  private loadOrdersFromStorage(): void {
    const savedOrders = localStorage.getItem('berrybreez_orders');
    if (savedOrders) {
      try {
        const orders = JSON.parse(savedOrders);
        this.ordersSubject.next(orders);
      } catch (error) {
        console.error('Error loading orders from storage:', error);
      }
    }
  }

  private saveOrdersToStorage(): void {
    const orders = this.ordersSubject.value;
    localStorage.setItem('berrybreez_orders', JSON.stringify(orders));
  }

  placeOrder(
    userId: string,
    cart: Cart,
    deliveryAddress: Address,
    paymentMethod: 'cod' | 'card' | 'upi' | 'netbanking'
  ): Observable<Order> {
    const newOrder: Order = {
      id: 'ORD' + Date.now(),
      userId,
      items: cart.items,
      deliveryAddress,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      orderStatus: 'pending',
      subtotal: cart.subtotal,
      discount: cart.discount,
      deliveryCharge: cart.deliveryCharge,
      total: cart.total,
      orderDate: new Date(),
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
      trackingId: 'TRK' + Date.now()
    };

    return of(newOrder).pipe(
      delay(1000),
      map(order => {
        const currentOrders = this.ordersSubject.value;
        this.ordersSubject.next([order, ...currentOrders]);
        this.saveOrdersToStorage();
        return order;
      })
    );
  }

  getOrders(userId: string): Observable<Order[]> {
    return this.orders$.pipe(
      map(orders => orders.filter(order => order.userId === userId))
    );
  }

  getOrderById(orderId: string): Observable<Order | undefined> {
    return this.orders$.pipe(
      map(orders => orders.find(order => order.id === orderId))
    );
  }

  getOrderSummary(userId: string): Observable<OrderSummary> {
    return this.orders$.pipe(
      map(orders => {
        const userOrders = orders.filter(order => order.userId === userId);
        return {
          totalOrders: userOrders.length,
          activeOrders: userOrders.filter(o => 
            ['pending', 'confirmed', 'processing', 'shipped'].includes(o.orderStatus)
          ).length,
          completedOrders: userOrders.filter(o => o.orderStatus === 'delivered').length,
          cancelledOrders: userOrders.filter(o => o.orderStatus === 'cancelled').length,
          totalSpent: userOrders
            .filter(o => o.orderStatus === 'delivered')
            .reduce((sum, order) => sum + order.total, 0)
        };
      })
    );
  }

  cancelOrder(orderId: string): Observable<boolean> {
    return of(true).pipe(
      delay(500),
      map(() => {
        const orders = this.ordersSubject.value;
        const updatedOrders = orders.map(order =>
          order.id === orderId
            ? { ...order, orderStatus: 'cancelled' as const }
            : order
        );
        this.ordersSubject.next(updatedOrders);
        this.saveOrdersToStorage();
        return true;
      })
    );
  }

  updateOrderStatus(orderId: string, status: Order['orderStatus']): void {
    const orders = this.ordersSubject.value;
    const updatedOrders = orders.map(order =>
      order.id === orderId
        ? { ...order, orderStatus: status }
        : order
    );
    this.ordersSubject.next(updatedOrders);
    this.saveOrdersToStorage();
  }
}

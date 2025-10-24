import { Injectable, signal, computed } from '@angular/core';
import { Cart, CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private readonly DELIVERY_THRESHOLD = 500;
  private readonly DELIVERY_CHARGE = 50;

  constructor() {
    this.loadCartFromStorage();
  }

  private loadCartFromStorage(): void {
    const savedCart = localStorage.getItem('berrybreez_cart');
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart);
        this.cartItemsSubject.next(items);
      } catch (error) {
        console.error('Error loading cart from storage:', error);
      }
    }
  }

  private saveCartToStorage(): void {
    const items = this.cartItemsSubject.value;
    localStorage.setItem('berrybreez_cart', JSON.stringify(items));
  }

  addToCart(product: Product, quantity: number = 1): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItemIndex = currentItems.findIndex(item => item.product.id === product.id);

    if (existingItemIndex > -1) {
      // Update quantity if item already exists
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex].quantity += quantity;
      this.cartItemsSubject.next(updatedItems);
    } else {
      // Add new item
      const newItem: CartItem = {
        product,
        quantity,
        addedAt: new Date()
      };
      this.cartItemsSubject.next([...currentItems, newItem]);
    }

    this.saveCartToStorage();
  }

  removeFromCart(productId: string): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.filter(item => item.product.id !== productId);
    this.cartItemsSubject.next(updatedItems);
    this.saveCartToStorage();
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.map(item =>
      item.product.id === productId
        ? { ...item, quantity }
        : item
    );
    this.cartItemsSubject.next(updatedItems);
    this.saveCartToStorage();
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    localStorage.removeItem('berrybreez_cart');
  }

  getCart(): Cart {
    const items = this.cartItemsSubject.value;
    const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const discount = items.reduce((sum, item) => {
      const itemDiscount = item.product.discount
        ? ((item.product.originalPrice || item.product.price) - item.product.price) * item.quantity
        : 0;
      return sum + itemDiscount;
    }, 0);
    const deliveryCharge = subtotal >= this.DELIVERY_THRESHOLD ? 0 : this.DELIVERY_CHARGE;
    const total = subtotal + deliveryCharge;
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      items,
      totalItems,
      subtotal,
      discount,
      deliveryCharge,
      total
    };
  }

  getCartItemCount(): number {
    const items = this.cartItemsSubject.value;
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }

  isInCart(productId: string): boolean {
    const items = this.cartItemsSubject.value;
    return items.some(item => item.product.id === productId);
  }

  getCartItem(productId: string): CartItem | undefined {
    const items = this.cartItemsSubject.value;
    return items.find(item => item.product.id === productId);
  }
}

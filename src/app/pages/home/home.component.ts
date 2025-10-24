import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  seasonalProducts: Product[] = [];
  activeBottomTab: string = 'home';
  categories = [
    { name: 'Seasonal Berries', icon: '🍓', route: '/products?category=Fruits' },
    { name: 'Fresh Vegetables', icon: '🥬', route: '/products?category=Vegetables' },
    { name: 'Organic Groceries', icon: '🌾', route: '/products?category=Groceries' },
    { name: 'Nursery Plants', icon: '🌱', route: '/products?category=Plants' }
  ];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getFeaturedProducts(4).subscribe(products => {
      this.featuredProducts = products;
    });

    this.productService.getSeasonalProducts().subscribe(products => {
      this.seasonalProducts = products.slice(0, 4);
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  setBottomTab(tab: string): void {
    this.activeBottomTab = tab;
  }
}

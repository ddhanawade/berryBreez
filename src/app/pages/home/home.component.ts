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
    { 
      name: 'Seasonal Berries', 
      icon: '🍓', 
      route: '/products?category=Fruits',
      image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=300&fit=crop',
      description: 'Fresh strawberries, blueberries & more',
      count: 45
    },
    { 
      name: 'Fresh Vegetables', 
      icon: '🥬', 
      route: '/products?category=Vegetables',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop',
      description: 'Farm-fresh organic vegetables',
      count: 120
    },
    { 
      name: 'Organic Groceries', 
      icon: '🌾', 
      route: '/products?category=Groceries',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
      description: 'Healthy organic grocery items',
      count: 85
    },
    { 
      name: 'Nursery Plants', 
      icon: '🌱', 
      route: '/products?category=Plants',
      image: 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=400&h=300&fit=crop',
      description: 'Beautiful plants for your garden',
      count: 60
    }
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

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  selectedImage: string = '';
  quantity: number = 1;
  selectedTab: 'description' | 'nutrition' | 'reviews' = 'description';
  relatedProducts: Product[] = [];
  isLoading: boolean = true;

  // Mock product data (replace with actual service call)
  mockProduct: Product = {
    id: '1',
    name: 'Fresh Strawberries',
    description: 'Premium quality fresh strawberries handpicked from the lush farms of Mahabaleshwar. These juicy, sweet berries are perfect for desserts, smoothies, or enjoying fresh. Rich in vitamin C and antioxidants, our strawberries are grown using sustainable farming practices.',
    price: 250,
    originalPrice: 350,
    discount: 29,
    category: 'Fruits',
    subCategory: 'Berries',
    brand: 'Farm Fresh',
    images: [
      'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800',
      'https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=800',
      'https://images.unsplash.com/photo-1543528176-61b239494933?w=800'
    ],
    inStock: true,
    stockQuantity: 50,
    unit: 'kg',
    rating: 4.7,
    reviewCount: 123,
    tags: ['Fresh', 'Organic', 'Seasonal', 'Premium'],
    isSeasonal: true,
    isOrganic: true,
    isFresh: true,
    isFeatured: true,
    shelfLife: '3-4 days when refrigerated',
    farmerName: 'Ramesh Patil',
    origin: 'Mahabaleshwar',
    nutritionInfo: {
      calories: 32,
      protein: '0.7g',
      carbs: '7.7g',
      fat: '0.3g',
      fiber: '2g'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    // Simulate loading
    setTimeout(() => {
      this.product = this.mockProduct;
      this.selectedImage = this.product.images[0];
      this.loadRelatedProducts();
      this.isLoading = false;
    }, 500);
  }

  loadRelatedProducts(): void {
    // Mock related products
    this.relatedProducts = [
      { ...this.mockProduct, id: '2', name: 'Golden Berries', price: 320 },
      { ...this.mockProduct, id: '3', name: 'Blueberries', price: 450 },
      { ...this.mockProduct, id: '4', name: 'Raspberries', price: 380 }
    ];
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  incrementQuantity(): void {
    if (this.product && this.quantity < this.product.stockQuantity) {
      this.quantity++;
    }
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
      this.toastService.success(`Added ${this.quantity} ${this.product.unit} of ${this.product.name} to cart!`);
    }
  }

  buyNow(): void {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
      this.toastService.success('Product added to cart!');
      this.router.navigate(['/cart']);
    }
  }

  selectTab(tab: 'description' | 'nutrition' | 'reviews'): void {
    this.selectedTab = tab;
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}

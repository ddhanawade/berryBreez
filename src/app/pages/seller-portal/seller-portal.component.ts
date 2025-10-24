import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/product.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-seller-portal',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './seller-portal.component.html',
  styleUrl: './seller-portal.component.scss'
})
export class SellerPortalComponent implements OnInit {
  user: User | null = null;
  myProducts: Product[] = [];
  activeTab: 'add' | 'manage' = 'add';
  activeBottomTab: string = 'home';
  isEditMode: boolean = false;
  editingProductId: string | null = null;

  // Product form
  productForm = {
    name: '',
    description: '',
    category: 'Fruits',
    price: 0,
    originalPrice: 0,
    unit: 'kg',
    stockQuantity: 0,
    inStock: true,
    images: [''],
    rating: 5.0,
    reviewCount: 0,
    discount: 0,
    isOrganic: false,
    isSeasonal: false,
    isFresh: true,
    isFeatured: false,
    shelfLife: '',
    brand: '',
    tags: [] as string[],
    nutritionInfo: {
      calories: 0,
      protein: '0g',
      carbs: '0g',
      fat: '0g',
      fiber: '0g'
    },
    origin: 'Mahabaleshwar'
  };

  categories = ['Fruits', 'Vegetables', 'Groceries', 'Plants', 'Dairy', 'Bakery', 'Beverages'];
  units = ['kg', 'gram', 'liter', 'ml', 'piece', 'dozen', 'pack', 'bottle'];
  tagInput: string = '';

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
      if (user) {
        this.loadMyProducts();
      }
    });
  }

  loadMyProducts(): void {
    if (this.user) {
      this.productService.getAllProducts().subscribe((products: Product[]) => {
        // Filter products by seller (in real app, would filter by user.id)
        this.myProducts = products.slice(0, 5); // Mock: show first 5 as user's products
      });
    }
  }

  setTab(tab: 'add' | 'manage'): void {
    this.activeTab = tab;
    if (tab === 'add') {
      this.resetForm();
    }
  }

  setBottomTab(tab: string): void {
    this.activeBottomTab = tab;
  }

  addTag(): void {
    if (this.tagInput.trim() && !this.productForm.tags.includes(this.tagInput.trim())) {
      this.productForm.tags.push(this.tagInput.trim());
      this.tagInput = '';
    }
  }

  removeTag(tag: string): void {
    this.productForm.tags = this.productForm.tags.filter(t => t !== tag);
  }

  addImageUrl(): void {
    this.productForm.images.push('');
  }

  removeImageUrl(index: number): void {
    if (this.productForm.images.length > 1) {
      this.productForm.images.splice(index, 1);
    }
  }

  calculateDiscount(): void {
    if (this.productForm.originalPrice > 0 && this.productForm.price > 0) {
      const discount = ((this.productForm.originalPrice - this.productForm.price) / this.productForm.originalPrice) * 100;
      this.productForm.discount = Math.round(discount);
    }
  }

  submitProduct(): void {
    if (!this.validateForm()) {
      alert('Please fill all required fields');
      return;
    }

    // Mock: In real app, would call API to add/update product
    alert(this.isEditMode ? 'Product updated successfully!' : 'Product added successfully!');
    if (this.isEditMode) {
      this.setTab('manage');
    }
    this.resetForm();
  }

  editProduct(product: Product): void {
    this.isEditMode = true;
    this.editingProductId = product.id;
    this.productForm = {
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice || product.price,
      unit: product.unit,
      stockQuantity: product.stockQuantity,
      inStock: product.inStock,
      images: [...product.images],
      rating: product.rating,
      reviewCount: product.reviewCount,
      discount: product.discount || 0,
      isOrganic: product.isOrganic,
      isSeasonal: product.isSeasonal,
      isFresh: product.isFresh,
      isFeatured: product.isFeatured || false,
      shelfLife: product.shelfLife || '',
      brand: product.brand || '',
      tags: product.tags || [],
      nutritionInfo: product.nutritionInfo || {
        calories: 0,
        protein: '0g',
        carbs: '0g',
        fat: '0g',
        fiber: '0g'
      },
      origin: product.origin || 'Mahabaleshwar'
    };
    this.setTab('add');
  }

  deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      // Mock: In real app, would call API to delete product
      this.myProducts = this.myProducts.filter(p => p.id !== productId);
      alert('Product deleted successfully!');
    }
  }

  toggleProductStatus(product: Product): void {
    // Mock: In real app, would call API to update product status
    const index = this.myProducts.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.myProducts[index].inStock = !this.myProducts[index].inStock;
      this.myProducts[index].stockQuantity = this.myProducts[index].inStock ? 10 : 0;
    }
  }

  validateForm(): boolean {
    return (
      this.productForm.name.trim() !== '' &&
      this.productForm.description.trim() !== '' &&
      this.productForm.price > 0 &&
      this.productForm.stockQuantity >= 0 &&
      this.productForm.images.some(img => img.trim() !== '')
    );
  }

  resetForm(): void {
    this.isEditMode = false;
    this.editingProductId = null;
    this.productForm = {
      name: '',
      description: '',
      category: 'Fruits',
      price: 0,
      originalPrice: 0,
      unit: 'kg',
      stockQuantity: 0,
      inStock: true,
      images: [''],
      rating: 5.0,
      reviewCount: 0,
      discount: 0,
      isOrganic: false,
      isSeasonal: false,
      isFresh: true,
      isFeatured: false,
      shelfLife: '',
      brand: '',
      tags: [],
      nutritionInfo: {
        calories: 0,
        protein: '0g',
        carbs: '0g',
        fat: '0g',
        fiber: '0g'
      },
      origin: 'Mahabaleshwar'
    };
    this.tagInput = '';
  }
}

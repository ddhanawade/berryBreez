import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product, ProductFilter } from '../../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  brands: string[] = [];
  
  // Filter state
  selectedCategory: string = '';
  selectedBrand: string = '';
  searchQuery: string = '';
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'popular' = 'popular';
  showOnlyOrganic: boolean = false;
  showOnlySeasonal: boolean = false;
  minPrice: number = 0;
  maxPrice: number = 1000;
  
  // UI state
  isLoading: boolean = true;
  viewMode: 'grid' | 'list' = 'grid';
  showMobileFilters: boolean = false;
  activeBottomTab: string = 'products';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get query params
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
      }
      if (params['search']) {
        this.searchQuery = params['search'];
      }
    });

    // Load products
    this.loadProducts();
    
    // Load categories and brands
    this.categories = this.productService.getCategories();
    this.brands = this.productService.getBrands();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
      this.applyFilters();
      this.isLoading = false;
    });
  }

  applyFilters(): void {
    const filter: ProductFilter = {
      category: this.selectedCategory || undefined,
      brand: this.selectedBrand || undefined,
      searchQuery: this.searchQuery || undefined,
      isOrganic: this.showOnlyOrganic || undefined,
      isSeasonal: this.showOnlySeasonal || undefined,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      sortBy: this.sortBy,
      inStock: true
    };

    this.productService.getFilteredProducts(filter).subscribe(products => {
      this.filteredProducts = products;
    });
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = this.selectedCategory === category ? '' : category;
    this.applyFilters();
  }

  onBrandChange(brand: string): void {
    this.selectedBrand = this.selectedBrand === brand ? '' : brand;
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.selectedCategory = '';
    this.selectedBrand = '';
    this.searchQuery = '';
    this.showOnlyOrganic = false;
    this.showOnlySeasonal = false;
    this.minPrice = 0;
    this.maxPrice = 1000;
    this.sortBy = 'popular';
    this.applyFilters();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    // You could add a toast notification here
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
  }

  toggleMobileFilters(): void {
    this.showMobileFilters = !this.showMobileFilters;
  }

  closeMobileFilters(): void {
    this.showMobileFilters = false;
  }

  setBottomTab(tab: string): void {
    this.activeBottomTab = tab;
  }
}

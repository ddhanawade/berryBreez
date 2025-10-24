import { Injectable, signal } from '@angular/core';
import { Product, ProductFilter } from '../models/product.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor() {
    this.loadMockProducts();
  }

  private loadMockProducts(): void {
    const mockProducts: Product[] = [
      // Seasonal Fruits from Mahabaleshwar
      {
        id: '1',
        name: 'Fresh Strawberries',
        description: 'Premium quality strawberries directly from Mahabaleshwar farms. Sweet, juicy and pesticide-free.',
        price: 250,
        originalPrice: 300,
        discount: 17,
        category: 'Fruits',
        subCategory: 'Seasonal Berries',
        brand: 'Farm Fresh',
        images: ['https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500', 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=500'],
        inStock: true,
        stockQuantity: 50,
        unit: 'kg',
        rating: 4.8,
        reviewCount: 245,
        tags: ['seasonal', 'fresh', 'organic', 'popular'],
        isSeasonal: true,
        isOrganic: true,
        isFresh: true,
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
      },
      {
        id: '2',
        name: 'Mulberries',
        description: 'Fresh mulberries from the hills of Mahabaleshwar. Rich in antioxidants and vitamins.',
        price: 180,
        originalPrice: 220,
        discount: 18,
        category: 'Fruits',
        subCategory: 'Seasonal Berries',
        images: ['https://images.unsplash.com/photo-1590004953392-5aba2e72269a?w=500'],
        inStock: true,
        stockQuantity: 30,
        unit: 'kg',
        rating: 4.6,
        reviewCount: 128,
        tags: ['seasonal', 'fresh', 'organic'],
        isSeasonal: true,
        isOrganic: true,
        isFresh: true,
        farmerName: 'Suresh Jadhav',
        origin: 'Mahabaleshwar',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        name: 'Golden Berries',
        description: 'Exotic golden berries with a unique sweet-tart flavor. Packed with nutrients.',
        price: 320,
        originalPrice: 400,
        discount: 20,
        category: 'Fruits',
        subCategory: 'Seasonal Berries',
        images: ['https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=500'],
        inStock: true,
        stockQuantity: 20,
        unit: 'kg',
        rating: 4.7,
        reviewCount: 89,
        tags: ['seasonal', 'exotic', 'organic'],
        isSeasonal: true,
        isOrganic: true,
        isFresh: true,
        farmerName: 'Prakash Desai',
        origin: 'Mahabaleshwar',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '4',
        name: 'Raspberries',
        description: 'Delicate and flavorful raspberries from Mahabaleshwar. Perfect for desserts and smoothies.',
        price: 380,
        originalPrice: 450,
        discount: 16,
        category: 'Fruits',
        subCategory: 'Seasonal Berries',
        images: ['https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?w=500'],
        inStock: true,
        stockQuantity: 15,
        unit: 'kg',
        rating: 4.9,
        reviewCount: 156,
        tags: ['seasonal', 'premium', 'organic'],
        isSeasonal: true,
        isOrganic: true,
        isFresh: true,
        farmerName: 'Vijay Shinde',
        origin: 'Mahabaleshwar',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '5',
        name: 'Alphonso Mangoes',
        description: 'King of mangoes! Premium Alphonso mangoes from Konkan region via Mahabaleshwar.',
        price: 450,
        originalPrice: 550,
        discount: 18,
        category: 'Fruits',
        subCategory: 'Seasonal Fruits',
        images: ['https://images.unsplash.com/photo-1553279768-865429fa0078?w=500'],
        inStock: true,
        stockQuantity: 40,
        unit: 'dozen',
        rating: 5.0,
        reviewCount: 389,
        tags: ['seasonal', 'premium', 'popular'],
        isSeasonal: true,
        isOrganic: false,
        isFresh: true,
        farmerName: 'Ganesh Kulkarni',
        origin: 'Mahabaleshwar',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Mapro Products
      {
        id: '6',
        name: 'Mapro Strawberry Crush',
        description: 'Authentic Mapro strawberry crush made from fresh Mahabaleshwar strawberries.',
        price: 180,
        category: 'Processed Foods',
        subCategory: 'Jams & Crushes',
        brand: 'Mapro',
        images: ['https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=500'],
        inStock: true,
        stockQuantity: 100,
        unit: 'bottle',
        rating: 4.7,
        reviewCount: 567,
        tags: ['mapro', 'popular', 'authentic'],
        isSeasonal: false,
        isOrganic: false,
        isFresh: false,
        origin: 'Mahabaleshwar',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '7',
        name: 'Mapro Mixed Fruit Jam',
        description: 'Delicious mixed fruit jam from Mapro. Perfect for breakfast.',
        price: 150,
        category: 'Processed Foods',
        subCategory: 'Jams & Crushes',
        brand: 'Mapro',
        images: ['https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500'],
        inStock: true,
        stockQuantity: 80,
        unit: 'jar',
        rating: 4.6,
        reviewCount: 423,
        tags: ['mapro', 'breakfast'],
        isSeasonal: false,
        isOrganic: false,
        isFresh: false,
        origin: 'Mahabaleshwar',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Malas Products
      {
        id: '8',
        name: 'Malas Strawberry Jam',
        description: 'Premium quality strawberry jam from Malas brand.',
        price: 160,
        category: 'Processed Foods',
        subCategory: 'Jams & Crushes',
        brand: 'Malas',
        images: ['https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=500'],
        inStock: true,
        stockQuantity: 60,
        unit: 'jar',
        rating: 4.5,
        reviewCount: 234,
        tags: ['malas', 'premium'],
        isSeasonal: false,
        isOrganic: false,
        isFresh: false,
        origin: 'Mahabaleshwar',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Fresh Vegetables
      {
        id: '9',
        name: 'Fresh Tomatoes',
        description: 'Farm-fresh tomatoes from Mahabaleshwar. Juicy and flavorful.',
        price: 40,
        category: 'Vegetables',
        subCategory: 'Fresh Vegetables',
        images: ['https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=500'],
        inStock: true,
        stockQuantity: 200,
        unit: 'kg',
        rating: 4.4,
        reviewCount: 189,
        tags: ['fresh', 'organic', 'daily-use'],
        isSeasonal: false,
        isOrganic: true,
        isFresh: true,
        farmerName: 'Santosh Pawar',
        origin: 'Mahabaleshwar',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '10',
        name: 'Fresh Carrots',
        description: 'Crunchy and sweet carrots from local farms.',
        price: 50,
        category: 'Vegetables',
        subCategory: 'Fresh Vegetables',
        images: ['https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500'],
        inStock: true,
        stockQuantity: 150,
        unit: 'kg',
        rating: 4.5,
        reviewCount: 145,
        tags: ['fresh', 'organic'],
        isSeasonal: false,
        isOrganic: true,
        isFresh: true,
        farmerName: 'Rajesh More',
        origin: 'Mahabaleshwar',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Nursery Plants
      {
        id: '11',
        name: 'Strawberry Plant',
        description: 'Healthy strawberry plants for your home garden. Includes planting instructions.',
        price: 120,
        category: 'Plants',
        subCategory: 'Fruit Plants',
        images: ['https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=500'],
        inStock: true,
        stockQuantity: 50,
        unit: 'plant',
        rating: 4.6,
        reviewCount: 78,
        tags: ['plants', 'gardening', 'home-garden'],
        isSeasonal: false,
        isOrganic: true,
        isFresh: false,
        origin: 'Mahabaleshwar',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '12',
        name: 'Rose Plant',
        description: 'Beautiful rose plants in various colors. Perfect for your garden.',
        price: 150,
        category: 'Plants',
        subCategory: 'Flowering Plants',
        images: ['https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500'],
        inStock: true,
        stockQuantity: 80,
        unit: 'plant',
        rating: 4.7,
        reviewCount: 123,
        tags: ['plants', 'flowering', 'decorative'],
        isSeasonal: false,
        isOrganic: true,
        isFresh: false,
        origin: 'Mahabaleshwar',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Groceries
      {
        id: '13',
        name: 'Organic Rice',
        description: 'Premium quality organic rice. Chemical-free and healthy.',
        price: 80,
        category: 'Groceries',
        subCategory: 'Grains',
        images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500'],
        inStock: true,
        stockQuantity: 300,
        unit: 'kg',
        rating: 4.6,
        reviewCount: 456,
        tags: ['organic', 'staple', 'healthy'],
        isSeasonal: false,
        isOrganic: true,
        isFresh: false,
        origin: 'Mahabaleshwar',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '14',
        name: 'Organic Pulses Mix',
        description: 'Nutritious mix of organic pulses. Rich in protein.',
        price: 120,
        category: 'Groceries',
        subCategory: 'Pulses',
        images: ['https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=500'],
        inStock: true,
        stockQuantity: 200,
        unit: 'kg',
        rating: 4.5,
        reviewCount: 289,
        tags: ['organic', 'protein', 'healthy'],
        isSeasonal: false,
        isOrganic: true,
        isFresh: false,
        origin: 'Mahabaleshwar',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '15',
        name: 'Honey (Pure)',
        description: 'Pure honey from Mahabaleshwar hills. Natural and unprocessed.',
        price: 280,
        category: 'Groceries',
        subCategory: 'Natural Products',
        brand: 'Madhusagar',
        images: ['https://images.unsplash.com/photo-1587049352846-4a222e784acc?w=500'],
        inStock: true,
        stockQuantity: 100,
        unit: 'bottle',
        rating: 4.8,
        reviewCount: 345,
        tags: ['natural', 'pure', 'healthy'],
        isSeasonal: false,
        isOrganic: true,
        isFresh: false,
        origin: 'Mahabaleshwar',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    this.productsSubject.next(mockProducts);
  }

  getAllProducts(): Observable<Product[]> {
    return this.products$;
  }

  getProductById(id: string): Observable<Product | undefined> {
    return this.products$.pipe(
      map(products => products.find(p => p.id === id))
    );
  }

  getFilteredProducts(filter: ProductFilter): Observable<Product[]> {
    return this.products$.pipe(
      map(products => {
        let filtered = [...products];

        if (filter.category) {
          filtered = filtered.filter(p => p.category === filter.category);
        }

        if (filter.subCategory) {
          filtered = filtered.filter(p => p.subCategory === filter.subCategory);
        }

        if (filter.brand) {
          filtered = filtered.filter(p => p.brand === filter.brand);
        }

        if (filter.minPrice !== undefined) {
          filtered = filtered.filter(p => p.price >= filter.minPrice!);
        }

        if (filter.maxPrice !== undefined) {
          filtered = filtered.filter(p => p.price <= filter.maxPrice!);
        }

        if (filter.isOrganic !== undefined) {
          filtered = filtered.filter(p => p.isOrganic === filter.isOrganic);
        }

        if (filter.isSeasonal !== undefined) {
          filtered = filtered.filter(p => p.isSeasonal === filter.isSeasonal);
        }

        if (filter.inStock !== undefined) {
          filtered = filtered.filter(p => p.inStock === filter.inStock);
        }

        if (filter.searchQuery) {
          const query = filter.searchQuery.toLowerCase();
          filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.tags.some(tag => tag.toLowerCase().includes(query))
          );
        }

        // Sorting
        if (filter.sortBy) {
          switch (filter.sortBy) {
            case 'price-asc':
              filtered.sort((a, b) => a.price - b.price);
              break;
            case 'price-desc':
              filtered.sort((a, b) => b.price - a.price);
              break;
            case 'rating':
              filtered.sort((a, b) => b.rating - a.rating);
              break;
            case 'newest':
              filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
              break;
            case 'popular':
              filtered.sort((a, b) => b.reviewCount - a.reviewCount);
              break;
          }
        }

        return filtered;
      })
    );
  }

  getCategories(): string[] {
    const products = this.productsSubject.value;
    return [...new Set(products.map(p => p.category))];
  }

  getBrands(): string[] {
    const products = this.productsSubject.value;
    return [...new Set(products.map(p => p.brand).filter(b => b !== undefined))] as string[];
  }

  getFeaturedProducts(limit: number = 8): Observable<Product[]> {
    return this.products$.pipe(
      map(products => products
        .filter(p => p.rating >= 4.5)
        .slice(0, limit)
      )
    );
  }

  getSeasonalProducts(): Observable<Product[]> {
    return this.products$.pipe(
      map(products => products.filter(p => p.isSeasonal))
    );
  }

  searchProducts(query: string): Observable<Product[]> {
    return this.getFilteredProducts({ searchQuery: query });
  }
}

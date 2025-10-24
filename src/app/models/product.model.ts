export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  subCategory?: string;
  brand?: string;
  images: string[];
  inStock: boolean;
  stockQuantity: number;
  unit: string; // kg, piece, dozen, etc.
  rating: number;
  reviewCount: number;
  tags: string[];
  isSeasonal: boolean;
  isOrganic: boolean;
  isFresh: boolean;
  isFeatured?: boolean;
  shelfLife?: string;
  farmerId?: string;
  farmerName?: string;
  origin: string; // Mahabaleshwar
  nutritionInfo?: NutritionInfo;
  createdAt: Date;
  updatedAt: Date;
}

export interface NutritionInfo {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  fiber: string;
}

export interface ProductFilter {
  category?: string;
  subCategory?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  isOrganic?: boolean;
  isSeasonal?: boolean;
  inStock?: boolean;
  searchQuery?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'popular';
}

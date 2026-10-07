export type MoodCategory = 'ishq' | 'dard' | 'josh' | 'zindagi' | 'sufi';

export type ProductPlatform = 'Amazon' | 'Bookshop.org' | 'Barnes & Noble' | 'Artisan Direct' | 'Curated Partner';

export type ProductCategory = 'book' | 'stationery' | 'fragrance' | 'lifestyle' | 'decor';

export interface AffiliateProduct {
  id: string;
  title: string;
  subtitle: string;
  category: ProductCategory;
  influencerHook: string; // The "catch people" pitch explaining why this product connects to the poetry
  price: string;
  originalPrice?: string;
  discountPercent?: string;
  couponCode?: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  affiliateUrl: string;
  affiliatePlatform: ProductPlatform;
  badge: string;
  features: string[];
}

export interface SherItem {
  id: string;
  date: string;
  urdu: string;
  hindi: string;
  english: string;
  poet: string;
  category: MoodCategory;
  moodTitle: string;
  isFeaturedToday?: boolean;
  likesCount: number;
  sharesCount: number;
  pairedProduct: AffiliateProduct;
}

export interface FilterState {
  category: 'all' | MoodCategory;
  searchQuery: string;
  onlyBookPairs: boolean;
}

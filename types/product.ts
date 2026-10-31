export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductDetail {
  id: string;
  title: string;
  category: string;
  rating: number;
  ratingCount: number;
  price: number;
  originalPrice?: number;
  discount?: string;
  description: string;
  colors: ProductColor[];
  sizes: string[];
  images: string[];
  breadcrumbs: { label: string; href?: string }[];
}

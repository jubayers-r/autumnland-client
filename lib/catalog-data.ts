export interface CatalogProduct {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  category: "T-shirts" | "Shorts" | "Shirts" | "Hoodie" | "Jeans";
  dressStyle: "Casual" | "Formal" | "Party" | "Gym";
  dressStyles: ("Casual" | "Formal" | "Party" | "Gym")[];
  rating: number;
  ratingCount?: number;
  price: number;
  originalPrice?: number;
  discount?: string;
  colors: string[]; // e.g. ["White", "Yellow", "Cyan", "Pink"]
  sizes: string[]; // e.g. ["Small", "Medium", "Large"]
  salesCount: number; // For "Most Popular" sorting (total units sold)
  popularity: number; // Backward compatibility alias
  createdDate: string; // ISO date for "Newest" sorting
  href: string;
}

export const FILTER_CATEGORIES = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"] as const;

export const FILTER_DRESS_STYLES = ["Casual", "Formal", "Party", "Gym"] as const;

export interface FilterColorOption {
  name: string;
  hex: string;
  border?: boolean;
}

export const FILTER_COLORS: FilterColorOption[] = [
  { name: "Green", hex: "#00C12B" },
  { name: "Red", hex: "#F50606" },
  { name: "Yellow", hex: "#F5DD06" },
  { name: "Orange", hex: "#F57906" },
  { name: "Cyan", hex: "#06CAF5" },
  { name: "Blue", hex: "#063AF5" },
  { name: "Purple", hex: "#7D06F5" },
  { name: "Pink", hex: "#F506A4" },
  { name: "White", hex: "#FFFFFF", border: true },
  { name: "Black", hex: "#000000" },
];

export const FILTER_SIZES = [
  "XX-Small",
  "X-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
  "3X-Large",
  "4X-Large",
] as const;

/**
 * Curated catalog dataset containing strictly unique, non-repeated product images.
 * Page 1 of "Casual" displays the exact 9 items from the design specification when sorted by Most Popular.
 */
export const CATALOG_PRODUCTS: CatalogProduct[] = [
  // 1. Gradient Graphic T-shirt (Image 1, Row 1, Col 1)
  {
    id: "gradient-graphic-t-shirt",
    title: "Gradient Graphic T-shirt",
    imageSrc: "/assets/t-shirt/image 2.png",
    imageAlt: "White crewneck t-shirt with vibrant swirl gradient graphic artwork",
    category: "T-shirts",
    dressStyle: "Casual",
    dressStyles: ["Casual", "Party"],
    rating: 3.5,
    ratingCount: 38,
    price: 145,
    colors: ["White", "Yellow", "Cyan", "Pink"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    salesCount: 2500,
    popularity: 98,
    createdDate: "2026-01-10",
    href: "/shop/product/gradient-graphic-t-shirt",
  },
  // 2. Polo with Tipping Details (Image 1, Row 1, Col 2)
  {
    id: "polo-tipping-details",
    title: "Polo with Tipping Details",
    imageSrc: "/assets/t-shirt/image 3.png",
    imageAlt: "Mauve pink textured polo shirt with white tipping collar details",
    category: "T-shirts",
    dressStyle: "Casual",
    dressStyles: ["Casual", "Formal"],
    rating: 4.5,
    ratingCount: 42,
    price: 180,
    colors: ["Pink", "Purple", "White"],
    sizes: ["Small", "Medium", "Large"],
    salesCount: 2400,
    popularity: 95,
    createdDate: "2026-01-20",
    href: "/shop/product/polo-tipping-details",
  },
  // 3. Black Striped T-shirt (Image 1, Row 1, Col 3)
  {
    id: "black-striped-t-shirt",
    title: "Black Striped T-shirt",
    imageSrc: "/assets/t-shirt/image 4.png",
    imageAlt: "White t-shirt with thin black vertical stripes and black raglan sleeves",
    category: "T-shirts",
    dressStyle: "Casual",
    dressStyles: ["Casual", "Party", "Gym"],
    rating: 5.0,
    ratingCount: 56,
    price: 120,
    originalPrice: 150,
    discount: "-30%",
    colors: ["White", "Black"],
    sizes: ["Medium", "Large", "X-Large"],
    salesCount: 2350,
    popularity: 94,
    createdDate: "2026-02-05",
    href: "/shop/product/black-striped-t-shirt",
  },
  // 4. Skinny Fit Jeans (Image 1, Row 2, Col 1)
  {
    id: "skinny-fit-jeans",
    title: "Skinny Fit Jeans",
    imageSrc: "/assets/t-shirt/image 8.png",
    imageAlt: "Classic medium wash blue skinny fit denim jeans",
    category: "Jeans",
    dressStyle: "Casual",
    dressStyles: ["Casual", "Party"],
    rating: 3.5,
    ratingCount: 30,
    price: 240,
    originalPrice: 260,
    discount: "-20%",
    colors: ["Blue"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    salesCount: 2200,
    popularity: 91,
    createdDate: "2026-02-15",
    href: "/shop/product/skinny-fit-jeans",
  },
  // 5. Checkered Shirt (Image 1, Row 2, Col 2)
  {
    id: "checkered-shirt",
    title: "Checkered Shirt",
    imageSrc: "/assets/t-shirt/image 9.png",
    imageAlt: "Navy and red checkered casual long-sleeve button-up shirt",
    category: "Shirts",
    dressStyle: "Casual",
    dressStyles: ["Casual", "Formal"],
    rating: 4.5,
    ratingCount: 48,
    price: 180,
    colors: ["Red", "Blue", "Black"],
    sizes: ["Medium", "Large", "XX-Large"],
    salesCount: 2100,
    popularity: 89,
    createdDate: "2026-02-25",
    href: "/shop/product/checkered-shirt",
  },
  // 6. Sleeve Striped T-shirt (Image 1, Row 2, Col 3)
  {
    id: "sleeve-striped-t-shirt",
    title: "Sleeve Striped T-shirt",
    imageSrc: "/assets/t-shirt/image 10.png",
    imageAlt: "Orange vertical striped t-shirt with black raglan sleeves",
    category: "T-shirts",
    dressStyle: "Casual",
    dressStyles: ["Casual", "Gym"],
    rating: 4.5,
    ratingCount: 35,
    price: 130,
    originalPrice: 160,
    discount: "-30%",
    colors: ["Orange", "Black"],
    sizes: ["Small", "Medium", "Large"],
    salesCount: 1950,
    popularity: 87,
    createdDate: "2026-03-01",
    href: "/shop/product/sleeve-striped-t-shirt",
  },
  // 7. Vertical Striped Shirt (Image 1, Row 3, Col 1)
  {
    id: "vertical-striped-shirt",
    title: "Vertical Striped Shirt",
    imageSrc: "/assets/t-shirt/image 7-1.png",
    imageAlt: "Green and white vertical striped casual button-down shirt",
    category: "Shirts",
    dressStyle: "Casual",
    dressStyles: ["Casual", "Formal"],
    rating: 5.0,
    ratingCount: 62,
    price: 212,
    originalPrice: 232,
    discount: "-20%",
    colors: ["Green", "White"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    salesCount: 1900,
    popularity: 85,
    createdDate: "2026-03-10",
    href: "/shop/product/vertical-striped-shirt",
  },
  // 8. Courage Graphic T-shirt (Image 1, Row 3, Col 2)
  {
    id: "courage-graphic-t-shirt",
    title: "Courage Graphic T-shirt",
    imageSrc: "/assets/t-shirt/image 8-1.png",
    imageAlt: "Orange t-shirt with Courage graphic typography print",
    category: "T-shirts",
    dressStyle: "Casual",
    dressStyles: ["Casual", "Party"],
    rating: 4.0,
    ratingCount: 29,
    price: 145,
    colors: ["Orange", "Blue"],
    sizes: ["Large", "X-Large", "XX-Large"],
    salesCount: 1850,
    popularity: 84,
    createdDate: "2026-03-15",
    href: "/shop/product/courage-graphic-t-shirt",
  },
  // 9. Loose Fit Bermuda Shorts (Image 1, Row 3, Col 3)
  {
    id: "loose-fit-bermuda-shorts",
    title: "Loose Fit Bermuda Shorts",
    imageSrc: "/assets/t-shirt/image 9-1.png",
    imageAlt: "Washed blue denim loose fit bermuda shorts",
    category: "Shorts",
    dressStyle: "Casual",
    dressStyles: ["Casual", "Gym"],
    rating: 3.0,
    ratingCount: 22,
    price: 80,
    colors: ["Blue"],
    sizes: ["Small", "Medium", "Large"],
    salesCount: 1800,
    popularity: 82,
    createdDate: "2026-03-20",
    href: "/shop/product/loose-fit-bermuda-shorts",
  },
  // 10. One Life Graphic T-shirt (Newest arrival)
  {
    id: "one-life-graphic-t-shirt",
    title: "One Life Graphic T-shirt",
    imageSrc: "/assets/t-shirt/one-life-main.png",
    imageAlt: "Olive Graphic T-shirt with ONE LIFE typography",
    category: "T-shirts",
    dressStyle: "Casual",
    dressStyles: ["Casual", "Party"],
    rating: 4.5,
    ratingCount: 45,
    price: 260,
    originalPrice: 300,
    discount: "-40%",
    colors: ["Green", "Black"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    salesCount: 1200,
    popularity: 74,
    createdDate: "2026-04-28",
    href: "/shop/product/one-life-graphic-t-shirt",
  },
  // 11. Polo with Contrast Trims
  {
    id: "polo-contrast-trims",
    title: "Polo with Contrast Trims",
    imageSrc: "/assets/t-shirt/image 1.png",
    imageAlt: "Teal short sleeve polo shirt with white contrast collar and trims",
    category: "T-shirts",
    dressStyle: "Casual",
    dressStyles: ["Casual", "Formal", "Party"],
    rating: 4.0,
    ratingCount: 26,
    price: 212,
    originalPrice: 242,
    discount: "-20%",
    colors: ["Blue", "Cyan", "White"],
    sizes: ["Medium", "Large", "X-Large"],
    salesCount: 1100,
    popularity: 76,
    createdDate: "2026-04-25",
    href: "/shop/product/polo-contrast-trims",
  },
  // 12. T-shirt with Tape Details
  {
    id: "t-shirt-tape-details",
    title: "T-shirt with Tape Details",
    imageSrc: "/assets/t-shirt/image 7.png",
    imageAlt: "Black T-shirt with tape details on sleeves",
    category: "T-shirts",
    dressStyle: "Casual",
    dressStyles: ["Casual", "Gym"],
    rating: 4.5,
    ratingCount: 32,
    price: 120,
    colors: ["Black"],
    sizes: ["Small", "Medium", "Large"],
    salesCount: 950,
    popularity: 78,
    createdDate: "2026-04-22",
    href: "/shop/product/t-shirt-tape-details",
  },
  // 13. Faded Skinny Jeans
  {
    id: "faded-skinny-jeans",
    title: "Faded Skinny Jeans",
    imageSrc: "/assets/t-shirt/image 10-1.png",
    imageAlt: "Dark washed faded black skinny fit denim jeans",
    category: "Jeans",
    dressStyle: "Casual",
    dressStyles: ["Casual", "Party"],
    rating: 4.5,
    ratingCount: 39,
    price: 210,
    colors: ["Black", "Blue"],
    sizes: ["Medium", "Large", "X-Large"],
    salesCount: 880,
    popularity: 80,
    createdDate: "2026-04-18",
    href: "/shop/product/faded-skinny-jeans",
  },
  // 14. Classic Pullover Hoodie (Hoodie category item with unique picture)
  {
    id: "classic-pullover-hoodie",
    title: "Classic Pullover Hoodie",
    imageSrc: "/assets/t-shirt/image 5.png",
    imageAlt: "Cozy urban minimalist pullover hoodie",
    category: "Hoodie",
    dressStyle: "Casual",
    dressStyles: ["Casual", "Gym"],
    rating: 4.7,
    ratingCount: 41,
    price: 170,
    originalPrice: 195,
    discount: "-15%",
    colors: ["Black", "White"],
    sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
    salesCount: 750,
    popularity: 72,
    createdDate: "2026-04-15",
    href: "/shop/product/classic-pullover-hoodie",
  },
];

/**
 * Dynamic minimum and maximum price bounds calculated directly from catalog items.
 */
export const CATALOG_MIN_PRICE = Math.min(...CATALOG_PRODUCTS.map((p) => p.price)); // $80
export const CATALOG_MAX_PRICE = Math.max(...CATALOG_PRODUCTS.map((p) => p.price)); // $260

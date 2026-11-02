import type { ProductDetail } from "@/types/product";
import { CATALOG_PRODUCTS } from "./catalog-data";

export const MOCK_PRODUCT_DETAILS: Record<string, ProductDetail> = {
  "one-life-graphic-t-shirt": {
    id: "one-life-graphic-t-shirt",
    title: "ONE LIFE GRAPHIC T-SHIRT",
    category: "T-shirts",
    rating: 4.5,
    ratingCount: 45,
    price: 260,
    originalPrice: 300,
    discount: "-40%",
    description:
      "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
    colors: [
      { name: "Olive Brown", hex: "#4F4631" },
      { name: "Dark Green", hex: "#314F4A" },
      { name: "Midnight Navy", hex: "#31344F" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    images: [
      "/assets/t-shirt/one-life-thumb-1.png",
      "/assets/t-shirt/one-life-thumb-2.png",
      "/assets/t-shirt/one-life-thumb-3.png",
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop" },
      { label: "Men", href: "/shop?gender=men" },
      { label: "T-shirts" },
    ],
  },
  "t-shirt-tape-details": {
    id: "t-shirt-tape-details",
    title: "T-SHIRT WITH TAPE DETAILS",
    category: "T-shirts",
    rating: 4.5,
    ratingCount: 32,
    price: 120,
    description:
      "Featuring distinctive woven tape trims along the sleeves, this premium cotton crewneck brings effortless street style and everyday comfort to your modern wardrobe.",
    colors: [
      { name: "Jet Black", hex: "#1A1A1A" },
      { name: "Slate Charcoal", hex: "#3B4252" },
      { name: "Deep Navy", hex: "#2E3440" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    images: [
      "/assets/t-shirt/image 7.png",
      "/assets/t-shirt/image 1.png",
      "/assets/t-shirt/image 5.png",
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop" },
      { label: "Men", href: "/shop?gender=men" },
      { label: "T-shirts" },
    ],
  },
  "skinny-fit-jeans": {
    id: "skinny-fit-jeans",
    title: "SKINNY FIT JEANS",
    category: "Jeans",
    rating: 3.5,
    ratingCount: 18,
    price: 240,
    originalPrice: 260,
    discount: "-20%",
    description:
      "Tailored with flexible stretch denim, these medium-wash skinny jeans deliver an authentic contoured fit, subtle whiskering, and versatile day-to-night styling.",
    colors: [
      { name: "Classic Indigo", hex: "#2B4C7E" },
      { name: "Washed Blue", hex: "#4A709C" },
      { name: "Dark Rinse", hex: "#1D2A44" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    images: [
      "/assets/t-shirt/image 8.png",
      "/assets/t-shirt/image 10-1.png",
      "/assets/t-shirt/image 9-1.png",
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop" },
      { label: "Men", href: "/shop?gender=men" },
      { label: "Jeans" },
    ],
  },
  "checkered-shirt": {
    id: "checkered-shirt",
    title: "CHECKERED SHIRT",
    category: "Shirts",
    rating: 4.5,
    ratingCount: 29,
    price: 180,
    description:
      "A timeless tartan flannel shirt cut from brushed woven cotton. Features buttoned cuffs, a crisp collar, and rich navy and crimson check patterns.",
    colors: [
      { name: "Navy Crimson", hex: "#4C1C24" },
      { name: "Forest Olive", hex: "#2D4A22" },
      { name: "Monochrome Grid", hex: "#2B2B2B" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    images: [
      "/assets/t-shirt/image 9.png",
      "/assets/t-shirt/image 7-1.png",
      "/assets/t-shirt/image 3.png",
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop" },
      { label: "Men", href: "/shop?gender=men" },
      { label: "Shirts" },
    ],
  },
  "sleeve-striped-t-shirt": {
    id: "sleeve-striped-t-shirt",
    title: "SLEEVE STRIPED T-SHIRT",
    category: "T-shirts",
    rating: 4.5,
    ratingCount: 24,
    price: 130,
    originalPrice: 160,
    discount: "-30%",
    description:
      "Sporty color-blocked raglan t-shirt designed with clean vertical torso pinstripes and contrasting sleeves for a sharp, athletic casual look.",
    colors: [
      { name: "Terracotta Sunset", hex: "#D95D39" },
      { name: "Mustard Stripe", hex: "#C7923E" },
      { name: "Charcoal Contrast", hex: "#333333" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    images: [
      "/assets/t-shirt/image 10.png",
      "/assets/t-shirt/image 8-1.png",
      "/assets/t-shirt/image 2.png",
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop" },
      { label: "Men", href: "/shop?gender=men" },
      { label: "T-shirts" },
    ],
  },
  "vertical-striped-shirt": {
    id: "vertical-striped-shirt",
    title: "VERTICAL STRIPED SHIRT",
    category: "Shirts",
    rating: 5.0,
    ratingCount: 42,
    price: 212,
    originalPrice: 232,
    discount: "-20%",
    description:
      "Contemporary band collar shirt featuring crisp vertical sage stripes, crafted from a breathable cotton-linen blend for relaxed elegance in warm weather.",
    colors: [
      { name: "Sage Olive", hex: "#4F6352" },
      { name: "Sky Linen", hex: "#5C768D" },
      { name: "Sand Neutral", hex: "#8A7D6B" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    images: [
      "/assets/t-shirt/image 7-1.png",
      "/assets/t-shirt/image 9.png",
      "/assets/t-shirt/image 3.png",
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop" },
      { label: "Men", href: "/shop?gender=men" },
      { label: "Shirts" },
    ],
  },
  "courage-graphic-t-shirt": {
    id: "courage-graphic-t-shirt",
    title: "COURAGE GRAPHIC T-SHIRT",
    category: "T-shirts",
    rating: 4.0,
    ratingCount: 16,
    price: 145,
    description:
      "Bold statement tee in earthy rust orange, screen-printed with energetic typography and vibrant blue airbrush accents on heavyweight combed cotton.",
    colors: [
      { name: "Rust Orange", hex: "#C25E34" },
      { name: "Off White", hex: "#E8E5DF" },
      { name: "Washed Black", hex: "#292929" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    images: [
      "/assets/t-shirt/image 8-1.png",
      "/assets/t-shirt/image 10.png",
      "/assets/t-shirt/image 2.png",
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop" },
      { label: "Men", href: "/shop?gender=men" },
      { label: "T-shirts" },
    ],
  },
  "loose-fit-bermuda-shorts": {
    id: "loose-fit-bermuda-shorts",
    title: "LOOSE FIT BERMUDA SHORTS",
    category: "Shorts",
    rating: 3.0,
    ratingCount: 12,
    price: 80,
    description:
      "Relaxed vintage-washed denim shorts cut at the knee with durable reinforced stitching and easy 5-pocket utility for warm sunny days.",
    colors: [
      { name: "Vintage Light Denim", hex: "#5A7B9C" },
      { name: "Mid Blue Stone", hex: "#3A5C80" },
      { name: "Bleached Ice", hex: "#8DA7C4" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    images: [
      "/assets/t-shirt/image 9-1.png",
      "/assets/t-shirt/image 8.png",
      "/assets/t-shirt/image 10-1.png",
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop" },
      { label: "Men", href: "/shop?gender=men" },
      { label: "Shorts" },
    ],
  },
  "faded-skinny-jeans": {
    id: "faded-skinny-jeans",
    title: "FADED SKINNY JEANS",
    category: "Jeans",
    rating: 4.5,
    ratingCount: 38,
    price: 210,
    description:
      "Sleek washed black stretch denim with subtle thigh fading and custom matte black hardware. Engineered for a form-fitting profile that retains its shape all day.",
    colors: [
      { name: "Faded Jet Black", hex: "#222222" },
      { name: "Distressed Grey", hex: "#4A4A4A" },
      { name: "Raw Pitch Black", hex: "#0F0F0F" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    images: [
      "/assets/t-shirt/image 10-1.png",
      "/assets/t-shirt/image 8.png",
      "/assets/t-shirt/image 9-1.png",
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop" },
      { label: "Men", href: "/shop?gender=men" },
      { label: "Jeans" },
    ],
  },
  "polo-contrast-trims": {
    id: "polo-contrast-trims",
    title: "POLO WITH CONTRAST TRIMS",
    category: "Polo",
    rating: 4.0,
    ratingCount: 28,
    price: 212,
    originalPrice: 242,
    discount: "-20%",
    description:
      "Smart casual polo shirt crafted from breathable pique cotton with refined contrast collar and sleeve trims.",
    colors: [
      { name: "Ocean Teal", hex: "#1C6B8A" },
      { name: "Bright White", hex: "#FFFFFF" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    images: ["/assets/t-shirt/image 1.png", "/assets/t-shirt/image 3.png"],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop" },
      { label: "Men", href: "/shop?gender=men" },
      { label: "Polo" },
    ],
  },
  "gradient-graphic-t-shirt": {
    id: "gradient-graphic-t-shirt",
    title: "GRADIENT GRAPHIC T-SHIRT",
    category: "T-shirts",
    rating: 3.5,
    ratingCount: 19,
    price: 145,
    description:
      "Modern artistic crewneck tee showcasing a vibrant fluid swirl graphic with contemporary streetwear typography.",
    colors: [
      { name: "Pure White", hex: "#FFFFFF" },
      { name: "Neon Spectrum", hex: "#E056FD" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    images: ["/assets/t-shirt/image 2.png", "/assets/t-shirt/image 10.png"],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop" },
      { label: "Men", href: "/shop?gender=men" },
      { label: "T-shirts" },
    ],
  },
  "polo-tipping-details": {
    id: "polo-tipping-details",
    title: "POLO WITH TIPPING DETAILS",
    category: "Polo",
    rating: 4.5,
    ratingCount: 35,
    price: 180,
    description:
      "Sophisticated textured knit polo featuring delicate contrast tipping on the ribbed collar and embroidered palm crest.",
    colors: [
      { name: "Dusty Mauve", hex: "#9E6B7A" },
      { name: "Classic Navy", hex: "#1E2A38" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    images: ["/assets/t-shirt/image 3.png", "/assets/t-shirt/image 1.png"],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop" },
      { label: "Men", href: "/shop?gender=men" },
      { label: "Polo" },
    ],
  },
  "black-striped-t-shirt": {
    id: "black-striped-t-shirt",
    title: "BLACK STRIPED T-SHIRT",
    category: "T-shirts",
    rating: 5.0,
    ratingCount: 52,
    price: 120,
    originalPrice: 150,
    discount: "-30%",
    description:
      "Baseball-inspired raglan t-shirt featuring pinstriped front torso panel and contrasting solid black sleeves.",
    colors: [
      { name: "White & Black", hex: "#1A1A1A" },
      { name: "Heather Grey", hex: "#7D7D7D" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    images: ["/assets/t-shirt/image 4.png", "/assets/t-shirt/image 7.png"],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop" },
      { label: "Men", href: "/shop?gender=men" },
      { label: "T-shirts" },
    ],
  },
};

/**
 * Service function to retrieve product details by ID.
 * When a real backend is implemented, simply replace the mock lookup
 * with: return await fetcher<ProductDetail>(`/api/products/${id}`);
 */
export async function getProductById(id: string): Promise<ProductDetail | null> {
  // Simulating async behavior identical to backend API call
  if (MOCK_PRODUCT_DETAILS[id]) {
    return MOCK_PRODUCT_DETAILS[id];
  }

  const catalogItem = CATALOG_PRODUCTS.find((p) => p.id === id);
  if (catalogItem) {
    return {
      id: catalogItem.id,
      title: catalogItem.title.toUpperCase(),
      category: catalogItem.category,
      rating: catalogItem.rating,
      ratingCount: catalogItem.ratingCount ?? 30,
      price: catalogItem.price,
      originalPrice: catalogItem.originalPrice,
      discount: catalogItem.discount,
      description: `${catalogItem.title} - High quality garment tailored with premium fabrics for unmatched comfort and effortless modern style.`,
      colors: catalogItem.colors.map((c) => ({ name: c, hex: "#1A1A1A" })),
      sizes: catalogItem.sizes,
      images: [catalogItem.imageSrc, catalogItem.imageSrc],
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop" },
        {
          label: catalogItem.dressStyle,
          href: `/shop?dressStyle=${catalogItem.dressStyle}`,
        },
        { label: catalogItem.title },
      ],
    };
  }

  return null;
}

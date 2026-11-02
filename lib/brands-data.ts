export interface Brand {
  id: string;
  name: "Versace" | "Zara" | "Gucci" | "Prada" | "Calvin Klein";
  slug: string;
  src: string;
  width: number;
  height: number;
  logoClass: string;
  description: string;
}

export const BRANDS: Brand[] = [
  {
    id: "versace",
    name: "Versace",
    slug: "versace",
    src: "/assets/header/header-brand-logos/Group.png",
    width: 166,
    height: 33,
    logoClass: "h-6 sm:h-7 lg:h-8",
    description:
      "Italian luxury fashion house known for bold, glamorous artwork, vibrant aesthetics, and iconic heritage.",
  },
  {
    id: "zara",
    name: "Zara",
    slug: "zara",
    src: "/assets/header/header-brand-logos/zara-logo-1 1.png",
    width: 91,
    height: 38,
    logoClass: "h-7 sm:h-8 lg:h-9",
    description:
      "Contemporary urban fashion and modern essentials designed for effortless everyday style and comfort.",
  },
  {
    id: "gucci",
    name: "Gucci",
    slug: "gucci",
    src: "/assets/header/header-brand-logos/gucci-logo-1 1.png",
    width: 156,
    height: 36,
    logoClass: "h-6 sm:h-7 lg:h-8",
    description:
      "Florentine luxury brand renowned worldwide for exquisite craftsmanship, bold creativity, and timeless tailoring.",
  },
  {
    id: "prada",
    name: "Prada",
    slug: "prada",
    src: "/assets/header/header-brand-logos/prada-logo-1 1.png",
    width: 194,
    height: 32,
    logoClass: "h-5 sm:h-6 lg:h-7",
    description:
      "Avant-garde Italian high fashion celebrated for sleek silhouettes, minimalist tailoring, and refined luxury.",
  },
  {
    id: "calvin-klein",
    name: "Calvin Klein",
    slug: "calvin-klein",
    src: "/assets/header/header-brand-logos/Group-1.png",
    width: 207,
    height: 33,
    logoClass: "h-5 sm:h-6 lg:h-7",
    description:
      "American minimalist lifestyle brand famous for premium denim, relaxed luxury essentials, and clean silhouettes.",
  },
];

export const FILTER_BRANDS = ["Versace", "Zara", "Gucci", "Prada", "Calvin Klein"] as const;
export type FilterBrand = (typeof FILTER_BRANDS)[number];

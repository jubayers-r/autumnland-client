export interface Product {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  rating: number;
  price: number;
  originalPrice?: number;
  discount?: string;
  href: string;
}

export const NEW_ARRIVALS: Product[] = [
  {
    id: "t-shirt-tape-details",
    title: "T-shirt with Tape Details",
    imageSrc: "/assets/t-shirt/image 7.png",
    imageAlt: "Black T-shirt with tape details on sleeves",
    rating: 4.5,
    price: 120,
    href: "/shop/product/t-shirt-tape-details",
  },
  {
    id: "skinny-fit-jeans",
    title: "Skinny Fit Jeans",
    imageSrc: "/assets/t-shirt/image 8.png",
    imageAlt: "Classic blue skinny fit denim jeans",
    rating: 3.5,
    price: 240,
    originalPrice: 260,
    discount: "-20%",
    href: "/shop/product/skinny-fit-jeans",
  },
  {
    id: "checkered-shirt",
    title: "Checkered Shirt",
    imageSrc: "/assets/t-shirt/image 9.png",
    imageAlt: "Navy and red checkered casual long-sleeve shirt",
    rating: 4.5,
    price: 180,
    href: "/shop/product/checkered-shirt",
  },
  {
    id: "sleeve-striped-t-shirt",
    title: "Sleeve Striped T-shirt",
    imageSrc: "/assets/t-shirt/image 10.png",
    imageAlt: "Orange vertical striped t-shirt with black raglan sleeves",
    rating: 4.5,
    price: 130,
    originalPrice: 160,
    discount: "-30%",
    href: "/shop/product/sleeve-striped-t-shirt",
  },
];

export const TOP_SELLING: Product[] = [
  {
    id: "vertical-striped-shirt",
    title: "Vertical Striped Shirt",
    imageSrc: "/assets/t-shirt/image 7-1.png",
    imageAlt: "Green and white vertical striped casual button-down shirt",
    rating: 5.0,
    price: 212,
    originalPrice: 232,
    discount: "-20%",
    href: "/shop/product/vertical-striped-shirt",
  },
  {
    id: "courage-graphic-t-shirt",
    title: "Courage Graphic T-shirt",
    imageSrc: "/assets/t-shirt/image 8-1.png",
    imageAlt: "Orange t-shirt with Courage graphic typography print",
    rating: 4.0,
    price: 145,
    href: "/shop/product/courage-graphic-t-shirt",
  },
  {
    id: "loose-fit-bermuda-shorts",
    title: "Loose Fit Bermuda Shorts",
    imageSrc: "/assets/t-shirt/image 9-1.png",
    imageAlt: "Washed blue denim loose fit bermuda shorts",
    rating: 3.0,
    price: 80,
    href: "/shop/product/loose-fit-bermuda-shorts",
  },
  {
    id: "faded-skinny-jeans",
    title: "Faded Skinny Jeans",
    imageSrc: "/assets/t-shirt/image 10-1.png",
    imageAlt: "Dark washed faded black skinny fit denim jeans",
    rating: 4.5,
    price: 210,
    href: "/shop/product/faded-skinny-jeans",
  },
];

export const YOU_MIGHT_ALSO_LIKE: Product[] = [
  {
    id: "polo-contrast-trims",
    title: "Polo with Contrast Trims",
    imageSrc: "/assets/t-shirt/image 1.png",
    imageAlt: "Teal short sleeve polo shirt with white contrast collar and trims",
    rating: 4.0,
    price: 212,
    originalPrice: 242,
    discount: "-20%",
    href: "/shop/product/polo-contrast-trims",
  },
  {
    id: "gradient-graphic-t-shirt",
    title: "Gradient Graphic T-shirt",
    imageSrc: "/assets/t-shirt/image 2.png",
    imageAlt: "White crewneck t-shirt with vibrant swirl gradient graphic artwork",
    rating: 3.5,
    price: 145,
    href: "/shop/product/gradient-graphic-t-shirt",
  },
  {
    id: "polo-tipping-details",
    title: "Polo with Tipping Details",
    imageSrc: "/assets/t-shirt/image 3.png",
    imageAlt: "Mauve pink textured polo shirt with white tipping collar details",
    rating: 4.5,
    price: 180,
    href: "/shop/product/polo-tipping-details",
  },
  {
    id: "black-striped-t-shirt",
    title: "Black Striped T-shirt",
    imageSrc: "/assets/t-shirt/image 4.png",
    imageAlt: "White t-shirt with thin black vertical stripes and black raglan sleeves",
    rating: 5.0,
    price: 120,
    originalPrice: 150,
    discount: "-30%",
    href: "/shop/product/black-striped-t-shirt",
  },
];

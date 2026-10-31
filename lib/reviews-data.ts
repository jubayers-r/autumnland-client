import type { Review } from "@/types/review";

/**
 * Standard reference reviews shown in design mockups.
 * These match the exact text, ratings, and authors from the visual specification.
 */
export const REFERENCE_REVIEWS: Review[] = [
  {
    id: "rev-samantha-d",
    productId: "one-life-graphic-t-shirt",
    author: "Samantha D.",
    rating: 4.5,
    comment:
      "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
    isVerified: true,
    createdAt: "2023-08-14T10:00:00Z",
    helpfulCount: 24,
  },
  {
    id: "rev-alex-m",
    productId: "one-life-graphic-t-shirt",
    author: "Alex M.",
    rating: 4.0,
    comment:
      "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
    isVerified: true,
    createdAt: "2023-08-15T11:30:00Z",
    helpfulCount: 18,
  },
  {
    id: "rev-ethan-r",
    productId: "one-life-graphic-t-shirt",
    author: "Ethan R.",
    rating: 4.5,
    comment:
      "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
    isVerified: true,
    createdAt: "2023-08-16T09:15:00Z",
    helpfulCount: 15,
  },
  {
    id: "rev-olivia-p",
    productId: "one-life-graphic-t-shirt",
    author: "Olivia P.",
    rating: 4.0,
    comment:
      "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
    isVerified: true,
    createdAt: "2023-08-17T14:45:00Z",
    helpfulCount: 19,
  },
  {
    id: "rev-liam-k",
    productId: "one-life-graphic-t-shirt",
    author: "Liam K.",
    rating: 4.0,
    comment:
      "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
    isVerified: true,
    createdAt: "2023-08-18T16:20:00Z",
    helpfulCount: 12,
  },
  {
    id: "rev-ava-h",
    productId: "one-life-graphic-t-shirt",
    author: "Ava H.",
    rating: 4.5,
    comment:
      "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
    isVerified: true,
    createdAt: "2023-08-19T18:00:00Z",
    helpfulCount: 31,
  },
  {
    id: "rev-noah-w",
    productId: "one-life-graphic-t-shirt",
    author: "Noah W.",
    rating: 5.0,
    comment:
      "Flawless fit and luxury cotton feel! I bought this after seeing a friend wear it. Even after five washes, the collar remains crisp and the graphic has zero cracks.",
    isVerified: true,
    createdAt: "2023-08-04T08:20:00Z",
    helpfulCount: 9,
  },
  {
    id: "rev-chloe-b",
    productId: "one-life-graphic-t-shirt",
    author: "Chloe B.",
    rating: 5.0,
    comment:
      "The cut is contemporary without being oversized. It pairs effortlessly with both tailored trousers and vintage denim. Highly recommend sizing true to fit.",
    isVerified: true,
    createdAt: "2023-08-03T12:00:00Z",
    helpfulCount: 7,
  },
  {
    id: "rev-marcus-t",
    productId: "one-life-graphic-t-shirt",
    author: "Marcus T.",
    rating: 3.5,
    comment:
      "The material quality is outstanding and super soft, but the sleeves are slightly longer than traditional cuts. Great for street style, but keep the fit profile in mind.",
    isVerified: false,
    createdAt: "2023-08-02T14:10:00Z",
    helpfulCount: 4,
  },
  {
    id: "rev-elena-s",
    productId: "one-life-graphic-t-shirt",
    author: "Elena S.",
    rating: 5.0,
    comment:
      "Subtle elegance and rich texture. This brand continues to impress with fabric selection and sustainable packaging. Delivery took only two days.",
    isVerified: true,
    createdAt: "2023-08-01T15:30:00Z",
    helpfulCount: 11,
  },
  {
    id: "rev-daniel-k",
    productId: "one-life-graphic-t-shirt",
    author: "Daniel K.",
    rating: 3.0,
    comment:
      "Nice shirt and pleasant graphic print. The color in person is slightly more muted than in studio lighting, but still looks good.",
    isVerified: true,
    createdAt: "2023-07-28T09:00:00Z",
    helpfulCount: 2,
  },
  {
    id: "rev-sophia-l",
    productId: "one-life-graphic-t-shirt",
    author: "Sophia L.",
    rating: 5.0,
    comment:
      "One of the best graphic tees in my rotation right now. Heavyweight cotton that drapes exceptionally well and breathes in warm weather.",
    isVerified: true,
    createdAt: "2023-07-25T17:15:00Z",
    helpfulCount: 14,
  },
];

/**
 * In-memory store initialized with reference reviews.
 * Allows adding reviews at runtime so submitting a new review immediately updates the list.
 */
let inMemoryReviews: Review[] = [...REFERENCE_REVIEWS];

export function getInMemoryReviews(): Review[] {
  return inMemoryReviews;
}

export function addInMemoryReview(review: Review): void {
  inMemoryReviews = [review, ...inMemoryReviews];
}

export function resetInMemoryReviews(): void {
  inMemoryReviews = [...REFERENCE_REVIEWS];
}

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

  // Gradient Graphic T-shirt reviews
  {
    id: "rev-grad-1",
    productId: "gradient-graphic-t-shirt",
    author: "Julian K.",
    rating: 5.0,
    comment:
      "The color gradient looks even better in natural sunlight! High-density organic cotton that doesn't lose its shape after laundering.",
    isVerified: true,
    createdAt: "2023-08-20T11:00:00Z",
    helpfulCount: 16,
  },
  {
    id: "rev-grad-2",
    productId: "gradient-graphic-t-shirt",
    author: "Maya R.",
    rating: 4.5,
    comment:
      "Vibrant rave colors without feeling cheap or stiff. The drape is relaxed with dropped shoulders, perfect for weekend outings.",
    isVerified: true,
    createdAt: "2023-08-18T14:30:00Z",
    helpfulCount: 10,
  },
  {
    id: "rev-grad-3",
    productId: "gradient-graphic-t-shirt",
    author: "Derek T.",
    rating: 4.0,
    comment:
      "Great summer tee! Collar is sturdy and didn't stretch out. Size down if you prefer a slimmer tailored fit.",
    isVerified: true,
    createdAt: "2023-08-12T09:15:00Z",
    helpfulCount: 7,
  },

  // Polo with Tipping Details reviews
  {
    id: "rev-polo-tip-1",
    productId: "polo-tipping-details",
    author: "Jonathan B.",
    rating: 5.0,
    comment:
      "The piqué knit is light and breathable. The contrast edge tipping on the collar elevates it above ordinary polo shirts.",
    isVerified: true,
    createdAt: "2023-08-22T10:15:00Z",
    helpfulCount: 22,
  },
  {
    id: "rev-polo-tip-2",
    productId: "polo-tipping-details",
    author: "Harrison L.",
    rating: 4.5,
    comment:
      "Wore this to a rooftop dinner and got several compliments. The mother-of-pearl buttons are a classy luxury touch.",
    isVerified: true,
    createdAt: "2023-08-19T16:40:00Z",
    helpfulCount: 14,
  },
  {
    id: "rev-polo-tip-3",
    productId: "polo-tipping-details",
    author: "Gabriel V.",
    rating: 4.0,
    comment:
      "Solid construction and anti-curl collar. Holds up very well during long office hours and hot commutes.",
    isVerified: true,
    createdAt: "2023-08-15T08:20:00Z",
    helpfulCount: 8,
  },

  // Black Striped T-shirt reviews
  {
    id: "rev-blk-str-1",
    productId: "black-striped-t-shirt",
    author: "Mason C.",
    rating: 5.0,
    comment:
      "Love the baseball jersey silhouette! The raglan sleeves give it a distinctive vintage streetwear aesthetic.",
    isVerified: true,
    createdAt: "2023-08-21T13:20:00Z",
    helpfulCount: 19,
  },
  {
    id: "rev-blk-str-2",
    productId: "black-striped-t-shirt",
    author: "Chloe S.",
    rating: 4.5,
    comment:
      "Stripes are knitted into the fabric, not cheap heat transfers. Very soft against the skin and pairs easily with cargo pants.",
    isVerified: true,
    createdAt: "2023-08-17T11:45:00Z",
    helpfulCount: 11,
  },
  {
    id: "rev-blk-str-3",
    productId: "black-striped-t-shirt",
    author: "Lucas N.",
    rating: 4.0,
    comment:
      "True to size with nice shoulder mobility. The contrasting black neckline stays crisp after wash cycles.",
    isVerified: true,
    createdAt: "2023-08-10T15:10:00Z",
    helpfulCount: 5,
  },

  // Skinny Fit Jeans reviews
  {
    id: "rev-skn-jn-1",
    productId: "skinny-fit-jeans",
    author: "Brandon M.",
    rating: 5.0,
    comment:
      "The stretch denim is unbelievable. It hugs cleanly through the calf and ankle without cutting off circulation or sagging at the knees.",
    isVerified: true,
    createdAt: "2023-08-23T14:10:00Z",
    helpfulCount: 28,
  },
  {
    id: "rev-skn-jn-2",
    productId: "skinny-fit-jeans",
    author: "Tyler W.",
    rating: 4.5,
    comment:
      "Authentic mid-blue wash that looks great dressed up with boots or dressed down with sneakers. Genuine YKK zipper is smooth.",
    isVerified: true,
    createdAt: "2023-08-16T12:05:00Z",
    helpfulCount: 15,
  },
  {
    id: "rev-skn-jn-3",
    productId: "skinny-fit-jeans",
    author: "Kevin P.",
    rating: 4.0,
    comment:
      "Very flattering taper. If you have thicker athletic thighs you may want to order one size up, but stretch accommodates nicely.",
    isVerified: true,
    createdAt: "2023-08-11T17:30:00Z",
    helpfulCount: 9,
  },

  // Checkered Shirt reviews
  {
    id: "rev-chk-sh-1",
    productId: "checkered-shirt",
    author: "Wesley E.",
    rating: 5.0,
    comment:
      "Double-brushed flannel that feels like a cozy blanket. The tartan plaid pattern matches symmetrically across the front placket.",
    isVerified: true,
    createdAt: "2023-08-20T09:40:00Z",
    helpfulCount: 21,
  },
  {
    id: "rev-chk-sh-2",
    productId: "checkered-shirt",
    author: "Hannah G.",
    rating: 4.5,
    comment:
      "Bought this to wear open over graphic tees. Heavyweight enough for cool autumn evenings without being bulky.",
    isVerified: true,
    createdAt: "2023-08-14T15:25:00Z",
    helpfulCount: 13,
  },
  {
    id: "rev-chk-sh-3",
    productId: "checkered-shirt",
    author: "Austin F.",
    rating: 4.0,
    comment:
      "Great color tones in crimson and navy. Sleeves are the perfect length with sturdy dual buttons on cuffs.",
    isVerified: true,
    createdAt: "2023-08-08T18:10:00Z",
    helpfulCount: 6,
  },

  // Sleeve Striped T-shirt reviews
  {
    id: "rev-slv-str-1",
    productId: "sleeve-striped-t-shirt",
    author: "Zachary D.",
    rating: 5.0,
    comment:
      "The athletic sleeve bands give off a sleek varsity vibe. Smooth midweight jersey cotton that feels durable.",
    isVerified: true,
    createdAt: "2023-08-21T16:15:00Z",
    helpfulCount: 17,
  },
  {
    id: "rev-slv-str-2",
    productId: "sleeve-striped-t-shirt",
    author: "Dylan J.",
    rating: 4.5,
    comment:
      "Clean look and great arm contouring. The orange and black colorway really pops in person.",
    isVerified: true,
    createdAt: "2023-08-15T10:30:00Z",
    helpfulCount: 11,
  },
  {
    id: "rev-slv-str-3",
    productId: "sleeve-striped-t-shirt",
    author: "Ryan B.",
    rating: 4.0,
    comment:
      "High quality stitching around the collar and sleeves. Fits true to size with a comfortable modern cut.",
    isVerified: true,
    createdAt: "2023-08-09T13:45:00Z",
    helpfulCount: 5,
  },

  // Vertical Striped Shirt reviews
  {
    id: "rev-vrt-str-1",
    productId: "vertical-striped-shirt",
    author: "Mateo R.",
    rating: 5.0,
    comment:
      "The linen-cotton blend is a lifesaver in high humidity. Extremely airy and the green vertical stripes look very sophisticated.",
    isVerified: true,
    createdAt: "2023-08-22T15:50:00Z",
    helpfulCount: 25,
  },
  {
    id: "rev-vrt-str-2",
    productId: "vertical-striped-shirt",
    author: "Sebastian L.",
    rating: 4.5,
    comment:
      "Camp collar style is top tier resort aesthetic. Pairs effortlessly with linen trousers or relaxed shorts.",
    isVerified: true,
    createdAt: "2023-08-17T09:20:00Z",
    helpfulCount: 16,
  },
  {
    id: "rev-vrt-str-3",
    productId: "vertical-striped-shirt",
    author: "Oliver H.",
    rating: 4.0,
    comment:
      "Subtle slub texture adds a lot of character. Natural mother-of-pearl buttons are a welcome premium touch.",
    isVerified: true,
    createdAt: "2023-08-12T14:00:00Z",
    helpfulCount: 8,
  },

  // Courage Graphic T-shirt reviews
  {
    id: "rev-crg-1",
    productId: "courage-graphic-t-shirt",
    author: "Dominic S.",
    rating: 5.0,
    comment:
      "The terracotta pigment dye has that authentic vintage lived-in wash. The puff print lettering has awesome 3D texture.",
    isVerified: true,
    createdAt: "2023-08-21T18:00:00Z",
    helpfulCount: 20,
  },
  {
    id: "rev-crg-2",
    productId: "courage-graphic-t-shirt",
    author: "Isaac W.",
    rating: 4.5,
    comment:
      "Heavyweight 230 GSM cotton that drapes structurally without clinging. One of my favorite tees this season.",
    isVerified: true,
    createdAt: "2023-08-16T11:15:00Z",
    helpfulCount: 12,
  },
  {
    id: "rev-crg-3",
    productId: "courage-graphic-t-shirt",
    author: "Xavier M.",
    rating: 4.0,
    comment:
      "Love the inspirational message and typography placement. Collar is thick and holds its shape nicely.",
    isVerified: true,
    createdAt: "2023-08-07T16:30:00Z",
    helpfulCount: 7,
  },

  // Loose Fit Bermuda Shorts reviews
  {
    id: "rev-brm-1",
    productId: "loose-fit-bermuda-shorts",
    author: "Caleb N.",
    rating: 5.0,
    comment:
      "Perfect 90s skater knee-length silhouette! Heavy denim twill that feels indestructible while remaining breathable.",
    isVerified: true,
    createdAt: "2023-08-19T12:30:00Z",
    helpfulCount: 18,
  },
  {
    id: "rev-brm-2",
    productId: "loose-fit-bermuda-shorts",
    author: "Tristan K.",
    rating: 4.5,
    comment:
      "Pockets are nice and deep so your phone doesn't slide out when seated. Authentic vintage stone wash looks great.",
    isVerified: true,
    createdAt: "2023-08-13T17:40:00Z",
    helpfulCount: 11,
  },
  {
    id: "rev-brm-3",
    productId: "loose-fit-bermuda-shorts",
    author: "Connor V.",
    rating: 4.0,
    comment:
      "Roomy fit through the leg opening gives great air circulation for hot summer days. Sturdy hardware.",
    isVerified: true,
    createdAt: "2023-08-06T10:15:00Z",
    helpfulCount: 6,
  },

  // Faded Skinny Jeans reviews
  {
    id: "rev-fdd-jn-1",
    productId: "faded-skinny-jeans",
    author: "Damian P.",
    rating: 5.0,
    comment:
      "The stone enzyme fading and knee distressing look completely handcrafted. Excellent recovery with zero knee sagging.",
    isVerified: true,
    createdAt: "2023-08-20T17:10:00Z",
    helpfulCount: 22,
  },
  {
    id: "rev-fdd-jn-2",
    productId: "faded-skinny-jeans",
    author: "Elijah C.",
    rating: 4.5,
    comment:
      "Slim tailored taper that stacks nicely on low-top sneakers or boots. Comfort stretch waistband is very forgiving.",
    isVerified: true,
    createdAt: "2023-08-15T13:45:00Z",
    helpfulCount: 14,
  },
  {
    id: "rev-fdd-jn-3",
    productId: "faded-skinny-jeans",
    author: "Maxwell T.",
    rating: 4.0,
    comment: "Great wash and subtle whiskering. Gunmetal hardware adds a clean industrial touch.",
    isVerified: true,
    createdAt: "2023-08-09T08:50:00Z",
    helpfulCount: 8,
  },

  // T-shirt with Tape Details reviews
  {
    id: "rev-tp-dt-1",
    productId: "t-shirt-tape-details",
    author: "Christian F.",
    rating: 5.0,
    comment:
      "Mercerized cotton has an unbelievable silk-like hand feel and slight sheen. The herringbone shoulder tape is a brilliant architectural accent.",
    isVerified: true,
    createdAt: "2023-08-22T11:20:00Z",
    helpfulCount: 24,
  },
  {
    id: "rev-tp-dt-2",
    productId: "t-shirt-tape-details",
    author: "Vincent S.",
    rating: 4.5,
    comment:
      "Minimalist yet instantly recognizable designer detailing. The neck tape ensures no itching against the back of the neck.",
    isVerified: true,
    createdAt: "2023-08-16T14:15:00Z",
    helpfulCount: 15,
  },
  {
    id: "rev-tp-dt-3",
    productId: "t-shirt-tape-details",
    author: "Leo G.",
    rating: 4.0,
    comment:
      "Jet black color stays saturated and deep after multiple washes. Looks great worn with tailored trousers.",
    isVerified: true,
    createdAt: "2023-08-11T10:00:00Z",
    helpfulCount: 9,
  },

  // Polo with Contrast Trims reviews
  {
    id: "rev-cnt-tr-1",
    productId: "polo-contrast-trims",
    author: "Arthur N.",
    rating: 5.0,
    comment:
      "Contrast collar tipping and sleeve bands look very sharp. The micro-piqué fabric has just enough elastane for full mobility.",
    isVerified: true,
    createdAt: "2023-08-23T09:10:00Z",
    helpfulCount: 21,
  },
  {
    id: "rev-cnt-tr-2",
    productId: "polo-contrast-trims",
    author: "Graham E.",
    rating: 4.5,
    comment:
      "Hidden 3-button placket provides a super clean modern front. Excellent for both business-casual days and weekend golf.",
    isVerified: true,
    createdAt: "2023-08-17T16:30:00Z",
    helpfulCount: 13,
  },
  {
    id: "rev-cnt-tr-3",
    productId: "polo-contrast-trims",
    author: "Simon W.",
    rating: 4.0,
    comment:
      "Breathable, lightweight, and wrinkle-resistant. The collar stays structured without flipping outward.",
    isVerified: true,
    createdAt: "2023-08-10T12:40:00Z",
    helpfulCount: 7,
  },
];

/**
 * Session storage key to keep user reviews sticky across page refreshes
 * until hard refresh (or new tab session).
 */
const REVIEWS_STORAGE_KEY = "autumnland_user_reviews";

function getStoredReviews(): Review[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(REVIEWS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredReviews(reviews: Review[]): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
  } catch {
    // Ignore storage quota errors
  }
}

let inMemoryCustomReviews: Review[] = [];

export function getInMemoryReviews(): Review[] {
  const custom = typeof window !== "undefined" ? getStoredReviews() : inMemoryCustomReviews;
  return [...custom, ...REFERENCE_REVIEWS];
}

export function addInMemoryReview(review: Review): void {
  inMemoryCustomReviews = [review, ...inMemoryCustomReviews];
  saveStoredReviews(inMemoryCustomReviews);
}

export function resetInMemoryReviews(): void {
  inMemoryCustomReviews = [];
  if (typeof window !== "undefined") {
    try {
      sessionStorage.removeItem(REVIEWS_STORAGE_KEY);
    } catch {
      // Ignore
    }
  }
}

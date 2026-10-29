export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  isVerified: boolean;
  role?: string;
  date?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "testimonial-0",
    name: "Elena R.",
    rating: 5,
    isVerified: true,
    comment:
      "The textures and earthy color tones are gorgeous. Finally a brand that delivers authentic streetwear without gaudy over-the-top logos. Already placing my third order.",
    date: "3 months ago",
  },
  {
    id: "testimonial-1",
    name: "Sarah M.",
    rating: 5,
    isVerified: true,
    comment:
      "I'm blown away by the quality and style of the clothes I received from Autumnland. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    date: "2 days ago",
  },
  {
    id: "testimonial-2",
    name: "Alex K.",
    rating: 5,
    isVerified: true,
    comment:
      "Finding clothes that align with my personal style used to be a challenge until I discovered Autumnland. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
    date: "1 week ago",
  },
  {
    id: "testimonial-3",
    name: "James L.",
    rating: 5,
    isVerified: true,
    comment:
      "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Autumnland. The selection of clothes is not only diverse but also on-point with the latest trends.",
    date: "2 weeks ago",
  },
  {
    id: "testimonial-4",
    name: "Moo E.",
    rating: 5,
    isVerified: true,
    comment:
      "As someone who's super picky about streetwear fits and fabric weights, Autumnland genuinely nailed it. The heavyweight drop-shoulder hoodies hold their shape wash after wash.",
    date: "3 weeks ago",
  },
  {
    id: "testimonial-5",
    name: "Marcus T.",
    rating: 5,
    isVerified: true,
    comment:
      "The boxy oversized tees are perfection. The ribbed collar doesn't stretch out and the 280 GSM cotton feels luxurious. Definitely my new go-to brand for daily fits.",
    date: "1 month ago",
  },
  {
    id: "testimonial-6",
    name: "Chloe B.",
    rating: 5,
    isVerified: true,
    comment:
      "Fast shipping to the East Coast and the packaging felt like unboxing a high-end luxury brand. The parachute pants silhouette is insane — getting compliments everywhere I go.",
    date: "1 month ago",
  },
  {
    id: "testimonial-7",
    name: "Liam W.",
    rating: 5,
    isVerified: true,
    comment:
      "Clean stitching, premium hardware on the zippers, and truly true-to-size oversized fit. It's rare to find streetwear brands that balance aesthetic with legitimate durability.",
    date: "2 months ago",
  },
  {
    id: "testimonial-8",
    name: "Samantha D.",
    rating: 5,
    isVerified: true,
    comment:
      "I ordered the acid-wash crewneck and utility jacket. Both look even better in person than on the website. Customer support was also super responsive when I had a sizing question.",
    date: "2 months ago",
  },
  {
    id: "testimonial-9",
    name: "David R.",
    rating: 5,
    isVerified: true,
    comment:
      "Autumnland sets the standard for modern streetwear. Minimal branding, premium materials, and silhouettes that sit just right on sneakers. 10/10 will buy again.",
    date: "3 months ago",
  },
];

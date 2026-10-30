export interface DressStyleItem {
  id: string;
  title: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  gridSpan: "small" | "large";
  imagePositionClass: string;
}

export const DRESS_STYLES: DressStyleItem[] = [
  {
    id: "casual",
    title: "Casual",
    href: "/shop?category=casual",
    imageSrc: "/assets/browse-by-dress-style/image 11.png",
    imageAlt: "Man in casual white t-shirt",
    gridSpan: "small",
    // 1st picture: Model is naturally right-sided with right-top anchor
    imagePositionClass: "object-right-top",
  },
  {
    id: "formal",
    title: "Formal",
    href: "/shop?category=formal",
    imageSrc: "/assets/browse-by-dress-style/image 13.png",
    imageAlt: "Man in formal checkered blazer with white dress shirt",
    gridSpan: "large",
    // 2nd picture: Wide image where right-top previously centered the man on phones;
    // position-formal anchors the model right-sided on mobile/tablet and right-top on desktop
    imagePositionClass: "dress-style-img-formal",
  },
  {
    id: "party",
    title: "Party",
    href: "/shop?category=party",
    imageSrc: "/assets/browse-by-dress-style/image 12.png",
    imageAlt: "Woman in party off-shoulder knit sweater",
    gridSpan: "large",
    // 3rd picture: Wide image where right-top previously centered the woman on phones;
    // position-party anchors the model right-sided on mobile/tablet and right-top on desktop
    imagePositionClass: "dress-style-img-party",
  },
  {
    id: "gym",
    title: "Gym",
    href: "/shop?category=gym",
    imageSrc: "/assets/browse-by-dress-style/image 14.png",
    imageAlt: "Athletic man in gym tank top lifting dumbbell",
    gridSpan: "small",
    // 4th picture: Naturally right-sided with right-top anchor
    imagePositionClass: "object-right-top",
  },
];

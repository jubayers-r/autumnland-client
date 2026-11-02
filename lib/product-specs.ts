import {
  Feather,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Layers,
  Flame,
  Sun,
  Activity,
  type LucideIcon,
} from "lucide-react";

export interface ProductSpecItem {
  label: string;
  value: string;
}

export interface ProductHighlightItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ProductSpecConfig {
  specs: ProductSpecItem[];
  highlights: ProductHighlightItem[];
}

const CATALOG_PRODUCT_SPECS: Record<string, ProductSpecConfig> = {
  "gradient-graphic-t-shirt": {
    specs: [
      { label: "Material Composition", value: "100% Combed Heavyweight Organic Cotton" },
      { label: "Fabric Density", value: "240 GSM (Substantial luxury drape)" },
      { label: "Fit Profile", value: "Relaxed contemporary fit with drop shoulder geometry" },
      { label: "Collar & Hem", value: "1x1 ribbed crew collar with double-needle topstitching" },
      { label: "Graphic Print Technique", value: "Multi-tonal reactive dye gradient screen print" },
      { label: "Pre-Treatment", value: "Pre-shrunk and silicone washed for ultra-soft hand feel" },
      { label: "Origin", value: "Ethically spun and constructed in Porto, Portugal" },
    ],
    highlights: [
      {
        icon: Sparkles,
        title: "Vibrant Gradient",
        description:
          "Reactive dye infusion ensures bright multi-color tones stay vivid after washing.",
      },
      {
        icon: Feather,
        title: "Supreme Handfeel",
        description:
          "Combed long-staple organic cotton delivers buttery-smooth next-to-skin touch.",
      },
      {
        icon: ShieldCheck,
        title: "Collar Integrity",
        description: "Reinforced elastane-blended rib collar never sags or puckers over time.",
      },
      {
        icon: RefreshCw,
        title: "Sustainable Inks",
        description: "OEKO-TEX® certified water-based printing with zero toxic runoff.",
      },
    ],
  },
  "polo-tipping-details": {
    specs: [
      { label: "Material Composition", value: "100% Long-Staple Pima Cotton Piqué" },
      { label: "Fabric Density", value: "220 GSM Breathable honeycomb knit structure" },
      { label: "Fit Profile", value: "Tailored athletic cut with stepped side vent slits" },
      {
        label: "Collar & Placket",
        value: "Flat-knit collar with contrast dual tipping & 2-button placket",
      },
      { label: "Buttons", value: "Engraved mother-of-pearl buttons with cross-stitch securing" },
      { label: "Cuffs", value: "Ribbed bicep cuffs matching collar tipping accents" },
      { label: "Origin", value: "Crafted in Milan, Italy" },
    ],
    highlights: [
      {
        icon: Feather,
        title: "Airflow Piqué",
        description: "Honeycomb micro-knit creates continuous ventilation in warm climates.",
      },
      {
        icon: ShieldCheck,
        title: "Anti-Roll Collar",
        description: "Interfaced knit collar retains its crisp form under blazers and jackets.",
      },
      {
        icon: Sparkles,
        title: "Refined Tipping",
        description: "Precision-woven contrast edge stripes lend understated sporting luxury.",
      },
      {
        icon: RefreshCw,
        title: "Shrink Resistance",
        description:
          "Mercerized yarn treatment prevents shape shrinkage during regular laundering.",
      },
    ],
  },
  "black-striped-t-shirt": {
    specs: [
      { label: "Material Composition", value: "100% Ring-Spun Compact Cotton" },
      { label: "Fabric Density", value: "200 GSM Midweight baseball jersey knit" },
      { label: "Fit Profile", value: "Boxy athletic cut with clean drape" },
      {
        label: "Sleeves & Trim",
        value: "Contrast pitch-black raglan sleeves with twin-needle cuffs",
      },
      { label: "Pattern", value: "Yarn-dyed vertical pinstripes running through torso" },
      {
        label: "Pre-Treatment",
        value: "Bio-washed for deep color saturation and anti-fuzz texture",
      },
      { label: "Origin", value: "Constructed in Los Angeles, USA" },
    ],
    highlights: [
      {
        icon: Layers,
        title: "Yarn-Dyed Stripes",
        description: "Knitted directly into the cotton weave, eliminating peeling or stiffness.",
      },
      {
        icon: Activity,
        title: "Raglan Mobility",
        description: "Angled shoulder seams provide unrestricted upper body movement.",
      },
      {
        icon: ShieldCheck,
        title: "Fade Resistance",
        description: "High-fastness reactive dyes preserve the deep jet-black contrast.",
      },
      {
        icon: Feather,
        title: "Cool Touch",
        description: "Breathable compact weave keeps body temperature balanced all afternoon.",
      },
    ],
  },
  "skinny-fit-jeans": {
    specs: [
      { label: "Material Composition", value: "98% Ring-Spun Indigo Cotton, 2% Spandex" },
      { label: "Denim Weight", value: "12.5 oz Authentic Medium-Weight Stretch Denim" },
      {
        label: "Fit Profile",
        value: 'Contoured skinny fit through hip and thigh tapering to 12" leg opening',
      },
      {
        label: "Hardware",
        value: "Heavy-duty YKK brass zipper fly with custom antiqued copper shank",
      },
      {
        label: "Pockets",
        value: "Classic 5-pocket architecture with bar-tack reinforced stress points",
      },
      {
        label: "Wash Treatment",
        value: "Stone enzyme wash with subtle handcrafted thigh whiskering",
      },
      { label: "Origin", value: "Woven and tailored in Istanbul, Turkey" },
    ],
    highlights: [
      {
        icon: Activity,
        title: "4-Way Flex Recovery",
        description: "High-tensile elastane blend moves freely while resisting knee bagging.",
      },
      {
        icon: ShieldCheck,
        title: "Riveted Durability",
        description: "Genuine copper pocket rivets and heavy gauge twin-needle stitching.",
      },
      {
        icon: Sparkles,
        title: "Authentic Wash",
        description: "Handcrafted whiskers and fade marks mimic natural years of vintage wear.",
      },
      {
        icon: RefreshCw,
        title: "Contoured Waistband",
        description: "Curved waistband geometry eliminates gap when sitting or bending.",
      },
    ],
  },
  "checkered-shirt": {
    specs: [
      { label: "Material Composition", value: "100% Brushed Double-Woven Cotton Flannel" },
      { label: "Fabric Density", value: "185 GSM Yarn-dyed tartan plaid weave" },
      {
        label: "Fit Profile",
        value: "Modern relaxed silhouette, optimal as standalone or overshirt",
      },
      {
        label: "Collar & Closure",
        value: "Structured point collar with full button front and box pleat",
      },
      { label: "Cuffs & Hem", value: "Adjustable 2-button barrel cuffs with curved shirttail hem" },
      { label: "Finishing", value: "Dual-sided brushing for plush thermal comfort" },
      { label: "Origin", value: "Constructed in Melbourne, Australia" },
    ],
    highlights: [
      {
        icon: Flame,
        title: "Brushed Flannel",
        description: "Interior and exterior brushed fibres trap warmth on crisp autumn mornings.",
      },
      {
        icon: Layers,
        title: "Aligned Tartan",
        description: "Meticulously pattern-matched across front placket and chest seams.",
      },
      {
        icon: ShieldCheck,
        title: "Shatterproof Buttons",
        description: "Reinforced resin buttons cross-stitched for enduring wear.",
      },
      {
        icon: Feather,
        title: "Layering Versatility",
        description: "Cut with enough ease to slip seamlessly over tees and thermal underlayers.",
      },
    ],
  },
  "sleeve-striped-t-shirt": {
    specs: [
      { label: "Material Composition", value: "100% Organic Combed Jersey Cotton" },
      { label: "Fabric Density", value: "210 GSM Smooth midweight drape" },
      { label: "Fit Profile", value: "Regular modern athletic cut with comfort shoulder seams" },
      {
        label: "Sleeve Detailing",
        value: "Engineered dual contrast sports bands knit onto outer arms",
      },
      { label: "Neckline", value: "Double-needle ribbed crew collar with shape memory" },
      { label: "Finishing", value: "Enzyme washed for pre-shrunk reliability and satin touch" },
      { label: "Origin", value: "Ethically constructed in Lima, Peru" },
    ],
    highlights: [
      {
        icon: Sparkles,
        title: "Athletic Striping",
        description: "Precision-placed sleeve bands offer a sharp varsity streetwear silhouette.",
      },
      {
        icon: Feather,
        title: "Silky Softness",
        description: "Organic combed cotton fibres remove impurities for non-scratch comfort.",
      },
      {
        icon: ShieldCheck,
        title: "Neck Ribbing",
        description: "High-density knit rib keeps neckline sitting flat against collarbone.",
      },
      {
        icon: RefreshCw,
        title: "Color Fastness",
        description: "Garment dipped in eco-conscious dye baths that will not bleed.",
      },
    ],
  },
  "vertical-striped-shirt": {
    specs: [
      { label: "Material Composition", value: "70% European Flax Linen, 30% Long-Staple Cotton" },
      { label: "Fabric Density", value: "160 GSM Breathable slub texture resort weave" },
      { label: "Fit Profile", value: "Relaxed easy resort drape with straight vented hem" },
      {
        label: "Collar & Placket",
        value: "Cuban camp open notch collar with seamless French front",
      },
      { label: "Buttons", value: "Natural carved mother-of-pearl buttons" },
      { label: "Finishing", value: "Pre-washed for airy texture and zero initial stiffness" },
      { label: "Origin", value: "Constructed in Valencia, Spain" },
    ],
    highlights: [
      {
        icon: Sun,
        title: "Linen-Cotton Blend",
        description:
          "Combines the lightweight cooling breathability of linen with cotton's soft drape.",
      },
      {
        icon: Feather,
        title: "Camp Collar Style",
        description: "Casual open Cuban notch collar designed for breezy warm-weather elegance.",
      },
      {
        icon: RefreshCw,
        title: "Slub Texture",
        description: "Natural yarn variations lend depth and effortless Mediterranean character.",
      },
      {
        icon: ShieldCheck,
        title: "Split Back Yoke",
        description: "Tailored shoulder yoke ensures comfort across back while seated.",
      },
    ],
  },
  "courage-graphic-t-shirt": {
    specs: [
      { label: "Material Composition", value: "100% Heavyweight Open-End Organic Cotton" },
      { label: "Fabric Density", value: "230 GSM Dry-hand vintage jersey" },
      { label: "Fit Profile", value: "Oversized retro streetwear box cut with dropped shoulders" },
      {
        label: "Graphic Artwork",
        value: "Crack-resistant tactile puff typography on center chest",
      },
      { label: "Dye Process", value: "Pigment garment-dyed terracotta for authentic washed look" },
      {
        label: "Construction",
        value: "Seamless tubular body with double-stitched sleeves and hem",
      },
      { label: "Origin", value: "Crafted in Seoul, South Korea" },
    ],
    highlights: [
      {
        icon: Sparkles,
        title: "Tactile Puff Print",
        description: "Subtle 3D textured typography stands out from ordinary flat screenprints.",
      },
      {
        icon: Layers,
        title: "Pigment Wash Fade",
        description: "Specially weathered dye develops unique personal character as you wear it.",
      },
      {
        icon: ShieldCheck,
        title: "Heavyweight Jersey",
        description: "Substantial 230 GSM fabric drapes structurally without clinging.",
      },
      {
        icon: Feather,
        title: "Seamless Torso",
        description: "Tubular construction eliminates side seams for zero friction against skin.",
      },
    ],
  },
  "loose-fit-bermuda-shorts": {
    specs: [
      { label: "Material Composition", value: "100% Cotton Indigo Denim Twill" },
      { label: "Denim Weight", value: "9.5 oz Summer-weight durable non-stretch denim" },
      { label: "Fit Profile", value: "Relaxed loose silhouette resting naturally at the kneecap" },
      { label: "Pockets", value: "Dual deep front slash pockets and reinforced rear welt pockets" },
      {
        label: "Waist & Fly",
        value: "Structured waistband with sturdy belt loops and YKK brass fly",
      },
      { label: "Wash", value: "Vintage light enzyme wash with subtle seam abrasion" },
      { label: "Origin", value: "Constructed in Casablanca, Morocco" },
    ],
    highlights: [
      {
        icon: Activity,
        title: "Loose Knee-Length",
        description: "Generous leg opening promotes unrestricted ventilation for hot days.",
      },
      {
        icon: ShieldCheck,
        title: "Rugged Cotton Twill",
        description: "Authentic non-stretch denim built to withstand daily skate and street wear.",
      },
      {
        icon: Layers,
        title: "Deep Pockets",
        description: "Oversized front slash pockets securely hold phone, keys, and wallet.",
      },
      {
        icon: RefreshCw,
        title: "Natural Fading",
        description: "Enzyme washed denim softens with each wash while holding its shape.",
      },
    ],
  },
  "faded-skinny-jeans": {
    specs: [
      { label: "Material Composition", value: "99% Ring-Spun Cotton, 1% Comfort Spandex" },
      { label: "Denim Weight", value: "11.5 oz Flexible Italian Stretch Denim" },
      {
        label: "Fit Profile",
        value: "Tailored skinny fit with tapered leg and snug ankle opening",
      },
      {
        label: "Finish Treatment",
        value: "Acid wash stone fade with hand-abraded knee distressing",
      },
      { label: "Hardware", value: "Matte gunmetal zipper fly and branded rivet hardware" },
      { label: "Pockets", value: "5-pocket construction with bar-tack reinforced strain points" },
      { label: "Origin", value: "Crafted in Istanbul, Turkey" },
    ],
    highlights: [
      {
        icon: Sparkles,
        title: "Acid Wash Patina",
        description: "Dimensional stone fading creates high-contrast light and dark highs.",
      },
      {
        icon: Activity,
        title: "Comfort Stretch",
        description: "Subtle spandex provides effortless flex without ever stretching out.",
      },
      {
        icon: ShieldCheck,
        title: "Reinforced Knees",
        description: "Distressed knee accents are under-stitched to maintain longevity.",
      },
      {
        icon: Feather,
        title: "Broken-in Feel",
        description: "Enzyme washed to give day-one softness straight out of the box.",
      },
    ],
  },
  "t-shirt-tape-details": {
    specs: [
      { label: "Material Composition", value: "100% Mercerized Egyptian Giza Cotton" },
      { label: "Fabric Density", value: "220 GSM High-luster compact jersey" },
      { label: "Fit Profile", value: "Contemporary slim-regular cut with clean shoulder lines" },
      {
        label: "Tape Detailing",
        value: "Tonal woven herringbone tape across shoulders and side vents",
      },
      { label: "Neckline", value: "Micro-ribbed crew collar with internal satin comfort binding" },
      { label: "Finishing", value: "Double mercerized for brilliant color luster and zero fuzz" },
      { label: "Origin", value: "Constructed in Porto, Portugal" },
    ],
    highlights: [
      {
        icon: Sparkles,
        title: "Mercerized Luster",
        description: "Specialized caustic bath gives cotton fibres a luxurious, silk-like sheen.",
      },
      {
        icon: Layers,
        title: "Architectural Tape",
        description: "Durable woven tape stabilizes shoulder seams and prevents stretching.",
      },
      {
        icon: Feather,
        title: "Featherlight Touch",
        description: "Long-staple Egyptian cotton glides against skin without bulk.",
      },
      {
        icon: ShieldCheck,
        title: "Anti-Pilling Finish",
        description: "Combed fibres eliminate short yarns, resisting pilling wash after wash.",
      },
    ],
  },
  "polo-contrast-trims": {
    specs: [
      { label: "Material Composition", value: "95% Combed Cotton Micro-Piqué, 5% Elastane" },
      { label: "Fabric Density", value: "215 GSM Ultra-fine stretch piqué knit" },
      { label: "Fit Profile", value: "Athletic streamlined contour with side vents" },
      { label: "Collar & Trims", value: "Contrast two-tone knit collar and arm cuffs" },
      { label: "Placket", value: "Clean 3-button hidden placket with dyed-to-match buttons" },
      { label: "Finishing", value: "Silicone wash for fluid drape and movement" },
      { label: "Origin", value: "Crafted in Milan, Italy" },
    ],
    highlights: [
      {
        icon: Activity,
        title: "360° Movement",
        description: "Integrated elastane flex ensures full range of motion for golf or city life.",
      },
      {
        icon: ShieldCheck,
        title: "Contrast Collar",
        description: "Structured collar stands upright without curling under jacket lapels.",
      },
      {
        icon: Feather,
        title: "Micro-Piqué Airflow",
        description: "Fine honeycomb texture encourages body moisture evaporation.",
      },
      {
        icon: RefreshCw,
        title: "Color Preservation",
        description: "High-density reactive dye keeps contrast trims crisp and defined.",
      },
    ],
  },
  "one-life-graphic-t-shirt": {
    specs: [
      { label: "Material Composition", value: "100% Combed Heavyweight Organic Cotton" },
      { label: "Fabric Density", value: "240 GSM (Substantial luxury drape)" },
      { label: "Fit Profile", value: "Relaxed contemporary fit with drop shoulder geometry" },
      { label: "Collar & Hem", value: "1x1 ribbed crew collar with double-needle topstitching" },
      {
        label: "Graphic Print Technique",
        value: "Eco-friendly high-density water-based screen print",
      },
      { label: "Pre-Treatment", value: "Pre-shrunk and silicone washed for ultra-soft hand feel" },
      { label: "Origin", value: "Ethically spun and constructed in Porto, Portugal" },
    ],
    highlights: [
      {
        icon: Feather,
        title: "Breathable & Soft",
        description: "Premium long-staple cotton ensures supreme airflow and all-day skin comfort.",
      },
      {
        icon: ShieldCheck,
        title: "Shape Retention",
        description:
          "Ribbed neckline reinforced with elastane to prevent sagging after repeated wash cycles.",
      },
      {
        icon: Sparkles,
        title: "Color Vibrancy",
        description:
          "Reactive dye methods resist fading, maintaining deep contrast wear after wear.",
      },
      {
        icon: RefreshCw,
        title: "Sustainable Craft",
        description:
          "OEKO-TEX® Standard 100 certified non-toxic inks and zero hazardous chemicals.",
      },
    ],
  },
};

export function getProductSpecs(
  productId: string,
  category?: string,
  title?: string
): ProductSpecConfig {
  if (CATALOG_PRODUCT_SPECS[productId]) {
    return CATALOG_PRODUCT_SPECS[productId];
  }

  // Fallback based on category
  const cat = (category || "").toLowerCase();
  if (cat.includes("jean")) {
    return CATALOG_PRODUCT_SPECS["skinny-fit-jeans"];
  }
  if (cat.includes("short")) {
    return CATALOG_PRODUCT_SPECS["loose-fit-bermuda-shorts"];
  }
  if (cat.includes("shirt") && !cat.includes("t-shirt")) {
    return CATALOG_PRODUCT_SPECS["checkered-shirt"];
  }
  if (title?.toLowerCase().includes("polo")) {
    return CATALOG_PRODUCT_SPECS["polo-tipping-details"];
  }

  return CATALOG_PRODUCT_SPECS["one-life-graphic-t-shirt"];
}

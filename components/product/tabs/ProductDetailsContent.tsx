import * as React from "react";
import { Check, ShieldCheck, Sparkles, Feather, RefreshCw } from "lucide-react";
import type { ProductDetail } from "@/types/product";

interface ProductDetailsContentProps {
  product: ProductDetail;
}

export function ProductDetailsContent({ product }: ProductDetailsContentProps) {
  const specs = [
    { label: "Material Composition", value: "100% Combed Heavyweight Organic Cotton" },
    { label: "Fabric Density", value: "240 GSM (Substantial, non-sheer luxury drape)" },
    { label: "Fit Profile", value: "Relaxed contemporary fit with drop shoulder geometry" },
    { label: "Collar & Hem", value: "1x1 ribbed crew collar with double-needle topstitching" },
    {
      label: "Graphic Print Technique",
      value: "Eco-friendly high-density water-based screen print",
    },
    { label: "Pre-Treatment", value: "Pre-shrunk and silicone washed for ultra-soft hand feel" },
    { label: "Origin", value: "Ethically spun and constructed in Porto, Portugal" },
  ];

  const highlights = [
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
      description: "Reactive dye methods resist fading, maintaining deep contrast wear after wear.",
    },
    {
      icon: RefreshCw,
      title: "Sustainable Craft",
      description: "OEKO-TEX® Standard 100 certified non-toxic inks and zero hazardous chemicals.",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-8 sm:gap-10 lg:gap-12" data-product-details-tab>
      {/* Overview Description */}
      <div className="flex flex-col gap-3">
        <h3 className="font-heading font-black text-xl sm:text-2xl text-foreground uppercase tracking-tight">
          Product Specifications
        </h3>
        <p className="text-sm sm:text-base text-foreground/70 leading-relaxed font-sans max-w-3xl">
          {product.description} Every element of our {product.title.toLowerCase()} has been
          engineered for effortless versatility, combining architectural tailoring with raw
          streetwear sensibility.
        </p>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {highlights.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="rounded-[20px] border border-black/10 dark:border-white/10 p-5 sm:p-6 bg-card text-card-foreground flex flex-col gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-foreground font-sans">{item.title}</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Technical Specifications Table */}
      <div className="rounded-[20px] border border-black/10 dark:border-white/10 overflow-hidden bg-card">
        <div className="px-6 py-4 bg-muted/40 border-b border-black/10 dark:border-white/10">
          <h4 className="font-bold text-base text-foreground uppercase tracking-wide font-sans">
            Fabric & Construction Details
          </h4>
        </div>
        <dl className="divide-y divide-black/10 dark:divide-white/10">
          {specs.map((spec, idx) => (
            <div
              key={idx}
              className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 hover:bg-muted/15 transition-colors"
            >
              <dt className="text-xs sm:text-sm font-medium text-muted-foreground sm:w-1/3">
                {spec.label}
              </dt>
              <dd className="text-xs sm:text-sm font-semibold text-foreground sm:w-2/3">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Care Instructions */}
      <div className="rounded-[20px] border border-black/10 dark:border-white/10 p-6 sm:p-8 bg-card flex flex-col gap-4">
        <h4 className="font-bold text-base sm:text-lg text-foreground uppercase tracking-wide font-sans">
          Garment Care Instructions
        </h4>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-foreground/80">
          <li className="flex items-center gap-2.5">
            <Check className="w-4 h-4 text-[#01AB31] shrink-0" />
            <span>Machine wash cold (30°C / 85°F) with like colors</span>
          </li>
          <li className="flex items-center gap-2.5">
            <Check className="w-4 h-4 text-[#01AB31] shrink-0" />
            <span>Turn inside out before washing to protect graphic vibrancy</span>
          </li>
          <li className="flex items-center gap-2.5">
            <Check className="w-4 h-4 text-[#01AB31] shrink-0" />
            <span>Hang dry or tumble dry low; do not wring dry</span>
          </li>
          <li className="flex items-center gap-2.5">
            <Check className="w-4 h-4 text-[#01AB31] shrink-0" />
            <span>Warm iron if needed; avoid direct ironing over printed artwork</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

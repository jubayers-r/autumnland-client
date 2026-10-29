import { HeroSection } from "@/components/home/HeroSection";
import { BrandBanner } from "@/components/home/BrandBanner";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col w-full bg-background text-foreground">
      <HeroSection />
      <BrandBanner />
      <TestimonialsSection />
    </main>
  );
}

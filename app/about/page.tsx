import type { Metadata } from "next";
import { UnderDevelopmentView } from "@/components/common/UnderDevelopmentView";

export const metadata: Metadata = {
  title: "About Us | AUTUMN LAND",
  description: "Learn more about AUTUMN LAND and our vision for modern style.",
};

export default function AboutPage() {
  return (
    <UnderDevelopmentView
      pageName="About AUTUMN LAND"
      description="Our brand story, design philosophy, and craftsmanship journey are being curated. Discover our current collections in the shop."
    />
  );
}

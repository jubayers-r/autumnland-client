import type { Metadata } from "next";
import { UnderDevelopmentView } from "@/components/common/UnderDevelopmentView";

export const metadata: Metadata = {
  title: "Features | AUTUMN LAND",
  description: "Explore unique fashion features and customer benefits.",
};

export default function FeaturesPage() {
  return (
    <UnderDevelopmentView
      pageName="Features"
      description="We are preparing an overview of our custom fitting technology, premium fabric standards, and sustainable tailoring."
    />
  );
}

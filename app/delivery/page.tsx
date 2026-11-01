import type { Metadata } from "next";
import { UnderDevelopmentView } from "@/components/common/UnderDevelopmentView";

export const metadata: Metadata = {
  title: "Delivery Details | AUTUMN LAND",
  description: "Learn about our worldwide shipping, handling, and delivery timelines.",
};

export default function DeliveryPage() {
  return (
    <UnderDevelopmentView
      pageName="Delivery Details"
      description="Detailed courier partnerships, express shipping rates, and delivery estimates will be published shortly."
    />
  );
}

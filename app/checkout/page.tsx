import type { Metadata } from "next";
import { UnderDevelopmentView } from "@/components/common/UnderDevelopmentView";

export const metadata: Metadata = {
  title: "Checkout | AUTUMN LAND",
  description: "Complete your AUTUMN LAND apparel purchase.",
};

export default function CheckoutPage() {
  return (
    <UnderDevelopmentView
      pageName="Checkout Portal"
      description="The live payment checkout integration is being connected to the secure payment gateway. Thank you for testing AUTUMN LAND!"
    />
  );
}

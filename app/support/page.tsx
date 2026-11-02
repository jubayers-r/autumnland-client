import type { Metadata } from "next";
import { UnderDevelopmentView } from "@/components/common/UnderDevelopmentView";

export const metadata: Metadata = {
  title: "Customer Support | AUTUMN LAND",
  description: "Get assistance from our customer care and support team.",
};

export default function SupportPage() {
  return (
    <UnderDevelopmentView
      pageName="Customer Support"
      description="Our 24/7 dedicated support desk and live chat system are currently being integrated to serve you better."
    />
  );
}

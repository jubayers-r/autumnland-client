import type { Metadata } from "next";
import { UnderDevelopmentView } from "@/components/common/UnderDevelopmentView";

export const metadata: Metadata = {
  title: "My Orders | AUTUMN LAND",
  description: "Review order histories, status updates, and digital receipts.",
};

export default function OrdersPage() {
  return (
    <UnderDevelopmentView
      pageName="My Orders"
      description="Order tracking, past receipt archives, and return requests will be available when the order portal launches."
    />
  );
}

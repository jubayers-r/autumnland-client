import type { Metadata } from "next";
import { UnderDevelopmentView } from "@/components/common/UnderDevelopmentView";

export const metadata: Metadata = {
  title: "Manage Deliveries | AUTUMN LAND",
  description: "Track and manage your order deliveries and shipments.",
};

export default function DeliveriesPage() {
  return (
    <UnderDevelopmentView
      pageName="Manage Deliveries"
      description="Real-time shipment tracking and delivery re-scheduling will soon be accessible directly through your order ID."
    />
  );
}

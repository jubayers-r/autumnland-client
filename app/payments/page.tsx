import type { Metadata } from "next";
import { UnderDevelopmentView } from "@/components/common/UnderDevelopmentView";

export const metadata: Metadata = {
  title: "Payments & Invoicing | AUTUMN LAND",
  description: "View saved payment options and transaction receipts.",
};

export default function PaymentsPage() {
  return (
    <UnderDevelopmentView
      pageName="Payments & Invoicing"
      description="Manage payment methods, review digital invoice statements, and setup express checkout with card tokens."
    />
  );
}

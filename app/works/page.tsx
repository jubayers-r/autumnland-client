import type { Metadata } from "next";
import { UnderDevelopmentView } from "@/components/common/UnderDevelopmentView";

export const metadata: Metadata = {
  title: "Works & Portfolios | AUTUMN LAND",
  description: "View our collaborations and seasonal collections.",
};

export default function WorksPage() {
  return (
    <UnderDevelopmentView
      pageName="Works & Lookbooks"
      description="Seasonal lookbooks and creative designer showcases are on the way. Browse our active shop to see our latest arrivals."
    />
  );
}

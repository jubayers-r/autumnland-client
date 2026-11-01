import type { Metadata } from "next";
import { UnderDevelopmentView } from "@/components/common/UnderDevelopmentView";

export const metadata: Metadata = {
  title: "My Account | AUTUMN LAND",
  description: "Manage your personal profile, addresses, and customer preferences.",
};

export default function AccountPage() {
  return (
    <UnderDevelopmentView
      pageName="My Account"
      description="Your personalized customer dashboard, saved addresses, and profile settings are under construction."
    />
  );
}

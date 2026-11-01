import type { Metadata } from "next";
import { UnderDevelopmentView } from "@/components/common/UnderDevelopmentView";

export const metadata: Metadata = {
  title: "Create Account | AUTUMN LAND",
  description: "Register for an exclusive AUTUMN LAND membership.",
};

export default function RegisterPage() {
  return (
    <UnderDevelopmentView
      pageName="Create Account"
      description="Member sign up with exclusive 20% off perks is coming soon. In the meantime, explore our newest fashion drops in the shop!"
    />
  );
}

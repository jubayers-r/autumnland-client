import type { Metadata } from "next";
import { UnderDevelopmentView } from "@/components/common/UnderDevelopmentView";

export const metadata: Metadata = {
  title: "Privacy Policy | AUTUMN LAND",
  description: "Read how AUTUMN LAND protects and respects your customer privacy.",
};

export default function PrivacyPage() {
  return (
    <UnderDevelopmentView
      pageName="Privacy Policy"
      description="We take data security seriously. Our comprehensive privacy commitment and transparent cookie guidance will be available shortly."
    />
  );
}

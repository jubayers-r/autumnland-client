import type { Metadata } from "next";
import { UnderDevelopmentView } from "@/components/common/UnderDevelopmentView";

export const metadata: Metadata = {
  title: "Terms & Conditions | AUTUMN LAND",
  description: "Read our official store terms of service and purchase conditions.",
};

export default function TermsPage() {
  return (
    <UnderDevelopmentView
      pageName="Terms & Conditions"
      description="Our updated commercial purchase policies and service agreements are currently under legal review and will be posted soon."
    />
  );
}

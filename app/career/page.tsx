import type { Metadata } from "next";
import { UnderDevelopmentView } from "@/components/common/UnderDevelopmentView";

export const metadata: Metadata = {
  title: "Careers | AUTUMN LAND",
  description: "Join the team shaping the future of contemporary fashion.",
};

export default function CareerPage() {
  return (
    <UnderDevelopmentView
      pageName="Careers at AUTUMN LAND"
      description="We are always looking for passionate designers, developers, and stylists. Our careers portal and job openings will launch soon!"
    />
  );
}

import type { Metadata } from "next";
import { UnderDevelopmentView } from "@/components/common/UnderDevelopmentView";

export const metadata: Metadata = {
  title: "Account Login | AUTUMN LAND",
  description: "Sign in to your AUTUMN LAND customer account.",
};

export default function LoginPage() {
  return (
    <UnderDevelopmentView
      pageName="Account Login"
      description="Our secure authentication portal is currently being finalized. You can continue shopping our collections as a guest."
    />
  );
}

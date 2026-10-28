"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function ToastTrigger() {
  return (
    <Button
      variant="default"
      className="w-full gap-2 cursor-pointer"
      onClick={() =>
        toast.success("Template is operational!", {
          description: "Next.js 16.4.3, React 19, Tailwind v4, and shadcn are ready to build.",
        })
      }
    >
      <Sparkles className="h-4 w-4" />
      Test Toast Notification
    </Button>
  );
}

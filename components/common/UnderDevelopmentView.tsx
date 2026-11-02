import Link from "next/link";
import { ArrowLeft, Clock, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { renderHeadingText } from "@/lib/utils";

interface UnderDevelopmentViewProps {
  pageName: string;
  description?: string;
}

export function UnderDevelopmentView({
  pageName,
  description = "This page is currently being designed and crafted with care to bring you the best experience. Stay tuned—it will be available soon!",
}: UnderDevelopmentViewProps) {
  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center px-4 py-16 text-center">
      {/* Pill badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/10 text-xs font-semibold tracking-wide uppercase text-foreground mb-6 border border-border">
        <Clock className="w-3.5 h-3.5 text-black/60 dark:text-white/60" />
        <span>Under Development</span>
      </div>

      {/* Main heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight uppercase max-w-xl text-foreground">
        {renderHeadingText(pageName)}
      </h1>

      <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
        {description}
      </p>

      {/* Action buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        <Button
          asChild
          className="w-full sm:w-auto h-12 rounded-full px-7 font-medium text-sm shadow-xs"
        >
          <Link href="/shop" className="inline-flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            <span>Explore Shop</span>
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="w-full sm:w-auto h-12 rounded-full px-6 font-medium text-sm"
        >
          <Link href="/" className="inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}

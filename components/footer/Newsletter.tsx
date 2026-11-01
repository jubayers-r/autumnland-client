"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface NewsletterProps {
  className?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Newsletter({ className }: NewsletterProps) {
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      toast.error("Please enter your email address.");
      return;
    }

    if (!EMAIL_REGEX.test(trimmed)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate newsletter subscription delay
      await new Promise((resolve) => setTimeout(resolve, 600));
      toast.success("Thank you for subscribing to our latest offers!");
      setEmail("");
    } catch {
      toast.error("Failed to subscribe. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      aria-label="Newsletter Subscription"
      className={cn(
        "w-full bg-black text-white rounded-[20px] sm:rounded-[24px] px-6 py-8 sm:px-10 sm:py-9 lg:px-16 lg:py-10",
        className
      )}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7 lg:gap-12">
        {/* Left Heading */}
        <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-[40px] leading-[1.08] tracking-tight uppercase max-w-[550px] text-white">
          STAY UPTO DATE ABOUT OUR LATEST OFFERS
        </h2>

        {/* Right Form: Pill Input & Pill Submit Button */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-3.5 w-full lg:w-[350px] shrink-0"
        >
          <div className="relative flex items-center w-full">
            <label htmlFor="newsletter-email" className="sr-only">
              Email Address
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              autoComplete="email"
              disabled={isSubmitting}
              className="w-full bg-white text-black placeholder:text-neutral-400 text-sm sm:text-base rounded-full px-5 py-3 sm:py-3.5 text-center placeholder:text-center focus:outline-none focus:ring-2 focus:ring-white/50 transition-all font-sans"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-black font-medium text-sm sm:text-base rounded-full py-3 sm:py-3.5 text-center hover:bg-neutral-100 active:scale-[0.99] transition-all cursor-pointer font-sans disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Subscribing...</span>
              </>
            ) : (
              "Subscribe to Newsletter"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

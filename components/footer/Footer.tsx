import * as React from "react";
import Link from "next/link";
import { Newsletter } from "./Newsletter";
import { SocialLinks } from "./SocialLinks";
import { PaymentBadges } from "./PaymentBadges";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
  showNewsletter?: boolean;
}

const NAV_COLUMNS = [
  {
    title: "COMPANY",
    links: [
      { label: "About", href: "/about" },
      { label: "Features", href: "/features" },
      { label: "Works", href: "/works" },
      { label: "Career", href: "/career" },
    ],
  },
  {
    title: "HELP",
    links: [
      { label: "Customer Support", href: "/support" },
      { label: "Delivery Details", href: "/delivery" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    title: "FAQ",
    links: [
      { label: "Account", href: "/account" },
      { label: "Manage Deliveries", href: "/deliveries" },
      { label: "Orders", href: "/orders" },
      { label: "Payments", href: "/payments" },
    ],
  },
];

export function Footer({ className, showNewsletter = true }: FooterProps) {
  return (
    <footer
      aria-label="Site Footer"
      className={cn(
        "w-full relative text-foreground transition-colors",
        showNewsletter ? "mt-24 sm:mt-32 lg:mt-36" : "mt-12 sm:mt-16",
        className
      )}
    >
      {/* Background container covering from the middle of the newsletter downward */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 bg-[#F0F0F0] dark:bg-card -z-10",
          showNewsletter ? "top-36 sm:top-32 lg:top-24" : "top-0"
        )}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Floating Overlapping Newsletter Banner */}
        {showNewsletter && (
          <div className="mb-10 sm:mb-12 lg:mb-14">
            <Newsletter />
          </div>
        )}

        {/* Main Footer Navigation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 pt-2 sm:pt-4">
          {/* Brand Column */}
          <div className="flex flex-col lg:col-span-4 xl:col-span-4 text-left">
            <Link
              href="/"
              className="font-heading font-black text-2xl sm:text-3xl lg:text-[33px] xl:text-[35px] tracking-normal uppercase select-none text-foreground inline-block"
            >
              AUTUMN LAND
            </Link>

            <p className="mt-3.5 sm:mt-4 lg:mt-6 text-sm text-black/75 dark:text-neutral-300 leading-[22px] max-w-sm sm:max-w-md lg:max-w-[248px] font-sans">
              We have clothes that suits your style and which you&apos;re proud to wear. From women
              to men.
            </p>

            <div className="mt-5 sm:mt-6 lg:mt-7">
              <SocialLinks />
            </div>
          </div>

          {/* Links & Contact Columns (2x2 on Mobile, 4 columns on Desktop) */}
          <div className="lg:col-span-8 xl:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {NAV_COLUMNS.map((column) => (
              <div key={column.title} className="flex flex-col text-left">
                <h3 className="font-sans font-medium text-sm sm:text-base tracking-[0.18em] uppercase text-foreground mb-4 sm:mb-5">
                  {column.title}
                </h3>
                <ul className="flex flex-col gap-2.5 sm:gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm sm:text-base text-black/75 dark:text-neutral-300 hover:text-foreground transition-colors font-sans"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* STAY CONNECTED Column */}
            <div className="flex flex-col text-left">
              <h3 className="font-sans font-medium text-sm sm:text-base tracking-[0.18em] uppercase text-foreground mb-4 sm:mb-5">
                STAY CONNECTED
              </h3>
              <div className="flex flex-col text-sm sm:text-base text-black/75 dark:text-neutral-300 font-sans">
                <span className="font-semibold text-foreground mb-1">Autumn Land</span>
                <p className="leading-relaxed">
                  Head Office: 2nd Floor
                  <br />
                  Habibullah Tower,
                  <br />
                  Siddhirganj, Narayanganj
                </p>
                <p className="mt-3 font-medium text-foreground">Phone: +88018********</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-black/10 dark:bg-border my-8 sm:my-10" />

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 sm:pb-12 text-center sm:text-left">
          <p className="text-xs sm:text-sm text-black/75 dark:text-neutral-300 font-sans">
            Autumn Land © 2020-2026, All Rights Reserved
          </p>

          <PaymentBadges />
        </div>
      </div>
    </footer>
  );
}

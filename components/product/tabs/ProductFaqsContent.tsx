import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProductFaqsContentProps {
  productTitle: string;
}

const FAQS_DATA = [
  {
    question: "What is the sizing and fit profile of this product?",
    answer:
      "This piece features a contemporary relaxed cut with balanced shoulder drop. We recommend selecting your standard size for a relaxed streetwear silhouette. If you prefer a more tailored, traditional fit, order one size down.",
  },
  {
    question: "How should I wash and care for the printed graphic?",
    answer:
      "Always wash inside out in cold water (maximum 30°C / 85°F) using gentle detergent. We recommend line-drying away from direct harsh sunlight or tumble drying on low heat. Never iron directly across the artwork surface.",
  },
  {
    question: "What materials are used, and is this item pre-shrunk?",
    answer:
      "Yes, all Autumn Land cotton garments undergo specialized pre-shrinking and silicone washing. They are cut from 100% long-staple organic cotton (240 GSM) certified under OEKO-TEX® Standard 100.",
  },
  {
    question: "What is the return and exchange window?",
    answer:
      "We offer a 30-day worldwide hassle-free return and exchange policy. Garments must be unworn, unwashed, and returned in their original packaging with all designer tags attached.",
  },
  {
    question: "How fast is shipping and order dispatch?",
    answer:
      "Orders placed before 2:00 PM EST ship the same business day. Standard domestic delivery arrives in 3-5 business days. International express transit takes 4-7 business days with full door-to-door tracking.",
  },
  {
    question: "Can I cancel or modify my order after placing it?",
    answer:
      "Because our logistics team processes orders swiftly, you have a 1-hour window after checkout to request edits or cancellations via your account dashboard or customer support chat.",
  },
];

export function ProductFaqsContent({ productTitle }: ProductFaqsContentProps) {
  return (
    <div className="w-full flex flex-col gap-6 sm:gap-8 select-none" data-faqs-tab>
      <div className="flex flex-col gap-2">
        <h3 className="font-heading font-black text-xl sm:text-2xl text-foreground uppercase tracking-tight">
          Frequently Asked Questions
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Find answers about sizing, care, shipping, and warranty for {productTitle}.
        </p>
      </div>

      <Accordion
        type="single"
        collapsible
        defaultValue="item-0"
        className="w-full flex flex-col gap-3"
      >
        {FAQS_DATA.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="rounded-[20px] border border-black/10 dark:border-white/10 px-5 sm:px-6 bg-card text-card-foreground overflow-hidden"
          >
            <AccordionTrigger className="text-sm sm:text-base font-semibold py-4 sm:py-5 hover:no-underline text-foreground">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-xs sm:text-sm text-foreground/70 leading-relaxed pb-5 sm:pb-6 font-sans">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

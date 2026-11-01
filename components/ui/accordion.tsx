"use client";

import * as React from "react";
import * as AccordionPrimitive from "radix-ui";
import { cn } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "lucide-react";

function Accordion({ ...props }: React.ComponentProps<typeof AccordionPrimitive.Accordion.Root>) {
  return <AccordionPrimitive.Accordion.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Accordion.Item>) {
  return (
    <AccordionPrimitive.Accordion.Item
      data-slot="accordion-item"
      className={cn("group", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Accordion.Trigger>) {
  return (
    <AccordionPrimitive.Accordion.Header className="flex">
      <AccordionPrimitive.Accordion.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-center justify-between gap-4 py-4 text-left text-sm sm:text-base font-medium transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:rounded-md disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none text-foreground",
          className
        )}
        {...props}
      >
        <span className="flex-1">{children}</span>

        {/* Icons that react to the parent .group[data-state] */}
        <span className="relative w-7 h-7 shrink-0 flex items-center justify-center">
          <PlusIcon className="absolute inset-0 h-7 w-7 group-data-[state=open]:hidden bg-primary text-primary-foreground rounded-full p-1.5 transition-transform" />
          <MinusIcon className="absolute inset-0 h-7 w-7 hidden group-data-[state=open]:block bg-primary text-primary-foreground rounded-full p-1.5 transition-transform" />
        </span>
      </AccordionPrimitive.Accordion.Trigger>
    </AccordionPrimitive.Accordion.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Accordion.Content>) {
  return (
    <AccordionPrimitive.Accordion.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4 text-muted-foreground", className)}>{children}</div>
    </AccordionPrimitive.Accordion.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

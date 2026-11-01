"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4 text-foreground" />,
        info: <InfoIcon className="size-4 text-foreground" />,
        warning: <TriangleAlertIcon className="size-4 text-foreground" />,
        error: <OctagonXIcon className="size-4 text-foreground" />,
        loading: <Loader2Icon className="size-4 animate-spin text-foreground" />,
      }}
      style={
        {
          "--normal-bg": "var(--background)",
          "--normal-text": "var(--foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "16px",
        } as React.CSSProperties
      }
      toastOptions={{
        actionButtonStyle: {
          backgroundColor: "var(--foreground)",
          color: "var(--background)",
          height: "36px",
          minHeight: "36px",
          paddingLeft: "16px",
          paddingRight: "16px",
          borderRadius: "9999px",
          fontWeight: "600",
          fontSize: "13px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          border: "none",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        },
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-[16px] font-sans p-4",
          description: "group-[.toast]:text-muted-foreground font-sans text-xs sm:text-sm",
          actionButton:
            "!h-9 !px-4 !rounded-full !bg-black !text-white dark:!bg-white dark:!text-black hover:opacity-85 font-medium text-xs sm:text-sm cursor-pointer shadow-xs shrink-0 transition-opacity",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-full",
          closeButton:
            "group-[.toast]:border-border group-[.toast]:bg-background group-[.toast]:text-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

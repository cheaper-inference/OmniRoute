"use client";

import { Badge as KitBadge } from "@omniroute/ui-kit/badge";
import { cn } from "@/shared/utils/cn";
import Icon from "./Icon";

// Kit Badge variants are default/secondary/destructive/outline/live; OmniRoute's status
// variants are an outline kit badge with a `data-tone` (globals.css → "Badge status tones").
const TONES = {
  default: null,
  primary: "primary",
  success: "success",
  warning: "warning",
  error: "danger",
  info: "info",
} as const;
// Tailwind utilities win over kit components (layer order), so sizes stay utilities.
const SIZES = { sm: "text-[10px] px-2 py-0.5", md: "", lg: "text-sm px-3 py-1.5" } as const;

interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  children?: React.ReactNode;
  variant?: keyof typeof TONES;
  size?: keyof typeof SIZES;
  dot?: boolean;
  /** Material Symbols name (rendered through <Icon>) or any node. */
  icon?: React.ReactNode;
  className?: string;
}

/** Badge — adapter over the kit Badge (pill shape, like the legacy badge). */
export default function Badge({
  children,
  variant = "default",
  size = "md",
  dot = false,
  icon,
  className,
  ...props
}: BadgeProps) {
  const tone = TONES[variant] ?? null;
  return (
    <KitBadge
      {...props}
      variant={tone ? "outline" : "secondary"}
      shape="pill"
      data-tone={tone ?? undefined}
      icon={typeof icon === "string" ? <Icon name={icon} size={14} /> : icon}
      className={cn(SIZES[size], className)}
    >
      {dot && (
        <span
          aria-hidden="true"
          className="oi-badge-dot inline-block size-1.5 rounded-full bg-current"
        />
      )}
      {children}
    </KitBadge>
  );
}

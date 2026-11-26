"use client";

import { Badge as KitBadge, type BadgeChartTone } from "@omniroute/ui-kit/badge";
import { cn } from "@/shared/utils/cn";
import Icon from "./Icon";

// OmniRoute's status variants are kit tones on the borderless `secondary` badge.
const TONES = {
  default: null,
  primary: "accent",
  success: "success",
  warning: "warning",
  error: "danger",
  info: "info",
} as const;
// `sm` and `md` are the kit's own sizes (20px and 24px tall, both with 12px text). The kit has
// no large badge, so `lg` stays a utility override (utilities win over kit components).
const SIZES = {
  sm: { kit: "sm", className: "" },
  md: { kit: "md", className: "" },
  lg: { kit: "md", className: "text-sm px-3 py-1.5" },
} as const;

interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  children?: React.ReactNode;
  variant?: keyof typeof TONES;
  size?: keyof typeof SIZES;
  /**
   * Kit chart-series colour (`chart-1`…`chart-8`), for a badge that names a series drawn in a
   * chart. It replaces the variant's tone.
   */
  tone?: BadgeChartTone;
  dot?: boolean;
  /** ICON_MAP name (rendered through <Icon>) or any node. */
  icon?: React.ReactNode;
  className?: string;
}

/** Badge — adapter over the kit Badge (pill shape, like the legacy badge). */
export default function Badge({
  children,
  variant = "default",
  size = "md",
  tone,
  dot = false,
  icon,
  className,
  ...props
}: BadgeProps) {
  const kitSize = SIZES[size] ?? SIZES.md;
  return (
    <KitBadge
      {...props}
      variant="secondary"
      shape="pill"
      size={kitSize.kit}
      tone={tone ?? TONES[variant] ?? undefined}
      icon={typeof icon === "string" ? <Icon name={icon} size={14} /> : icon}
      className={cn(kitSize.className, className)}
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

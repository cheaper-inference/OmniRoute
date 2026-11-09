import type { ReactNode } from "react";
import { Badge as KitBadge } from "@omniroute/ui-kit/badge";
import Icon from "@/shared/components/Icon";
import { cn } from "@/shared/utils/cn";

interface CapabilityBadgeProps {
  /** Material Symbols name shown before the label (rendered through <Icon>). */
  icon?: string;
  /** Tone classes, e.g. "bg-chart-3/15 text-chart-3" (utilities win over the kit badge). */
  className?: string;
  title?: string;
  children: ReactNode;
}

/** Small pill describing a model capability (vision, images, audio…) — kit Badge, dense size. */
export default function CapabilityBadge({
  icon,
  className,
  title,
  children,
}: CapabilityBadgeProps) {
  return (
    <KitBadge
      variant="secondary"
      shape="pill"
      title={title}
      icon={icon ? <Icon name={icon} size={12} /> : undefined}
      className={cn(
        "min-h-0 gap-0.5 whitespace-nowrap px-1.5 py-0.5 text-[10px] font-medium leading-none",
        className
      )}
    >
      {children}
    </KitBadge>
  );
}

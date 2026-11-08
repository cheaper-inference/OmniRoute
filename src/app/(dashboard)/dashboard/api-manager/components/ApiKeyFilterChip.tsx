"use client";

import Button from "@/shared/components/Button";
import { cn } from "@/shared/utils/cn";

interface ApiKeyFilterChipProps {
  label: string;
  count?: number;
  isActive: boolean;
  dotColor?: string | null;
  onClick: () => void;
}

export default function ApiKeyFilterChip({
  label,
  count,
  isActive,
  dotColor,
  onClick,
}: ApiKeyFilterChipProps) {
  return (
    <Button
      variant={isActive ? "primary" : "outline"}
      size="sm"
      aria-pressed={isActive}
      onClick={onClick}
      className="gap-1.5 rounded-full text-xs"
    >
      {dotColor && <span className={cn("size-2 rounded-full shrink-0", dotColor)} />}
      <span>{label}</span>
      {count !== undefined && (
        <span className={cn("text-[11px]", isActive ? "opacity-80" : "text-text-muted")}>
          {count}
        </span>
      )}
    </Button>
  );
}

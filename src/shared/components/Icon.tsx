"use client";

import { createElement } from "react";
import { SquareDashedBottom, type LucideIcon, type LucideProps } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { resolveIcon } from "@/shared/constants/iconMap";

export interface IconProps {
  /** Icon name from ICON_MAP (the Material Symbols vocabulary the screens already use). */
  name?: string | null;
  /** Pixel size (width = height). 18 matches the legacy `text-[18px]` icon spans. */
  size?: number;
  className?: string;
  /** When set, the icon is meaningful: role="img" + aria-label. Otherwise aria-hidden. */
  ariaLabel?: string;
  strokeWidth?: number;
  /** Legacy `FILL 1` look (active nav item). Lucide is stroke-only; we thicken the stroke. */
  fill?: boolean;
}

const warned = new Set<string>();

/**
 * Glyph drawn for a name missing from ICON_MAP. It must not be any ICON_MAP value, so a gap never
 * reads as a real icon or status (CircleDashed, for instance, is `pending`) — pinned by
 * tests/unit/ui/adapters/icon.test.tsx.
 */
export const MISSING_ICON_GLYPH: LucideIcon = SquareDashedBottom;

/**
 * Every icon renders Lucide (KEA-7886): the Material Symbols font is gone. A name missing from
 * ICON_MAP draws a neutral placeholder glyph (MISSING_ICON_GLYPH) (never ligature text, never a crash) and, outside
 * production, warns once so the gap is visible — tests/unit/icon-map-coverage.test.ts keeps the
 * names used in src/ mapped.
 */
export default function Icon({
  name,
  size = 18,
  className,
  ariaLabel,
  strokeWidth,
  fill = false,
}: IconProps) {
  if (!name) return null;
  const mapped = resolveIcon(name);
  if (!mapped && process.env.NODE_ENV !== "production" && !warned.has(name)) {
    warned.add(name);
    console.warn(
      `[Icon] "${name}" is not in ICON_MAP — rendering a placeholder glyph (map it in src/shared/constants/iconMap.ts)`
    );
  }
  const Lucide: LucideIcon = mapped ?? MISSING_ICON_GLYPH;
  const a11y = ariaLabel
    ? { role: "img" as const, "aria-label": ariaLabel }
    : { "aria-hidden": true as const };
  // ICON_MAP values are module-level Lucide components (stable identity), but the
  // react-hooks/static-components rule cannot see through resolveIcon(); createElement
  // renders the same element without the JSX-tag heuristic.
  const props: LucideProps & { "data-icon": string; "data-icon-missing"?: "true" } = {
    ...a11y,
    width: size,
    height: size,
    strokeWidth: strokeWidth ?? (fill ? 2.5 : 2),
    className: cn("oi-icon shrink-0 pointer-events-none", className),
    "data-icon": name,
    ...(mapped ? null : { "data-icon-missing": "true" as const }),
  };
  return createElement(Lucide, props);
}

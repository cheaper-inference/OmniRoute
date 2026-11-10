import { LegendMarker } from "@omniroute/ui-kit/legend-marker";
import { cn } from "@/shared/utils";
import { CATEGORICAL_LEGEND_SHAPES, type CategoricalSlot } from "@/shared/utils/categoricalPalette";
import { providerCategorySlot } from "../providerCategoryPalette";

interface CategoryDotProps {
  /** Provider category key (see PROVIDER_CATEGORY_ORDER); an unknown key renders nothing. */
  category: string;
  hasFree?: boolean;
  label?: string;
  freeLabel?: string;
  /** `md` matches the section-header dots (10 px); `sm` (8 px) is the card/chip size. */
  size?: "sm" | "md";
  /**
   * Name the markers with their labels (`role="img"`). Only where the dot is the sole carrier of
   * the category (provider cards); next to a visible category name (section headers, summary
   * chips) the markers stay decorative and the label is just the hover tooltip.
   */
  announce?: boolean;
  className?: string;
}

/**
 * One kit `LegendMarker` for a category slot. The label is the hover tooltip; with `announce` it
 * is also the accessible name (`role="img"`), otherwise the kit marker is `aria-hidden`.
 */
function Marker({
  slot,
  size,
  title,
  announce,
}: {
  slot: CategoricalSlot;
  size: "sm" | "md";
  title?: string;
  announce: boolean;
}) {
  return (
    <LegendMarker
      color={slot.colorVar}
      shape={CATEGORICAL_LEGEND_SHAPES[slot.shape]}
      size={size}
      className="shrink-0"
      data-chart-token={slot.token}
      title={title}
      aria-label={announce && title ? title : undefined}
    />
  );
}

/**
 * Category legend marker: the kit `LegendMarker` on a chart token plus a shape (dot / square /
 * diamond), because 13 categories share 8 colours — see providerCategoryPalette.ts.
 */
export function CategoryDot({
  category,
  hasFree = false,
  label,
  freeLabel,
  size = "sm",
  announce = false,
  className,
}: CategoryDotProps) {
  const slot = providerCategorySlot(category);
  const freeSlot = hasFree ? providerCategorySlot("free") : null;
  if (!slot) return null;
  return (
    <span className={cn("inline-flex items-center gap-0.5 shrink-0", className)}>
      <Marker slot={slot} size={size} title={label} announce={announce} />
      {freeSlot && <Marker slot={freeSlot} size={size} title={freeLabel} announce={announce} />}
    </span>
  );
}

import { cn } from "@/shared/utils";
import { CATEGORICAL_SHAPE_CLASSES, type CategoricalSlot } from "@/shared/utils/categoricalPalette";
import { providerCategorySlot } from "../providerCategoryPalette";

interface CategoryDotProps {
  /** Provider category key (see PROVIDER_CATEGORY_ORDER); an unknown key renders nothing. */
  category: string;
  hasFree?: boolean;
  label?: string;
  freeLabel?: string;
  /** `md` matches the section-header dots (10 px); `sm` (8 px) is the card/chip size. */
  size?: "sm" | "md";
  className?: string;
}

function Marker({
  slot,
  size,
  title,
}: {
  slot: CategoricalSlot;
  size: "sm" | "md";
  title?: string;
}) {
  return (
    <span
      className={cn(
        "shrink-0",
        size === "md" ? "size-2.5" : "size-2",
        slot.fillClass,
        CATEGORICAL_SHAPE_CLASSES[slot.shape]
      )}
      data-chart-token={slot.token}
      data-shape={slot.shape}
      title={title}
    />
  );
}

/**
 * Category legend marker: a kit chart token (`bg-chart-N`) plus a shape (circle / square /
 * diamond), because 13 categories share 5 colours — see providerCategoryPalette.ts.
 */
export function CategoryDot({
  category,
  hasFree = false,
  label,
  freeLabel,
  size = "sm",
  className,
}: CategoryDotProps) {
  const slot = providerCategorySlot(category);
  const freeSlot = hasFree ? providerCategorySlot("free") : null;
  if (!slot) return null;
  return (
    <span className={cn("inline-flex items-center gap-0.5 shrink-0", className)}>
      <Marker slot={slot} size={size} title={label} />
      {freeSlot && <Marker slot={freeSlot} size={size} title={freeLabel} />}
    </span>
  );
}

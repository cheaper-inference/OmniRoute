import type { CSSProperties } from "react";

/**
 * A provider/tool brand colour is never the text colour and never the solid fill behind white
 * text: 61 of the 149 provider brands are under 3:1 on the Editions light paper, and white on a
 * light brand (cyan, amber, lime…) is unreadable. The brand is a tint instead — this share of the
 * brand mixed into the surface below it — and the text on it comes from the neutral tokens
 * (`text-text-main`). At 18 % the body ink stays above 4.5:1 for every catalog brand in both
 * themes of both palettes (`tests/unit/log-badge-palette-contrast.test.ts`).
 */
export const BRAND_TINT_PERCENT = 18;

/** Inline background for a brand-tinted chip or avatar; pair it with `text-text-main`. */
export function brandTintStyle(color: string | null | undefined): CSSProperties | undefined {
  if (!color) return undefined;
  return {
    backgroundColor: `color-mix(in srgb, ${color} ${BRAND_TINT_PERCENT}%, transparent)`,
  };
}

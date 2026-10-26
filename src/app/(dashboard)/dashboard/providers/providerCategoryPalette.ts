import { categoricalSlot, type CategoricalSlot } from "@/shared/utils/categoricalPalette";

/**
 * Provider category legend (summary chips, section headers, card dots) on the kit's five chart
 * tokens (KEA-7886, P8). The index in this list IS the colour: `chart-(index % 5 + 1)`, and the
 * marker shape changes every five (0–4 circle, 5–9 square, 10–12 diamond), so all 13 categories
 * stay distinct by colour + shape. The order is fixed (append new categories at the end) and was
 * picked so the first cycle keeps the closest hue to the old raw palette:
 *
 *   apikey(amber→chart-1) oauth(blue→2) web-cookie(purple→3) free(green→4) audio(rose→5)
 *   compatible(■1) ide(■2) upstream-proxy(■3) local(■4) webfetch(■5)
 *   no-auth(◆1) search(◆2) cloud-agent(◆3)
 */
export const PROVIDER_CATEGORY_ORDER = [
  "apikey",
  "oauth",
  "web-cookie",
  "free",
  "audio",
  "compatible",
  "ide",
  "upstream-proxy",
  "local",
  "webfetch",
  "no-auth",
  "search",
  "cloud-agent",
] as const;

export type ProviderCategoryKey = (typeof PROVIDER_CATEGORY_ORDER)[number];

/** The summary card and the page use un-hyphenated keys for some categories. */
const CATEGORY_ALIASES: Record<string, ProviderCategoryKey> = {
  webcookie: "web-cookie",
  cloudagent: "cloud-agent",
  upstreamproxy: "upstream-proxy",
  noauth: "no-auth",
};

export function normalizeProviderCategory(
  key: string | null | undefined
): ProviderCategoryKey | null {
  if (!key) return null;
  const k = CATEGORY_ALIASES[key] ?? key;
  return (PROVIDER_CATEGORY_ORDER as readonly string[]).includes(k)
    ? (k as ProviderCategoryKey)
    : null;
}

/** Chart-token slot of a provider category; unknown keys get `null` (render no dot). */
export function providerCategorySlot(key: string | null | undefined): CategoricalSlot | null {
  const k = normalizeProviderCategory(key);
  return k ? categoricalSlot(PROVIDER_CATEGORY_ORDER.indexOf(k)) : null;
}

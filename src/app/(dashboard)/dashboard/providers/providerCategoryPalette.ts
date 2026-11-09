import { categoricalSlot, type CategoricalSlot } from "@/shared/utils/categoricalPalette";

/**
 * Provider category legend (summary chips, section headers, card dots) on the kit's eight chart
 * tokens (KEA-7886 P8; #19066). The index in this list IS the colour: token
 * `ciChartSeriesOrder[index % 8]` (the kit series order 4, 3, 6, 7, 8, 2, 1, 5), and the marker
 * shape changes every eight (0–7 circle, 8–12 square), so all 13 categories stay distinct by
 * colour + shape. Only the colour depends on the order (no list renders in it), and the order was
 * picked so the categories keep the closest hue of the earlier five-token palette:
 *
 *   free(green→chart-4) web-cookie(purple→3) compatible(orange→6) local(teal→7)
 *   apikey(amber→brown 8) oauth(blue→2) ide(lime→1) audio(rose→pink 5)
 *   upstream-proxy(■4) cloud-agent(■3) webfetch(orange■6) search(■7) no-auth(■8)
 *
 * Append new categories at the end.
 */
export const PROVIDER_CATEGORY_ORDER = [
  "free",
  "web-cookie",
  "compatible",
  "local",
  "apikey",
  "oauth",
  "ide",
  "audio",
  "upstream-proxy",
  "cloud-agent",
  "webfetch",
  "search",
  "no-auth",
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

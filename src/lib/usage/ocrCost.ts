import { getPricingLookupModels } from "./costCalculator";
import { getPricingForModel } from "../db/settings/pricing";

export interface OcrPageCost {
  costUsd: number | null;
  pages: number | null;
  unitPriceUsd: number | null;
}

/** Bill the upstream's measured pages, never the input's requested page count. */
export async function calculateOcrPageCost(
  provider: string,
  model: string,
  usageInfo: Record<string, unknown> | undefined,
  annotated = false
): Promise<OcrPageCost> {
  const pages = usageInfo?.pages_processed;
  const unknown: OcrPageCost = { costUsd: null, pages: null, unitPriceUsd: null };
  if (typeof pages !== "number" || !Number.isSafeInteger(pages) || pages < 0) return unknown;
  const result = { ...unknown, pages };
  try {
    for (const key of getPricingLookupModels(provider, model)) {
      const pricing = await getPricingForModel(provider, key);
      if (!pricing) continue;
      const rate = annotated ? pricing.ocr_cost_per_annotated_page : pricing.ocr_cost_per_page;
      if (typeof rate !== "number" || !Number.isFinite(rate) || rate < 0) return result;
      const costUsd = rate * pages;
      return Number.isFinite(costUsd) ? { costUsd, pages, unitPriceUsd: rate } : result;
    }
  } catch {
    console.error("[OCR accounting] Pricing lookup failed; cost remains unknown");
  }
  return result;
}

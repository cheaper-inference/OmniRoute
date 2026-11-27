import { byCodeUnit } from "./order.mjs";

export function activeCatalogIds(rows, provider) {
  const ids = rows
    .filter(
      (row) =>
        row.provider === provider &&
        row.freeType !== "discontinued" &&
        row.freeType !== "one-time-initial"
    )
    .map((row) => row.modelId);
  return [...new Set(ids)].sort(byCodeUnit);
}

export function catalogPoolValue(rows, back) {
  let max = 0;
  for (const row of rows) {
    if (row.provider !== back.provider) continue;
    if (back.poolKey !== undefined && row.poolKey !== back.poolKey) continue;
    if (back.modelId !== undefined && row.modelId !== back.modelId) continue;
    max = Math.max(max, row.monthlyTokens);
  }
  return max;
}

export function summarizeCatalogRows(rows, provider) {
  return rows
    .filter((row) => row.provider === provider)
    .map(({ modelId, poolKey, monthlyTokens, freeType }) => ({
      modelId,
      poolKey,
      monthlyTokens,
      freeType,
    }));
}

/** Provider-reported money is log metadata, never normalized token usage. */
export function validateBuyerCostMicro(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : null;
}

function usageContainers(payload: unknown): Record<string, unknown>[] {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return [];
  const record = payload as Record<string, unknown>;
  return [record, record.message, record.response].flatMap((owner) => {
    if (!owner || typeof owner !== "object" || Array.isArray(owner)) return [];
    const usage = (owner as Record<string, unknown>).usage;
    return usage && typeof usage === "object" && !Array.isArray(usage)
      ? [usage as Record<string, unknown>]
      : [];
  });
}

export function readBuyerCostMicro(payload: unknown): number | null | undefined {
  for (const usage of usageContainers(payload)) {
    if (Object.hasOwn(usage, "buyer_cost_micro"))
      return validateBuyerCostMicro(usage.buyer_cost_micro);
  }
  return undefined;
}

/** Remove only this private field, leaving request bodies and token math alone. */
export function stripBuyerCostMicro(payload: unknown): boolean {
  let changed = false;
  for (const usage of usageContainers(payload)) {
    if (Object.hasOwn(usage, "buyer_cost_micro")) {
      delete usage.buyer_cost_micro;
      changed = true;
    }
  }
  return changed;
}

/** A multi-leg log is exact only when every leg reported its micro-dollar charge. */
export function sumBuyerCostMicro(
  receipts: ReadonlyArray<{ buyerCostMicro?: unknown }>
): number | null {
  if (receipts.length === 0 || new Set(receipts).size !== receipts.length) return null;
  let total = 0;
  for (const receipt of receipts) {
    const value = validateBuyerCostMicro(receipt.buyerCostMicro);
    if (value === null || !Number.isSafeInteger(value)) return null;
    total += value;
  }
  return Number.isSafeInteger(total) ? total : null;
}

const buyerCostByStream = new WeakMap<object, () => number | null>();

/** Keep the raw charge available when disconnect finalization precedes flush. */
export function registerStreamBuyerCost(stream: object, read: () => number | null): void {
  buyerCostByStream.set(stream, read);
}

export function readStreamBuyerCost(stream: object | null | undefined): number | null {
  if (!stream) return null;
  try {
    return validateBuyerCostMicro(buyerCostByStream.get(stream)?.());
  } catch {
    return null;
  }
}

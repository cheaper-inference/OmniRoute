/** Request-local provenance for derived totals. Never serialized onto provider wire payloads. */
type TotalKey = "total_tokens" | "totalTokenCount";
type Receipt = Record<string, unknown>;
const computed = new WeakMap<object, Partial<Record<TotalKey, number>>>();
const keys: TotalKey[] = ["total_tokens", "totalTokenCount"];

export function hasComputedUsageTotal(value: unknown, key: TotalKey): boolean {
  if (!value || typeof value !== "object") return false;
  const marked = computed.get(value)?.[key];
  return marked !== undefined && (value as Receipt)[key] === marked;
}

export function markComputedUsageTotal<T extends Receipt>(value: T, key: TotalKey): T {
  if (typeof value[key] === "number")
    computed.set(value, { ...computed.get(value), [key]: value[key] });
  return value;
}

/** Copy only unchanged totals; an unmarked replacement clears old local provenance. */
export function carryComputedUsageTotals<T extends Receipt>(from: unknown, to: T): T {
  const source = from && typeof from === "object" ? (from as Receipt) : {};
  computed.delete(to);
  for (const key of keys) {
    const original =
      source[key] === undefined ? keys.find((alias) => source[alias] !== undefined) : key;
    if (original && to[key] === source[original] && hasComputedUsageTotal(from, original))
      markComputedUsageTotal(to, key);
  }
  return to;
}

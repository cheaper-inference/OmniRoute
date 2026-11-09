import type { ComboStep } from "@/lib/combos/steps";

export function setQuotaOnlyFallback(
  entries: ComboStep[],
  index: number,
  enabled: boolean
): ComboStep[] {
  const selected = entries[index];
  if (!selected || (selected.kind !== "model" && selected.kind !== "combo-ref")) return entries;
  const next = [...entries];
  const { fallbackOnlyOnQuotaExhaustion: _removed, ...entry } = selected;
  next[index] = enabled ? { ...entry, fallbackOnlyOnQuotaExhaustion: true } : entry;
  return next;
}

export function requiresExecuteMode(strategy: string, entries: ComboStep[]): boolean {
  return (
    strategy === "priority" &&
    entries.some(
      (entry) => entry.kind === "combo-ref" && entry.fallbackOnlyOnQuotaExhaustion === true
    )
  );
}

export function applyQuotaOnlyFallbackConfig(
  strategy: string,
  entries: ComboStep[],
  config: Record<string, unknown>
): Record<string, unknown> {
  return requiresExecuteMode(strategy, entries)
    ? { ...config, nestedComboMode: "execute" }
    : config;
}

import { matchesSearch } from "@/shared/utils/turkishText";

type SearchableCombo = { name?: unknown; models?: unknown };

/** Model id string of one combo step: a plain string, or an object with `model`. */
const stepModel = (step: unknown): string => {
  if (typeof step === "string") return step;
  const model = (step as { model?: unknown } | null)?.model;
  return typeof model === "string" ? model : "";
};

/** True when the query matches the combo name or any member model id (Turkish-safe, accent-blind). */
export function comboMatchesSearch(combo: SearchableCombo, query: string): boolean {
  if (!query.trim()) return true;
  if (typeof combo?.name === "string" && matchesSearch(combo.name, query)) return true;
  const steps = Array.isArray(combo?.models) ? combo.models : [];
  return steps.some((step) => matchesSearch(stepModel(step), query));
}

export function filterCombosBySearch<T extends SearchableCombo>(
  combos: readonly T[],
  query: string
): T[] {
  return combos.filter((combo) => comboMatchesSearch(combo, query));
}

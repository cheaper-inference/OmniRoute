"use client";

import { getComboModelString } from "@/lib/combos/steps";
import Badge from "@/shared/components/Badge";
import Icon from "@/shared/components/Icon";

/**
 * #13505: combo steps pinned to a model the provider's live catalog no longer
 * lists. The refs come from `staleComboRefs` on /api/combos/builder/options.
 */
export function buildStaleModelSet(refs: unknown): Set<string> {
  const models = new Set<string>();
  if (!Array.isArray(refs)) return models;
  for (const ref of refs) {
    const model = (ref as { model?: unknown } | null)?.model;
    if (typeof model === "string" && model) models.add(model);
  }
  return models;
}

/** Staleness is a property of the model, so any explicit step using it matches. */
export function isStaleComboStep(entry: unknown, staleModels: Set<string>): boolean {
  if (staleModels.size === 0) return false;
  const kind = (entry as { kind?: unknown } | null)?.kind;
  if (kind !== undefined && kind !== "model") return false;
  const model = getComboModelString(entry);
  return Boolean(model && staleModels.has(model));
}

export function StaleModelBadge({ label }: { label: string }) {
  return (
    <Badge
      variant="warning"
      title={label}
      className="inline-flex shrink-0 items-center gap-0.5 px-1 text-[10px]"
    >
      <Icon name="warning" size={12} />
      {label}
    </Badge>
  );
}

import type { ContextRolloverConfig } from "../types.ts";

export type { ContextRolloverConfig } from "../types.ts";

export interface ContextRolloverTarget {
  provider: string | null | undefined;
  model: string | null | undefined;
}

function normalized(value: string | null | undefined): string {
  return value?.trim().toLowerCase() ?? "";
}

/**
 * True when context rollover owns context handling for this request target: the feature is
 * enabled and the `provider/model` key is not in `excludedModelKeys`. Exclusion is model-based
 * on purpose, so every execution leg of a routing combo is judged by its own model.
 */
export function isContextRolloverTarget(
  config: Pick<ContextRolloverConfig, "enabled" | "excludedModelKeys"> | null | undefined,
  target: ContextRolloverTarget
): boolean {
  if (!config?.enabled) return false;
  const modelKey = [normalized(target.provider), normalized(target.model)]
    .filter(Boolean)
    .join("/");
  const excluded = new Set((config.excludedModelKeys ?? []).map(normalized).filter(Boolean));
  return !excluded.has(modelKey);
}

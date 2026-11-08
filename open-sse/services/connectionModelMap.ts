/**
 * Connection-level model mapping (sub2api port).
 *
 * Allows individual provider connections to rewrite requested models
 * (e.g. mapping "gpt-4o" to "gpt-4o-mini", or "claude-3-7-sonnet" to "claude-3-5-sonnet")
 * on a per-account basis.
 */

export type ConnectionModelMap = Record<string, string> | null | undefined;

/** Trimmed target the map holds for `key` as an own string entry, or null. */
function ownMapTarget(modelMap: Record<string, string>, key: string): string | null {
  if (!Object.hasOwn(modelMap, key)) return null;
  const value = modelMap[key];
  return typeof value === "string" ? value.trim() || null : null;
}

/** A target that names its own prefix stays verbatim; otherwise it keeps the request's prefix. */
function withRequestPrefix(target: string, prefix: string): string {
  return target.includes("/") ? target : `${prefix}${target}`;
}

function findCaseInsensitiveTarget(
  modelMap: Record<string, string>,
  requestedModel: string,
  strippedModel: string,
  prefix: string
): string | null {
  const lowerRequested = requestedModel.toLowerCase();
  const lowerStripped = prefix ? strippedModel.toLowerCase() : null;
  for (const [key, val] of Object.entries(modelMap)) {
    const target = typeof val === "string" ? val.trim() : "";
    if (!target) continue;
    const lowerKey = key.trim().toLowerCase();
    if (lowerKey === lowerRequested) return target;
    if (lowerKey === lowerStripped) return withRequestPrefix(target, prefix);
  }
  return null;
}

/**
 * Resolves the effective target model from a connection's model map.
 * Supports exact matching, unprefixed stripping with prefix re-attachment or replacement,
 * and case-insensitive fallback.
 */
export function resolveConnectionMappedModel(
  requestedModel: string,
  modelMap?: ConnectionModelMap
): string {
  if (!modelMap || typeof modelMap !== "object" || Array.isArray(modelMap)) {
    return requestedModel;
  }

  // 1. Exact match on raw requestedModel
  const exact = ownMapTarget(modelMap, requestedModel);
  if (exact) return exact;

  // Check prefix if model contains a slash (e.g. "provider/model")
  const slashIdx = requestedModel.indexOf("/");
  const hasPrefix = slashIdx > 0 && slashIdx < requestedModel.length - 1;
  const prefix = hasPrefix ? requestedModel.slice(0, slashIdx + 1) : "";
  const strippedModel = hasPrefix ? requestedModel.slice(slashIdx + 1) : requestedModel;

  // 2. Exact match on stripped model ID
  const stripped = hasPrefix ? ownMapTarget(modelMap, strippedModel) : null;
  if (stripped) return withRequestPrefix(stripped, prefix);

  // 3. Case-insensitive fallback
  return (
    findCaseInsensitiveTarget(modelMap, requestedModel, strippedModel, prefix) ?? requestedModel
  );
}

/** Model columns of a usage row: the routed model stands in for whichever one is missing. */
export function usageRowModels(
  model: string | null | undefined,
  requestedModel: string | null | undefined,
  actualModel: string | null | undefined
): { model: string; requestedModel: string; actualModel: string } {
  const routed = model || "unknown";
  return {
    model: routed,
    requestedModel: requestedModel || routed,
    actualModel: actualModel || routed,
  };
}

/**
 * Model a request is billed against. Only a map that rewrote the model moves the bill to the model
 * the account actually served; everything else keeps pricing the routed `model`.
 */
export function resolveConnectionCostModel<T extends string | null | undefined>(
  model: T,
  actualModel: string | null | undefined,
  credentials: { modelMap?: unknown } | null | undefined
): T | string {
  if (!model || !actualModel) return model;
  const modelMap = credentials?.modelMap as ConnectionModelMap;
  return resolveConnectionMappedModel(model, modelMap) === actualModel && model !== actualModel
    ? actualModel
    : model;
}

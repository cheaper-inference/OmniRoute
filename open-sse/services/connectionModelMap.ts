/**
 * Connection-level model mapping (sub2api port).
 *
 * Allows individual provider connections to rewrite requested models
 * (e.g. mapping "gpt-4o" to "gpt-4o-mini", or "claude-3-7-sonnet" to "claude-3-5-sonnet")
 * on a per-account basis.
 */

export type ConnectionModelMap = Record<string, string> | null | undefined;

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
  if (Object.hasOwn(modelMap, requestedModel) && typeof modelMap[requestedModel] === "string") {
    const target = modelMap[requestedModel].trim();
    if (target) return target;
  }

  // Check prefix if model contains a slash (e.g. "provider/model")
  const slashIdx = requestedModel.indexOf("/");
  const hasPrefix = slashIdx > 0 && slashIdx < requestedModel.length - 1;
  const prefix = hasPrefix ? requestedModel.slice(0, slashIdx + 1) : "";
  const strippedModel = hasPrefix ? requestedModel.slice(slashIdx + 1) : requestedModel;

  // 2. Exact match on stripped model ID
  if (
    hasPrefix &&
    Object.hasOwn(modelMap, strippedModel) &&
    typeof modelMap[strippedModel] === "string"
  ) {
    const target = modelMap[strippedModel].trim();
    if (target) {
      // If target already specifies a prefix/slash, preserve target verbatim.
      // Otherwise re-apply the original prefix.
      return target.includes("/") ? target : `${prefix}${target}`;
    }
  }

  // 3. Case-insensitive fallback
  const lowerRequested = requestedModel.toLowerCase();
  const lowerStripped = strippedModel.toLowerCase();

  for (const [key, val] of Object.entries(modelMap)) {
    if (typeof val !== "string" || !val.trim()) continue;
    const lowerKey = key.trim().toLowerCase();
    if (lowerKey === lowerRequested) {
      return val.trim();
    }
    if (hasPrefix && lowerKey === lowerStripped) {
      const target = val.trim();
      return target.includes("/") ? target : `${prefix}${target}`;
    }
  }

  return requestedModel;
}

/**
 * Applies connection-level model mapping to an execution input object.
 * Returns a new object with updated `model` and `body.model` if mapping took effect.
 */
export function applyConnectionModelMap<T extends { model?: string; body?: unknown }>(
  input: T,
  modelMap?: ConnectionModelMap
): T {
  if (!input.model || !modelMap || typeof modelMap !== "object" || Array.isArray(modelMap)) {
    return input;
  }

  const mappedModel = resolveConnectionMappedModel(input.model, modelMap);
  if (mappedModel === input.model) {
    return input;
  }

  const result: T = { ...input, model: mappedModel };

  if (input.body && typeof input.body === "object" && !Array.isArray(input.body)) {
    result.body = {
      ...(input.body as Record<string, unknown>),
      model: mappedModel,
    };
  }

  return result;
}

import { isRegisteredFeatureFlagEnabled } from "../../../../utils/registeredFeatureFlag.ts";

/** Feature flag that turns on the structural RTK renderers (default off). */
export const RTK_STRUCTURAL_RENDERERS_FLAG = "OMNIROUTE_RTK_STRUCTURAL_RENDERERS_ENABLED";

/**
 * Resolve the structural-renderer decision. Call it once per request, on the thread that owns
 * the server feature-flag resolver, and hand the boolean down: compression workers have no
 * resolver of their own, and the memoization key has to see the same value the engine used.
 * An explicit value always wins; a resolver that throws fails closed.
 */
export function resolveRtkStructuralFlag(explicit?: boolean): boolean {
  if (typeof explicit === "boolean") return explicit;
  return isRegisteredFeatureFlagEnabled(RTK_STRUCTURAL_RENDERERS_FLAG);
}

/**
 * Entry-point helper: make sure `options` carries the decision, on or off. An explicit `false`
 * matters as much as `true`: a compression worker has no resolver and would otherwise fall back
 * to the bare environment variable, which a dashboard override can contradict. The output of a
 * request with the flag off is unchanged by the extra key.
 */
export function withRtkStructuralFlag<T extends { rtkStructuralRenderersEnabled?: boolean }>(
  options: T | undefined
): T {
  if (typeof options?.rtkStructuralRenderersEnabled === "boolean") return options;
  return { ...options, rtkStructuralRenderersEnabled: resolveRtkStructuralFlag() } as T;
}

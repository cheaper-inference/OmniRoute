import type { RtkConfig } from "../../types.ts";
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
 * Whether the structural renderers can matter for this request at all: some RTK step has
 * `enableRenderers` on and tool-result compression on, in the effective config (engine-wide
 * `rtkConfig` overridden by the step's own config, as `applyRtkCompression` merges them).
 * The default config has `enableRenderers: false`, so the default path never asks for the flag.
 */
export function rtkRenderersMayRun(
  rtkConfig: Partial<RtkConfig> | undefined,
  steps: ReadonlyArray<{ engine: string; config?: Record<string, unknown> }>
): boolean {
  return steps.some((step) => {
    if (step.engine !== "rtk") return false;
    const effective: Partial<RtkConfig> = { ...rtkConfig, ...step.config };
    return effective.enableRenderers === true && effective.applyToToolResults !== false;
  });
}

/**
 * Entry-point helper: make sure `options` carries the decision, on or off. The flag resolver
 * (which can open the database) is consulted only when `mayRun` says the renderers could run;
 * otherwise the decision is an explicit `false` without any lookup. The explicit value matters:
 * a compression worker has no resolver and would otherwise fall back to the bare environment
 * variable, which a dashboard override can contradict. Output with the flag off is unchanged.
 */
export function withRtkStructuralFlag<T extends { rtkStructuralRenderersEnabled?: boolean }>(
  options: T | undefined,
  mayRun: boolean
): T {
  if (typeof options?.rtkStructuralRenderersEnabled === "boolean") return options;
  const enabled = mayRun && resolveRtkStructuralFlag();
  return { ...options, rtkStructuralRenderersEnabled: enabled } as T;
}

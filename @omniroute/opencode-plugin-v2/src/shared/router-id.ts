import { isRouterId } from "./free-signals.js";
import { isAutoStrategyId } from "./naming.js";

/**
 * Whether a raw `/v1/models` id is a routing entry rather than a direct model.
 *
 * Composes the two routing-segment helpers already used by the free-signal and
 * naming paths, then covers the shapes they do not match: a segment starting
 * with `auto:`, a bare `free` segment and the gateway router segments
 * `pareto-code` and `bodybuilder`. Only whole segments after the first slash
 * are inspected, so a provider prefix or a longer model name never turns a
 * direct model into a router.
 */
export function isRouterEntryId(id: string): boolean {
  if (isAutoStrategyId(id) || isRouterId(id)) return true;
  const segments = id.split("/").slice(1);
  return segments.some(
    (segment) =>
      segment === "auto" ||
      segment.startsWith("auto-") ||
      segment.startsWith("auto:") ||
      segment === "free" ||
      segment === "pareto-code" ||
      segment === "bodybuilder"
  );
}

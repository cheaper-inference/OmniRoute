// TypeScript substrate for the `class_id_by_predicate` predicate.
// The upstream `router-id.ts` does not exist at the fork's release base
// (verified: a worktree search for router-id.ts found none). This helper
// carries the minimal semantics: a routing ID is recognized by its segments
// after the first `/` (auto, auto-*, auto:*, free, pareto-code, bodybuilder).
// Run with: node --import tsx/esm -e 'import("./...").then(...)'
// (a bare `node -e 'import("./...ts")'` fails with ERR_MODULE_NOT_FOUND).

export function isRouterEntryId(id: string): boolean {
  const segments = String(id).split("/").slice(1);
  return (
    segments.some(
      (segment) =>
        segment === "auto" ||
        segment.startsWith("auto-") ||
        segment.startsWith("auto:") ||
        segment === "free" ||
        segment === "pareto-code" ||
        segment === "bodybuilder"
    ) || /^(?:auto:|free$|pareto-code$|bodybuilder$)/i.test(String(id))
  );
}

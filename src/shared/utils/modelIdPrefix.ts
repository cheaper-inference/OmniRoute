/**
 * Model-id prefix stacking guards for compatible-provider nodes.
 *
 * A node's public model ids are `<prefix>/<upstreamId>`, but stored rows
 * (custom models, alias values) can carry the prefix already — written before
 * normalization existed or pasted from a prefixed listing. Emission and
 * storage must collapse those stacks so the node never publishes
 * `<prefix>/<prefix>/<model>`.
 *
 * Collapsing is scoped to compatible nodes on purpose: a canonical provider
 * (e.g. `nvidia`) legitimately serves ids that begin with its own name
 * (`nvidia/nemotron-…`), and stripping that leading segment would misroute
 * requests. Callers must only pass a node's configured prefix as a candidate.
 */

/**
 * Strip every repeated leading `<prefix>/` for the given node prefixes.
 *
 * Only the node's OWN prefixes are ever stripped, and only as a leading
 * stack: upstream ids may legitimately contain slashes
 * (`opc/big-pickle`). Idempotent by construction — a fully collapsed id
 * collapses to itself, and emission re-adding one `<prefix>/` yields exactly
 * `<prefix>/<upstreamId>`.
 *
 * Matching is exact (case-sensitive): a prefix renamed after storage no
 * longer collapses; the stale id surfaces for cleanup instead of silently
 * changing identity under a different name.
 */
export function collapseProviderPrefix(
  modelId: string,
  prefixes: readonly (string | null | undefined)[]
): string {
  if (!modelId.includes("/")) return modelId;
  const withSlashes: string[] = [];
  for (const prefix of prefixes) {
    if (prefix) withSlashes.push(`${prefix}/`);
  }
  let current = modelId;
  let changed = true;
  while (changed) {
    changed = false;
    for (const withSlash of withSlashes) {
      while (current.length > withSlash.length && current.startsWith(withSlash)) {
        current = current.slice(withSlash.length);
        changed = true;
      }
    }
  }
  return current;
}

/**
 * Resolve a compatible-provider node's display prefix the same way the
 * `/v1/models` catalog does: the configured `prefix`, else the name slugified
 * to the same charset, else null.
 */
export function resolveProviderNodePrefix(
  node: Record<string, unknown> | null | undefined
): string | null {
  if (!node) return null;
  const configured = typeof node.prefix === "string" ? node.prefix.trim() : "";
  if (configured) return configured;
  const name = typeof node.name === "string" ? node.name.trim().toLowerCase() : "";
  if (!name) return null;
  const slug = name.replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  return slug || null;
}

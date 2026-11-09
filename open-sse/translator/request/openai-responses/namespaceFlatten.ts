// #8295 — deterministic wire-name qualification for Responses "namespace" tool
// groups flattened onto Chat Completions. See openai-responses.ts's
// `toolType === "namespace"` branch for the caller.
//
// Two different namespaces can declare a child tool with the same leaf name
// (e.g. `mcp__codex_apps__atlassian_rovo._search` and
// `mcp__codex_apps__linear._search`). Emitting both as the bare leaf `_search`
// produces duplicate Chat `tool.function.name` entries, which every
// strict-name-uniqueness upstream (DeepSeek, etc.) rejects with a 400. Folding
// the namespace into the wire name makes collisions structurally impossible.
import { createHash } from "node:crypto";

// Chat Completions function names must match ^[a-zA-Z0-9_-]+$ and are commonly
// capped at 64 chars by OpenAI-family providers.
const MAX_TOOL_NAME_LEN = 64;

// #17890 — the Responses API default namespace. Its tools are the ones clients
// address by bare name (Codex's `exec`, `wait`), so they keep the bare leaf.
const DEFAULT_NAMESPACE = "functions";

/** Names of top-level (non-namespace) function/custom tools, for collision checks. */
export function collectFlatToolNames(tools: unknown[]): Set<string> {
  const names = new Set<string>();
  for (const value of tools) {
    if (!value || typeof value !== "object") continue;
    const tool = value as { type?: unknown; name?: unknown; function?: { name?: unknown } };
    if (tool.type === "namespace") continue;
    const name = typeof tool.function?.name === "string" ? tool.function.name : tool.name;
    if (typeof name === "string" && name.trim()) names.add(name.trim());
  }
  return names;
}

/**
 * Fold a Responses "namespace" tool's container name and a child leaf name
 * into a single, collision-safe Chat Completions wire name.
 *
 * Rules (mirrors the pre-existing `mcp__<server>__` container convention
 * documented in open-sse/executors/codex/tools.ts):
 * - No container name -> the bare leaf, unchanged.
 * - A leaf that already carries its own `__`-qualified prefix -> preserved
 *   verbatim (never double-prefixed).
 * - A container name already ending in `__` -> collapses onto the leaf
 *   without adding a second `__` separator.
 * - The default `functions` namespace -> the bare leaf (#17890), unless a flat
 *   top-level tool already uses that name (`flatNames`), in which case it falls
 *   back to the qualified `functions__<leaf>` to avoid duplicate Chat names.
 * - Otherwise -> `${nsName}__${leaf}`.
 * - Names over the 64-char Chat limit are hash-truncated deterministically
 *   (same scheme as open-sse/utils/kiroSanitizer.ts) so the same input always
 *   produces the same truncated wire name.
 */
export function flattenNamespaceToolName(
  nsName: string,
  leaf: string,
  flatNames?: ReadonlySet<string>
): string {
  if (!nsName) return leaf;
  if (leaf.includes("__")) return leaf;
  if (nsName === DEFAULT_NAMESPACE && !flatNames?.has(leaf)) return leaf;
  const prefix = nsName.endsWith("__") ? nsName : `${nsName}__`;
  const qualified = `${prefix}${leaf}`;
  if (qualified.length <= MAX_TOOL_NAME_LEN) return qualified;
  const hash = createHash("sha256").update(qualified).digest("hex").slice(0, 7);
  return `${qualified.slice(0, MAX_TOOL_NAME_LEN - 8)}_${hash}`;
}

/**
 * Resolve the Chat wire name a Responses tool_choice (or allowed_tools entry)
 * should target. A `{ name, namespace }` reference to a child of a flattened
 * namespace tool is qualified with {@link flattenNamespaceToolName} so the forced
 * name matches the declared Chat function exactly. When the reference carries no
 * namespace, or the qualified name was not declared, the leaf is returned as-is.
 */
export function resolveNamespacedToolChoiceName(
  namespace: unknown,
  name: string,
  declaredNames: ReadonlySet<string>,
  flatNames?: ReadonlySet<string>
): string {
  if (typeof namespace !== "string" || !namespace || !name) return name;
  const qualified = flattenNamespaceToolName(namespace, name, flatNames);
  return declaredNames.has(qualified) ? qualified : name;
}

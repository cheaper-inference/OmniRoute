// Pure, stateless helpers: map a provider-injected, dotted tool-call name back to
// a tool name the request actually declared.
//
// Some Chat Completions upstreams echo tool calls with a harmony-style prefix the
// client never declared (`functions.exec` while the request declared a flat
// `exec`). A Responses client (Codex CLI) dispatches on the exact declared name
// and rejects the turn with `unsupported call: functions.exec`. The fix is to
// match the emitted name's dotted suffixes against the DECLARED names only —
// never against a guessed alias table, never fuzzily.

type JsonRecord = Record<string, unknown>;

const TOOL_NAME_PREFIX_SEPARATOR = ".";

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

function addName(names: Set<string>, value: unknown) {
  if (typeof value !== "string") return;
  const name = value.trim();
  if (name) names.add(name);
}

/**
 * Collect every tool name declared by a request body's `tools[]`, accepting the
 * Chat Completions shape (`{type:"function",function:{name}}`), the Responses /
 * Claude flat shape (`{name}`) and Responses `type:"namespace"` children.
 * Returns null when the body declares no tools.
 */
export function collectDeclaredToolNames(body: unknown): Set<string> | null {
  const tools = asRecord(body)?.tools;
  if (!Array.isArray(tools)) return null;

  const names = new Set<string>();
  for (const tool of tools) {
    const item = asRecord(tool);
    if (!item) continue;
    addName(names, asRecord(item.function)?.name);
    addName(names, item.name);
    if (item.type === "namespace" && Array.isArray(item.tools)) {
      for (const child of item.tools) addName(names, asRecord(child)?.name);
    }
  }
  return names.size > 0 ? names : null;
}

/**
 * Names carried by a tool-name side channel: the keys of a request identity
 * ledger / alias map, plus the string values of an alias map (the original names
 * a sanitizing translator restores before this seam sees them).
 */
export function toolNameSideChannelNames(map: unknown): string[] {
  const entries =
    map instanceof Map
      ? [...map.entries()]
      : asRecord(map)
        ? Object.entries(map as JsonRecord)
        : [];
  const names: string[] = [];
  for (const [key, value] of entries) {
    if (typeof key === "string") names.push(key);
    if (typeof value === "string") names.push(value);
  }
  return names;
}

/** Union every non-empty string from the given sources; null when empty. */
export function mergeDeclaredToolNames(
  ...sources: Array<Iterable<unknown> | null | undefined>
): Set<string> | null {
  const names = new Set<string>();
  for (const source of sources) {
    if (!source) continue;
    for (const value of source) addName(names, value);
  }
  return names.size > 0 ? names : null;
}

export type CanonicalToolName = {
  /** The name to emit: a declared name, or the input unchanged. */
  name: string;
  /** True when the input was a dotted name that matched no declared name. */
  unresolved: boolean;
};

/**
 * Canonicalize an emitted tool-call name against the request's declared names.
 *
 * 1. No declared names, or no `.` in the name → unchanged (no guessing).
 * 2. Exact declared match → unchanged (a declared dotted name like `a.b` wins).
 * 3. Each dotted suffix, longest first (`x.functions.exec` → `functions.exec`
 *    → `exec`); the first one that is EXACTLY a declared name is returned.
 * 4. Otherwise → unchanged, flagged `unresolved` (forwarded, never dropped).
 */
export function canonicalizeDeclaredToolName(
  name: string,
  declaredNames: ReadonlySet<string> | null | undefined
): CanonicalToolName {
  if (!name || !declaredNames || declaredNames.size === 0) return { name, unresolved: false };
  if (!name.includes(TOOL_NAME_PREFIX_SEPARATOR) || declaredNames.has(name)) {
    return { name, unresolved: false };
  }

  const parts = name.split(TOOL_NAME_PREFIX_SEPARATOR);
  for (let i = 1; i < parts.length; i++) {
    const candidate = parts.slice(i).join(TOOL_NAME_PREFIX_SEPARATOR);
    if (candidate && declaredNames.has(candidate)) return { name: candidate, unresolved: false };
  }
  return { name, unresolved: true };
}

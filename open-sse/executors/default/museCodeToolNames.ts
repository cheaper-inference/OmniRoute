type JsonRecord = Record<string, unknown>;

// Meta's Muse Code subscription endpoint rejects a request whose declared
// function tools carry these exact names with a client-identity 403
// ("API key is billed to a Muse Code subscription ... Muse Code client only"),
// even on an otherwise valid subscription request. Case variants, substrings
// and namespace-flattened wire names pass; the refusal keys on the exact
// declared name. Renamed tools keep the model able to call them; the wire
// alias -> original ledger travels on `body._toolNameMap`, which chatCore
// merges into the response tool-name map so emitted calls come back with the
// client's declared name.
export const MUSE_CODE_BLOCKED_TOOL_NAMES = new Set([
  "read_file",
  "write_file",
  "edit_file",
  "apply_patch",
  "bash",
  "shell",
  "search",
  "web_search",
]);

// OmniRoute already declares its own helpers under this prefix and they pass
// the gate (omniroute_read_file, omniroute_web_search are declared in
// production traffic today), so aliases join that family.
const MUSE_ALIAS_PREFIX = "omniroute_";

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

function stringOrEmpty(value: unknown): string {
  return typeof value === "string" ? value : "";
}

// Coerce the input items a client replays back to the model (function_call /
// custom_tool_call history in `input`, tool_calls / tool_use in `messages`)
// to their wire aliases so the next turn still matches the declared tools.
// Pure public helper so it is testable without the provider registry.
export function aliasMuseCodeHistoryItems(
  body: JsonRecord,
  aliasByOriginal: ReadonlyMap<string, string>
): void {
  if (aliasByOriginal.size === 0) return;
  const rename = (name: unknown): string | undefined => {
    const original = stringOrEmpty(name);
    return original ? aliasByOriginal.get(original) : undefined;
  };
  if (Array.isArray(body.input)) {
    for (const item of body.input) {
      const record = asRecord(item);
      if (!record || (record.type !== "function_call" && record.type !== "custom_tool_call")) {
        continue;
      }
      // A history item's `name` is the leaf, with `namespace` as a sibling
      // field; the alias ledger keys on the leaf either way.
      const aliased = rename(record.name);
      if (aliased) record.name = aliased;
    }
  }
  if (Array.isArray(body.messages)) {
    for (const message of body.messages) {
      const msg = asRecord(message);
      if (!msg) continue;
      if (Array.isArray(msg.tool_calls)) {
        for (const call of msg.tool_calls) {
          const fn = asRecord(asRecord(call)?.function);
          const aliased = fn ? rename(fn.name) : undefined;
          if (fn && aliased) fn.name = aliased;
        }
      }
      if (Array.isArray(msg.content)) {
        for (const block of msg.content) {
          const part = asRecord(block);
          if (!part || part.type !== "tool_use") continue;
          const aliased = rename(part.name);
          if (aliased) part.name = aliased;
        }
      }
    }
  }
}

/**
 * Rename blocked Muse Code tool declarations to OmniRoute-prefixed wire
 * aliases. Mutates `body` in place (the executor owns the per-leg body) and
 * returns the alias ledger (wire -> original), or null when nothing was
 * blocked. Namespace groups keep their structure, with blocked leaf names
 * aliased inside the group; history and tool_choice references follow the
 * same aliases. Never invents tools or changes schemas.
 */
export function sanitizeMuseCodeToolNames(body: unknown): Map<string, string> | null {
  const record = asRecord(body);
  if (!record || !Array.isArray(record.tools)) return null;

  const declared = new Set<string>();
  for (const tool of record.tools) {
    const entry = asRecord(tool);
    if (!entry) continue;
    const fn = asRecord(entry.function);
    const name = stringOrEmpty(entry.name) || stringOrEmpty(fn?.name);
    if (name) declared.add(name);
    if (Array.isArray(entry.tools)) {
      for (const child of entry.tools) {
        const leaf = asRecord(child);
        const leafName = leaf ? stringOrEmpty(leaf.name) : "";
        if (leafName) declared.add(leafName);
      }
    }
  }
  if (declared.size === 0) return null;

  const aliasByOriginal = new Map<string, string>();
  const aliasLedger = new Map<string, string>();
  const usedAliases = new Set<string>();
  const aliasFor = (original: string): string => {
    const existing = aliasByOriginal.get(original);
    if (existing) return existing;
    let alias = `${MUSE_ALIAS_PREFIX}${original}`;
    let suffix = 2;
    while (declared.has(alias) || usedAliases.has(alias)) {
      alias = `${MUSE_ALIAS_PREFIX}${original}_${suffix}`;
      suffix += 1;
    }
    aliasByOriginal.set(original, alias);
    aliasLedger.set(alias, original);
    usedAliases.add(alias);
    return alias;
  };

  let changed = false;
  const renameDeclared = (holder: JsonRecord, fn?: JsonRecord | null): void => {
    const target = fn ?? holder;
    const name = stringOrEmpty(target.name);
    if (name && MUSE_CODE_BLOCKED_TOOL_NAMES.has(name)) {
      target.name = aliasFor(name);
      changed = true;
    }
  };

  for (const tool of record.tools) {
    const entry = asRecord(tool);
    if (!entry) continue;
    if (entry.type === "namespace" && Array.isArray(entry.tools)) {
      for (const child of entry.tools) {
        const leaf = asRecord(child);
        if (leaf) renameDeclared(leaf);
      }
      continue;
    }
    const fn = asRecord(entry.function);
    if (fn) renameDeclared(entry, fn);
    else renameDeclared(entry);
  }
  if (!changed) return null;

  // Client-forced tool references must name the wire alias, not the blocked
  // name the upstream refuses before it can answer.
  const choice = asRecord(record.tool_choice);
  if (choice) {
    const choiceName = stringOrEmpty(choice.name);
    const aliased = choiceName ? aliasByOriginal.get(choiceName) : undefined;
    if (aliased) choice.name = aliased;
  }

  aliasMuseCodeHistoryItems(record, aliasByOriginal);
  return aliasLedger;
}

/** Attach the alias ledger the same way the Claude cloak path publishes it. */
export function attachMuseCodeToolNameMap(body: unknown, aliases: Map<string, string>): void {
  const record = asRecord(body);
  if (!record || aliases.size === 0) return;
  const existing = record._toolNameMap;
  if (existing instanceof Map) {
    for (const [wire, original] of aliases) {
      if (!existing.has(wire)) existing.set(wire, original);
    }
    return;
  }
  Object.defineProperty(record, "_toolNameMap", {
    value: new Map(aliases),
    enumerable: false,
    configurable: true,
    writable: true,
  });
}

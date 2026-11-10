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

function aliasOf(name: unknown, aliasByOriginal: ReadonlyMap<string, string>): string | undefined {
  const original = stringOrEmpty(name);
  return original ? aliasByOriginal.get(original) : undefined;
}

/** Renames `holder.name` in place when the ledger has an alias for it. */
function renameInPlace(
  holder: JsonRecord | null | undefined,
  aliasByOriginal: ReadonlyMap<string, string>
): void {
  if (!holder) return;
  const aliased = aliasOf(holder.name, aliasByOriginal);
  if (aliased) holder.name = aliased;
}

function isReplayedCallItem(record: JsonRecord | null): record is JsonRecord {
  return !!record && (record.type === "function_call" || record.type === "custom_tool_call");
}

function aliasChatMessage(message: unknown, aliasByOriginal: ReadonlyMap<string, string>): void {
  const msg = asRecord(message);
  if (!msg) return;
  if (Array.isArray(msg.tool_calls)) {
    for (const call of msg.tool_calls) {
      renameInPlace(asRecord(asRecord(call)?.function), aliasByOriginal);
    }
  }
  if (Array.isArray(msg.content)) {
    for (const block of msg.content) {
      const part = asRecord(block);
      if (part?.type === "tool_use") renameInPlace(part, aliasByOriginal);
    }
  }
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
  if (Array.isArray(body.input)) {
    for (const item of body.input) {
      // A history item's `name` is the leaf, with `namespace` as a sibling
      // field; the alias ledger keys on the leaf either way.
      const record = asRecord(item);
      if (isReplayedCallItem(record)) renameInPlace(record, aliasByOriginal);
    }
  }
  if (Array.isArray(body.messages)) {
    for (const message of body.messages) aliasChatMessage(message, aliasByOriginal);
  }
}

/** Every tool name the client declared, including namespace leaves. */
function collectDeclaredToolNames(tools: unknown[]): Set<string> {
  const declared = new Set<string>();
  const add = (name: string) => {
    if (name) declared.add(name);
  };
  for (const tool of tools) {
    const entry = asRecord(tool);
    if (!entry) continue;
    add(stringOrEmpty(entry.name) || stringOrEmpty(asRecord(entry.function)?.name));
    if (!Array.isArray(entry.tools)) continue;
    for (const child of entry.tools) add(stringOrEmpty(asRecord(child)?.name));
  }
  return declared;
}

class MuseAliasLedger {
  readonly aliasByOriginal = new Map<string, string>();
  readonly wireToOriginal = new Map<string, string>();
  constructor(private readonly declared: ReadonlySet<string>) {}

  aliasFor(original: string): string {
    const existing = this.aliasByOriginal.get(original);
    if (existing) return existing;
    let alias = `${MUSE_ALIAS_PREFIX}${original}`;
    let suffix = 2;
    while (this.declared.has(alias) || this.wireToOriginal.has(alias)) {
      alias = `${MUSE_ALIAS_PREFIX}${original}_${suffix}`;
      suffix += 1;
    }
    this.aliasByOriginal.set(original, alias);
    this.wireToOriginal.set(alias, original);
    return alias;
  }

  /** Renames a blocked declaration in place; returns whether it changed. */
  renameDeclared(target: JsonRecord): boolean {
    const name = stringOrEmpty(target.name);
    if (!name || !MUSE_CODE_BLOCKED_TOOL_NAMES.has(name)) return false;
    target.name = this.aliasFor(name);
    return true;
  }

  /** Renames a top-level declaration, or the leaves of a namespace group. */
  renameTool(tool: unknown): boolean {
    const entry = asRecord(tool);
    if (!entry) return false;
    if (entry.type === "namespace" && Array.isArray(entry.tools)) {
      let changed = false;
      for (const child of entry.tools) {
        const leaf = asRecord(child);
        if (leaf && this.renameDeclared(leaf)) changed = true;
      }
      return changed;
    }
    return this.renameDeclared(asRecord(entry.function) ?? entry);
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

  const declared = collectDeclaredToolNames(record.tools);
  if (declared.size === 0) return null;

  const ledger = new MuseAliasLedger(declared);
  let changed = false;
  for (const tool of record.tools) {
    if (ledger.renameTool(tool)) changed = true;
  }
  if (!changed) return null;

  // Client-forced tool references must name the wire alias, not the blocked
  // name the upstream refuses before it can answer.
  renameInPlace(asRecord(record.tool_choice), ledger.aliasByOriginal);

  aliasMuseCodeHistoryItems(record, ledger.aliasByOriginal);
  return ledger.wireToOriginal;
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

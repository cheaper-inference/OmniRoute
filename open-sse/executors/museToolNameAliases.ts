import { createHash } from "node:crypto";

type JsonRecord = Record<string, unknown>;
type ToolIdentity = { namespace: string; name: string };
type NamePosition = {
  record: JsonRecord;
  namespace: string | undefined;
  isFunction: boolean;
  isDeclaration: boolean;
};
type NameVisitor = (position: NamePosition) => JsonRecord;
type AliasTarget = { identity: ToolIdentity; wireNames: Set<string>; hasIdentity: boolean };

const COLLIDING_NAMES = new Set([
  "read_file",
  "write_file",
  "edit_file",
  "bash",
  "web_search",
  "tool_search",
  "subagent_send_message",
  "subagent_cancel",
]);
const MAX_NAME_LENGTH = 64;

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function namespaceOf(value: unknown): string | undefined {
  return typeof value === "string" && value ? value : undefined;
}

function isIdentity(value: unknown): value is ToolIdentity {
  return (
    isRecord(value) &&
    typeof value.namespace === "string" &&
    typeof value.name === "string" &&
    !!value.name
  );
}

function identityKey(identity: ToolIdentity): string {
  return JSON.stringify([identity.namespace, identity.name]);
}

function mapRecords(value: unknown, visit: (record: JsonRecord) => JsonRecord): unknown {
  if (!Array.isArray(value)) return value;
  let changed = false;
  const next = value.map((item: unknown) => {
    const rewritten = isRecord(item) ? visit(item) : item;
    changed ||= rewritten !== item;
    return rewritten;
  });
  return changed ? next : value;
}

/** Only the supported Responses declaration depth, never arbitrary nested objects. */
function visitDeclarations(value: unknown, visit: NameVisitor): unknown {
  return mapRecords(value, (tool) => {
    const rewritten = visit({
      record: tool,
      namespace: namespaceOf(tool.namespace),
      isFunction: tool.type === "function",
      isDeclaration: true,
    });
    if (tool.type !== "namespace") return rewritten;
    const children = mapRecords(tool.tools, (child) =>
      visit({
        record: child,
        namespace: namespaceOf(tool.name),
        isFunction: (child.type ?? "function") === "function",
        isDeclaration: true,
      })
    );
    return children === tool.tools ? rewritten : { ...rewritten, tools: children };
  });
}

/** One structural walker shared by reservation, identity collection, and copy-on-write. */
function visitRequest(body: JsonRecord, visit: NameVisitor): JsonRecord {
  const tools = visitDeclarations(body.tools, visit);
  const input = mapRecords(body.input, (item) => {
    const rewritten = visit({
      record: item,
      namespace: namespaceOf(item.namespace),
      isFunction: item.type === "function_call",
      isDeclaration: false,
    });
    if (item.type !== "additional_tools") return rewritten;
    const declarations = visitDeclarations(item.tools, visit);
    return declarations === item.tools ? rewritten : { ...rewritten, tools: declarations };
  });
  let choice = body.tool_choice;
  if (isRecord(choice)) {
    const original = choice;
    const rewrittenChoice = visit({
      record: original,
      namespace: namespaceOf(original.namespace),
      isFunction: original.type === "function",
      isDeclaration: false,
    });
    choice = rewrittenChoice;
    if (original.type === "allowed_tools") {
      const allowed = mapRecords(original.tools, (descriptor) =>
        visit({
          record: descriptor,
          namespace: namespaceOf(descriptor.namespace),
          isFunction: descriptor.type === "function",
          isDeclaration: false,
        })
      );
      if (allowed !== original.tools) choice = { ...rewrittenChoice, tools: allowed };
    }
  }
  if (tools === body.tools && input === body.input && choice === body.tool_choice) return body;
  const next = { ...body };
  if (tools !== body.tools) next.tools = tools;
  if (input !== body.input) next.input = input;
  if (choice !== body.tool_choice) next.tool_choice = choice;
  return next;
}

function readLedgers(
  body: JsonRecord,
  reserved: Set<string>
): {
  aliases: Map<string, string>;
  identities: Map<string, ToolIdentity>;
} {
  const aliases = new Map<string, string>();
  const identities = new Map<string, ToolIdentity>();
  // Legacy namespace identities migrate to the dedicated channel. Dedicated entries win.
  for (const [channel, value] of [
    ["aliases", body._toolNameMap],
    ["identities", body._namespaceToolIdentityMap],
  ] as const) {
    if (!(value instanceof Map)) continue;
    const ledger: ReadonlyMap<unknown, unknown> = value;
    for (const [key, entry] of ledger) {
      if (typeof key !== "string") continue;
      reserved.add(key);
      if (channel === "aliases" && typeof entry === "string") aliases.set(key, entry);
      if (isIdentity(entry)) identities.set(key, { ...entry });
    }
  }
  return { aliases, identities };
}

function clientName(name: string, aliases: ReadonlyMap<string, string>): string {
  let current = name;
  const seen = new Set<string>();
  while (aliases.has(current)) {
    if (seen.has(current)) return name; // A malformed cycle cannot identify a client original.
    seen.add(current);
    const original = aliases.get(current);
    if (!original || original === current) break;
    current = original;
  }
  return current;
}

function candidateName(identity: ToolIdentity, suffix: string): string {
  const hash = createHash("sha256").update(identityKey(identity)).digest("hex").slice(0, 16);
  const prefix = `muse_${identity.name}`.replace(/[^A-Za-z0-9_-]/g, "_");
  // Preserve the complete hash suffix when an occupied 64-character candidate needs a counter.
  return `${prefix.slice(0, MAX_NAME_LENGTH - hash.length - 1 - suffix.length)}_${hash}${suffix}`;
}

function publishLedger(body: JsonRecord, key: string, value: Map<string, unknown>): void {
  Object.defineProperty(body, key, {
    value,
    enumerable: false,
    configurable: true,
    writable: true,
  });
}

/**
 * Pure, inactive request helper for #18600. Alias only exact Muse-reserved FUNCTION names
 * on Responses declarations, additional_tools, function_call history, and function choices.
 * Native namespace fields/containers stay native; flat tools never acquire a namespace.
 * Existing string aliases compose directly to client names; identities use a separate ledger.
 * Ambiguous bare references remain unchanged, rather than choosing the wrong namespace.
 */
export function aliasMuseToolNames(body: unknown): unknown {
  if (!isRecord(body)) return body;
  const reserved = new Set<string>();
  const prior = readLedgers(body, reserved);
  const positions: NamePosition[] = [];
  visitRequest(body, (position) => {
    if (typeof position.record.name === "string") reserved.add(position.record.name);
    const nested = position.record.function;
    if (isRecord(nested) && typeof nested.name === "string") reserved.add(nested.name);
    if (position.isFunction && typeof position.record.name === "string") positions.push(position);
    return position.record;
  });

  const declared = new Map<string, Map<string, ToolIdentity>>();
  const wireOwners = new Map<string, Set<string>>();
  const reusable = new Map<string, Set<string>>();
  const previousIdentity = (position: NamePosition): ToolIdentity | undefined => {
    let wire = position.record.name as string;
    const seen = new Set<string>();
    while (!seen.has(wire)) {
      seen.add(wire);
      const existing = prior.identities.get(wire);
      if (existing && (!position.namespace || position.namespace === existing.namespace)) {
        return existing;
      }
      const original = prior.aliases.get(wire);
      if (!original) break;
      wire = original;
    }
    return undefined;
  };
  const directIdentity = (position: NamePosition): ToolIdentity =>
    previousIdentity(position) ?? {
      namespace: position.namespace ?? "",
      name: clientName(position.record.name as string, prior.aliases),
    };
  for (const position of positions) {
    if (!position.isDeclaration) continue;
    const identity = directIdentity(position);
    const wire = position.record.name as string;
    const key = identityKey(identity);
    const owners = wireOwners.get(wire) ?? new Set<string>();
    owners.add(key);
    wireOwners.set(wire, owners);
    if (
      !COLLIDING_NAMES.has(wire) &&
      /^[A-Za-z0-9_-]{1,64}$/.test(wire) &&
      (prior.aliases.has(wire) || previousIdentity(position))
    ) {
      const names = reusable.get(key) ?? new Set<string>();
      names.add(wire);
      reusable.set(key, names);
    }
    // Also index client leaves: a still-ambiguous reference must stay ambiguous on redispatch.
    for (const name of new Set([position.record.name as string, identity.name])) {
      const entries = declared.get(name) ?? new Map<string, ToolIdentity>();
      entries.set(identityKey(identity), identity);
      declared.set(name, entries);
    }
  }
  const resolveIdentity = (position: NamePosition): ToolIdentity | null => {
    if (position.isDeclaration || position.namespace) return directIdentity(position);
    const name = position.record.name as string;
    const existing = previousIdentity(position);
    if (existing) return existing;
    // Intermediate aliases may name a declaration only by its composed client original.
    const entries = declared.get(name) ?? declared.get(clientName(name, prior.aliases));
    if (!entries?.size) return directIdentity(position); // History-only means an explicit flat call.
    const candidates = [...entries.values()];
    const native = candidates.find((identity) => identity.namespace === "");
    const defaults = candidates.find((identity) => identity.namespace === "functions");
    return native ?? defaults ?? (candidates.length === 1 ? candidates[0] : null);
  };

  const targets = new Map<string, AliasTarget>();
  for (const position of positions) {
    const name = position.record.name as string;
    if (!COLLIDING_NAMES.has(name)) continue;
    const identity = resolveIdentity(position);
    if (!identity) continue;
    const key = identityKey(identity);
    const target = targets.get(key) ?? {
      identity,
      wireNames: new Set<string>(),
      hasIdentity: false,
    };
    target.wireNames.add(name);
    target.hasIdentity ||= previousIdentity(position) !== undefined;
    targets.set(key, target);
  }
  const aliases = new Map<string, string>();
  for (const [name] of prior.aliases) aliases.set(name, clientName(name, prior.aliases));
  const identities = new Map(prior.identities);
  const allocated = new Map<string, string>();
  for (const key of [...targets.keys()].sort()) {
    const target = targets.get(key) as AliasTarget;
    // Reuse only a valid declared FUNCTION wire with this one proven actual identity.
    const existingWire = [...(reusable.get(key) ?? [])]
      .filter((wire) => wireOwners.get(wire)?.size === 1)
      .sort()[0];
    let candidate = existingWire ?? candidateName(target.identity, "");
    if (!existingWire) {
      let counter = 0;
      while (reserved.has(candidate)) candidate = candidateName(target.identity, `_${++counter}`);
    }
    reserved.add(candidate);
    allocated.set(key, candidate);
    aliases.set(candidate, target.identity.name);
    // Keep existing explicit-flat guards, but never synthesize them for ordinary flat tools.
    if (target.identity.namespace || target.hasIdentity) {
      for (const wire of target.wireNames) {
        const existing = identities.get(wire);
        if (existing && identityKey(existing) === key) identities.delete(wire);
      }
      identities.set(candidate, { ...target.identity });
    }
  }

  const rewritten = visitRequest(body, (position) => {
    const name = position.record.name;
    if (!position.isFunction || typeof name !== "string" || !COLLIDING_NAMES.has(name)) {
      return position.record;
    }
    const identity = resolveIdentity(position);
    const alias = identity ? allocated.get(identityKey(identity)) : undefined;
    return alias ? { ...position.record, name: alias } : position.record;
  });
  const keepAliases = aliases.size > 0 || body._toolNameMap !== undefined;
  const keepIdentities = identities.size > 0 || body._namespaceToolIdentityMap !== undefined;
  if (rewritten === body && !keepAliases && !keepIdentities) return body;
  const next = rewritten === body ? { ...body } : rewritten;
  if (keepAliases) publishLedger(next, "_toolNameMap", aliases);
  if (keepIdentities) publishLedger(next, "_namespaceToolIdentityMap", identities);
  return next;
}

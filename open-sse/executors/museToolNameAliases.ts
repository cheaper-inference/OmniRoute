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

/**
 * Every function name is aliased, not a list of known collisions. Muse refuses a request
 * ("Muse Code subscriptions cover requests from the Muse Code client only") that declares a
 * function under a name it keeps for its own client: its tool names (workflow, search,
 * monitor, web_fetch, ...) and more (shell, apply_patch, update_plan). That set is the
 * server's, it is not published, and it grows with Muse Code releases, so a hard-coded copy
 * goes stale: it missed shell, OpenCode's shell tool.
 */
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

type Ledgers = ReturnType<typeof readLedgers>;
type DeclarationIndex = {
  declared: Map<string, Map<string, ToolIdentity>>;
  wireOwners: Map<string, Set<string>>;
  reusable: Map<string, Set<string>>;
};
type IdentityResolver = (position: NamePosition) => ToolIdentity | null;

function collectPositions(body: JsonRecord, reserved: Set<string>): NamePosition[] {
  const positions: NamePosition[] = [];
  visitRequest(body, (position) => {
    const { record } = position;
    if (typeof record.name === "string") reserved.add(record.name);
    const nested = record.function;
    if (isRecord(nested) && typeof nested.name === "string") reserved.add(nested.name);
    if (position.isFunction && typeof record.name === "string") positions.push(position);
    return record;
  });
  return positions;
}

function previousIdentity(prior: Ledgers, position: NamePosition): ToolIdentity | undefined {
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
}

function directIdentity(prior: Ledgers, position: NamePosition): ToolIdentity {
  return (
    previousIdentity(prior, position) ?? {
      namespace: position.namespace ?? "",
      name: clientName(position.record.name as string, prior.aliases),
    }
  );
}

function addToSetMap(map: Map<string, Set<string>>, key: string, value: string): void {
  const set = map.get(key) ?? new Set<string>();
  set.add(value);
  map.set(key, set);
}

/** Only this helper's own alias for the identity, never a client name or another layer's alias. */
function isReusableWire(identity: ToolIdentity, wire: string): boolean {
  if (wire === candidateName(identity, "")) return true;
  const counter = /_([1-9][0-9]*)$/.exec(wire);
  return counter !== null && wire === candidateName(identity, `_${counter[1]}`);
}

function indexDeclarations(prior: Ledgers, positions: NamePosition[]): DeclarationIndex {
  const index: DeclarationIndex = {
    declared: new Map(),
    wireOwners: new Map(),
    reusable: new Map(),
  };
  for (const position of positions) {
    if (!position.isDeclaration) continue;
    const identity = directIdentity(prior, position);
    const wire = position.record.name as string;
    const key = identityKey(identity);
    addToSetMap(index.wireOwners, wire, key);
    if (isReusableWire(identity, wire)) addToSetMap(index.reusable, key, wire);
    // Also index client leaves: a still-ambiguous reference must stay ambiguous on redispatch.
    for (const name of new Set([wire, identity.name])) {
      const entries = index.declared.get(name) ?? new Map<string, ToolIdentity>();
      entries.set(key, identity);
      index.declared.set(name, entries);
    }
  }
  return index;
}

function pickDeclaredIdentity(entries: Map<string, ToolIdentity>): ToolIdentity | null {
  const candidates = [...entries.values()];
  const native = candidates.find((identity) => identity.namespace === "");
  const defaults = candidates.find((identity) => identity.namespace === "functions");
  return native ?? defaults ?? (candidates.length === 1 ? candidates[0] : null);
}

function resolveIdentity(
  prior: Ledgers,
  declared: DeclarationIndex["declared"],
  position: NamePosition
): ToolIdentity | null {
  if (position.isDeclaration || position.namespace) return directIdentity(prior, position);
  const name = position.record.name as string;
  const existing = previousIdentity(prior, position);
  if (existing) return existing;
  // Intermediate aliases may name a declaration only by its composed client original.
  const entries = declared.get(name) ?? declared.get(clientName(name, prior.aliases));
  if (!entries?.size) return directIdentity(prior, position); // History-only means an explicit flat call.
  return pickDeclaredIdentity(entries);
}

function collectTargets(
  prior: Ledgers,
  positions: NamePosition[],
  resolve: IdentityResolver
): Map<string, AliasTarget> {
  const targets = new Map<string, AliasTarget>();
  for (const position of positions) {
    const name = position.record.name as string;
    const identity = resolve(position);
    if (!identity) continue;
    const key = identityKey(identity);
    const target = targets.get(key) ?? {
      identity,
      wireNames: new Set<string>(),
      hasIdentity: false,
    };
    target.wireNames.add(name);
    target.hasIdentity ||= previousIdentity(prior, position) !== undefined;
    targets.set(key, target);
  }
  return targets;
}

function pickCandidate(
  key: string,
  target: AliasTarget,
  reserved: Set<string>,
  index: DeclarationIndex
): string {
  // Reuse only a valid declared FUNCTION wire with this one proven actual identity.
  const existingWire = [...(index.reusable.get(key) ?? [])]
    .filter((wire) => index.wireOwners.get(wire)?.size === 1)
    .sort()[0];
  if (existingWire) return existingWire;
  let candidate = candidateName(target.identity, "");
  let counter = 0;
  while (reserved.has(candidate)) candidate = candidateName(target.identity, `_${++counter}`);
  return candidate;
}

function moveIdentityGuard(
  identities: Map<string, ToolIdentity>,
  key: string,
  target: AliasTarget,
  candidate: string
): void {
  // Keep existing explicit-flat guards, but never synthesize them for ordinary flat tools.
  if (!target.identity.namespace && !target.hasIdentity) return;
  for (const wire of target.wireNames) {
    const existing = identities.get(wire);
    if (existing && identityKey(existing) === key) identities.delete(wire);
  }
  identities.set(candidate, { ...target.identity });
}

function allocateAliases(
  prior: Ledgers,
  reserved: Set<string>,
  index: DeclarationIndex,
  targets: Map<string, AliasTarget>
): {
  aliases: Map<string, string>;
  identities: Map<string, ToolIdentity>;
  allocated: Map<string, string>;
} {
  const aliases = new Map<string, string>();
  for (const [name] of prior.aliases) aliases.set(name, clientName(name, prior.aliases));
  const identities = new Map(prior.identities);
  const allocated = new Map<string, string>();
  for (const key of [...targets.keys()].sort()) {
    const target = targets.get(key) as AliasTarget;
    const candidate = pickCandidate(key, target, reserved, index);
    reserved.add(candidate);
    allocated.set(key, candidate);
    aliases.set(candidate, target.identity.name);
    moveIdentityGuard(identities, key, target, candidate);
  }
  return { aliases, identities, allocated };
}

function rewriteFunctionNames(
  body: JsonRecord,
  resolve: IdentityResolver,
  allocated: ReadonlyMap<string, string>
): JsonRecord {
  return visitRequest(body, (position) => {
    const name = position.record.name;
    if (!position.isFunction || typeof name !== "string") return position.record;
    const identity = resolve(position);
    const alias = identity ? allocated.get(identityKey(identity)) : undefined;
    return alias ? { ...position.record, name: alias } : position.record;
  });
}

function publishLedgers(
  body: JsonRecord,
  rewritten: JsonRecord,
  aliases: Map<string, string>,
  identities: Map<string, ToolIdentity>
): JsonRecord {
  const keepAliases = aliases.size > 0 || body._toolNameMap !== undefined;
  const keepIdentities = identities.size > 0 || body._namespaceToolIdentityMap !== undefined;
  if (rewritten === body && !keepAliases && !keepIdentities) return body;
  const next = rewritten === body ? { ...body } : rewritten;
  if (keepAliases) publishLedger(next, "_toolNameMap", aliases);
  if (keepIdentities) publishLedger(next, "_namespaceToolIdentityMap", identities);
  return next;
}

/**
 * Responses request helper for #18600. Alias every FUNCTION name on Responses declarations,
 * additional_tools, function_call history, and function choices (see the note at the top).
 * Native namespace fields/containers stay native; flat tools never acquire a namespace.
 * Existing string aliases compose directly to client names; identities use a separate ledger.
 * Ambiguous bare references remain unchanged, rather than choosing the wrong namespace.
 */
export function aliasMuseToolNames(body: unknown): unknown {
  if (!isRecord(body)) return body;
  const reserved = new Set<string>();
  const prior = readLedgers(body, reserved);
  const positions = collectPositions(body, reserved);
  const index = indexDeclarations(prior, positions);
  const resolve: IdentityResolver = (position) => resolveIdentity(prior, index.declared, position);
  const targets = collectTargets(prior, positions, resolve);
  const { aliases, identities, allocated } = allocateAliases(prior, reserved, index, targets);
  const rewritten = rewriteFunctionNames(body, resolve, allocated);
  return publishLedgers(body, rewritten, aliases, identities);
}

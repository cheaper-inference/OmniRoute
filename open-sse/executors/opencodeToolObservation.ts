/**
 * opencodeToolObservation.ts — which tool names the gated upstream accepts right now.
 *
 * The free tier inspects the `tools` array, and what it accepts moves. Measured on
 * 2026-09-18: one made-up tool was accepted on `big-pickle` and refused on
 * `nemotron-3.5-lightning-free` and `muse-spark-1.3-contributor-free` — the same body that
 * the first of those had accepted a day earlier. No published artifact carries that rule;
 * the upstream npm package is a 3 KB platform dispatcher. A pinned placeholder is
 * therefore a guess that goes stale between releases.
 *
 * The relayed traffic already carries the answer. A client request that goes out with
 * tools and comes back OK proves which names the upstream accepts, for that surface and
 * that model, at that moment. This module remembers those names so a later request
 * carrying none can borrow them, and forgets them when a borrowed set is refused.
 *
 * Only what the client declared is kept: the accepted tool names, and — when catalog routing
 * is on — the parameter object each of those tools already carried. Nothing else: no
 * description, no conversation content. A placeholder rebuilt from a name alone declares an
 * empty parameter object; a name whose accepted parameters were recorded is declared with
 * them, because the upstream refuses a borrowed quartet member (`read`, `bash`) whose
 * parameter object carries no properties.
 *
 * Leaf module: no internal imports, so the executor and the contract can both use it.
 */

/**
 * Bounds are arbitrary and revisable: they cap memory, they are not a measured property of
 * the upstream. Entries are small (short strings), so the name ceiling is generous on
 * purpose; the parameter budget bounds what the schemas add.
 */
const MAX_NAMES_PER_ENTRY = 32;
const MAX_ENTRIES = 64;
/** One serialized parameter object; a larger schema is not worth keeping. */
const MAX_PARAMETERS_CHARS = 4_000;
/** The whole store, so sixty-four entries cannot carry sixty-four large schemas. */
const MAX_PARAMETERS_TOTAL_CHARS = 32_000;
const NAME_PATTERN = /^[A-Za-z_][A-Za-z0-9_-]{0,63}$/;

/**
 * How many refusals in a row a borrowed set takes before it is dropped.
 *
 * One refusal is not proof: the same body was refused and then accepted on
 * `muse-spark-1.3-contributor-free` minutes apart (measured 2026-09-18), so the verdict
 * carries a share of noise. Dropping on the first refusal would make the store oscillate
 * and fall back to a placeholder already known to be refused. Arbitrary and revisable.
 */
const REFUSALS_BEFORE_FORGETTING = 3;

/** A schema frozen at acceptance time: a private copy, not a reference to the request body. */
type StoredParameters = Readonly<Record<string, unknown>>;

type ObservedEntry = {
  readonly names: readonly string[];
  /** Serialized-at-accept parameters, by tool name, so a borrowed name keeps the shape the
   *  client already sent (the upstream refuses an injected quartet member with no properties). */
  readonly parameters: ReadonlyMap<string, StoredParameters>;
  /** Characters this entry's stored schemas count against the store budget. */
  readonly chars: number;
};

/** Insertion-ordered, so the first key `Map` yields is the least recently confirmed one. */
const observed = new Map<string, ObservedEntry>();
const consecutiveRefusals = new Map<string, number>();
let parametersChars = 0;

/**
 * The schema memory is part of the opt-in catalog routing, read through a gate the OpenCode
 * executor registers (same motif as the catalog gate) because this module cannot import the
 * server-side flag resolver. Unregistered or throwing reads as "off", so existing installs
 * keep the placeholder schemas. Names are recorded either way.
 */
const SCHEMA_GATE_KEY = Symbol.for("omniroute.opencodeToolSchemaMemoryGate");
type SchemaGateStore = { [SCHEMA_GATE_KEY]?: (() => boolean) | null };

/** Register (or clear, with `null`) the predicate that says whether schema memory is on. */
export function setToolSchemaMemoryGate(gate: (() => boolean) | null): void {
  (globalThis as SchemaGateStore)[SCHEMA_GATE_KEY] = gate;
}

function schemaMemoryEnabled(): boolean {
  const gate = (globalThis as SchemaGateStore)[SCHEMA_GATE_KEY];
  if (typeof gate !== "function") return false;
  try {
    return gate() === true;
  } catch {
    return false;
  }
}

/**
 * Surfaces and models do not share a gate, so neither do their entries. A session id
 * narrows it further: within one conversation the tools a request declares belong to the
 * very client whose service request is being repaired.
 */
function keyOf(provider: string, model: string, session?: string): string {
  return [provider, model, session ?? ""].join("|");
}

/**
 * Keep the names usable as a placeholder: well-formed, unique, order preserved. The
 * upstream may care about which names are present; nothing suggests it cares how many
 * follow a given one, so the original order is the safest thing to replay.
 */
function sanitize(names: readonly unknown[]): string[] {
  const kept: string[] = [];
  for (const raw of names) {
    if (kept.length >= MAX_NAMES_PER_ENTRY) break;
    if (typeof raw !== "string" || !NAME_PATTERN.test(raw)) continue;
    if (!kept.includes(raw)) kept.push(raw);
  }
  return kept;
}

/**
 * Record the tools an accepted gated request carried: their names, and (when the schema
 * memory is on) the parameter object each one already declared.
 *
 * Called only for a response the upstream answered OK, so an entry is always a shape that
 * worked rather than one that merely looked plausible. The schemas are serialized once,
 * here, and a refused request never reaches this function, so it stores nothing.
 */
export function recordAcceptedToolNames(
  provider: string,
  model: string,
  session: string | undefined,
  names: readonly unknown[],
  parameters?: ReadonlyMap<string, Record<string, unknown>>
): void {
  const kept = sanitize(names);
  if (kept.length === 0) return;
  const frozenNames = Object.freeze(kept);
  const { parameters: frozenParameters, chars } = storeParameterSchemas(kept, parameters);
  // Both scopes are written: the session entry serves the conversation it came from, the
  // model entry serves a conversation that has not yet sent a request carrying tools. Each
  // entry counts its schemas against the store budget, so the budget is never
  // underestimated by sharing.
  for (const key of session
    ? [keyOf(provider, model, session), keyOf(provider, model)]
    : [keyOf(provider, model)]) {
    // Re-insert so a confirmed entry becomes the most recent one for eviction.
    deleteEntry(key);
    observed.set(key, { names: frozenNames, parameters: frozenParameters, chars });
    parametersChars += chars;
  }
  evict();
}

/**
 * Copy the schemas worth keeping: a private snapshot (not the request body, which the caller
 * may still mutate), bounded per schema. Skip anything that is not a plain object or cannot
 * be serialized.
 */
function storeParameterSchemas(
  names: readonly string[],
  parameters: ReadonlyMap<string, Record<string, unknown>> | undefined
): { parameters: ReadonlyMap<string, StoredParameters>; chars: number } {
  const stored = new Map<string, StoredParameters>();
  let chars = 0;
  if (!parameters || !schemaMemoryEnabled()) return { parameters: stored, chars };
  for (const name of names) {
    const raw = parameters.get(name);
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) continue;
    let serialized: string;
    try {
      serialized = JSON.stringify(raw);
    } catch {
      continue;
    }
    if (!serialized || serialized.length > MAX_PARAMETERS_CHARS) continue;
    stored.set(name, JSON.parse(serialized) as StoredParameters);
    chars += serialized.length;
  }
  return { parameters: stored, chars };
}

/** Drop one entry and everything it counted: schemas and refusal streak. */
function deleteEntry(key: string): void {
  const entry = observed.get(key);
  observed.delete(key);
  if (entry) {
    parametersChars -= entry.chars;
  }
  consecutiveRefusals.delete(key);
}

/** Drop the oldest entries until both the entry count and the schema budget fit. */
function evict(): void {
  while (observed.size > MAX_ENTRIES || parametersChars > MAX_PARAMETERS_TOTAL_CHARS) {
    const oldest = observed.keys().next();
    if (oldest.done) break;
    deleteEntry(oldest.value);
  }
}

/**
 * Count one refusal against a borrowed entry, and drop it once the streak is long enough.
 *
 * Called only when a request that BORROWED this entry was refused. A refusal on a request
 * carrying the client's own tools says nothing about the entry, and a refusal caused by
 * the session or the user-agent says nothing about tools at all — counting either would
 * drop a sound entry and fall back to a placeholder that is already known to be refused.
 */
export function noteRefusedBorrowedToolNames(
  provider: string,
  model: string,
  session?: string
): void {
  const key = observed.has(keyOf(provider, model, session))
    ? keyOf(provider, model, session)
    : keyOf(provider, model);
  if (!observed.has(key)) return;
  const streak = (consecutiveRefusals.get(key) ?? 0) + 1;
  if (streak < REFUSALS_BEFORE_FORGETTING) {
    consecutiveRefusals.set(key, streak);
    return;
  }
  deleteEntry(key);
}

/**
 * Confirm a borrowed shape that just worked: the streak of refusals is dropped,
 * the entry itself is left alone (no rewrite, so its eviction rank is kept).
 *
 * Called only when a request that BORROWED this entry was answered OK. A 200 on
 * borrowed names proves the shape still works, which cancels the noise the
 * refusal threshold exists to absorb.
 */
export function confirmBorrowedToolNames(provider: string, model: string, session?: string): void {
  const key = observed.has(keyOf(provider, model, session))
    ? keyOf(provider, model, session)
    : keyOf(provider, model);
  if (!observed.has(key)) return;
  consecutiveRefusals.delete(key);
}

/** The names last seen accepted for this surface, model and — when known — session. */
export function getObservedToolNames(
  provider: string,
  model: string,
  session?: string
): readonly string[] | null {
  return observed.get(keyOf(provider, model, session))?.names ?? null;
}

/**
 * The parameter object this name was accepted with, or `undefined` when the schema memory
 * is off or nothing was recorded for it. Same scope order as `resolvePlaceholderNames`:
 * this conversation's entry first, then any conversation on the surface and model.
 */
export function recordedToolParameters(
  provider: string,
  model: string,
  session: string | undefined,
  name: string
): StoredParameters | undefined {
  if (!schemaMemoryEnabled()) return undefined;
  const key = observed.has(keyOf(provider, model, session))
    ? keyOf(provider, model, session)
    : keyOf(provider, model);
  return observed.get(key)?.parameters.get(name);
}

/**
 * The names to declare on a gated request the caller sent without tools.
 *
 * Order of resolution: what this very conversation was last seen declaring, then what any
 * conversation on this surface and model was, then what the operator configured, then
 * nothing — which leaves the caller on the built-in placeholder.
 *
 * The first step is the one that matters. The official client sends its service requests —
 * title generation, compaction — without tools while the build requests of the same
 * session carry a full list (upstream anomalyco/opencode#49433), so replaying that
 * session\'s own list gives a request back the contract its own client just declared.
 */
export function resolvePlaceholderNames(
  provider: string,
  model: string,
  session: string | undefined,
  configured: readonly string[]
): readonly string[] {
  const own = session ? getObservedToolNames(provider, model, session) : null;
  if (own && own.length > 0) return own;
  if (configured && configured.length > 0) return configured;
  return getObservedToolNames(provider, model) ?? configured;
}

/** Reserved for tests. */
export function _resetToolObservationForTests(): void {
  observed.clear();
  consecutiveRefusals.clear();
  parametersChars = 0;
}

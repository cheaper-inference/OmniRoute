/**
 * percentLedger.ts — the attribution book of a percent plan window.
 *
 * A percent dimension has no per-key meter: the provider only reports how much
 * of the account's plan window is used. The book splits that figure into a part
 * per API key and an external part (usage nobody routed through this pool) by
 * following the observed changes of the figure:
 *
 *   - the first reading is a baseline: all of it is external;
 *   - a rise is explained by the tokens each key routed since the last
 *     observation (pending, at most 15 minutes old), up to `minTokensPerPct`
 *     tokens per percentage point; the rest of the rise is external;
 *   - a drop of one point or less, or any drop inside a window the provider
 *     still reports as open, rescales every part;
 *   - a provider window turn (reset time moved forward, or a larger drop)
 *     starts over and applies the new figure as a rise from 0.
 *
 * applyReading is pure: no clock, no I/O, no mutation of its input. It is the
 * only implementation of the transition: a store keeps the book through three
 * primitives (add tokens, read, compare-and-set on the revision) and
 * observeLedger runs the read–apply–conditional-write loop over them, so every
 * stored state came out of applyReading whatever the interleaving.
 */

import type {
  LedgerCounter,
  LedgerKey,
  LedgerKeyState,
  LedgerSnapshot,
  LedgerState,
  PlanWindowReading,
  QuotaStore,
} from "./types";

const EPSILON = 1e-9;
/** Tokens recorded longer ago than this explain nothing at an observation. */
const PENDING_TTL_MS = 15 * 60_000;
/** A reset time that moves by more than this is another provider window. */
const RESET_JITTER_MS = 30 * 60_000;
/** A drop is applied only from a reading at least this much newer than the last one. */
const DROP_CONFIRM_MS = 2 * 60_000;
/** Without a reset time that says "same window", a drop up to this rescales. */
const SMALL_DROP = 0.01;

type Transition = "keep" | "rise" | "rescale" | "turn";

/** The part of the state a transition rewrites. */
interface Book {
  last: number;
  external: number;
  keys: Record<string, LedgerKeyState>;
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

/** reading.resetAt − state.resetAt when both are known, else null. */
function resetShift(state: LedgerState, reading: PlanWindowReading): number | null {
  return state.resetAt !== null && reading.resetAt !== null
    ? reading.resetAt - state.resetAt
    : null;
}

/** The provider says the stored window is the reading's window and it has not ended yet. */
function isSameOpenWindow(
  state: LedgerState,
  reading: PlanWindowReading,
  shift: number | null
): boolean {
  return (
    shift !== null &&
    Math.abs(shift) <= RESET_JITTER_MS &&
    state.resetAt !== null &&
    state.resetAt > reading.fetchedAt
  );
}

function classifyDrop(
  state: LedgerState,
  reading: PlanWindowReading,
  g: number,
  shift: number | null
): Transition {
  if (reading.fetchedAt - state.readAt < DROP_CONFIRM_MS) return "keep";
  if (isSameOpenWindow(state, reading, shift)) return "rescale";
  return state.last - g <= SMALL_DROP + EPSILON ? "rescale" : "turn";
}

/** The decision table: the first matching row decides. */
function classify(state: LedgerState, reading: PlanWindowReading, g: number): Transition {
  const shift = resetShift(state, reading);
  if (reading.fetchedAt < state.readAt) return "keep";
  if (shift !== null && -shift > RESET_JITTER_MS) return "keep";
  if (shift !== null && shift > RESET_JITTER_MS) return "turn";
  if (g - state.last > EPSILON) return "rise";
  if (Math.abs(g - state.last) <= EPSILON) return "keep";
  return classifyDrop(state, reading, g, shift);
}

/** A counter's tokens; anything but a finite number >= 0 counts as 0, everywhere. */
function counterTokens(counter: LedgerCounter): number {
  return Number.isFinite(counter.tokens) && counter.tokens >= 0 ? counter.tokens : 0;
}

/** Tokens a key routed since the book last consumed its counter; a counter below its watermark restarted. */
function pendingTokens(keyState: LedgerKeyState | undefined, counter: LedgerCounter): number {
  const tokens = counterTokens(counter);
  const seen = keyState?.seenTokens ?? 0;
  return tokens >= seen ? tokens - seen : tokens;
}

/** Recorded at most 15 minutes before the observation; an unusable time is never fresh. */
function isFresh(counter: LedgerCounter, nowMs: number): boolean {
  return Number.isFinite(counter.updatedAt) && nowMs - counter.updatedAt <= PENDING_TTL_MS;
}

function eligibleTokens(
  keys: Record<string, LedgerKeyState>,
  counters: Record<string, LedgerCounter>,
  nowMs: number
): Record<string, number> {
  const eligible: Record<string, number> = {};
  for (const [key, counter] of Object.entries(counters)) {
    eligible[key] = isFresh(counter, nowMs) ? pendingTokens(keys[key], counter) : 0;
  }
  return eligible;
}

function openState(
  counters: Record<string, LedgerCounter>,
  reading: PlanWindowReading,
  g: number,
  nowMs: number
): LedgerState {
  const keys: Record<string, LedgerKeyState> = {};
  for (const [key, counter] of Object.entries(counters)) {
    keys[key] = { attributed: 0, seenTokens: counterTokens(counter) };
  }
  return {
    rev: 1,
    last: g,
    external: g,
    resetAt: reading.resetAt,
    readAt: reading.fetchedAt,
    updatedAt: nowMs,
    keys,
  };
}

/** A new provider window: nothing attributed yet; keys without a counter leave the book. */
function turnedBook(state: LedgerState, counters: Record<string, LedgerCounter>): Book {
  const keys: Record<string, LedgerKeyState> = {};
  for (const [key, keyState] of Object.entries(state.keys)) {
    if (counters[key]) keys[key] = { attributed: 0, seenTokens: keyState.seenTokens };
  }
  return { last: 0, external: 0, keys };
}

/** Explain the rise from `book.last` to `g` by pending tokens; the unexplained rest is external. */
function risenBook(
  book: Book,
  counters: Record<string, LedgerCounter>,
  g: number,
  nowMs: number,
  minTokensPerPct: number
): Book {
  const rise = g - book.last;
  const eligible = eligibleTokens(book.keys, counters, nowMs);
  const total = Object.values(eligible).reduce((sum, tokens) => sum + tokens, 0);
  const internal = total > 0 ? Math.min(rise, total / minTokensPerPct / 100) : 0;
  const keys = { ...book.keys };
  for (const [key, counter] of Object.entries(counters)) {
    const share = total > 0 ? (internal * eligible[key]) / total : 0;
    keys[key] = {
      attributed: (book.keys[key]?.attributed ?? 0) + share,
      seenTokens: counterTokens(counter),
    };
  }
  return { last: g, external: book.external + rise - internal, keys };
}

/** Same window, corrected figure: every part scales by g / last; watermarks stay. */
function rescaledBook(state: LedgerState, g: number): Book {
  const factor = state.last > 0 ? g / state.last : 0;
  const keys: Record<string, LedgerKeyState> = {};
  for (const [key, keyState] of Object.entries(state.keys)) {
    keys[key] = { attributed: keyState.attributed * factor, seenTokens: keyState.seenTokens };
  }
  return { last: g, external: state.external * factor, keys };
}

function nextBook(
  transition: Exclude<Transition, "keep">,
  snapshot: { state: LedgerState; counters: Record<string, LedgerCounter> },
  g: number,
  nowMs: number,
  minTokensPerPct: number
): Book {
  const { state, counters } = snapshot;
  if (transition === "rescale") return rescaledBook(state, g);
  const base = transition === "turn" ? turnedBook(state, counters) : state;
  return risenBook(base, counters, g, nowMs, minTokensPerPct);
}

/**
 * Apply one plan-window reading to the book. Returns the same `snapshot.state`
 * object with `changed: false` when the reading changes nothing (stale, equal,
 * or an unconfirmed drop).
 * The returned state may share key entries with the input state: callers must not
 * edit a state in place.
 */
export function applyReading(
  snapshot: LedgerSnapshot,
  reading: PlanWindowReading,
  nowMs: number,
  minTokensPerPct: number
): { state: LedgerState; changed: boolean } {
  const g = clamp01(reading.used);
  const { state, counters } = snapshot;
  if (!state) return { state: openState(counters, reading, g, nowMs), changed: true };

  const transition = classify(state, reading, g);
  if (transition === "keep") return { state, changed: false };

  const book = nextBook(transition, { state, counters }, g, nowMs, minTokensPerPct);
  return {
    state: {
      rev: state.rev + 1,
      last: book.last,
      external: book.external,
      resetAt: transition === "turn" ? reading.resetAt : (reading.resetAt ?? state.resetAt),
      readAt: reading.fetchedAt,
      updatedAt: nowMs,
      keys: book.keys,
    },
    changed: true,
  };
}

// ---------------------------------------------------------------------------
// Storage boundary, shared by both stores
// ---------------------------------------------------------------------------

/** A finite number >= 0. */
function isUsableNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function isKeyState(value: unknown): value is LedgerKeyState {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const { attributed, seenTokens } = value as Record<string, unknown>;
  return isUsableNumber(attributed) && isUsableNumber(seenTokens);
}

/**
 * Every number of the state is finite: the only kind of state a store writes. An Infinity or a
 * NaN would survive every later transition.
 */
export function isStorableLedgerState(state: LedgerState): boolean {
  const numbers = [state.rev, state.last, state.external, state.readAt, state.updatedAt];
  if (state.resetAt !== null) numbers.push(state.resetAt);
  for (const keyState of Object.values(state.keys)) {
    numbers.push(keyState.attributed, keyState.seenTokens);
  }
  return numbers.every((n) => typeof n === "number" && Number.isFinite(n));
}

/**
 * The key map and external part of a stored book, as fresh objects. An entry that is not
 * `{ attributed, seenTokens }` with both finite and >= 0 is dropped, and a value that is not a
 * plain object loses every entry; the external part is then all that is not attributed, so a
 * damaged book degrades instead of failing the request.
 */
export function storedLedgerBook(
  rawKeys: unknown,
  last: number,
  external: number
): { keys: Record<string, LedgerKeyState>; external: number } {
  const entries =
    typeof rawKeys === "object" && rawKeys !== null && !Array.isArray(rawKeys)
      ? Object.entries(rawKeys)
      : null;
  const keys: Record<string, LedgerKeyState> = {};
  let complete = entries !== null;
  for (const [apiKeyId, value] of entries ?? []) {
    if (isKeyState(value)) {
      keys[apiKeyId] = { attributed: value.attributed, seenTokens: value.seenTokens };
    } else {
      complete = false;
    }
  }
  if (complete) return { keys, external };
  const attributed = Object.values(keys).reduce((sum, k) => sum + k.attributed, 0);
  return { keys, external: Math.max(0, last - attributed) };
}

// ---------------------------------------------------------------------------
// Observation: read, apply, conditional write
// ---------------------------------------------------------------------------

export type LedgerStore = Pick<QuotaStore, "ledgerRead" | "ledgerCommit">;

async function readOrNull(store: LedgerStore, key: LedgerKey): Promise<LedgerSnapshot | null> {
  try {
    return await store.ledgerRead(key);
  } catch {
    return null;
  }
}

/** One apply-and-commit round on `snapshot`: the state to return, and whether the commit lost. */
async function applyAndCommit(
  store: LedgerStore,
  key: LedgerKey,
  snapshot: LedgerSnapshot,
  reading: PlanWindowReading,
  nowMs: number,
  minTokensPerPct: number
): Promise<{ state: LedgerState | null; lost: boolean }> {
  const { state, changed } = applyReading(snapshot, reading, nowMs, minTokensPerPct);
  if (!changed) return { state, lost: false };
  let won: boolean;
  try {
    won = (await store.ledgerCommit(key, state)) === true;
  } catch {
    return { state: snapshot.state, lost: false };
  }
  return won ? { state, lost: false } : { state: snapshot.state, lost: true };
}

/**
 * Read the book, apply the reading, store the result when it changed. Never throws.
 *
 * Returns the state after this observation; the stored state when the reading changes nothing,
 * when there is no reading, or when nothing could be written; null when there is no book or the
 * first read fails. A commit lost to another writer gets one more round on a fresh read; when that
 * one is lost too, the state of the second read is returned.
 */
export async function observeLedger(
  store: LedgerStore,
  key: LedgerKey,
  reading: PlanWindowReading | null,
  nowMs: number,
  minTokensPerPct: number
): Promise<LedgerState | null> {
  try {
    const first = await readOrNull(store, key);
    if (!first || !reading) return first?.state ?? null;
    const round = await applyAndCommit(store, key, first, reading, nowMs, minTokensPerPct);
    if (!round.lost) return round.state;
    const second = await readOrNull(store, key);
    if (!second) return first.state;
    return (await applyAndCommit(store, key, second, reading, nowMs, minTokensPerPct)).state;
  } catch {
    // A snapshot applyReading cannot use (a store returning something that is not a snapshot).
    return null;
  }
}

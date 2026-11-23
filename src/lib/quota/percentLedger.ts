/**
 * percentLedger.ts — the attribution book of a percent plan window.
 *
 * A percent dimension has no per-key meter: the provider only reports how much
 * of the account's plan window is used, and a request's usage can show up in
 * that figure only some responses later. The book therefore does not hand out
 * each change of the figure. It keeps only what aligns it with the provider's
 * window:
 *
 *   - `baseline`: the figure when the book opened or the window last turned;
 *   - `last`: the last applied figure;
 *   - per API key, `startTokens`: its token counter at that same moment.
 *
 * Each key's part is computed when it is read (attributeBook): the growth of
 * the figure since the baseline is split between keys in proportion to the
 * tokens each one routed since then, capped by what those tokens can explain
 * (`minTokensPerPct` tokens per percentage point); the rest is external (usage
 * nobody routed through this pool). A late figure then causes a small error
 * that passes at the next reading instead of one that accumulates.
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

/** Floor: tokens that explain at most one percentage point of the account bar. */
export const DEFAULT_MIN_TOKENS_PER_PCT = 1000;

const EPSILON = 1e-9;
/** A reset time that moves by more than this is another provider window. */
const RESET_JITTER_MS = 30 * 60_000;
/** A drop is considered only from a reading at least this much newer than the last one. */
const DROP_CONFIRM_MS = 2 * 60_000;
/** Without a reset time that says "same window", a drop up to this is not a turn. */
const SMALL_DROP = 0.01;
/**
 * A book whose provider sent no reset time can still be the current window's book for this long
 * after its last applied reading; past it, without a fresh reading, it is not charged.
 */
const UNTIMED_BOOK_CURRENT_MS = 15 * 60_000;

type Transition = "keep" | "equal" | "rise" | "turn";

/** The part of the state a transition rewrites. */
type Book = Pick<LedgerState, "last" | "baseline" | "resetAt" | "keys">;

/** A snapshot that holds a book. */
type BookSnapshot = LedgerSnapshot & { state: LedgerState };

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

/** A finite number >= 0. */
function isUsableNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

/** A counter's tokens; an unusable counter (not finite, or negative) counts as 0. */
function usableTokens(counter: LedgerCounter): number {
  return isUsableNumber(counter.tokens) ? counter.tokens : 0;
}

// ---------------------------------------------------------------------------
// Transition
// ---------------------------------------------------------------------------

/** reading.resetAt − state.resetAt when both are known, else null. */
function resetShift(state: LedgerState, reading: PlanWindowReading): number | null {
  return state.resetAt !== null && reading.resetAt !== null
    ? reading.resetAt - state.resetAt
    : null;
}

/** Row 2: older than the last applied reading, or from the previous provider window. */
function isOldReading(
  state: LedgerState,
  reading: PlanWindowReading,
  shift: number | null
): boolean {
  return reading.fetchedAt < state.readAt || (shift !== null && -shift > RESET_JITTER_MS);
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

/** Rows 6 to 9: a lower figure turns the window only when nothing says it is the same one. */
function classifyDrop(
  state: LedgerState,
  reading: PlanWindowReading,
  g: number,
  shift: number | null
): Transition {
  if (reading.fetchedAt - state.readAt < DROP_CONFIRM_MS) return "keep";
  if (isSameOpenWindow(state, reading, shift)) return "keep";
  if (state.last - g <= SMALL_DROP + EPSILON) return "keep";
  return "turn";
}

/** Row 3b: the stored window has ended (its reset time is not after the reading's data time). */
function hasStoredWindowEnded(state: LedgerState, reading: PlanWindowReading): boolean {
  return state.resetAt !== null && state.resetAt <= reading.fetchedAt;
}

/**
 * Rows 2 to 9 of the decision table (row 1, no state, opens the book); the first match decides:
 *   2. older than the last applied reading, or a reset time over 30 minutes behind: keep;
 *   3. a reset time over 30 minutes ahead of the stored one: turn;
 *   3b. the stored reset time is not after the reading's data time (that window ended): turn;
 *   4. a higher figure: rise;
 *   5. an equal figure: keep, but record a reset time the book lacks (see applyReading);
 *   6 to 9. a lower figure: see classifyDrop.
 */
function classify(state: LedgerState, reading: PlanWindowReading, g: number): Transition {
  const shift = resetShift(state, reading);
  if (isOldReading(state, reading, shift)) return "keep";
  if (shift !== null && shift > RESET_JITTER_MS) return "turn";
  if (hasStoredWindowEnded(state, reading)) return "turn";
  if (g - state.last > EPSILON) return "rise";
  if (g >= state.last - EPSILON) return "equal";
  return classifyDrop(state, reading, g, shift);
}

/** The reading's reset time when it is still ahead of the reading's data time, else null. */
function resetAhead(reading: PlanWindowReading): number | null {
  return reading.resetAt !== null && reading.resetAt > reading.fetchedAt ? reading.resetAt : null;
}

/**
 * The book of a window that starts now (open or turn): the figure is the baseline, every counter
 * is marked, and the reading's reset time is stored only when it is still ahead.
 */
function startedBook(
  counters: Record<string, LedgerCounter>,
  reading: PlanWindowReading,
  g: number
): Book {
  const keys: Record<string, LedgerKeyState> = {};
  for (const [key, counter] of Object.entries(counters)) {
    keys[key] = { startTokens: usableTokens(counter) };
  }
  return { last: g, baseline: g, resetAt: resetAhead(reading), keys };
}

/**
 * A rise moves the last figure only. The reading's reset time replaces the stored one when it is
 * still ahead; otherwise the stored one stays (after row 3b it is null or still ahead).
 */
function risenBook(state: LedgerState, reading: PlanWindowReading, g: number): Book {
  return {
    last: g,
    baseline: state.baseline,
    resetAt: resetAhead(reading) ?? state.resetAt,
    keys: state.keys,
  };
}

/**
 * Row 5: an equal figure keeps the book. When the book has no reset time and the reading has one
 * ahead, only that reset time is stored. The last data time stays, so a later drop still waits.
 */
function learnedResetTime(
  state: LedgerState,
  reading: PlanWindowReading,
  nowMs: number
): { state: LedgerState; changed: boolean } {
  const resetAt = resetAhead(reading);
  if (state.resetAt !== null || resetAt === null) return { state, changed: false };
  return { state: { ...state, rev: state.rev + 1, resetAt, updatedAt: nowMs }, changed: true };
}

/**
 * Apply one plan-window reading to the book. Returns the same `snapshot.state` object with
 * `changed: false` when the reading changes nothing (old, equal, or a drop that is not a turn).
 * A stored reset time that is no longer ahead of the reading ends the window: that reading turns
 * the book whatever its figure. A state only ever stores a reset time ahead of the reading that
 * carried it. Opening, turning and rising record it. An equal figure records it only when the
 * book has none, and changes nothing else. A drop that is not a turn never records one.
 * The returned state may share its key map with the input state: callers must not edit a state
 * in place.
 */
export function applyReading(
  snapshot: LedgerSnapshot,
  reading: PlanWindowReading,
  nowMs: number
): { state: LedgerState; changed: boolean } {
  const g = clamp01(reading.used);
  const { state, counters } = snapshot;
  const transition = state ? classify(state, reading, g) : "turn";
  if (state && transition === "equal") return learnedResetTime(state, reading, nowMs);
  if (state && transition === "keep") return { state, changed: false };

  const book =
    state && transition === "rise"
      ? risenBook(state, reading, g)
      : startedBook(counters, reading, g);
  return {
    state: {
      rev: (state?.rev ?? 0) + 1,
      last: book.last,
      baseline: book.baseline,
      resetAt: book.resetAt,
      readAt: reading.fetchedAt,
      updatedAt: nowMs,
      keys: book.keys,
    },
    changed: true,
  };
}

// ---------------------------------------------------------------------------
// Attribution, computed when the book is read
// ---------------------------------------------------------------------------

export interface BookAttribution {
  /** Fraction of the account bar, per key with tokens since the book started. */
  internalByKey: Record<string, number>;
  /** Sum of internalByKey. */
  internal: number;
  /** last − internal. */
  external: number;
}

/** Tokens each key routed since the book started; a counter below its key's mark restarted. */
function tokensSinceStart(
  keys: Record<string, LedgerKeyState>,
  counters: Record<string, LedgerCounter>
): Record<string, number> {
  const routed: Record<string, number> = {};
  for (const [key, counter] of Object.entries(counters)) {
    const tokens = usableTokens(counter);
    const start = isUsableNumber(keys[key]?.startTokens) ? keys[key].startTokens : 0;
    routed[key] = tokens >= start ? tokens - start : tokens;
  }
  return routed;
}

/**
 * Split the book's figure into a part per key and an external part. Pure and total: every number
 * returned is finite and >= 0, and internal + external equals `state.last` for any state the
 * transition produces (a figure outside 0..1 is clamped first). A key of the book without a counter
 * has no part; a key with a counter but no mark counts from zero. A floor that is not a finite
 * number >= 1 is DEFAULT_MIN_TOKENS_PER_PCT.
 */
export function attributeBook(snapshot: BookSnapshot, minTokensPerPct: number): BookAttribution {
  const floor =
    Number.isFinite(minTokensPerPct) && minTokensPerPct >= 1
      ? minTokensPerPct
      : DEFAULT_MIN_TOKENS_PER_PCT;
  const last = clamp01(Number.isFinite(snapshot.state.last) ? snapshot.state.last : 0);
  const baseline = clamp01(Number.isFinite(snapshot.state.baseline) ? snapshot.state.baseline : 0);
  const routed = tokensSinceStart(snapshot.state.keys, snapshot.counters);
  const total = Object.values(routed).reduce((sum, tokens) => sum + tokens, 0);
  const growth = Math.max(0, last - baseline);
  const internal = total > 0 ? Math.min(growth, total / floor / 100) : 0;

  const internalByKey: Record<string, number> = {};
  for (const [key, tokens] of Object.entries(routed)) {
    if (tokens > 0) internalByKey[key] = (internal * tokens) / total;
  }
  return { internalByKey, internal, external: Math.max(0, last - internal) };
}

/**
 * Whether a stored book can still be the current provider window's book when no fresh reading is
 * available: its reset time is known and still ahead of `nowMs`, or it has no reset time and its
 * last applied reading is at most 15 minutes old. Pure; an unusable time is never current.
 */
export function isLedgerCurrentWithoutReading(state: LedgerState, nowMs: number): boolean {
  if (state.resetAt !== null) return state.resetAt > nowMs;
  return nowMs - state.readAt <= UNTIMED_BOOK_CURRENT_MS;
}

// ---------------------------------------------------------------------------
// Storage boundary, shared by both stores
// ---------------------------------------------------------------------------

function isKeyState(value: unknown): value is LedgerKeyState {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  return isUsableNumber((value as Record<string, unknown>).startTokens);
}

/**
 * Every number of the state is finite, the baseline is >= 0, and every key entry passes the same
 * check as a stored one (`startTokens` finite and >= 0): the only kind of state a store writes. An
 * Infinity or a NaN would survive every later transition, and a key entry the read filter drops
 * must not be written in the first place.
 */
export function isStorableLedgerState(state: LedgerState): boolean {
  const numbers = [state.rev, state.last, state.baseline, state.readAt, state.updatedAt];
  if (state.resetAt !== null) numbers.push(state.resetAt);
  return (
    numbers.every((n) => typeof n === "number" && Number.isFinite(n)) &&
    state.baseline >= 0 &&
    Object.values(state.keys).every(isKeyState)
  );
}

/**
 * The key map of a stored book, as fresh objects. An entry that is not `{ startTokens }` with a
 * finite number >= 0 is dropped (the key then counts from zero), and a value that is not a plain
 * object gives no entry, so a damaged book degrades instead of failing the request.
 */
export function storedLedgerKeys(rawKeys: unknown): Record<string, LedgerKeyState> {
  const keys: Record<string, LedgerKeyState> = {};
  if (typeof rawKeys !== "object" || rawKeys === null || Array.isArray(rawKeys)) return keys;
  for (const [apiKeyId, value] of Object.entries(rawKeys)) {
    if (isKeyState(value)) keys[apiKeyId] = { startTokens: value.startTokens };
  }
  return keys;
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

/**
 * One apply-and-commit round on `snapshot`: the snapshot to return (the new state with the
 * counters of the same read, or the snapshot read when nothing was written), and whether the
 * commit lost.
 */
async function applyAndCommit(
  store: LedgerStore,
  key: LedgerKey,
  snapshot: LedgerSnapshot,
  reading: PlanWindowReading,
  nowMs: number
): Promise<{ snapshot: LedgerSnapshot; lost: boolean }> {
  const { state, changed } = applyReading(snapshot, reading, nowMs);
  if (!changed) return { snapshot, lost: false };
  let won: boolean;
  try {
    won = (await store.ledgerCommit(key, state)) === true;
  } catch {
    return { snapshot, lost: false };
  }
  return won
    ? { snapshot: { state, counters: snapshot.counters }, lost: false }
    : { snapshot, lost: true };
}

/** Apply the reading; a commit lost to another writer gets one more round on a fresh read. */
async function observeWithReading(
  store: LedgerStore,
  key: LedgerKey,
  first: LedgerSnapshot,
  reading: PlanWindowReading,
  nowMs: number
): Promise<LedgerSnapshot> {
  const round = await applyAndCommit(store, key, first, reading, nowMs);
  if (!round.lost) return round.snapshot;
  const second = await readOrNull(store, key);
  if (!second) return first;
  return (await applyAndCommit(store, key, second, reading, nowMs)).snapshot;
}

/** After a reading: a book is usable unless its stored reset time already passed. */
function usableAfterReading(snapshot: LedgerSnapshot, nowMs: number): BookSnapshot | null {
  const { state } = snapshot;
  return state && (state.resetAt === null || state.resetAt > nowMs)
    ? (snapshot as BookSnapshot)
    : null;
}

/** Without a reading: the stored book while it can still be the current window's book. */
function usableWithoutReading(snapshot: LedgerSnapshot, nowMs: number): BookSnapshot | null {
  const { state } = snapshot;
  return state && isLedgerCurrentWithoutReading(state, nowMs) ? (snapshot as BookSnapshot) : null;
}

/**
 * Read the book, apply the reading, store the result when it changed. Never throws.
 *
 * Returns the state after this observation together with the counters of the same store read
 * that produced it, so the caller attributes from one consistent read; the snapshot read when the
 * reading changes nothing or when nothing could be written. A commit lost to another writer gets
 * one more round on a fresh read; when that one is lost too, the snapshot of the second read is
 * returned.
 *
 * Null when there is no usable book: no book, a failed first read, a book whose stored reset time
 * is not after `nowMs` (the transition compares that time with the reading's data time, this
 * check with the clock: a reading older than the last applied one, or one taken before the reset
 * and observed after it, such as a cached reading with the same figure, leaves that book in
 * place), or, without a reading, a book that may belong to a provider window that already ended
 * (isLedgerCurrentWithoutReading). The stored state is
 * left as it is either way: the next reading turns or updates it through the transition.
 */
export async function observeLedger(
  store: LedgerStore,
  key: LedgerKey,
  reading: PlanWindowReading | null,
  nowMs: number
): Promise<BookSnapshot | null> {
  try {
    const first = await readOrNull(store, key);
    if (!first) return null;
    if (!reading) return usableWithoutReading(first, nowMs);
    return usableAfterReading(await observeWithReading(store, key, first, reading, nowMs), nowMs);
  } catch {
    // A snapshot applyReading cannot use (a store returning something that is not a snapshot).
    return null;
  }
}

// ---------------------------------------------------------------------------
// Preview: read and apply in memory, never write the book's state
// ---------------------------------------------------------------------------

/**
 * What a read-only look at the book finds: a usable book (`confirmed` when a reading was applied
 * to it in memory), no book, a book whose window ended, or a read that failed.
 */
export type LedgerPreview =
  | { kind: "book"; snapshot: BookSnapshot; confirmed: boolean }
  | { kind: "none" | "ended" | "failed" };

/**
 * The book as observeLedger would leave it, from one store read, and it never writes the book's
 * state. A missing book is never opened, the reading is applied in memory only (applyReading is
 * pure) and nothing is committed, so looking at a book never moves its baseline. A store may
 * still clean superseded revision fields on that read, as it does for the gate's reads. Never
 * throws.
 */
export async function previewLedger(
  store: Pick<QuotaStore, "ledgerRead">,
  key: LedgerKey,
  reading: PlanWindowReading | null,
  nowMs: number
): Promise<LedgerPreview> {
  let first: LedgerSnapshot;
  try {
    first = await store.ledgerRead(key);
  } catch {
    return { kind: "failed" };
  }
  try {
    if (!first?.state) return { kind: "none" }; // a missing book is never opened here
    if (!reading) {
      const usable = usableWithoutReading(first, nowMs);
      return usable ? { kind: "book", snapshot: usable, confirmed: false } : { kind: "ended" };
    }
    const { state } = applyReading(first, reading, nowMs); // pure: nothing is committed
    const usable = usableAfterReading({ state, counters: first.counters }, nowMs);
    return usable ? { kind: "book", snapshot: usable, confirmed: true } : { kind: "ended" };
  } catch {
    return { kind: "failed" };
  }
}

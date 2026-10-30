/**
 * Lifecycle of one conversation stream, as a total reducer.
 *
 * Three things on this page look like state and are not the same kind of thing:
 * the lifecycle below, the presence readout (running / idle / stale) and the
 * delivery readout (send and fan-out results). Only the lifecycle decides when
 * to stop reconnecting; the other two are observations.
 *
 * Termination. Every cycle here is bounded:
 *
 * - `opening -> opening` counts drops and stops at SNAPSHOT_DROPS;
 * - `streaming -> streaming` is meant to keep going, because this protocol
 *   closes the watch while the bot is busy and reconnecting is normal work. The
 *   degenerate shapes need three independent counters, because a frame clears
 *   the failure count and a long life clears the flap count, so neither one can
 *   see a stream that delivers a frame and then dies after a second:
 *     1. LIVE_FAILS closes at six attempts in a row that delivered nothing;
 *     2. LIVE_FLAPS closes at six attempts in a row that lived under FLAP_MS;
 *     3. LIVE_RAPID closes when six closes fall within RAPID_GAP_MS of each
 *        other. This is the one that catches "delivers a frame, hangs up after a
 *        second, repeats": neither counter above can see it. The threshold is a
 *        gap, not a lifetime, because a server that closes the watch every ~15 s
 *        while the bot works is normal and must not be counted as a fault.
 * - `stalled` and `lost` absorb every event except `select`, so nothing can
 *   bounce back into a working state on its own.
 */

export const SNAPSHOT_DROPS = 3;
export const LIVE_FAILS = 6;
export const LIVE_FLAPS = 6;
export const LIVE_RAPID = 6;
export const HOLD_LIMIT = 15;
export const FLAP_MS = 1_000;
export const RAPID_GAP_MS = 10_000;

export type LostReason = "failures" | "flaps" | "rapid" | "refused" | "fault";

export type SessionState =
  | { phase: "idle" }
  | { phase: "opening"; drops: number; holds: number }
  | {
      phase: "streaming";
      fails: number;
      flaps: number;
      rapid: number;
      holds: number;
      lastCloseAtMs: number;
    }
  | { phase: "stalled" }
  | { phase: "lost"; reason: LostReason };

export type SessionEvent =
  | { type: "select"; resume?: "snapshot" | "live" }
  | { type: "frame" }
  | { type: "cutover" }
  | { type: "close"; livedMs: number; nowMs: number }
  | { type: "hold" }
  | { type: "fault" };

export function idle(): SessionState {
  return { phase: "idle" };
}

function liveStart(): SessionState {
  return { phase: "streaming", fails: 0, flaps: 0, rapid: 0, holds: 0, lastCloseAtMs: 0 };
}

export type TerminalState = { phase: "stalled" } | { phase: "lost"; reason: LostReason };

export function isTerminal(state: SessionState): state is TerminalState {
  return state.phase === "stalled" || state.phase === "lost";
}

export function reduce(state: SessionState, event: SessionEvent): SessionState {
  if (event.type === "select") {
    // A conversation restored from memory has no snapshot left to seal, so it
    // begins where its frames will arrive: already live. Opening it instead
    // pins it in `opening` forever, because only a snapshot ever seals.
    if (event.resume === "live") return liveStart();
    return { phase: "opening", drops: 0, holds: 0 };
  }
  if (state.phase === "idle") return state;
  if (isTerminal(state)) return state;

  if (event.type === "fault") return { phase: "lost", reason: "fault" };

  if (state.phase === "opening") {
    if (event.type === "cutover") return liveStart();
    // A frame is progress: rows are arriving, so the snapshot is starting, not
    // failing. Counting those closes as drops declared a conversation that was
    // visibly filling in "could not be started".
    if (event.type === "frame") return { ...state, drops: 0, holds: 0 };
    if (event.type === "hold") {
      // The server refused to admit a watch (another tab holds the slots). That
      // is not a drop, so it must not spend the snapshot budget, but it still
      // has to be bounded or the page waits on a refusal forever.
      const holds = state.holds + 1;
      return holds >= HOLD_LIMIT ? { phase: "stalled" } : { ...state, holds };
    }
    const drops = state.drops + 1;
    return drops >= SNAPSHOT_DROPS ? { phase: "stalled" } : { ...state, drops };
  }

  if (event.type === "cutover") return liveStart();
  if (event.type === "frame") {
    return state.fails === 0 && state.holds === 0 ? state : { ...state, fails: 0, holds: 0 };
  }
  if (event.type === "hold") {
    const holds = state.holds + 1;
    return holds >= HOLD_LIMIT ? { phase: "lost", reason: "refused" } : { ...state, holds };
  }
  const fails = state.fails + 1;
  const flaps = event.livedMs < FLAP_MS ? state.flaps + 1 : 0;
  const quick = state.lastCloseAtMs > 0 && event.nowMs - state.lastCloseAtMs < RAPID_GAP_MS;
  const rapid = quick ? state.rapid + 1 : 1;
  if (fails >= LIVE_FAILS) return { phase: "lost", reason: "failures" };
  if (flaps >= LIVE_FLAPS) return { phase: "lost", reason: "flaps" };
  if (rapid >= LIVE_RAPID) return { phase: "lost", reason: "rapid" };
  return {
    phase: "streaming",
    fails,
    flaps,
    rapid,
    holds: state.holds,
    lastCloseAtMs: event.nowMs,
  };
}

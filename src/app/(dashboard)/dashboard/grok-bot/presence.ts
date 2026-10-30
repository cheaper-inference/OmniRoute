/**
 * Presence of a bot, read from the watch stream.
 *
 * Two flags mean "working", and both are needed. `isRunning` appears only while
 * the bot itself is producing output. On a long task the bot stops talking and
 * the work moves to the subagents it dispatched: `isRunning` is then absent from
 * every frame for minutes while `hasRunningSubagents` stays true, so a readout
 * that only watches `isRunning` calls a busy bot idle.
 *
 * Staleness is about the stream, not about the bot: any frame proves the stream
 * is alive, while only `agentState.live` says what the bot is doing. Mixing the
 * two made a quiet, connected bot read as unknown instead of idle.
 * The window comes from the frame (`staleAfterMs`, measured at 90 000); the
 * constant is only the fallback for a frame that omits it.
 */
export const STALE_AFTER_MS = 90_000;

export type Presence = {
  lastFrameAtMs: number;
  lastLiveAtMs: number;
  running: string[];
  subagents: string[];
  staleAfterMs: number;
  runState: string;
};

export type PresenceStatus = "running" | "idle" | "stale";

export function emptyPresence(): Presence {
  return {
    lastFrameAtMs: 0,
    lastLiveAtMs: 0,
    running: [],
    subagents: [],
    staleAfterMs: 0,
    runState: "",
  };
}

export function readPresence(frame: unknown, nowMs: number): Partial<Presence> {
  if (!frame || typeof frame !== "object") return {};
  const record = frame as { agentState?: unknown; boxState?: unknown };
  const out: Partial<Presence> = { lastFrameAtMs: nowMs };

  const agentState = record.agentState;
  if (agentState && typeof agentState === "object") {
    const live = (agentState as { live?: unknown }).live;
    if (Array.isArray(live)) {
      out.lastLiveAtMs = nowMs;
      out.running = live.flatMap((entry) => {
        if (!entry || typeof entry !== "object") return [];
        const item = entry as { agentId?: unknown; isRunning?: unknown };
        if (typeof item.agentId !== "string" || item.isRunning !== true) return [];
        return [item.agentId];
      });
      out.subagents = live.flatMap((entry) => {
        if (!entry || typeof entry !== "object") return [];
        const item = entry as { agentId?: unknown; hasRunningSubagents?: unknown };
        if (typeof item.agentId !== "string" || item.hasRunningSubagents !== true) return [];
        return [item.agentId];
      });
      const declared = live.flatMap((entry) => {
        if (!entry || typeof entry !== "object") return [];
        const item = entry as { staleAfterMs?: unknown };
        return typeof item.staleAfterMs === "number" && item.staleAfterMs > 0
          ? [item.staleAfterMs]
          : [];
      });
      if (declared.length > 0) out.staleAfterMs = Math.min(...declared);
    }
  }

  const boxState = record.boxState;
  if (boxState && typeof boxState === "object") {
    const state = (boxState as { state?: unknown }).state;
    if (state && typeof state === "object") {
      const runState = (state as { runState?: unknown }).runState;
      if (typeof runState === "string") out.runState = runState;
    }
  }

  return out;
}

export function statusOf(presence: Presence, nowMs: number, agentId?: string): PresenceStatus {
  if (presence.lastFrameAtMs === 0) return "stale";
  const window = presence.staleAfterMs > 0 ? presence.staleAfterMs : STALE_AFTER_MS;
  if (nowMs - presence.lastFrameAtMs >= window) return "stale";
  if (presence.lastLiveAtMs === 0) return "idle";
  const busy = [...presence.running, ...presence.subagents];
  const working = agentId === undefined ? busy : busy.filter((busyId) => busyId === agentId);
  return working.length > 0 ? "running" : "idle";
}

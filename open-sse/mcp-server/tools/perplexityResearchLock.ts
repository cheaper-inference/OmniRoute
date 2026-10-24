type LockState = "held" | "upstream_unconfirmed";

type LockRecord = {
  invocationId: string;
  acquiredAtMs: number;
  deadlineMs: number;
  state: LockState;
};

const KEY = Symbol.for("omniroute.pplxResearchLocks");

// A run that sent its request and then lost track of it may still be going on
// Perplexity's side. Its lock holds the connection until the run's own deadline
// (time budget plus one minute) and this grace after that, then the next
// acquire takes the connection over. 60 s matches the research cooldown.
export const UNCONFIRMED_GRACE_MS = 60_000;

function busyUntil(record: LockRecord): number {
  return record.state === "upstream_unconfirmed"
    ? record.deadlineMs + UNCONFIRMED_GRACE_MS
    : record.deadlineMs;
}

function locks(): Map<string, LockRecord> {
  const g = globalThis as unknown as Record<symbol, Map<string, LockRecord>>;
  return (g[KEY] ??= new Map());
}

export function acquireResearchLock(input: {
  connectionId: string;
  invocationId: string;
  nowMs: number;
  maxTotalMinutes: number;
}): "acquired" | "research_busy" {
  const existing = locks().get(input.connectionId);
  if (existing && input.nowMs < busyUntil(existing)) return "research_busy";
  locks().set(input.connectionId, {
    invocationId: input.invocationId,
    acquiredAtMs: input.nowMs,
    deadlineMs: input.nowMs + input.maxTotalMinutes * 60_000 + 60_000,
    state: "held",
  });
  return "acquired";
}

export function releaseResearchLock(connectionId: string, invocationId: string): void {
  const existing = locks().get(connectionId);
  if (existing && existing.invocationId === invocationId) locks().delete(connectionId);
}

export function markUpstreamUnconfirmed(connectionId: string, invocationId: string): void {
  const existing = locks().get(connectionId);
  if (existing && existing.invocationId === invocationId) existing.state = "upstream_unconfirmed";
}

export function sweepResearchLock(
  connectionId: string,
  nowMs: number
): LockState | "expired" | "absent" {
  const existing = locks().get(connectionId);
  if (!existing) return "absent";
  if (nowMs < busyUntil(existing)) return existing.state;
  return "expired";
}

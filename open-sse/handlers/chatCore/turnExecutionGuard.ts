import { buildErrorBody } from "../../utils/error.ts";

type ActiveTurn = {
  startedAt: number;
  retryCount: number;
};

export type TurnExecutionAcquireResult =
  | { acquired: true; release: () => void }
  | { acquired: false; retryCount: number; ageMs: number; release: () => void };

export const TURN_IN_PROGRESS_MESSAGE = "An identical request is already in progress";

export function createTurnInProgressResult(retryCount: number) {
  const body = buildErrorBody(409, TURN_IN_PROGRESS_MESSAGE, undefined, {
    type: "turn_in_progress",
    code: "turn_in_progress",
  });
  return {
    body,
    result: {
      success: false as const,
      status: 409,
      error: TURN_IN_PROGRESS_MESSAGE,
      errorType: "turn_in_progress",
      errorCode: "turn_in_progress",
      response: new Response(JSON.stringify(body), {
        status: 409,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": "1",
          "X-OmniRoute-Turn-Retry": String(retryCount),
        },
      }),
    },
  };
}

const activeTurns = new Map<string, ActiveTurn>();

/**
 * Ensures a client retry carrying the same effective idempotency key cannot
 * open another upstream execution while the original turn is still streaming.
 */
export function acquireTurnExecution(key: string | null): TurnExecutionAcquireResult {
  if (!key) return { acquired: true, release: () => {} };

  const existing = activeTurns.get(key);
  if (existing) {
    existing.retryCount += 1;
    return {
      acquired: false,
      retryCount: existing.retryCount,
      ageMs: Math.max(0, Date.now() - existing.startedAt),
      release: () => {},
    };
  }

  const entry: ActiveTurn = { startedAt: Date.now(), retryCount: 0 };
  activeTurns.set(key, entry);
  let released = false;
  return {
    acquired: true,
    release: () => {
      if (released) return;
      released = true;
      if (activeTurns.get(key) === entry) activeTurns.delete(key);
    },
  };
}

export function getTurnExecutionSnapshot(key: string) {
  const active = activeTurns.get(key);
  if (!active) return null;
  return { retryCount: active.retryCount, ageMs: Math.max(0, Date.now() - active.startedAt) };
}

export const TURN_WAIT_TIMEOUT_MS = 60_000;
export const TURN_WAIT_POLL_MS = 500;

export type TurnExecutionWaitOptions = {
  /** Upper bound on how long a duplicate waits for the in-flight turn to release. */
  timeoutMs?: number;
  /** Poll interval while waiting. */
  pollMs?: number;
  /** Client abort signal — a disconnected caller stops waiting immediately. */
  signal?: AbortSignal | null;
  /** Warn-channel logger receiving the duplicate-waiting notice. */
  log?: { warn?: (tag: string, msg: string) => void } | null | undefined;
  traceId?: string;
};

/**
 * Acquires the turn slot, waiting out an in-flight duplicate instead of
 * failing it immediately.
 *
 * Executing a duplicate's request path straight to a 409 turns a transient
 * self-collision — executor/account-fallback retries re-entering chatCore
 * with the caller's headers while the original turn is stuck on a slow
 * upstream — into a fatal client-visible failure, and the 409 is then
 * misread downstream as an account-level rate limit ("reset after Ns"),
 * cooling down healthy accounts. Waiting keeps the guard's serialization
 * guarantee without failing the duplicate; after the timeout the caller
 * falls back to the 409 result as before.
 */
export async function acquireTurnExecutionWithWait(
  key: string | null,
  opts: TurnExecutionWaitOptions = {}
): Promise<TurnExecutionAcquireResult> {
  const turn = acquireTurnExecution(key);
  if (turn.acquired) return turn;

  const timeoutMs = opts.timeoutMs ?? TURN_WAIT_TIMEOUT_MS;
  const pollMs = opts.pollMs ?? TURN_WAIT_POLL_MS;
  const { signal, log, traceId } = opts;
  log?.warn?.(
    "TURN_GUARD",
    `duplicate waiting cid=${traceId ?? "?"} retry=${turn.retryCount} ageMs=${turn.ageMs}`
  );
  const deadline = Date.now() + timeoutMs;
  let current = turn;
  while (!current.acquired && Date.now() < deadline && !signal?.aborted) {
    await new Promise((resolve) => setTimeout(resolve, pollMs));
    current = acquireTurnExecution(key);
  }
  return current;
}

export function clearTurnExecutionsForTesting(): void {
  activeTurns.clear();
}

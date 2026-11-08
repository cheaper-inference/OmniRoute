import { snapshotBudget } from "./transcript";

/** Where the transcript reader left off; the route takes both halves. */
export type TranscriptCursor = { phase: string; after: string; generation?: number };

export type StreamDeps = {
  fetchImpl?: typeof fetch;
  budget?: typeof snapshotBudget;
  now?: () => number;
  sleep?: (millis: number) => Promise<void>;
  /** Called when the grant is gone, so the caller can stop retrying and ask for
   *  a sign-in instead. */
  onReauth?: () => void;
};

const SNAPSHOT_LIMIT = { bytes: 8_000_000, millis: 30_000 };

const ADMISSION_PAUSE_MS = 2_000;

/**
 * Reads the transcript route's server-sent frames for one cursor position.
 *
 * Yields each parsed frame. The two failure answers that mean something other
 * than "try again" are shaped here: a spent grant reports through onReauth and
 * a 409, while a full watch table pauses and then throws with `admission` set
 * so the caller can retry without spending its drop budget.
 */
const SKIP = Symbol("skip");
const KNOWN_EVENTS = new Set(["message", "connected", "frame", "terminal"]);

function fatalError(message: string, terminalCode: string) {
  return Object.assign(new Error(message), { fatal: true, terminalCode });
}

/** The statuses that end the session outright; each names what the user has to do. */
function statusFailure(status: number, deps: StreamDeps): Error | null {
  if (status === 401) {
    deps.onReauth?.();
    return fatalError("transcript 401", "auth");
  }
  if (status === 403) return fatalError("transcript 403", "permission");
  if (status === 400) return fatalError("transcript 400", "protocol");
  if (status === 409) {
    // The grant is gone; retrying cannot help and six attempts of it look like a
    // network fault to the user.
    deps.onReauth?.();
    return fatalError("transcript 409", "auth");
  }
  return null;
}

function terminalFailure(parsed: unknown, deps: StreamDeps) {
  const terminal = parsed as { code?: unknown; retryable?: unknown; streamId?: unknown };
  const code = typeof terminal.code === "string" ? terminal.code : "unknown";
  if (code === "auth") deps.onReauth?.();
  return Object.assign(new Error(`transcript terminal: ${code}`), {
    fatal: terminal.retryable !== true,
    terminalCode: code,
    streamId: typeof terminal.streamId === "string" ? terminal.streamId : "",
  });
}

/** One `data:` line, or SKIP when it is not something the caller should see. */
function frameValue(kind: string, line: string, deps: StreamDeps): unknown {
  if (kind === "error") {
    // Legacy routes used an empty error event; it remains retryable.
    throw new Error("transcript reported an error");
  }
  if (!KNOWN_EVENTS.has(kind)) return SKIP;
  let parsed: unknown;
  try {
    parsed = JSON.parse(line.slice(6));
  } catch {
    return SKIP;
  }
  if (kind === "connected") return SKIP;
  if (kind === "terminal") throw terminalFailure(parsed, deps);
  return parsed;
}

/** Every dispatched value in a chunk, plus the event name left open for the next one. */
function drainLines(lines: readonly string[], openEvent: string, deps: StreamDeps) {
  const values: unknown[] = [];
  let event = openEvent;
  for (const line of lines) {
    if (line.startsWith("event: ")) {
      event = line.slice(7).trim();
      continue;
    }
    if (!line.startsWith("data: ")) continue;
    const kind = event;
    event = "message";
    const parsed = frameValue(kind, line, deps);
    if (parsed !== SKIP) values.push(parsed);
  }
  return { values, event };
}

function transcriptQuery(agentId: string, cursor: TranscriptCursor): URLSearchParams {
  const query = new URLSearchParams({ agentId, after: cursor.after, phase: cursor.phase });
  if (cursor.generation !== undefined) query.set("generation", String(cursor.generation));
  return query;
}

async function openStream(
  account: string,
  agentId: string,
  cursor: TranscriptCursor,
  signal: AbortSignal,
  deps: StreamDeps
) {
  const doFetch = deps.fetchImpl ?? fetch;
  const response = await doFetch(
    `/api/providers/${encodeURIComponent(account)}/grok-bot/transcript?${transcriptQuery(agentId, cursor)}`,
    { signal }
  );
  if (response.status === 429) {
    // Another tab holds this connection's watch slots. That clears on its own, so it
    // must not spend the snapshot's drop budget.
    const sleep =
      deps.sleep ??
      ((millis: number) => new Promise<void>((resolve) => setTimeout(resolve, millis)));
    await sleep(ADMISSION_PAUSE_MS);
    throw Object.assign(new Error("transcript 429"), { admission: true });
  }
  const failure = statusFailure(response.status, deps);
  if (failure) throw failure;
  if (!response.ok || !response.body) throw new Error(`transcript ${response.status}`);
  return response;
}

/** A snapshot is a bounded read; a live stream is not. */
function overSnapshotBudget(
  cursor: TranscriptCursor,
  budget: StreamDeps["budget"],
  bytes: number,
  started: number,
  now: () => number
): boolean {
  if (cursor.phase !== "snapshot") return false;
  const measure = budget ?? snapshotBudget;
  return measure({ bytes, elapsed: now() - started }, SNAPSHOT_LIMIT) !== "ok";
}

export async function* readTranscriptStream(
  account: string,
  agentId: string,
  cursor: TranscriptCursor,
  signal: AbortSignal,
  deps: StreamDeps = {}
): AsyncGenerator<unknown> {
  const budget = deps.budget ?? snapshotBudget;
  const now = deps.now ?? Date.now;
  const response = await openStream(account, agentId, cursor, signal, deps);
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let pending = "";
  let event = "message";
  let bytes = 0;
  const started = now();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) return;
    bytes += value.byteLength;
    if (overSnapshotBudget(cursor, budget, bytes, started, now)) {
      throw new Error("snapshot budget");
    }
    pending += decoder.decode(value, { stream: true });
    const lines = pending.split("\n");
    pending = lines.pop() ?? "";
    const drained = drainLines(lines, event, deps);
    event = drained.event;
    for (const value of drained.values) yield value;
  }
}

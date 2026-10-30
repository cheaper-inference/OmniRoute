import { snapshotBudget } from "./transcript";

/** Where the transcript reader left off; the route takes both halves. */
export type TranscriptCursor = { phase: string; after: string };

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
export async function* readTranscriptStream(
  account: string,
  agentId: string,
  cursor: TranscriptCursor,
  signal: AbortSignal,
  deps: StreamDeps = {}
): AsyncGenerator<unknown> {
  const doFetch = deps.fetchImpl ?? fetch;
  const budget = deps.budget ?? snapshotBudget;
  const now = deps.now ?? Date.now;
  const sleep =
    deps.sleep ?? ((millis: number) => new Promise<void>((resolve) => setTimeout(resolve, millis)));

  const query = new URLSearchParams({
    agentId,
    after: cursor.after,
    phase: cursor.phase,
  });
  const response = await doFetch(
    `/api/providers/${encodeURIComponent(account)}/grok-bot/transcript?${query}`,
    { signal }
  );
  if (response.status === 409) {
    // The grant is gone; retrying cannot help and six attempts of it look like
    // a network fault to the user.
    deps.onReauth?.();
    throw new Error("transcript 409");
  }
  if (response.status === 429) {
    // Another tab holds this connection's watch slots. That clears on its own,
    // so it must not spend the snapshot's drop budget.
    await sleep(ADMISSION_PAUSE_MS);
    throw Object.assign(new Error("transcript 429"), { admission: true });
  }
  if (!response.ok || !response.body) throw new Error(`transcript ${response.status}`);

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let pending = "";
  let event = "message";
  let bytes = 0;
  const started = now();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (
      cursor.phase === "snapshot" &&
      budget({ bytes, elapsed: now() - started }, SNAPSHOT_LIMIT) !== "ok"
    ) {
      throw new Error("snapshot budget");
    }
    pending += decoder.decode(value, { stream: true });
    const lines = pending.split("\n");
    pending = lines.pop() ?? "";
    for (const line of lines) {
      if (line.startsWith("event: ")) {
        event = line.slice(7).trim();
        continue;
      }
      if (!line.startsWith("data: ")) continue;
      const kind = event;
      event = "message";
      if (kind === "error") {
        // The route's failure notice carries an empty object; parsed as a frame
        // it would reset the failure counters and the retry loop would never
        // end.
        throw new Error("transcript reported an error");
      }
      if (kind !== "message" && kind !== "connected" && kind !== "frame" && kind !== "terminal")
        continue;
      try {
        yield JSON.parse(line.slice(6));
      } catch {
        /* skip a malformed line */
      }
    }
  }
}

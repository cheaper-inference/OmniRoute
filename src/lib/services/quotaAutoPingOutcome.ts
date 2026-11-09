/**
 * quotaAutoPingOutcome.ts — decide whether a Codex quota auto-ping actually completed.
 *
 * Codex reports many failures inside an HTTP 200 Responses stream (`response.failed`,
 * `response.incomplete`, a bare `error` event), and the 5h window only starts once the
 * response completes. So an HTTP 200 alone is not a sent ping: the stream must carry a
 * `response.completed` event. Framing is tolerant — LF/CRLF/CR separators, data-only
 * frames (event name taken from `data.type`), and a final frame flushed at EOF without a
 * trailing blank line. On a failure event the upstream stream is cancelled, not drained.
 */

export type CodexPingOutcome = "completed" | "failed" | "incomplete";

type JsonRecord = Record<string, unknown>;

type PingResponseLike = {
  text?: () => Promise<string>;
  body?: ReadableStream<Uint8Array> | null;
};

const FRAME_SEPARATOR = /\r\n\r\n|\n\n|\r\r/;
const FAILURE_EVENTS = new Set(["error", "response.failed", "response.incomplete"]);
const FAILURE_STATUSES = new Set(["failed", "incomplete"]);

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

function parseFrame(block: string): { event: string | null; data: JsonRecord | null } {
  let event: string | null = null;
  const dataLines: string[] = [];
  for (const line of block.split(/\r\n|\n|\r/)) {
    if (line.startsWith("event:")) event = line.slice(6).trim();
    else if (line.startsWith("data:")) dataLines.push(line.slice(5).trimStart());
  }
  let data: JsonRecord | null = null;
  if (dataLines.length > 0) {
    try {
      data = asRecord(JSON.parse(dataLines.join("\n")));
    } catch {
      // Keepalives, `[DONE]` and malformed frames carry no lifecycle signal.
    }
  }
  if (!event && typeof data?.type === "string") event = data.type;
  return { event, data };
}

/** Classify one frame: a terminal outcome, or null to keep reading. */
function classifyFrame(block: string): CodexPingOutcome | null {
  const { event, data } = parseFrame(block);
  if (!event) return null;
  const status = asRecord(data?.response)?.status;
  if (FAILURE_EVENTS.has(event)) return "failed";
  if (typeof status === "string" && FAILURE_STATUSES.has(status)) return "failed";
  if (event === "response.completed") return "completed";
  return null;
}

/** Scan a buffer, returning the first terminal outcome and the unconsumed remainder. */
function scanFrames(
  buffer: string,
  atEof: boolean
): { outcome: CodexPingOutcome | null; rest: string } {
  let rest = buffer;
  for (;;) {
    const match = FRAME_SEPARATOR.exec(rest);
    if (!match) break;
    const outcome = classifyFrame(rest.slice(0, match.index));
    rest = rest.slice(match.index + match[0].length);
    if (outcome) return { outcome, rest };
  }
  if (atEof && rest.trim()) return { outcome: classifyFrame(rest), rest: "" };
  return { outcome: null, rest };
}

async function readStreamOutcome(body: ReadableStream<Uint8Array>): Promise<CodexPingOutcome> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let finished = false;
  try {
    while (!finished) {
      const { done, value } = await reader.read();
      finished = done;
      buffer += done ? decoder.decode() : decoder.decode(value, { stream: true });
      const { outcome, rest } = scanFrames(buffer, done);
      buffer = rest;
      if (outcome) return outcome;
    }
    return "incomplete";
  } finally {
    if (!finished) await reader.cancel().catch(() => undefined);
    reader.releaseLock();
  }
}

/** Read a Codex Responses ping stream until it completes, fails, or ends. */
export async function readCodexPingOutcome(
  response: PingResponseLike | undefined
): Promise<CodexPingOutcome> {
  if (!response) return "incomplete";
  const body = response.body;
  if (body && typeof body.getReader === "function") return readStreamOutcome(body);
  if (typeof response.text !== "function") return "incomplete";
  const text = await response.text().catch(() => "");
  return scanFrames(text, true).outcome ?? "incomplete";
}

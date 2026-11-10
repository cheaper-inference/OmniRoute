/**
 * Opt-in coalescing of Anthropic `content_block_delta` SSE frames sent to a Claude client.
 *
 * Claude Code's VS Code extension renders one postMessage per SSE event. A fast
 * Anthropic-compatible upstream emits one `content_block_delta` per token (mostly
 * `thinking_delta` at high effort), the extension falls behind and the UI sits on
 * "working" for minutes. This coalescer merges consecutive deltas that share the SAME
 * content-block `index` AND the same delta type, concatenating `text` / `thinking` /
 * `partial_json`, so the client sees fewer, larger events with identical content.
 *
 * It works on already-formatted SSE frames (the bytes `forward()` hands to the client),
 * so the translated lane and the claude→claude passthrough lane are covered by the same
 * code. A pending group is flushed when:
 *   - any frame that is not a mergeable delta of the same group arrives (boundary events,
 *     `signature_delta`, other delta types, comments, unparseable frames), BEFORE that frame;
 *   - the group's window timer fires (the timer is NOT restarted by later deltas, so a long
 *     same-type burst is emitted as a batch every window);
 *   - the owner calls `flush()` (end of stream).
 *
 * Lossless and order-preserving. A group of one frame is re-emitted byte-for-byte; only
 * groups of two or more are re-serialized. OFF by default: every window is 0 unless the
 * operator sets one of the `SSE_COALESCE_*_MS` env vars.
 */

export type DeltaCoalesceWindows = {
  text_delta: number;
  thinking_delta: number;
  input_json_delta: number;
};

type MergeableDeltaType = keyof DeltaCoalesceWindows;

const MERGE_FIELD: Record<MergeableDeltaType, "text" | "thinking" | "partial_json"> = {
  text_delta: "text",
  thinking_delta: "thinking",
  input_json_delta: "partial_json",
};

type ClaudeDeltaEvent = {
  type: "content_block_delta";
  index: number;
  delta: { type: MergeableDeltaType } & Record<string, unknown>;
};

type ParsedDeltaFrame = { prefix: string; event: ClaudeDeltaEvent };

function readWindow(...values: Array<string | undefined>): number {
  for (const value of values) {
    const parsed = Number(value);
    if (value !== undefined && value !== "" && Number.isFinite(parsed) && parsed > 0) {
      return parsed;
    }
  }
  return 0;
}

/** Per-delta-type windows, read once per stream: per-type env, then SSE_COALESCE_MS, else 0. */
export function readDeltaCoalesceWindows(): DeltaCoalesceWindows {
  const global = process.env.SSE_COALESCE_MS;
  return {
    text_delta: readWindow(process.env.SSE_COALESCE_TEXT_MS, global),
    thinking_delta: readWindow(process.env.SSE_COALESCE_THINKING_MS, global),
    input_json_delta: readWindow(process.env.SSE_COALESCE_INPUT_JSON_MS, global),
  };
}

export function deltaCoalescingEnabled(windows: DeltaCoalesceWindows): boolean {
  return windows.text_delta > 0 || windows.thinking_delta > 0 || windows.input_json_delta > 0;
}

const DELTA_FRAME_RE = /^((?:event: ?content_block_delta\r?\n)?)data: ?(\{[^\n]*\})\r?\n\r?\n$/;

/**
 * Parse one complete `[event: content_block_delta\n]data: {...}\n\n` frame. Returns null for
 * anything else (other events, several frames in one chunk, non-mergeable delta types such as
 * `signature_delta`), which the coalescer then treats as a boundary.
 */
export function parseMergeableDeltaFrame(frame: string): ParsedDeltaFrame | null {
  if (!frame.includes("content_block_delta")) return null;
  const match = DELTA_FRAME_RE.exec(frame);
  if (!match) return null;
  let event: unknown;
  try {
    event = JSON.parse(match[2]);
  } catch {
    return null;
  }
  if (!event || typeof event !== "object") return null;
  const candidate = event as Record<string, unknown>;
  const delta = candidate.delta as Record<string, unknown> | undefined;
  if (candidate.type !== "content_block_delta" || typeof candidate.index !== "number") return null;
  if (!delta || typeof delta !== "object" || typeof delta.type !== "string") return null;
  if (!Object.hasOwn(MERGE_FIELD, delta.type)) return null;
  const field = MERGE_FIELD[delta.type as MergeableDeltaType];
  if (delta[field] !== undefined && typeof delta[field] !== "string") return null;
  return { prefix: match[1], event: candidate as ClaudeDeltaEvent };
}

type PendingGroup = {
  prefix: string;
  event: ClaudeDeltaEvent;
  firstFrame: Uint8Array;
  count: number;
  timer: ReturnType<typeof setTimeout> | null;
};

export type DeltaFrameCoalescer = {
  /** Feed one formatted SSE frame; merged/passed-through frames go to `emit` in order. */
  push: (bytes: Uint8Array) => void;
  /** Emit the pending group now (end of stream, or before an out-of-band write). */
  flush: () => void;
  /** Drop the pending group and its timer without emitting (stream already closed). */
  dispose: () => void;
};

export function createDeltaFrameCoalescer(
  windows: DeltaCoalesceWindows,
  emit: (bytes: Uint8Array) => void
): DeltaFrameCoalescer {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let pending: PendingGroup | null = null;

  const take = (): PendingGroup | null => {
    const group = pending;
    pending = null;
    if (group?.timer) clearTimeout(group.timer);
    return group;
  };

  const flush = () => {
    const group = take();
    if (!group) return;
    emit(
      group.count === 1
        ? group.firstFrame
        : encoder.encode(`${group.prefix}data: ${JSON.stringify(group.event)}\n\n`)
    );
  };

  const push = (bytes: Uint8Array) => {
    const parsed = parseMergeableDeltaFrame(decoder.decode(bytes));
    if (!parsed) {
      flush();
      emit(bytes);
      return;
    }
    const { event } = parsed;
    const deltaType = event.delta.type;
    if (pending && pending.event.index === event.index && pending.event.delta.type === deltaType) {
      const field = MERGE_FIELD[deltaType];
      const merged = pending.event.delta;
      merged[field] = String(merged[field] ?? "") + String(event.delta[field] ?? "");
      pending.count += 1;
      return;
    }
    flush();
    const windowMs = windows[deltaType];
    if (windowMs <= 0) {
      emit(bytes);
      return;
    }
    const timer = setTimeout(flush, windowMs);
    (timer as { unref?: () => void }).unref?.();
    pending = {
      prefix: parsed.prefix,
      event: { ...event, delta: { ...event.delta } },
      firstFrame: bytes,
      count: 1,
      timer,
    };
  };

  return { push, flush, dispose: () => void take() };
}

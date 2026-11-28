// Metadata held back by a redaction window must reach the client inside the frame it arrived
// on, before the stream's terminal event. Emitting the held tail later, as a frame of its own,
// produced a bare path map with no protocol envelope after `message_stop` /
// `response.completed` / `[DONE]`, which SDK clients reject or drop.
//
// So the frame that owns an unresolved tail is not written yet: it waits in an ordered queue
// (with everything after it, so the wire order never changes) until the tail resolves. A later
// frame on the same path takes the tail over through the window and frees the earlier frame;
// a terminal event (or the end of the stream) folds every remaining tail, masked, back into
// the field it came from and writes the queue out.
//
// A leaf module on purpose: sseTextTransform.ts imports it, and it imports nothing.

/** The path-keyed redaction window of the metadata strings (see streamingCredentialTransform). */
export interface MetadataWindow {
  /** Redact one value; part of it may stay held under `path`. `final` releases it whole. */
  process: (text: string, path: string, final: boolean) => string;
  /** Whether a tail is still held under `path`. */
  holds: (path: string) => boolean;
  /** Take the tail held under `path`, masked as a standalone value. */
  release: (path: string) => string;
  /** Bytes currently held under `path`, so the queue can be charged for them up front. */
  heldBytes?: (path: string) => number;
}

type Frame = object;
type Owner = { holder: Record<string, unknown>; key: string; frame: Frame };
type Entry = { kind: "text"; text: string } | { kind: "frame"; frame: Frame; render: () => string };
type Sink = (text: string) => void;

export interface MetadataHold {
  /** Redact `holder[key]` (a string of `frame`) in place through the window. */
  redact: (
    holder: Record<string, unknown>,
    key: string,
    path: string,
    frame: Frame,
    mode: { stop: boolean; snapshot: boolean }
  ) => void;
  /** Write raw SSE text, behind any frame still waiting on a held tail. */
  write: (text: string, sink: Sink) => void;
  /** Write a frame; it waits while it owns a held tail or an earlier frame still waits. */
  writeFrame: (frame: Frame, render: () => string, sink: Sink) => void;
  /** Fold every held tail into its own field, masked, and write out every waiting frame. */
  releaseAll: (sink: Sink) => void;
  /** Drop waiting output after the stream errored or was cancelled. */
  clear: () => void;
}

export function createMetadataHold(window: MetadataWindow, maxDeferredBytes: number): MetadataHold {
  const owners = new Map<string, Owner>();
  const queue: Entry[] = [];
  let queuedBytes = 0;

  const owned = (frame: Frame) => {
    for (const owner of owners.values()) if (owner.frame === frame) return true;
    return false;
  };

  // Size is measured, never accumulated: a tail migrates from the frame that held it to the
  // frame that takes the path over, and a running total would charge it twice (or keep it
  // charged after it moved). Recomputing from the queue plus the tails each frame owns is
  // the only version that stays right across both moves.
  const sizeOf = (entry: Entry): number => {
    if (entry.kind === "text") return entry.text.length;
    let tails = 0;
    for (const [path, owner] of owners) {
      if (owner.frame === entry.frame) tails += window.heldBytes?.(path) ?? 0;
    }
    return entry.render().length + tails;
  };

  const recount = () => {
    queuedBytes = queue.reduce((total, entry) => total + sizeOf(entry), 0);
    return queuedBytes;
  };

  const drain = (sink: Sink) => {
    while (queue.length > 0) {
      const head = queue[0];
      if (head.kind === "frame" && owned(head.frame)) return;
      queue.shift();
      sink(head.kind === "text" ? head.text : head.render());
      recount();
    }
    queuedBytes = 0;
  };

  const push = (entry: Entry) => {
    queue.push(entry);
    // Fail closed like every other buffer of the credential transform: writing the frames
    // out early would release a fragment that the next frame could still complete.
    if (recount() > maxDeferredBytes)
      throw new Error("[PII] Credential stream buffer limit exceeded");
  };

  const releasePath = (path: string) => {
    const owner = owners.get(path);
    if (!owner) return;
    owners.delete(path);
    const emitted = owner.holder[owner.key];
    owner.holder[owner.key] = (typeof emitted === "string" ? emitted : "") + window.release(path);
  };

  return {
    redact(holder, key, path, frame, { stop, snapshot }) {
      // A snapshot is sanitized as a standalone value: an earlier tail on the same path goes
      // back to its own frame instead of being prepended to the snapshot (no duplication).
      if (snapshot) releasePath(path);
      holder[key] = window.process(holder[key] as string, path, stop || snapshot);
      // A later value on the path took the earlier tail over, so the earlier frame is free.
      if (window.holds(path)) owners.set(path, { holder, key, frame });
      else owners.delete(path);
    },
    write(text, sink) {
      drain(sink);
      if (queue.length === 0) sink(text);
      else push({ kind: "text", text });
    },
    writeFrame(frame, render, sink) {
      drain(sink);
      if (queue.length === 0 && !owned(frame)) {
        sink(render());
        return;
      }
      push({ kind: "frame", frame, render });
    },
    releaseAll(sink) {
      for (const path of Array.from(owners.keys())) releasePath(path);
      drain(sink);
    },
    clear() {
      owners.clear();
      queue.length = 0;
      queuedBytes = 0;
    },
  };
}

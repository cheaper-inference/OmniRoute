/**
 * agyTuiTranscript.ts — the reply, read from agy's own conversation record.
 *
 * In interactive mode agy streams nothing: the answer appears on the screen and
 * lands in `~/.gemini/antigravity-cli/brain/<conversation>/.system_generated/logs/transcript_full.jsonl`.
 * `transcript.jsonl` truncates long fields — the final answer among them — so the
 * `_full` variant is the only one that can be replayed to a caller.
 *
 * Only what a proxied request needs is read here: which row is this turn's
 * prompt, and the model's reply to it. Tool activity is not replayed (the `tui`
 * transport offers no client tools), so it is deliberately not tracked.
 *
 * Ported from TimWongUp/agentnave `agy_tui/__init__.py` (`Turn.row`).
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/** Where agy keeps one conversation's untruncated record. */
export function transcriptPath(conversationId: string, home: string = os.homedir()): string {
  return path.join(
    home,
    ".gemini",
    "antigravity-cli",
    "brain",
    conversationId,
    ".system_generated",
    "logs",
    "transcript_full.jsonl"
  );
}

/** Whitespace collapsed: a pasted prompt is echoed with its own line breaks. */
export function flat(text: string): string {
  return text.split(/\s+/).filter(Boolean).join(" ");
}

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonRecord)
    : {};
}

export type TranscriptProgress = {
  /** The row carrying this turn's prompt has been seen. */
  userSeen: boolean;
  /** The model has written a reply after it. */
  answered: boolean;
  /** The reply text, replaced whenever a later row supersedes it. */
  response: string;
  /**
   * Bumped for every row consumed. A running tool writes rows without changing
   * the screen, so this is what tells a live turn from a stalled one.
   */
  revision: number;
};

/**
 * Reads one conversation's transcript incrementally, by byte offset.
 *
 * `poll()` consumes only complete lines: the last line of a file still being
 * written has no newline yet, and reading a half-written row would surface a
 * truncated answer.
 */
export class AgyTranscriptReader {
  private offset = 0;
  private pending = "";

  constructor(
    private readonly file: string,
    /** Read lazily: the prompt is only known once it has been pasted. */
    private readonly expect: () => string,
    private readonly progress: TranscriptProgress
  ) {}

  /** Start at the current end, so earlier turns are never read as this one. */
  seekToEnd(): void {
    try {
      this.offset = fs.statSync(this.file).size;
    } catch {
      this.offset = 0;
    }
  }

  /** Read whatever complete rows have landed since the last call. */
  poll(): TranscriptProgress {
    let chunk: string;
    try {
      const handle = fs.openSync(this.file, "r");
      try {
        const size = fs.fstatSync(handle).size;
        if (size <= this.offset) return this.progress;
        const buffer = Buffer.alloc(size - this.offset);
        fs.readSync(handle, buffer, 0, buffer.length, this.offset);
        this.offset = size;
        chunk = buffer.toString("utf8");
      } finally {
        fs.closeSync(handle);
      }
    } catch {
      return this.progress;
    }

    this.pending += chunk;
    const lines = this.pending.split("\n");
    // The trailing element is either "" (clean boundary) or a partial row.
    this.pending = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.trim()) continue;
      let row: unknown;
      try {
        row = JSON.parse(line);
      } catch {
        continue;
      }
      this.consume(asRecord(row));
    }
    return this.progress;
  }

  private consume(row: JsonRecord): void {
    const kind = row.type;
    const content = row.content;
    const expected = this.expect();
    this.progress.revision += 1;
    if (
      kind === "USER_INPUT" &&
      row.source === "USER_EXPLICIT" &&
      typeof content === "string" &&
      expected.length > 0 &&
      flat(content).includes(expected)
    ) {
      this.progress.userSeen = true;
      this.progress.answered = false;
      this.progress.response = "";
      return;
    }
    if (kind !== "PLANNER_RESPONSE" || !this.progress.userSeen) return;
    // A planner row with no text is the model about to call a tool; it does not
    // clear an answer already written, and it is not one.
    if (typeof content === "string" && content.trim()) {
      this.progress.response = content;
      this.progress.answered = true;
    }
  }
}

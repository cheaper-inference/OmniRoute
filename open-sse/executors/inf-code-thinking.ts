/**
 * InfCode (Token Infinity) response-shape isolation.
 *
 * The gateway mirrors the model's reasoning into BOTH channels, verified live
 * 2026-11-09 against `deepseek-v4-1-flash-261017` (streaming):
 *
 *   - `delta.reasoning_content` / `message.reasoning_content` — the thinking text
 *   - `delta.content` / `message.content` — the same text wrapped in
 *     `<thinking>…</thinking>`, followed by the real answer
 *
 * Leaving that as-is duplicates the trace: a client that renders `content`
 * shows the thinking twice, and a client that only reads `content` sees raw
 * `<thinking>` tags. The generic textual-reasoning-tag rules are deliberately
 * NOT extended for InfCode — every byte of InfCode-specific response handling
 * lives behind its own executor, so a future gateway format change (new tag,
 * renamed field, different envelope) is a one-file edit that cannot drift into
 * another provider's path.
 */

type JsonRecord = Record<string, unknown>;

/** Tag names the gateway is known to use for its inline reasoning block. */
const REASONING_TAG_NAMES = ["think", "thinking", "thought", "internal_thought"];

const OPEN_REASONING_TAG_RE = new RegExp(`<(${REASONING_TAG_NAMES.join("|")})\\b[^>]*>`, "i");
const CLOSE_REASONING_TAG_RE = new RegExp(`</(${REASONING_TAG_NAMES.join("|")})\\s*>`, "i");

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

function nonEmptyString(value: unknown): string {
  return typeof value === "string" && value.length > 0 ? value : "";
}

/**
 * Longest suffix of `text` that could still become a reasoning tag once more
 * bytes arrive: a lone `<`, `</`, or a prefix of one of our tag names (an
 * attribute tail such as `<thinking foo` also counts). Plain text like
 * `a < b` is not held back.
 */
function partialTagSuffixLength(text: string): number {
  const lastLt = text.lastIndexOf("<");
  if (lastLt < 0) return 0;
  const suffix = text.slice(lastLt);
  if (suffix.includes(">")) return 0;
  if (suffix === "<" || suffix === "</") return suffix.length;
  const nameMatch = suffix.match(/^<\/?([a-z_]+)/i);
  if (!nameMatch) return 0;
  const partial = nameMatch[1].toLowerCase();
  return REASONING_TAG_NAMES.some((name) => name.startsWith(partial)) ? suffix.length : 0;
}

/**
 * Streaming state machine that removes `<thinking>…</thinking>` blocks from the
 * `content` channel while remembering the stripped text. Tag boundaries are
 * safe across chunk splits: a partial tag is buffered until it can be resolved.
 */
export class InfCodeThinkingFilter {
  private pending = "";
  private inside = false;
  private thinkingParts: string[] = [];

  /** True while the filter is consuming an open reasoning block. */
  isInsideThinking(): boolean {
    return this.inside;
  }

  /** Thinking text stripped from `content` so far. */
  get thinking(): string {
    return this.thinkingParts.join("");
  }

  /** Feed one `content` fragment; returns the text safe to forward now. */
  push(fragment: string): string {
    if (!fragment) return "";
    this.pending += fragment;
    let visible = "";
    // A single fragment can close one block and open the next.
    for (;;) {
      if (!this.inside) {
        const open = OPEN_REASONING_TAG_RE.exec(this.pending);
        if (open?.index !== undefined) {
          visible += this.pending.slice(0, open.index);
          this.pending = this.pending.slice(open.index + open[0].length);
          this.inside = true;
          continue;
        }
        const keep = partialTagSuffixLength(this.pending);
        visible += this.pending.slice(0, this.pending.length - keep);
        this.pending = this.pending.slice(this.pending.length - keep);
        break;
      }
      const close = CLOSE_REASONING_TAG_RE.exec(this.pending);
      if (close?.index !== undefined) {
        this.thinkingParts.push(this.pending.slice(0, close.index));
        this.pending = this.pending.slice(close.index + close[0].length);
        this.inside = false;
        continue;
      }
      // Inside the block nothing is forwarded; keep only a possible partial close tag.
      const keep = partialTagSuffixLength(this.pending);
      this.thinkingParts.push(this.pending.slice(0, this.pending.length - keep));
      this.pending = this.pending.slice(this.pending.length - keep);
      break;
    }
    return visible;
  }

  /** End of stream: return any buffered text that was not part of a block. */
  flush(): string {
    if (this.inside) {
      this.thinkingParts.push(this.pending);
      this.pending = "";
      return "";
    }
    const tail = this.pending;
    this.pending = "";
    return tail;
  }
}

interface SseChunkState {
  filter: InfCodeThinkingFilter;
  sawReasoningContent: boolean;
  promotedThinking: boolean;
}

/**
 * Hand the stripped block to the client as reasoning, exactly once, and only
 * when the gateway never sent reasoning_content on its own channel.
 * @returns true when `delta` gained the promoted text.
 */
function promoteStrippedThinking(delta: JsonRecord, state: SseChunkState): boolean {
  const { filter } = state;
  if (state.sawReasoningContent || state.promotedThinking) return false;
  if (!filter.thinking || filter.isInsideThinking()) return false;
  delta.reasoning_content = filter.thinking;
  state.promotedThinking = true;
  return true;
}

/** @returns true when the choice's delta was mutated. */
function rewriteChoiceDelta(choice: unknown, state: SseChunkState): boolean {
  const choiceRecord = asRecord(choice);
  const delta = asRecord(choiceRecord?.delta);
  if (!delta) return false;
  if (nonEmptyString(delta.reasoning_content) || nonEmptyString(delta.reasoning)) {
    state.sawReasoningContent = true;
  }
  // Clients stop reading at finish_reason, so a held partial tag has to leave here.
  const finishing = choiceRecord?.finish_reason != null;
  if (typeof delta.content !== "string" && !finishing) return false;

  const original = typeof delta.content === "string" ? delta.content : "";
  const visible = state.filter.push(original) + (finishing ? state.filter.flush() : "");

  const promoted = promoteStrippedThinking(delta, state);
  if (visible === original) return promoted;
  if (visible) delta.content = visible;
  else delete delta.content;
  return true;
}

/**
 * Strip the reasoning block from one upstream chat chunk in place.
 * @returns true when the object was mutated (the caller re-serializes it).
 */
function rewriteChatChunk(chunk: unknown, state: SseChunkState): boolean {
  const choices = asRecord(chunk)?.choices;
  if (!Array.isArray(choices)) return false;

  let changed = false;
  for (const choice of choices) {
    if (rewriteChoiceDelta(choice, state)) changed = true;
  }
  return changed;
}

interface SseEnvelope {
  id?: unknown;
  created?: unknown;
  model?: unknown;
}

function buildTailChunk(text: string, envelope: SseEnvelope | null): string {
  return JSON.stringify({
    id: typeof envelope?.id === "string" ? envelope.id : "chatcmpl-inf-code",
    object: "chat.completion.chunk",
    created: typeof envelope?.created === "number" ? envelope.created : 0,
    model: typeof envelope?.model === "string" ? envelope.model : "inf-code",
    choices: [{ index: 0, delta: { content: text }, finish_reason: null }],
  });
}

function stripTrailingCr(line: string): string {
  return line.endsWith("\r") ? line.slice(0, -1) : line;
}

/**
 * Rewrite an OpenAI-format SSE body: `content` loses its `<thinking>` wrapper,
 * `reasoning_content` is preserved untouched, and every other line (keepalive,
 * `[DONE]`, malformed frames) passes through byte-for-byte.
 */
export function createInfCodeSseTransform(): TransformStream<Uint8Array, Uint8Array> {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const state: SseChunkState = {
    filter: new InfCodeThinkingFilter(),
    sawReasoningContent: false,
    promotedThinking: false,
  };
  let buffer = "";
  let envelope: SseEnvelope | null = null;

  const emitLine = (rawLine: string): string => {
    const line = stripTrailingCr(rawLine);
    const match = line.match(/^(data:\s?)(.*)$/);
    if (!match) return line;
    const payload = match[2];
    if (payload.trim() === "[DONE]") {
      // Anything framed after [DONE] is discarded by the reader.
      const tail = state.filter.flush();
      return tail ? `data: ${buildTailChunk(tail, envelope)}\n\n${line}` : line;
    }
    let parsed: unknown;
    try {
      parsed = JSON.parse(payload);
    } catch {
      return line;
    }
    const record = asRecord(parsed);
    if (record) envelope = { id: record.id, created: record.created, model: record.model };
    return rewriteChatChunk(parsed, state) ? `${match[1]}${JSON.stringify(parsed)}` : line;
  };

  return new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      buffer += decoder.decode(chunk, { stream: true });
      let newlineIndex = buffer.indexOf("\n");
      while (newlineIndex >= 0) {
        controller.enqueue(encoder.encode(emitLine(buffer.slice(0, newlineIndex)) + "\n"));
        buffer = buffer.slice(newlineIndex + 1);
        newlineIndex = buffer.indexOf("\n");
      }
    },
    flush(controller) {
      buffer += decoder.decode();
      if (buffer.length > 0) {
        controller.enqueue(encoder.encode(emitLine(buffer)));
        buffer = "";
      }
      const tail = state.filter.flush();
      if (tail) {
        controller.enqueue(encoder.encode(`data: ${buildTailChunk(tail, envelope)}\n\n`));
      }
    },
  });
}

/**
 * Non-streaming counterpart: strip the reasoning block from every
 * `choices[].message.content`, promoting the stripped text to
 * `reasoning_content` only when the gateway did not already send it.
 * @returns true when the payload was mutated.
 */
export function rewriteInfCodeNonStreamJson(json: unknown): boolean {
  const record = asRecord(json);
  if (!record) return false;
  const choices = record.choices;
  if (!Array.isArray(choices)) return false;

  let changed = false;
  for (const choice of choices) {
    const message = asRecord(asRecord(choice)?.message);
    if (!message || typeof message.content !== "string") continue;

    const original = message.content;
    const filter = new InfCodeThinkingFilter();
    const visible = filter.push(original) + filter.flush();
    const hadReasoning =
      nonEmptyString(message.reasoning_content).length > 0 ||
      nonEmptyString(message.reasoning).length > 0;

    if (!hadReasoning && filter.thinking && !nonEmptyString(message.reasoning_content)) {
      message.reasoning_content = filter.thinking;
      changed = true;
    }
    if (visible !== original) {
      if (visible) message.content = visible;
      else delete message.content;
      changed = true;
    }
  }
  return changed;
}

/**
 * Turn a translated Antigravity request into the prompt agy's ACP server takes.
 *
 * Two things make this necessary rather than cosmetic:
 *
 *   1. ACP has no notion of chat history. `/v1/chat/completions` resends the
 *      whole conversation on every call, so somebody has to decide what the
 *      model has already seen. That is this module (the process holds the
 *      session; `agyCliAcp` asks here what to send).
 *   2. agy cuts a prompt at 128 KiB and appends `<truncated N bytes>`. A replay
 *      that hits that cut loses `</conversation_history>` and the whole
 *      `<current_turn>`, which the model then reads as an unfinished document.
 *      The budget below keeps the frame intact.
 *
 * The shapes here are the ones the HTTP executor already sends upstream
 * (`open-sse/translator/request/openai-to-gemini.ts` → `openaiToAntigravityRequest`),
 * never the client's original body: by the time an executor runs, the request is
 * already in Gemini `contents` form and the client's format is gone.
 */

import type { PromptPart } from "./agyCliAcp.ts";

/** One conversational turn, after the provider wire format has been left behind. */
export type AgyMessage = {
  role: "user" | "assistant";
  parts: PromptPart[];
};

type JsonRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is JsonRecord =>
  value !== null && typeof value === "object" && !Array.isArray(value);

// ── Byte accounting ─────────────────────────────────────────────────────────

export function utf8Bytes(text: string): number {
  return Buffer.byteLength(text, "utf8");
}

/** Bytes of text in `parts`; images carry no prompt text, as in agy. */
export function promptTextBytes(parts: PromptPart[]): number {
  return parts.reduce((sum, part) => sum + (part.type === "text" ? utf8Bytes(part.text) : 0), 0);
}

/**
 * The longest prefix of `text` within `bytes` UTF-8 bytes, never splitting a character.
 *
 * `encodeInto` reads a code point whole or not at all, so the buffer is never
 * left holding a truncated sequence — a `slice` on characters would be wrong and
 * a byte copy would emit a replacement character.
 */
export function utf8Prefix(text: string, bytes: number): string {
  if (bytes <= 0) return "";
  const encoder = new TextEncoder();
  const buffer = new Uint8Array(bytes);
  const { written } = encoder.encodeInto(text, buffer);
  return new TextDecoder().decode(buffer.subarray(0, written));
}

/**
 * The share of the budget the head keeps; the tail takes the rest.
 *
 * 45/55 rather than an even split because the end of a tool result, a stack
 * trace or a pasted document is where its outcome and the question about it
 * live — an even split loses the last lines of an error to the first lines of a
 * preamble that says nothing.
 */
const CLIP_HEAD_SHARE = 0.45;

/** The bytes of `text` [0, at) in UTF-8. */
function utf8BytesAt(text: string, at: number): number {
  return utf8Bytes(text.slice(0, at));
}

/**
 * The longest suffix of `text` after `from` within `budget` bytes.
 *
 * Scanned by binary search rather than by trimming characters one at a time: a
 * 190 KiB input would otherwise be re-measured once per dropped character. The
 * index is then walked off a lone low surrogate so the suffix never starts on
 * half of a character.
 */
function utf8SuffixWithin(text: string, from: number, budget: number): string {
  if (budget <= 0) return "";
  if (utf8BytesAt(text, text.length) - utf8BytesAt(text, from) <= budget) return text.slice(from);
  let low = from;
  let high = text.length;
  while (low < high) {
    const middle = (low + high) >> 1;
    if (utf8BytesAt(text, text.length) - utf8BytesAt(text, middle) <= budget) high = middle;
    else low = middle + 1;
  }
  // A slice at an arbitrary index can land between a surrogate pair; move past
  // the low half so the suffix decodes to real text rather than a replacement.
  while (low < text.length) {
    const code = text.charCodeAt(low);
    if (code >= 0xdc00 && code <= 0xdfff) low++;
    else break;
  }
  return text.slice(low);
}

/**
 * Keep the head and tail of `text` within `limit` bytes, marking what was cut.
 *
 * Head and tail rather than a plain prefix because the end of a tool result is
 * where its outcome usually is (an error, a count, a final line of output): an
 * input over the budget keeps the beginning *and* the end, which is where a
 * question, a failing assertion or a stack trace sits. Only when the limit
 * cannot even hold the omission marker does this degrade to a plain prefix.
 *
 * The marker reports how many bytes went missing, so its own length depends on
 * the number it carries. It is therefore measured at the widest value first
 * (the whole text) and the digits actually needed are handed back to the tail.
 */
export function clipMiddle(text: string, limit: number): string {
  const total = utf8Bytes(text);
  if (total <= limit) return text;

  const marker = (dropped: number): string => `\n[... ${dropped} bytes omitted ...]\n`;
  let overhead = utf8Bytes(marker(total));
  if (limit <= overhead) return utf8Prefix(text, Math.max(0, limit));

  let head = "";
  let tail = "";
  for (let pass = 0; pass < 4; pass++) {
    const room = limit - overhead;
    head = utf8Prefix(text, Math.max(0, Math.floor(room * CLIP_HEAD_SHARE)));
    tail = utf8SuffixWithin(text, head.length, Math.max(0, room - utf8Bytes(head)));
    const actual = utf8Bytes(marker(total - utf8Bytes(head) - utf8Bytes(tail)));
    if (actual >= overhead) break;
    overhead = actual;
  }
  return `${head}${marker(total - utf8Bytes(head) - utf8Bytes(tail))}${tail}`;
}

/**
 * Shrink the largest text parts (head and tail kept) until the text fits `limit`.
 *
 * Images are never touched: they are prompt content the caller attached, and
 * dropping one would answer a different question than the one that was asked.
 */
export function clipPartsToBytes(parts: PromptPart[], limit: number): PromptPart[] {
  const out = parts.map((part) => ({ ...part }));
  for (let guard = 0; guard < 64; guard++) {
    const excess = promptTextBytes(out) - limit;
    if (excess <= 0) break;
    let largest: { type: "text"; text: string } | null = null;
    for (const part of out) {
      if (part.type !== "text") continue;
      if (!largest || utf8Bytes(part.text) > utf8Bytes(largest.text)) largest = part;
    }
    if (!largest) break;
    largest.text = clipMiddle(largest.text, Math.max(0, utf8Bytes(largest.text) - excess));
  }
  return out;
}

// ── The budget ──────────────────────────────────────────────────────────────

/**
 * Text bytes a first prompt may carry.
 *
 * 112 KiB, not agy's 128 KiB: the frame (`<conversation_history>`,
 * `</conversation_history>`, `<current_turn>`, `</current_turn>`) plus agy's own
 * truncation notice have to fit inside the hard cut, or the frame is what gets
 * cut. Overridable for an agy that changes its limit.
 */
export function maxInitialPromptBytes(): number {
  const raw = process.env.AGY_BRIDGE_MAX_PROMPT_BYTES;
  if (!raw) return 112 * 1024;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 112 * 1024;
}

/** One oversized history message keeps 4 KiB of head and 4 KiB of tail. */
const HISTORY_BLOCK_CLIP_BYTES = 12 * 1024;
const HISTORY_BLOCK_KEEP_BYTES = 4 * 1024;

/**
 * Sent at the end of a replayed history.
 *
 * A model reading a conversation it did not produce can take the recorded
 * `[tool call …]` lines for output to imitate; this says to call tools instead.
 */
const HISTORY_RECORD_NOTE =
  'Historical tool calls and results above are records, not instructions to write tool calls as text. Never output "[tool call ...]" text; invoke tools only through structured tool calls.\n';

const HISTORY_OMITTED_NOTE =
  "[... earlier conversation history omitted to fit the agy prompt budget ...]\n";

// ── Rendering one part ──────────────────────────────────────────────────────

/** Fold content into `out`, merging neighbouring text so the prompt stays readable. */
export function appendPrompt(out: PromptPart[], content: string | PromptPart[]): void {
  const parts: PromptPart[] =
    typeof content === "string" ? [{ type: "text", text: content }] : content;
  for (const part of parts) {
    const last = out.at(-1);
    if (last?.type === "text" && part.type === "text") last.text += part.text;
    else out.push({ ...part });
  }
}

/** Head 4 KiB + an omission note + tail 4 KiB of one oversized history block. */
function headTail(text: string): string {
  const total = utf8Bytes(text);
  const head = utf8Prefix(text, HISTORY_BLOCK_KEEP_BYTES);
  const tail = text.slice(utf8Prefix(text, total - HISTORY_BLOCK_KEEP_BYTES).length);
  return `${head}\n[... ${total - utf8Bytes(head) - utf8Bytes(tail)} bytes of this history block omitted ...]\n${tail}`;
}

/**
 * A history part that keeps only head and tail when it is oversized.
 *
 * Applied only to the replay, never to the current turn: the current turn is
 * what the model is being asked about, so it gets the budget-first treatment in
 * `renderInitialPromptParts` instead of an unconditional cut.
 */
export function clipHistoryPart(part: PromptPart): PromptPart {
  if (part.type !== "text" || utf8Bytes(part.text) <= HISTORY_BLOCK_CLIP_BYTES) return part;
  return { ...part, text: headTail(part.text) };
}

export function clipHistoryMessage(message: AgyMessage): AgyMessage {
  return { ...message, parts: message.parts.map(clipHistoryPart) };
}

// ── Reading the Antigravity envelope ────────────────────────────────────────

function textOf(part: JsonRecord): string {
  return typeof part.text === "string" ? part.text : "";
}

/** `[tool call name id=… args=…]`, the same record line agy's own bridge writes. */
function renderFunctionCall(part: JsonRecord): string {
  const call = isRecord(part.functionCall) ? part.functionCall : {};
  const name = typeof call.name === "string" ? call.name : "";
  const id = typeof call.id === "string" ? call.id : "";
  const args = call.args === undefined ? {} : call.args;
  return `[tool call ${name} id=${id} args=${JSON.stringify(args)}]`;
}

/** A tool's answer, framed so the model can tell a result from an instruction. */
function renderFunctionResponse(part: JsonRecord): string {
  const response = isRecord(part.functionResponse) ? part.functionResponse : {};
  const id = typeof response.id === "string" ? response.id : "";
  const body = response.response === undefined ? {} : response.response;
  return `[tool result${id ? ` id=${id}` : ""}]\n${JSON.stringify(body)}\n[end of tool result]`;
}

/** An image part as agy takes it, or nothing when it is not inline base64. */
function imagePart(part: JsonRecord): PromptPart | null {
  const inline = isRecord(part.inlineData)
    ? part.inlineData
    : isRecord(part.inline_data)
      ? part.inline_data
      : null;
  if (!inline) return null;
  const data = typeof inline.data === "string" ? inline.data : "";
  const mimeType =
    typeof inline.mimeType === "string"
      ? inline.mimeType
      : typeof inline.mime_type === "string"
        ? inline.mime_type
        : "image/png";
  if (!data) return null;
  return { type: "image", mimeType, data };
}

/**
 * One Gemini content, as a user or assistant turn.
 *
 * A content whose parts are all `functionResponse` is a tool-result turn: it is
 * user-role on the wire and stays user-role here, which is also where a
 * continued turn starts (the client is answering a tool call it was given).
 */
function contentToMessage(content: unknown): AgyMessage | null {
  if (!isRecord(content)) return null;
  const rawParts = Array.isArray(content.parts) ? content.parts : [];
  const parts: PromptPart[] = [];
  for (const raw of rawParts) {
    if (!isRecord(raw)) continue;
    const image = imagePart(raw);
    if (image) {
      parts.push(image);
      continue;
    }
    if (isRecord(raw.functionCall)) {
      appendPrompt(parts, renderFunctionCall(raw));
      continue;
    }
    if (isRecord(raw.functionResponse)) {
      appendPrompt(parts, renderFunctionResponse(raw));
      continue;
    }
    const text = textOf(raw);
    if (text) appendPrompt(parts, text);
  }
  if (!parts.length) return null;
  // Gemini says "model"; both mean the same side of the conversation.
  const role = content.role === "model" ? "assistant" : "user";
  return { role, parts };
}

export type AgyRequestBody = { system: string; messages: AgyMessage[] };

/**
 * The request as `{ system, messages }`.
 *
 * `systemInstruction` is read as it arrives. The translator keeps only
 * Antigravity's own default there and moves the client's system prompt into the
 * first user part (`openai-to-gemini.ts`, #9030), so whatever is in this field is
 * genuinely system text and belongs in the wrapper `firstTurnParts` writes.
 */
export function antigravityBodyToMessages(body: unknown): AgyRequestBody {
  const envelope = isRecord(body) ? body : {};
  const request = isRecord(envelope.request) ? envelope.request : envelope;
  const contents = Array.isArray(request.contents) ? request.contents : [];

  const messages: AgyMessage[] = [];
  for (const content of contents) {
    const message = contentToMessage(content);
    if (!message) continue;
    // Consecutive same-role turns are one turn to a chat model; Gemini rejects
    // them unmerged, so the executor's own history arrives already merged and
    // this only holds for a turn appended here.
    const last = messages.at(-1);
    if (last && last.role === message.role) last.parts.push(...message.parts);
    else messages.push(message);
  }

  const systemParts = isRecord(request.systemInstruction)
    ? Array.isArray(request.systemInstruction.parts)
      ? request.systemInstruction.parts
      : []
    : [];
  const system = systemParts
    .map((part) => (isRecord(part) ? textOf(part) : ""))
    .filter(Boolean)
    .join("\n");

  return { system, messages };
}

// ── History versus the current turn ─────────────────────────────────────────

/**
 * Split the trailing run from its history.
 *
 * A request always ends on what the model must answer: the user's new message,
 * or the tool results it is waiting on. Everything before the last assistant
 * turn is history the session either already holds or has to be told once.
 */
export function trailingMessages(messages: AgyMessage[]): {
  history: AgyMessage[];
  current: AgyMessage[];
} {
  let start = messages.length;
  while (start > 0 && messages[start - 1].role !== "assistant") start--;
  return { history: messages.slice(0, start), current: messages.slice(start) };
}

/** A stable identity for a message list, for "has the session already seen this?". */
export function historyKey(messages: AgyMessage[]): string {
  return messages
    .map((message) => {
      const text = message.parts
        .map((part) => (part.type === "text" ? part.text : `[image ${part.mimeType}]`))
        .join("");
      return `${message.role[0]}:${text.length}:${text}`;
    })
    .join("\u0000");
}

/** Whether `prefix` is exactly the start of `messages`. */
export function hasPrefix(messages: AgyMessage[], prefix: AgyMessage[]): boolean {
  if (prefix.length > messages.length) return false;
  return historyKey(messages.slice(0, prefix.length)) === historyKey(prefix);
}

// ── Laying the prompt out ───────────────────────────────────────────────────

/** Join turns, separating them the way a chat transcript reads. */
function renderTurns(messages: AgyMessage[]): PromptPart[] {
  const out: PromptPart[] = [];
  for (let index = 0; index < messages.length; index++) {
    if (index > 0) appendPrompt(out, "\n\n");
    appendPrompt(out, messages[index].parts);
  }
  return out;
}

/** One history entry, labelled so the model knows who spoke. */
function renderHistoryEntry(message: AgyMessage): PromptPart[] {
  const out: PromptPart[] = [];
  appendPrompt(out, message.role === "assistant" ? "Assistant: " : "Human: ");
  appendPrompt(out, message.parts);
  appendPrompt(out, "\n");
  return out;
}

export type RenderInitialPromptInput = {
  /** The whole conversation, oldest first. */
  messages: AgyMessage[];
  /** Text bytes to leave free for parts the caller adds after this (a reminder). */
  reserveBytes?: number;
  /** Defaults to `maxInitialPromptBytes()`. */
  budgetBytes?: number;
};

/**
 * The first prompt for a session: history in a wrapper, the live turn outside it.
 *
 * The wrapper exists because the transcript is a record, not a request: unwrapped,
 * a model can read the last recorded tool call as the thing it must answer. The
 * live turn stays outside so the instruction it carries is unambiguous.
 *
 * A conversation with no history is sent as-is — the wrapper would only add
 * tokens to a prompt with nothing to frame.
 *
 * The whole history is sent, never a tail: this runs only for a session that
 * has not been sent anything. A conversation that diverges from what a session
 * holds is not replayed into it — `runAgyPrompt` retires that process and
 * starts a fresh one, so this always sees an empty transcript.
 *
 * Budget order is fixed: the live turn first, then the frame, then as much
 * history as still fits. History gives way in two steps — oversized blocks keep
 * their head and tail, then the oldest messages drop out behind an omission
 * note while the opening message and the newest turns stay.
 */
export function renderInitialPromptParts(input: RenderInitialPromptInput): PromptPart[] {
  const { history, current } = trailingMessages(input.messages);
  const budget = Math.max(
    0,
    (input.budgetBytes ?? maxInitialPromptBytes()) - (input.reserveBytes ?? 0)
  );

  let turn = renderTurns(current);
  if (!history.length) return clipPartsToBytes(turn, budget);

  const frameBytes = utf8Bytes(
    "<conversation_history>\n" +
      HISTORY_RECORD_NOTE +
      "</conversation_history>\n\n<current_turn>\n</current_turn>"
  );
  // The live turn is what the request is about: it shrinks only when it alone
  // would leave the frame no room at all, and even then keeps both ends. A
  // budget smaller than the frame gives the turn nothing rather than a negative
  // one, which would otherwise hand `clipMiddle` a limit it cannot honour.
  const turnRoom = budget - frameBytes;
  if (promptTextBytes(turn) + frameBytes > budget) {
    turn = clipPartsToBytes(turn, turnRoom > 0 ? turnRoom : 0);
  }

  let room = Math.max(0, turnRoom - promptTextBytes(turn));
  let entries = history.map((message) => {
    const parts = renderHistoryEntry(message);
    return { parts, bytes: promptTextBytes(parts) };
  });

  const total = (list: typeof entries): number => list.reduce((sum, entry) => sum + entry.bytes, 0);
  // A replay that fits goes in whole; only one that does not has its big blocks
  // clipped first, because a clipped block is less useful than a whole one.
  if (total(entries) > room) {
    entries = history.map((message) => {
      const parts = renderHistoryEntry(clipHistoryMessage(message));
      return { parts, bytes: promptTextBytes(parts) };
    });
  }

  if (total(entries) > room) {
    const noteBytes = utf8Bytes(HISTORY_OMITTED_NOTE);
    if (room < noteBytes) {
      entries = [];
    } else {
      // Keep the opening message (it says what the conversation is) and the
      // newest turns that still fit; the middle gives way to one omission note.
      const keep: number[] = [];
      let left = room;
      if (entries.length && entries[0].bytes + noteBytes <= left) {
        keep.push(0);
        left -= entries[0].bytes;
      }
      const floor = keep.length ? keep[0] : -1;
      const tail: number[] = [];
      for (let index = entries.length - 1; index > floor; index--) {
        const cost = entries[index].bytes + (tail.length === 0 ? noteBytes : 0);
        if (cost > left) break;
        left -= entries[index].bytes;
        tail.unshift(index);
      }
      const keptIndices = [...keep, ...tail];
      const kept: typeof entries = [];
      let next = 0;
      for (const index of keptIndices) {
        if (index > next)
          kept.push({ parts: [{ type: "text", text: HISTORY_OMITTED_NOTE }], bytes: noteBytes });
        kept.push(entries[index]);
        next = index + 1;
      }
      if (next < entries.length) {
        kept.push({ parts: [{ type: "text", text: HISTORY_OMITTED_NOTE }], bytes: noteBytes });
      }
      entries = kept;
    }
  }

  const out: PromptPart[] = [];
  appendPrompt(out, "<conversation_history>\n");
  for (const entry of entries) appendPrompt(out, entry.parts);
  appendPrompt(out, HISTORY_RECORD_NOTE);
  appendPrompt(out, "</conversation_history>\n\n<current_turn>\n");
  appendPrompt(out, turn);
  appendPrompt(out, "\n</current_turn>");
  // The per-message clip above is a heuristic; this is the guarantee.
  return promptTextBytes(out) <= budget ? out : clipPartsToBytes(out, budget);
}

/**
 * A continued turn: only what the session has not seen, with no wrapper.
 *
 * The session already holds the earlier turns, so wrapping these would put a
 * second `</conversation_history>` in a transcript that has one — and the
 * `<current_turn>` frame is a first-prompt convention, not a per-turn one.
 */
export function renderContinuedTurnParts(input: RenderInitialPromptInput): PromptPart[] {
  const { current } = trailingMessages(input.messages);
  const budget = Math.max(
    0,
    (input.budgetBytes ?? maxInitialPromptBytes()) - (input.reserveBytes ?? 0)
  );
  return clipPartsToBytes(renderTurns(current), budget);
}

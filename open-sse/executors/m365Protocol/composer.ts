/** Transport-free composition of native message snapshots and cursor-targeted deltas. */
type JsonRecord = Record<string, unknown>;
const record = (value: unknown): JsonRecord | null =>
  value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonRecord)
    : null;
export const M365_MAX_TEXT_LENGTH = 1_000_000;
export const M365_MAX_MESSAGES = 256;

const CARD_CURSOR = /^\$\[['"]([^'"\]]+)['"]\]\.adaptiveCards\[(\d+)\]\.body\[(\d+)\]\.text$/;

/**
 * When the cursor targets one of this message's card bodies, that card text is the snapshot
 * `writeAtCursor` appends to. `message.text` can meanwhile preview a token the following
 * writes repeat, so using it would duplicate that token.
 */
function cursorCardText(
  cursor: JsonRecord | null,
  id: string,
  message: JsonRecord
): string | undefined {
  const match = typeof cursor?.j === "string" ? CARD_CURSOR.exec(cursor.j) : null;
  if (!match || match[1] !== id || !Array.isArray(message.adaptiveCards)) return undefined;
  const card = record(message.adaptiveCards[Number(match[2])]);
  const body = card && Array.isArray(card.body) ? record(card.body[Number(match[3])]) : null;
  return typeof body?.text === "string" ? body.text : undefined;
}
export interface M365ComposerOptions {
  maxTextLength?: number;
  maxMessages?: number;
}
export interface M365ComposedUpdate {
  delta: string;
  next: string;
  streamingDiverged: boolean;
}
/** Use text for buffered tools. delta is append-only and stops permanently after a rewrite.
 * A streaming consumer cannot retract previously published bytes; never append a replacement.
 */
export class M365TurnComposer {
  private messages = new Map<string, string>();
  private blocked = new Set<string>();
  private cursorId: string | null = null;
  private cursorSuppressed = false;
  private emitted = "";
  private diverged = false;
  private readonly maxTextLength: number;
  private readonly maxMessages: number;
  constructor(options: M365ComposerOptions = {}) {
    this.maxTextLength = options.maxTextLength ?? M365_MAX_TEXT_LENGTH;
    this.maxMessages = options.maxMessages ?? M365_MAX_MESSAGES;
    for (const limit of [this.maxTextLength, this.maxMessages]) {
      if (!Number.isSafeInteger(limit) || limit <= 0)
        throw new RangeError("Invalid M365 composition limit");
    }
  }
  get text(): string {
    return [...this.messages.values()].join("\n\n");
  }
  get streamingDiverged(): boolean {
    return this.diverged;
  }
  private setText(id: string, text: string): void {
    if (!this.messages.has(id) && this.messages.size + this.blocked.size >= this.maxMessages)
      throw new RangeError("M365 message limit exceeded");
    const previous = this.messages.get(id);
    const size =
      this.text.length -
      (previous?.length ?? 0) +
      text.length +
      (previous === undefined && this.messages.size ? 2 : 0);
    if (size > this.maxTextLength) throw new RangeError("M365 text limit exceeded");
    this.messages.set(id, text);
  }
  private updateCursor(cursor: JsonRecord | null): void {
    if (typeof cursor?.j !== "string") return;
    const match = /^\$\[['"]([^'"\]]+)['"]\]/.exec(cursor.j);
    this.cursorId = match?.[1] ?? null;
    this.cursorSuppressed = !match;
  }
  private blockMessage(id: string): void {
    if (id === "__anonymous__") {
      this.cursorSuppressed = true;
      return;
    }
    if (this.blocked.has(id)) return;
    if (this.blocked.size + this.messages.size >= this.maxMessages)
      throw new RangeError("M365 message limit exceeded");
    this.blocked.add(id);
  }
  private consumeMessage(message: JsonRecord, cursor: JsonRecord | null): boolean {
    const id = typeof message.messageId === "string" ? message.messageId : "__anonymous__";
    const control = message.messageType !== undefined && message.messageType !== "Chat";
    const hidden =
      control ||
      ["SearchResults", "Code", "ToolCall", "EarlyProgress"].includes(String(message.contentType));
    if (hidden || (message.author !== undefined && message.author !== "bot")) {
      this.blockMessage(id);
      return true;
    }
    if (typeof message.text === "string" && !this.blocked.has(id)) {
      if (id === "__anonymous__" && !cursor) this.cursorSuppressed = false;
      this.setText(id, cursorCardText(cursor, id, message) ?? message.text);
    }
    return false;
  }
  private writeAtCursor(text: string, progress: boolean): void {
    const id = this.cursorId ?? "__anonymous__";
    if (!this.cursorSuppressed && !this.blocked.has(id) && !(progress && this.cursorId === null)) {
      this.setText(id, (this.messages.get(id) ?? "") + text);
    }
  }
  private consume(argument: JsonRecord): void {
    const cursor = record(argument.cursor);
    this.updateCursor(cursor);
    const messages = Array.isArray(argument.messages) ? argument.messages : [];
    let progress = false;
    for (const value of messages) {
      const message = record(value);
      if (message && this.consumeMessage(message, cursor)) progress = true;
    }
    if (typeof argument.writeAtCursor === "string") {
      this.writeAtCursor(argument.writeAtCursor, progress);
    }
  }
  private consumeFinal(value: JsonRecord): void {
    // Match the canonical final envelopes accepted by the transport. Result metadata
    // describes completion/refusal, not an assistant message; only compose messages.
    const argument = Array.isArray(value.arguments) ? record(value.arguments[0]) : null;
    const rawItem = value.item ?? argument?.item;
    const item = record(Array.isArray(rawItem) ? rawItem[0] : rawItem);
    if (item) this.consume(item);
  }
  push(frame: unknown): M365ComposedUpdate {
    const value = record(frame);
    if (value?.type === 1 && value.target === "update" && Array.isArray(value.arguments)) {
      for (const argument of value.arguments) {
        const item = record(argument);
        if (item) this.consume(item);
      }
    } else if (value?.type === 2) {
      this.consumeFinal(value);
    }
    const next = this.text;
    if (!next.startsWith(this.emitted)) this.diverged = true;
    const delta = this.diverged ? "" : next.slice(this.emitted.length);
    if (!this.diverged) this.emitted = next;
    return { delta, next, streamingDiverged: this.diverged };
  }
}

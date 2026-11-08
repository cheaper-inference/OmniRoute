/** Transport-free composition of native message snapshots and cursor-targeted deltas. */
import {
  M365CitationLedger,
  renderM365Citations,
  type M365RenderedCitations,
  type M365UrlCitation,
} from "./citations.ts";

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
  /** Citations that cover text published by this update's `delta`. */
  annotations: M365UrlCitation[];
  /** New text of Copilot's reasoning summary, published separately from the answer. */
  reasoningDelta: string;
}
const MAX_REASONING_LENGTH = 256 * 1024;
/** A reasoning-summary message: shown apart from the answer, never as part of it. */
const isReasoning = (message: JsonRecord) =>
  message.contentOrigin === "ChainOfThoughtSummary" || message.addToChainOfThought === true;
/** Use text for buffered tools. delta is append-only and stops permanently after a rewrite.
 * A streaming consumer cannot retract previously published bytes; never append a replacement.
 */
export class M365TurnComposer {
  private messages = new Map<string, string>();
  private blocked = new Set<string>();
  private reasoningMessages = new Map<string, string>();
  private readonly citations = new M365CitationLedger();
  private cursorId: string | null = null;
  private cursorSuppressed = false;
  private final = false;
  private emitted = "";
  private emittedAnnotations = 0;
  private emittedReasoning = "";
  private reasoningDiverged = false;
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
  private get raw(): string {
    return [...this.messages.values()].join("\n\n");
  }
  private rendered(): M365RenderedCitations {
    return renderM365Citations(this.raw, this.citations, this.final);
  }
  /** The answer as the client receives it, citation markers resolved. */
  get text(): string {
    return this.rendered().text;
  }
  /** The `url_citation` annotations of `text`. */
  get annotations(): M365UrlCitation[] {
    return this.rendered().annotations;
  }
  /** Copilot's reasoning summary for this turn, if it sent one. */
  get reasoning(): string {
    return [...this.reasoningMessages.values()].join("\n\n");
  }
  get streamingDiverged(): boolean {
    return this.diverged;
  }
  private setText(id: string, text: string): void {
    if (!this.messages.has(id) && this.messages.size + this.blocked.size >= this.maxMessages)
      throw new RangeError("M365 message limit exceeded");
    const previous = this.messages.get(id);
    const size =
      this.raw.length -
      (previous?.length ?? 0) +
      text.length +
      (previous === undefined && this.messages.size ? 2 : 0);
    if (size > this.maxTextLength) throw new RangeError("M365 text limit exceeded");
    this.messages.set(id, text);
  }
  private setReasoning(id: string, text: string): void {
    const previous = this.reasoningMessages.get(id)?.length ?? 0;
    if (this.reasoning.length - previous + text.length > MAX_REASONING_LENGTH) return;
    if (!this.reasoningMessages.has(id) && this.reasoningMessages.size >= this.maxMessages) return;
    this.reasoningMessages.set(id, text);
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
    if (isReasoning(message) && typeof message.text === "string")
      this.setReasoning(id, message.text);
    const control = message.messageType !== undefined && message.messageType !== "Chat";
    const hidden =
      control ||
      isReasoning(message) ||
      ["SearchResults", "Code", "ToolCall", "EarlyProgress"].includes(String(message.contentType));
    if (hidden || (message.author !== undefined && message.author !== "bot")) {
      this.blockMessage(id);
      return true;
    }
    this.citations.add(message.references);
    if (typeof message.text === "string" && !this.blocked.has(id)) {
      if (id === "__anonymous__" && !cursor) this.cursorSuppressed = false;
      this.setText(id, cursorCardText(cursor, id, message) ?? message.text);
    }
    return false;
  }
  private writeAtCursor(text: string, progress: boolean): void {
    const id = this.cursorId ?? "__anonymous__";
    const reasoning = this.reasoningMessages.get(id);
    if (reasoning !== undefined) {
      this.setReasoning(id, reasoning + text);
      return;
    }
    if (!this.cursorSuppressed && !this.blocked.has(id) && !(progress && this.cursorId === null)) {
      this.setText(id, (this.messages.get(id) ?? "") + text);
    }
  }
  private consume(argument: JsonRecord): void {
    const cursor = record(argument.cursor);
    this.updateCursor(cursor);
    // Sources often ride on the update that streams the text citing them.
    this.citations.add(argument.references);
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
  private reasoningUpdate(): string {
    const reasoning = this.reasoning;
    // A reasoning summary that rewrites itself stops streaming; it never fails the answer.
    if (this.reasoningDiverged || !reasoning.startsWith(this.emittedReasoning)) {
      this.reasoningDiverged = true;
      return "";
    }
    const delta = reasoning.slice(this.emittedReasoning.length);
    this.emittedReasoning = reasoning;
    return delta;
  }
  push(frame: unknown): M365ComposedUpdate {
    const value = record(frame);
    if (value?.type === 1 && value.target === "update" && Array.isArray(value.arguments)) {
      for (const argument of value.arguments) {
        const item = record(argument);
        if (item) this.consume(item);
      }
    } else if (value?.type === 2 || value?.type === 3) {
      this.final = true;
      if (value.type === 2) this.consumeFinal(value);
    }
    const rendered = this.rendered();
    const next = rendered.text.slice(0, rendered.stableLength);
    if (!next.startsWith(this.emitted)) this.diverged = true;
    const delta = this.diverged ? "" : next.slice(this.emitted.length);
    let annotations: M365UrlCitation[] = [];
    if (!this.diverged) {
      this.emitted = next;
      const published = rendered.annotations.filter(
        (annotation) => annotation.url_citation.end_index <= next.length
      );
      annotations = published.slice(this.emittedAnnotations);
      this.emittedAnnotations = published.length;
    }
    return {
      delta,
      next,
      streamingDiverged: this.diverged,
      annotations,
      reasoningDelta: this.reasoningUpdate(),
    };
  }
}

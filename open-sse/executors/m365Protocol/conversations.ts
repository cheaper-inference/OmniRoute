/**
 * Copilot conversation continuity.
 *
 * Copilot keeps every conversation server-side under its `ConversationId`. Starting a new one per
 * request re-sends the whole history and opens a new thread each turn, and Copilot throttles
 * accounts that open threads quickly. This store remembers, per connection and request profile,
 * the history each conversation has already seen, so a request that extends it with our reply
 * plus new messages continues the same conversation and sends only the new messages.
 *
 * A request continues a conversation only when all of these hold:
 * - its messages up to our reply hash to the exact history that conversation was sent
 *   (a sha256 chain over role, content and image references, so any edit breaks it);
 * - the message after that history is our reply: the tool-call ids we issued, or the same
 *   text up to whitespace (so two sessions with the same opener never swap conversations);
 * - something follows our reply, the conversation is not idle-expired and has room left under
 *   Copilot's per-conversation message cap.
 * Anything else starts a fresh conversation, which costs a thread but never a wrong context.
 * A claim removes the entry, so two concurrent identical requests cannot share one conversation;
 * the caller commits it back under the new history only after the turn succeeds.
 */
import { createHash } from "node:crypto";

type JsonRecord = Record<string, unknown>;
const record = (value: unknown): JsonRecord =>
  value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};

export interface M365ConversationIds {
  conversationId: string;
  sessionId: string;
}

export interface M365ConversationClaim {
  ids: M365ConversationIds;
  /** Messages after our reply: the only ones this turn needs to send. */
  delta: unknown[];
  /** User turns this conversation has already spent. */
  turns: number;
}

interface Entry {
  ids: M365ConversationIds;
  reply: string;
  turns: number;
  lastUsed: number;
}

export interface M365ConversationStoreOptions {
  now?: () => number;
  /** Forget a conversation after this much idle time. */
  idleMs?: number;
  /** Stop continuing a conversation once it has spent this many user turns. */
  maxTurns?: number;
  maxEntries?: number;
}

// The proxy-observed idle window for reusing a Copilot conversation.
const DEFAULT_IDLE_MS = 30 * 60 * 1000;
// Copilot caps a conversation at 600 user messages; keep headroom for retries.
const DEFAULT_MAX_TURNS = 590;
const DEFAULT_MAX_ENTRIES = 1000;

function messageText(content: unknown): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content
    .map((part) => {
      const p = record(part);
      return typeof p.text === "string" ? p.text : "";
    })
    .join("\n");
}

/** A message's content for the history hash: its text, plus where each image part points. */
function contentIdentity(content: unknown): string {
  if (!Array.isArray(content)) return messageText(content);
  return content
    .map((part) => {
      const p = record(part);
      if (typeof p.text === "string") return p.text;
      const image = typeof p.image_url === "string" ? p.image_url : record(p.image_url).url;
      return typeof image === "string" ? `\0image\0${image}` : "";
    })
    .join("\n");
}

function toolCallIds(message: JsonRecord): string[] {
  return Array.isArray(message.tool_calls)
    ? message.tool_calls.map((call) => String(record(call).id ?? ""))
    : [];
}

function normalizeText(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

/** Identity of a reply: its tool-call ids when it called tools, otherwise its text. */
export function m365ReplyFingerprint(output: {
  text: string;
  calls: ReadonlyArray<{ id: string }>;
}): string {
  return output.calls.length
    ? `calls:${output.calls.map((call) => call.id).join(",")}`
    : `text:${normalizeText(output.text)}`;
}

function echoedFingerprint(message: JsonRecord): string | null {
  if (message.role !== "assistant") return null;
  const ids = toolCallIds(message);
  return ids.length
    ? `calls:${ids.join(",")}`
    : `text:${normalizeText(messageText(message.content))}`;
}

function canonical(message: JsonRecord): string {
  return JSON.stringify([
    typeof message.role === "string" ? message.role : "",
    contentIdentity(message.content),
    Array.isArray(message.tool_calls)
      ? message.tool_calls.map((raw) => {
          const call = record(raw);
          const fn = record(call.function);
          return [call.id ?? null, fn.name ?? null, fn.arguments ?? null];
        })
      : null,
    message.tool_call_id ?? null,
  ]);
}

/** Chain heads: heads[k] identifies messages[0..k). */
function chainHeads(messages: readonly unknown[]): string[] {
  const heads = [createHash("sha256").update("m365-conversation").digest("hex")];
  for (const message of messages) {
    heads.push(
      createHash("sha256")
        .update(heads[heads.length - 1])
        .update("\0")
        .update(canonical(record(message)))
        .digest("hex")
    );
  }
  return heads;
}

export class M365ConversationStore {
  private entries = new Map<string, Entry[]>();
  private size = 0;
  private readonly now: () => number;
  private readonly idleMs: number;
  private readonly maxTurns: number;
  private readonly maxEntries: number;

  constructor(options: M365ConversationStoreOptions = {}) {
    this.now = options.now ?? Date.now;
    this.idleMs = options.idleMs ?? DEFAULT_IDLE_MS;
    this.maxTurns = options.maxTurns ?? DEFAULT_MAX_TURNS;
    this.maxEntries = options.maxEntries ?? DEFAULT_MAX_ENTRIES;
  }

  /** Take the conversation this request continues, if any; it leaves the store until committed. */
  claim(scope: string, messages: readonly unknown[]): M365ConversationClaim | null {
    const heads = chainHeads(messages);
    // Longest history first; the reply sits at index k and something must follow it.
    for (let k = messages.length - 2; k >= 1; k--) {
      const key = `${scope}\0${heads[k]}`;
      const list = this.entries.get(key);
      if (!list) continue;
      const echoed = echoedFingerprint(record(messages[k]));
      const index = list.findIndex((entry) => this.usable(entry) && entry.reply === echoed);
      if (index === -1) continue;
      const [entry] = list.splice(index, 1);
      this.size--;
      if (!list.length) this.entries.delete(key);
      return { ids: entry.ids, delta: messages.slice(k + 1), turns: entry.turns };
    }
    return null;
  }

  /** Remember a conversation after a successful turn that was sent `messages` and replied `reply`. */
  commit(
    scope: string,
    messages: readonly unknown[],
    ids: M365ConversationIds,
    reply: string,
    turns: number
  ): void {
    const key = `${scope}\0${chainHeads(messages)[messages.length]}`;
    const list = this.entries.get(key) ?? [];
    list.push({ ids, reply, turns, lastUsed: this.now() });
    this.entries.delete(key); // re-insert: Map order is the eviction order
    this.entries.set(key, list);
    this.size++;
    this.evict();
  }

  private usable(entry: Entry): boolean {
    return this.now() - entry.lastUsed <= this.idleMs && entry.turns < this.maxTurns;
  }

  private evict(): void {
    for (const [key, list] of this.entries) {
      if (this.size <= this.maxEntries) return;
      this.size -= list.length;
      this.entries.delete(key);
    }
  }
}

let shared = new M365ConversationStore();

/** The process-wide store the executor uses. */
export function m365Conversations(): M365ConversationStore {
  return shared;
}

export function __resetM365ConversationsForTesting(store = new M365ConversationStore()): void {
  shared = store;
}

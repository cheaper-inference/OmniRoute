/**
 * GitHub Copilot "Auto" model selection.
 *
 * Copilot's Auto mode (the only mode a Copilot Free account can use for chat) is a
 * two-step exchange: the client POSTs `{ prompt, has_image? }` to `/auto` and gets
 * back `{ selected_model: { id, capabilities }, session_token, expires_at }`, then
 * sends the real request with the concrete model id plus a `Copilot-Session-Token`
 * header. This module holds the pure pieces of that exchange — prompt/image
 * extraction, decision parsing and a bounded per-(account, conversation) cache — so
 * the executor only wires the HTTP call.
 */
import { createHash } from "node:crypto";

import { containsMediaKind } from "../../utils/mediaParts.ts";

export const COPILOT_AUTO_MODEL_ID = "auto";
/** `x-github-api-version` the `/auto` endpoint (and session-token chat calls) expect. */
export const COPILOT_AUTO_API_VERSION = "2026-08-01";
export const COPILOT_AUTO_TIMEOUT_MS = 5000;
/** Re-resolve when the cached session token has less than this left. */
export const COPILOT_AUTO_REFRESH_WINDOW_MS = 5 * 60 * 1000;
/** Used only when `/auto` omits `expires_at`. */
const DEFAULT_SESSION_TTL_MS = 60 * 60 * 1000;
const MAX_CACHED_SESSIONS = 1000;

export type CopilotAutoDecision = {
  model: string;
  sessionToken: string;
  expiresAtMs: number;
  supportsVision: boolean;
};

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

export function isCopilotAutoModel(model: unknown): boolean {
  return typeof model === "string" && model.trim().toLowerCase() === COPILOT_AUTO_MODEL_ID;
}

function textFromContent(content: unknown): string {
  if (typeof content === "string") return content.trim();
  if (!Array.isArray(content)) return "";
  return content
    .map((part) => {
      const record = asRecord(part);
      if (!record) return "";
      const isText = record.type === "text" || record.type === "input_text";
      return isText && typeof record.text === "string" ? record.text : "";
    })
    .filter(Boolean)
    .join("\n")
    .trim();
}

function latestUserText(items: unknown[]): string {
  for (let index = items.length - 1; index >= 0; index--) {
    const item = asRecord(items[index]);
    if (!item || item.role !== "user") continue;
    // Agentic loops end on a user turn that only carries tool results; keep walking
    // back to the last turn the user actually typed.
    const text = textFromContent(item.content);
    if (text) return text;
  }
  return "";
}

/**
 * The prompt `/auto` routes on: the latest user-typed text. Reads Chat Completions /
 * Claude `messages` and Responses `input` (string or message items), since the
 * decision is made on the client body before format translation.
 */
export function extractAutoPrompt(body: unknown): string {
  const record = asRecord(body);
  if (!record) return "";
  if (Array.isArray(record.messages)) {
    const text = latestUserText(record.messages);
    if (text) return text;
  }
  if (typeof record.input === "string") return record.input.trim();
  if (Array.isArray(record.input)) return latestUserText(record.input);
  return "";
}

export function hasAutoImageInput(body: unknown): boolean {
  const record = asRecord(body);
  if (!record) return false;
  type Turns = Parameters<typeof containsMediaKind>[0];
  return (
    containsMediaKind(record.messages as Turns, "image") ||
    containsMediaKind(record.input as Turns, "image")
  );
}

function toExpiresAtMs(raw: unknown, now: number): number {
  const numeric = typeof raw === "string" && raw.trim() !== "" ? Number(raw) : raw;
  if (typeof numeric === "number" && Number.isFinite(numeric) && numeric > 0) {
    return numeric < 1e12 ? numeric * 1000 : numeric;
  }
  if (typeof raw === "string") {
    const parsed = Date.parse(raw);
    if (Number.isFinite(parsed)) return parsed;
  }
  return now + DEFAULT_SESSION_TTL_MS;
}

/** Parse an `/auto` response body; null when it lacks a model id or session token. */
export function parseAutoDecision(payload: unknown, now = Date.now()): CopilotAutoDecision | null {
  const record = asRecord(payload);
  const selected = asRecord(record?.selected_model);
  const model = typeof selected?.id === "string" ? selected.id.trim() : "";
  const sessionToken = typeof record?.session_token === "string" ? record.session_token : "";
  if (!model || !sessionToken) return null;
  const supports = asRecord(asRecord(selected?.capabilities)?.supports);
  return {
    model,
    sessionToken,
    expiresAtMs: toExpiresAtMs(record?.expires_at, now),
    supportsVision: supports?.vision === true,
  };
}

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

/**
 * Cache key for one account + conversation. Both halves are hashed so no raw
 * credential or client session id is held in memory as a map key.
 */
export function buildAutoSessionKey(
  credentials: JsonRecord | null | undefined,
  sessionKey: string | null | undefined
): string {
  const psd = asRecord(credentials?.providerSpecificData);
  const accountSeed =
    credentials?.connectionId ||
    psd?.githubLogin ||
    credentials?.accessToken ||
    credentials?.copilotToken ||
    "github";
  return `${sha256(String(accountSeed))}:${sessionKey ? sha256(sessionKey) : "default"}`;
}

/** Bounded LRU of Auto decisions; expired entries are dropped on every write. */
export class CopilotAutoSessionCache {
  private readonly entries = new Map<string, CopilotAutoDecision>();

  constructor(private readonly maxEntries = MAX_CACHED_SESSIONS) {}

  get size(): number {
    return this.entries.size;
  }

  /** A cached decision still usable for this request, or null when it must be re-resolved. */
  getUsable(key: string, hasImage: boolean, now = Date.now()): CopilotAutoDecision | null {
    const entry = this.entries.get(key);
    if (!entry) return null;
    if (entry.expiresAtMs <= now) {
      this.entries.delete(key);
      return null;
    }
    if (entry.expiresAtMs - now <= COPILOT_AUTO_REFRESH_WINDOW_MS) return null;
    if (hasImage && !entry.supportsVision) return null;
    this.entries.delete(key);
    this.entries.set(key, entry);
    return entry;
  }

  set(key: string, decision: CopilotAutoDecision, now = Date.now()): void {
    for (const [existingKey, entry] of this.entries) {
      if (entry.expiresAtMs <= now) this.entries.delete(existingKey);
    }
    this.entries.delete(key);
    while (this.entries.size >= this.maxEntries) {
      const oldest = this.entries.keys().next().value;
      if (oldest === undefined) break;
      this.entries.delete(oldest);
    }
    this.entries.set(key, decision);
  }

  clear(): void {
    this.entries.clear();
  }
}

export const copilotAutoSessions = new CopilotAutoSessionCache();

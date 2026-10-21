/**
 * Managed-gateway transport for the MiniMax Code provider.
 *
 * The MiniMax Code desktop app talks to a managed subscription gateway
 * (`agent.minimax.io`) that speaks the Anthropic Messages contract: it accepts
 * a `tools` array and answers with `tool_use` blocks. That is the native
 * function-calling shape OmniRoute's OpenAI surface needs — the model asks for
 * a tool, OmniRoute hands the call to the client, the client executes it
 * locally and sends the result back.
 *
 * Credentials stay in the local MiniMax Code profile (`~/.minimax`). The access
 * token is short lived; it is refreshed through the account OAuth endpoint the
 * same way the CLI itself does it, and the rotated token is written back.
 */

import { readFile, writeFile, rename, chmod } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { resolvePublicCred } from "../utils/publicCreds.ts";

const GATEWAY_URL = "https://agent.minimax.io/mavis/api/v1/llm/v1/messages";
const ACCOUNT_BASES: Record<string, string> = {
  en: "https://account.minimax.io",
  cn: "https://account.minimax.cn",
};
const DEFAULT_MAX_TOKENS = 8192;
/**
 * Hard ceiling on the estimated input size of one gateway request.
 *
 * Incident 2026-10-21: a request with ~322k input tokens was accepted by the
 * managed gateway, ran for 236s and came back as `limit_exceeded`. That error
 * is what trips the in-memory model lockout in the combo fallback, which took
 * the MiniMax leg out of every combo for ~27 minutes. A request that large is
 * never useful here, so it is refused locally with a fast 400 instead of being
 * forwarded.
 */
const MAX_INPUT_TOKENS = 200_000;
/** Chars per token, deliberately pessimistic for CJK and code payloads. */
const CHARS_PER_TOKEN = 3;
/**
 * Per-attempt budget of one managed-gateway call.
 *
 * The gateway answers a chat turn in seconds. The whole retry budget has to
 * stay well under the per-target timeout of the routing machinery: one
 * unreachable gateway must not hold a model slot for minutes and take the
 * provider out of every fallback combo. One attempt of 60 s plus one retry is
 * the entire worst case.
 */
const DEFAULT_TIMEOUT_MS = 60_000;
const DEFAULT_MAX_RETRIES = 1;
const REFRESH_MARGIN_MS = 60_000;

type JsonRecord = Record<string, unknown>;

export interface MinimaxAuthProfile {
  accessToken: string;
  refreshToken?: string;
  clientId: string;
  scopes: string[];
  audience: string;
  expiresAtMs: number;
  generation: number;
  path: string;
  /** Key of the profile record this credential was read from. */
  recordKey?: string;
}

export interface GatewayToolCall {
  id: string;
  name: string;
  input: unknown;
}

export interface GatewayResult {
  text: string;
  toolCalls: GatewayToolCall[];
  stopReason: string;
  inputTokens: number;
  outputTokens: number;
}

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

/** Flatten an OpenAI content field into plain text. */
export function contentToText(content: unknown): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  const parts: string[] = [];
  for (const raw of content) {
    if (typeof raw === "string") {
      parts.push(raw);
      continue;
    }
    const part = asRecord(raw);
    if (part.type === "text" || part.type === "input_text" || part.type === "output_text") {
      parts.push(asString(part.text));
    }
  }
  return parts.join("");
}

/** Convert OpenAI image parts into Anthropic image blocks. */
function imageBlocks(content: unknown): JsonRecord[] {
  if (!Array.isArray(content)) return [];
  const blocks: JsonRecord[] = [];
  for (const raw of content) {
    const part = asRecord(raw);
    if (part.type !== "image_url") continue;
    const imageUrl = asRecord(part.image_url);
    const url = asString(imageUrl.url);
    const match = /^data:([^;,]+);base64,(.+)$/.exec(url);
    if (!match) continue;
    blocks.push({
      type: "image",
      source: { type: "base64", media_type: match[1], data: match[2] },
    });
  }
  return blocks;
}

function parseToolArguments(raw: unknown): unknown {
  if (typeof raw !== "string") return raw ?? {};
  const trimmed = raw.trim();
  if (!trimmed) return {};
  try {
    return JSON.parse(trimmed);
  } catch {
    return {};
  }
}

/**
 * Convert an OpenAI chat request into the Anthropic Messages payload the
 * managed gateway expects. Assistant tool calls become `tool_use` blocks and
 * tool results become `tool_result` blocks carried by a user message.
 */
export function buildGatewayPayload(body: JsonRecord, model: string): JsonRecord {
  const messages: JsonRecord[] = [];
  const systemParts: string[] = [];
  const toolNames = new Map<string, string>();
  let pendingToolResults: JsonRecord[] = [];

  // Anthropic requires every tool_result to sit in the user message that
  // immediately follows the assistant message with the matching tool_use, and
  // it rejects a tool_use whose result is missing. The results of all tools
  // called in one turn therefore share a single user message.
  const flushToolResults = () => {
    if (!pendingToolResults.length) return;
    messages.push({ role: "user", content: pendingToolResults });
    pendingToolResults = [];
  };

  for (const raw of Array.isArray(body.messages) ? body.messages : []) {
    const message = asRecord(raw);
    const role = asString(message.role) || "user";

    if (role === "system" || role === "developer") {
      const text = contentToText(message.content).trim();
      if (text) systemParts.push(text);
      continue;
    }

    if (role === "assistant") {
      flushToolResults();
      const blocks: JsonRecord[] = [];
      const text = contentToText(message.content);
      if (text) blocks.push({ type: "text", text });
      for (const rawCall of Array.isArray(message.tool_calls) ? message.tool_calls : []) {
        const call = asRecord(rawCall);
        const fn = asRecord(call.function);
        const id = asString(call.id);
        const name = asString(fn.name);
        if (!id || !name) continue;
        toolNames.set(id, name);
        blocks.push({ type: "tool_use", id, name, input: parseToolArguments(fn.arguments) });
      }
      if (!blocks.length) continue;
      messages.push({ role: "assistant", content: blocks });
      continue;
    }

    if (role === "tool" || role === "function") {
      const toolUseId = asString(message.tool_call_id);
      if (!toolUseId) continue;
      const name = asString(message.name) || toolNames.get(toolUseId) || "";
      const text = contentToText(message.content);
      const block: JsonRecord = { type: "tool_result", tool_use_id: toolUseId, content: text };
      if (name) block.name = name;
      pendingToolResults.push(block);
      continue;
    }

    flushToolResults();
    const text = contentToText(message.content);
    const images = imageBlocks(message.content);
    const blocks: JsonRecord[] = [];
    if (text) blocks.push({ type: "text", text });
    blocks.push(...images);
    if (!blocks.length) continue;
    messages.push({ role: "user", content: blocks.length === 1 ? text || blocks[0] : blocks });
  }
  flushToolResults();

  // The gateway requires the conversation to start with a user turn.
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length) messages.push({ role: "user", content: "(continue)" });

  const payload: JsonRecord = {
    model,
    max_tokens: resolveMaxTokens(body),
    messages,
  };
  if (systemParts.length) {
    payload.system = systemParts.map((text) => ({ type: "text", text }));
  }

  const rawTools = Array.isArray(body.tools) ? body.tools : [];
  const toolChoice = asString(body.tool_choice);
  if (rawTools.length && toolChoice !== "none") {
    payload.tools = rawTools.map((raw) => {
      const item = asRecord(raw);
      const fn = asRecord(item.function);
      const schema = asRecord(fn.parameters);
      return {
        name: asString(fn.name),
        description: asString(fn.description),
        input_schema: Object.keys(schema).length > 0 ? schema : { type: "object", properties: {} },
      };
    });
    if (toolChoice === "required" || toolChoice === "any") payload.tool_choice = { type: "any" };
    else if (toolChoice) payload.tool_choice = { type: "auto" };
  }

  const temperature = Number(body.temperature);
  if (Number.isFinite(temperature)) payload.temperature = temperature;
  const topP = Number(body.top_p);
  if (Number.isFinite(topP)) payload.top_p = topP;

  return payload;
}

function resolveMaxTokens(body: JsonRecord): number {
  const raw = Number(body.max_tokens ?? body.max_completion_tokens);
  if (Number.isFinite(raw) && raw > 0) return Math.floor(raw);
  const env = Number(process.env.MINIMAX_CODE_MAX_TOKENS);
  if (Number.isFinite(env) && env > 0) return Math.floor(env);
  return DEFAULT_MAX_TOKENS;
}

/** Convert an Anthropic Messages response into the pieces OmniRoute needs. */
export function parseGatewayResult(doc: JsonRecord): GatewayResult {
  const content = Array.isArray(doc.content) ? doc.content : [];
  let text = "";
  const toolCalls: GatewayToolCall[] = [];
  for (const raw of content) {
    const part = asRecord(raw);
    const type = asString(part.type);
    if (type === "text") text += asString(part.text);
    else if (type === "tool_use") {
      toolCalls.push({
        id: asString(part.id),
        name: asString(part.name),
        input: part.input ?? {},
      });
    }
  }
  const usage = asRecord(doc.usage);
  return {
    text,
    toolCalls,
    stopReason: asString(doc.stop_reason) || "end_turn",
    inputTokens: Number(usage.input_tokens ?? 0) || 0,
    outputTokens: Number(usage.output_tokens ?? 0) || 0,
  };
}

/** Build the OpenAI chat completion body for a gateway result. */
export function gatewayResultToCompletion(model: string, result: GatewayResult): JsonRecord {
  const toolCalls = result.toolCalls.map((call) => ({
    id: call.id,
    type: "function",
    function: { name: call.name, arguments: JSON.stringify(call.input ?? {}) },
  }));
  const finishReason = result.toolCalls.length
    ? "tool_calls"
    : result.stopReason === "max_tokens"
      ? "length"
      : "stop";
  return {
    id: `chatcmpl-minimax-code-${Date.now()}`,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: result.text,
          ...(toolCalls.length ? { tool_calls: toolCalls } : {}),
        },
        finish_reason: finishReason,
      },
    ],
    usage: {
      prompt_tokens: result.inputTokens,
      completion_tokens: result.outputTokens,
      total_tokens: result.inputTokens + result.outputTokens,
    },
  };
}

/** Absolute path of the MiniMax Code auth profile. */
export function resolveAuthFile(profileDir?: string): string {
  const override = process.env.MINIMAX_CODE_AUTH_FILE;
  if (override) return override;
  const dir = profileDir || process.env.MINIMAX_CODE_PROFILE_DIR || join(homedir(), ".minimax");
  // The account region decides both where the profile lives and which account
  // endpoint refreshes the token: a CN account has no `en` profile.
  const region = (process.env.MINIMAX_CODE_REGION || "en").trim().toLowerCase() || "en";
  return join(dir, "auth", "prod", region, "mcode-public", "auth.json");
}

/** Endpoint of the managed subscription gateway. */
export function resolveGatewayUrl(): string {
  return process.env.MINIMAX_CODE_GATEWAY_URL || GATEWAY_URL;
}

/**
 * Read every credential record of the local MiniMax Code auth profile.
 *
 * The profile holds one record per account identity — `records` is keyed by
 * the account scope hash — and the CLI rotates a credential by writing a new
 * generation into the live record. An older record keeps an access token the
 * account endpoint has already revoked and a refresh token that was consumed
 * in the meantime, so the newest generation is the one worth trying first.
 * Token values never leave the host.
 */
export async function readAuthProfiles(path: string): Promise<MinimaxAuthProfile[]> {
  let doc: JsonRecord;
  try {
    doc = asRecord(JSON.parse(await readFile(path, "utf8")));
  } catch {
    return [];
  }
  const records = asRecord(doc.records);
  const profiles: MinimaxAuthProfile[] = [];
  for (const [key, raw] of Object.entries(records)) {
    const record = asRecord(raw);
    const accessToken = asString(record.accessToken);
    if (!accessToken) continue;
    profiles.push({
      accessToken,
      refreshToken: record.refreshToken ? asString(record.refreshToken) : undefined,
      clientId: asString(record.clientId) || resolvePublicCred("minimax_id"),
      scopes: Array.isArray(record.scopes) ? record.scopes.map(asString) : ["agent.default"],
      audience: asString(record.audience) || "agent-backend",
      expiresAtMs: Number(record.expiresAtMs ?? 0) || 0,
      generation: Number(record.generation ?? 0) || 0,
      path,
      recordKey: key,
    });
  }
  profiles.sort((a, b) => b.generation - a.generation || b.expiresAtMs - a.expiresAtMs);
  // An operator can pin the record explicitly when several accounts share the
  // profile. The newest generation stays the default.
  const explicit = (process.env.MINIMAX_CODE_AUTH_RECORD || "").trim();
  if (explicit) {
    const index = profiles.findIndex((profile) => profile.recordKey === explicit);
    if (index < 0) {
      throw new Error(
        `MINIMAX_CODE_AUTH_RECORD=${explicit} is not a record of the MiniMax Code profile`
      );
    }
    if (index > 0) profiles.unshift(...profiles.splice(index, 1));
  }
  return profiles;
}

/** Read the live credential record of the local MiniMax Code auth profile. */
export async function readAuthProfile(path: string): Promise<MinimaxAuthProfile | null> {
  const profiles = await readAuthProfiles(path);
  return profiles[0] ?? null;
}

/**
 * Keep the CLI session state in sync with the rotated credential.
 *
 * The MiniMax Code CLI validates the credential against the `auth-state.json`
 * file next to it. A state file that still points at the previous generation
 * makes the CLI treat the session as expired ("Sign in to MiniMax to use
 * Agent features") even though the credential itself is fresh. The CLI writes
 * both files on its own refresh, so the gateway has to do the same.
 *
 * `auth-state.json` is the CLI's private format. OmniRoute emulates the two
 * fields it knows (generation, expiry) and writes the status the CLI expects.
 * If MiniMax extends that format, this writer has to follow it — OmniRoute is
 * a second writer of a credential store owned by another application.
 */
async function writeAuthState(path: string, profile: MinimaxAuthProfile): Promise<void> {
  const statePath = join(dirname(path), "auth-state.json");
  let state: JsonRecord;
  try {
    state = asRecord(JSON.parse(await readFile(statePath, "utf8")));
  } catch {
    // No state file: the CLI creates one on login.
    return;
  }
  if (typeof state.generation !== "number") return;
  state.generation = profile.generation;
  state.expiresAtMs = profile.expiresAtMs;
  state.status = "authenticated";
  const tmp = `${statePath}.tmp`;
  await writeFile(tmp, `${JSON.stringify(state, null, 2)}\n`, { mode: 0o600 });
  await rename(tmp, statePath);
  await chmod(statePath, 0o600).catch(() => undefined);
}

/** Persist a refreshed token back into the MiniMax Code auth profile. */
async function writeAuthProfile(path: string, profile: MinimaxAuthProfile): Promise<void> {
  const doc = asRecord(JSON.parse(await readFile(path, "utf8")));
  const records = asRecord(doc.records);
  const keys = Object.keys(records);
  if (!keys.length) return;
  // Write the credential back into the record it came from: the profile can
  // hold several accounts, and refreshing one of them must not touch another.
  const key = profile.recordKey && keys.includes(profile.recordKey) ? profile.recordKey : keys[0];
  const record = asRecord(records[key]);
  record.accessToken = profile.accessToken;
  if (profile.refreshToken) record.refreshToken = profile.refreshToken;
  record.expiresAtMs = profile.expiresAtMs;
  record.generation = profile.generation;
  const tmp = `${path}.tmp`;
  await writeFile(tmp, `${JSON.stringify(doc, null, 2)}\n`, { mode: 0o600 });
  await rename(tmp, path);
  await chmod(path, 0o600).catch(() => undefined);
}

export interface EnsureTokenOptions {
  path?: string;
  region?: string;
  fetchImpl?: typeof fetch;
  now?: number;
  /** Refresh even when the current access token is still valid. */
  force?: boolean;
  onRefresh?: (profile: MinimaxAuthProfile) => void;
}
/**
 * Return a usable access token, refreshing it through the account OAuth
 * endpoint when it is expired or about to expire.
 */
export async function ensureAccessToken(options: EnsureTokenOptions = {}): Promise<string> {
  const path = options.path || resolveAuthFile();
  const profiles = await readAuthProfiles(path);
  if (!profiles.length) {
    throw new Error("MiniMax Code auth profile not found — run `mcode login` first");
  }
  const now = options.now ?? Date.now();
  let lastError: unknown = null;
  for (const profile of profiles) {
    if (!options.force && profile.expiresAtMs && profile.expiresAtMs - now > REFRESH_MARGIN_MS) {
      return profile.accessToken;
    }
    if (!profile.refreshToken) return profile.accessToken;
    try {
      const refreshed = await refreshAuthProfile(profile, options);
      return refreshed.accessToken;
    } catch (error) {
      // The refresh token of this record was already consumed by the CLI or by
      // another client. Another record of the same profile can still hold a
      // live token, so the next one is tried before the request is failed.
      lastError = error;
    }
  }
  if (lastError) throw lastError;
  return profiles[0].accessToken;
}

/** Exchange the refresh token for a new access token and persist it. */
export async function refreshAuthProfile(
  profile: MinimaxAuthProfile,
  options: EnsureTokenOptions = {}
): Promise<MinimaxAuthProfile> {
  const region =
    (options.region || process.env.MINIMAX_CODE_REGION || "en").trim().toLowerCase() || "en";
  const base = ACCOUNT_BASES[region] || ACCOUNT_BASES.en;
  const doFetch = options.fetchImpl || fetch;
  const form = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: profile.refreshToken || "",
    client_id: profile.clientId,
    scope: profile.scopes.join(" "),
    audience: profile.audience,
  });
  const response = await doFetch(`${base}/oauth2/token`, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "user-agent": "minimax-code-cli",
    },
    body: form.toString(),
  });
  if (!response.ok) {
    throw new Error(`MiniMax token refresh failed (${response.status})`);
  }
  const data = asRecord(await response.json());
  const accessToken = asString(data.access_token);
  if (!accessToken) throw new Error("MiniMax token refresh returned no access token");
  const expiresIn = Number(data.expires_in ?? 0);
  const updated: MinimaxAuthProfile = {
    ...profile,
    accessToken,
    refreshToken: asString(data.refresh_token) || profile.refreshToken,
    expiresAtMs: Date.now() + (expiresIn > 0 ? expiresIn : 3600) * 1000,
    generation: profile.generation + 1,
  };
  try {
    await writeAuthProfile(profile.path, updated);
  } catch {
    // A read-only profile must not break the request: the fresh token still works.
  }
  try {
    await writeAuthState(profile.path, updated);
  } catch {
    // The CLI would read a stale state file as an expired session.
  }
  options.onRefresh?.(updated);
  return updated;
}

export interface GatewayCallOptions {
  payload: JsonRecord;
  accessToken: string;
  stream: boolean;
  signal?: AbortSignal | null;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
  url?: string;
  /** Retries on a transient failure (429, 5xx, network). */
  maxRetries?: number;
  /** Base backoff delay between retries. */
  retryBaseMs?: number;
}

/** The gateway rejected the access token: refresh it and try again. */
export class GatewayAuthError extends Error {
  readonly status = 401;

  constructor(message: string) {
    super(message);
    this.name = "GatewayAuthError";
  }
}

function sleep(ms: number, signal?: AbortSignal | null): Promise<void> {
  return new Promise((resolve) => {
    // A ref'd timer: the backoff has to keep the process alive, otherwise a
    // retry is dropped silently whenever the caller is not a server.
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        resolve();
      },
      { once: true }
    );
  });
}

/**
 * Perform the HTTP call against the managed gateway.
 *
 * A transient failure (429, 5xx, a dropped connection) is retried with an
 * exponential backoff, the way the MiniMax Code app does. A rejected token is
 * reported as `GatewayAuthError` so the caller can refresh it and retry.
 */
export async function callGateway(options: GatewayCallOptions): Promise<Response> {
  const doFetch = options.fetchImpl || fetch;
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const maxRetries = Math.max(
    0,
    options.maxRetries ?? Number(process.env.MINIMAX_CODE_GATEWAY_RETRIES ?? DEFAULT_MAX_RETRIES)
  );
  const baseMs = options.retryBaseMs ?? 1000;
  let lastError: unknown = null;

  for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
    if (attempt > 0) {
      await sleep(Math.min(baseMs * 2 ** (attempt - 1), 30_000), options.signal);
    }
    const controller = new AbortController();
    // A ref'd timer: an unref'd abort timer never fires when the caller is
    // not a server, and the attempt is then abandoned without an answer.
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const onAbort = () => controller.abort();
    options.signal?.addEventListener("abort", onAbort, { once: true });
    try {
      const response = await doFetch(options.url || resolveGatewayUrl(), {
        method: "POST",
        headers: {
          authorization: `Bearer ${options.accessToken}`,
          "content-type": "application/json",
          "anthropic-version": "2023-06-01",
          "user-agent": "MiniMaxAgent",
          accept: options.stream ? "text/event-stream" : "application/json",
        },
        body: JSON.stringify({ ...options.payload, stream: options.stream }),
        signal: controller.signal,
      });
      if (response.status === 401) {
        const detail = await response.text().catch(() => "");
        throw new GatewayAuthError(
          `MiniMax gateway rejected the access token (401)${detail ? `: ${detail.slice(0, 200)}` : ""}`
        );
      }
      if (!response.ok) {
        const detail = await response.text().catch(() => "");
        const error = new Error(
          `MiniMax gateway error ${response.status}${detail ? `: ${detail.slice(0, 300)}` : ""}`
        );
        if (response.status === 429 || response.status >= 500) {
          lastError = error;
          continue;
        }
        throw error;
      }
      return response;
    } catch (error) {
      if (error instanceof GatewayAuthError) throw error;
      lastError = error;
      if (attempt >= maxRetries) break;
    } finally {
      clearTimeout(timer);
      options.signal?.removeEventListener("abort", onAbort);
    }
  }

  throw lastError instanceof Error ? lastError : new Error("MiniMax gateway request failed");
}

export interface GatewayStreamState {
  text: string;
  toolCalls: { id: string; name: string; arguments: string }[];
  finishReason: string;
  inputTokens: number;
  outputTokens: number;
}

/**
 * Fold one Anthropic SSE event into the stream state.
 * Returns the text delta carried by the event ("" when there is none).
 */
export function applyGatewayEvent(state: GatewayStreamState, event: JsonRecord): string {
  const type = asString(event.type);

  if (type === "message_start") {
    const message = asRecord(event.message);
    const usage = asRecord(message.usage);
    state.inputTokens = Number(usage.input_tokens ?? 0) || 0;
    return "";
  }
  if (type === "content_block_start") {
    const block = asRecord(event.content_block);
    if (asString(block.type) === "tool_use") {
      state.toolCalls.push({
        id: asString(block.id),
        name: asString(block.name),
        arguments: "",
      });
    }
    return "";
  }
  if (type === "content_block_delta") {
    const delta = asRecord(event.delta);
    const deltaType = asString(delta.type);
    if (deltaType === "text_delta") {
      const text = asString(delta.text);
      state.text += text;
      return text;
    }
    if (deltaType === "input_json_delta") {
      const partial = asString(delta.partial_json);
      const last = state.toolCalls[state.toolCalls.length - 1];
      if (last) last.arguments += partial;
      return "";
    }
    return "";
  }
  if (type === "message_delta") {
    const delta = asRecord(event.delta);
    const stopReason = asString(delta.stop_reason);
    if (stopReason) state.finishReason = stopReason;
    const usage = asRecord(event.usage);
    if (usage && Number(usage.output_tokens ?? 0) > 0) {
      state.outputTokens = Number(usage.output_tokens);
    }
    return "";
  }
  return "";
}

/** Parse a raw SSE buffer into the Anthropic events it carries. */
export function parseGatewaySse(chunk: string): JsonRecord[] {
  const events: JsonRecord[] = [];
  for (const block of chunk.split("\n\n")) {
    const dataLines = block
      .split("\n")
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).trim());
    if (!dataLines.length) continue;
    const payload = dataLines.join("\n");
    if (!payload || payload === "[DONE]") continue;
    try {
      const parsed = JSON.parse(payload);
      if (parsed && typeof parsed === "object") events.push(parsed as JsonRecord);
    } catch {
      // Ignore keep-alive or partial frames.
    }
  }
  return events;
}

/**
 * Estimate the input tokens of a gateway payload.
 *
 * The managed gateway does not report the input size before it starts
 * generating, so the size is estimated from the serialized prompt. The
 * estimate is deliberately pessimistic: it must never underestimate a payload
 * that the gateway would reject.
 */
export function estimateGatewayInputTokens(payload: JsonRecord): number {
  // The tool schemas belong to the request: an agentic client sends its whole
  // tool catalog on every turn, and it is usually the largest part of it.
  // Leaving them out is exactly how the incident this guard was written for
  // slipped through.
  const text =
    JSON.stringify(payload.messages ?? []) +
    JSON.stringify(payload.system ?? []) +
    JSON.stringify(payload.tools ?? []);
  return Math.ceil(text.length / CHARS_PER_TOKEN);
}

/**
 * A payload whose estimated input size is above the ceiling.
 *
 * Returned as a plain object so the caller can turn it into a 400 response
 * without going through the gateway at all.
 */
export function isGatewayPayloadOversized(payload: JsonRecord): boolean {
  return estimateGatewayInputTokens(payload) > MAX_INPUT_TOKENS;
}

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

import { readFile, writeFile, rename, chmod, mkdir } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { resolveMinimaxCodeAccountBase } from "../config/minimaxCode.ts";
import { resolvePublicCred } from "../utils/publicCreds.ts";

const GATEWAY_URL = "https://agent.minimax.io/mavis/api/v1/llm/v1/messages";
const DEFAULT_MAX_TOKENS = 8192;
/**
 * Ceiling on the estimated input size of one MANAGED GATEWAY request.
 *
 * This is the ceiling of the gateway transport, not of the model: the local
 * MiniMax Code transport runs the same models with their full context
 * (1M for MiniMax-M3.1-Flash, 512k for MiniMax-M3) and has no such guard.
 *
 * Incident 2026-10-21: a request with ~322k input tokens was accepted by the
 * managed gateway, ran for 236s and came back as `limit_exceeded`. That error
 * is what trips the in-memory model lockout in the combo fallback, which took
 * the MiniMax leg out of every combo for ~27 minutes. A request that large is
 * never useful on this transport, so it is refused locally with a fast
 * 413 instead of being forwarded.
 *
 * The value is an operator knob: a deployment whose gateway accepts more can
 * raise it without a code change.
 */
const DEFAULT_MAX_INPUT_TOKENS = 200_000;
/**
 * Chars per token, per script.
 *
 * Latin text and code run around three to four chars per token, Cyrillic
 * around two, and CJK, Kana and Hangul are close to one token per character.
 * A single ratio would have to be the worst case for every script, and a
 * ratio that is too small lets the payload the gateway rejects through the
 * guard — that is how the incident this guard was written for happened.
 */
const LATIN_CHARS_PER_TOKEN = 3;
const CYRILLIC_CHARS_PER_TOKEN = 2;
const WIDE_CHARS_PER_TOKEN = 1;
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

/** The account region of the local profile. */
function resolveRegion(): string {
  return (process.env.MINIMAX_CODE_REGION || "en").trim().toLowerCase() || "en";
}

/**
 * The record a profile without any account identity uses.
 *
 * The CLI keys its records by the account scope hash. A host that has no
 * login yet has no such key, so the credential is stored under a local key of
 * our own — the runtime finds it by generation, not by name.
 */
function defaultProfileRecordKey(): string {
  return `com.minimax.mcode.oauth.prod.${resolveRegion()}\u0000local`;
}

/** Absolute path of the MiniMax Code auth profile. */
export function resolveAuthFile(profileDir?: string): string {
  const override = process.env.MINIMAX_CODE_AUTH_FILE;
  if (override) return override;
  const dir = profileDir || process.env.MINIMAX_CODE_PROFILE_DIR || join(homedir(), ".minimax");
  // The account region decides both where the profile lives and which account
  // endpoint refreshes the token: a CN account has no `en` profile.
  return join(dir, "auth", "prod", resolveRegion(), "mcode-public", "auth.json");
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
/**
 * Read the generation the CLI keeps in its own state file.
 *
 * The CLI bumps that counter on every refresh of its own, so it can be ahead
 * of the generation stored in the credential record. Whoever writes the record
 * has to respect the higher of the two: a generation that goes backwards makes
 * the CLI treat the session as expired ("Sign in to MiniMax to use Agent
 * features") even though the credential is fresh.
 */
export async function readStateGeneration(path: string): Promise<number | null> {
  try {
    const state = asRecord(JSON.parse(await readFile(join(dirname(path), "auth-state.json"), "utf8")));
    return typeof state.generation === "number" ? state.generation : null;
  } catch {
    return null;
  }
}

/**
 * The generation to store for a rotated credential: one above the highest
 * generation any writer of this store has used.
 */
async function nextGeneration(path: string, current: number): Promise<number> {
  const stateGeneration = await readStateGeneration(path);
  const recordGeneration = await readRecordGeneration(path);
  return Math.max(current, stateGeneration ?? 0, recordGeneration ?? 0) + 1;
}

/**
 * The highest generation any record of the profile carries.
 *
 * The CLI writes the same file on its own refresh, so the record in the file
 * can be ahead of the generation a caller read a moment ago. Whoever writes
 * the record has to raise the generation above that one too — a generation
 * that goes backwards makes the CLI treat the session as expired.
 */
async function readRecordGeneration(path: string): Promise<number | null> {
  try {
    const doc = asRecord(JSON.parse(await readFile(path, "utf8")));
    const records = asRecord(doc.records);
    let highest = 0;
    for (const raw of Object.values(records)) {
      const generation = Number(asRecord(raw).generation ?? 0) || 0;
      if (generation > highest) highest = generation;
    }
    return highest || null;
  } catch {
    return null;
  }
}

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
  // Never move the CLI's own counter backwards.
  state.generation = Math.max(state.generation, profile.generation);
  state.expiresAtMs = profile.expiresAtMs;
  state.status = "authenticated";
  const tmp = `${statePath}.tmp`;
  await writeFile(tmp, `${JSON.stringify(state, null, 2)}\n`, { mode: 0o600 });
  await rename(tmp, statePath);
  await chmod(statePath, 0o600).catch(() => undefined);
}

/** Persist a refreshed token back into the MiniMax Code auth profile. */
async function writeAuthProfile(path: string, profile: MinimaxAuthProfile): Promise<void> {
  const doc = await readProfileDocument(path);
  const records = asRecord(doc.records);
  // Write the credential back into the record it came from: the profile can
  // hold several accounts, and refreshing one of them must not touch another.
  const key = profile.recordKey || Object.keys(records)[0] || "";
  if (!key) return;
  const record = asRecord(records[key]);
  record.accessToken = profile.accessToken;
  if (profile.refreshToken) record.refreshToken = profile.refreshToken;
  record.expiresAtMs = profile.expiresAtMs;
  record.generation = profile.generation;
  if (!record.clientId) record.clientId = profile.clientId;
  if (!Array.isArray(record.scopes)) record.scopes = profile.scopes;
  if (!record.audience) record.audience = profile.audience;
  records[key] = record;
  doc.records = records;
  // The dashboard sign-in can be the first MiniMax Code login on a host, so
  // the directory of the profile may not exist yet.
  await mkdir(dirname(path), { recursive: true }).catch(() => undefined);
  const tmp = `${path}.tmp`;
  await writeFile(tmp, `${JSON.stringify(doc, null, 2)}\n`, { mode: 0o600 });
  await rename(tmp, path);
  await chmod(path, 0o600).catch(() => undefined);
}

export interface PersistCredentialOptions {
  accessToken: string;
  refreshToken?: string;
  /** Absolute expiry of the access token in milliseconds since the epoch. */
  expiresAtMs?: number;
  clientId?: string;
  scopes?: string[];
  audience?: string;
  path?: string;
}

/**
 * One writer at a time per profile file.
 *
 * The generation of a record is read and written in two steps, and the CLI
 * writes the same file on its own refresh. Two writers that read the same
 * generation and write it back leave one generation for two credentials — and
 * the CLI, which keeps its own counter, treats the older one as expired.
 */
const profileWriteLocks = new Map<string, Promise<unknown>>();

function withProfileWriteLock<T>(path: string, task: () => Promise<T>): Promise<T> {
  const previous = profileWriteLocks.get(path) ?? Promise.resolve();
  const result = previous.then(task, task);
  profileWriteLocks.set(
    path,
    result.then(
      () => undefined,
      () => undefined
    )
  );
  return result;
}

/**
 * The profile document, or an empty one when the host has no MiniMax Code
 * login yet.
 *
 * A missing file is not an error: the dashboard sign-in is one of the ways to
 * put the first credential on a host. A file that exists but cannot be parsed
 * is an error — overwriting it would throw away a working profile.
 */
async function readProfileDocument(path: string): Promise<JsonRecord> {
  let raw: string;
  try {
    raw = await readFile(path, "utf8");
  } catch (error) {
    if ((error as { code?: string } | null)?.code === "ENOENT") return { records: {} };
    throw error;
  }
  const doc = asRecord(JSON.parse(raw));
  if (!doc.records) doc.records = {};
  return doc;
}

/**
 * The record the runtime reads.
 *
 * The profile holds one record per account identity, and the runtime uses the
 * newest generation (or the record an operator pinned). A credential written
 * into any other record is a credential the runtime never sees: the dashboard
 * would show a signed-in account while the agent keeps using the old one.
 */
function resolveTargetRecordKey(records: JsonRecord): string {
  const explicit = (process.env.MINIMAX_CODE_AUTH_RECORD || "").trim();
  if (explicit) {
    if (!(explicit in records)) {
      throw new Error(
        `MINIMAX_CODE_AUTH_RECORD=${explicit} is not a record of the MiniMax Code profile`
      );
    }
    return explicit;
  }
  const entries = Object.entries(records)
    .map(([key, raw]) => {
      const record = asRecord(raw);
      return {
        key,
        generation: Number(record.generation ?? 0) || 0,
        expiresAtMs: Number(record.expiresAtMs ?? 0) || 0,
        hasAccessToken: asString(record.accessToken) !== "",
      };
    })
    .sort(
      (a, b) =>
        b.generation - a.generation ||
        b.expiresAtMs - a.expiresAtMs ||
        Number(b.hasAccessToken) - Number(a.hasAccessToken)
    );
  const usable = entries.find((entry) => entry.hasAccessToken);
  return (usable ?? entries[0])?.key || defaultProfileRecordKey();
}

/**
 * Store a credential that was obtained outside the CLI — for example through
 * the dashboard's device-code flow — in the MiniMax Code profile, so the CLI
 * and the local agent pick it up on their next session.
 *
 * The profile belongs to the MiniMax Code application, so the write follows
 * its rules: the credential goes into the record the runtime reads, the
 * record's generation is raised above every generation in use and the CLI's
 * state file is marked as authenticated.
 */
export async function persistProfileCredential(
  options: PersistCredentialOptions
): Promise<MinimaxAuthProfile> {
  const path = options.path || resolveAuthFile();
  return withProfileWriteLock(path, async () => {
    const doc = await readProfileDocument(path);
    const records = asRecord(doc.records);
    const key = resolveTargetRecordKey(records);
    const record = asRecord(records[key]);
    const generation = await nextGeneration(path, Number(record.generation ?? 0) || 0);
    const profile: MinimaxAuthProfile = {
      accessToken: options.accessToken,
      refreshToken: options.refreshToken,
      clientId: options.clientId || asString(record.clientId) || "mcode-public",
      scopes:
        options.scopes ??
        (Array.isArray(record.scopes) ? record.scopes.map(asString) : ["agent.default"]),
      audience: options.audience || asString(record.audience) || "agent-backend",
      expiresAtMs: options.expiresAtMs ?? Date.now() + 3600 * 1000,
      generation,
      path,
      recordKey: key,
    };
    await writeAuthProfile(path, profile);
    await writeAuthState(path, profile).catch(() => undefined);
    return profile;
  });
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
  const base = resolveMinimaxCodeAccountBase(region);
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
  const updated: MinimaxAuthProfile = await withProfileWriteLock(profile.path, async () => {
    const rotated: MinimaxAuthProfile = {
      ...profile,
      accessToken,
      refreshToken: asString(data.refresh_token) || profile.refreshToken,
      expiresAtMs: Date.now() + (expiresIn > 0 ? expiresIn : 3600) * 1000,
      // The generation is read inside the write lock: a dashboard sign-in
      // that rotated the profile a moment ago has to be part of the number
      // this write is compared against.
      generation: await nextGeneration(profile.path, profile.generation),
    };
    try {
      await writeAuthProfile(profile.path, rotated);
    } catch {
      // A read-only profile must not break the request: the fresh token still works.
    }
    try {
      await writeAuthState(profile.path, rotated);
    } catch {
      // The CLI would read a stale state file as an expired session.
    }
    return rotated;
  });
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

/**
 * The gateway answered with an HTTP status the caller has to see.
 *
 * The status of the upstream answer decides what the runtime does with the
 * failure. A 4xx is a property of the request, a 5xx is a property of the
 * gateway. Turning both into one opaque error loses that distinction: a
 * request-scoped refusal that arrives as a 502 is recorded as a model outage
 * and takes the model out of every combo for minutes.
 */
export class GatewayStatusError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "GatewayStatusError";
    this.status = status;
  }
}

/** The statuses the gateway transport retries: a quota or an outage. */
function isRetryableGatewayStatus(status: number): boolean {
  return status === 429 || status >= 500;
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
        const error = new GatewayStatusError(
          response.status,
          `MiniMax gateway error ${response.status}${detail ? `: ${detail.slice(0, 300)}` : ""}`
        );
        if (isRetryableGatewayStatus(response.status)) {
          lastError = error;
          continue;
        }
        throw error;
      }
      return response;
    } catch (error) {
      if (error instanceof GatewayAuthError) throw error;
      // A 4xx that is not a quota is a property of the request: retrying it
      // spends the same answer again.
      if (error instanceof GatewayStatusError && !isRetryableGatewayStatus(error.status)) {
        throw error;
      }
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
  // The token count depends on the script: CJK is close to one token per
  // character, Cyrillic runs at about two chars per token. Counting
  // everything as one third of a character under-estimates a Russian or
  // Chinese payload by a factor of two to three — the estimate has to stay on
  // the pessimistic side of the real count.
  let wide = 0;
  let cyrillic = 0;
  for (const char of text) {
    const code = char.codePointAt(0) ?? 0;
    if (
      (code >= 0x3000 && code <= 0x9fff) || // CJK, Hiragana, Katakana
      (code >= 0xac00 && code <= 0xd7af) || // Hangul
      (code >= 0xf900 && code <= 0xfaff) // CJK compatibility ideographs
    ) {
      wide += 1;
      continue;
    }
    if (
      (code >= 0x0400 && code <= 0x04ff) || // Cyrillic
      (code >= 0x0500 && code <= 0x052f) // Cyrillic supplement
    ) {
      cyrillic += 1;
    }
  }
  const latin = text.length - wide - cyrillic;
  return (
    Math.ceil(wide / WIDE_CHARS_PER_TOKEN) +
    Math.ceil(cyrillic / CYRILLIC_CHARS_PER_TOKEN) +
    Math.ceil(latin / LATIN_CHARS_PER_TOKEN)
  );
}

/**
 * The input ceiling of the managed gateway transport.
 *
 * `MINIMAX_CODE_MAX_INPUT_TOKENS` overrides the default for a deployment
 * whose gateway accepts more. A value that is not a positive number falls
 * back to the default instead of disabling the guard.
 */
export function resolveGatewayInputLimit(): number {
  const raw = Number(process.env.MINIMAX_CODE_MAX_INPUT_TOKENS);
  if (Number.isFinite(raw) && raw > 0) return Math.floor(raw);
  return DEFAULT_MAX_INPUT_TOKENS;
}

/**
 * A payload whose estimated input size is above the ceiling.
 *
 * Returned as a plain object so the caller can turn it into a 413 response
 * without going through the gateway at all. The refusal is request-scoped:
 * it says nothing about the health of the model, so it must not be able to
 * lock the model out of the fallbacks.
 */
export function isGatewayPayloadOversized(payload: JsonRecord): boolean {
  return estimateGatewayInputTokens(payload) > resolveGatewayInputLimit();
}

// Pure wire translation for the opencode-server executor
// (executors/opencodeServer.ts): OpenAI chat/Responses requests in, opencode
// session/parts out, and the opencode events/parts back into OpenAI chat or
// Responses payloads and SSE frames. Nothing here does I/O, so every piece can be
// tested without a fake server.
import { randomUUID } from "node:crypto";
import { join } from "node:path";

import type {
  EventLike,
  EventProperties,
  OpencodeMessageInfo,
  OpencodePart,
} from "./opencodeServerEventBus.ts";
import { isForwardableFileUrl } from "./opencodeServerSafety.ts";

export type OpencodeServerModel = {
  providerID: string;
  modelID: string;
  name: string;
  isFree: boolean;
  contextLength: number;
  outputLimit: number;
  toolCalling: boolean;
  reasoning: boolean;
  image: boolean;
  synthetic?: boolean;
};

export type OpencodeUsage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  prompt_tokens_details: { cached_tokens: number };
  completion_tokens_details: { reasoning_tokens: number };
};

export type ToolCall = {
  id: string;
  type: "function";
  function: { name: string; arguments: string };
};

export type FilePart = { url: string; mime: string };

export type Turn = { role: string; text: string; files: FilePart[] };

export type NormalizedTools = {
  tools: Array<{ name: string; description: string; parameters: unknown }>;
  choice: unknown;
};

export type TurnResult = {
  info: OpencodeMessageInfo;
  text: string;
  reasoning: string;
  error?: string | null;
};

export type WireFormat = "chat" | "responses";

const TOOL_PROTOCOL = [
  "You have access to the following functions, but you CANNOT execute them yourself; the caller executes them and sends the result back.",
  "If a function must be called, reply with a single JSON object and nothing else:",
  '{"tool_calls":[{"name":"<exact function name>","arguments":{...}}]}',
  "Rules: use exact function names; arguments must be a JSON object; emit no prose, no markdown fence, no extra keys.",
  "If no function is needed, answer normally as plain text.",
].join("\n");

const ROLE_LABEL: Record<string, string> = {
  user: "[user]",
  assistant: "[assistant]",
  tool: "[tool]",
  system: "[system]",
  developer: "[system]",
};

export function newId(prefix: string): string {
  return `${prefix}${randomUUID().replace(/-/g, "")}`;
}

function isReasoningType(type: unknown): boolean {
  return type === "reasoning" || type === "thinking";
}

// ── CLI binary lookup ────────────────────────────────────────────────────────

/**
 * Known install locations of the opencode CLI for a platform, in lookup order,
 * plus the bare command used when none of them exists (resolved through PATH).
 * Mirrors executors/auggie.ts; the explicit OPENCODE_SERVER_BIN override is
 * handled by the caller.
 */
export function opencodeBinaryCandidates(
  platform: string,
  env: Record<string, string | undefined>
): { candidates: string[]; fallback: string } {
  const home = env.HOME || env.USERPROFILE || "";
  if (platform === "win32") {
    const localAppData = env.LOCALAPPDATA || "";
    return {
      candidates: [
        localAppData ? join(localAppData, "opencode", "bin", "opencode.exe") : "",
        join(home, "AppData", "Roaming", "npm", "opencode.cmd"),
        join(
          home,
          ".bun",
          "install",
          "global",
          "node_modules",
          "opencode-ai",
          "bin",
          "opencode.exe"
        ),
        join(home, ".bun", "bin", "opencode.exe"),
      ].filter(Boolean),
      fallback: "opencode.cmd",
    };
  }
  return {
    candidates: [
      join(home, ".bun", "bin", "opencode"),
      "/usr/local/bin/opencode",
      "/opt/homebrew/bin/opencode",
    ],
    fallback: "opencode",
  };
}

/** First candidate for which `exists` holds; a throwing probe just moves on. */
export function firstExistingPath(
  candidates: string[],
  exists: (candidate: string) => boolean
): string | null {
  for (const candidate of candidates) {
    try {
      if (exists(candidate)) return candidate;
    } catch {
      /* keep looking */
    }
  }
  return null;
}

// ── Model catalog (/config/providers) ────────────────────────────────────────

export type RawCatalogModel = Partial<OpencodeServerModel> & {
  cost?: Record<string, number>;
  limit?: Record<string, number>;
  capabilities?: Record<string, unknown>;
};

export type CatalogPayload = {
  providers?: Array<{ id: string; models?: Record<string, RawCatalogModel> }>;
  default?: Record<string, string>;
};

function isFreeModel(cost: Record<string, number> | undefined): boolean {
  return Number(cost?.input ?? 0) === 0 && Number(cost?.output ?? 0) === 0;
}

function modelLimits(limit: Record<string, number> | undefined): {
  contextLength: number;
  outputLimit: number;
} {
  return {
    contextLength: Number(limit?.context ?? 0),
    outputLimit: Number(limit?.output ?? 0),
  };
}

function modelCapabilities(capabilities: Record<string, unknown> | undefined): {
  toolCalling: boolean;
  reasoning: boolean;
  image: boolean;
} {
  return {
    toolCalling: Boolean(capabilities?.toolcall),
    reasoning: Boolean(capabilities?.reasoning),
    image: Boolean((capabilities?.input as { image?: boolean } | undefined)?.image),
  };
}

export function catalogModelFromRaw(
  providerID: string,
  modelID: string,
  raw: RawCatalogModel | undefined
): OpencodeServerModel {
  return {
    providerID,
    modelID,
    name: raw?.name || modelID,
    isFree: isFreeModel(raw?.cost),
    ...modelLimits(raw?.limit),
    ...modelCapabilities(raw?.capabilities),
  };
}

function pickDefaultProvider(defaults: Record<string, string> | undefined): string {
  if (defaults?.opencode) return "opencode";
  return Object.keys(defaults || {})[0] || "opencode";
}

/** Indexes /config/providers by bare model id; the first provider listing a model wins. */
export function parseCatalog(payload: CatalogPayload | null | undefined): {
  byModel: Map<string, OpencodeServerModel>;
  defaultProvider: string;
} {
  const byModel = new Map<string, OpencodeServerModel>();
  for (const provider of payload?.providers || []) {
    for (const [modelID, raw] of Object.entries(provider.models || {})) {
      if (!byModel.has(modelID))
        byModel.set(modelID, catalogModelFromRaw(provider.id, modelID, raw));
    }
  }
  return { byModel, defaultProvider: pickDefaultProvider(payload?.default) };
}

// ── Request: OpenAI messages → opencode parts ────────────────────────────────

export function textOf(content: unknown): string {
  if (content == null) return "";
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (!part || typeof part !== "object") return "";
        const type = (part as { type?: string }).type;
        if (type !== "text" && type !== "input_text" && type !== "output_text") return "";
        return String((part as { text?: unknown }).text || "");
      })
      .filter(Boolean)
      .join("\n");
  }
  if (typeof content === "object" && typeof (content as { text?: unknown }).text === "string") {
    return String((content as { text: string }).text);
  }
  return "";
}

export function mimeFromUrl(url: string): string {
  const dataMatch = /^data:([^;,]+)/.exec(url);
  if (dataMatch) return dataMatch[1];
  const ext = url.split("?")[0].split(".").pop()?.toLowerCase();
  const map: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    webp: "image/webp",
    pdf: "application/pdf",
  };
  return map[ext || ""] || "application/octet-stream";
}

function mimeExtension(mime: string): string {
  const map: Record<string, string> = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/gif": "gif",
    "image/webp": "webp",
    "application/pdf": "pdf",
  };
  return map[mime] || "bin";
}

type PartRecord = Record<string, unknown>;

// Only https/data URLs on public hosts are forwarded (see opencodeServerSafety.ts);
// an explicit mime wins over the one guessed from the URL.
function forwardableFile(url: string | undefined, explicitMime: unknown): FilePart | null {
  if (!isForwardableFileUrl(url)) return null;
  return { url, mime: explicitMime ? String(explicitMime) : mimeFromUrl(url) };
}

function imageUrlFile(record: PartRecord): FilePart | null {
  const imageUrl = record.image_url as { url?: string; mime?: string } | string | undefined;
  if (typeof imageUrl === "string") return forwardableFile(imageUrl, undefined);
  return forwardableFile(imageUrl?.url, imageUrl?.mime);
}

function inputImageFile(record: PartRecord): FilePart | null {
  const imageUrl = record.image_url as string | { url?: string } | undefined;
  const url =
    typeof imageUrl === "string" ? imageUrl : imageUrl?.url || (record.url as string | undefined);
  return forwardableFile(url, record.mime_type);
}

function inputFileFile(record: PartRecord): FilePart | null {
  const url = (record.file_url as string | undefined) || (record.url as string | undefined);
  return forwardableFile(url, record.mime_type);
}

const FILE_PART_READERS = new Map<string, (record: PartRecord) => FilePart | null>([
  ["image_url", imageUrlFile],
  ["input_image", inputImageFile],
  ["input_file", inputFileFile],
]);

export function collectFiles(content: unknown): FilePart[] {
  if (!Array.isArray(content)) return [];
  const files: FilePart[] = [];
  for (const part of content) {
    if (!part || typeof part !== "object") continue;
    const record = part as PartRecord;
    const read = FILE_PART_READERS.get(String(record.type || ""));
    const file = read ? read(record) : null;
    if (file) files.push(file);
  }
  return files;
}

function rawMessages(body: Record<string, unknown>): unknown[] {
  if (Array.isArray(body.messages)) return body.messages as unknown[];
  if (Array.isArray(body.input)) return body.input as unknown[];
  if (typeof body.input === "string" && body.input.trim()) {
    return [{ role: "user", content: body.input }];
  }
  return [];
}

function toTurn(record: PartRecord, role: string, text: string): Turn {
  if (typeof record.type === "string" && record.type.startsWith("function_")) {
    return { role: "tool", text: `${String(record.name || "function")} -> ${text}`, files: [] };
  }
  return { role, text, files: collectFiles(record.content) };
}

// opencode's message API carries a single role per message, and the executor is
// stateless (the client replays history, exactly like the OpenAI API). Turns are
// therefore flattened into one user message with explicit role labels.
export function buildTurns(body: Record<string, unknown>): {
  systemChunks: string[];
  turns: Turn[];
} {
  const systemChunks: string[] = [];
  const turns: Turn[] = [];
  for (const message of rawMessages(body)) {
    if (!message || typeof message !== "object") continue;
    const record = message as PartRecord;
    const role = String(record.role || "user");
    const text = textOf(record.content);
    if (role === "system" || role === "developer") {
      if (text) systemChunks.push(text);
      continue;
    }
    turns.push(toTurn(record, role, text));
  }
  return { systemChunks, turns };
}

export function buildParts(turns: Turn[]): OpencodePart[] {
  const parts: OpencodePart[] = [];
  const lines: string[] = [];
  for (const turn of turns) {
    if (turn.text) lines.push(`${ROLE_LABEL[turn.role] || `[${turn.role}]`} ${turn.text}`);
    for (const file of turn.files) {
      if (!file.url) continue;
      parts.push({
        type: "file",
        mime: file.mime || "application/octet-stream",
        filename: `attachment.${mimeExtension(file.mime)}`,
        url: file.url,
      } as unknown as OpencodePart);
      lines.push(`${ROLE_LABEL[turn.role] || "[user]"} [attachment: ${file.mime || "file"}]`);
    }
  }
  const text = lines.join("\n\n").trim();
  if (text) parts.unshift({ type: "text", text });
  if (!parts.length) parts.push({ type: "text", text: "" });
  return parts;
}

// ── Tools ────────────────────────────────────────────────────────────────────

export function normalizeTools(body: Record<string, unknown>): NormalizedTools {
  const list = Array.isArray(body.tools) ? (body.tools as unknown[]) : [];
  const tools = list
    .map((entry) => {
      const record = (entry || {}) as Record<string, unknown>;
      const fn = (record.function || record) as Record<string, unknown>;
      if (!fn || typeof fn.name !== "string") return null;
      return {
        name: fn.name,
        description: String(fn.description || ""),
        parameters: fn.parameters ?? { type: "object", properties: {} },
      };
    })
    .filter(
      (tool): tool is { name: string; description: string; parameters: unknown } => tool !== null
    );

  let choice: unknown = body.tool_choice;
  if (choice && typeof choice === "object") {
    const record = choice as Record<string, unknown>;
    if (record.type === "function") {
      const fn = record.function as Record<string, unknown> | undefined;
      choice = { type: "function", name: fn?.name || record.name };
    } else {
      choice = record.type || null;
    }
  }
  return { tools, choice: choice ?? "auto" };
}

export function toolInstruction({ tools, choice }: NormalizedTools): string {
  if (!tools.length || choice === "none") return "";
  const listing = tools.map((tool) => `- ${tool.name}: ${tool.description}`).join("\n");
  let head = TOOL_PROTOCOL;
  if (choice === "required") head += "\nYou MUST reply with the tool_calls JSON object.";
  if (choice && typeof choice === "object") {
    const named = choice as { type?: string; name?: string };
    if (named.type === "function" && named.name) {
      head += `\nYou MUST call exactly "${named.name}" and nothing else.`;
    }
  }
  return `${head}\n\nAvailable functions:\n${listing}`;
}

type RawToolCall = { name?: string; arguments?: unknown };

/** The `{...}` object of a reply, unwrapped from a ```json fence when present. */
function extractEnvelope(text: string): { tool_calls?: RawToolCall[] } | null {
  const trimmed = text.trim();
  const fenced = /```(?:json)?\s*([\s\S]*?)```/.exec(trimmed);
  const candidate = (fenced ? fenced[1] : trimmed).trim();
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  try {
    return JSON.parse(candidate.slice(start, end + 1));
  } catch {
    return null;
  }
}

function toToolCall(call: RawToolCall | null, allowed: Set<string>): ToolCall | null {
  const name = call && typeof call === "object" ? call.name : null;
  if (!name || (allowed.size > 0 && !allowed.has(name))) return null;
  const args = call.arguments;
  return {
    id: newId("call_"),
    type: "function",
    function: {
      name: String(name),
      arguments: typeof args === "string" ? args : JSON.stringify(args ?? {}),
    },
  };
}

// The opencode server is agentic: it would execute the tool itself and only return
// prose. That breaks OpenAI semantics, where the client owns tool execution, so
// tools are surfaced as an instruction and the envelope is translated back into
// OpenAI tool_calls. One unknown or nameless call rejects the whole envelope.
export function parseToolEnvelope(
  text: string,
  tools: NormalizedTools["tools"]
): ToolCall[] | null {
  if (!text) return null;
  const parsed = extractEnvelope(text);
  const calls = Array.isArray(parsed?.tool_calls) ? parsed.tool_calls : null;
  if (!calls || !calls.length) return null;
  const allowed = new Set(tools.map((tool) => tool.name));
  const out: ToolCall[] = [];
  for (const call of calls) {
    const toolCall = toToolCall(call, allowed);
    if (!toolCall) return null;
    out.push(toolCall);
  }
  return out;
}

// ── Response: opencode turn → OpenAI chat / Responses ────────────────────────

export function usageFromTokens(tokens: OpencodeMessageInfo["tokens"]): OpencodeUsage {
  const input = Number(tokens?.input ?? 0);
  const output = Number(tokens?.output ?? 0);
  const reasoning = Number(tokens?.reasoning ?? 0);
  const cacheRead = Number(tokens?.cache?.read ?? 0);
  return {
    prompt_tokens: input + cacheRead,
    completion_tokens: output,
    total_tokens: input + output + reasoning + cacheRead,
    prompt_tokens_details: { cached_tokens: cacheRead },
    completion_tokens_details: { reasoning_tokens: reasoning },
  };
}

export function finishReason(info: OpencodeMessageInfo | null, hasToolCalls: boolean): string {
  if (hasToolCalls) return "tool_calls";
  const finish = String(info?.finish || "stop");
  if (finish === "length" || finish === "max_tokens") return "length";
  return "stop";
}

export function sseLine(payload: unknown): string {
  return `data: ${JSON.stringify(payload)}\n\n`;
}

export function chunkEnvelope(args: {
  id: string;
  created: number;
  model: string;
  delta: Record<string, unknown>;
  finishReason?: string | null;
}): Record<string, unknown> {
  return {
    id: args.id,
    object: "chat.completion.chunk",
    created: args.created,
    model: args.model,
    choices: [{ index: 0, delta: args.delta, finish_reason: args.finishReason ?? null }],
  };
}

/** Result of a blocking `POST /session/:id/message` turn. */
export function turnResultFromParts(
  info: OpencodeMessageInfo | undefined,
  parts: OpencodePart[] | undefined
): TurnResult {
  const list = parts || [];
  const joinText = (keep: (part: OpencodePart) => boolean): string =>
    list
      .filter(keep)
      .map((part) => part.text || "")
      .join("");
  return {
    info: info || {},
    text: joinText((part) => part.type === "text"),
    reasoning: joinText((part) => isReasoningType(part.type)),
  };
}

export function buildChatCompletion(args: {
  id: string;
  created: number;
  model: string;
  text: string;
  reasoning: string;
  toolCalls: ToolCall[] | null;
  info: OpencodeMessageInfo | null;
}): Record<string, unknown> {
  const message: Record<string, unknown> = { role: "assistant", content: args.text || null };
  if (args.reasoning) message.reasoning_content = args.reasoning;
  if (args.toolCalls && args.toolCalls.length) message.tool_calls = args.toolCalls;
  return {
    id: args.id,
    object: "chat.completion",
    created: args.created,
    model: args.model,
    choices: [
      {
        index: 0,
        message,
        finish_reason: finishReason(args.info, !!(args.toolCalls && args.toolCalls.length)),
      },
    ],
    usage: usageFromTokens(args.info?.tokens),
  };
}

export function buildResponsesPayload(args: {
  id: string;
  created: number;
  model: string;
  text: string;
  toolCalls: ToolCall[] | null;
  info: OpencodeMessageInfo | null;
}): Record<string, unknown> {
  const usage = usageFromTokens(args.info?.tokens);
  const output: Array<Record<string, unknown>> = [];
  if (args.text) {
    output.push({
      type: "message",
      id: newId("msg_"),
      role: "assistant",
      status: "completed",
      content: [{ type: "output_text", text: args.text, annotations: [] }],
    });
  }
  for (const call of args.toolCalls || []) {
    output.push({
      type: "function_call",
      id: newId("fc_"),
      call_id: call.id,
      name: call.function.name,
      arguments: call.function.arguments,
      status: "completed",
    });
  }
  return {
    id: args.id,
    object: "response",
    created_at: args.created,
    status: "completed",
    model: args.model,
    output,
    output_text: args.text || "",
    parallel_tool_calls: false,
    tool_choice: args.toolCalls && args.toolCalls.length ? "required" : "none",
    usage: {
      input_tokens: usage.prompt_tokens,
      output_tokens: usage.completion_tokens,
      total_tokens: usage.total_tokens,
      output_tokens_details: { reasoning_tokens: usage.completion_tokens_details.reasoning_tokens },
      input_tokens_details: { cached_tokens: usage.prompt_tokens_details.cached_tokens },
    },
  };
}

export function detectWireFormat(
  body: Record<string, unknown>,
  clientHeaders?: Record<string, string> | null
): WireFormat {
  const explicit =
    clientHeaders?.["x-omniroute-opencode-format"] || clientHeaders?.["x-opencode-wire"];
  if (explicit) return String(explicit).includes("response") ? "responses" : "chat";
  if (Array.isArray(body.input) && !Array.isArray(body.messages)) return "responses";
  if (typeof body.input === "string" && !body.messages) return "responses";
  return "chat";
}

// ── Streaming turn: /event frames → text/reasoning deltas ────────────────────

/**
 * What a `message.part.updated` frame adds on top of what was already forwarded
 * for that part. Models that never emit `message.part.delta` still stream: the
 * growing part.text is diffed against what was sent. `null` = nothing new;
 * `chunk: null` = record the text but forward nothing; `countsAsDelta: false` =
 * the part was rewritten (not appended), so it is forwarded but kept out of the
 * delta transcript.
 */
export function partTextEmission(
  seen: string | undefined,
  text: string
): { chunk: string | null; countsAsDelta: boolean } | null {
  if (seen === undefined) return { chunk: text || null, countsAsDelta: true };
  if (text.startsWith(seen) && text.length > seen.length) {
    return { chunk: text.slice(seen.length), countsAsDelta: true };
  }
  if (text !== seen) return { chunk: text, countsAsDelta: false };
  return null;
}

export type TurnSinks = {
  onText?: (delta: string) => void;
  onReasoning?: (delta: string) => void;
};

function appendTo(map: Map<string, string>, key: string, delta: string): void {
  map.set(key, (map.get(key) || "") + delta);
}

/**
 * Folds one session's /event frames into the assistant's text and reasoning,
 * forwarding each new piece to the sinks as it arrives. Frames of the echoed user
 * prompt are ignored: only parts of messages announced as `assistant` count.
 */
export class OpencodeTurnCollector {
  private readonly textParts = new Map<string, string>();
  private readonly reasoningParts = new Map<string, string>();
  private readonly emittedText = new Map<string, string>();
  private readonly emittedReasoning = new Map<string, string>();
  private readonly deltaText: string[] = [];
  private readonly assistantMessages = new Set<string>();
  private info: OpencodeMessageInfo = {};

  constructor(private readonly sinks: TurnSinks = {}) {}

  handle(event: EventLike): void {
    const properties = (event?.properties || {}) as EventProperties;
    if (event.type === "message.updated") this.onMessageUpdated(properties);
    else if (event.type === "message.part.delta") this.onPartDelta(properties);
    else if (event.type === "message.part.updated") this.onPartUpdated(properties);
  }

  result(): TurnResult {
    const joined = (map: Map<string, string>): string =>
      [...map.values()].filter((value) => value.length > 0).join("");
    return {
      info: this.info,
      text: joined(this.textParts) || this.deltaText.join(""),
      reasoning: joined(this.reasoningParts),
    };
  }

  private isAssistant(messageID?: string): boolean {
    return !!messageID && this.assistantMessages.size > 0 && this.assistantMessages.has(messageID);
  }

  private onMessageUpdated(properties: EventProperties): void {
    const messageInfo = properties.info as OpencodeMessageInfo | undefined;
    if (messageInfo?.role !== "assistant") return;
    if (messageInfo.id) this.assistantMessages.add(messageInfo.id);
    if (messageInfo.sessionID) this.info = messageInfo;
  }

  private onPartDelta(properties: EventProperties): void {
    const delta = properties.delta;
    if (typeof delta !== "string" || !delta) return;
    if (!this.isAssistant(properties.messageID)) return;
    const field = String(properties.field || "");
    const partId = String(properties.partID || "__stream__");
    if (field === "text") {
      appendTo(this.emittedText, partId, delta);
      this.deltaText.push(delta);
      this.sinks.onText?.(delta);
    } else if (isReasoningType(field)) {
      appendTo(this.emittedReasoning, partId, delta);
      this.sinks.onReasoning?.(delta);
    }
  }

  private onPartUpdated(properties: EventProperties): void {
    const part = (properties.part || {}) as OpencodePart;
    if (!this.isAssistant(part.messageID)) return;
    if (typeof part.text !== "string") return;
    const isReasoning = isReasoningType(part.type);
    const key = String(part.id || part.messageID || "__stream__");
    (isReasoning ? this.reasoningParts : this.textParts).set(key, part.text);
    const emitted = isReasoning ? this.emittedReasoning : this.emittedText;
    const emission = partTextEmission(emitted.get(key), part.text);
    if (!emission) return;
    emitted.set(key, part.text);
    if (emission.chunk === null) return;
    if (emission.countsAsDelta && !isReasoning) this.deltaText.push(emission.chunk);
    (isReasoning ? this.sinks.onReasoning : this.sinks.onText)?.(emission.chunk);
  }
}

// ── Streaming response: SSE frames per wire format ───────────────────────────

export type StreamIdentity = { id: string; created: number; model: string };

export type StreamOutcome = {
  text: string;
  toolCalls: ToolCall[] | null;
  info: OpencodeMessageInfo | null;
};

export type StreamFrames = {
  created: () => string;
  text: (delta: string) => string;
  reasoning: (delta: string) => string;
  toolCall: (call: ToolCall) => string;
  completed: (outcome: StreamOutcome) => string;
  error: (error: unknown) => string;
};

function responsesFrames({ id, created, model }: StreamIdentity): StreamFrames {
  return {
    created: () =>
      sseLine({
        type: "response.created",
        response: {
          id,
          object: "response",
          created_at: created,
          status: "in_progress",
          model,
          output: [],
        },
      }),
    text: (delta) =>
      sseLine({ type: "response.output_text.delta", item_id: id, output_index: 0, delta }),
    reasoning: (delta) =>
      sseLine({ type: "response.reasoning_summary_text.delta", item_id: id, delta }),
    toolCall: (call) =>
      sseLine({
        type: "response.output_item.done",
        output_index: 1,
        item: {
          type: "function_call",
          id: newId("fc_"),
          call_id: call.id,
          name: call.function.name,
          arguments: call.function.arguments,
          status: "completed",
        },
      }),
    completed: (outcome) =>
      sseLine({
        type: "response.completed",
        response: buildResponsesPayload({ id, created, model, ...outcome }),
      }),
    error: (error) => sseLine({ type: "error", error }),
  };
}

function chatFrames({ id, created, model }: StreamIdentity): StreamFrames {
  const chunk = (delta: Record<string, unknown>, reason?: string | null) =>
    chunkEnvelope({ id, created, model, delta, finishReason: reason });
  return {
    created: () => sseLine(chunk({ role: "assistant", content: "" })),
    text: (delta) => sseLine(chunk({ content: delta })),
    reasoning: (delta) => sseLine(chunk({ reasoning_content: delta })),
    toolCall: (call) =>
      sseLine(
        chunk({
          tool_calls: [
            {
              index: 0,
              id: call.id,
              type: "function",
              function: { name: call.function.name, arguments: call.function.arguments },
            },
          ],
        })
      ),
    completed: ({ toolCalls, info }) =>
      sseLine({
        ...chunk({}, finishReason(info, !!(toolCalls && toolCalls.length))),
        usage: usageFromTokens(info?.tokens),
      }),
    error: (error) => sseLine({ error }),
  };
}

export function createStreamFrames(wireFormat: WireFormat, identity: StreamIdentity): StreamFrames {
  return wireFormat === "responses" ? responsesFrames(identity) : chatFrames(identity);
}

/**
 * Frames that close a streamed turn. In tool mode the text deltas were held back
 * (the reply may be a tool_calls envelope, only knowable at the end), so plain
 * prose is sent here in one piece; then the tool calls, the completion frame with
 * usage, and the [DONE] terminator.
 */
export function finalStreamFrames(
  frames: StreamFrames,
  result: TurnResult,
  tools: NormalizedTools["tools"],
  toolMode: boolean
): string[] {
  const toolCalls = toolMode ? parseToolEnvelope(result.text, tools) : null;
  const text = toolCalls ? "" : result.text;
  const out: string[] = [];
  if (toolMode && !toolCalls && text) out.push(frames.text(text));
  for (const call of toolCalls || []) out.push(frames.toolCall(call));
  out.push(frames.completed({ text, toolCalls, info: result.info }));
  out.push("data: [DONE]\n\n");
  return out;
}

/** A ReadableStream plus an emit/close pair that become no-ops once the client leaves. */
export function createSseSink(): {
  stream: ReadableStream<Uint8Array>;
  emit: (text: string) => void;
  close: () => void;
} {
  const encoder = new TextEncoder();
  let controller: ReadableStreamDefaultController<Uint8Array> | null = null;
  let closed = false;
  const stream = new ReadableStream<Uint8Array>({
    start(c) {
      controller = c;
    },
    cancel() {
      closed = true;
      controller = null;
    },
  });
  return {
    stream,
    emit(text: string): void {
      if (closed || !text || !controller) return;
      try {
        controller.enqueue(encoder.encode(text));
      } catch {
        /* client already went away */
      }
    },
    close(): void {
      if (closed || !controller) return;
      closed = true;
      try {
        controller.close();
      } catch {
        /* already closed */
      }
    },
  };
}

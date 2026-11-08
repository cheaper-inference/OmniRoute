import { BaseExecutor, type ExecutorLog, type ProviderCredentials } from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";
import { getModelTargetFormat } from "../config/providerModels.ts";
import { isResponsesEndpointPath } from "../utils/responsesEndpoint.ts";
import { chatRequestToXaiResponses } from "@/lib/providers/xai/translators/openai-chat.ts";
import { capXaiRequestHistory } from "../services/xaiMessageCap.ts";
import { flattenNamespaceToolName } from "../translator/request/openai-responses/namespaceFlatten.ts";

type JsonRecord = Record<string, unknown>;

/**
 * xAI/Grok model ids (open-sse/config/providers/registry/xai/index.ts) that accept
 * a graduated `reasoning_effort`. Kept narrow and reconciled against the REAL
 * catalog rather than upstream's example ids (grok-4/grok-3 do not exist here):
 *   - grok-4.3                  — current-generation flagship, reasoning-capable.
 *   - grok-4.20-0309-reasoning  — explicit reasoning variant.
 *
 * grok-4.20-multi-agent-0309 is intentionally left unclassified (neither allow
 * nor deny): its reasoning support is not documented in the local catalog, so
 * we pass it through unchanged rather than guess.
 */
const REASONING_ALLOWED = ["grok-4.3", "grok-4.20-0309-reasoning"];

/**
 * Model ids that reject `reasoning_effort` outright:
 *   - grok-build-0.1                — build/tool-oriented model, no reasoning mode.
 *   - grok-4.20-0309-non-reasoning   — already encodes "no reasoning" in the id;
 *     forwarding reasoning_effort here would be redundant/rejected upstream.
 */
const REASONING_DENIED = ["grok-build-0.1", "grok-4.20-0309-non-reasoning"];

/** `-{level}` suffixes some clients append to a model id to select reasoning intensity. */
const EFFORT_SUFFIXES = ["low", "medium", "high", "xhigh"] as const;

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

/**
 * Tool `type` values xAI's native `/v1/responses` deserializer accepts. Anything
 * else makes xAI reject the WHOLE request with
 * `422 tools[N].type: unknown variant ...` (e.g. Codex CLI's MCP `namespace` groups).
 */
const XAI_RESPONSES_TOOL_TYPES: ReadonlySet<string> = new Set([
  "function",
  "web_search",
  "x_search",
  "image_generation",
  "collections_search",
  "file_search",
  "code_execution",
  "code_interpreter",
  "mcp",
  "shell",
  "tool_search",
]);

/** One Responses function tool `{type:"function", name, description?, parameters?, strict?}`. */
function toXaiFunctionTool(value: unknown, nameOverride?: string): JsonRecord | null {
  const tool = asRecord(value);
  if (!tool) return null;
  // Accept both the flat Responses shape and the nested Chat `{function:{...}}` shape.
  const fn = asRecord(tool.function) ?? tool;
  const rawName = typeof fn.name === "string" ? fn.name.trim() : "";
  const name = nameOverride ?? rawName;
  if (!name) return null;
  const out: JsonRecord = { type: "function", name };
  if (typeof fn.description === "string") out.description = fn.description;
  if (fn.parameters !== undefined) out.parameters = fn.parameters;
  if (typeof fn.strict === "boolean") out.strict = fn.strict;
  return out;
}

/**
 * Make a Responses `tools[]` array acceptable to xAI:
 *   - `namespace` groups (Codex MCP servers) are flattened into plain function tools
 *     with the `mcp__<server>__<tool>` qualified name (same scheme as the Chat path,
 *     which Codex still resolves for MCP calls);
 *   - nested Chat-shaped function tools are flattened;
 *   - `custom` (freeform) tools become a single-string-arg function tool;
 *   - any other type xAI does not know is dropped instead of failing the request.
 */
export function normalizeXaiResponsesTools(tools: unknown): unknown[] | undefined {
  if (!Array.isArray(tools)) return undefined;
  const out: unknown[] = [];
  const seen = new Set<string>();
  for (const value of tools) {
    const tool = asRecord(value);
    if (!tool) continue;
    for (const normalized of normalizeOneXaiResponsesTool(tool)) {
      appendXaiTool(out, seen, normalized);
    }
  }
  return out;
}

/** A normalized tool, tagged so function tools can be de-duplicated by name. */
type NormalizedXaiTool = { tool: JsonRecord; dedupeByName: boolean };

/** Append one normalized tool, keeping only the first function tool per name. */
function appendXaiTool(out: unknown[], seen: Set<string>, entry: NormalizedXaiTool): void {
  if (!entry.dedupeByName) {
    out.push(entry.tool);
    return;
  }
  const name = String(entry.tool.name);
  if (seen.has(name)) return;
  seen.add(name);
  out.push(entry.tool);
}

/** Wrap function tools (dropping nulls) for the name de-duplication in the caller. */
function asFunctionEntries(...tools: Array<JsonRecord | null>): NormalizedXaiTool[] {
  return tools
    .filter((tool): tool is JsonRecord => tool !== null)
    .map((tool) => ({
      tool,
      dedupeByName: true,
    }));
}

/** Normalize one Responses tool into zero or more tools xAI accepts. */
function normalizeOneXaiResponsesTool(tool: JsonRecord): NormalizedXaiTool[] {
  const type = typeof tool.type === "string" ? tool.type : "function";
  switch (type) {
    case "namespace":
      return asFunctionEntries(...flattenXaiNamespaceTool(tool));
    case "function":
      return asFunctionEntries(toXaiFunctionTool(tool));
    case "custom":
      return asFunctionEntries(toXaiCustomFunctionTool(tool));
    case "web_search":
      return [{ tool: toXaiWebSearchTool(tool), dedupeByName: false }];
    default:
      // Unsupported hosted tool type for xAI: drop it rather than 422 the request.
      return XAI_RESPONSES_TOOL_TYPES.has(type) ? [{ tool, dedupeByName: false }] : [];
  }
}

/** Flatten a Codex MCP `namespace` group into `mcp__<server>__<tool>` function tools. */
function flattenXaiNamespaceTool(tool: JsonRecord): Array<JsonRecord | null> {
  const nsName = typeof tool.name === "string" ? tool.name : "";
  const children = Array.isArray(tool.tools) ? tool.tools : [];
  return children.map((child) => {
    const childRecord = asRecord(child);
    if (!childRecord) return null;
    const childFn = asRecord(childRecord.function) ?? childRecord;
    const leaf = typeof childFn.name === "string" ? childFn.name.trim() : "";
    if (!leaf) return null;
    return toXaiFunctionTool(childRecord, flattenNamespaceToolName(nsName, leaf));
  });
}

/** A `custom` (freeform) tool becomes a function tool with a single string argument. */
function toXaiCustomFunctionTool(tool: JsonRecord): JsonRecord | null {
  const name = typeof tool.name === "string" ? tool.name.trim() : "";
  if (!name) return null;
  return {
    type: "function",
    name,
    ...(typeof tool.description === "string" ? { description: tool.description } : {}),
    parameters: {
      type: "object",
      properties: { input: { type: "string" } },
      required: ["input"],
    },
  };
}

/**
 * Make a Responses body's tools and input acceptable to xAI:
 *   - normalize `tools[]` (xAI rejects the whole request on any tool type it does not
 *     know, e.g. Codex's MCP `namespace` groups -> 422 `tools[N].type: unknown variant`);
 *   - drop `tool_choice` / `parallel_tool_calls` when no tools remain (Codex side
 *     requests send `tool_choice` with no tools; xAI rejects that with 400
 *     "A tool_choice was set on the request but no tools were specified");
 *   - map Chat-style content parts in `input` to Responses part types.
 */
function normalizeXaiResponsesBodyShape(out: JsonRecord): void {
  if (Array.isArray(out.tools)) {
    const tools = normalizeXaiResponsesTools(out.tools) ?? [];
    if (tools.length > 0) out.tools = tools;
    else delete out.tools;
  }
  if (!Array.isArray(out.tools) || out.tools.length === 0) {
    delete out.tool_choice;
    delete out.parallel_tool_calls;
  }
  if (Array.isArray(out.input)) out.input = normalizeXaiResponsesInput(out.input);
}

/**
 * OpenAI/Codex `web_search` carries arguments xAI rejects with
 * `400 Argument not supported: external_web_access`. Keep only what xAI understands.
 */
function toXaiWebSearchTool(tool: JsonRecord): JsonRecord {
  const out: JsonRecord = { ...tool };
  delete out.external_web_access;
  delete out.search_context_size;
  const filters = asRecord(out.filters);
  if (filters) {
    delete out.filters;
    if (Array.isArray(filters.allowed_domains) && out.allowed_domains === undefined) {
      out.allowed_domains = filters.allowed_domains;
    }
    if (Array.isArray(filters.blocked_domains) && out.excluded_domains === undefined) {
      out.excluded_domains = filters.blocked_domains;
    }
  }
  return out;
}

/**
 * xAI accepts only Responses content part types (`input_text`, `output_text`,
 * `input_image`, `input_file`, `refusal`); a Chat-style `text` / `image_url` part makes
 * it 422 the whole request (`content[0]: unknown content type "text"`).
 */
export function normalizeXaiResponsesInput(input: unknown): unknown {
  if (!Array.isArray(input)) return input;
  return input.map((value) => {
    const item = asRecord(value);
    if (!item || !Array.isArray(item.content)) return value;
    const textType = item.role === "assistant" ? "output_text" : "input_text";
    let changed = false;
    const content = item.content.map((partValue) => {
      const part = asRecord(partValue);
      if (!part) return partValue;
      if (part.type === "text") {
        changed = true;
        return { ...part, type: textType };
      }
      if (part.type === "image_url") {
        changed = true;
        const image = asRecord(part.image_url);
        return { type: "input_image", image_url: image ? image.url : part.image_url };
      }
      return partValue;
    });
    return changed ? { ...item, content } : value;
  });
}

/**
 * xAI/Grok executor (port of decolua/9router#2147).
 *
 * Some Grok clients select reasoning intensity via a `-{low,medium,high,xhigh}`
 * suffix on the model id (e.g. `grok-4.3-high`) rather than a native
 * `reasoning_effort` field — xAI itself does not recognize the suffixed id.
 * This executor:
 *   1. Parses and strips that suffix off the model id before the request
 *      reaches xAI, mapping it to `reasoning_effort` for allow-listed models.
 *   2. Strips any `reasoning_effort` for deny-listed models — including ids
 *      that already encode their reasoning state in the name (`-reasoning` /
 *      `-non-reasoning`), which must not be double-mutated by also stacking a
 *      `reasoning_effort` field on top of what the id already declares.
 *   3. Leaves unclassified models and bodies untouched otherwise.
 */
export class XaiExecutor extends BaseExecutor {
  constructor(provider = "xai") {
    super(provider, PROVIDERS[provider]);
  }

  buildUrl(
    model: string,
    _stream: boolean,
    _urlIndex = 0,
    credentials: ProviderCredentials | null = null
  ) {
    if (getModelTargetFormat(this.provider, model) === "openai-responses") {
      return this.config.responsesBaseUrl || this.config.baseUrl;
    }
    if (isResponsesEndpointPath(credentials?.requestEndpointPath)) {
      return this.config.responsesBaseUrl || this.config.baseUrl;
    }
    return this.config.baseUrl;
  }

  async refreshCredentials(
    credentials: ProviderCredentials,
    log?: ExecutorLog | null
  ): Promise<Partial<ProviderCredentials> | null> {
    if (this.provider !== "xai-oauth" || !credentials.refreshToken) return null;

    try {
      const response = await fetch(this.config.tokenUrl || "https://auth.x.ai/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          client_id: this.config.clientId || "",
          refresh_token: credentials.refreshToken,
        }),
      });

      if (!response.ok) {
        log?.warn?.("TOKEN_REFRESH", `xAI OAuth refresh failed with status ${response.status}`);
        return null;
      }

      const data = await response.json();
      if (!data.access_token) {
        log?.warn?.("TOKEN_REFRESH", "xAI OAuth refresh response omitted access_token");
        return null;
      }

      const expiresIn = Number(data.expires_in) || 21600;
      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token || credentials.refreshToken,
        expiresAt: new Date(Date.now() + expiresIn * 1000).toISOString(),
      };
    } catch (error) {
      log?.warn?.(
        "TOKEN_REFRESH",
        `xAI OAuth refresh error: ${error instanceof Error ? error.message : String(error)}`
      );
      return null;
    }
  }

  transformRequest(
    model: string,
    body: unknown,
    stream: boolean,
    credentials: ProviderCredentials
  ): unknown {
    const cleaned = super.transformRequest(model, body, stream, credentials);
    const record = asRecord(cleaned);
    if (!record) return cleaned;

    let out: JsonRecord = { ...record };
    const nativeXaiPassthrough = record._nativeXaiResponsesPassthrough === true;
    delete out._nativeXaiResponsesPassthrough;
    delete out._nativeCodexPassthrough;

    const useResponses =
      nativeXaiPassthrough ||
      getModelTargetFormat(this.provider, model) === "openai-responses" ||
      isResponsesEndpointPath(credentials?.requestEndpointPath);

    // #10165: chat/completions clients send messages + max_tokens; xAI /v1/responses
    // requires input + max_output_tokens. Convert at the executor edge so a missed
    // chatCore translation cannot ship a chat-shaped body to Responses.
    if (useResponses) {
      if (Array.isArray(out.messages) && out.input == null) {
        out = chatRequestToXaiResponses(out as never) as unknown as JsonRecord;
      } else {
        if (out.max_completion_tokens != null && out.max_output_tokens == null) {
          out.max_output_tokens = out.max_completion_tokens;
          delete out.max_completion_tokens;
        }
        if (out.max_tokens != null && out.max_output_tokens == null) {
          out.max_output_tokens = out.max_tokens;
          delete out.max_tokens;
        }
        if (out.response_format != null && out.text == null) {
          out.text = { format: out.response_format };
          delete out.response_format;
        }
      }
      normalizeXaiResponsesBodyShape(out);
      // Keep model id from the routed request when the translator left it empty.
      if (out.model == null && model) out.model = model;
      // After chat→Responses expansion, `input` is what xAI counts toward 800.
      return capXaiRequestHistory(out);
    }

    let modelId = typeof out.model === "string" ? out.model : model;

    let suffixEffort: string | null = null;
    for (const level of EFFORT_SUFFIXES) {
      const suffix = `-${level}`;
      if (modelId.endsWith(suffix)) {
        suffixEffort = level;
        modelId = modelId.slice(0, -suffix.length);
        break;
      }
    }
    if (suffixEffort && typeof out.model === "string") {
      out.model = modelId;
    }

    const isDenied = REASONING_DENIED.some((id) => modelId.includes(id));
    const isAllowed = REASONING_ALLOWED.some((id) => modelId.includes(id));

    if (isDenied) {
      delete out.reasoning_effort;
    } else if (isAllowed) {
      const effort = suffixEffort || out.reasoning_effort;
      if (effort) out.reasoning_effort = effort;
    }

    return capXaiRequestHistory(out);
  }
}

export default XaiExecutor;

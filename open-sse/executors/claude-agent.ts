/**
 * Claude Agent executor (provider id: "claude-agent").
 *
 * LLM proxy over the bundled @anthropic-ai/claude-agent-sdk: the vendored
 * Claude Code CLI authenticates with the host's existing Claude Code login,
 * so OmniRoute never handles an Anthropic credential or calls the API
 * directly. Every API call maps to exactly ONE CLI turn (`maxTurns: 1`,
 * built-in CLI tools disabled, `permissionMode: "dontAsk"`): the calling
 * client owns the tool loop, so the single assistant turn — including any
 * `tool_use` blocks — must be handed straight back to the client.
 *
 * Client-declared tools are taught to the model through an in-process SDK
 * MCP server (`mcp__omniroute__<name>` on the CLI side); the prefix is mapped
 * back to the client's original tool names on output. Tool execution is
 * blocked (the client executes tools), and the one-turn cap stops the CLI
 * before it could retry after a denial.
 *
 * Request bodies arrive already translated to Anthropic (Claude) format;
 * responses are emitted as Anthropic messages / Anthropic SSE event streams,
 * so the existing Claude-format translators handle client-side conversion.
 */
import type { ExecutorExecuteResult, ExecuteInput, ProviderCredentials } from "./base.ts";
import { BaseExecutor } from "./base.ts";
import { buildErrorBody, sanitizeErrorMessage } from "../utils/error.ts";
import { resolveClaudeAgentSdk, resolveClaudeCodeExecutable } from "../utils/claudeAgentSdk.ts";
import {
  CLEAR_TOOL_USES_STRATEGY,
  CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES,
  CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS,
} from "../config/contextEditing.ts";
import { z } from "zod/v4";
import type {
  McpServerConfig,
  McpSdkServerConfigWithInstance,
  Options,
  SDKMessage,
  SDKUserMessage,
  SdkMcpToolDefinition,
} from "@anthropic-ai/claude-agent-sdk";

type SdkModule = NonNullable<Awaited<ReturnType<typeof resolveClaudeAgentSdk>>>;

const MCP_SERVER_NAME = "omniroute";
const MCP_TOOL_PREFIX = `mcp__${MCP_SERVER_NAME}__`;

type AnthropicBlock = Record<string, unknown>;
type AnthropicMessageParam = { role: string; content: unknown };
type AnthropicRequestBody = {
  model?: unknown;
  system?: unknown;
  messages?: unknown;
  tools?: unknown;
  thinking?: { budget_tokens?: unknown } | null;
  output_config?: { effort?: unknown } | null;
  context_management?: unknown;
};

const EFFORT_LEVELS = ["low", "medium", "high", "xhigh", "max"] as const;

function makeErrorResponse(status: number, message: string): Response {
  const body = buildErrorBody(status, message);
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

export function systemToPrompt(system: unknown): string | undefined {
  if (typeof system === "string") return system.trim() || undefined;
  const blocks = Array.isArray(system) ? system : null;
  if (!blocks) return undefined;
  const text = blocks
    .map((block) => {
      const record = asRecord(block);
      return typeof record?.text === "string" ? record.text : "";
    })
    .filter(Boolean)
    .join("\n");
  return text.trim() || undefined;
}

export function effortFrom(body: AnthropicRequestBody): Options["effort"] {
  const raw = asRecord(body.output_config)?.effort;
  return typeof raw === "string" && (EFFORT_LEVELS as readonly string[]).includes(raw)
    ? (raw as Options["effort"])
    : undefined;
}

export function sanitizeToolName(name: string): string {
  const cleaned = name.replace(/[^a-zA-Z0-9_-]/g, "_");
  return /^[a-zA-Z0-9_-]+$/.test(cleaned) ? cleaned : `${cleaned}_t`;
}

/**
 * Client tool JSON Schema -> MCP tool input shape. The SDK MCP server wants a
 * Zod raw shape (Record<string, ZodType>); JSON Schema -> Zod via zod/v4's
 * fromJSONSchema. Non-object or failed conversions degrade to a single opaque
 * value so the request keeps flowing.
 */
export function toToolShape(schema: unknown): Record<string, z.ZodType> {
  const record = asRecord(schema);
  if (!record) return {};
  try {
    const zodSchema = z.fromJSONSchema(record as Parameters<typeof z.fromJSONSchema>[0]);
    if (zodSchema instanceof z.ZodObject) return zodSchema.shape as Record<string, z.ZodType>;
    return { value: zodSchema };
  } catch {
    return { value: z.string() };
  }
}

function blockedToolHandler() {
  const content = [
    {
      type: "text" as const,
      text: "Tool execution is owned by the calling client; it handles this call itself.",
    },
  ];
  return Promise.resolve({ content, isError: true });
}

/**
 * Teach client-declared tools to the CLI through an in-process MCP server so
 * the model sees real schemas (a `tools: []` request alone cannot). Handlers
 * never execute: the client owns execution and `maxTurns: 1` stops the CLI
 * after the assistant turn regardless.
 */
export function buildClientTools(
  sdk: SdkModule,
  body: AnthropicRequestBody
): { config: McpSdkServerConfigWithInstance; rename: (name: string) => string } | null {
  const rawTools = Array.isArray(body.tools) ? body.tools : [];
  const tools: SdkMcpToolDefinition<Record<string, z.ZodType>>[] = [];
  const renameMap = new Map<string, string>();
  for (const raw of rawTools) {
    const tool = asRecord(raw);
    const name = typeof tool?.name === "string" ? tool.name : "";
    if (!name) continue;
    const safeName = sanitizeToolName(name);
    renameMap.set(safeName, name);
    const description = typeof tool?.description === "string" ? tool.description : "";
    tools.push(
      sdk.tool(safeName, description, toToolShape(tool?.input_schema), blockedToolHandler)
    );
  }
  if (!tools.length) return null;
  return {
    config: sdk.createSdkMcpServer({ name: MCP_SERVER_NAME, tools }),
    rename: (cliName) => {
      if (!cliName.startsWith(MCP_TOOL_PREFIX)) return cliName;
      const safe = cliName.slice(MCP_TOOL_PREFIX.length);
      return renameMap.get(safe) ?? safe;
    },
  };
}

/**
 * Full conversation history fed through the streaming-input channel: every
 * prior message is appended to the transcript without triggering a turn
 * (`shouldQuery: false`, merged into the next query message), and the last
 * user message triggers the single turn. A trailing assistant prefill gets a
 * synthetic continue trigger.
 */
export function historyPrompt(body: AnthropicRequestBody): AsyncGenerator<SDKUserMessage> {
  const messages = Array.isArray(body.messages)
    ? (body.messages as AnthropicMessageParam[]).filter((message) => {
        const role = message?.role;
        return role === "user" || role === "assistant";
      })
    : [];
  let triggerIndex = -1;
  // A trailing assistant prefill must not end the transcript: the turn
  // trigger has to be the final message, so only pick the last user message
  // when the conversation ends on one.
  if (messages[messages.length - 1]?.role === "user") {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i]?.role === "user") {
        triggerIndex = i;
        break;
      }
    }
  }
  return (async function* () {
    for (let i = 0; i < messages.length; i++) {
      yield {
        type: "user" as const,
        message: messages[i] as SDKUserMessage["message"],
        parent_tool_use_id: null,
        client_composed: true as const,
        shouldQuery: i === triggerIndex,
      };
    }
    if (triggerIndex < 0) {
      yield {
        type: "user" as const,
        message: { role: "user", content: "Continue." },
        parent_tool_use_id: null,
        client_composed: true as const,
        shouldQuery: true,
      };
    }
  })();
}

/**
 * Multi-account: map connection credentials to CLI env overrides.
 * Returns null when no credential is stored (keep the host's ~/.claude login).
 */
export function connectionEnv(credentials: ProviderCredentials): Record<string, string> | null {
  const accessToken =
    typeof credentials.accessToken === "string" && credentials.accessToken.length > 0
      ? credentials.accessToken
      : null;
  const apiKey =
    typeof credentials.apiKey === "string" && credentials.apiKey.length > 0
      ? credentials.apiKey
      : null;
  if (!accessToken && !apiKey) return null;
  return {
    ...(accessToken ? { CLAUDE_CODE_OAUTH_TOKEN: accessToken } : {}),
    ...(apiKey ? { ANTHROPIC_API_KEY: apiKey } : {}),
  };
}

function buildOptions(
  input: ExecuteInput,
  body: AnthropicRequestBody,
  cliPath: string | null,
  toolsServer: McpServerConfig | null,
  abortController: AbortController
): Options {
  const options: Options = {
    model: typeof body.model === "string" && body.model ? body.model : input.model,
    maxTurns: 1,
    // LLM proxy: no built-in CLI tools; client tools arrive via MCP below.
    tools: [],
    permissionMode: "dontAsk",
    // Cache + fidelity: isolation mode keeps the conversation prefix
    // deterministic (no server-side CLAUDE.md/settings/hooks injected into
    // every request) and verbatim prompts skip the CLI's per-turn attachment
    // pass, so identical history prefixes hit the upstream prompt cache
    // (verbatim needs CLI >= 2.1.248; the vendored CLI is newer).
    settingSources: [],
    verbatimPrompts: true,
    includePartialMessages: true,
    abortController,
  };
  const systemPrompt = systemToPrompt(body.system);
  if (systemPrompt) options.systemPrompt = systemPrompt;
  if (toolsServer) options.mcpServers = { [MCP_SERVER_NAME]: toolsServer };
  if (cliPath) options.pathToClaudeCodeExecutable = cliPath;
  const effort = effortFrom(body);
  if (effort) options.effort = effort;
  const budget = asRecord(body.thinking)?.budget_tokens;
  // No max_tokens passthrough: the CLI owns its own output cap.
  if (typeof budget === "number" && budget > 0) options.maxThinkingTokens = budget;
  // Multi-account: connection credentials override the host CLI login so each
  // connection routes through its own Claude account.
  const env = connectionEnv(input.credentials);
  if (env) options.env = { ...process.env, ...env };
  return options;
}

export function unmangleContent(content: unknown, rename: (name: string) => string): unknown {
  if (!Array.isArray(content)) return content;
  return content.map((block) => {
    const record = asRecord(block);
    if (record?.type !== "tool_use" || typeof record.name !== "string") return block;
    return { ...record, name: rename(record.name) };
  });
}
/**
 * Turn-history cleaning (clear_tool_uses, applied locally): the CLI child
 * cannot accept Anthropic's server-side context_management, so the same
 * strategy runs here — once the estimated history passes the trigger, older
 * tool_use/tool_result blocks become placeholders and the newest `keep`
 * tool_uses stay intact. Trigger/keep honor a client-provided
 * context_management.edits[] entry, else the Anthropic defaults.
 */
const CLEARED_TOOL_PLACEHOLDER = "[cleared old tool call]";

function clearToolUsesEdit(body: AnthropicRequestBody): Record<string, unknown> | null {
  const edits = asRecord(body.context_management)?.edits;
  if (!Array.isArray(edits)) return null;
  return (
    (edits.find((edit) => asRecord(edit)?.type === CLEAR_TOOL_USES_STRATEGY) as
      Record<string, unknown> | undefined) ?? null
  );
}

export function hasClearToolUsesEdit(body: AnthropicRequestBody): boolean {
  return clearToolUsesEdit(body) !== null;
}

// ~4 chars per token: trigger heuristic only, never a billing number.
function estimateTokens(value: unknown): number {
  return Math.ceil(JSON.stringify(value).length / 4);
}

export function clearOldToolUses(body: AnthropicRequestBody): AnthropicRequestBody {
  const messages = Array.isArray(body.messages) ? (body.messages as unknown[]) : [];
  const edit = clearToolUsesEdit(body);
  const keep = Math.max(
    0,
    typeof edit?.keep?.value === "number" ? edit.keep.value : CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES
  );
  const trigger =
    typeof edit?.trigger?.value === "number"
      ? edit.trigger.value
      : CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS;
  const toolUseIds: string[] = [];
  let totalTokens = 0;
  for (const message of messages) {
    totalTokens += estimateTokens(message);
    const record = asRecord(message);
    if (record?.role !== "assistant" || !Array.isArray(record.content)) continue;
    for (const block of record.content) {
      const blockRecord = asRecord(block);
      if (blockRecord?.type === "tool_use" && typeof blockRecord.id === "string") {
        toolUseIds.push(blockRecord.id);
      }
    }
  }
  if (toolUseIds.length <= keep || totalTokens <= trigger) return body;
  const cleared = new Set(toolUseIds.slice(0, toolUseIds.length - keep));
  const cleaned = messages.map((message) => {
    const record = asRecord(message);
    if (!record || !Array.isArray(record.content)) return message;
    const kind =
      record.role === "assistant" ? "tool_use" : record.role === "user" ? "tool_result" : null;
    if (!kind) return message;
    const idField = kind === "tool_use" ? "id" : "tool_use_id";
    return {
      ...record,
      content: (record.content as unknown[]).map((block) => {
        const blockRecord = asRecord(block);
        return blockRecord?.type === kind &&
          typeof blockRecord[idField] === "string" &&
          cleared.has(blockRecord[idField] as string)
          ? { type: "text", text: CLEARED_TOOL_PLACEHOLDER }
          : block;
      }),
    };
  });
  return { ...body, messages: cleaned };
}

export class ClaudeAgentExecutor extends BaseExecutor {
  constructor() {
    super("claude-agent", {
      id: "claude-agent",
      baseUrl: "claude-agent://stdio",
    });
  }

  async execute(input: ExecuteInput): Promise<ExecutorExecuteResult> {
    const body = (input.body ?? {}) as AnthropicRequestBody;
    const sdk = await resolveClaudeAgentSdk();
    if (!sdk) {
      return makeErrorResponse(
        503,
        "claude-agent requires the bundled @anthropic-ai/claude-agent-sdk, which is not available. Reinstall OmniRoute (npm install) to restore the built-in provider."
      );
    }

    const abortController = new AbortController();
    const onAbort = () => abortController.abort();
    input.signal?.addEventListener("abort", onAbort, { once: true });

    const rename = buildClientTools(sdk, body);
    const toolsServer = rename ? (rename.config as McpServerConfig) : null;
    const options = buildOptions(
      input,
      body,
      resolveClaudeCodeExecutable(sdk),
      toolsServer,
      abortController
    );
    const requestedStream = Boolean(input.stream);
    const model = typeof body.model === "string" && body.model ? body.model : input.model;

    try {
      const cleanBody =
        input.contextEditing?.enabled || hasClearToolUsesEdit(body) ? clearOldToolUses(body) : body;
      const query = sdk.query({ prompt: historyPrompt(cleanBody), options });
      if (requestedStream) {
        return this.streamResponse(
          query,
          rename?.rename ?? ((name) => name),
          onAbort,
          input.signal ?? null,
          abortController,
          input.log ?? null
        );
      }
      return await this.jsonResponse(
        query,
        model,
        rename?.rename ?? ((name) => name),
        input.log ?? null
      );
    } catch (error) {
      input.signal?.removeEventListener("abort", onAbort);
      abortController.abort();
      return makeErrorResponse(
        502,
        sanitizeErrorMessage(`claude-agent query failed: ${String(error)}`)
      );
    }
  }

  /**
   * Anthropic SSE passthrough: the SDK's stream_event messages carry the
   * Messages API events verbatim, so the existing Claude-format translators
   * parse them unchanged.
   */
  private streamResponse(
    query: AsyncGenerator<SDKMessage, void>,
    rename: (name: string) => string,
    onAbort: () => void,
    signal: AbortSignal | null,
    abortController: AbortController,
    log: NonNullable<ExecuteInput["log"]> | null
  ): Response {
    const encoder = new TextEncoder();
    // Shared with cancel(): if the client disconnects mid-turn, any pending
    // emit/close must no-op instead of enqueueing on a cancelled stream
    // (enqueue after cancel throws and would reject unhandled).
    let closed = false;
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        // `closed` is hoisted above the stream so cancel() can flip it.
        const close = () => {
          if (closed) return;
          closed = true;
          signal?.removeEventListener("abort", onAbort);
          abortController.abort();
          controller.close();
        };
        const emit = (event: unknown) => {
          if (closed) return;
          const record = event as { type?: string };
          controller.enqueue(
            encoder.encode(`event: ${record.type}\ndata: ${JSON.stringify(event)}\n\n`)
          );
        };
        try {
          for await (const message of query) {
            if (message.type !== "stream_event") continue;
            const event = (message.event ?? null) as unknown as AnthropicBlock | undefined;
            if (!event) continue;
            // Skip subagent frames; the top-level turn is the client's reply.
            if (message.parent_tool_use_id !== null) continue;
            const block = asRecord(event.content_block);
            if (block?.type === "tool_use" && typeof block.name === "string") {
              emit({ ...event, content_block: { ...block, name: rename(block.name) } });
            } else {
              emit(event);
            }
            if (event.type === "message_stop") {
              close();
              return;
            }
          }
          // CLI ended without message_stop (interrupt/error): terminate the
          // stream so the client never hangs on a dangling turn.
          close();
        } catch (error) {
          if (closed) return;
          log?.error("CLAUDE_AGENT", `stream failed: ${String(error)}`.slice(0, 300));
          emit({
            type: "error",
            error: {
              type: "api_error",
              message: sanitizeErrorMessage(`claude-agent stream failed: ${String(error)}`),
            },
          });
          close();
        }
      },
      cancel() {
        closed = true;
        signal?.removeEventListener("abort", onAbort);
        abortController.abort();
      },
    });
    return new Response(stream, {
      status: 200,
      headers: {
        "content-type": "text/event-stream; charset=utf-8",
        "cache-control": "no-cache",
      },
    });
  }

  private async jsonResponse(
    query: AsyncGenerator<SDKMessage, void>,
    model: string,
    rename: (name: string) => string,
    log: NonNullable<ExecuteInput["log"]> | null
  ): Promise<Response> {
    // The CLI emits one assistant message per COMPLETED content block (same
    // message.id), so frames must be merged; the result frame carries the
    // final stop_reason/usage and the turn's is_error verdict.
    const frames: AnthropicBlock[] = [];
    let result: AnthropicBlock | null = null;
    try {
      for await (const message of query) {
        if (message.type === "result") {
          result = message as unknown as AnthropicBlock;
          continue;
        }
        if (message.type !== "assistant" || message.parent_tool_use_id !== null) continue;
        frames.push(message.message as unknown as AnthropicBlock);
      }
    } catch (error) {
      if (!frames.length) {
        log?.error("CLAUDE_AGENT", `query failed: ${String(error)}`.slice(0, 300));
        return makeErrorResponse(
          502,
          sanitizeErrorMessage(`claude-agent query failed: ${String(error)}`)
        );
      }
    }
    // CLI-side failure: is_error is authoritative even when an assistant
    // frame already arrived.
    if (result?.is_error === true) {
      const text =
        typeof result.result === "string" && result.result.trim()
          ? result.result
          : "claude-agent turn failed";
      return makeErrorResponse(502, sanitizeErrorMessage(`claude-agent: ${text}`));
    }
    if (!frames.length) {
      return makeErrorResponse(
        502,
        sanitizeErrorMessage("claude-agent produced no assistant turn")
      );
    }
    const first = frames[0];
    const last = frames[frames.length - 1];
    const content = unmangleContent(
      frames.flatMap((frame) => (Array.isArray(frame.content) ? frame.content : [])),
      rename
    );
    const usage = asRecord(result?.usage) ??
      asRecord(last.usage) ?? { input_tokens: 0, output_tokens: 0 };
    const responseBody = {
      id: typeof first.id === "string" ? first.id : `msg_${crypto.randomUUID()}`,
      type: "message",
      role: "assistant",
      content,
      model,
      stop_reason: result?.stop_reason ?? last.stop_reason ?? null,
      stop_sequence: null,
      usage,
    };
    return new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }
}

export default ClaudeAgentExecutor;

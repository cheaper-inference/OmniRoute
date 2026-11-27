import { validSearchResultUrl } from "@omniroute/open-sse/handlers/search/resultFilters.ts";
import { projectSkillOutputForBoundary, skillExecutor } from "./executor";
import { skillRegistry } from "./registry";
import { builtinSkills } from "./builtins";
import { memoryBuiltinHandlers, MEMORY_BUILTIN_TOOL_NAMES } from "./memoryBuiltins";
import { detectProvider, decodeSkillToolName } from "./injection";
import { OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME } from "@omniroute/open-sse/services/webSearchFallback.ts";
import { OMNIROUTE_WEB_FETCH_FALLBACK_TOOL_NAME } from "@omniroute/open-sse/services/webFetchInterception.ts";
import {
  toClaudeWebSearchResults,
  type ClaudeWebSearchResult,
} from "@omniroute/open-sse/translator/helpers/claudeServerWebSearch.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/errorSanitization.ts";
import { runWithServerToolFence } from "./toolExecutionFence";
import type { ExecutedToolResult, ToolCall, ExecutionContext } from "./toolLoopTypes";
import { logger } from "../../../open-sse/utils/logger.ts";

const log = logger("SKILLS_INTERCEPTION");

/**
 * Typed error for server-owned tool execution control-flow states
 * (in_progress, unknown, identity_conflict). These must never be fed
 * back to the model as tool results — they represent infrastructure
 * conditions that should surface as HTTP-level errors.
 */
export class ServerOwnedExecutionError extends Error {
  readonly code: string;
  readonly httpStatus: number;
  constructor(message: string, code: string, httpStatus: number) {
    super(message);
    this.name = "ServerOwnedExecutionError";
    this.code = code;
    this.httpStatus = httpStatus;
  }
}

function toSafeSkillErrorMessage(value: unknown): string {
  try {
    const raw = value instanceof Error ? value.message : value;
    return sanitizeErrorMessage(raw) || "Skill execution failed";
  } catch {
    return "Skill execution failed";
  }
}

function projectSkillResultForPublicResponse(result: unknown): unknown {
  if (!result || typeof result !== "object" || Array.isArray(result)) return result;
  return projectSkillOutputForBoundary(result as Record<string, unknown>);
}

// ToolCall and ExecutionContext types are imported from ./toolLoopTypes.ts

const BUILTIN_TOOL_ALIASES: Record<string, string> = {
  [OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME]: "web_search",
  [OMNIROUTE_WEB_FETCH_FALLBACK_TOOL_NAME]: "web_fetch",
};

const MEMORY_TOOL_NAMES = new Set<string>(MEMORY_BUILTIN_TOOL_NAMES);

function resolveBuiltinHandlerName(
  toolName: string,
  context: ExecutionContext
): keyof typeof builtinSkills | keyof typeof memoryBuiltinHandlers | null {
  const [rawName] = toolName.includes("@") ? toolName.split("@") : [toolName];
  const canonicalName = BUILTIN_TOOL_ALIASES[rawName] || rawName;
  const allowed = new Set(
    (context.builtinToolNames || []).map((name) => BUILTIN_TOOL_ALIASES[name] || name)
  );

  if (!allowed.has(canonicalName)) {
    return null;
  }

  if (canonicalName in builtinSkills) {
    return canonicalName as keyof typeof builtinSkills;
  }
  if (MEMORY_TOOL_NAMES.has(canonicalName)) {
    return canonicalName as keyof typeof memoryBuiltinHandlers;
  }
  return null;
}

function getResponsesOutputContainer(response: Record<string, unknown> | null | undefined): {
  root: Record<string, unknown>;
  responseRoot: Record<string, unknown>;
  output: unknown[];
} | null {
  if (!response || typeof response !== "object") return null;

  if (Array.isArray(response.output)) {
    return {
      root: response,
      responseRoot: response,
      output: response.output,
    };
  }

  if (
    response.response &&
    typeof response.response === "object" &&
    !Array.isArray(response.response) &&
    Array.isArray((response.response as Record<string, unknown>).output)
  ) {
    return {
      root: response,
      responseRoot: response.response as Record<string, unknown>,
      output: (response.response as Record<string, unknown>).output as unknown[],
    };
  }

  return null;
}

export async function interceptToolCalls(
  toolCalls: ToolCall[],
  context: ExecutionContext
): Promise<{ id: string; result: unknown }[]> {
  const results = await Promise.all(
    toolCalls.map(async (call) => {
      try {
        const builtinHandlerName = resolveBuiltinHandlerName(call.name, context);
        if (builtinHandlerName) {
          log.info("skills.interception.builtin_tool_detected", {
            toolName: call.name,
            builtinHandler: builtinHandlerName,
            callId: call.id,
          });

          const isMemoryHandler = MEMORY_TOOL_NAMES.has(builtinHandlerName);
          const result = isMemoryHandler
            ? await memoryBuiltinHandlers[builtinHandlerName as keyof typeof memoryBuiltinHandlers](
                call.arguments,
                {
                  apiKeyId: context.apiKeyId,
                  sessionId: context.sessionId,
                }
              )
            : await builtinSkills[builtinHandlerName as keyof typeof builtinSkills](
                call.arguments,
                {
                  apiKeyId: context.apiKeyId,
                  sessionId: context.sessionId,
                  provider: context.provider,
                  model: context.model,
                }
              );

          log.info("skills.interception.execution_complete", {
            toolName: call.name,
            callId: call.id,
          });

          return {
            id: call.id,
            result: projectSkillResultForPublicResponse(result),
          };
        }

        const decodedName = decodeSkillToolName(call.name);
        const [name, version] = decodedName.includes("@")
          ? decodedName.split("@")
          : [decodedName, "latest"];

        const skillName = version === "latest" ? name : `${name}@${version}`;

        log.info("skills.interception.tool_call_detected", {
          toolName: call.name,
          callId: call.id,
        });

        const execution = await skillExecutor.execute(skillName, call.arguments, {
          apiKeyId: context.apiKeyId,
          sessionId: context.sessionId,
        });

        const result = projectSkillResultForPublicResponse(
          execution.output ??
            (execution.errorMessage
              ? { error: toSafeSkillErrorMessage(execution.errorMessage) }
              : { error: "Skill execution returned no output" })
        );

        log.info("skills.interception.execution_complete", {
          toolName: call.name,
          callId: call.id,
        });

        return {
          id: call.id,
          result,
        };
      } catch (err) {
        const safeError = toSafeSkillErrorMessage(err);
        log.error("skills.interception.execution_failed", {
          toolName: call.name,
          callId: call.id,
          err: safeError,
        });
        return {
          id: call.id,
          result: { error: safeError },
        };
      }
    })
  );

  return results;
}

export function extractToolCalls(response: any, modelIdOrSourceFormat: string): ToolCall[] {
  // Accept either a sourceFormat ("openai" | "claude") or a model ID string.
  // Map known sourceFormat values; fall back to detectProvider for model IDs.
  const format =
    modelIdOrSourceFormat === "openai" || modelIdOrSourceFormat === "claude"
      ? modelIdOrSourceFormat
      : undefined;
  const provider =
    format === "claude"
      ? "anthropic"
      : format === "openai"
        ? "openai"
        : detectProvider(modelIdOrSourceFormat);

  switch (provider) {
    case "openai": {
      const rootToolCalls = Array.isArray(response?.tool_calls) ? response.tool_calls : [];
      const choiceToolCalls = Array.isArray(response?.choices)
        ? response.choices.flatMap((choice: any) =>
            Array.isArray(choice?.message?.tool_calls) ? choice.message.tool_calls : []
          )
        : [];
      const responsesOutput = getResponsesOutputContainer(response);
      const responsesToolCalls = responsesOutput
        ? responsesOutput.output
            .map((item: unknown) => (item && typeof item === "object" ? (item as any) : null))
            .filter((item: any) => item?.type === "function_call")
        : [];
      const toolCalls =
        rootToolCalls.length > 0
          ? rootToolCalls
          : choiceToolCalls.length > 0
            ? choiceToolCalls
            : responsesToolCalls;

      return toolCalls.map((tc: any) => ({
        id: tc.call_id || tc.id || `call_${Date.now()}`,
        name: tc.function?.name || tc.name || "",
        arguments: parseArguments(tc.function?.arguments || tc.arguments || "{}"),
      }));
    }

    case "anthropic":
      return (response.content || [])
        .filter((c: any) => c.type === "tool_use")
        .map((tc: any) => ({
          id: tc.id,
          name: tc.name,
          arguments: tc.input || {},
        }));

    case "google":
      return (response.functionCalls || []).map((fc: any) => ({
        id: `call_${Date.now()}_${Math.random().toString(36).slice(2)}`,
        name: fc.name,
        arguments: fc.args || {},
      }));

    default:
      return [];
  }
}

function parseArguments(args: string | Record<string, unknown>): Record<string, unknown> {
  if (typeof args === "object") {
    return args;
  }

  try {
    return JSON.parse(args);
  } catch {
    return {};
  }
}

function isRegisteredCustomSkill(toolName: string, apiKeyId: string): boolean {
  const decodedName = decodeSkillToolName(toolName);
  const [name, version] = decodedName.includes("@")
    ? decodedName.split("@", 2)
    : [decodedName, undefined];
  const identifier = version ? `${name}@${version}` : name;
  return skillRegistry.getSkill(identifier, apiKeyId) != null;
}

interface ResponsesWebSearchSource {
  type: "url";
  title: string;
  url: string;
  caption: string;
}

function webSearchSources(result: unknown): ResponsesWebSearchSource[] {
  const record = result && typeof result === "object" ? (result as Record<string, unknown>) : null;
  if (!record || record.success !== true || !Array.isArray(record.results)) return [];

  const sources: ResponsesWebSearchSource[] = [];
  const seen = new Set<string>();
  for (const entry of record.results) {
    if (!entry || typeof entry !== "object") continue;
    const source = entry as Record<string, unknown>;
    const url = source.url;
    if (!validSearchResultUrl(url) || seen.has(url)) continue;
    seen.add(url);
    sources.push({
      type: "url",
      url,
      title: typeof source.title === "string" && source.title.trim() ? source.title : url,
      caption:
        typeof source.snippet === "string" && source.snippet
          ? source.snippet
          : typeof source.display_url === "string"
            ? source.display_url
            : "",
    });
  }
  return sources;
}

/**
 * Build the native hosted-tool item. The accompanying cited message is needed
 * by Responses SDKs that consume output_text annotations rather than action.sources.
 */
export function buildWebSearchCallItem(
  call: ToolCall,
  result: unknown
): Record<string, unknown> | null {
  if (call.name !== OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME) return null;
  const record = result && typeof result === "object" ? (result as Record<string, unknown>) : null;
  if (!record || record.success !== true) return null;

  return {
    id: `ws_${call.id}`,
    type: "web_search_call",
    status: "completed",
    action: {
      type: "search",
      query:
        typeof record.query === "string"
          ? record.query
          : typeof call.arguments.query === "string"
            ? call.arguments.query
            : "",
      sources: webSearchSources(result),
    },
  };
}

/**
 * The legacy interception path does not resume the model after executing a
 * hosted search. Return the actual snippets with citations, rather than leaving
 * a pre-search promise as the only assistant text or exposing an internal function
 * call that the client never declared.
 */
function buildResponsesWebSearchOutput(call: ToolCall, result: unknown): Record<string, unknown>[] {
  const record = result && typeof result === "object" ? (result as Record<string, unknown>) : null;
  const successful = record?.success === true;
  const query =
    typeof record?.query === "string"
      ? record.query
      : typeof call.arguments.query === "string"
        ? call.arguments.query
        : "";
  const sources = webSearchSources(result);
  const searchCall = buildWebSearchCallItem(call, result) ?? {
    id: `ws_${call.id}`,
    type: "web_search_call",
    status: "failed",
    action: { type: "search", query, sources: [] },
  };
  const annotations: Record<string, unknown>[] = [];
  let text = successful ? "Web search returned no usable source URLs." : "Web search failed.";
  if (sources.length > 0) {
    text = query ? `Web search results for ${JSON.stringify(query)}:` : "Web search results:";
    sources.forEach((source, index) => {
      text += `\n\n${index + 1}. ${source.title}`;
      if (source.caption) text += `\n${source.caption}`;
      text += "\n";
      const startIndex = text.length;
      text += source.url;
      annotations.push({
        type: "url_citation",
        start_index: startIndex,
        end_index: text.length,
        url: source.url,
        title: source.title,
      });
    });
  }
  return [
    searchCall,
    {
      id: `msg_search_${call.id}`,
      type: "message",
      role: "assistant",
      status: "completed",
      content: [{ type: "output_text", text, annotations }],
    },
  ];
}

/**
 * Build the Anthropic `server_tool_use` + `web_search_tool_result` block pair
 * for one handled `omniroute_web_search` result. Claude Code's built-in
 * WebSearch only parses these blocks — a text block carrying the JSON reads as
 * an empty search. Mirrors the Gemini/Antigravity lanes, which already emit
 * this pair via the shared helper. Returns null when the result is not a
 * successful search payload.
 */
function buildAnthropicWebSearchBlocks(
  call: ToolCall,
  result: unknown
): Record<string, unknown>[] | null {
  if (call.name !== OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME) return null;
  const record = result && typeof result === "object" ? (result as Record<string, unknown>) : null;
  if (!record || record.success !== true) return null;

  const query = typeof record.query === "string" ? record.query : "";
  const rawItems = Array.isArray(record.results) ? record.results : [];
  const webResults: ClaudeWebSearchResult[] = toClaudeWebSearchResults(
    rawItems as Array<{ url?: unknown; title?: unknown }>
  );
  const id = `srvtoolu_${call.id}`;

  return [
    {
      type: "server_tool_use",
      id,
      name: "web_search",
      input: { query },
    },
    {
      type: "web_search_tool_result",
      tool_use_id: id,
      content: webResults,
    },
  ];
}

/**
 * Render handled tool results as assistant content blocks. Claude Code's WebSearch
 * only reads server_tool_use + web_search_tool_result blocks, so handled
 * omniroute_web_search results get that structured pair; every other result, and
 * a failed search, keeps the text shape (#2815 rationale).
 */
function buildAnthropicResultBlocks(
  toolCalls: ToolCall[],
  results: { id: string; result: unknown }[]
): Record<string, unknown>[] {
  const callById = new Map(toolCalls.map((call) => [call.id, call]));
  return results.flatMap((r) => {
    const call = callById.get(r.id);
    const searchBlocks = call ? buildAnthropicWebSearchBlocks(call, r.result) : null;
    if (searchBlocks) return searchBlocks;
    return [
      {
        type: "text",
        text: `[Skill result: ${call?.name || r.id}]\n${JSON.stringify(r.result)}`,
      },
    ];
  });
}

export async function handleToolCallExecution(
  response: any,
  modelId: string,
  context: ExecutionContext
): Promise<any> {
  // Only intercept tool_use blocks that resolve to a builtin handler or a
  // registered custom skill. Unknown tool names are forwarded untouched so
  // client-native tools (Bash, Read, etc.) are not turned into Skill-not-found
  // tool_result blocks appended back into the assistant response. See #2815.

  // Ensure the registry cache is warm for this apiKeyId before filtering.
  // isRegisteredCustomSkill() reads registeredSkills synchronously, so on a
  // cold/fresh process a skill that exists only in the DB would be missed
  // (false negative → silently skipped). Mirror the pattern used in
  // open-sse/mcp-server/tools/skillTools.ts. loadFromDatabase() is a no-op
  // when the cache is already warm (TTL = 60 s), so repeated calls are cheap.
  await skillRegistry.loadFromDatabase(context.apiKeyId);

  const toolCalls = extractToolCalls(response, modelId).filter((call) => {
    if (typeof call?.name !== "string" || !call.name) return false;
    if (resolveBuiltinHandlerName(call.name, context)) return true;
    if (context.customSkillExecutionEnabled === false) return false;
    return isRegisteredCustomSkill(call.name, context.apiKeyId);
  });

  if (toolCalls.length === 0) {
    return response;
  }

  const results = await interceptToolCalls(toolCalls, context);

  const provider = detectProvider(modelId);

  switch (provider) {
    case "openai": {
      const responsesOutput = getResponsesOutputContainer(response);
      if (responsesOutput) {
        const hostedSearchCalls = toolCalls.filter(
          (call) =>
            call.name === OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME &&
            resolveBuiltinHandlerName(call.name, context) === "web_search"
        );
        const hostedSearchIds = new Set(hostedSearchCalls.map((call) => call.id));
        const functionOutputs = results
          .filter((result) => !hostedSearchIds.has(result.id))
          .map((result) => ({
            type: "function_call_output",
            call_id: result.id,
            output: JSON.stringify(result.result),
          }));

        // Only remove the executed hosted-search round-trip. Client functions,
        // custom skills and opaque provider output retain their existing contract.
        const remainingOutput = responsesOutput.output.filter((entry) => {
          if (!entry || typeof entry !== "object") return true;
          const item = entry as Record<string, unknown>;
          return !(
            (item.type === "function_call" || item.type === "function_call_output") &&
            hostedSearchIds.has(String(item.call_id || item.id || ""))
          );
        });
        const resultById = new Map(results.map((r) => [r.id, r.result]));
        const webSearchOutput = hostedSearchCalls.flatMap((call) =>
          buildResponsesWebSearchOutput(call, resultById.get(call.id))
        );
        const output = [...remainingOutput, ...functionOutputs, ...webSearchOutput];

        if (responsesOutput.root === responsesOutput.responseRoot) {
          return { ...response, output };
        }

        return {
          ...response,
          response: { ...responsesOutput.responseRoot, output },
        };
      }

      return {
        ...response,
        tool_results: results.map((r) => ({
          tool_call_id: r.id,
          output: JSON.stringify(r.result),
        })),
      };
    }

    case "anthropic": {
      // Anthropic only permits tool_result blocks in user messages. This helper
      // returns a single assistant response, so there is no valid place to put a
      // server-side skill result as tool_result here. Keep client-native tool_use
      // blocks untouched, remove the OmniRoute-handled tool_use blocks, and expose
      // their results as plain assistant text instead of corrupting history with
      // assistant-side tool_result blocks. See #2815. The one exception is
      // omniroute_web_search, which becomes a server_tool_use +
      // web_search_tool_result pair (both valid in assistant content). See #19046.
      //
      // When no client-native tool_use blocks remain (all were handled here), the
      // upstream stop_reason "tool_use" is stale and would make clients wait for
      // tool_use blocks that no longer exist — so it is normalized to "end_turn"
      // (with stop_sequence cleared). The mixed-tool branch keeps the original
      // stop_reason because real native tool_use blocks still need the client.
      const handledToolCallIds = new Set(results.map((r) => r.id));
      const remainingContent = (Array.isArray(response.content) ? response.content : []).filter(
        (block: any) => !(block?.type === "tool_use" && handledToolCallIds.has(block.id))
      );
      const resultBlocks = buildAnthropicResultBlocks(toolCalls, results);
      const firstRemainingToolUseIndex = remainingContent.findIndex(
        (block: any) => block?.type === "tool_use"
      );

      if (firstRemainingToolUseIndex === -1) {
        return {
          ...response,
          content: [...remainingContent, ...resultBlocks],
          stop_reason: "end_turn",
          stop_sequence: null,
        };
      }

      return {
        ...response,
        content: [
          ...remainingContent.slice(0, firstRemainingToolUseIndex),
          ...resultBlocks,
          ...remainingContent.slice(firstRemainingToolUseIndex),
        ],
      };
    }

    default:
      return response;
  }
}

// ─── Task 3: ownership classifier ────────────────────────────────────────────

export async function classifyServerOwnedCalls(
  toolCalls: ToolCall[],
  context: ExecutionContext
): Promise<{ serverOwned: ToolCall[]; clientNative: ToolCall[] }> {
  const builtinSet = new Set(context.builtinToolNames || []);
  const customSet = new Set(context.injectedCustomSkillNames || []);

  const serverOwned: ToolCall[] = [];
  const clientNative: ToolCall[] = [];

  for (const call of toolCalls) {
    if (builtinSet.has(call.name)) {
      serverOwned.push(call);
    } else if (context.customSkillExecutionEnabled && customSet.has(call.name)) {
      serverOwned.push(call);
    } else {
      clientNative.push(call);
    }
  }

  return { serverOwned, clientNative };
}

// ─── Task 3: executeServerOwned — fence-gated execution callback ────────────

const LEASE_DURATION_MS = 120_000;

/**
 * Runtime seam: overridable fence function for testing.
 * When null, the real `runWithServerToolFence` is used.
 * Tests may set this to inject controlled fence outcomes.
 */
let _fenceFn: typeof runWithServerToolFence | null = null;

export function setFenceFnForTesting(fn: typeof runWithServerToolFence | null): void {
  _fenceFn = fn;
}

export async function executeServerOwned(
  calls: ToolCall[],
  context: ExecutionContext,
  fenceFn?: typeof runWithServerToolFence
): Promise<ExecutedToolResult[]> {
  if (context.executionFenceEnabled && !context.requestIdentity) {
    throw new Error(
      "executeServerOwned requires context.requestIdentity when executionFenceEnabled is true"
    );
  }

  const results: ExecutedToolResult[] = [];

  for (const call of calls) {
    const builtinHandlerName = resolveBuiltinHandlerName(call.name, context);
    const isMemoryBuiltin = builtinHandlerName && MEMORY_TOOL_NAMES.has(builtinHandlerName);
    const isOrdinaryBuiltin = builtinHandlerName && builtinHandlerName in builtinSkills;
    const isCustomSkill =
      !builtinHandlerName &&
      context.customSkillExecutionEnabled &&
      context.injectedCustomSkillNames?.includes(call.name);

    const executeFn = async (executionId: string): Promise<unknown> => {
      if (isMemoryBuiltin) {
        const handlerName = builtinHandlerName as keyof typeof memoryBuiltinHandlers;
        return memoryBuiltinHandlers[handlerName](call.arguments, {
          apiKeyId: context.apiKeyId,
          sessionId: context.sessionId,
        });
      }
      if (isOrdinaryBuiltin) {
        const handlerName = builtinHandlerName as keyof typeof builtinSkills;
        return builtinSkills[handlerName](call.arguments, {
          apiKeyId: context.apiKeyId,
          sessionId: context.sessionId,
          provider: context.provider,
          model: context.model,
        });
      }
      if (isCustomSkill) {
        const decodedName = decodeSkillToolName(call.name);
        const [name, version] = decodedName.includes("@")
          ? decodedName.split("@", 2)
          : [decodedName, "latest"];
        const skillName = version === "latest" ? name : `${name}@${version}`;
        const execution = await skillExecutor.executeClaimed(
          skillName,
          call.arguments,
          {
            apiKeyId: context.apiKeyId,
            sessionId: context.sessionId,
          },
          executionId
        );
        return (
          execution.output ??
          (execution.errorMessage
            ? { error: toSafeSkillErrorMessage(execution.errorMessage) }
            : { error: "Skill execution returned no output" })
        );
      }
      throw new Error(`No handler for tool: ${call.name}`);
    };

    if (context.executionFenceEnabled && context.requestIdentity) {
      const activeFenceFn = fenceFn ?? _fenceFn ?? runWithServerToolFence;
      const fenceResult = await activeFenceFn({
        apiKeyId: context.apiKeyId,
        requestIdentity: context.requestIdentity,
        toolCallId: call.id,
        toolName: call.name,
        arguments: call.arguments,
        leaseDurationMs: LEASE_DURATION_MS,
        execute: executeFn,
      });

      switch (fenceResult.kind) {
        case "executed":
          results.push({
            id: call.id,
            name: call.name,
            result: projectSkillResultForPublicResponse(fenceResult.value),
            replayed: false,
          });
          break;
        case "replayed": {
          if (fenceResult.status === "error") {
            throw new ServerOwnedExecutionError(
              fenceResult.errorMessage ?? "Tool execution failed",
              "TOOL_EXECUTION_ERROR",
              500
            );
          }
          if (fenceResult.status === "timeout") {
            throw new ServerOwnedExecutionError(
              fenceResult.errorMessage ?? "Tool execution timed out",
              "TOOL_EXECUTION_TIMEOUT",
              504
            );
          }
          results.push({
            id: call.id,
            name: call.name,
            result: projectSkillResultForPublicResponse(fenceResult.value),
            replayed: true,
          });
          break;
        }
        case "in_progress":
          throw new ServerOwnedExecutionError(
            "Tool execution in progress",
            "TOOL_IN_PROGRESS",
            409
          );
        case "unknown":
          throw new ServerOwnedExecutionError(
            "Tool execution state unknown",
            "TOOL_STATE_UNKNOWN",
            500
          );
        case "identity_conflict":
          throw new ServerOwnedExecutionError(
            "Tool execution identity conflict",
            "IDENTITY_CONFLICT",
            409
          );
      }
    } else {
      // Flag-off path: no fence, dispatch directly.
      try {
        const value = await executeFn("");
        results.push({
          id: call.id,
          name: call.name,
          result: projectSkillResultForPublicResponse(value),
          replayed: false,
        });
      } catch (err) {
        results.push({
          id: call.id,
          name: call.name,
          result: { error: toSafeSkillErrorMessage(err) },
          replayed: false,
        });
      }
    }
  }

  return results;
}

// ─── Task 3: pure escape formatter ───────────────────────────────────────────

function extractOpenAIToolCalls(
  response: Record<string, unknown>
): Array<{ id: string; function: { name: string; arguments: string } }> {
  const rootToolCalls = Array.isArray(response.tool_calls) ? response.tool_calls : [];
  const choiceToolCalls = Array.isArray(response.choices)
    ? (response.choices as any[]).flatMap((choice: any) =>
        Array.isArray(choice?.message?.tool_calls) ? choice.message.tool_calls : []
      )
    : [];
  return rootToolCalls.length > 0 ? rootToolCalls : choiceToolCalls;
}

function getOpenAIResponseOutput(
  response: Record<string, unknown>
): { target: Record<string, unknown>; output: unknown[] } | null {
  if (Array.isArray(response.output)) {
    return { target: response, output: response.output };
  }
  if (
    response.response &&
    typeof response.response === "object" &&
    !Array.isArray(response.response) &&
    Array.isArray((response.response as Record<string, unknown>).output)
  ) {
    return {
      target: response.response as Record<string, unknown>,
      output: (response.response as Record<string, unknown>).output as unknown[],
    };
  }
  return null;
}

export function formatEscapeHatchResponse(
  response: Record<string, unknown>,
  serverCalls: ToolCall[],
  results: ExecutedToolResult[],
  clientCalls: ToolCall[],
  sourceFormat: "openai" | "claude",
  serializedResultTextById?: Map<string, string>
): Record<string, unknown> {
  const serverIds = new Set(serverCalls.map((c) => c.id));

  if (sourceFormat === "openai") {
    // Check for Responses API format.
    const responsesOutput = getOpenAIResponseOutput(response);
    if (responsesOutput) {
      // For Responses, append function_call_output for server calls.
      const functionOutputs = results
        .filter((r) => serverIds.has(r.id))
        .map((r) => ({
          type: "function_call_output",
          call_id: r.id,
          output: serializedResultTextById?.get(r.id) ?? JSON.stringify(r.result),
        }));
      return {
        ...response,
        response:
          responsesOutput.target !== response
            ? {
                ...(response.response as Record<string, unknown>),
                output: [...responsesOutput.output, ...functionOutputs],
              }
            : undefined,
        output:
          responsesOutput.target === response
            ? [...responsesOutput.output, ...functionOutputs]
            : response.output,
      };
    }

    // Chat Completions format.
    const originalToolCalls = extractOpenAIToolCalls(response);
    const remainingToolCalls = originalToolCalls.filter(
      (tc: any) => !serverIds.has(tc.id || tc.call_id)
    );

    // Build result text from server results.
    const resultTexts = results
      .filter((r) => serverIds.has(r.id))
      .map(
        (r) =>
          `[${r.name} result]\n${serializedResultTextById?.get(r.id) ?? JSON.stringify(r.result)}`
      )
      .join("\n\n");

    const existingContent =
      typeof response.choices?.[0]?.message?.content === "string"
        ? response.choices[0].message.content
        : "";
    const newContent = existingContent ? `${existingContent}\n\n${resultTexts}` : resultTexts;

    // Clone response to avoid mutation.
    const formatted = JSON.parse(JSON.stringify(response));
    if (formatted.choices?.[0]?.message) {
      formatted.choices[0].message.content = newContent;
      formatted.choices[0].message.tool_calls =
        remainingToolCalls.length > 0 ? remainingToolCalls : undefined;
    }

    // Mixed → keep tool_calls finish_reason; all-server → stop.
    if (remainingToolCalls.length === 0 && clientCalls.length === 0) {
      formatted.choices[0].finish_reason = "stop";
    }

    return formatted;
  }

  if (sourceFormat === "claude") {
    const remainingContent = (Array.isArray(response.content) ? response.content : []).filter(
      (block: any) => !(block?.type === "tool_use" && serverIds.has(block.id))
    );

    // Build result text blocks.
    const resultTextBlocks = results
      .filter((r) => serverIds.has(r.id))
      .map((r) => ({
        type: "text",
        text: `[${r.name} result]\n${serializedResultTextById?.get(r.id) ?? JSON.stringify(r.result)}`,
      }));

    // Insert result text blocks before the first remaining tool_use.
    const firstRemainingIndex = remainingContent.findIndex(
      (block: any) => block?.type === "tool_use"
    );

    let newContent: unknown[];
    if (firstRemainingIndex === -1) {
      newContent = [...remainingContent, ...resultTextBlocks];
    } else {
      newContent = [
        ...remainingContent.slice(0, firstRemainingIndex),
        ...resultTextBlocks,
        ...remainingContent.slice(firstRemainingIndex),
      ];
    }

    const formatted: Record<string, unknown> = { ...response, content: newContent };

    // All-server → end_turn; mixed → keep original stop_reason.
    const remainingToolUseCount = remainingContent.filter(
      (b: any) => b?.type === "tool_use"
    ).length;
    if (remainingToolUseCount === 0 && clientCalls.length === 0) {
      formatted.stop_reason = "end_turn";
      formatted.stop_sequence = null;
    }

    return formatted;
  }

  return response;
}

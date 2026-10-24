import { register } from "../registry.ts";
import { FORMATS } from "../formats.ts";
import { adjustMaxTokens } from "../helpers/maxTokensHelper.ts";
import {
  isClaudeServerWebSearchTool,
  isSoleClaudeServerWebSearchTool,
} from "../helpers/claudeServerWebSearch.ts";
import { chatStrictFrom } from "../helpers/toolStrict.ts";

type JsonRecord = Record<string, unknown>;
const TOOL_CHOICE_ANY = ["a", "n", "y"].join("");

/**
 * Port of decolua/9router commit 0aaa5ab3 (closes prompt-cache instability):
 * Anthropic injects a dynamic `x-anthropic-billing-header: <value>` line at
 * the top of some system prompts. When we translate Claude → OpenAI and
 * forward to a non-Anthropic upstream, that line both leaks into the
 * assistant prompt and rotates per request, destroying prompt-cache hits.
 * Strip it from each system entry before assembling the OpenAI request.
 */
function stripAnthropicBillingHeader(text: unknown): string {
  if (typeof text !== "string") return "";
  return text.replace(/^x-anthropic-billing-header:[^\n]*(?:\r?\n)?/i, "");
}

/**
 * Normalize tool input schema for OpenAI compatibility.
 * OpenAI strict mode requires `properties: {}` on object-type schemas,
 * even for zero-argument tools. Anthropic/MCP tools may omit it (#1898).
 */
function normalizeToolSchema(schema: unknown): Record<string, unknown> {
  const fallback = { type: "object", properties: {} };
  if (!schema || typeof schema !== "object" || Array.isArray(schema)) return fallback;
  const s = schema as Record<string, unknown>;
  if (s.type === "object" && !s.properties) {
    return { ...s, properties: {} };
  }
  return s;
}

function normalizeOpenAIReasoningEffort(effort: unknown): string | undefined {
  if (typeof effort !== "string") return undefined;
  const normalized = effort.toLowerCase();
  return normalized || undefined;
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((entry): entry is string => typeof entry === "string")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function convertClaudeServerWebSearchTool(tool: JsonRecord): JsonRecord {
  const allowedDomains = toStringArray(tool.allowed_domains);
  const blockedDomains = toStringArray(tool.blocked_domains);
  const filters: JsonRecord = {};
  if (allowedDomains.length > 0) filters.allowed_domains = allowedDomains;
  if (blockedDomains.length > 0) filters.blocked_domains = blockedDomains;

  return {
    type: "web_search",
    ...(Object.keys(filters).length > 0 ? { filters } : {}),
    ...(tool.user_location &&
    typeof tool.user_location === "object" &&
    !Array.isArray(tool.user_location)
      ? { user_location: tool.user_location }
      : {}),
  };
}

function hasClaudeServerWebSearchTool(tools: unknown): boolean {
  return Array.isArray(tools) && tools.some((tool) => isClaudeServerWebSearchTool(tool));
}

// Target formats whose translator understands the native web-search marker
// `{ type: "web_search" }` that convertClaudeServerWebSearchTool emits: OpenAI
// Responses consumes it directly, and the Gemini/Antigravity lane maps it to
// Google Search grounding (`{ googleSearch: {} }`) in
// geminiToolsSanitizer.ts::toGeminiGoogleSearchTool. Every other target keeps
// receiving the plain `web_search` function the server tool degrades to.
const NATIVE_WEB_SEARCH_TARGET_FORMATS = new Set<string>([
  FORMATS.OPENAI_RESPONSES,
  FORMATS.GEMINI,
  FORMATS.ANTIGRAVITY,
]);

function nativeWebSearchTargetFormat(credentials: unknown): string | null {
  if (credentials === null || typeof credentials !== "object" || Array.isArray(credentials)) {
    return null;
  }
  const targetFormat = (credentials as JsonRecord)._targetFormat;
  return typeof targetFormat === "string" && NATIVE_WEB_SEARCH_TARGET_FORMATS.has(targetFormat)
    ? targetFormat
    : null;
}

// OpenAI service_tier values. Anthropic's "standard_only" has no OpenAI twin beyond
// "default"; "fast" is the alias the Codex billing/executor path already accepts.
const OPENAI_SERVICE_TIERS = new Set(["auto", "default", "flex", "priority", "scale"]);
const CLAUDE_TO_OPENAI_SERVICE_TIER: Record<string, string> = {
  standard_only: "default",
  fast: "priority",
};
// Only targets known to accept a top-level service_tier get it; strict
// OpenAI-compatible gateways reject unknown fields with a 400.
const SERVICE_TIER_PROVIDERS = new Set(["openai", "azure-openai", "codex"]);

/** Client service_tier to keep across the Claude → OpenAI pivot, or undefined to drop it. */
function resolveOpenAIServiceTier(tier: unknown, credentials: unknown): string | undefined {
  if (typeof tier !== "string") return undefined;
  const provider =
    credentials !== null && typeof credentials === "object" && !Array.isArray(credentials)
      ? (credentials as JsonRecord)._provider
      : undefined;
  if (typeof provider !== "string" || !SERVICE_TIER_PROVIDERS.has(provider)) return undefined;
  const normalized = tier.trim().toLowerCase();
  const mapped = CLAUDE_TO_OPENAI_SERVICE_TIER[normalized] ?? normalized;
  return OPENAI_SERVICE_TIERS.has(mapped) ? mapped : undefined;
}

// Convert Claude request to OpenAI format
export function claudeToOpenAIRequest(model, body, stream, credentials: unknown = null) {
  // #2069 — when the routed provider honors OpenAI-format cache_control breakpoints
  // (DashScope/alibaba, etc.) and the upstream caller requested preservation, keep
  // the client's cache_control markers on system + message text blocks instead of
  // collapsing them away during the Claude→OpenAI conversion.
  const preserveCacheControl =
    credentials !== null &&
    typeof credentials === "object" &&
    !Array.isArray(credentials) &&
    (credentials as JsonRecord)._preserveCacheControl === true;

  const result: {
    model: string;
    messages: JsonRecord[];
    stream: unknown;
    [key: string]: unknown;
  } = {
    model: model,
    messages: [],
    stream: stream,
  };

  // Max tokens
  if (body.max_tokens) {
    result.max_tokens = adjustMaxTokens(body);
  }

  // Temperature
  if (body.temperature !== undefined) {
    result.temperature = body.temperature;
  }
  if (body.top_p !== undefined) {
    result.top_p = body.top_p;
  }
  if (body.stop_sequences !== undefined) {
    result.stop = body.stop_sequences;
  }

  // System message
  if (body.system) {
    // When preserving cache_control for a caching-capable provider, and the client
    // tagged any system block, keep the array-of-blocks shape so the breakpoint
    // survives (DashScope reads cache_control off content blocks). Otherwise fall
    // back to the joined-string form expected by generic OpenAI providers (#2069).
    const systemHasCacheControl =
      preserveCacheControl &&
      Array.isArray(body.system) &&
      body.system.some((s) => s && typeof s === "object" && s.cache_control !== undefined);

    const systemContent = systemHasCacheControl
      ? body.system.map((s) => {
          // body.system may be a mixed array — handle string elements (and
          // null/non-object) defensively so we never drop text or throw.
          if (typeof s === "string") return { type: "text", text: stripAnthropicBillingHeader(s) };
          const rawText = s && typeof s === "object" ? (s as JsonRecord).text || "" : "";
          const block: JsonRecord = { type: "text", text: stripAnthropicBillingHeader(rawText) };
          if (s && typeof s === "object" && (s as JsonRecord).cache_control !== undefined) {
            block.cache_control = (s as JsonRecord).cache_control;
          }
          return block;
        })
      : Array.isArray(body.system)
        ? body.system
            .map((s) => stripAnthropicBillingHeader(s.text || ""))
            .filter(Boolean)
            .join("\n")
        : stripAnthropicBillingHeader(body.system);

    if (systemHasCacheControl || systemContent) {
      result.messages.push({
        role: "system",
        content: systemContent,
      });
    }
  }

  // #reasoning-bilingual: DeepSeek-V4 and similar models emit user-facing text in the
  // user's language (e.g. Korean) then continue with English planning/chain-of-thought
  // in the same content field instead of using reasoning_content. Same mitigation as
  // translator/response/openai-to-claude.ts's directivePreambleStripper.ts: when the
  // operator configured OMNIROUTE_SYSTEM_INSTRUCTION_APPEND, append it here to the
  // (system) message so the directive reaches the model on the /v1/messages (Claude
  // Messages -> OpenAI Chat Completions) path too.
  const systemAppend = process.env.OMNIROUTE_SYSTEM_INSTRUCTION_APPEND?.trim();
  if (systemAppend) {
    const sysIndex = result.messages.findIndex((m) => m.role === "system");
    if (sysIndex >= 0) {
      const sys = result.messages[sysIndex];
      if (typeof sys.content === "string") {
        sys.content = sys.content + "\n\n" + systemAppend;
      } else if (Array.isArray(sys.content)) {
        (sys.content as JsonRecord[]).push({ type: "text", text: systemAppend });
      } else {
        sys.content = systemAppend;
      }
    } else {
      result.messages.unshift({ role: "system", content: systemAppend });
    }
  }

  // Convert messages
  if (body.messages && Array.isArray(body.messages)) {
    for (let i = 0; i < body.messages.length; i++) {
      const msg = body.messages[i];
      const converted = convertClaudeMessage(msg, preserveCacheControl);
      if (converted) {
        // Claude Code hook contexts (SessionStart/PreToolUse) arrive as
        // role:"system" mid-array — strictly valid for the Anthropic Messages
        // API, but OpenAI-compatible upstreams reject a system turn after the
        // first message (HCP-Vision-Latest vLLM: 400 "System message must be
        // at the beginning."). Demote every system at index > 0 to "user",
        // keeping the content byte-identical; the index-0 system (the
        // translator-made one above, or one the client put first) stays.
        const demoteMidSystem = (out: JsonRecord) => {
          if (out.role === "system" && result.messages.length > 0) out.role = "user";
        };
        // Array return is tool/user elements only (never role:"system") — a
        // second system here would skip demotion while result.messages is
        // still empty and survive as a mid-array system.
        if (Array.isArray(converted)) {
          converted.forEach(demoteMidSystem);
          result.messages.push(...converted);
        } else {
          demoteMidSystem(converted);
          result.messages.push(converted);
        }
      }
    }
  }

  // #4714 / #4385: re-group every role:"tool" message immediately after the
  // assistant turn whose tool_calls issued it (dropping genuine orphans), then
  // fill placeholders for any tool_call left unanswered.
  result.messages = regroupToolMessages(result.messages);

  // Fix missing tool responses - OpenAI requires every tool_call to have a response.
  // Runs after regrouping so real results are already adjacent and only a truly
  // unanswered tool_call receives a "[No response received]" placeholder.
  fixMissingToolResponses(result.messages);

  // GLM-family gateways (Z.AI / Zhipu — fronted by opencode-go / opencode-zen /
  // glm-* targets) reject any payload whose messages array has NO role:"user"
  // turn with `400 [1214] The messages parameter is illegal`. Claude Code agent
  // loops legitimately produce such payloads: every inbound user turn carries
  // only tool_result blocks (translated to role:"tool") and context compression
  // can evict the original prompt. When the caller flags a GLM-family upstream
  // (_ensureUserTurn), append a minimal synthetic user turn so the request
  // satisfies the validator. Appending at the end keeps every earlier byte
  // identical for upstream prompt caches.
  const ensureUserTurn =
    credentials !== null &&
    typeof credentials === "object" &&
    !Array.isArray(credentials) &&
    (credentials as JsonRecord)._ensureUserTurn === true;
  if (ensureUserTurn && !result.messages.some((m) => m && m.role === "user")) {
    result.messages.push({ role: "user", content: "(continue)" });
  }

  const nativeWebSearchTarget = nativeWebSearchTargetFormat(credentials);
  const useResponsesWebSearch = nativeWebSearchTarget === FORMATS.OPENAI_RESPONSES;
  // Gemini/Antigravity grounding is enabled only when the Claude server tool is the
  // request's SOLE tool (the Claude Code WebSearch sub-request shape). An agent turn
  // that merely declares the server tool alongside its own functions must keep those
  // functions — grounding there would drop them (Antigravity 400s on a built-in tool
  // mixed with functionDeclarations), so the mixed case drops the server tool instead
  // and leaves the custom functions untouched, as it did before this lane existed.
  const geminiGroundingTarget =
    nativeWebSearchTarget === FORMATS.GEMINI || nativeWebSearchTarget === FORMATS.ANTIGRAVITY;
  const useGeminiGrounding = geminiGroundingTarget && isSoleClaudeServerWebSearchTool(body.tools);

  // Tools
  if (body.tools && Array.isArray(body.tools)) {
    const normalizedTools = body.tools
      .map((tool) => {
        if (isClaudeServerWebSearchTool(tool)) {
          if (useResponsesWebSearch || useGeminiGrounding) {
            return convertClaudeServerWebSearchTool(tool);
          }
          // Mixed Gemini/Antigravity request: drop the server tool rather than
          // degrade it to a plain `web_search` functionDeclaration (which the
          // Antigravity envelope then strips anyway) or enable grounding.
          if (geminiGroundingTarget) return null;
        }

        if (!tool || typeof tool !== "object" || Array.isArray(tool)) return null;
        const record = tool as JsonRecord;
        const name = typeof record.name === "string" ? record.name.trim() : "";
        if (!name) return null; // skip tools with empty/invalid name

        return {
          type: "function",
          function: {
            name,
            description: typeof record.description === "string" ? record.description : "", // fix: never null (#276)
            parameters: normalizeToolSchema(record.input_schema),
            // Preserve tool-level strict schema enforcement (9router#4172). Only booleans
            // carry over; omitted stays omitted (non-strict on Chat).
            ...chatStrictFrom(record),
          },
        };
      })
      .filter((tool): tool is JsonRecord => Boolean(tool));

    if (normalizedTools.length > 0) {
      result.tools = normalizedTools;
    }
  }

  // Tool choice
  if (body.tool_choice) {
    result.tool_choice = convertToolChoice(
      body.tool_choice,
      useResponsesWebSearch && hasClaudeServerWebSearchTool(body.tools)
    );
    // Claude carries the single-call restriction on tool_choice (9router#4171).
    if (body.tool_choice?.disable_parallel_tool_use === true) {
      result.parallel_tool_calls = false;
    }
  }

  // Reasoning effort: map Claude-side thinking controls to OpenAI reasoning_effort.
  // Priority: output_config.effort > enabled thinking budget > explicit opt-out fallback.
  // Budget buckets match the reverse mapping in thinkingBudget.ts::setCustomBudget.
  const outputEffort = normalizeOpenAIReasoningEffort(body.output_config?.effort) || "";
  if (outputEffort) {
    result.reasoning_effort = outputEffort;
  } else if (body.thinking?.type === "enabled" && typeof body.thinking.budget_tokens === "number") {
    const budget = body.thinking.budget_tokens;
    if (budget <= 0) {
      // disabled — leave reasoning_effort unset
    } else if (budget <= 1024) {
      result.reasoning_effort = "low";
    } else if (budget <= 10240) {
      result.reasoning_effort = "medium";
    } else if (budget < 131072) {
      result.reasoning_effort = "high";
    } else {
      result.reasoning_effort = "xhigh";
    }
  } else if (
    body.thinking?.type === "disabled" ||
    normalizeOpenAIReasoningEffort(body.reasoning_effort) === "none"
  ) {
    result.reasoning_effort = "none";
  }

  // Keep a client-sent tier across the pivot: billing reads it from the source body,
  // so dropping it here made the reported tier and the tier actually served diverge.
  const serviceTier = resolveOpenAIServiceTier(body.service_tier, credentials);
  if (serviceTier) result.service_tier = serviceTier;

  return result;
}

// #4714: Re-group tool result messages so every role:"tool" message sits
// immediately after the assistant message whose tool_calls issued it, in
// tool_calls order. Claude Code can issue parallel tool_use in one assistant turn
// but have their tool_result blocks arrive across SEPARATE user turns with
// interleaved text; the naive conversion then left a role:"tool" stranded after a
// user message, which OpenAI-compatible upstreams reject with 400 "Messages with
// role 'tool' must be a response to a preceding message with 'tool_calls'".
// Tool messages whose tool_call_id matches no assistant.tool_calls are dropped here
// (supersedes the standalone #4385 orphan filter — same drop behavior, plus ordering).
function regroupToolMessages(messages: JsonRecord[]): JsonRecord[] {
  // tool_call_id -> index of the assistant message that issued it (first wins).
  const callIdToAssistant = new Map<string, number>();
  messages.forEach((msg, idx) => {
    if (msg.role === "assistant" && Array.isArray(msg.tool_calls)) {
      for (const tc of msg.tool_calls as { id?: string }[]) {
        if (tc.id && !callIdToAssistant.has(String(tc.id))) {
          callIdToAssistant.set(String(tc.id), idx);
        }
      }
    }
  });

  // Collect tool messages per assistant index, keyed by tool_call_id (first result wins).
  const toolsByAssistant = new Map<number, Map<string, JsonRecord>>();
  for (const msg of messages) {
    if (msg.role !== "tool") continue;
    const callId = String(msg.tool_call_id ?? "");
    const assistantIdx = callIdToAssistant.get(callId);
    if (assistantIdx === undefined) continue; // orphan -> drop
    let group = toolsByAssistant.get(assistantIdx);
    if (!group) {
      group = new Map();
      toolsByAssistant.set(assistantIdx, group);
    }
    if (!group.has(callId)) group.set(callId, msg);
  }

  // Rebuild: keep non-tool messages in order; attach each assistant's tool results
  // immediately after it, ordered by the assistant's own tool_calls sequence.
  const out: JsonRecord[] = [];
  messages.forEach((msg, idx) => {
    if (msg.role === "tool") return; // moved into its assistant's group
    out.push(msg);
    if (msg.role === "assistant" && Array.isArray(msg.tool_calls)) {
      const group = toolsByAssistant.get(idx);
      if (group) {
        for (const tc of msg.tool_calls as { id?: string }[]) {
          const tool = tc.id ? group.get(String(tc.id)) : undefined;
          if (tool) out.push(tool);
        }
      }
    }
  });
  return out;
}

// Fix missing tool responses - add empty responses for tool_calls without responses
function fixMissingToolResponses(messages) {
  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    if (msg.role === "assistant" && msg.tool_calls && msg.tool_calls.length > 0) {
      const toolCallIds = msg.tool_calls.map((tc) => tc.id);

      // Collect all tool response IDs that IMMEDIATELY follow this assistant message
      const respondedIds = new Set();
      let insertPosition = i + 1;
      for (let j = i + 1; j < messages.length; j++) {
        const nextMsg = messages[j];
        if (nextMsg.role === "tool" && nextMsg.tool_call_id) {
          respondedIds.add(nextMsg.tool_call_id);
          insertPosition = j + 1;
        } else {
          break;
        }
      }

      // Find missing responses and insert them
      const missingIds = toolCallIds.filter((id) => !respondedIds.has(id));

      if (missingIds.length > 0) {
        const missingResponses = missingIds.map((id) => ({
          role: "tool",
          tool_call_id: id,
          content: "[No response received]",
        }));
        messages.splice(insertPosition, 0, ...missingResponses);
        i = insertPosition + missingResponses.length - 1;
      }
    }
  }
}

// Convert a Claude `document` block into an OpenAI content part. A base64 document
// (Claude Code sends PDFs this way) becomes the Chat Completions `file` part, which
// OpenAI accepts natively and geminiHelper turns into `inlineData`. Plain-text and URL
// documents become text, because OpenAI `file` parts only carry base64 data.
function convertClaudeDocumentBlock(block, preserveCacheControl = false): JsonRecord | null {
  const source = block?.source;
  const title = typeof block?.title === "string" && block.title ? block.title : null;
  let part: JsonRecord | null = null;

  if (source?.type === "base64" && typeof source.data === "string" && source.data) {
    const mediaType = source.media_type || "application/pdf";
    const file: JsonRecord = { file_data: `data:${mediaType};base64,${source.data}` };
    if (title) file.filename = title;
    part = { type: "file", file };
  } else if (source?.type === "text" && typeof source.data === "string" && source.data) {
    part = { type: "text", text: title ? `[${title}]\n${source.data}` : source.data };
  } else if (source?.type === "url" && typeof source.url === "string" && source.url) {
    part = { type: "text", text: `[Document${title ? `: ${title}` : ""}] ${source.url}` };
  }

  if (part && preserveCacheControl && block.cache_control !== undefined) {
    part.cache_control = block.cache_control;
  }
  return part;
}

// Text notice for Claude block types OpenAI Chat has no equivalent for (container_upload,
// newer types). Only the block type is echoed — sanitized and capped — never block data,
// so a crafted `type` string cannot smuggle instructions into the prompt.
function sanitizeBlockType(type: string): string {
  return type
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "")
    .slice(0, 64);
}

function buildOmittedBlocksNotice(types: string[]): string {
  const safe = new Set(types.map((t) => sanitizeBlockType(t) || "unsupported"));
  return [...safe].map((t) => `[${t} block omitted: not supported on this route]`).join("\n");
}

// Convert single Claude message - returns single message or array of messages
function convertClaudeMessage(msg, preserveCacheControl = false) {
  // Preserve system role for mid-conversation system turns (#6954).
  // Previously any role that wasn't "user" or "tool" was mapped to "assistant",
  // which misattributed system messages as assistant output.
  const role =
    msg.role === "user" || msg.role === "tool"
      ? "user"
      : msg.role === "system"
        ? "system"
        : "assistant";

  // Simple string content
  if (typeof msg.content === "string") {
    return { role, content: msg.content };
  }

  // Array content
  if (Array.isArray(msg.content)) {
    const parts = [];
    const toolCalls = [];
    const toolResults = [];
    const omittedTypes: string[] = [];
    let reasoningContent = null;

    for (const block of msg.content) {
      switch (block.type) {
        case "text": {
          const textPart: JsonRecord = { type: "text", text: block.text };
          // #2069 — carry the client's cache_control breakpoint through to
          // caching-capable OpenAI-format providers (DashScope/alibaba, etc.).
          if (preserveCacheControl && block.cache_control !== undefined) {
            textPart.cache_control = block.cache_control;
          }
          parts.push(textPart);
          break;
        }

        case "image":
          if (block.source?.type === "base64") {
            parts.push({
              type: "image_url",
              image_url: {
                url: `data:${block.source.media_type};base64,${block.source.data}`,
              },
            });
          } else if (block.source?.type === "url" && typeof block.source.url === "string") {
            parts.push({
              type: "image_url",
              image_url: {
                url: block.source.url,
              },
            });
          }
          break;

        case "document": {
          const documentPart = convertClaudeDocumentBlock(block, preserveCacheControl);
          if (documentPart) parts.push(documentPart);
          break;
        }

        case "thinking":
          reasoningContent = block.thinking || block.text || "";
          break;

        case "redacted_thinking":
          if (reasoningContent == null) {
            reasoningContent = "";
          }
          break;

        case "tool_use":
          toolCalls.push({
            id: block.id,
            type: "function",
            function: {
              name: block.name,
              arguments:
                typeof block.input === "string" ? block.input : JSON.stringify(block.input || {}),
            },
          });
          break;

        case "tool_result":
          let resultContent = "";
          if (typeof block.content === "string") {
            resultContent = block.content;
          } else if (Array.isArray(block.content)) {
            // Keep text in the tool message; lift any images out as a following user
            // turn (OpenAI `tool` messages can't carry images). Without this, an
            // image-only tool_result is JSON.stringify'd → base64 as text, which
            // causes "input exceeds the context window" errors in OpenAI-protocol
            // upstreams (port of decolua/9router#2123 by alican532).
            const textParts: string[] = [];
            let hasImage = false;
            let hasDocument = false;
            for (const c of block.content) {
              if (c.type === "text") {
                textParts.push(c.text);
              } else if (c.type === "image" && c.source?.type === "base64") {
                parts.push({
                  type: "image_url",
                  image_url: {
                    url: `data:${c.source.media_type};base64,${c.source.data}`,
                  },
                });
                hasImage = true;
              } else if (c.type === "image" && c.source?.type === "url" && c.source.url) {
                // Same lift for a URL source, which the `image` case above already accepts.
                // No scheme test here, unlike the Gemini side: OpenAI's image_url takes a
                // `data:` URI too, which is exactly what the base64 branch above emits.
                parts.push({ type: "image_url", image_url: { url: c.source.url } });
                hasImage = true;
              } else if (c.type === "document") {
                // Same lift for documents: a `tool` message cannot carry a file part.
                const documentPart = convertClaudeDocumentBlock(c);
                if (documentPart?.type === "text") {
                  textParts.push(documentPart.text as string);
                } else if (documentPart) {
                  parts.push(documentPart);
                  hasDocument = true;
                }
              }
            }
            resultContent =
              textParts.join("\n") ||
              (hasImage
                ? "[tool returned an image; see attached]"
                : hasDocument
                  ? "[tool returned a document; see attached]"
                  : JSON.stringify(block.content));
          } else if (block.content) {
            resultContent = JSON.stringify(block.content);
          }

          // The OpenAI tool role has no is_error field (strict upstreams reject
          // unknown message fields): keep the failure visible with a marker.
          if (block.is_error === true) {
            resultContent = resultContent
              ? `[tool_error: true]\n${resultContent}`
              : "[tool_error: true]";
          }

          toolResults.push({
            role: "tool",
            tool_call_id: block.tool_use_id,
            content: resultContent,
          });
          break;

        default:
          if (typeof block?.type === "string" && block.type) omittedTypes.push(block.type);
          break;
      }
    }

    // If has tool results, return array of tool messages
    if (toolResults.length > 0) {
      if (parts.length > 0) {
        const textContent = parts.length === 1 && parts[0].type === "text" ? parts[0].text : parts;
        return [...toolResults, { role: "user", content: textContent }];
      }
      return toolResults;
    }

    // If has tool calls, return assistant message with tool_calls
    if (toolCalls.length > 0) {
      const result: JsonRecord = { role: "assistant" };
      if (parts.length > 0) {
        result.content = parts.length === 1 && parts[0].type === "text" ? parts[0].text : parts;
      }
      result.tool_calls = toolCalls;
      if (reasoningContent !== null) {
        result.reasoning_content = reasoningContent;
      }
      return result;
    }

    // Return content
    if (parts.length > 0) {
      const result: JsonRecord = {
        role,
        content: parts.length === 1 && parts[0].type === "text" ? parts[0].text : parts,
      };
      if (reasoningContent !== null && role === "assistant") {
        result.reasoning_content = reasoningContent;
      }
      return result;
    }

    // Empty content array
    if (msg.content.length === 0) {
      const result: JsonRecord = { role, content: "" };
      if (reasoningContent !== null && role === "assistant") {
        result.reasoning_content = reasoningContent;
      }
      return result;
    }

    if (reasoningContent !== null && role === "assistant") {
      return { role, content: "", reasoning_content: reasoningContent };
    }

    // Only unsupported blocks: keep the turn with a notice instead of returning null,
    // which silently deleted it (and could leave the upstream with `messages: []`).
    if (omittedTypes.length > 0) {
      return { role, content: buildOmittedBlocksNotice(omittedTypes) };
    }
  }

  return null;
}

// Convert tool choice
function convertToolChoice(choice, hasServerWebSearch = false) {
  if (!choice) return "auto";
  if (typeof choice === "string") return choice;

  switch (choice.type) {
    case "auto":
      return "auto";
    case "none":
      return "none";
    case TOOL_CHOICE_ANY:
      return "required";
    case "tool":
      if (hasServerWebSearch && choice.name === "web_search") {
        return { type: "web_search" };
      }
      return { type: "function", function: { name: choice.name } };
    default:
      return "auto";
  }
}

// Register
register(FORMATS.CLAUDE, FORMATS.OPENAI, claudeToOpenAIRequest, null);

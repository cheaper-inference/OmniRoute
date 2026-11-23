import { DefaultExecutor } from "../default.ts";
import type { ExecuteInput, ExecutorExecuteResult, ProviderCredentials } from "../base.ts";
import { normalizeCodeBuddyResult } from "./sseNormalize.ts";

export const SENSITIVE_CONTENT_REJECTION =
  "抱歉，系统检测到您当前输入的信息存在敏感内容，我无法响应您的请求，请检查后重新输入";
export const LARGE_TOOL_METADATA_BYTES = 64 * 1024;
export const NEUTRAL_PROMPT =
  "You are a helpful AI assistant that helps with software engineering tasks.";
export const AGENT_PATTERN =
  /you are claude code|claude.?code.+official.+cli|anthropic.+official.+cli|anxthxropic.+official.+cli|you are (?:cursor|windsurf|cline|aider|continue|copilot|cody)|you are an? (?:ai )?(?:coding |code )?agent|cc_entrypoint\s*=\s*(?:cli|vscode|jetbrains|gui)|claude.?code.+issues|give feedback.+claude.?code|you are .{0,30}(?:powerful )?ai agent|orchestration capabilities|OhMyOpenCode|<agent-identity>|<Role>|<Behavior_Instructions>/i;

export const SYSTEM_PROMPT_MAX_LEN_ENV = "CODEBUDDY_SYSTEM_PROMPT_MAX_LEN";

export type SystemPromptRule = "agent" | "length";

/**
 * Optional length cap for caller system prompts. Off by default: a long
 * hand-written project/orchestration prompt is legitimate and used to be
 * silently swapped for NEUTRAL_PROMPT by a hard-coded 2000-char cut. Setting
 * CODEBUDDY_SYSTEM_PROMPT_MAX_LEN to an integer > 0 re-enables the cap; any
 * other value (unset, empty, 0, negative, non-integer) means "no length cap".
 */
export function resolveSystemPromptMaxLen(): number | null {
  const raw = process.env.CODEBUDDY_SYSTEM_PROMPT_MAX_LEN?.trim();
  if (!raw || !/^\d+$/.test(raw)) return null;
  const parsed = Number(raw);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : null;
}

/**
 * Decide whether a system prompt must be swapped for NEUTRAL_PROMPT and why.
 * Identity markers are authoritative regardless of the length cap.
 */
export function classifySystemPrompt(text: string, maxLen: number | null): SystemPromptRule | null {
  if (!text) return null;
  if (AGENT_PATTERN.test(text)) return "agent";
  if (maxLen !== null && text.length > maxLen) return "length";
  return null;
}

function describeReplacement(
  rule: SystemPromptRule,
  length: number,
  maxLen: number | null
): string {
  return rule === "agent"
    ? "agent identity marker"
    : `${length} chars > ${SYSTEM_PROMPT_MAX_LEN_ENV} (${maxLen})`;
}

function neutralizedContent(content: unknown): unknown {
  return typeof content === "string" ? NEUTRAL_PROMPT : [{ type: "text", text: NEUTRAL_PROMPT }];
}

/**
 * Replace every system prompt that transformRequest would have sent as-is
 * (i.e. not already neutralized) with NEUTRAL_PROMPT. Used for the one-shot
 * retry after Tencent's content filter rejects a request whose kept system
 * prompt is the likely trigger. Returns null when nothing would change.
 */
export function neutralizeKeptSystemPrompts(body: unknown): unknown | null {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const request = body as Record<string, unknown>;
  const maxLen = resolveSystemPromptMaxLen();
  const isKept = (content: unknown): boolean => {
    const text = flattenContent(content);
    return !!text && text !== NEUTRAL_PROMPT && classifySystemPrompt(text, maxLen) === null;
  };

  let changed = false;
  const next: Record<string, unknown> = { ...request };
  if (request.system && isKept(request.system)) {
    next.system = NEUTRAL_PROMPT;
    changed = true;
  }
  if (Array.isArray(request.messages)) {
    next.messages = (request.messages as Array<Record<string, unknown>>).map((message) => {
      if (!message || message.role !== "system" || !isKept(message.content)) return message;
      changed = true;
      return { ...message, content: neutralizedContent(message.content) };
    });
  }
  return changed ? next : null;
}

export function responseFromResult(result: ExecutorExecuteResult): Response {
  return result instanceof Response ? result : result.response;
}

export function credentialsFromResult(
  result: ExecutorExecuteResult,
  fallback: ProviderCredentials
): ProviderCredentials {
  if (result instanceof Response || !result.headers) return fallback;

  const authorization = Object.entries(result.headers).find(
    ([name]) => name.toLowerCase() === "authorization"
  )?.[1];
  if (!authorization?.startsWith("Bearer ")) return fallback;

  return {
    ...fallback,
    accessToken: authorization.slice("Bearer ".length),
    expiresAt: undefined,
  };
}

export function compactToolDescriptions(body: unknown): unknown | null {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;

  const request = body as Record<string, unknown>;
  if (!Array.isArray(request.tools) || request.tools.length === 0) return null;

  const originalTools = request.tools;
  try {
    const serializedTools = JSON.stringify(originalTools);
    if (new TextEncoder().encode(serializedTools).byteLength < LARGE_TOOL_METADATA_BYTES) {
      return null;
    }
  } catch {
    return null;
  }

  let tools: unknown[] | null = null;
  originalTools.forEach((tool, index) => {
    if (!tool || typeof tool !== "object" || Array.isArray(tool)) return;

    const declaration = tool as Record<string, unknown>;
    if (
      declaration.type !== "function" ||
      !declaration.function ||
      typeof declaration.function !== "object" ||
      Array.isArray(declaration.function)
    ) {
      return;
    }

    const toolFunction = declaration.function as Record<string, unknown>;
    if (!Object.prototype.hasOwnProperty.call(toolFunction, "description")) return;

    const compactFunction = { ...toolFunction };
    delete compactFunction.description;
    tools ??= originalTools.slice();
    tools[index] = { ...declaration, function: compactFunction };
  });

  return tools ? { ...request, tools } : null;
}

export async function isSensitiveContentRejection(response: Response): Promise<boolean> {
  if (response.status !== 400) return false;
  const responseText = await response
    .clone()
    .text()
    .catch(() => "");
  return responseText.includes(SENSITIVE_CONTENT_REJECTION);
}

export function flattenContent(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return (content as Array<Record<string, unknown>>)
      .map((b) => (b && typeof b.text === "string" ? b.text : ""))
      .join("\n");
  }
  return "";
}

/**
 * Shared base executor for CodeBuddy gateways (Tencent CN and International).
 *
 * Both speak OpenAI-compatible SSE over their respective gateways. Shared behavior:
 *  - forces stream: true (non-stream rejected with code 11101)
 *  - handles reasoning_effort (strips none/off, adds reasoning_summary:"auto")
 *  - sanitizes agent system prompts (identity markers; optional length cap via
 *    CODEBUDDY_SYSTEM_PROMPT_MAX_LEN) to avoid Tencent's content filter
 *  - proactively strips oversized tool descriptions (>64KB)
 *  - retries sensitive-content 400 rejections once with compact tool descriptions
 *    and/or the kept caller system prompt replaced by NEUTRAL_PROMPT
 *  - drops an empty `tools: []` and normalises SSE dirt (`finish_reason: ""`,
 *    empty `function_call` shells) on successful streams
 */
export class CodeBuddyBaseExecutor extends DefaultExecutor {
  constructor(providerId: string) {
    super(providerId);
  }

  async execute(input: ExecuteInput): Promise<ExecutorExecuteResult> {
    return normalizeCodeBuddyResult(await this.executeWithSensitiveRetry(input));
  }

  private async executeWithSensitiveRetry(input: ExecuteInput): Promise<ExecutorExecuteResult> {
    const result = await super.execute(input);
    if (!(await isSensitiveContentRejection(responseFromResult(result)))) {
      return result;
    }

    const compactBody = compactToolDescriptions(input.body);
    const neutralBody = neutralizeKeptSystemPrompts(compactBody ?? input.body);
    const retryBody = neutralBody ?? compactBody;
    if (!retryBody) return result;

    const logTag = (this.provider || "codebuddy").toUpperCase().replace(/-/g, "_");
    if (compactBody) {
      input.log?.debug?.(
        logTag,
        "Upstream rejected an oversized tool request as sensitive content; retrying with compact tool descriptions"
      );
    }
    if (neutralBody) {
      input.log?.warn?.(
        logTag,
        "Upstream rejected the request as sensitive content; retrying once with the caller system prompt replaced by a neutral one"
      );
    }
    return super.execute({
      ...input,
      body: retryBody,
      credentials: credentialsFromResult(result, input.credentials),
    });
  }

  transformRequest(
    model: string,
    body: unknown,
    stream: boolean,
    credentials: ProviderCredentials
  ): unknown {
    const transformed = super.transformRequest(model, body, stream, credentials);
    if (!transformed || typeof transformed !== "object" || Array.isArray(transformed)) {
      return transformed;
    }
    const out = transformed as Record<string, unknown>;
    out.stream = true;
    if (Array.isArray(out.tools) && out.tools.length === 0) delete out.tools;

    const eff = out.reasoning_effort;
    if (eff === "none" || eff === "off") {
      delete out.reasoning_effort;
    } else if (eff) {
      out.reasoning_summary = "auto";
    }

    // --- Agent system prompt replacement ---
    // Identity markers always trigger; the length cap only when the operator
    // opts in via CODEBUDDY_SYSTEM_PROMPT_MAX_LEN. Dropping the caller's system
    // prompt is destructive, so say which rule fired (never the prompt text).
    const maxLen = resolveSystemPromptMaxLen();
    const logTag = this.provider || "codebuddy";
    const shouldNeutralize = (text: string): boolean => {
      const rule = classifySystemPrompt(text, maxLen);
      if (!rule) return false;
      console.warn(
        `[${logTag}] system prompt replaced: ${describeReplacement(rule, text.length, maxLen)}`
      );
      return true;
    };

    if (out.system && shouldNeutralize(flattenContent(out.system))) {
      out.system = NEUTRAL_PROMPT;
    }

    if (Array.isArray(out.messages)) {
      out.messages = (out.messages as Array<Record<string, unknown>>).map((message) => {
        if (!message || message.role !== "system") return message;
        if (!shouldNeutralize(flattenContent(message.content))) return message;
        return { ...message, content: neutralizedContent(message.content) };
      });
    }

    // --- Strip oversized tool descriptions (>64KB) ---
    if (Array.isArray(out.tools) && out.tools.length > 0) {
      try {
        const s = JSON.stringify(out.tools);
        if (new TextEncoder().encode(s).byteLength >= 65536) {
          out.tools = (out.tools as Array<Record<string, unknown>>).map((tool) => {
            if (!tool || typeof tool !== "object" || Array.isArray(tool)) return tool;
            if (
              tool.type !== "function" ||
              !tool.function ||
              typeof tool.function !== "object" ||
              Array.isArray(tool.function)
            ) {
              return tool;
            }
            if (!Object.prototype.hasOwnProperty.call(tool.function, "description")) return tool;
            const cf = { ...(tool.function as Record<string, unknown>) };
            delete cf.description;
            return { ...tool, function: cf };
          });
        }
      } catch {}
    }

    return out;
  }
}

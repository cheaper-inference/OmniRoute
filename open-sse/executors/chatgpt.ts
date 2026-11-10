import { z } from "zod";
import {
  BaseExecutor,
  type ExecuteInput,
  type ProviderCredentials,
  type ExecutorLog,
} from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";
import { hasChatGptPlanScope } from "../config/chatgpt.ts";
import { getAccessToken, runWithOnPersist } from "../services/tokenRefresh.ts";
import { errorResponse } from "../utils/error.ts";

const record = z.record(z.string(), z.unknown());
const bodySchema = record;
const OMIT_FIELDS = [
  "background",
  "conversation",
  "max_output_tokens",
  "max_tokens",
  "max_completion_tokens",
  "max_tool_calls",
  "metadata",
  "moderation",
  "multi_agent",
  "prompt",
  "prompt_cache_retention",
  "safety_identifier",
  "temperature",
  "top_logprobs",
  "top_p",
  "truncation",
  "user",
  "previous_response_id",
];
const ALLOWED_TOOLS = new Set([
  "function",
  "custom",
  "namespace",
  "web_search",
  "web_search_preview",
]);

function checkTools(value: unknown, depth = 0): void {
  if (!Array.isArray(value) || depth > 5) throw new Error("Invalid ChatGPT tools.");
  for (const item of value) {
    const tool = record.parse(item);
    if (!ALLOWED_TOOLS.has(String(tool.type)))
      throw new Error(`ChatGPT does not support tool type: ${String(tool.type).slice(0, 60)}`);
    if (tool.type === "namespace") checkTools(tool.tools, depth + 1);
  }
}

export function prepareChatGptRequest(model: string, source: unknown) {
  const body: Record<string, unknown> = {
    ...bodySchema.parse(source),
    model,
    store: false,
    stream: true,
  };
  for (const key of Object.keys(body)) if (key.startsWith("_")) delete body[key];
  for (const key of OMIT_FIELDS) delete body[key];
  const input =
    typeof body.input === "string"
      ? [{ role: "user", content: body.input }]
      : Array.isArray(body.input)
        ? body.input
        : [];
  body.input = input.map((value) => {
    const item = record.parse(value);
    if (item.type === "additional_tools") checkTools(item.tools);
    // Preserve opaque reasoning and tool items; normalize only message roles.
    return item.role === "system" ? { ...item, role: "developer" } : { ...item };
  });
  if (body.tools !== undefined) {
    checkTools(body.tools);
    const tools = body.tools as Record<string, unknown>[];
    const clientTools = tools.filter((tool) => tool.type === "function" || tool.type === "custom");
    body.tools = tools.filter((tool) => tool.type !== "function" && tool.type !== "custom");
    if (clientTools.length)
      (body.input as unknown[]).unshift({ type: "additional_tools", tools: clientTools });
  }
  return body;
}

export class ChatGptExecutor extends BaseExecutor {
  constructor() {
    super("chatgpt", PROVIDERS.chatgpt);
  }

  buildUrl() {
    return "https://api.openai.com/v1/responses";
  }

  buildHeaders(credentials: ProviderCredentials) {
    return {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      Authorization: `Bearer ${credentials.accessToken}`,
      "User-Agent": "OmniRoute",
    };
  }

  transformRequest(model: string, body: unknown) {
    return prepareChatGptRequest(model, body);
  }

  async refreshCredentials(credentials: ProviderCredentials, log: ExecutorLog | null) {
    return getAccessToken("chatgpt", credentials, log);
  }

  /**
   * @executorRecovery native
   * @executorRecoveryReason Only gates the request before dispatch (session refresh, plan-usage scope, unsupported input or tools); every accepted payload delegates to the base recovery loop unchanged.
   * @executorRecoveryTest tests/unit/chatgpt-siwc.test.ts
   */
  async execute(input: ExecuteInput) {
    // Re-check the granted scope after rotation; a refresh can narrow permissions.
    let credentials = input.credentials;
    if (this.needsRefresh(credentials)) {
      try {
        const updated = await runWithOnPersist(
          input.onCredentialsRefreshed
            ? async (patch) => {
                await input.onCredentialsRefreshed!(patch);
              }
            : null,
          () => this.refreshCredentials(credentials, input.log || null)
        );
        if (!updated || !updated.accessToken)
          return errorResponse(401, "ChatGPT session could not be refreshed. Sign in again.");
        credentials = { ...credentials, ...updated };
      } catch {
        return errorResponse(503, "ChatGPT session refresh is temporarily unavailable.");
      }
    }
    if (!hasChatGptPlanScope(credentials.providerSpecificData?.scopes))
      return errorResponse(
        403,
        "ChatGPT plan usage has not been authorized. Sign in again and enable plan usage."
      );
    try {
      prepareChatGptRequest(input.model, input.body);
    } catch {
      return errorResponse(
        400,
        "This request contains unsupported ChatGPT input or tools. Check the ChatGPT preview limitations."
      );
    }
    return super.execute({ ...input, credentials, stream: true });
  }
}

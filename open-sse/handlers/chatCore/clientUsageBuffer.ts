/**
 * chatCore client usage buffer/estimate (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Extracted from handleChatCore's non-streaming success path: add a buffer to the response usage
 * and filter it for the client format (to prevent CLI context errors); if the provider returned no
 * usage block, fall back to estimating from the serialized content length. Mutates
 * `translatedResponse.usage` in place — byte-identical to the previous inline block, including the
 * `?.usage` guard, the `JSON.stringify(... || "")` content-length, and the `> 0` estimate gate.
 *
 * #8331 scoping: `addBufferToUsage()` now keeps the safety margin OUT of the client-visible
 * metering fields (prompt_tokens/input_tokens/total_tokens) for normal API clients, so billing
 * reflects real upstream usage. Claude-Code-compatible providers are the one exception — the
 * buffer's original purpose (see `usageTracking.ts` module docstring) is CLI context-window
 * headroom, and Claude Code's own context accounting reads the buffered number straight out of
 * the response `usage` block. `preserveContextBudgetInVisibleUsage` re-folds the computed
 * `context_budget_*` fields back into the visible fields for that one path only, before
 * `filterUsageForFormat()` strips the internal fields — every other caller keeps the real,
 * unbuffered #8331 numbers.
 */
import {
  addBufferToUsage as defaultAddBuffer,
  filterUsageForFormat as defaultFilterUsage,
  estimateUsage as defaultEstimateUsage,
  isEmptyUsage,
  sanitizeProviderUsageForRequest,
  type UsageLike,
} from "../../utils/usageTracking.ts";

type ResponseLike =
  | {
      usage?: unknown;
      choices?: Array<{ message?: { content?: unknown } }>;
    }
  | null
  | undefined;

export interface ClientUsageBufferDeps {
  addBufferToUsage: typeof defaultAddBuffer;
  filterUsageForFormat: typeof defaultFilterUsage;
  estimateUsage: typeof defaultEstimateUsage;
}

const DEFAULT_DEPS: ClientUsageBufferDeps = {
  addBufferToUsage: defaultAddBuffer,
  filterUsageForFormat: defaultFilterUsage,
  estimateUsage: defaultEstimateUsage,
};

/** context_budget_* → visible-field mapping folded back in for Claude-Code-compatible
 * responses only (see module docstring above). */
const CONTEXT_BUDGET_TO_VISIBLE_FIELD: Record<string, string> = {
  context_budget_prompt_tokens: "prompt_tokens",
  context_budget_input_tokens: "input_tokens",
  context_budget_total_tokens: "total_tokens",
};

function foldContextBudgetIntoVisibleUsage(usage: Record<string, unknown>): void {
  for (const [budgetField, visibleField] of Object.entries(CONTEXT_BUDGET_TO_VISIBLE_FIELD)) {
    const value = usage[budgetField];
    if (typeof value === "number") {
      usage[visibleField] = value;
    }
  }
}

export interface ApplyClientUsageBufferOptions {
  /** Claude-Code-compatible providers only (#8331 scoping) — see module docstring. */
  preserveContextBudgetInVisibleUsage?: boolean;
}

// The reply text in whichever shape the client gets: Chat message, Claude content blocks, or
// Responses output items. Measuring only the Chat shape made every other reply look empty.
function replyText(response: ResponseLike): unknown {
  const body = response as {
    choices?: Array<{ message?: { content?: unknown } }>;
    content?: Array<{ text?: unknown }>;
    output?: Array<{ content?: Array<{ text?: unknown }> }>;
  } | null;
  const chat = body?.choices?.[0]?.message?.content;
  if (chat) return chat;
  const texts: string[] = [];
  for (const block of Array.isArray(body?.content) ? body.content : []) {
    if (typeof block?.text === "string") texts.push(block.text);
  }
  for (const item of Array.isArray(body?.output) ? body.output : []) {
    for (const part of Array.isArray(item?.content) ? item.content : []) {
      if (typeof part?.text === "string") texts.push(part.text);
    }
  }
  return texts.join("");
}

export function applyClientUsageBuffer(
  translatedResponse: ResponseLike,
  body: unknown,
  clientResponseFormat: string,
  options: ApplyClientUsageBufferOptions = {},
  deps: ClientUsageBufferDeps = DEFAULT_DEPS
): void {
  const { preserveContextBudgetInVisibleUsage = false } = options;
  if (translatedResponse?.usage) {
    translatedResponse.usage = sanitizeProviderUsageForRequest(
      translatedResponse.usage as UsageLike,
      body,
      clientResponseFormat
    );
  }

  // Add buffer and filter usage for client (to prevent CLI context errors)
  if (translatedResponse?.usage && !isEmptyUsage(translatedResponse.usage as UsageLike)) {
    const buffered = deps.addBufferToUsage(translatedResponse.usage as UsageLike) as Record<
      string,
      unknown
    >;
    if (preserveContextBudgetInVisibleUsage) {
      foldContextBudgetIntoVisibleUsage(buffered);
    }
    translatedResponse.usage = deps.filterUsageForFormat(buffered, clientResponseFormat);
  } else {
    // Fallback: estimate usage when provider returned no usage block
    // (or an all-zero stub — common for cookie/web reverse-engineered providers).
    const contentLength = JSON.stringify(replyText(translatedResponse) || "").length;
    // A Gemini body already reports usageMetadata; a second top-level `usage` key is noise.
    const hasGeminiUsage = !!(translatedResponse as { usageMetadata?: unknown } | null)
      ?.usageMetadata;
    if (contentLength > 0 && !hasGeminiUsage) {
      const estimated = deps.estimateUsage(body, contentLength, clientResponseFormat);
      translatedResponse.usage = deps.filterUsageForFormat(estimated, clientResponseFormat);
    }
  }
}

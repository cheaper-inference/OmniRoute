// Nonce binding, schema validation and malformed-envelope detection for DeepSeek Web tool
// calls (#15448). Split from deepseekWebTools.ts so the parser stays under its size cap;
// deepseekWebTools.ts re-exports the public detectors.

import {
  getRequestedToolNames,
  getToolNonce,
  parseLooseJsonObject,
  resolveRequestedToolName,
  type OpenAIToolCall,
} from "./webTools.ts";
import { asRecord, validateToolArguments, type OpenAIToolDef } from "./toolArgValidation.ts";

// Nonce/schema plumbing shared with every other emulated-tool-calling provider;
// re-exported here so this module's public surface is unchanged.
export { asRecord, validateToolArguments };
export type { OpenAIToolDef };

/**
 * Binding-aware finaliser for the shared tag/DSML path.
 *
 * `finalizeParsedToolCalls` holds every call to the full nonce + schema contract, which is correct
 * for the shapes this fork parses but rejects upstream's nameless `<tool>`/`<parameter>` shape that
 * carries no JSON body to bind. This variant applies the full contract only to calls whose
 * ARGUMENTS carry `_nonce`, and leaves the rest to upstream's own policy. Note the canonical
 * `<tool>{"name",…,"_nonce"}</tool>` envelope puts `_nonce` at the envelope top level: the shared
 * webTools parser checks it there (only when present) and strips it, so those calls reach this
 * function without `_nonce` and are NOT schema-validated.
 */
export function finalizeBoundCalls(
  rawText: string,
  parsed: { content: string; toolCalls: OpenAIToolCall[] | null },
  requestedTools: unknown
): { content: string; toolCalls: OpenAIToolCall[] | null } {
  if (!parsed.toolCalls) return parsed;
  const nonce = getToolNonce(requestedTools);
  const cleaned: OpenAIToolCall[] = [];
  for (const call of parsed.toolCalls) {
    const args = parseLooseJsonObject(call.function.arguments);
    if (!args) return { content: rawText, toolCalls: null };
    if (!("_nonce" in args)) {
      cleaned.push(call);
      continue;
    }
    if (args._nonce !== nonce) return { content: rawText, toolCalls: null };
    const { _nonce: _boundNonce, ...rest } = args;
    if (!validateToolArguments(requestedTools, call.function.name, rest)) {
      return { content: rawText, toolCalls: null };
    }
    cleaned.push({ ...call, function: { ...call.function, arguments: JSON.stringify(rest) } });
  }
  return { content: parsed.content, toolCalls: cleaned };
}

export function finalizeParsedToolCalls(
  rawText: string,
  parsed: { content: string; toolCalls: OpenAIToolCall[] | null },
  requestedTools: unknown
): { content: string; toolCalls: OpenAIToolCall[] | null } {
  if (!parsed.toolCalls) return parsed;
  const nonce = getToolNonce(requestedTools);
  const cleaned: OpenAIToolCall[] = [];

  for (const call of parsed.toolCalls) {
    const args = parseLooseJsonObject(call.function.arguments);
    if (!args) return { content: rawText, toolCalls: null };
    const nestedNonce = args._nonce;
    if (nestedNonce !== undefined && nestedNonce !== nonce) {
      return { content: rawText, toolCalls: null };
    }
    const { _nonce: _boundNonce, ...cleanArgs } = args;
    if (!validateToolArguments(requestedTools, call.function.name, cleanArgs)) {
      return { content: rawText, toolCalls: null };
    }
    cleaned.push({
      ...call,
      function: { ...call.function, arguments: JSON.stringify(cleanArgs) },
    });
  }

  return { content: parsed.content, toolCalls: cleaned };
}

export function hasMalformedDeepSeekToolMarkup(text: string): boolean {
  if (typeof text !== "string" || !text.trim()) return false;
  // `\s*`: DeepSeek emits both `<|DSML| invoke` and the no-space `<|DSML|invoke`.
  if (/<\/?(?:｜｜|\|\|?)DSML(?:｜｜|\|\|?)\s*(?:calls|invoke|parameter)\b/i.test(text)) {
    return true;
  }
  return /<\/?(?:tool|tool_call)(?::|\s|>)/i.test(text);
}

/** True only for output shapes that express tool intent but failed safe parsing. */
export function hasMalformedDeepSeekToolIntent(text: string, requestedTools: unknown): boolean {
  if (hasMalformedDeepSeekToolMarkup(text)) return true;
  if (typeof text !== "string" || !text.trim()) return false;

  const parsed = parseLooseJsonObject(text);
  if (!parsed || parsed.arguments === undefined) return false;
  const emittedName =
    [parsed.name, parsed.command].find(
      (value): value is string => typeof value === "string" && value.length > 0
    ) ?? null;
  return (
    !!emittedName && !!resolveRequestedToolName(emittedName, getRequestedToolNames(requestedTools))
  );
}

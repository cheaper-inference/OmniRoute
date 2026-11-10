// Fields that, when literally named in an upstream 400 body, are safe to strip and
// retry once (FCC NIM-style recovery). Mirrors the existing context_management 400
// fallback in base.ts, generalized to these OpenAI-compat / NIM reasoning fields.
// `context_management` (9router#1468): Claude Code sends it top-level; strict
// anthropic-compatible gateways 400 with "context_management: Extra inputs are not
// permitted". The dedicated base.ts fallback only fires when OmniRoute's own
// contextEditing feature is enabled, so a client-sent field passed through
// untouched when the feature is off — this generic strip covers that case.
export const KNOWN_OFFENDING_FIELDS: readonly string[] = [
  "reasoning_budget",
  // OpenAI's reasoning-effort knob, sent top-level on Chat Completions.
  // Strict OpenAI-compatible gateways that don't implement it 400 with
  // "Unsupported parameter: reasoning_effort" — findOffendingField() must
  // recognize it so the reactive strip-and-retry in base.ts fires instead
  // of surfacing the 400 to the client.
  "reasoning_effort",
  "chat_template",
  "reasoning_content",
  "context_management",
  // GPT-5's Chat Completions-only output control. It can be present when a
  // routing rule substitutes a non-GPT OpenAI-compatible target (for example
  // Codex → GLM or Ollama Cloud), whose strict endpoint rejects it as an extra
  // field. Retrying without it is safe because it only changes output style.
  "verbosity",
  // Claude Code's top-level telemetry object. paramSupport.ts drops it up front
  // for claude-* model ids; this catches Claude-shaped gateways whose model id
  // does not contain "claude" and 400 with "diagnostics: Extra inputs are not
  // permitted".
  "diagnostics",
];

/** Return the first known-offending field literally named in a 400 body, or null. */
export function findOffendingField(bodyText: string): string | null {
  if (typeof bodyText !== "string" || !bodyText) return null;
  for (const field of KNOWN_OFFENDING_FIELDS) {
    if (bodyText.includes(field)) return field;
  }
  return null;
}

/**
 * Regex to extract an unsupported parameter name from upstream 400 error text.
 * Matches:
 *   - "Unsupported parameter(s): thinking"
 *   - "Unsupported parameter: max_tokens"
 *   - "Unsupported parameter 'reasoning_budget'"
 */
export const UNSUPPORTED_PARAM_RE =
  /unsupported\s+parameter\w*(?:\s*\(s\))?[:\s]+["'`]?(\w+)["'`]?/i;

/**
 * Anthropic's wording for a retired sampling param:
 *   "`temperature` is deprecated for this model."
 * The name must be backtick-quoted so plain prose never matches.
 */
export const DEPRECATED_PARAM_RE = /`(\w+)`\s+is\s+deprecated\b/i;

// Stripping these changes what is asked, not how, so auto-learn must never block them.
const NON_STRIPPABLE_PARAMS = new Set([
  "model",
  "messages",
  "input",
  "contents",
  "system",
  "stream",
]);

/**
 * Extract a single unsupported parameter name from a 400 error body,
 * or null if the error does not match a known pattern.
 */
export function detectUnsupportedParam(bodyText: string): string | null {
  if (typeof bodyText !== "string" || !bodyText) return null;
  const name =
    UNSUPPORTED_PARAM_RE.exec(bodyText)?.[1] ?? DEPRECATED_PARAM_RE.exec(bodyText)?.[1] ?? null;
  return name && !NON_STRIPPABLE_PARAMS.has(name.toLowerCase()) ? name : null;
}

/**
 * Groq names a rejected per-message field as
 *   `'messages.3' : property 'reasoning_content' is unsupported`.
 * Every quantifier is bounded and the field class excludes quotes (ReDoS-safe).
 */
const MESSAGE_PROPERTY_REJECTED_RE =
  /messages\.\d{1,6}['"`]?\s{0,4}:\s{0,4}property\s{1,4}['"`]([A-Za-z0-9_]{1,64})['"`]\s{1,4}(?:is|was)\s{1,4}(?:unsupported|not\s{1,4}supported)/gi;

const MESSAGE_FIELD_NAME_RE = /^[a-z_][a-z0-9_]{0,63}$/;

// Removing these changes what a message says, not how it is encoded.
const NON_STRIPPABLE_MESSAGE_FIELDS = new Set(["content", "role", "tool_calls", "tool_call_id"]);

/** pydantic/FastAPI `extra_forbidden` entries whose `loc` passes through `messages`. */
function extraForbiddenMessageFields(bodyText: string): string[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(bodyText);
  } catch {
    return [];
  }
  if (!parsed || typeof parsed !== "object") return [];
  const record = parsed as { detail?: unknown; error?: { detail?: unknown } | null };
  const detail = Array.isArray(record.detail) ? record.detail : record.error?.detail;
  if (!Array.isArray(detail)) return [];
  const fields: string[] = [];
  for (const entry of detail) {
    const item = entry as { type?: unknown; loc?: unknown } | null;
    if (item?.type !== "extra_forbidden" || !Array.isArray(item.loc)) continue;
    if (!item.loc.includes("messages")) continue;
    const last = item.loc[item.loc.length - 1];
    if (typeof last === "string") fields.push(last);
  }
  return fields;
}

/**
 * Field names an upstream 400 rejects on individual `messages[*]` entries. Only
 * snake_case names up to 64 chars are returned, never semantic message fields.
 */
export function detectRejectedMessageFields(bodyText: string): string[] {
  if (typeof bodyText !== "string" || !bodyText) return [];
  const candidates = [
    ...Array.from(bodyText.matchAll(MESSAGE_PROPERTY_REJECTED_RE), (match) => match[1]),
    ...extraForbiddenMessageFields(bodyText),
  ];
  const fields = new Set<string>();
  for (const name of candidates) {
    if (MESSAGE_FIELD_NAME_RE.test(name) && !NON_STRIPPABLE_MESSAGE_FIELDS.has(name)) {
      fields.add(name);
    }
  }
  return [...fields];
}

/**
 * Reasoning fields a request can carry into an OpenAI-compatible upstream. Ordered
 * most to least common so the retry drops the real one first when several are set.
 */
export const REASONING_REQUEST_FIELDS: readonly string[] = [
  "reasoning_effort",
  "reasoning",
  "thinking",
  "think",
];

/**
 * Some upstreams reject thinking by naming the MODEL, not the offending field, so
 * neither `findOffendingField` nor `detectUnsupportedParam` can see anything to strip.
 * Ollama does this for non-thinking models such as Qwen3-Coder (an Instruct-only
 * build): `"Qwen3-Coder:latest" does not support thinking`. Matches:
 *   - `"<model>" does not support thinking`
 *   - `model X does not support reasoning`
 */
export const UNSUPPORTED_THINKING_RE = /does\s+not\s+support\s+(?:thinking|reasoning)\b/i;

/** True when a 400 body says the model has no thinking mode at all. */
export function isUnsupportedThinkingError(bodyText: string): boolean {
  if (typeof bodyText !== "string" || !bodyText) return false;
  return UNSUPPORTED_THINKING_RE.test(bodyText);
}

/**
 * Anthropic's 400 message when a request carries an `advisor_redacted_result` whose
 * `encrypted_content` was produced by a different organization.
 */
export const ADVISOR_UNDECRYPTABLE_MESSAGE = "Advisor tool result content could not be processed.";

/** True when a 400 body is Anthropic's undecryptable-advisor-result error. */
export function isAdvisorUndecryptableError(bodyText: string): boolean {
  if (typeof bodyText !== "string" || !bodyText) return false;
  try {
    const parsed = JSON.parse(bodyText) as { error?: { message?: unknown } };
    return parsed?.error?.message === ADVISOR_UNDECRYPTABLE_MESSAGE;
  } catch {
    return false;
  }
}

/**
 * Replace the content of every `advisor_tool_result` block that holds an encrypted
 * `advisor_redacted_result` with an `advisor_tool_result_error` (`unavailable`). The
 * paired `server_tool_use` and every other block stay as they are, so the message
 * structure is unchanged. Returns the same body when nothing was replaced.
 */
export function replaceRedactedAdvisorResults<T>(body: T): { body: T; replaced: number } {
  const messages = (body as { messages?: unknown } | null)?.messages;
  if (!Array.isArray(messages)) return { body, replaced: 0 };
  let replaced = 0;
  const nextMessages = messages.map((message) => {
    const content = (message as { content?: unknown } | null)?.content;
    if (!Array.isArray(content)) return message;
    let changed = false;
    const nextContent = content.map((block) => {
      const b = block as { type?: unknown; content?: { type?: unknown } } | null;
      if (b?.type !== "advisor_tool_result" || b.content?.type !== "advisor_redacted_result") {
        return block;
      }
      changed = true;
      replaced += 1;
      return {
        ...b,
        content: { type: "advisor_tool_result_error", error_code: "unavailable" },
      };
    });
    return changed ? { ...(message as object), content: nextContent } : message;
  });
  if (replaced === 0) return { body, replaced: 0 };
  return { body: { ...(body as object), messages: nextMessages } as T, replaced };
}
/** Immutably drop request fields Groq rejects with a 400. */
export function stripGroqUnsupportedFields<T extends Record<string, unknown>>(
  body: T,
  model?: string,
  forcedEffort?: string
): T {
  if (!body || typeof body !== "object") return body;
  const next: Record<string, unknown> = { ...body };
  delete next.logprobs;
  delete next.logit_bias;
  delete next.top_logprobs;
  // Groq Chat Completions accepts reasoning_effort, not the other protocol envelopes.
  const requestedEffort =
    forcedEffort ??
    next.reasoning_effort ??
    (next.reasoning as Record<string, unknown> | undefined)?.effort ??
    (next.output_config as Record<string, unknown> | undefined)?.effort;
  if (model === "openai/gpt-oss-20b" && (requestedEffort === "none" || requestedEffort === "low")) {
    next.reasoning_effort = "low";
  }
  delete next.reasoning;
  delete next.output_config;
  if (Array.isArray(next.messages)) {
    next.messages = next.messages.map((m) => {
      if (m && typeof m === "object") {
        const {
          name: _name,
          model: _model,
          messageId: _msgId,
          sender: _sender,
          // Groq rejects replayed reasoning on any message:
          // "'messages.N' : property 'reasoning_content' is unsupported".
          reasoning_content: _reasoningContent,
          ...rest
        } = m as Record<string, unknown>;

        return rest;
      }

      return m;
    });
  }
  return next as T;
}

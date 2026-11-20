/**
 * Request bodies and answer parsing for the two decision wires.
 *
 *   - `systemone`: POST `{base}/v1/systemone` with `{model, state, questions}` and an
 *     `answers.route` choice back (TypeSafe System One contract, also served by
 *     OmniRoute's own `/v1/systemone`).
 *   - `openai-chat`: any OpenAI-compatible chat-completions endpoint. The question is
 *     serialized into a strict JSON prompt and `choices[0].message.content` is parsed back
 *     (#15641 adapters: `OPENAI_DECISION_SYSTEM_PROMPT`, `extractJsonObject`,
 *     `normalizeAnswer`). The in-process `combo-model` decider uses the same prompt.
 *
 * Envelopes are validated with zod; anything unusable becomes `invalid_response`, a choice
 * outside the menu `out_of_menu`, an explicit refusal `refused`.
 */
import { z } from "zod";

import {
  toLoggableModelName,
  type DecisionChoiceRequest,
  type DecisionChoiceResult,
  DEFAULT_DECISION_INSTRUCTIONS,
} from "./types.ts";

/** Small answer budget: the decider only returns one JSON object. */
export const DECISION_MAX_OUTPUT_TOKENS = 256;

export const OPENAI_DECISION_SYSTEM_PROMPT =
  "You are a decision oracle. Answer each atomic question about the provided state. " +
  "Respond with ONLY one JSON object of the form " +
  '{"answers":{"<question id>": <answer>}}. For a question of type "noul" the answer is ' +
  '{"noul": <probability between 0 and 1>}. For "choice" it is ' +
  '{"choice": "<one of the provided criteria keys>", "confidence": <0..1>}. For "score" it is ' +
  '{"score": <number>}. Include every question id. Never add prose, markdown fences, or extra keys.';

export type ParsedDecisionAnswer =
  | {
      kind: "choice";
      choice: string;
      confidence: number;
      probabilities: Record<string, number>;
      backendModel?: string;
    }
  | { kind: "refusal"; backendModel?: string }
  | null;

const numberMapSchema = z.record(z.string(), z.number().finite());

/** Clamp to [0, 1]; non-finite input yields null. */
function clampUnit(value: unknown): number | null {
  const parsed = typeof value === "number" ? value : Number.NaN;
  if (!Number.isFinite(parsed)) return null;
  return Math.min(1, Math.max(0, parsed));
}

function routeQuestion(request: DecisionChoiceRequest) {
  return {
    type: "choice",
    instructions: request.instructions?.trim() || DEFAULT_DECISION_INSTRUCTIONS,
    criteria: request.options,
  };
}

function backendModelOf(value: unknown): string | undefined {
  return toLoggableModelName(value);
}

/**
 * Normalize one `route` answer. A missing `confidence` becomes 0, not 1: a decider that
 * cannot report confidence must never satisfy a confidence-gated decision (#15641).
 */
export function normalizeRouteAnswer(raw: unknown, model?: unknown): ParsedDecisionAnswer {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return null;
  const record = raw as Record<string, unknown>;
  const backendModel = backendModelOf(model);
  if (record.type === "refusal") return { kind: "refusal", ...(backendModel && { backendModel }) };
  if (record.type !== undefined && record.type !== "choice") return null;
  const choice = typeof record.choice === "string" ? record.choice.trim() : "";
  if (!choice) return null;
  const probabilities = numberMapSchema.safeParse(record.probabilities);
  return {
    kind: "choice",
    choice,
    confidence: clampUnit(record.confidence) ?? 0,
    probabilities: probabilities.success ? probabilities.data : {},
    ...(backendModel && { backendModel }),
  };
}

// ── systemone wire ──────────────────────────────────────────────────────────

export function buildSystemOneWireBody(model: string, request: DecisionChoiceRequest) {
  return { model, state: request.state, questions: { route: routeQuestion(request) } };
}

const SystemOneEnvelopeSchema = z.object({
  model: z.unknown().optional(),
  answers: z.record(z.string(), z.unknown()),
});

export function parseSystemOneWireAnswer(data: unknown): ParsedDecisionAnswer {
  const parsed = SystemOneEnvelopeSchema.safeParse(data);
  if (!parsed.success) return null;
  return normalizeRouteAnswer(parsed.data.answers.route, parsed.data.model);
}

// ── openai-chat wire ────────────────────────────────────────────────────────

/** Chat-completions URL from an API root; tolerates a root ending in /v1 or the full path. */
export function resolveChatCompletionsUrl(baseUrl: string): string {
  if (baseUrl.endsWith("/chat/completions")) return baseUrl;
  if (baseUrl.endsWith("/v1")) return `${baseUrl}/chat/completions`;
  return `${baseUrl}/v1/chat/completions`;
}

/** Extract a JSON object from model text that may carry fences or surrounding prose. */
export function extractJsonObject(text: string): unknown {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced ? fenced[1].trim() : trimmed;
  try {
    return JSON.parse(candidate);
  } catch {
    const start = candidate.indexOf("{");
    const end = candidate.lastIndexOf("}");
    if (start === -1 || end <= start) return null;
    try {
      return JSON.parse(candidate.slice(start, end + 1));
    } catch {
      return null;
    }
  }
}

/** The two chat messages of a decision call: strict JSON system prompt + state and question. */
export function buildOpenAiDecisionMessages(request: DecisionChoiceRequest) {
  const questions = JSON.stringify({ route: routeQuestion(request) }, null, 2);
  return [
    { role: "system", content: OPENAI_DECISION_SYSTEM_PROMPT },
    { role: "user", content: `STATE:\n${request.state}\n\nQUESTIONS:\n${questions}` },
  ];
}

/** Non-streaming, tool-free, deterministic chat body for a decision call. */
export function buildOpenAiChatWireBody(model: string, request: DecisionChoiceRequest) {
  return {
    model,
    stream: false,
    temperature: 0,
    max_tokens: DECISION_MAX_OUTPUT_TOKENS,
    messages: buildOpenAiDecisionMessages(request),
  };
}

const ContentPartSchema = z.union([z.string(), z.object({ text: z.string() })]);
const OpenAiEnvelopeSchema = z.object({
  model: z.unknown().optional(),
  choices: z
    .array(
      z.object({
        message: z
          .object({ content: z.union([z.string(), z.array(ContentPartSchema)]).nullish() })
          .optional(),
      })
    )
    .min(1),
});

/** Parse a decision answer out of assistant text (fences and prose tolerated). */
export function parseDecisionAnswerText(text: string, model?: unknown): ParsedDecisionAnswer {
  const json = extractJsonObject(text) as { answers?: { route?: unknown } } | null;
  if (!json || typeof json !== "object") return null;
  return normalizeRouteAnswer(json.answers?.route, model);
}

export function parseOpenAiChatWireAnswer(data: unknown): ParsedDecisionAnswer {
  const parsed = OpenAiEnvelopeSchema.safeParse(data);
  if (!parsed.success) return null;
  const content = parsed.data.choices[0].message?.content;
  const text =
    typeof content === "string"
      ? content
      : Array.isArray(content)
        ? content.map((part) => (typeof part === "string" ? part : part.text)).join("\n")
        : "";
  return text.trim() ? parseDecisionAnswerText(text, parsed.data.model) : null;
}

// ── shared ──────────────────────────────────────────────────────────────────

/** Turn a parsed answer into the decider result; the choice must be a menu entry. */
export function toDecisionChoiceResult(
  answer: ParsedDecisionAnswer,
  request: DecisionChoiceRequest,
  latencyMs: number
): DecisionChoiceResult {
  if (!answer) return { ok: false, reason: "invalid_response", latencyMs };
  if (answer.kind === "refusal") return { ok: false, reason: "refused", latencyMs };
  if (!Object.prototype.hasOwnProperty.call(request.options, answer.choice)) {
    return { ok: false, reason: "out_of_menu", latencyMs };
  }
  return {
    ok: true,
    choice: answer.choice,
    confidence: answer.confidence,
    probabilities: answer.probabilities,
    ...(answer.backendModel && { backendModel: answer.backendModel }),
    latencyMs,
  };
}

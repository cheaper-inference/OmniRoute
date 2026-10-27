/**
 * System One typed answers and request-envelope validation.
 *
 * System One is not a chat model: a request carries `{ model, state, questions }`
 * and the response answers each question with a typed value — `noul` (yes/no),
 * `choice` (one option) or `score` (a level) — plus the calibrated probability
 * distribution, a confidence and token usage. All of that is the product, so the
 * parser preserves every field it can verify and reports anything else as
 * `invalid_response` rather than guessing.
 *
 * Both halves are pure. Nothing here logs, and no failure message may contain
 * the caller's `state` or `instructions`: the upstream echoes them in some error
 * bodies, and a decision request routinely carries the operator's own data.
 *
 * Reference: the choice-only client in `./systemOne.ts` (#15278) and the
 * TypeSafe API docs (https://docs.typesafe.ai/api).
 */

import { sanitizeErrorMessage } from "../../utils/error.ts";
import { systemOneBackend, type SystemOneLimits } from "../../config/systemOneRegistry.ts";

export const SYSTEMONE_QUESTION_TYPES = ["noul", "choice", "score"] as const;
export type SystemOneQuestionType = (typeof SYSTEMONE_QUESTION_TYPES)[number];

export type SystemOneProbabilities = Record<string, number>;

type AnswerCommon = {
  probabilities: SystemOneProbabilities | null;
  confidence: number | null;
};

export type SystemOneNoulAnswer = AnswerCommon & { type: "noul"; noul: number };
export type SystemOneChoiceAnswer = AnswerCommon & { type: "choice"; choice: string };
export type SystemOneScoreAnswer = AnswerCommon & {
  type: "score";
  score: number;
  legend: Record<string, unknown>;
};
export type SystemOneRefusalAnswer = {
  type: "refusal";
  probabilities: null;
  confidence: null;
};
export type SystemOneAnswer =
  SystemOneNoulAnswer | SystemOneChoiceAnswer | SystemOneScoreAnswer | SystemOneRefusalAnswer;

export type SystemOneUsage = {
  inputTokens: number | null;
  outputTokens: number | null;
  /** Upstream-reported cost in USD. A reported zero is a known zero, not unknown. */
  costUsd: number | null;
};

export type SystemOneAnswersSuccess = {
  ok: true;
  model: string | null;
  answers: Record<string, SystemOneAnswer>;
  usage: SystemOneUsage;
};

export type SystemOneAnswersFailure = {
  ok: false;
  reason: "invalid_response";
  /** Sanitized and free of request state — safe to log or return. */
  detail: string;
};

export type SystemOneAnswersResult = SystemOneAnswersSuccess | SystemOneAnswersFailure;

export type SystemOneValidation = { ok: true } | { ok: false; status: number; message: string };

const OK: SystemOneValidation = { ok: true };

function fail(message: string, status = 400): SystemOneValidation {
  return { ok: false, status, message };
}

function invalid(detail: string): SystemOneAnswersFailure {
  return { ok: false, reason: "invalid_response", detail: sanitizeErrorMessage(detail) || detail };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function finiteNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function isJsonValue(value: unknown, depth = 0): boolean {
  if (value === null || typeof value === "string" || typeof value === "boolean") return true;
  if (typeof value === "number") return Number.isFinite(value);
  if (depth >= 64) return false;
  if (Array.isArray(value)) return value.every((entry) => isJsonValue(entry, depth + 1));
  return isRecord(value) && Object.values(value).every((entry) => isJsonValue(entry, depth + 1));
}

function isContent(value: unknown): boolean {
  return (
    (typeof value === "string" || isRecord(value) || Array.isArray(value)) && isJsonValue(value)
  );
}

// Allow floating-point serialization/rounding without accepting a partial distribution.
const PROBABILITY_SUM_TOLERANCE = 1e-6;

/** A probability map must contain a normalized distribution between zero and one. */
function parseProbabilities(value: unknown): SystemOneProbabilities | null | "invalid" {
  if (value === undefined || value === null) return null;
  if (!isRecord(value)) return "invalid";
  const entries = Object.entries(value);
  let total = 0;
  for (const [, raw] of entries) {
    const probability = finiteNumber(raw);
    if (probability === null || probability < 0 || probability > 1) return "invalid";
    total += probability;
  }
  if (!entries.length || Math.abs(total - 1) > PROBABILITY_SUM_TOLERANCE) return "invalid";
  return Object.fromEntries(entries) as SystemOneProbabilities;
}

function parseConfidence(value: unknown): number | null | "invalid" {
  if (value === undefined || value === null) return null;
  const confidence = finiteNumber(value);
  if (confidence === null || confidence < 0 || confidence > 1) return "invalid";
  return confidence;
}

function parseAnswer(raw: unknown): SystemOneAnswer | SystemOneAnswersFailure {
  if (!isRecord(raw)) return invalid("System One answer was not an object");
  const type = raw.type;
  if (type === "refusal") return { type, probabilities: null, confidence: null };
  if (
    typeof type !== "string" ||
    !SYSTEMONE_QUESTION_TYPES.includes(type as SystemOneQuestionType)
  ) {
    return invalid("System One answer had an unsupported type");
  }

  const probabilities = parseProbabilities(raw.probabilities);
  if (probabilities === "invalid") {
    return invalid("System One answer had invalid probabilities");
  }
  const confidence = parseConfidence(raw.confidence);
  if (confidence === "invalid") {
    return invalid("System One answer had an out-of-range confidence");
  }
  const common = { probabilities, confidence };

  if (type === "noul") {
    const noul = finiteNumber(raw.noul);
    if (noul === null || noul < 0 || noul > 1) {
      return invalid("System One noul answer had no probability between 0 and 1");
    }
    return { type, noul, ...common };
  }
  if (probabilities === null || confidence === null) {
    return invalid("System One choice or score answer missing probabilities or confidence");
  }
  if (type === "choice") {
    const choice = typeof raw.choice === "string" ? raw.choice : "";
    if (!choice.trim()) return invalid("System One choice answer had an empty choice");
    if (
      !Object.hasOwn(probabilities, choice) ||
      Object.values(probabilities).some((probability) => probability > probabilities[choice])
    ) {
      return invalid("System One choice answer did not select a highest-probability option");
    }
    return { type, choice, ...common };
  }
  const levels = Object.keys(probabilities);
  const legend = raw.legend;
  if (
    levels.length < 2 ||
    levels.length > 10 ||
    levels.some((level, index) => level !== String(index)) ||
    !isRecord(legend) ||
    Object.keys(legend).length !== levels.length ||
    levels.some((level) => !Object.hasOwn(legend, level)) ||
    !Object.values(legend).every((description) => description === null || isContent(description))
  ) {
    return invalid("System One score answer had invalid levels or legend");
  }
  const score = finiteNumber(raw.score);
  if (score === null || score < 0 || score > levels.length - 1) {
    return invalid("System One score answer had no score within its rubric");
  }
  return { type: "score", score, legend, ...common };
}

function parseGatewayCost(value: unknown): number | null {
  if (typeof value !== "string" || !/^\d+(?:\.\d+)?$/.test(value)) return null;
  const cost = Number(value);
  return Number.isFinite(cost) ? cost : null;
}

function tokenCount(value: unknown): number | null {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0 ? value : null;
}

export function parseSystemOneUsage(body: Record<string, unknown>): SystemOneUsage {
  const usage = isRecord(body.usage) ? body.usage : null;
  const reported = usage ? finiteNumber(usage.cost) : null;
  const metadata = isRecord(body.provider_metadata) ? body.provider_metadata : null;
  const gateway = metadata && isRecord(metadata.gateway) ? metadata.gateway : null;
  const cost = reported !== null && reported >= 0 ? reported : parseGatewayCost(gateway?.cost);
  return {
    inputTokens: usage ? tokenCount(usage.input_tokens) : null,
    outputTokens: usage ? tokenCount(usage.output_tokens) : null,
    costUsd: cost,
  };
}

function matchesQuestion(answer: SystemOneAnswer, question: unknown): boolean {
  if (!isRecord(question)) return false;
  if (answer.type === "refusal")
    return SYSTEMONE_QUESTION_TYPES.includes(question.type as SystemOneQuestionType);
  if (answer.type !== question.type) return false;
  if (answer.type === "noul") return true;
  const criteria = question.criteria;
  if (answer.type === "choice") {
    if (!isRecord(criteria) || !Object.hasOwn(criteria, answer.choice)) return false;
  } else if (!Array.isArray(criteria) || answer.score < 0 || answer.score > criteria.length - 1) {
    return false;
  }
  const options = new Set(Object.keys(criteria as object));
  return (
    answer.probabilities !== null &&
    Object.keys(answer.probabilities).length === options.size &&
    Object.keys(answer.probabilities).every((key) => options.has(key))
  );
}

/**
 * Parse a System One response body. Answers of all three question types are
 * preserved with their probabilities, confidence and usage; a body that answers
 * no question at all is a failure, not an empty success.
 */
export function parseSystemOneAnswers(body: unknown, request?: unknown): SystemOneAnswersResult {
  if (!isRecord(body)) return invalid("System One response was not a JSON object");
  if (!isRecord(body.answers)) return invalid("System One response missing answers");

  const entries = Object.entries(body.answers);
  if (!entries.length) return invalid("System One response answered no question");
  const questions = isRecord(request) && isRecord(request.questions) ? request.questions : null;
  if (questions && entries.length !== Object.keys(questions).length) {
    return invalid("System One response did not match the requested questions");
  }

  const answers: Record<string, SystemOneAnswer> = {};
  for (const [name, raw] of entries) {
    const parsed = parseAnswer(raw);
    if ("ok" in parsed) return parsed;
    if (
      questions &&
      (!Object.hasOwn(questions, name) || !matchesQuestion(parsed, questions[name]))
    ) {
      return invalid("System One answer did not match its requested question");
    }
    Object.defineProperty(answers, name, {
      value: parsed,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  }

  return {
    ok: true,
    model: typeof body.model === "string" ? body.model : null,
    answers,
    usage: parseSystemOneUsage(body),
  };
}

type Question = Record<string, unknown>;

function validateCriteria(type: SystemOneQuestionType, criteria: unknown): string | null {
  if (type === "noul") {
    if (criteria == null) return null;
    return isRecord(criteria) &&
      Object.entries(criteria).every(
        ([key, value]) =>
          (key === "true" || key === "false") && (value === null || isContent(value))
      )
      ? null
      : "must describe only true or false outcomes";
  }
  if (type === "choice") {
    return isRecord(criteria) &&
      Object.keys(criteria).length > 0 &&
      Object.values(criteria).every((value) => value === null || isContent(value))
      ? null
      : "must be a non-empty map of text, structured descriptions or null";
  }
  return Array.isArray(criteria) &&
    criteria.length >= 2 &&
    criteria.length <= 10 &&
    criteria.every(isContent)
    ? null
    : "must contain 2–10 text or structured score levels";
}

function validateQuestion(name: string, raw: unknown): SystemOneValidation {
  if (!isRecord(raw)) return fail(`questions.${name} must be an object`);
  const type = raw.type;
  if (
    typeof type !== "string" ||
    !SYSTEMONE_QUESTION_TYPES.includes(type as SystemOneQuestionType)
  ) {
    return fail(`questions.${name}.type must be one of ${SYSTEMONE_QUESTION_TYPES.join(", ")}`);
  }
  if (raw.instructions !== undefined && raw.instructions !== null && !isContent(raw.instructions)) {
    return fail(`questions.${name}.instructions must be a string, object or array`);
  }
  const criteriaError = validateCriteria(type as SystemOneQuestionType, raw.criteria);
  if (criteriaError) return fail(`questions.${name}.criteria ${criteriaError}`);
  if (
    type === "noul" &&
    raw.instructions == null &&
    (!isRecord(raw.criteria) || !Object.values(raw.criteria).some(isContent))
  ) {
    return fail(`questions.${name} requires instructions or a described true or false outcome`);
  }
  return OK;
}

/**
 * Validate the shared request envelope `{ model, state, questions }`.
 *
 * The `state` is never truncated or rewritten here — it is the caller's data and
 * the upstream decides what it accepts. Messages name the offending field only.
 */
export function validateSystemOneRequestBody(body: unknown): SystemOneValidation {
  if (!isRecord(body)) return fail("Request body must be a JSON object");
  // Only the native text contract is supported here. In particular Vercel's
  // providerOptions can turn this call into ordinary-LLM fallback and widen
  // the offered model/credential scope outside OmniRoute's policy checks.
  if (Object.keys(body).some((key) => !["model", "state", "questions"].includes(key))) {
    return fail("Only model, state and questions are supported for native System One");
  }
  if (typeof body.model !== "string" || !body.model.trim()) {
    return fail("model is required");
  }
  if (!isContent(body.state)) return fail("state must be a string, object or array");
  if (!isRecord(body.questions)) return fail("questions must be a non-empty object");
  const entries = Object.entries(body.questions);
  if (!entries.length) return fail("questions must be a non-empty object");
  for (const [name, question] of entries) {
    const validation = validateQuestion(name, question);
    if (!validation.ok) return validation;
  }
  return OK;
}

function candidateCount(question: Question): { kind: SystemOneQuestionType; count: number } | null {
  if (question.type === "choice" && isRecord(question.criteria)) {
    return { kind: "choice", count: Object.keys(question.criteria).length };
  }
  if (question.type === "score" && Array.isArray(question.criteria)) {
    return { kind: "score", count: question.criteria.length };
  }
  return null;
}

function validateLimits(
  provider: string,
  body: Record<string, unknown>,
  limits: SystemOneLimits
): SystemOneValidation {
  const questions = isRecord(body.questions) ? body.questions : {};
  const names = Object.keys(questions);
  if (names.length > limits.maxQuestions) {
    return fail(`questions must contain at most ${limits.maxQuestions} fields for ${provider}`);
  }
  for (const name of names) {
    const question = questions[name];
    if (!isRecord(question)) continue;
    const counted = candidateCount(question);
    if (!counted) continue;
    const max = counted.kind === "choice" ? limits.maxChoiceCriteria : limits.maxScoreLevels;
    const min = counted.kind === "score" ? 2 : limits.minCriteria;
    if (counted.count < min || counted.count > max) {
      return fail(
        `questions.${name}.criteria must contain ${min}–${max} candidates for ${provider}`
      );
    }
  }
  return OK;
}

/**
 * Apply the backend's own request limits on top of the shared envelope. The
 * byte budget is checked last so a small malformed body reports its real
 * problem first.
 */
export function validateSystemOneBackendBody(
  provider: string,
  body: Record<string, unknown>
): SystemOneValidation {
  const envelope = validateSystemOneRequestBody(body);
  if (!envelope.ok) return envelope;
  const { limits } = systemOneBackend(provider);
  const shape = validateLimits(provider, body, limits);
  if (!shape.ok) return shape;
  const bytes = Buffer.byteLength(JSON.stringify(body ?? null), "utf8");
  if (bytes > limits.maxBodyBytes) {
    return fail(`Request body must not exceed ${limits.maxBodyBytes} bytes for ${provider}`, 413);
  }
  return OK;
}

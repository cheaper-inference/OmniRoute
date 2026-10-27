/**
 * Pure System One ↔ direct OpenAI Decisions contract adapter. No I/O or fallback.
 * Source checked 2026-10-27:
 * https://developers.openai.com/api/docs/guides/decisions
 * https://github.com/openai/openai-node/blob/master/src/resources/decisions.ts
 *
 * The shared text/JSON subset is explicit: structured instructions, image parts,
 * chat options and described predicate outcomes are not silently rewritten.
 * OpenAI confidence remains the reported field, never measured correctness.
 */
import { z } from "zod";
import {
  parseSystemOneAnswers,
  validateSystemOneRequestBody,
  type SystemOneAnswersFailure,
} from "../typesafe/systemOneAnswers.ts";

export const OPENAI_DECISIONS_MODEL = "gpt-6-luna";
export const OPENAI_DECISIONS_MAX_BODY_BYTES = 1_048_576;
export const OPENAI_DECISIONS_MAX_QUESTIONS = 400;

const record = z.record(z.string(), z.unknown());
const question = z
  .object({
    type: z.enum(["noul", "choice", "score"]),
    instructions: z.string().refine((value) => value.trim().length > 0),
    criteria: z.unknown().optional(),
  })
  .strict();
const envelope = z
  .object({
    model: z.literal(OPENAI_DECISIONS_MODEL),
    state: z.unknown(),
    questions: z.record(z.string().min(1), question),
  })
  .strict();
const choiceCriteria = z.record(z.string(), z.string().nullable());
const scoreLevel = z.union([
  z.string().min(1),
  z.object({ label: z.string().min(1), description: z.string().optional() }).strict(),
]);
const scoreCriteria = z.array(scoreLevel).min(2).max(10);
const probabilities = z.array(
  z.object({ value: z.unknown(), probability: z.number().finite().min(0).max(1) })
);

type RequestFailure = { ok: false; status: number; message: string };
export type OpenAiDecisionRequestResult =
  { ok: true; body: Record<string, unknown> } | RequestFailure;
export type OpenAiDecisionResponseResult =
  { ok: true; body: Record<string, unknown> } | SystemOneAnswersFailure;

function unsupported(): RequestFailure {
  return {
    ok: false,
    status: 400,
    message: "Request is outside the supported direct OpenAI Decisions contract",
  };
}
function invalid(): SystemOneAnswersFailure {
  return {
    ok: false,
    reason: "invalid_response",
    detail: "OpenAI Decisions response did not match the requested native contract",
  };
}
function tooLarge(): RequestFailure {
  return {
    ok: false,
    status: 413,
    message: "OpenAI Decisions request exceeds the local byte bound",
  };
}

function withinResponseBound(body: unknown): boolean {
  try {
    const serialized = JSON.stringify(body);
    return (
      typeof serialized === "string" &&
      Buffer.byteLength(serialized, "utf8") <= OPENAI_DECISIONS_MAX_BODY_BYTES
    );
  } catch {
    return false;
  }
}

function nativeQuestion(name: string, value: z.infer<typeof question>) {
  const common = { name, instructions: value.instructions };
  if (value.type === "noul") {
    if (value.criteria != null) return null;
    return { ...common, type: "predicate" };
  }
  if (value.type === "choice") {
    const parsed = choiceCriteria.safeParse(value.criteria);
    if (!parsed.success) return null;
    const entries = Object.entries(parsed.data);
    if (
      entries.length < 2 ||
      entries.length > 255 ||
      entries.length !== Object.keys(value.criteria as object).length
    )
      return null;
    return {
      ...common,
      type: "choice",
      choices: entries.map(([value, description]) => ({
        value,
        ...(description === null ? {} : { description }),
      })),
    };
  }
  const parsed = scoreCriteria.safeParse(value.criteria);
  return parsed.success
    ? {
        ...common,
        type: "score",
        levels: parsed.data.map((level) => (typeof level === "string" ? { label: level } : level)),
      }
    : null;
}

/** The caller supplies the already resolved direct model, never an aggregator id. */
export function toOpenAiDecisionRequest(
  body: unknown,
  signal?: AbortSignal
): OpenAiDecisionRequestResult {
  signal?.throwIfAborted();
  if (!validateSystemOneRequestBody(body).ok) return unsupported();
  const parsed = envelope.safeParse(body);
  if (!parsed.success) return unsupported();
  const names = Object.entries(parsed.data.questions);
  if (
    !names.length ||
    names.length > OPENAI_DECISIONS_MAX_QUESTIONS ||
    names.length !== Object.keys((body as Record<string, object>).questions).length
  )
    return unsupported();
  if (Buffer.byteLength(JSON.stringify(body), "utf8") > OPENAI_DECISIONS_MAX_BODY_BYTES)
    return tooLarge();
  const questions = names.map(([name, value]) => nativeQuestion(name, value));
  if (questions.some((value) => value === null)) return unsupported();
  const input =
    typeof parsed.data.state === "string"
      ? parsed.data.state
      : [{ role: "user", content: [{ type: "input_json", data: parsed.data.state }] }];
  const nativeBody = { model: parsed.data.model, input, questions };
  if (Buffer.byteLength(JSON.stringify(nativeBody), "utf8") > OPENAI_DECISIONS_MAX_BODY_BYTES)
    return tooLarge();
  signal?.throwIfAborted();
  return { ok: true, body: nativeBody };
}

function probabilityMap(value: unknown, kind: "choice" | "score") {
  const parsed = probabilities.safeParse(value);
  if (!parsed.success) return null;
  const entries: Array<[string, number]> = [];
  const seen = new Set<string>();
  for (const row of parsed.data) {
    if (kind === "choice" && typeof row.value !== "string") return null;
    if (kind === "score" && !Number.isSafeInteger(row.value)) return null;
    const key = String(row.value);
    if (seen.has(key)) return null;
    seen.add(key);
    entries.push([key, row.probability]);
  }
  return Object.fromEntries(entries);
}

function normalizeAnswer(raw: Record<string, unknown>, criteria: unknown) {
  if (raw.type === "refusal") return { type: "refusal" };
  if (raw.type === "predicate") return { type: "noul", noul: raw.probability };
  if (raw.type !== "choice" && raw.type !== "score") return null;
  const mapped = probabilityMap(raw.probabilities, raw.type);
  if (mapped === null) return null;
  const common = { type: raw.type, confidence: raw.confidence, probabilities: mapped };
  if (raw.type === "choice") return { ...common, choice: raw.choice };
  const levels = scoreCriteria.safeParse(criteria);
  const rows = z.array(record).safeParse(raw.probabilities);
  if (!levels.success || !rows.success) return null;
  for (const row of rows.data) {
    const level = levels.data[Number(row.value)];
    if (row.label !== (typeof level === "string" ? level : level?.label)) return null;
  }
  return {
    ...common,
    score: raw.score,
    legend: Object.fromEntries(levels.data.map((label, index) => [String(index), label])),
  };
}

/**
 * Canonical response body for the existing native parser/accounting path.
 * Unknown usage stays absent/null. Detailed usage is retained; no USD charge,
 * confidence or missing distribution is inferred. Refusals remain per question.
 */
export function fromOpenAiDecisionResponse(
  body: unknown,
  request: unknown,
  signal?: AbortSignal
): OpenAiDecisionResponseResult {
  signal?.throwIfAborted();
  if (!withinResponseBound(body)) return invalid();
  const input = envelope.safeParse(request);
  const parsed = record.safeParse(body);
  if (!input.success || !parsed.success || parsed.data.model !== input.data.model) return invalid();
  const rawAnswers = z.array(record).safeParse(parsed.data.answers);
  if (!rawAnswers.success || rawAnswers.data.length !== Object.keys(input.data.questions).length)
    return invalid();
  const entries: Array<[string, Record<string, unknown>]> = [];
  const seen = new Set<string>();
  for (const raw of rawAnswers.data) {
    if (typeof raw.name !== "string" || seen.has(raw.name)) return invalid();
    const name = raw.name;
    if (!Object.hasOwn(input.data.questions, name)) return invalid();
    seen.add(name);
    const answer = normalizeAnswer(raw, input.data.questions[name].criteria);
    if (!answer) return invalid();
    entries.push([name, answer]);
  }
  const normalized = {
    model: parsed.data.model,
    answers: Object.fromEntries(entries),
    ...(Object.hasOwn(parsed.data, "usage") ? { usage: parsed.data.usage } : {}),
  };
  if (!parseSystemOneAnswers(normalized, request).ok) return invalid();
  signal?.throwIfAborted();
  return { ok: true, body: normalized };
}

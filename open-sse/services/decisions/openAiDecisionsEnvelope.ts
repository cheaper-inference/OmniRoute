/** Public OpenAI-shaped Decisions subset, translated through the shared native lane.
 * Text/one JSON message only; no images, tools, caching options or chat substitution.
 * https://developers.openai.com/api/docs/guides/decisions (checked 2026-10-27).
 */
import { z } from "zod";
import { resolveSystemOneCandidates, systemOneBackend } from "../../config/systemOneRegistry.ts";
import { hasUnsafeModelIdSyntax } from "../../utils/modelIdSafety.ts";
import {
  parseSystemOneAnswers,
  validateSystemOneRequestBody,
} from "../typesafe/systemOneAnswers.ts";

const name = z
  .string()
  .min(1)
  .refine((value) => value !== "__proto__");
const instruction = z.string().refine((value) => value.trim().length > 0);
const common = { name, instructions: instruction };
const level = z.object({ label: z.string().min(1), description: z.string().optional() }).strict();
const question = z.discriminatedUnion("type", [
  z.object({ ...common, type: z.literal("predicate") }).strict(),
  z
    .object({
      ...common,
      type: z.literal("choice"),
      choices: z
        .array(z.object({ value: name, description: z.string().optional() }).strict())
        .min(2)
        .max(255),
    })
    .strict(),
  z.object({ ...common, type: z.literal("score"), levels: z.array(level).min(2).max(10) }).strict(),
]);
const content = z.discriminatedUnion("type", [
  z.object({ type: z.literal("input_text"), text: z.string() }).strict(),
  z.object({ type: z.literal("input_json"), data: z.unknown() }).strict(),
]);
const input = z.union([
  z.string(),
  z
    .array(
      z
        .object({
          role: z.literal("user"),
          content: z.union([z.string(), z.array(content).length(1)]),
        })
        .strict()
    )
    .length(1),
]);
const envelope = z
  .object({
    model: z.string().min(1),
    input,
    questions: z.array(question).min(1).max(400),
  })
  .strict();
type InvalidRequest = { ok: false; status: number; message: string };
type InvalidResponse = { ok: false; detail: string };
export type OpenAiInboundRequestResult =
  { ok: true; body: Record<string, unknown> } | InvalidRequest;
export type OpenAiOutboundResponseResult =
  { ok: true; body: Record<string, unknown> } | InvalidResponse;

function invalidRequest(): InvalidRequest {
  return {
    ok: false,
    status: 400,
    message:
      "Unsupported Decisions request: use a provider-qualified model, named text questions and text or one JSON input",
  };
}

function canonicalState(value: z.infer<typeof input>): unknown {
  if (typeof value === "string") return value;
  const parts = value[0].content;
  if (typeof parts === "string") return parts;
  return parts[0].type === "input_text" ? parts[0].text : parts[0].data;
}

function canonicalQuestion(value: z.infer<typeof question>): Record<string, unknown> | null {
  if (value.type === "predicate") return { type: "noul", instructions: value.instructions };
  if (value.type === "score")
    return {
      type: "score",
      instructions: value.instructions,
      criteria: value.levels.map((entry) =>
        entry.description === undefined ? entry.label : entry
      ),
    };
  if (new Set(value.choices.map((entry) => entry.value)).size !== value.choices.length) return null;
  return {
    type: "choice",
    instructions: value.instructions,
    criteria: Object.fromEntries(
      value.choices.map((entry) => [entry.value, entry.description ?? null])
    ),
  };
}

function scoreLabel(value: unknown): string | null {
  if (typeof value === "string") return value.length ? value : null;
  const parsed = level.safeParse(value);
  return parsed.success ? parsed.data.label : null;
}

export function fromOpenAiDecisionRequest(body: unknown): OpenAiInboundRequestResult {
  const parsed = envelope.safeParse(body);
  if (!parsed.success || !parsed.data.model.includes("/")) return invalidRequest();
  try {
    // Qualified ids must resolve to one exact provider; no bare alias/default provider.
    const candidates = resolveSystemOneCandidates(parsed.data.model);
    if (candidates.length !== 1 || !candidates[0].pinned) return invalidRequest();
  } catch {
    return invalidRequest();
  }
  const names = new Set<string>();
  const entries: Array<[string, Record<string, unknown>]> = [];
  for (const value of parsed.data.questions) {
    if (names.has(value.name)) return invalidRequest();
    names.add(value.name);
    const mapped = canonicalQuestion(value);
    if (!mapped) return invalidRequest();
    entries.push([value.name, mapped]);
  }
  const canonical = {
    model: parsed.data.model,
    state: canonicalState(parsed.data.input),
    questions: Object.fromEntries(entries),
  };
  if (!validateSystemOneRequestBody(canonical).ok) return invalidRequest();
  return { ok: true, body: canonical };
}

export function toOpenAiDecisionResponse(
  body: unknown,
  request: unknown
): OpenAiOutboundResponseResult {
  const input = fromOpenAiDecisionRequest(request);
  const invalid: InvalidResponse = {
    ok: false,
    detail: "Native response cannot be represented by the requested Decisions contract",
  };
  if (input.ok === false) return invalid;
  const parsed = parseSystemOneAnswers(body, input.body);
  if (!parsed.ok) return invalid;
  const target = resolveSystemOneCandidates(String(input.body.model))[0];
  if (!parsed.model || hasUnsafeModelIdSyntax(parsed.model)) return invalid;
  if (
    systemOneBackend(target.provider).requestFormat === "openai-decisions" &&
    parsed.model !== target.model &&
    parsed.model !== target.canonicalModel
  )
    return invalid;
  const observedModel =
    parsed.model === target.canonicalModel ? parsed.model : `${target.provider}/${parsed.model}`;
  if (
    Object.values(parsed.answers).some(
      (answer) =>
        answer.type === "score" &&
        Object.values(answer.legend).some((entry) => scoreLabel(entry) === null)
    )
  )
    return invalid;
  const answers = Object.entries(parsed.answers).map(([name, answer]) => {
    if (answer.type === "refusal") return { name, type: "refusal" };
    if (answer.type === "noul") return { name, type: "predicate", probability: answer.noul };
    const common = { name, type: answer.type, confidence: answer.confidence };
    if (answer.type === "choice")
      return {
        ...common,
        choice: answer.choice,
        probabilities: Object.entries(answer.probabilities!).map(([value, probability]) => ({
          value,
          probability,
        })),
      };
    return {
      ...common,
      score: answer.score,
      probabilities: Object.entries(answer.probabilities!).map(([value, probability]) => {
        const entry = answer.legend[value];
        const label = scoreLabel(entry);
        return { value: Number(value), label, probability };
      }),
    };
  });
  const raw = body as Record<string, unknown>;
  return {
    ok: true,
    body: {
      model: observedModel,
      answers,
      ...(Object.hasOwn(raw, "usage") ? { usage: raw.usage } : {}),
    },
  };
}

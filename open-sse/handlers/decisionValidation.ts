import { z } from "zod";
import { DecisionError, type DecisionFormat } from "./decisionTypes.ts";

const object = z.record(z.string(), z.unknown());
const instructions = z.union([z.string(), z.array(object).min(1).max(16_384)]);
const common = { name: z.string().optional(), instructions };
const choice = z
  .object({ value: z.union([z.string(), z.boolean()]), description: z.string().optional() })
  .passthrough();
const question = z.discriminatedUnion("type", [
  z.object({ ...common, type: z.literal("predicate") }).passthrough(),
  z
    .object({
      ...common,
      type: z.literal("choice"),
      choices: z
        .array(choice)
        .min(2)
        .max(255)
        .refine(
          (values) => new Set(values.map((v) => JSON.stringify(v.value))).size === values.length,
          "Choice values must be unique"
        ),
    })
    .passthrough(),
  z
    .object({
      ...common,
      type: z.literal("score"),
      levels: z
        .array(z.object({ label: z.string(), description: z.string().optional() }).passthrough())
        .min(2)
        .max(10),
    })
    .passthrough(),
]);

export const decisionsSchema = z
  .object({
    model: z.string().min(3).max(512),
    // All native messages, tool calls/outputs, JSON and image parts are forwarded intact.
    // The upstream remains authoritative for provider-specific input content validation.
    input: z.union([z.string(), z.array(object), object]),
    questions: z
      .array(question)
      .min(1)
      .max(400)
      .refine((questions) => {
        const names = questions.map((q) => q.name).filter((name) => name !== undefined);
        return new Set(names).size === names.length;
      }, "Question names must be unique"),
  })
  .passthrough()
  .refine((body) => !Object.hasOwn(body, "state"), "System One state is not OpenAI input");

const criteria = z.record(z.string(), z.string());
const systemQuestion = z.discriminatedUnion("type", [
  z
    .object({
      type: z.literal("noul"),
      instructions: z.string(),
      criteria: z.object({ true: z.string(), false: z.string() }).optional(),
    })
    .passthrough(),
  z
    .object({
      type: z.literal("choice"),
      instructions: z.string(),
      criteria: criteria.refine((v) => Object.keys(v).length >= 2),
    })
    .passthrough(),
  z
    .object({
      type: z.literal("score"),
      instructions: z.string(),
      criteria: z.array(z.string()).min(2),
    })
    .passthrough(),
]);
export const systemOneSchema = z
  .object({
    model: z.string().min(3).max(512),
    state: z.json(),
    questions: z
      .record(z.string().min(1).max(100), systemQuestion)
      .refine((v) => Object.keys(v).length > 0 && Object.keys(v).length <= 400),
  })
  .passthrough()
  .refine((body) => !Object.hasOwn(body, "input"), "OpenAI input is not System One state");

export function validateDecisionRequest(format: DecisionFormat, value: unknown) {
  const parsed = (format === "decisions" ? decisionsSchema : systemOneSchema).safeParse(value);
  if (!parsed.success) throw new DecisionError(400, "invalid_native_request");
  return parsed.data;
}

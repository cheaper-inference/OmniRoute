import { z } from "zod";
import {
  JEV_SYSTEMONE_LIMITS,
  type SystemOneLimits,
} from "@omniroute/open-sse/config/systemOneRegistry.ts";

export const nativeDecisionDraftSchema = z.object({
  model: z.string().min(1).max(512),
  state: z
    .string()
    .min(1)
    .max(262144)
    .refine((value) => value.trim().length > 0),
  name: z.string().regex(/^[A-Za-z][A-Za-z0-9_-]{0,127}$/),
  instructions: z
    .string()
    .min(1)
    .max(16384)
    .refine((value) => value.trim().length > 0),
  mode: z.enum(["noul", "choice", "score"]),
  criteria: z.string().max(131072),
  levels: z.string().max(131072),
});
export type NativeDecisionDraft = z.infer<typeof nativeDecisionDraftSchema>;
export const EMPTY_NATIVE_DECISION_DRAFT: NativeDecisionDraft = {
  model: "",
  state: "",
  name: "result",
  instructions: "",
  mode: "noul",
  criteria: "",
  levels: "",
};

/** Client-side convenience checks only; native routes retain authoritative validation. */
export function buildNativeDecisionBody(
  draft: NativeDecisionDraft,
  limits: SystemOneLimits = JEV_SYSTEMONE_LIMITS
): Record<string, unknown> | null {
  const parsed = nativeDecisionDraftSchema.safeParse(draft);
  if (!parsed.success) return null;
  const value = parsed.data;
  const question: Record<string, unknown> = { type: value.mode, instructions: value.instructions };
  if (value.mode === "choice") {
    const lines = value.criteria.trim().split(/\r?\n/);
    if (lines.length < limits.minCriteria || lines.length > limits.maxChoiceCriteria) return null;
    const entries: [string, string][] = [];
    for (const line of lines) {
      const separator = line.indexOf(":");
      if (separator <= 0) return null;
      const key = line.slice(0, separator).trim();
      const description = line.slice(separator + 1).trim();
      if (!key || key.length > 128 || !description || entries.some(([known]) => known === key))
        return null;
      entries.push([key, description]);
    }
    question.criteria = Object.fromEntries(entries);
  }
  if (value.mode === "score") {
    const levels = value.levels
      .trim()
      .split(/\r?\n/)
      .map((line) => line.trim());
    if (
      levels.length < limits.minScoreLevels ||
      levels.length > limits.maxScoreLevels ||
      levels.some((line) => !line)
    )
      return null;
    question.criteria = levels;
  }
  const body = { model: value.model, state: value.state, questions: { [value.name]: question } };
  return new TextEncoder().encode(JSON.stringify(body)).byteLength <= limits.maxBodyBytes
    ? body
    : null;
}

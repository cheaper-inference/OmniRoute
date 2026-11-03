import { z } from "zod";

// Preserve native provider fields, including evolving composition-plan structures.
const modelId = z.string().min(1).nullish();
const musicLength = z.number().int().min(3000).max(600000).nullish();
const compositionPlan = z.record(z.string(), z.unknown());

export const elevenLabsSoundGenerationSchema = z.looseObject({
  text: z.string().min(1),
  model_id: modelId,
  duration_seconds: z.number().min(0.5).max(30).nullish(),
  prompt_influence: z.number().min(0).max(1).nullish(),
  loop: z.boolean().optional(),
});

export const elevenLabsMusicSchema = z
  .looseObject({
    prompt: z.string().min(1).max(4100).nullish(),
    composition_plan: compositionPlan.nullish(),
    model_id: modelId,
    music_length_ms: musicLength,
    force_instrumental: z.boolean().optional(),
    respect_sections_durations: z.boolean().optional(),
    seed: z.number().int().min(0).max(2147483647).nullish(),
  })
  .refine((body) => Boolean(body.prompt) !== Boolean(body.composition_plan), {
    message: "Provide exactly one of prompt or composition_plan",
  });

export const elevenLabsMusicPlanSchema = z.looseObject({
  prompt: z.string().min(1).max(4100),
  model_id: modelId,
  music_length_ms: musicLength,
  source_composition_plan: compositionPlan.nullish(),
});

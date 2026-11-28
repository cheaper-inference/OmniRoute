import { z } from "zod";

const control = z
  .string()
  .regex(/^[^\p{Cc}]+$/u)
  .trim()
  .min(1)
  .optional();
const editControls = z.object({ quality: control, background: control });

/** Select only controls shared by the OpenAI-compatible, Codex and OpenRouter edit adapters. */
export function parseImageEditControls(options: Record<string, unknown>) {
  const result = editControls.safeParse(options);
  if (result.success) return result.data;
  const field = result.error.issues[0].path[0];
  return {
    success: false as const,
    status: 400,
    error: `Invalid image edit ${String(field)}: expected a nonblank string without control characters`,
  };
}

export type ImageEditControls = ReturnType<typeof parseImageEditControls>;

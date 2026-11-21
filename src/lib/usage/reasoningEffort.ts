/** Trim logged effort values without normalizing provider-specific levels. */
export function readEffortValue(body: unknown): string | null {
  if (body === null || typeof body !== "object" || Array.isArray(body)) return null;
  const record = body as Record<string, unknown>;
  const direct = record.reasoning_effort;
  if (typeof direct === "string" && direct.trim().length > 0) return direct.trim();

  // Preserve the existing OpenAI precedence before the Anthropic-compatible shape.
  for (const nested of [record.reasoning, record.output_config]) {
    if (nested !== null && typeof nested === "object" && !Array.isArray(nested)) {
      const effort = (nested as Record<string, unknown>).effort;
      if (typeof effort === "string" && effort.trim().length > 0) return effort.trim();
    }
  }
  return null;
}

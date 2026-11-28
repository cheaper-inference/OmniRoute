export type FieldCategory = "content" | "reasoning" | "toolArgs" | "partialJson";

// Escape each key before joining path segments with "/" to keep distinct paths distinct.
export function escapePathSegment(key: string): string {
  return key.replace(/~/g, "~0").replace(/\//g, "~1");
}

/** Preserve the existing #13095 bound for native and legacy output. */
export const MAX_BUFFER_CHARS = 1_048_576;
const TRUNCATION_NOTICE = "\n[...output truncated...]\n";

export function appendCapped(buffer: string, chunk: string): string {
  const combined = buffer + chunk;
  if (combined.length <= MAX_BUFFER_CHARS) return combined;
  return TRUNCATION_NOTICE + combined.slice(-(MAX_BUFFER_CHARS - TRUNCATION_NOTICE.length));
}

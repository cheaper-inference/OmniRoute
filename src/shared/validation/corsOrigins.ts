import { z } from "zod";

// Check the original spelling before URL parsing can erase paths, empty ports or whitespace.
const HTTP_ORIGIN = /^https?:\/\/[^/?#\\@\s%*\p{Cc}]+$/iu;

function isCorsOriginList(value: string): boolean {
  if (value === "") return true;

  const seen = new Set<string>();
  for (const entry of value.split(",")) {
    const origin = entry.trim();
    if (!HTTP_ORIGIN.test(origin) || origin.endsWith(":")) return false;

    try {
      // Compare parsed origins so casing and an explicit default port cannot hide a duplicate.
      const { origin: parsedOrigin } = new URL(origin);
      if (seen.has(parsedOrigin)) return false;
      seen.add(parsedOrigin);
    } catch {
      return false;
    }
  }
  return true;
}

export const corsOriginsSchema = z
  .string()
  .max(500, { abort: true })
  .trim()
  .refine(
    isCorsOriginList,
    "Expected comma-separated, unique HTTP(S) origins with a host and optional port"
  );

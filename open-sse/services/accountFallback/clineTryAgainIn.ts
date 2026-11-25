import { resolveProviderId } from "../../../src/shared/constants/providers";

/**
 * Cline free-tier daily cap 429: "Daily free limit reached on model <id>. Try again in 19h 39m".
 * Hours, minutes and seconds are each optional and may be glued ("19h39m"); `(?![a-z])` instead
 * of `\b` is what accepts the glued form. Every quantifier is bounded (ReDoS, AGENTS.md → PII 1).
 */
const CLINE_TRY_AGAIN_IN_RE =
  /\btry again in\s{1,3}(?:(\d{1,4})\s{0,2}h(?:ours?|rs?)?(?![a-z]))?\s{0,2}(?:(\d{1,4})\s{0,2}m(?:in(?:ute)?s?)?(?![a-z]))?\s{0,2}(?:(\d{1,6})\s{0,2}s(?:ec(?:ond)?s?)?(?![a-z]))?/i;

/**
 * Parse Cline's "Try again in XhYmZs" countdown, gated on the `cline` provider. Returns null
 * when the provider differs, the phrase is absent, or no duration was given; otherwise the
 * total in ms, capped at `maxMs`. The caller keeps it as `body` provenance, so the model
 * lockout stays under the operator's max-cooldown cap.
 */
export function parseClineTryAgainInMs(
  text: string,
  provider: string | null | undefined,
  maxMs: number
): number | null {
  if (!provider || resolveProviderId(provider) !== "cline") return null;
  const match = CLINE_TRY_AGAIN_IN_RE.exec(text);
  if (!match) return null;
  const hours = match[1] ? Number.parseInt(match[1], 10) : 0;
  const minutes = match[2] ? Number.parseInt(match[2], 10) : 0;
  const seconds = match[3] ? Number.parseInt(match[3], 10) : 0;
  const totalMs = ((hours * 60 + minutes) * 60 + seconds) * 1000;
  if (totalMs <= 0) return null;
  return Math.min(totalMs, maxMs);
}

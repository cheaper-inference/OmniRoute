/**
 * Auto-managed model exclusion for Antigravity accounts without a Gemini 4 Argon quota. It covers
 * Argon only: the other Gemini 4 models draw on the shared Gemini pool (#21132).
 */
export const ARGON_EXCLUSION = "*argon*";

/** Earlier releases also wrote this one, immediately before ARGON_EXCLUSION. */
const LEGACY_GEMINI_4_EXCLUSION = "gemini-4*";

/**
 * Drop the legacy gemini-4* from a stored exclusion list, recognised by its position: it sits
 * immediately before ARGON_EXCLUSION. A gemini-4* anywhere else is the operator's and stays.
 */
export function dropLegacyGemini4Exclusion(patterns: string[]): string[] {
  return patterns.filter(
    (pattern, index) =>
      pattern !== LEGACY_GEMINI_4_EXCLUSION || patterns[index + 1] !== ARGON_EXCLUSION
  );
}

/**
 * CI Chat protocol proof, distinct from a model's published feature flags.
 * Live 2026-11-03: Argon read inline PDF and MP4 bytes in history. GPT-4o routes
 * silently ignored PDF parts; older Gemini/Kimi media routes returned 400.
 * Gemini 3.7 Flash also passed an inline WAV transcription through Chat.
 * Keep these formats fail-closed until their actual transport is verified.
 */
export function ciTransportSupportsInput(provider: string, model: string, kind: string): boolean {
  if (provider !== "cinf" && provider !== "cheaperinference") return true;
  if (kind === "audio") return model === "gemini-4-argon" || model === "gemini-3.7-flash";
  if (kind !== "pdf" && kind !== "video") return true;
  return model === "gemini-4-argon";
}

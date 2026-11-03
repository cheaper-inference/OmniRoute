/**
 * Native Codex passthrough (`POST /v1/responses` → provider `codex`) is kept out of the
 * reactive and last-resort context compaction passes by default: those passes rewrite
 * the conversation history the Codex client owns (history-rewriting safety, #8949).
 *
 * `NATIVE_CODEX_REACTIVE_COMPACTION_ENABLED` (default off) lets an operator opt native
 * Codex histories into the same reactive compaction every other request already gets
 * (#16632). The flag resolver is injected so this module stays free of `src/` imports
 * (open-sse → src boundary), and any resolver failure fails closed — the exclusion holds.
 */
export const NATIVE_CODEX_REACTIVE_COMPACTION_FLAG = "NATIVE_CODEX_REACTIVE_COMPACTION_ENABLED";

export function shouldSkipNativeCodexReactiveCompaction(
  nativeCodexPassthrough: boolean,
  isFlagEnabled: (key: string) => boolean
): boolean {
  if (!nativeCodexPassthrough) return false;
  try {
    return !isFlagEnabled(NATIVE_CODEX_REACTIVE_COMPACTION_FLAG);
  } catch {
    return true;
  }
}

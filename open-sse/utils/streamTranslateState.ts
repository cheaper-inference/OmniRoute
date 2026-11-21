/**
 * Initial translate-mode state for createSSEStream (extracted from stream.ts, which is frozen
 * in the file-size baseline).
 *
 * The signature namespace is the connection id scoped by model family, so a thought signature
 * cached from one family is never replayed to the other on a shared connection (#4136 —
 * Antigravity serves Claude and Gemini on one connection).
 */
import { initState } from "../translator/index.ts";
import { scopeGeminiThoughtSignatureNamespace } from "../services/geminiThoughtSignatureStore.ts";

export function initTranslateStreamState(
  sourceFormat: unknown,
  connectionId: string | null | undefined,
  model: unknown,
  sessionKey: string | null = null
) {
  return {
    ...initState(sourceFormat),
    signatureNamespace: scopeGeminiThoughtSignatureNamespace(connectionId, model),
    // Raw serving connection id — the Claude thinking store binds entries on it
    // (#17324: signatures are org-scoped; cross-org replay is a hard 400).
    connectionId: typeof connectionId === "string" ? connectionId : null,
    // Owner session of the Claude thinking store's opt-in per-session caps.
    sessionKey,
  };
}

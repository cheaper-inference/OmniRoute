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
  model: unknown
) {
  return {
    ...initState(sourceFormat),
    signatureNamespace: scopeGeminiThoughtSignatureNamespace(connectionId, model),
  };
}

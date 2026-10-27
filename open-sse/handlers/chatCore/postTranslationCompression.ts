/**
 * chatCore post-translation OmniGlyph compression stage (chatCore god-file decomposition, slice 2
 * — design after #15709).
 *
 * The latest OmniGlyph release has protocol-native OpenAI transforms. handleChatCore runs this
 * deferred stage only after translation so Chat/Responses receives the exact provider wire shape
 * (and so a source→target conversion never embeds Anthropic image blocks into an OpenAI request,
 * or vice versa). Extracted byte-identically: the handler keeps the `if
 * (runPostTranslationCompression …)` gate and hands its four mutable request-scope bindings in a
 * state object, which this stage updates in place exactly where the inline block assigned them
 * (so a failure part-way leaves the same partial state the inline block left). Compression is
 * deliberately fail-open — a provider-shaped transform must never turn an otherwise valid
 * translated request into a 500.
 */

import type { CompressionResult } from "../../services/compression/types.ts";
import { writeCompressionAnalytics } from "./compressionAnalyticsWrite.ts";

type LoggerLike =
  { info?: (...args: unknown[]) => void; warn?: (...args: unknown[]) => void } | null | undefined;

export type PostTranslationCompressionState<TBody> = {
  translatedBody: TBody;
  tokensCompressed: number | null;
  compressionResponseMeta: string | null;
  compressionAnalyticsWritePromise: Promise<void> | null;
};

export async function applyPostTranslationCompression<TBody>(
  state: PostTranslationCompressionState<TBody>,
  {
    runPostTranslationCompression,
    provider,
    effectiveModel,
    effectiveServiceTier,
    comboName,
    skillRequestId,
    sourceFormat,
    targetFormat,
    log,
  }: {
    runPostTranslationCompression: (input: Record<string, unknown>) => Promise<CompressionResult>;
    provider: string | null | undefined;
    effectiveModel: string | null | undefined;
    effectiveServiceTier: string | undefined;
    comboName: string | null | undefined;
    skillRequestId: string;
    sourceFormat: string;
    targetFormat: string;
    log?: LoggerLike;
  }
): Promise<void> {
  const transientFields = new Map<string, unknown>();
  const postInput = { ...(state.translatedBody as Record<string, unknown>) };
  for (const [key, value] of Object.entries(postInput)) {
    // Translators keep response-side aliases in Maps under private keys. They
    // are not JSON request fields and would otherwise be stringified to `{}`
    // by the OmniGlyph library wrapper; restore them after the wire transform.
    if (key.startsWith("_") && value instanceof Map) {
      transientFields.set(key, value);
      delete postInput[key];
    }
  }
  try {
    const [{ formatCompressionAnnotation }, { trackCompressionStats }] = await Promise.all([
      import("../../services/compression/strategySelector.ts"),
      import("../../services/compression/stats.ts"),
    ]);
    const postResult = await runPostTranslationCompression(postInput);
    if (postResult.compressed) {
      state.translatedBody = {
        ...(postResult.body as TBody),
        ...Object.fromEntries(transientFields),
      };
      // Same arithmetic as the inline `tokensCompressed += …`: a null binding coerces to 0.
      state.tokensCompressed =
        (state.tokensCompressed as number) +
        Math.max(
          0,
          (postResult.stats?.originalTokens ?? 0) - (postResult.stats?.compressedTokens ?? 0)
        );
      if (postResult.stats) {
        const annotation = formatCompressionAnnotation(postResult.stats);
        if (annotation) {
          state.compressionResponseMeta = state.compressionResponseMeta
            ? `${state.compressionResponseMeta}; ${annotation}`
            : annotation;
        }
        trackCompressionStats(postResult.stats);
        state.compressionAnalyticsWritePromise = writeCompressionAnalytics({
          stats: postResult.stats,
          provider,
          effectiveModel,
          effectiveServiceTier,
          comboName,
          mode: postResult.stats.mode,
          compressionComboId: postResult.stats.compressionComboId ?? null,
          skillRequestId,
          cavemanOutputModeApplied: false,
          cavemanOutputModeIntensity: null,
          log,
        });
        await state.compressionAnalyticsWritePromise;
      }
      log?.info?.(
        "COMPRESSION",
        `Post-translation OmniGlyph applied (${sourceFormat} → ${targetFormat})`
      );
    }
  } catch (error) {
    // Compression is deliberately fail-open. A provider-shaped transform
    // must never turn an otherwise valid translated request into a 500.
    log?.warn?.(
      "COMPRESSION",
      "Post-translation OmniGlyph skipped: " +
        (error instanceof Error ? error.message : String(error))
    );
  }
}

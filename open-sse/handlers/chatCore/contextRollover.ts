/**
 * chatCore context rollover (opt-in, default off).
 *
 * When `compression.contextRollover.enabled` is on, the `append-preserving-ccr` engine owns
 * context handling for every target except the excluded models: once the request reaches its
 * trigger share of the model input budget, old history is archived into ordered CCR markers
 * (retrievable with `omniroute_ccr_retrieve`) while the recent tail stays direct. Because the
 * archive is deterministic, the replayed prefix stays byte-stable between turns, which keeps the
 * provider's KV/prompt cache warm. The optional `currentPromptPipeline` runs regular engines
 * on the newest user prompt only, never on the replayed prefix.
 *
 * Everything else that would rewrite the prefix (prompt-compression engines, output styles,
 * provider context editing and the proactive 70% compaction pass) is skipped for the request.
 * The last-resort compaction pass is NOT skipped: a request that still exceeds the input budget
 * after the rollover (e.g. a retained tail larger than the window) is compacted like any other
 * request instead of being rejected or forwarded oversized.
 *
 * Like the CCR engine, the rollover only takes over when the caller advertises the
 * `omniroute_ccr_retrieve` tool: archived turns are only recoverable through that tool, so a
 * caller without it keeps the normal compression pipeline.
 *
 * The engine is resolved through the compression engine registry, like every other engine.
 */

import { registerBuiltinCompressionEngines } from "../../services/compression/engines/index.ts";
import { getCompressionEngine } from "../../services/compression/engines/registry.ts";
import { adaptBodyForCompression } from "../../services/compression/bodyAdapter.ts";
import { callerSupportsCcrRetrieve } from "../../services/compression/engines/ccr/protocolInstruction.ts";
import { applyCurrentPromptPipeline } from "../../services/compression/contextRollover/currentPrompt.ts";
import { isContextRolloverTarget } from "../../services/compression/contextRollover/scope.ts";
import type {
  CompressionConfig,
  CompressionStats,
  ContextRolloverConfig,
} from "../../services/compression/types.ts";

export const CONTEXT_ROLLOVER_ENGINE_ID = "append-preserving-ccr";

type LoggerLike =
  | {
      debug?: (...args: unknown[]) => void;
      info?: (...args: unknown[]) => void;
      warn?: (...args: unknown[]) => void;
    }
  | null
  | undefined;

/** True when context rollover owns context handling for this request. */
export function resolveContextRolloverActivation(input: {
  settings: CompressionConfig | null | undefined;
  provider: string | null | undefined;
  model: string | null | undefined;
  compressionExcluded: boolean;
  apiKeyCompressionEnabled: boolean;
  compressionHeader: string | null | undefined;
  body: Record<string, unknown> | null | undefined;
}): boolean {
  if (input.compressionExcluded || !input.apiKeyCompressionEnabled) return false;
  if (input.compressionHeader?.trim().toLowerCase() === "off") return false;
  if (!input.body || !callerSupportsCcrRetrieve(input.body)) return false;
  return isContextRolloverTarget(input.settings?.contextRollover, {
    provider: input.provider,
    model: input.model,
  });
}

export interface ContextRolloverResult {
  body: Record<string, unknown>;
  changed: boolean;
  /** Stats of the history archive, when the trigger was reached. */
  archiveStats: CompressionStats | null;
  /** Stats of the current-prompt pipeline, when one is configured. */
  currentPromptStats: CompressionStats | null;
}

/** Archive old history (past the trigger) and run the current-prompt pipeline. */
export async function applyContextRollover(input: {
  body: Record<string, unknown>;
  config: ContextRolloverConfig;
  provider: string | null | undefined;
  model: string | null | undefined;
  principalId: string | undefined;
  modelContextLimit: number | null;
  requestMaxTokens: number | null;
  log?: LoggerLike;
}): Promise<ContextRolloverResult> {
  registerBuiltinCompressionEngines();
  const engine = getCompressionEngine(CONTEXT_ROLLOVER_ENGINE_ID);
  let body = input.body;
  let changed = false;
  let archiveStats: CompressionStats | null = null;
  if (!engine) {
    input.log?.warn?.("CONTEXT", `Context rollover engine ${CONTEXT_ROLLOVER_ENGINE_ID} missing`);
  } else {
    const c = input.config;
    const adapter = adaptBodyForCompression(body);
    const archived = engine.apply(adapter.body, {
      principalId: input.principalId,
      modelContextLimit: input.modelContextLimit,
      requestMaxTokens: input.requestMaxTokens,
      stepConfig: {
        triggerPercent: c.triggerPercent,
        preserveRecentPercent: c.preserveRecentPercent,
        minArchiveChars: c.minArchiveChars,
        minRetainedMessages: c.minRetainedMessages,
        maxArchiveSectionChars: c.maxArchiveSectionChars,
      },
    });
    if (archived.compressed && archived.stats) {
      body = adapter.restore(archived.body) as Record<string, unknown>;
      changed = true;
      archiveStats = archived.stats;
      input.log?.info?.(
        "CONTEXT",
        `Context rollover archived history for ${input.provider}/${input.model}: ` +
          `${archived.stats.originalTokens} -> ${archived.stats.compressedTokens} tokens`
      );
    }
  }

  let currentPromptStats: CompressionStats | null = null;
  const pipeline = input.config.currentPromptPipeline ?? [];
  if (pipeline.length > 0) {
    const adapter = adaptBodyForCompression(body);
    const current = await applyCurrentPromptPipeline(adapter.body, pipeline, {
      model: input.model ?? undefined,
      principalId: input.principalId,
      provider: input.provider ?? undefined,
    });
    if (current.compressed) {
      body = adapter.restore(current.body) as Record<string, unknown>;
      changed = true;
      currentPromptStats = current.stats;
      input.log?.debug?.(
        "CONTEXT",
        `Context rollover applied [${pipeline.join(",")}] to the current prompt only`
      );
    }
  }
  return { body, changed, archiveStats, currentPromptStats };
}

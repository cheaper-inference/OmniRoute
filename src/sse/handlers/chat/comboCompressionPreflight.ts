import { resolveCompressionSettings } from "@omniroute/open-sse/handlers/chatCore/compressionSettings.ts";
import type { CompressionExclusions } from "@omniroute/open-sse/services/compression/exclusions.ts";

/**
 * #10225 — resolve whether this request's combo preflight should DEFER its hard
 * context-overflow rejection so chatCore's compression runs first.
 *
 * Mirrors handleChatCore's own enablement determination (chatCore.ts): defer only
 * when the global compression switch is ON and the API key has not opted out
 * (`apiKeyInfo.compressionEnabled !== false`). Per-target applicability (server-side
 * exclusions) is checked inside getKnownContextOverflow via the returned exclusions.
 * Fail closed (defer=false) on any lookup error — the existing hard preflight stays.
 */
export async function resolveComboContextOverflowDeferral(
  logger: { warn?: (...args: unknown[]) => void } | null | undefined,
  apiKeyInfo: { compressionEnabled?: boolean } | null | undefined
): Promise<{ defer: boolean; exclusions: CompressionExclusions | undefined }> {
  try {
    const compression = await resolveCompressionSettings(logger);
    return {
      defer: compression.enabled && apiKeyInfo?.compressionEnabled !== false,
      exclusions: compression.settings?.exclusions,
    };
  } catch {
    return { defer: false, exclusions: undefined };
  }
}

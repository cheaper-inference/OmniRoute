/**
 * chatCore live-zone prompt compression dispatch (chatCore god-file decomposition, slice 2).
 *
 * Extracted byte-identically from handleChatCore's prompt-compression pipeline (the
 * `compressionConfig.liveZone.enabled` lane): resolve the live-zone session id — the explicit
 * `x-omniroute-session-id` header, else the derived conversation fingerprint — and run the engines
 * through applyLiveZoneCompression so an unchanged history prefix reuses its cached transform.
 * The live-zone module stays lazily imported, as before.
 */

import { generateSessionId } from "../../services/sessionManager.ts";
import type { CompressionConfig, CompressionResult } from "../../services/compression/types.ts";
import { getHeaderValueCaseInsensitive } from "./headers.ts";

export async function runLiveZoneCompression({
  compressionInputBody,
  clientHeaders,
  provider,
  getCurrentConnectionId,
  compressionPrincipalId,
  mode,
  effectiveModel,
  compressionConfig,
  runCompression,
}: {
  compressionInputBody: Record<string, unknown>;
  clientHeaders: Record<string, unknown> | Headers | null | undefined;
  provider: string;
  getCurrentConnectionId: () => string | null;
  compressionPrincipalId: string | undefined;
  mode: string;
  effectiveModel: string;
  compressionConfig: CompressionConfig;
  runCompression: (input: Record<string, unknown>) => Promise<CompressionResult>;
}): Promise<CompressionResult> {
  const { applyLiveZoneCompression } = await import("../../services/compression/liveZone.ts");
  const explicitSessionId =
    clientHeaders && typeof (clientHeaders as Headers).get === "function"
      ? (clientHeaders as Headers).get("x-omniroute-session-id")
      : getHeaderValueCaseInsensitive(clientHeaders ?? null, "x-omniroute-session-id");
  const liveZoneSessionId =
    explicitSessionId ||
    generateSessionId(compressionInputBody, {
      provider,
      connectionId: getCurrentConnectionId() ?? undefined,
    }) ||
    undefined;
  return applyLiveZoneCompression(
    compressionInputBody,
    {
      principalId: compressionPrincipalId,
      sessionId: liveZoneSessionId,
      variant: {
        mode,
        provider,
        model: effectiveModel,
        config: compressionConfig,
        cachePrefix: {
          system: compressionInputBody.system,
          systemInstruction: compressionInputBody.systemInstruction,
          system_instruction: compressionInputBody.system_instruction,
          instructions: compressionInputBody.instructions,
          tools: compressionInputBody.tools,
          toolChoice: compressionInputBody.tool_choice,
        },
      },
      ttlMinutes: compressionConfig.cacheMinutes,
    },
    runCompression
  );
}

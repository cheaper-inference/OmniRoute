/**
 * chatCore upstream request-parameter normalization (chatCore god-file decomposition, slice 2).
 *
 * Extracted byte-identically from handleChatCore, after the tool-calling capability check:
 * reconcile `max_tokens` / `max_completion_tokens` with what the model accepts (#1961, #6912),
 * strip `store` where the target rejects it, drop `stream_options` for OpenAI Responses
 * upstreams, and clamp the output-token fields to the provider's API cap (#711). Every step
 * mutates the translated body in place, exactly as the inline block did. The handler evaluates
 * supportsMaxTokens() (src/lib/modelCapabilities) at the same point and passes the answer in, so
 * this engine leaf takes no new open-sse → src import edge.
 */

import { PROVIDER_MAX_TOKENS } from "../../config/constants.ts";
import { FORMATS } from "../../translator/formats.ts";
import { stripStore } from "./agentRouterProtocol.ts";

type LoggerLike = { debug?: (...args: unknown[]) => void } | null | undefined;

export function normalizeUpstreamRequestParams({
  translatedBody,
  modelSupportsMaxTokens,
  provider,
  model,
  targetFormat,
  providerSpecificData,
  log,
}: {
  translatedBody: Record<string, unknown>;
  modelSupportsMaxTokens: boolean;
  provider: string;
  model: string;
  targetFormat: string;
  providerSpecificData: Record<string, unknown> | null | undefined;
  log?: LoggerLike;
}): void {
  // Rename max_tokens to max_completion_tokens if not supported (#1961)
  if (!modelSupportsMaxTokens) {
    if (translatedBody.max_tokens !== undefined) {
      if (translatedBody.max_completion_tokens === undefined) {
        translatedBody.max_completion_tokens = translatedBody.max_tokens;
      }
      delete translatedBody.max_tokens;
      log?.debug?.("PARAMS", `Renamed max_tokens to max_completion_tokens for ${model}`);
    }
  } else if (translatedBody.max_completion_tokens !== undefined) {
    // Symmetric case (#6912): some providers/models (e.g. Volcengine Ark /
    // DeepSeek) only document the legacy `max_tokens` field and silently
    // ignore an unrecognized `max_completion_tokens`, so a client sending the
    // newer field alone would have it dropped upstream with no cap applied.
    if (translatedBody.max_tokens === undefined) {
      translatedBody.max_tokens = translatedBody.max_completion_tokens;
    }
    delete translatedBody.max_completion_tokens;
    log?.debug?.("PARAMS", `Renamed max_completion_tokens to max_tokens for ${model}`);
  }

  stripStore(translatedBody, provider, targetFormat, providerSpecificData);

  // Chat clients may send stream_options.include_usage, but OpenAI Responses
  // upstreams (including Azure AI Foundry /responses) reject stream_options.
  if (targetFormat === FORMATS.OPENAI_RESPONSES && "stream_options" in translatedBody) {
    delete translatedBody.stream_options;
  }

  // Provider-specific max_tokens caps (#711)
  // Some providers reject requests when max_tokens exceeds their API limit.
  // Cap before sending to avoid upstream HTTP 400 errors.
  const providerCap = PROVIDER_MAX_TOKENS[provider];
  if (providerCap) {
    for (const field of ["max_tokens", "max_completion_tokens"] as const) {
      if (typeof translatedBody[field] === "number" && translatedBody[field] > providerCap) {
        log?.debug?.(
          "PARAMS",
          `Capping ${field} from ${translatedBody[field]} to ${providerCap} for ${provider}`
        );
        translatedBody[field] = providerCap;
      }
    }
  }
}

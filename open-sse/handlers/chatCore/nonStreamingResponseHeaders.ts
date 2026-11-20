/**
 * chatCore non-streaming success response headers (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Extracted from handleChatCore's non-streaming success path: build the response header map for a
 * cache-MISS JSON response — the static Content-Type + cache marker, the OmniRoute meta headers
 * (provider/model/latency/usage/cost/request-id), and the optional compression header. Pure builder
 * (returns a fresh map; only mutates the map it owns). Behaviour is byte-identical to the previous
 * inline block, including `latencyMs: now - startTime`.
 */
import { OMNIROUTE_RESPONSE_HEADERS } from "@/shared/constants/headers";
import { attachOmniRouteMetaHeaders as defaultAttachMeta } from "@/domain/omnirouteResponseMeta";
import { FORMATS } from "../../translator/formats.ts";
import {
  pickForwardableAnthropicAccountHeaders,
  type AnthropicAccountHeaderPolicyKeyInfo,
} from "./upstreamAccountHeaders.ts";

export function buildNonStreamingResponseHeaders(
  args: {
    provider: string | null | undefined;
    model: string | null | undefined;
    startTime: number;
    responseUsage: Record<string, unknown> | null | undefined;
    estimatedCost: number;
    requestId: string | null | undefined;
    compressionResponseMeta?: string | null | undefined;
    comboStrategy?: string | null | undefined;
    fallbackAttempts?: number;
    // #20345: a Claude-format client (/v1/messages) also gets the upstream
    // anthropic-ratelimit-* / anthropic-organization-id headers, under the
    // requesting key's policy (upstreamAccountHeaders.ts) — the same set the
    // streaming path forwards. Other client formats get none, as before.
    sourceFormat?: string | null;
    providerHeaders?: Record<string, string> | null;
    apiKeyInfo?: AnthropicAccountHeaderPolicyKeyInfo | null;
  },
  deps: { attachOmniRouteMetaHeaders: typeof defaultAttachMeta; now: () => number } = {
    attachOmniRouteMetaHeaders: defaultAttachMeta,
    now: Date.now,
  }
): Record<string, string> {
  const responseHeaders: Record<string, string> = {
    ...(args.sourceFormat === FORMATS.CLAUDE
      ? pickForwardableAnthropicAccountHeaders(args.providerHeaders, args.apiKeyInfo, args.provider)
      : {}),
    "Content-Type": "application/json",
    [OMNIROUTE_RESPONSE_HEADERS.cache]: "MISS",
  };
  deps.attachOmniRouteMetaHeaders(responseHeaders, {
    provider: args.provider,
    model: args.model,
    cacheHit: false,
    latencyMs: deps.now() - args.startTime,
    usage: args.responseUsage,
    costUsd: args.estimatedCost,
    requestId: args.requestId,
    strategy: args.comboStrategy ?? "single",
    ...(args.fallbackAttempts !== undefined ? { fallbackAttempts: args.fallbackAttempts } : {}),
  });
  if (args.compressionResponseMeta) {
    responseHeaders[OMNIROUTE_RESPONSE_HEADERS.compression] = args.compressionResponseMeta;
  }
  return responseHeaders;
}

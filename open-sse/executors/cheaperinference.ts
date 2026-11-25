import { BaseExecutor, type ExecuteInput, type ProviderCredentials } from "./base.ts";
import { containsMediaKind } from "../utils/mediaParts.ts";
import { makeExecutorErrorResult } from "../utils/error.ts";
import { ciTransportSupportsInput } from "../utils/ciTransportInput.ts";
import { sendCIPayload } from "../utils/ciPayloadTransport.ts";
import { normalizeCIMixedMedia } from "../utils/ciMixedMedia.ts";
import { PROVIDERS } from "../config/constants.ts";
import { getModelTargetFormat, PROVIDER_ID_TO_ALIAS } from "../config/providerModels.ts";

const ANTHROPIC_BILLING_LINE = /^x-anthropic-billing-header:[^\n]*(?:\r?\n)?/i;

function stripClaudeSystemBillingLine(body: Record<string, unknown>): void {
  const { system } = body;
  if (typeof system === "string" && ANTHROPIC_BILLING_LINE.test(system)) {
    const text = system.replace(ANTHROPIC_BILLING_LINE, "");
    if (text) body.system = text;
    else delete body.system;
  } else if (Array.isArray(system)) {
    body.system = system.flatMap((block: { text?: unknown } | null) => {
      const text = block?.text;
      if (typeof text !== "string" || !ANTHROPIC_BILLING_LINE.test(text)) return [block];
      const rest = text.replace(ANTHROPIC_BILLING_LINE, "");
      return rest ? [{ ...block, text: rest }] : [];
    });
  }
}

/**
 * CheaperInferenceExecutor — api.cheaperinference.com.
 *
 * The gateway exposes OpenAI-compatible Chat and Responses alongside native
 * Anthropic Messages. The OpenAI surfaces were measured against the live API on
 * 2026-07-31:
 *
 *  1. `/v1/responses` is STATELESS and REQUIRES `store:false`. Omitting it returns
 *     HTTP 400 ("This Responses-compatible endpoint is stateless. Send store=false…").
 *     chatCore.ts deletes `store` for every provider except "openai" — a strip shared
 *     by ~290 providers that must not be special-cased — so we re-add it here, after
 *     that strip has run. A client-supplied `store:true` is overwritten rather than
 *     forwarded: the endpoint cannot honour it, and forwarding would 400.
 *
 *  2. Chat, Responses and Messages live at DIFFERENT URLs (unlike providers that switch on a
 *     path suffix). The per-model `targetFormat` registry tag is the single source of
 *     truth for which surface a model uses — the same tag chatCore reads to translate
 *     the body — so resolving the URL from it keeps URL and payload in lockstep.
 *     Same pattern as executors/xai.ts (9router#2439).
 */
export class CheaperInferenceExecutor extends BaseExecutor {
  constructor(provider = "cheaperinference") {
    super(provider, PROVIDERS[provider]);
  }

  /**
   * @executorRecovery native
   * @executorRecoveryReason Reject incompatible media before dispatch; every accepted payload delegates to the base recovery loop unchanged.
   * @executorRecoveryTest tests/unit/cheaperinference-executor.test.ts
   */
  async execute(input: ExecuteInput) {
    const body = (input.body || {}) as Record<string, unknown>;
    for (const [kind, partKind] of [
      ["audio", "audio"],
      ["pdf", "document"],
      ["video", "video"],
    ] as const) {
      if (
        !ciTransportSupportsInput(this.provider, input.model, kind) &&
        containsMediaKind([{ content: [body.messages, body.input, body.contents] }], partKind)
      ) {
        return makeExecutorErrorResult(
          400,
          `This Cheaper Inference model has no verified ${kind} input transport. Select a supported model such as gemini-4-argon.`,
          input.body,
          this.buildUrl(input.model, input.stream, 0)
        );
      }
    }
    return super.execute(input);
  }

  protected dispatchRequest(
    url: string,
    init: RequestInit,
    credentials: ProviderCredentials
  ): Promise<Response> {
    // sendCIPayload only handles Chat and Responses. Messages uses plain JSON
    // because gzip and upload support have not been verified for /v1/messages.
    return sendCIPayload(url, init, (target, options) => {
      this.assertOutboundUrlAllowed(target);
      return super.dispatchRequest(target, options, credentials);
    });
  }

  /**
   * PROVIDER_MODELS is keyed by provider ALIAS ("cinf"), while PROVIDERS is keyed by
   * provider ID ("cheaperinference") — so `this.provider` cannot be passed straight
   * through the way executors/xai.ts does (there the alias equals the id, which hides
   * the distinction). Resolve the alias first or every lookup silently returns null
   * and every Responses request 400s upstream.
   */
  private resolveTargetFormat(model: string, credentials?: ProviderCredentials | null) {
    const override = credentials?.providerSpecificData?.targetFormat;
    if (typeof override === "string") return override;
    const alias = PROVIDER_ID_TO_ALIAS[this.provider] || this.provider;
    return getModelTargetFormat(alias, model);
  }

  buildUrl(
    model: string,
    _stream: boolean,
    _urlIndex = 0,
    credentials?: ProviderCredentials | null
  ): string {
    const targetFormat = this.resolveTargetFormat(model, credentials);
    if (targetFormat === "claude") {
      return this.config.messagesUrl || this.config.baseUrl;
    }
    if (targetFormat === "openai-responses") {
      return this.config.responsesBaseUrl || this.config.baseUrl;
    }
    return this.config.baseUrl;
  }

  buildHeaders(
    credentials: ProviderCredentials,
    stream = true,
    clientHeaders?: Record<string, string> | null,
    model?: string,
    health?: Parameters<BaseExecutor["buildHeaders"]>[4],
    body?: unknown
  ): Record<string, string> {
    const headers = super.buildHeaders(credentials, stream, clientHeaders, model, health, body);
    if (
      this.config.messagesUrl &&
      this.buildUrlForBody(model ?? "", body, stream, 0, credentials) === this.config.messagesUrl
    ) {
      headers["anthropic-version"] = "2023-06-01";
    }
    return headers;
  }

  /** Apply the request transform for the same format used to select the endpoint. */
  transformRequest(
    model: string,
    body: unknown,
    stream: boolean,
    credentials: ProviderCredentials
  ): unknown {
    const cleanedBody = super.transformRequest(model, body, stream, credentials);
    if (!cleanedBody || typeof cleanedBody !== "object" || Array.isArray(cleanedBody)) {
      return cleanedBody;
    }
    const payload = cleanedBody as Record<string, unknown>;
    const effectiveModel =
      typeof payload.model === "string" && payload.model ? payload.model : model;
    const targetFormat = this.resolveTargetFormat(effectiveModel, credentials);
    if (targetFormat === "claude") {
      // The per-request billing hash sits before the cache breakpoints and invalidates the prefix.
      stripClaudeSystemBillingLine(payload);
      return payload;
    }
    if (targetFormat === "openai-responses") {
      return { ...payload, store: false };
    }
    // Chat Completions rejects unknown params — never add `store` on that surface.
    return normalizeCIMixedMedia(payload);
  }
}

export default CheaperInferenceExecutor;

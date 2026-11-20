/**
 * `http` decider: an operator-run classifier at its own URL, speaking the System One wire
 * (#18555 `decision-systemone`) or the OpenAI chat-completions wire (#15641 adapters).
 *
 * Never called when the URL or model is missing or invalid, when the URL is this gateway,
 * when a referenced connection yields no key, or while the endpoint cools down after a
 * failure (30 s, per URL). Only the bounded user text and the menu leave the process.
 */
import {
  clampDecisionTimeout,
  isSelfGatewayUrl,
  normalizeDecisionBaseUrl,
  sharedDecisionCooldown,
  type DecisionCooldown,
} from "./config.ts";
import { resolveDecisionApiKey } from "./credentials.ts";
import { postDecisionJson, type DecisionPostFailure, type DecisionTransport } from "./transport.ts";
import { decisionFailure, type Decider, type DecisionWire } from "./types.ts";
import {
  buildOpenAiChatWireBody,
  buildSystemOneWireBody,
  parseOpenAiChatWireAnswer,
  parseSystemOneWireAnswer,
  resolveChatCompletionsUrl,
  toDecisionChoiceResult,
} from "./wires.ts";

export interface HttpDeciderOptions {
  baseUrl?: string;
  wire?: DecisionWire;
  model?: string;
  connectionId?: string;
  timeoutMs?: number;
  apiKeyAllowedConnections?: string[] | null;
  resolveApiKey?: () => Promise<string | null>;
  transport?: DecisionTransport;
  cooldown?: DecisionCooldown;
  now?: () => number;
}

/** Failures that say the endpoint itself is unhealthy (a bad answer does not). */
const COOLDOWN_REASONS = new Set(["timeout", "http_error", "network_error"]);

export function createHttpDecider(options: HttpDeciderOptions): Decider {
  const wire: DecisionWire = options.wire ?? "systemone";
  const cooldown = options.cooldown ?? sharedDecisionCooldown;
  const now = options.now ?? Date.now;
  const timeoutMs = clampDecisionTimeout(options.timeoutMs);
  const resolveApiKey =
    options.resolveApiKey ??
    (() =>
      resolveDecisionApiKey({
        provider: null,
        connectionId: options.connectionId,
        apiKeyAllowedConnections: options.apiKeyAllowedConnections,
      }));

  return async (request) => {
    const base = normalizeDecisionBaseUrl(options.baseUrl);
    const model = options.model?.trim();
    if (!base || !model) return decisionFailure("not_configured");
    if (isSelfGatewayUrl(base)) return decisionFailure("recursion");
    const url = wire === "openai-chat" ? resolveChatCompletionsUrl(base) : `${base}/v1/systemone`;
    if (cooldown.remainingMs(url) > 0) return decisionFailure("cooldown");

    const apiKey = await resolveApiKey();
    if (!apiKey && options.connectionId?.trim()) return decisionFailure("missing_credential");

    const posted = await postDecisionJson({
      url,
      headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : {},
      body:
        wire === "openai-chat"
          ? buildOpenAiChatWireBody(model, request)
          : buildSystemOneWireBody(model, request),
      timeoutMs,
      signal: request.signal,
      transport: options.transport,
      now,
    });
    if (!posted.ok) {
      // `strict: false` does not narrow the `ok` union, so name the failure variant.
      const failure = posted as DecisionPostFailure;
      if (COOLDOWN_REASONS.has(failure.reason)) cooldown.trip(url);
      return failure;
    }
    const answer =
      wire === "openai-chat"
        ? parseOpenAiChatWireAnswer(posted.data)
        : parseSystemOneWireAnswer(posted.data);
    return toDecisionChoiceResult(answer, request, posted.latencyMs);
  };
}

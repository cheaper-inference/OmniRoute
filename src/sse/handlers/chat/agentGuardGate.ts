/**
 * Agent guard dispatch gate (`AGENT_GUARD_MODE=block`).
 *
 * Called where a chat target is dispatched, on the provider the request
 * resolved to, so a provider alias, a bare model id, a combo target or a
 * failover all meet the same decision. It never goes through the guardrail
 * registry and never reads a per-request disable channel (body, metadata,
 * API-key info or headers): a client cannot switch it off. The only exemption
 * is the trusted live combo test, which the caller proves with its process
 * token.
 *
 * The refusal is a 403 carrying the local-policy marker, so combo code treats
 * it as a request-scoped failure, not a provider failure (no breaker, cooldown
 * or lockout).
 *
 * Fails open by design: an internal error never refuses or breaks a request. A
 * defect therefore disables the block for that request, so every such failure
 * writes one `warn` line; a failure while writing a line changes nothing.
 *
 * With the mode `off` or `monitor`, a call costs one cached flag read: no
 * header is read and nothing is allocated.
 */

import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { FORMATS } from "@omniroute/open-sse/translator/formats.ts";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";
import {
  getProviderById,
  isAnthropicCompatibleProvider,
  isOpenAICompatibleProvider,
} from "@/shared/constants/providers";
import { markLocalModelPolicyResponse } from "@/shared/utils/resolvedModelAccess";
import { decideAgentEnforcement, wouldRefuseAgent } from "@/lib/guardrails/agentGuard/enforcement";
import { writeAgentGuardLog, type AgentGuardLogger } from "@/lib/guardrails/agentGuard/logLine";
import { isGuardedProvider, providerFromModelString } from "@/lib/guardrails/agentGuard/policy";
import { resolveAgentGuardMode } from "@/lib/guardrails/agentGuard/settings";
import * as defaultLog from "../../utils/logger";

type GateTarget = {
  request: { headers?: unknown } | null | undefined;
  provider: string | null | undefined;
  modelStr?: string | null;
  apiKeyInfo?: { id?: unknown } | null;
  sourceFormat?: string | null;
  trustedLiveTest?: boolean;
  log?: AgentGuardLogger;
};

type GateState = { refused: boolean; admitted: boolean; logged: Set<string> };
type Decision = NonNullable<ReturnType<typeof decideAgentEnforcement>>;
type HeadersArg = Parameters<typeof decideAgentEnforcement>[0];

const REFUSAL_MESSAGE =
  "This request was refused because the selected model is restricted to official Anthropic clients on this server.";
const REFUSAL_CLASSIFICATION = { type: "permission_error", code: "client_agent_not_allowed" };

/** Per-request state, keyed by the request object; it goes away with the request. */
const requestStates = new WeakMap<object, GateState>();

function stateFor(request: object): GateState {
  let state = requestStates.get(request);
  if (!state) {
    state = { refused: false, admitted: false, logged: new Set() };
    requestStates.set(request, state);
  }
  return state;
}

function headersOf(request: object): HeadersArg {
  const headers = (request as { headers?: unknown }).headers;
  return headers && typeof headers === "object" ? (headers as HeadersArg) : null;
}

function loggerOf(log: AgentGuardLogger | undefined): AgentGuardLogger {
  return log ?? (defaultLog as AgentGuardLogger);
}

function reportFailOpen(log: AgentGuardLogger | undefined, error: unknown): void {
  try {
    const logger = loggerOf(log);
    logger.warn?.call(logger, "AGENT_GUARD", "agent guard failed open", {
      error: error instanceof Error ? error.name : typeof error,
    });
  } catch {
    // A failed log write must not turn a fail-open into a failure.
  }
}

/** One line per request and provider; a failed write never undoes the decision. */
function recordDecision(target: GateTarget, state: GateState, decision: Decision): void {
  if (state.logged.has(decision.provider)) return;
  state.logged.add(decision.provider);
  try {
    writeAgentGuardLog(
      loggerOf(target.log),
      decision.action === "block" ? "warn" : "info",
      decision.reason,
      {
        classification: decision.classification,
        provider: decision.provider,
        model: target.modelStr,
        apiKeyId: target.apiKeyInfo?.id,
      }
    );
  } catch {
    // Logging is best effort; the decision stands.
  }
}

function buildRefusal(sourceFormat: string | null | undefined): Response {
  const body = buildErrorBody(
    HTTP_STATUS.FORBIDDEN,
    REFUSAL_MESSAGE,
    undefined,
    REFUSAL_CLASSIFICATION
  );
  const payload = sourceFormat === FORMATS.CLAUDE ? { type: "error", ...body } : body;
  return markLocalModelPolicyResponse(
    new Response(JSON.stringify(payload), {
      status: HTTP_STATUS.FORBIDDEN,
      headers: { "Content-Type": "application/json" },
    })
  );
}

/**
 * The refusal for this target, or null when it may be dispatched. Records the
 * outcome on the request so a combo can settle its final error.
 */
export function agentGuardRefusal(target: GateTarget): Response | null {
  try {
    if (target.trustedLiveTest === true) return null;
    if (resolveAgentGuardMode() !== "block") return null;
    const request = target.request;
    if (!request || typeof request !== "object") return null;
    const state = stateFor(request);
    const decision = decideAgentEnforcement(headersOf(request), target.provider);
    if (!decision) {
      state.admitted = true;
      return null;
    }
    recordDecision(target, state, decision);
    if (decision.action !== "block") {
      state.admitted = true;
      return null;
    }
    state.refused = true;
    return buildRefusal(target.sourceFormat);
  } catch (error) {
    reportFailOpen(target.log, error);
    return null;
  }
}

function comboEntryModel(entry: unknown): string | null {
  if (typeof entry === "string") return entry;
  if (!entry || typeof entry !== "object") return null;
  const model = (entry as { model?: unknown }).model;
  return typeof model === "string" ? model : null;
}

/**
 * Only a prefix that names a real provider counts: `providerFromModelString`
 * returns any prefix it cannot resolve as-is (`meta-llama`, a combo name with a
 * slash), and such an entry is unknown, not "outside the guard".
 */
function isKnownProvider(provider: string): boolean {
  return (
    getProviderById(provider) !== undefined ||
    isOpenAICompatibleProvider(provider) ||
    isAnthropicCompatibleProvider(provider)
  );
}

function isEntryOutsideGuard(entry: unknown): boolean {
  const model = comboEntryModel(entry);
  const provider = model ? providerFromModelString(model) : null;
  return provider !== null && isKnownProvider(provider) && !isGuardedProvider(provider);
}

function comboHasEntryOutsideGuard(combo: { models?: unknown } | null | undefined): boolean {
  const models = combo && typeof combo === "object" ? combo.models : null;
  return Array.isArray(models) && models.some(isEntryOutsideGuard);
}

/**
 * After a combo finished without success: replace its error with the policy
 * refusal when a target was refused, none was admitted, and no top-level entry
 * names a provider outside the guard (such an entry may have been skipped for
 * an unrelated reason, e.g. a cooldown, before the gate saw it).
 */
export function settleAgentGuardCombo(
  request: object | null | undefined,
  response: Response,
  sourceFormat?: string | null,
  combo?: { models?: unknown[] | null } | null
): Response {
  try {
    if (response.ok || !request) return response;
    const state = requestStates.get(request);
    if (!state || !state.refused || state.admitted) return response;
    if (comboHasEntryOutsideGuard(combo)) return response;
    response.body?.cancel().catch(() => {});
    return buildRefusal(sourceFormat);
  } catch (error) {
    reportFailOpen(undefined, error);
    return response;
  }
}

function fusionJudgeModel(
  combo: { strategy?: unknown; config?: unknown } | null | undefined
): string | null {
  if (!combo || combo.strategy !== "fusion") return null;
  const config = combo.config;
  if (!config || typeof config !== "object") return null;
  const judge = (config as { judgeModel?: unknown }).judgeModel;
  return typeof judge === "string" && judge.trim() ? judge.trim() : null;
}

/**
 * For a `fusion` combo whose configured judge the guard would refuse: the
 * refusal, so the request fails before the panel fans out. A judge that would
 * not be refused leaves the request state untouched.
 */
export function agentGuardFusionJudgeRefusal(
  ctx: Omit<GateTarget, "provider" | "modelStr" | "trustedLiveTest"> & {
    combo: { strategy?: unknown; config?: unknown } | null | undefined;
  }
): Response | null {
  try {
    if (resolveAgentGuardMode() !== "block") return null;
    const judge = fusionJudgeModel(ctx.combo);
    const provider = judge ? providerFromModelString(judge) : null;
    if (!provider || !ctx.request) return null;
    if (!wouldRefuseAgent({ headers: headersOf(ctx.request), provider })) return null;
    return agentGuardRefusal({
      request: ctx.request,
      provider,
      modelStr: judge,
      apiKeyInfo: ctx.apiKeyInfo,
      sourceFormat: ctx.sourceFormat,
      log: ctx.log,
    });
  } catch (error) {
    reportFailOpen(ctx.log, error);
    return null;
  }
}

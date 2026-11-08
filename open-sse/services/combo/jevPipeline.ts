/** Jev adapter for combo target resolution and continuation state. */

import { getModelLockoutInfo } from "../accountFallback.ts";
import { getRemainingCooldownMs } from "../providerCooldownTracker.ts";
import { errorResponseWithComboDiagnostics } from "../../utils/error.ts";
import { getCachedProviderPoolConnections } from "../providerConnectionPool.ts";
import { parseModel } from "../model.ts";
import { findOpenCircuitBreaker } from "./executeTargetGates.ts";
import {
  buildAllTargetsCoolingDownResponse,
  buildEmptyComboTargetsPayload,
  buildRecoveryHint,
  type PreDispatchExclusion,
  type PreDispatchExclusionReason,
} from "./pinRecovery.ts";
import { describeCapabilityFilterExhaustion } from "./comboStructure.ts";
import {
  applySessionStickiness,
  normalizeStickinessMessages,
  peekSessionStickinessBinding,
  resolveDisableSessionStickiness,
  type ApplyStickinessResult,
} from "./sessionStickiness.ts";
import { extractPromptForJevState, orderJevComboTargets } from "./jevOrdering.ts";
import type { JevOrderOutcome } from "./jevOrdering.ts";
import { createJevAsk } from "./jevAsk.ts";
import { applyPromptCacheAffinity, resolvePromptCacheAffinityKey } from "./promptCacheAffinity.ts";
import { partitionJevTargetsForAsk } from "./jevBlockChecker.ts";
import type { JevPartition } from "./jevEligibility.ts";
import { recordComboDecision } from "./decisionTrace.ts";
import type { resolveComboSetupConfig } from "../comboConfig.ts";
import type { ResilienceSettings } from "../../../src/lib/resilience/settings";
import type { NativeTurnPin } from "./nativeCodexTurnPin.ts";
import type {
  ComboLike,
  ComboLogger,
  ComboRelayOptions,
  IsModelAvailable,
  ResolvedComboTarget,
} from "./types.ts";

export interface JevPipelineDeps {
  body: Record<string, unknown>;
  combo: ComboLike;
  config: ReturnType<typeof resolveComboSetupConfig>;
  settings?: Record<string, unknown> | null;
  relayOptions?: ComboRelayOptions | null;
  signal?: AbortSignal | null;
  nativeTurnPin?: NativeTurnPin | null;
  apiKeyAllowedConnections: string[] | null;
  log: ComboLogger;
  resilienceSettings: ResilienceSettings;
  isModelAvailable?: IsModelAvailable;
  deferContextOverflowWhenCompressible?: boolean;
  traceInvocationId?: string | null;
}

export type JevStrategyResult =
  { earlyResponse: Response } | { outcome: JevOrderOutcome; sticky: ApplyStickinessResult };

export async function orderByJevStrategy(
  deps: JevPipelineDeps,
  initialOrderedTargets: ResolvedComboTarget[]
): Promise<JevStrategyResult> {
  const { body, combo, log, signal } = deps;
  const partition = await partitionJevTargetsForAsk(initialOrderedTargets, {
    body,
    config: deps.config as Record<string, unknown> | null | undefined,
    resilienceSettings: deps.resilienceSettings,
    log,
    isModelAvailable: deps.isModelAvailable,
    comboName: combo.name,
    deferContextOverflowWhenCompressible: deps.deferContextOverflowWhenCompressible,
  });

  recordJevBlockedTargets(deps.traceInvocationId, partition.blocked);

  const eligible = partition.eligible;
  if (eligible.length === 0) {
    return { earlyResponse: buildJevAllTargetsBlockedResponse(partition.blocked, deps) };
  }

  const sessionPreview = await previewJevSessionStickiness(deps, eligible);
  const nativePinOwnsRequest = isNativeJevTargetPinned(deps.nativeTurnPin, eligible, deps);
  const hasPromptCachePin =
    !sessionPreview.sticky.stuck &&
    !nativePinOwnsRequest &&
    resolvePromptCacheAffinityKey(body) !== null;
  const promptCacheAffinity = hasPromptCachePin
    ? applyPromptCacheAffinity(eligible, body, true, "global", deps.relayOptions?.sessionId)
    : null;
  const promptCacheWinner = promptCacheAffinity?.targets[0];
  const promptCacheOrderedTargets = promptCacheWinner
    ? [
        promptCacheWinner,
        ...eligible.filter((target) => target.executionKey !== promptCacheWinner.executionKey),
      ]
    : eligible;
  const pinOwnsRequest = sessionPreview.sticky.stuck || nativePinOwnsRequest || hasPromptCachePin;
  const askTargets = sessionPreview.sticky.stuck
    ? sessionPreview.targets
    : promptCacheOrderedTargets;
  const ask = createJevAsk({
    apiKeyAllowedConnections: deps.apiKeyAllowedConnections,
    log,
    signal,
  });

  const outcome = await orderJevComboTargets(askTargets, extractPromptForJevState(body), {
    sessionPinned: pinOwnsRequest,
    ask,
  });
  const routedOutcome = pinOwnsRequest ? { ...outcome, protectHead: true } : outcome;

  recordJevOrderingOutcome(deps.traceInvocationId, routedOutcome, log);
  logJevOrderingSummary({
    pinOwnsRequest,
    comboName: combo.name,
    outcome: routedOutcome,
    eligibleCount: askTargets.length,
    blockedCount: partition.blocked.length,
    log,
  });
  return { outcome: routedOutcome, sticky: sessionPreview.sticky };
}

function recordJevBlockedTargets(
  invocationId: string | null | undefined,
  blocked: JevPartition["blocked"]
): void {
  if (!invocationId) return;
  for (const item of blocked) {
    recordComboDecision(invocationId, {
      step: item.target.executionKey,
      target: item.target.modelStr,
      decision: "skipped_before_dispatch",
      reason: item.reason,
      detail: `verdict=blocked reason=${item.reason}`,
    });
  }
}

function recordJevOrderingOutcome(
  invocationId: string | null | undefined,
  outcome: JevOrderOutcome,
  log: ComboLogger
): void {
  if (invocationId) {
    for (const hold of outcome.holds) {
      recordComboDecision(invocationId, {
        step: hold.executionKey,
        target: hold.modelStr,
        decision: "skipped_before_dispatch",
        reason: hold.reason,
        detail: hold.detail,
      });
    }
    for (const admitted of outcome.admitted) {
      recordComboDecision(invocationId, {
        step: admitted.executionKey,
        target: admitted.modelStr,
        decision: "not_reached",
        detail: admitted.detail,
      });
    }
  }

  if (!outcome.fellOpen || !outcome.fallbackReason) return;
  log.info(
    "COMBO",
    outcome.missingApiKey
      ? "[jev] Falling open to user order (Jev is not configured)"
      : `[jev] Falling open to user order (${outcome.fallbackReason})`
  );
}

function logJevOrderingSummary({
  pinOwnsRequest,
  comboName,
  outcome,
  eligibleCount,
  blockedCount,
  log,
}: {
  pinOwnsRequest: boolean;
  comboName: string;
  outcome: JevOrderOutcome;
  eligibleCount: number;
  blockedCount: number;
  log: ComboLogger;
}): void {
  if (pinOwnsRequest) {
    log.info("COMBO", `[jev] Skipping System One — continuation pin owns combo "${comboName}"`);
    return;
  }
  const targetNames = outcome.targets.map((target) => target.modelStr).join(" → ");
  log.info(
    "COMBO",
    `[jev] Admitted ${outcome.targets.length}/${eligibleCount} eligible (${blockedCount} blocked): ${targetNames}`
  );
}

function jevProviderCooldownRetryMs(
  target: ResolvedComboTarget,
  deps: JevPipelineDeps
): number | null {
  if (!target.provider) return null;
  return (
    Math.max(
      getRemainingCooldownMs(
        target.provider,
        target.connectionId ?? undefined,
        deps.resilienceSettings
      ),
      getRemainingCooldownMs(target.provider, undefined, deps.resilienceSettings)
    ) || null
  );
}

function toJevPreDispatchExclusion(
  { target, reason }: JevPartition["blocked"][number],
  deps: JevPipelineDeps
): PreDispatchExclusion {
  const model = parseModel(target.modelStr).model || target.modelStr;
  const base = { provider: target.provider, model };
  switch (reason) {
    case "circuit_open": {
      const breaker = target.provider
        ? findOpenCircuitBreaker(target.provider, target.connectionId)
        : null;
      return { ...base, reason, retryAfterMs: breaker?.status.retryAfterMs || null };
    }
    case "provider_cooldown":
      return { ...base, reason, retryAfterMs: jevProviderCooldownRetryMs(target, deps) };
    case "model_lockout":
      return {
        ...base,
        reason,
        retryAfterMs:
          getModelLockoutInfo(target.provider, target.connectionId || "", model)?.remainingMs ??
          null,
      };
    case "persisted_cooldown":
      return { ...base, reason: "connection_cooldown", retryAfterMs: null };
    case "quota_cutoff":
      return { ...base, reason, retryAfterMs: null };
    default:
      return { ...base, reason: reason as PreDispatchExclusionReason, retryAfterMs: null };
  }
}

function excludedDiagnostics(exclusions: PreDispatchExclusion[]) {
  return exclusions.map(({ provider, model, reason }) => ({ provider, model, reason }));
}

/** 404 (context window) or 400 (capability) when the blocks share that one cause; else null. */
function buildJevRequirementsResponse(
  blocked: JevPartition["blocked"],
  exclusions: PreDispatchExclusion[],
  deps: JevPipelineDeps
): Response | null {
  if (blocked.length > 0 && blocked.every((item) => item.reason === "context_requirements")) {
    const { message, diagnostics } = buildEmptyComboTargetsPayload(
      blocked.map((item) => item.target),
      (deps.config as { contextRequirements?: { minContextWindow?: number } } | null | undefined)
        ?.contextRequirements?.minContextWindow
    );
    return errorResponseWithComboDiagnostics(404, message, diagnostics, {
      code: "model_not_found",
      type: "invalid_request_error",
    });
  }

  const capabilityExhaustion = describeCapabilityFilterExhaustion(
    blocked.filter((item) => item.reason === "availability").map((item) => item.target),
    deps.body,
    deps.combo.name
  );
  if (!capabilityExhaustion) return null;
  return errorResponseWithComboDiagnostics(
    400,
    capabilityExhaustion.message,
    {
      poolSize: blocked.length,
      attempted: 0,
      excluded: excludedDiagnostics(exclusions),
      attemptOrder: [],
      terminalReason: capabilityExhaustion.terminalReason,
      recovery: buildRecoveryHint(capabilityExhaustion.terminalReason),
    },
    { code: "capability_mismatch", type: "invalid_request_error" }
  );
}

function buildJevAllTargetsSkippedResponse(exclusions: PreDispatchExclusion[]): Response {
  const quotaOnly =
    exclusions.length > 0 && exclusions.every((item) => item.reason === "quota_cutoff");
  const status = quotaOnly ? 429 : 404;
  const terminalReason = quotaOnly ? "quota_exhausted" : "all_targets_skipped";
  return errorResponseWithComboDiagnostics(
    status,
    quotaOnly
      ? "Every target in this combo is below its configured quota cutoff"
      : "Every target in this combo was excluded before Jev could make a choice",
    {
      poolSize: exclusions.length,
      attempted: 0,
      excluded: excludedDiagnostics(exclusions),
      attemptOrder: [],
      terminalReason,
      recovery: buildRecoveryHint(terminalReason),
    },
    {
      code: quotaOnly ? "quota_exhausted" : "all_targets_skipped",
      type: quotaOnly ? "rate_limit_error" : "invalid_request_error",
    }
  );
}

function buildJevAllTargetsBlockedResponse(
  blocked: JevPartition["blocked"],
  deps: JevPipelineDeps
): Response {
  const exclusions = blocked.map((item) => toJevPreDispatchExclusion(item, deps));
  return (
    buildAllTargetsCoolingDownResponse(exclusions) ??
    buildJevRequirementsResponse(blocked, exclusions, deps) ??
    buildJevAllTargetsSkippedResponse(exclusions)
  );
}

async function previewJevSessionStickiness(
  deps: JevPipelineDeps,
  targets: ResolvedComboTarget[]
): Promise<{ targets: ResolvedComboTarget[]; sticky: ApplyStickinessResult }> {
  const disableSessionStickiness =
    resolveDisableSessionStickiness(
      deps.config as Record<string, unknown> | null | undefined,
      deps.settings as Record<string, unknown> | null | undefined
    ) === true;
  const messages = normalizeStickinessMessages(
    deps.body as { messages?: unknown; input?: unknown }
  );
  const binding = peekSessionStickinessBinding(messages, deps.combo.name);
  const noPin: ApplyStickinessResult = {
    targets,
    messageHash: binding.messageHash,
    stuck: false,
  };
  if (disableSessionStickiness) {
    return { targets, sticky: { targets, messageHash: null, stuck: false } };
  }
  if (targets.length <= 1) return { targets, sticky: noPin };

  let previewTargets = targets;
  if (
    binding.connectionId &&
    !targets.some((target) => target.connectionId === binding.connectionId)
  ) {
    if (
      deps.apiKeyAllowedConnections?.length &&
      !deps.apiKeyAllowedConnections.includes(binding.connectionId)
    ) {
      return { targets, sticky: noPin };
    }
    const expanded = await expandJevStickyConnectionTarget(
      targets,
      binding.connectionId,
      binding.modelStr,
      deps.apiKeyAllowedConnections,
      deps.log
    );
    if (!expanded) return { targets, sticky: noPin };
    previewTargets = expanded;
  }

  const stickyPreview = await applySessionStickiness(previewTargets, messages, deps.combo.name);
  const sticky = {
    ...stickyPreview,
    messageHash: stickyPreview.messageHash ?? binding.messageHash,
  };
  return { targets: sticky.stuck ? stickyPreview.targets : targets, sticky };
}

/** Provider of a provider-level target the pinned connection can be bound to, else null. */
function jevStickyExpansionProvider(
  target: ResolvedComboTarget,
  connectionId: string,
  modelStr: string | null
): string | null {
  if (modelStr && target.modelStr !== modelStr) return null;
  if (target.connectionId) return null;
  if (target.allowedConnectionIds && !target.allowedConnectionIds.includes(connectionId)) {
    return null;
  }
  const parsed = parseModel(target.modelStr);
  return target.provider || parsed.provider || parsed.providerAlias || null;
}

async function getJevProviderPool(
  providerPools: Map<string, Array<Record<string, unknown>>>,
  provider: string,
  log: ComboLogger
): Promise<Array<Record<string, unknown>>> {
  let pool = providerPools.get(provider);
  if (pool) return pool;
  try {
    pool = (await getCachedProviderPoolConnections({ provider, isActive: true })) as Array<
      Record<string, unknown>
    >;
  } catch {
    log.warn("COMBO", "[jev] Couldn't resolve the pinned account for the session preview");
    pool = [];
  }
  providerPools.set(provider, pool);
  return pool;
}

async function expandJevStickyConnectionTarget(
  targets: ResolvedComboTarget[],
  connectionId: string,
  modelStr: string | null,
  apiKeyAllowedConnections: string[] | null,
  log: ComboLogger
): Promise<ResolvedComboTarget[] | null> {
  const providerPools = new Map<string, Array<Record<string, unknown>>>();
  let found = false;
  const expanded: ResolvedComboTarget[] = [];
  for (const target of targets) {
    const provider = jevStickyExpansionProvider(target, connectionId, modelStr);
    const pool = provider ? await getJevProviderPool(providerPools, provider, log) : [];
    const connection = pool.find((candidate) => String(candidate.id) === connectionId);
    if (!connection) {
      expanded.push(target);
      continue;
    }
    found = true;
    expanded.push({
      ...target,
      connectionId,
      authType: typeof connection.authType === "string" ? connection.authType : null,
      executionKey: `${target.executionKey}@${connectionId}`,
      allowedConnectionIds: apiKeyAllowedConnections ?? target.allowedConnectionIds,
    });
  }
  return found ? expanded : null;
}

function isNativeJevTargetPinned(
  pin: NativeTurnPin | null | undefined,
  targets: readonly ResolvedComboTarget[],
  deps: JevPipelineDeps
): boolean {
  if (!pin) return false;
  if (
    deps.apiKeyAllowedConnections?.length &&
    !deps.apiKeyAllowedConnections.includes(pin.connectionId)
  ) {
    return false;
  }
  return targets.some((target) => {
    if (target.modelStr !== pin.modelStr || target.provider !== pin.provider) return false;
    if (
      !target.connectionId &&
      target.allowedConnectionIds &&
      !target.allowedConnectionIds.includes(pin.connectionId)
    ) {
      return false;
    }
    return true;
  });
}

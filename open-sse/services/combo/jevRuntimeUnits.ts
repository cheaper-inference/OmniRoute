/** Jev admission for execute-mode nested combo references. */

import { errorResponse } from "../../utils/error.ts";
import { isRuntimeUnitAtConcurrencyCap } from "./runtimeUnitCapacity.ts";
import { createJevAsk } from "./jevAsk.ts";
import { extractPromptForJevState, orderJevComboTargets } from "./jevOrdering.ts";
import { recordComboDecision } from "./decisionTrace.ts";
import {
  calculatePromptCacheAffinityScores,
  promptCacheTargetIdentity,
  resolvePromptCacheAffinityKey,
} from "./promptCacheAffinity.ts";
import { partitionJevTargetsForAsk } from "./jevBlockChecker.ts";
import { normalizeStickinessMessages, peekSessionStickinessBinding } from "./sessionStickiness.ts";
import { resolveResilienceSettings } from "../../../src/lib/resilience/settings.ts";
import type {
  ComboCollectionLike,
  ComboLogger,
  HiddenModelsByProvider,
  IsModelAvailable,
  ResolvedComboUnit,
} from "./types.ts";

export type JevRuntimeUnitResult = {
  units: ResolvedComboUnit[];
  executionStrategy: string;
  earlyResponse: Response | null;
};

type JevRuntimeUnitArgs = {
  units: ResolvedComboUnit[];
  body: Record<string, unknown>;
  comboName: string;
  config: Record<string, unknown>;
  settings?: Record<string, unknown> | null;
  allCombos: ComboCollectionLike;
  apiKeyAllowedConnections?: string[] | null;
  hiddenModelsByProvider?: HiddenModelsByProvider;
  isModelAvailable?: IsModelAvailable;
  invocationId?: string;
  signal?: AbortSignal | null;
  log: ComboLogger;
};

type StickinessPin = ReturnType<typeof peekSessionStickinessBinding>;
type JevOrderOutcome = Awaited<ReturnType<typeof orderJevComboTargets>>;

/** Combo references at their concurrency cap are blocked before Jev (and traced). */
async function blockCappedComboRefs(
  args: JevRuntimeUnitArgs,
  blockedKeys: Set<string>
): Promise<void> {
  for (const unit of args.units) {
    if (unit.kind !== "combo-ref") continue;
    const atCap = await isRuntimeUnitAtConcurrencyCap(
      unit,
      args.allCombos,
      undefined,
      args.hiddenModelsByProvider
    );
    if (!atCap) continue;
    blockedKeys.add(unit.executionKey);
    if (!args.invocationId) continue;
    recordComboDecision(args.invocationId, {
      step: unit.executionKey,
      target: `combo:${unit.comboName}`,
      decision: "skipped_before_dispatch",
      reason: "concurrency_cap",
      detail: "verdict=blocked reason=concurrency_cap",
    });
  }
}

function recordBlockedModels(
  invocationId: string | undefined,
  blocked: Awaited<ReturnType<typeof partitionJevTargetsForAsk>>["blocked"]
): void {
  if (!invocationId) return;
  for (const row of blocked) {
    recordComboDecision(invocationId, {
      step: row.target.executionKey,
      target: row.target.modelStr,
      decision: "skipped_before_dispatch",
      reason: row.reason,
      detail: `verdict=blocked reason=${row.reason}`,
    });
  }
}

function unitAffinityIdentity(unit: ResolvedComboUnit): string {
  return promptCacheTargetIdentity({
    executionKey: unit.executionKey,
    connectionId: unit.kind === "model" ? unit.connectionId : null,
  });
}

/** Moves the unit with the best prompt-cache affinity (ties: lowest identity) to the front. */
function promoteCacheAffinityWinner(
  units: ResolvedComboUnit[],
  body: Record<string, unknown>
): ResolvedComboUnit[] {
  const affinityScores = calculatePromptCacheAffinityScores(
    units.map((unit) => ({
      executionKey: unit.executionKey,
      connectionId: unit.kind === "model" ? unit.connectionId : null,
      authType: unit.kind === "model" ? unit.authType : null,
    })),
    body
  );
  const winner = units.reduce((best, unit) => {
    const identity = unitAffinityIdentity(unit);
    const bestIdentity = unitAffinityIdentity(best);
    const score = affinityScores.get(identity) ?? -1;
    const bestScore = affinityScores.get(bestIdentity) ?? -1;
    if (score !== bestScore) return score > bestScore ? unit : best;
    return identity.localeCompare(bestIdentity) < 0 ? unit : best;
  });
  return [winner, ...units.filter((unit) => unit.executionKey !== winner.executionKey)];
}

function findPinnedUnitIndex(units: ResolvedComboUnit[], pin: StickinessPin): number {
  if (pin.modelStr === null) return -1;
  return units.findIndex(
    (unit) =>
      unit.kind === "model" &&
      unit.modelStr === pin.modelStr &&
      (!pin.connectionId || unit.connectionId === pin.connectionId)
  );
}

function recordJevOutcome(invocationId: string | undefined, outcome: JevOrderOutcome): void {
  if (!invocationId) return;
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

function unitChoiceLabel(unit: ResolvedComboUnit): string {
  if (unit.label) return unit.label;
  return unit.kind === "combo-ref" ? `combo:${unit.comboName}` : unit.modelStr;
}

/**
 * Judge runtime units without expanding combo references into their child models.
 * A referenced combo applies its own model-level pre-dispatch checks when run.
 */
export async function orderJevRuntimeUnits(
  args: JevRuntimeUnitArgs
): Promise<JevRuntimeUnitResult> {
  const modelUnits = args.units.filter(
    (unit): unit is Extract<ResolvedComboUnit, { kind: "model" }> => unit.kind === "model"
  );
  const modelPartition = await partitionJevTargetsForAsk(modelUnits, {
    body: args.body,
    config: args.config,
    resilienceSettings: resolveResilienceSettings(args.settings),
    log: args.log,
    comboName: args.comboName,
    isModelAvailable: args.isModelAvailable,
  });
  const eligibleModels = new Set(modelPartition.eligible.map((target) => target.executionKey));
  const blockedKeys = new Set(modelPartition.blocked.map((row) => row.target.executionKey));
  await blockCappedComboRefs(args, blockedKeys);
  recordBlockedModels(args.invocationId, modelPartition.blocked);

  let eligibleUnits = args.units.filter((unit) =>
    unit.kind === "model"
      ? eligibleModels.has(unit.executionKey)
      : !blockedKeys.has(unit.executionKey)
  );
  if (eligibleUnits.length === 0) {
    return {
      units: [],
      executionStrategy: "priority",
      earlyResponse: errorResponse(404, "Every target in this combo was blocked before Jev"),
    };
  }

  const pin = peekSessionStickinessBinding(normalizeStickinessMessages(args.body), args.comboName);
  const hasPromptCachePin =
    pin.modelStr === null && resolvePromptCacheAffinityKey(args.body) !== null;
  if (hasPromptCachePin) eligibleUnits = promoteCacheAffinityWinner(eligibleUnits, args.body);
  const pinnedIndex = findPinnedUnitIndex(eligibleUnits, pin);
  const sessionPinned = pinnedIndex >= 0 || hasPromptCachePin;
  const choiceTargets = eligibleUnits.map((unit) => ({
    unit,
    executionKey: unit.executionKey,
    modelStr: unit.kind === "model" ? unit.modelStr : `combo:${unit.comboName}`,
    label: unitChoiceLabel(unit),
  }));
  const outcome = await orderJevComboTargets(choiceTargets, extractPromptForJevState(args.body), {
    sessionPinned,
    ask: createJevAsk({
      apiKeyAllowedConnections: args.apiKeyAllowedConnections,
      log: args.log,
      signal: args.signal,
    }),
  });
  recordJevOutcome(args.invocationId, outcome);

  const orderedUnits = outcome.targets.map((target) => target.unit);
  if (sessionPinned && pinnedIndex > 0) {
    const pinned = eligibleUnits[pinnedIndex];
    return {
      units: [pinned, ...orderedUnits.filter((unit) => unit.executionKey !== pinned.executionKey)],
      executionStrategy: "priority",
      earlyResponse: null,
    };
  }
  return { units: orderedUnits, executionStrategy: "priority", earlyResponse: null };
}

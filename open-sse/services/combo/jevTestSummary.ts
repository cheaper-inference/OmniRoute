/**
 * Combo health-check summary for strategy `jev` (#15276).
 *
 * Runs the same pre-ask block partition as live routing. Does not call TypeSafe:
 * without a user message a choice would be a fake decision. Returns structured
 * rows only; the dashboard renders the Admitted/Held/Blocked sentences via
 * next-intl so every locale can translate them.
 */

import type { ResilienceSettings } from "../../../src/lib/resilience/settings";
import { partitionJevTargetsForAsk } from "./jevBlockChecker.ts";
import type { ComboLogger, IsModelAvailable, ResolvedComboTarget } from "./types.ts";

export type JevComboTestSummary = {
  /** Eligible targets, not yet judged (a test cannot call Jev without a user message). */
  eligible: Array<{ model: string; executionKey: string }>;
  /** Targets blocked before Jev, with their pre-ask skip reason. */
  blocked: Array<{ model: string; executionKey: string; reason: string }>;
  /** Present when no TypeSafe API key is configured. */
  configurationNote: string | null;
};

const noopLog: ComboLogger = {
  info: () => {},
  warn: () => {},
  debug: () => {},
};

export async function buildJevComboTestSummary(args: {
  targets: readonly ResolvedComboTarget[];
  comboName: string;
  config?: Record<string, unknown> | null;
  resilienceSettings: ResilienceSettings;
  hasTypesafeKey: boolean;
  isModelAvailable?: IsModelAvailable;
  log?: ComboLogger;
}): Promise<JevComboTestSummary> {
  const partition = await partitionJevTargetsForAsk(args.targets, {
    body: {},
    config: args.config ?? null,
    resilienceSettings: args.resilienceSettings,
    log: args.log ?? noopLog,
    comboName: args.comboName,
    isModelAvailable: args.isModelAvailable,
  });

  const eligible = partition.eligible.map((target) => ({
    model: target.modelStr,
    executionKey: target.executionKey,
  }));
  const blocked = partition.blocked.map((row) => ({
    model: row.target.modelStr,
    executionKey: row.target.executionKey,
    reason: row.reason,
  }));

  return {
    eligible,
    blocked,
    configurationNote: args.hasTypesafeKey ? null : "Jev is not configured",
  };
}

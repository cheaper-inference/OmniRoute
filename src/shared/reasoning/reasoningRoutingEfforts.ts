import {
  STANDARD_REASONING_EFFORTS,
  EXTENDED_REASONING_EFFORTS,
} from "@omniroute/open-sse/config/reasoningEfforts.ts";
import { codexModelFamilySupportsExtendedEffort } from "./codexExtendedEffort";

export { STANDARD_REASONING_EFFORTS, EXTENDED_REASONING_EFFORTS };

type ExtendedReasoningEffort = (typeof EXTENDED_REASONING_EFFORTS)[number];

/**
 * The rules editor accepts provider-prefixed ids (`codex/`, `cx/`, `openai/` #14961, and
 * `github/`, `opencode-zen/`… #14059); the alias-set lookup shared with the Codex executor
 * (#14720) matches bare ids, so strip any single provider namespace here — the same way the
 * routing policy resolves `modelIdForRegistry`.
 */
export function supportsExtendedCodexEffort(
  model: string,
  effort: ExtendedReasoningEffort
): boolean {
  return codexModelFamilySupportsExtendedEffort(model.trim().replace(/^[^/]+\//, ""), effort);
}

export function getReasoningRoutingTargetEffortOptions(
  model: string,
  currentTargetEffort: string
): string[] {
  return [
    ...STANDARD_REASONING_EFFORTS,
    ...EXTENDED_REASONING_EFFORTS.filter(
      (effort) => supportsExtendedCodexEffort(model, effort) || currentTargetEffort === effort
    ),
  ];
}

/**
 * chatCore Kimi Coding effort-variant normalizer (#16985).
 *
 * The Kimi Coding endpoint serves bare model ids (`k3`, `kimi-for-coding`) and takes the
 * reasoning effort as a request property. A suffixed id such as `kimi-coding/kimi-k3-high`
 * was dispatched verbatim and rejected upstream with
 * `401 Your model id does not exist ... Please set model id as k3`.
 *
 * Scoped to the two Kimi Coding providers (`kimi-coding` / `kmc` and `kimi-coding-apikey` /
 * `kmca`). Cursor's genuine `kimi-k3-high` / `kimi-k3-low` ids belong to another provider and
 * never reach this helper. The strip happens only when:
 *   - the requested id is not itself a registry id of the provider, and
 *   - it ends in a known effort token, and
 *   - the remaining base is a registry id, or a spec alias of one (`kimi-k3` → wire `k3`).
 * Bare spec aliases may also normalize to a wire id without synthesizing an effort.
 * The body is mutated in place (model + reasoning_effort); an explicit client effort or an
 * explicitly disabled `thinking` always wins over the suffix.
 */

import { splitKimiCodingEffortVariant } from "../../utils/kimiCodingEffortVariant.ts";

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function isK31Model(modelId: string): boolean {
  return /(?:^|\/)(?:kimi-)?k3\.1(?:$|-)/i.test(modelId);
}

function hasExplicitEffortValue(body: Record<string, unknown>, modelId: string): boolean {
  const thinking = asRecord(body.thinking);
  const efforts = [
    body.reasoning_effort,
    asRecord(body.reasoning)?.effort,
    asRecord(body.output_config)?.effort,
    thinking?.effort,
  ];
  if (efforts.some((value) => value !== undefined && value !== null && value !== "")) return true;
  return isK31Model(modelId) && efforts.some((value) => value !== undefined);
}

function hasExplicitEffort(body: Record<string, unknown>, modelId: string): boolean {
  return hasExplicitEffortValue(body, modelId) || asRecord(body.thinking)?.type === "disabled";
}

export function applyKimiCodingEffortVariant(opts: {
  provider: string | null | undefined;
  effectiveModel: string;
  /** Mutated in place when a wire alias or effort suffix is normalized. */
  body: unknown;
}): { effectiveModel: string; log: string | null } {
  const body = asRecord(opts.body);
  if (body && isK31Model(opts.effectiveModel)) {
    if (body.enable_thinking === false && !hasExplicitEffortValue(body, opts.effectiveModel)) {
      body.thinking = { ...(asRecord(body.thinking) || {}), type: "disabled" };
    }
    delete body.enable_thinking;
  }

  const split = splitKimiCodingEffortVariant(opts.provider, opts.effectiveModel);
  if (!split) return { effectiveModel: opts.effectiveModel, log: null };

  let effortNote = "policy default";
  if (body) {
    body.model = split.wireModel;
    if (hasExplicitEffort(body, opts.effectiveModel)) {
      effortNote = "explicit effort kept";
    } else if (split.effort) {
      body.reasoning_effort = split.effort;
      effortNote = `reasoning_effort=${split.effort}`;
    }
  }
  return {
    effectiveModel: split.wireModel,
    log: `Kimi Coding effort variant: ${opts.effectiveModel} → ${split.wireModel} (${effortNote})`,
  };
}

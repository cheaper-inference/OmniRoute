/**
 * Opt-in write-time check for combo model steps (OMNIROUTE_COMBO_MODEL_WRITE_CHECK).
 *
 * `findStaleComboModelRefs` reports unknown models after the fact. This check runs before a
 * combo is saved, so a typo is caught at save time and not on live traffic. It fails open for
 * everything the model resolver cannot judge (nested combo refs, wildcard steps, errors).
 */

import { getModelInfo } from "@/sse/services/model";
import { getComboModelString } from "./steps";
import { isExplicitModelStep } from "./staleModelRefs";

export const COMBO_MODEL_WRITE_CHECK_ENV = "OMNIROUTE_COMBO_MODEL_WRITE_CHECK";

export function isComboModelWriteCheckEnabled(request: Request): boolean {
  const flag = /^(1|true|yes|on)$/i.test(process.env[COMBO_MODEL_WRITE_CHECK_ENV]?.trim() ?? "");
  return flag && new URL(request.url).searchParams.get("force") !== "true";
}

/** Model strings of explicit steps that the resolver reports as `model_not_found`. */
export async function findUnknownComboModels(steps: unknown): Promise<string[]> {
  const unknown: string[] = [];
  for (const step of Array.isArray(steps) ? steps : []) {
    if (!isExplicitModelStep(step)) continue;
    const model = getComboModelString(step);
    if (!model || model.endsWith("/*")) continue;
    try {
      const info = (await getModelInfo(model)) as { errorType?: string } | null;
      if (info?.errorType === "model_not_found") unknown.push(model);
    } catch {
      // Retired or malformed ids have their own guards; do not block the write here.
    }
  }
  return unknown;
}

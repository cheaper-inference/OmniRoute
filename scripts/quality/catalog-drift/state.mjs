import { readFileSync } from "node:fs";

import { z } from "zod";

export const FETCH_FAILURE_THRESHOLD = 2;
export const DRIFT_CONFIRMATION_RUNS = 2;

const stateSchema = z.object({
  schemaVersion: z.literal(1),
  probes: z.record(
    z.string(),
    z.object({
      consecutiveFailures: z.int().nonnegative(),
      lastOutcome: z.enum(["ok", "failed"]),
      lastRunAt: z.iso.datetime(),
      textChars: z.int().nonnegative().nullable(),
    })
  ),
  providers: z.record(
    z.string(),
    z.object({
      fingerprint: z
        .string()
        .regex(/^[0-9a-f]{16}$/)
        .nullable(),
      consecutiveRuns: z.int().nonnegative(),
      lastRunAt: z.iso.datetime(),
    })
  ),
});

/** @typedef {z.infer<typeof stateSchema>} DriftState */

/** @returns {DriftState} */
export function emptyState() {
  return { schemaVersion: 1, probes: {}, providers: {} };
}

/** @param {DriftState} state @param {"ok"|"failed"} outcome */
export function recordFetch(state, probeId, outcome, nowIso, textChars) {
  const previous = state.probes[probeId];
  const consecutiveFailures = outcome === "failed" ? (previous?.consecutiveFailures ?? 0) + 1 : 0;
  return {
    state: {
      ...state,
      probes: {
        ...state.probes,
        [probeId]: {
          consecutiveFailures,
          lastOutcome: outcome,
          lastRunAt: nowIso,
          textChars: outcome === "ok" ? textChars : (previous?.textChars ?? null),
        },
      },
    },
    consecutiveFailures,
  };
}

/** @param {DriftState} state */
export function recordProviderRun(state, provider, fingerprint, nowIso) {
  const previous = state.providers[provider];
  let consecutiveRuns = fingerprint ? 1 : 0;
  if (fingerprint && previous?.fingerprint === fingerprint) {
    consecutiveRuns = previous.consecutiveRuns + 1;
  }
  return {
    state: {
      ...state,
      providers: {
        ...state.providers,
        [provider]: { fingerprint, consecutiveRuns, lastRunAt: nowIso },
      },
    },
    consecutiveRuns,
  };
}

/** @returns {DriftState} */
export function loadState(file) {
  try {
    const result = stateSchema.safeParse(JSON.parse(readFileSync(file, "utf8")));
    return result.success ? result.data : emptyState();
  } catch (error) {
    if (error.code === "ENOENT" || error instanceof SyntaxError) return emptyState();
    throw error;
  }
}

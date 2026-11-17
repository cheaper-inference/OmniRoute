/**
 * Per-unit failure outcomes for the nested runtime-unit loop (runtimeUnits.ts).
 *
 * The flat attempt loop records one structured {model, status, error, kind} entry per
 * failed target and renders the terminal message with formatComboOutcomes (#10314). The
 * runtime-unit loop used to return only the LAST unit's response, so when an earlier unit
 * failed for a real reason (an empty reply rejected by quality validation, a 400) and the
 * last unit was merely skipped before dispatch ("Model X is unavailable"), the client saw
 * only the skip and the real cause was lost.
 *
 * This module keeps the same entries for the runtime-unit loop and rewrites only the
 * `error.message` of the terminal response when two or more units failed. Status, headers
 * and every other body field (code, type, diagnostics, retry hints) stay as they were.
 */
import { sanitizeErrorMessage } from "../../utils/error.ts";
import { inheritEmptyTurnPolicy } from "../../utils/emptyTurnPolicy.ts";
import { inheritLocalProcessPressureResponse } from "../../utils/localPressureResponse.ts";
import { inheritNoReplayResponse } from "../../utils/noReplayResponse.ts";
import { inheritProviderProbeResponse } from "../../../src/shared/utils/providerProbeResult.ts";
import { inheritTrustedLocalRateLimitResponse } from "../rateLimitManager/errors.ts";
import { readAttemptFailure } from "./attemptFailure.ts";
import {
  classifyComboOutcome,
  formatComboOutcomes,
  type ComboErrorEntry,
} from "./comboErrorAggregation.ts";
import { isContextOverflow400 } from "./comboPredicates.ts";
import { isSafetyRejection } from "./safetyStopLatch.ts";

// Responses this loop built for a unit it never dispatched (pre-dispatch availability or
// concurrency skip). Identity-keyed so an upstream body cannot claim to be a skip.
const skippedUnitResponses = new WeakSet<Response>();

export function markSkippedUnitResponse(response: Response): Response {
  skippedUnitResponses.add(response);
  return response;
}

export interface RuntimeUnitOutcomes {
  entries: ComboErrorEntry[];
  failedUnitKeys: Set<string>;
}

export function createRuntimeUnitOutcomes(): RuntimeUnitOutcomes {
  return { entries: [], failedUnitKeys: new Set() };
}

function pushOutcome(outcomes: RuntimeUnitOutcomes, unitKey: string, entry: ComboErrorEntry) {
  outcomes.failedUnitKeys.add(unitKey);
  const duplicate = outcomes.entries.some(
    (e) =>
      e.model === entry.model &&
      e.status === entry.status &&
      e.error === entry.error &&
      e.kind === entry.kind
  );
  if (!duplicate) outcomes.entries.push(entry);
}

/** Record one failed unit attempt. `quality` is the entry built from a quality rejection. */
export async function recordRuntimeUnitFailure(
  outcomes: RuntimeUnitOutcomes,
  unitKey: string,
  model: string,
  response: Response,
  quality: ComboErrorEntry | null
): Promise<void> {
  if (quality) {
    pushOutcome(outcomes, unitKey, quality);
    return;
  }
  const failure = await readAttemptFailure(response);
  const error = failure.errorText || String(response.status);
  pushOutcome(outcomes, unitKey, {
    model,
    status: response.status,
    error,
    kind: skippedUnitResponses.has(response)
      ? "skipped"
      : classifyComboOutcome(response.status, failure.errorText),
    ...(failure.structuredError?.code ? { code: failure.structuredError.code } : {}),
  });
}

function inheritResponseMarkers(source: Response, target: Response): Response {
  return inheritTrustedLocalRateLimitResponse(
    source,
    inheritLocalProcessPressureResponse(
      source,
      inheritNoReplayResponse(
        source,
        inheritEmptyTurnPolicy(source, inheritProviderProbeResponse(source, target))
      )
    )
  );
}

/**
 * Replace the terminal response's `error.message` with every unit's reason when more than
 * one unit failed. Safety stops and context-overflow rejections keep their exact wording
 * (clients key off it), and a non-JSON body is returned unchanged.
 */
export async function withRuntimeUnitOutcomes(
  response: Response,
  outcomes: RuntimeUnitOutcomes
): Promise<Response> {
  if (outcomes.failedUnitKeys.size < 2 || outcomes.entries.length < 2) return response;
  if (await isSafetyRejection(response)) return response;
  let body: unknown;
  try {
    body = await response.clone().json();
  } catch {
    return response;
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) return response;
  const error = (body as Record<string, unknown>).error;
  if (!error || typeof error !== "object" || Array.isArray(error)) return response;
  const previous = (error as Record<string, unknown>).message;
  if (typeof previous !== "string") return response;
  if ((response.status === 400 || response.status === 413) && isContextOverflow400(previous)) {
    return response;
  }
  const message = sanitizeErrorMessage(formatComboOutcomes(outcomes.entries));
  if (!message) return response;
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  const rewritten = new Response(JSON.stringify({ ...body, error: { ...error, message } }), {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
  return inheritResponseMarkers(response, rewritten);
}

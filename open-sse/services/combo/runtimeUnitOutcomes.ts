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
  isFreeTierRefusalOutcome,
  redactConnectionLabel,
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

// Per-unit reason budget, same as the quality validator's reason slice (validateQuality.ts).
const MAX_UNIT_REASON_LEN = 300;

function collapseControlCharacters(value: string): string {
  let out = "";
  for (const ch of value) {
    const code = ch.charCodeAt(0);
    out += code < 32 || code === 127 ? " " : ch;
  }
  return out.replace(/\s+/g, " ").trim();
}

/** Cut to the budget without leaving half of a surrogate pair at the end. */
function capUnitReason(value: string): string {
  const cut = value.slice(0, MAX_UNIT_REASON_LEN);
  const last = cut.charCodeAt(cut.length - 1);
  return (last >= 0xd800 && last <= 0xdbff ? cut.slice(0, -1) : cut).trimEnd();
}

/**
 * Make one unit's reason (or label) safe to join with the others. Each part is sanitized on
 * its own because a pass over the joined message keeps only the first line, caps at 4096
 * chars, treats a path-like span as running to the end and redacts a credential label
 * fail-closed (everything after it), so one raw multi-line, HTML, oversized or
 * credential-bearing upstream body would otherwise swallow every later unit's reason.
 * Connection identifiers are redacted before the cap: an identifier cut in half no longer
 * matches the redaction.
 */
function normalizeUnitReason(reason: string): string {
  const sanitized = sanitizeErrorMessage(collapseControlCharacters(reason));
  // An empty reason stays empty (the formatter shows "HTTP <status>" for it).
  return sanitized ? capUnitReason(redactConnectionLabel(sanitized)) : sanitized;
}

function pushOutcome(outcomes: RuntimeUnitOutcomes, unitKey: string, raw: ComboErrorEntry) {
  outcomes.failedUnitKeys.add(unitKey);
  // The free-tier check reads the full reason; the signal can sit past the display cap.
  const entry: ComboErrorEntry = {
    ...raw,
    model: normalizeUnitReason(raw.model),
    error: normalizeUnitReason(raw.error),
    ...(isFreeTierRefusalOutcome(raw) ? { freeTierRefusal: true } : {}),
  };
  const duplicate = outcomes.entries.some(
    (e) =>
      e.model === entry.model &&
      e.status === entry.status &&
      e.error === entry.error &&
      e.kind === entry.kind &&
      e.freeTierRefusal === entry.freeTierRefusal
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

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

/** The JSON body, its `error` object and `error.message`, or null when any is missing. */
async function readTerminalErrorMessage(response: Response): Promise<{
  body: Record<string, unknown>;
  error: Record<string, unknown>;
  previous: string;
} | null> {
  let body: unknown;
  try {
    body = await response.clone().json();
  } catch {
    return null;
  }
  if (!isPlainObject(body) || !isPlainObject(body.error)) return null;
  const previous = body.error.message;
  return typeof previous === "string" ? { body, error: body.error, previous } : null;
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
  const terminal = await readTerminalErrorMessage(response);
  if (!terminal) return response;
  const { body, error, previous } = terminal;
  if ((response.status === 400 || response.status === 413) && isContextOverflow400(previous)) {
    return response;
  }
  // Every upstream-derived part (label and reason) was sanitized on its own in pushOutcome
  // and the rest is fixed text, so the joined message is not sanitized again as a whole: that
  // pass matched an already-redacted "Password: [REDACTED]" and cut the unit's status and
  // every later unit. The formatter lists at most 5 entries, each a label and a reason of
  // <= 300 chars, so the message stays under the sanitizer's 4096-char budget.
  const message = formatComboOutcomes(outcomes.entries);
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

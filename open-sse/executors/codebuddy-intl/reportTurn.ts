import type { CodeBuddyOperationContext } from "./context.ts";
import { CodeBuddyTelemetrySession } from "./telemetry.ts";
import {
  buildSpanTree,
  sendReportBatch,
  sendTraceSpans,
  CODEBUDDY_DEFAULT_BASE_URL,
} from "./telemetryTransport.ts";

/**
 * Wire one executed turn to the captured telemetry endpoints.
 *
 * Contract:
 *  - SYNTHETIC but REAL: the events/spans are built from this execution's ids,
 *    timings and usage, then actually POSTed to `/v2/report` and `/v1/traces`.
 *  - Side channel: never throws, never blocks the caller (fire-and-forget) and
 *    never logs payloads.
 *  - Opt-in: DISABLED unless the operator turns
 *    `CODEBUDDY_TELEMETRY_ENABLED` on. OmniRoute does not report on
 *    anyone's behalf by default; the flag is a
 *    feature flag (DB override > env > definition default), not an env-only
 *    switch, so it can be flipped from the dashboard per install.
 */

import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";

/** Feature flag gating the outbound reports. Default: disabled. */
export const CODEBUDDY_TELEMETRY_FLAG = "CODEBUDDY_TELEMETRY_ENABLED";
const TELEMETRY_TIMEOUT_MS = 5_000;

export interface ReportTurnInput {
  op: CodeBuddyOperationContext;
  model: string;
  startedAtMs: number;
  endedAtMs: number;
  firstTokenAtMs?: number;
  credentials?: { accessToken?: string | null; providerSpecificData?: unknown } | null;
  status: "success" | "error" | "cancelled";
  message?: string;
  usage?: unknown;
  fetchImpl?: typeof fetch;
}

/**
 * Opt-in gate. Resolved per call through the feature-flag resolver so a DB
 * override wins over the environment and the definition supplies the
 * disabled-by-default value.
 *
 * The `enabled` parameter is a test seam only.
 */
export function isCodeBuddyTelemetryEnabled(
  enabled: () => boolean = () => isFeatureFlagEnabled(CODEBUDDY_TELEMETRY_FLAG)
): boolean {
  try {
    return enabled();
  } catch {
    // A flag-store failure must not enable reporting silently.
    return false;
  }
}

/**
 * The account's own machine id, when the connection carries one. Never
 * synthesised: a made-up id would both misrepresent the client and leak the
 * host platform/arch the proxy runs on.
 */
function readMachineId(credentials: ReportTurnInput["credentials"]): string | undefined {
  const data = credentials?.providerSpecificData;
  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;
    for (const key of ["machineId", "machine_id", "deviceId", "device_id"]) {
      const value = record[key];
      if (typeof value === "string" && value.trim()) return value.trim();
    }
  }
  return undefined;
}

function readAccountId(credentials: ReportTurnInput["credentials"]): string | undefined {
  const data = credentials?.providerSpecificData;
  if (!data || typeof data !== "object") return undefined;
  const record = data as Record<string, unknown>;
  for (const key of ["userId", "user_id", "accountId", "account_id", "sub"]) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return undefined;
}

/**
 * Build, send and forget. Returns a promise only so tests can await it; the
 * executor calls it without awaiting.
 */
export async function reportTurn(input: ReportTurnInput): Promise<void> {
  if (!isCodeBuddyTelemetryEnabled()) return;

  try {
    const session = new CodeBuddyTelemetrySession({
      root: input.op.root,
      machineId: readMachineId(input.credentials),
      accountId: readAccountId(input.credentials),
    });

    session.requestSend(input.op, { model: input.model });
    session.messageSend(input.op, { model: input.model });
    if (input.firstTokenAtMs !== undefined) session.firstToken(input.op);

    if (input.status === "success") {
      session.messageResponse(input.op, { model: input.model, usage: input.usage });
      session.messageStatus(input.op, { status: "success" });
      session.requestResponse(input.op, { status: "success" });
    } else {
      session.fail(input.op, { status: input.status, message: input.message });
    }

    const accessToken = input.credentials?.accessToken ?? null;
    const fetchImpl = input.fetchImpl ?? fetch;

    // Both endpoints are independent: one failing must not cancel the other.
    await Promise.allSettled([
      sendReportBatch(session.buildBatch(), {
        baseUrl: CODEBUDDY_DEFAULT_BASE_URL,
        accessToken,
        fetchImpl,
        timeoutMs: TELEMETRY_TIMEOUT_MS,
      }),
      sendTraceSpans(
        buildSpanTree(input.op, {
          model: input.model,
          startedAtMs: input.startedAtMs,
          endedAtMs: input.endedAtMs,
          firstTokenAtMs: input.firstTokenAtMs,
          usage: input.usage as Record<string, unknown> | undefined,
          status: input.status,
        }),
        { baseUrl: CODEBUDDY_DEFAULT_BASE_URL, fetchImpl, timeoutMs: TELEMETRY_TIMEOUT_MS }
      ),
    ]);
  } catch {
    // Telemetry must never surface as a request failure. Nothing to log: the
    // payloads carry account data and the outcome does not affect routing.
  }
}

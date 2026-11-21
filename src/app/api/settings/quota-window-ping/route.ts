import { NextResponse } from "next/server";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  QuotaWindowPingStoreError,
  createDbQuotaWindowPingStore,
  createWindowPingTarget,
  deleteWindowPingTarget,
  listWindowPingRuns,
  listWindowPingTargets,
  updateWindowPingTarget,
} from "@/lib/db/quotaWindowPing";
import { getProviderConnectionById } from "@/lib/db/providers";
import { getSettings } from "@/lib/db/settings";
import { nextWakeupAt } from "@/lib/services/codexWakeupSchedule";
import { evaluateTargetEligibility, runWindowPingTarget } from "@/lib/services/quotaWindowPing";
import { refreshQuotaWindowPingScheduler } from "@/lib/services/quotaWindowPingScheduler";
import {
  isQuotaWindowPingEnabled,
  isTargetableDescriptor,
  listQuotaWindowDescriptors,
} from "@/shared/constants/quotaWindowPing";
import type {
  QuotaWindowDescriptor,
  QuotaWindowPingEligibilityReason,
  WindowPingTargetInput,
} from "@/shared/types/quotaWindowPing";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import type { QuotaWindowPingConnection } from "@/lib/services/quotaWindowPing";
import { quotaWindowPingActionSchema } from "@/shared/validation/quotaWindowPingSchemas";

/**
 * Quota window ping targets (Settings -> AI -> Codex Quota Auto-Ping).
 *
 * GET  -> { enabled, descriptors, targets, runs } (newest 50 runs).
 * POST -> { action: "create", target } | { action: "update", id, target }
 *       | { action: "delete", id } | { action: "run", id }.
 *
 * Every ping spends real quota, so this is a management route. Error bodies carry
 * fixed messages only; upstream text never reaches a response.
 */

export const dynamic = "force-dynamic";

const STORE_ERRORS: Record<QuotaWindowPingStoreError["code"], [number, string]> = {
  not_found: [404, "Quota ping target not found"],
  running: [409, "Quota ping target is running; wait for it to finish"],
  limit: [409, "Maximum number of quota ping targets reached"],
  duplicate: [409, "Quota ping target already exists for this connection and window"],
};

const ELIGIBILITY_FAILURES: Record<QuotaWindowPingEligibilityReason, [number, string]> = {
  descriptor_unknown: [400, "Unknown quota window descriptor"],
  descriptor_not_targetable: [400, "Quota window descriptor is not targetable"],
  descriptor_excluded: [400, "Quota window descriptor is excluded from pinging"],
  connection_missing: [400, "Provider connection not found"],
  provider_mismatch: [400, "Connection does not match the quota window provider"],
  unsupported_auth: [400, "Quota window pings require an OAuth connection"],
  account_disabled: [400, "Provider connection is not active"],
  model_unavailable: [400, "Model is not available for this provider"],
  duplicate_target: [409, "Quota ping target already exists for this connection and window"],
};

function invalid(message: string) {
  return createErrorResponse({ status: 400, message, type: "invalid_request" });
}

function runningResponse() {
  return createErrorResponse({
    status: 409,
    message: STORE_ERRORS.running[1],
    type: "conflict",
  });
}

function descriptorView(descriptor: QuotaWindowDescriptor) {
  return {
    id: descriptor.id,
    provider: descriptor.provider,
    displayName: descriptor.displayName,
    scope: descriptor.scope,
    windowId: descriptor.windowId,
    kind: descriptor.kind,
    durationSeconds: descriptor.durationSeconds,
    policy: descriptor.policy,
    scheduledAllowed: descriptor.scheduledAllowed,
    targetable: isTargetableDescriptor(descriptor),
    longerWindow: descriptor.longerWindow,
  };
}

function refreshScheduler(): void {
  void refreshQuotaWindowPingScheduler().catch(() => {
    // Arming is best-effort; the next settings write or boot retries it.
  });
}

async function ensureEligible(
  target: WindowPingTargetInput,
  excludeTargetId?: string
): Promise<Response | null> {
  const eligibility = await evaluateTargetEligibility(
    {
      connectionId: target.connectionId,
      descriptorId: target.descriptorId,
      model: target.model ?? null,
      excludeTargetId,
    },
    {
      // Type-only: service expects a narrower record than the untyped DB row.
      getProviderConnectionById: getProviderConnectionById as unknown as (
        id: string
      ) => Promise<QuotaWindowPingConnection | null>,
      store: createDbQuotaWindowPingStore(),
    }
  );
  if (eligibility.eligible) return null;
  const reason = eligibility.reason ?? "connection_missing";
  const [status, message] = ELIGIBILITY_FAILURES[reason];
  return createErrorResponse({
    status,
    message,
    type: status === 409 ? "conflict" : "invalid_request",
  });
}

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const settings = await getSettings();
    return NextResponse.json({
      enabled: isQuotaWindowPingEnabled(settings),
      descriptors: listQuotaWindowDescriptors().map(descriptorView),
      targets: listWindowPingTargets(),
      runs: listWindowPingRuns(50),
    });
  } catch {
    return createErrorResponse({
      status: 500,
      message: "Failed to load quota window ping settings",
    });
  }
}

async function saveTarget(target: WindowPingTargetInput, id: string | null) {
  const ineligible = await ensureEligible(target, id ?? undefined);
  if (ineligible) return ineligible;
  const nowMs = Date.now();
  const nextRunAt = target.enabled && target.schedule ? nextWakeupAt(target.schedule, nowMs) : null;
  const saved = id
    ? updateWindowPingTarget(id, target, nextRunAt, nowMs)
    : createWindowPingTarget(target, nextRunAt, nowMs);
  refreshScheduler();
  return NextResponse.json({ target: saved }, { status: id ? 200 : 201 });
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return invalid("Invalid JSON body");
  }
  const validation = validateBody(quotaWindowPingActionSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }
  // Type-only: Zod marks optional fields `T | undefined`; runtime values are identical.
  const body = validation.data as
    | { action: "create"; target: WindowPingTargetInput }
    | { action: "update"; id: string; target: WindowPingTargetInput }
    | { action: "delete"; id: string }
    | { action: "run"; id: string };

  try {
    switch (body.action) {
      case "create":
        return await saveTarget(body.target, null);
      case "update":
        return await saveTarget(body.target, body.id);
      case "delete":
        deleteWindowPingTarget(body.id);
        refreshScheduler();
        return NextResponse.json({ ok: true });
      case "run": {
        // The runner claims the target; a live lease inserts its own
        // skipped/in_flight audit row and comes back as an in_flight decision.
        const outcome = await runWindowPingTarget(body.id, "manual");
        if (!outcome) {
          return createErrorResponse({
            status: 404,
            message: STORE_ERRORS.not_found[1],
            type: "not_found",
          });
        }
        if (outcome.decision.reason === "in_flight") return runningResponse();
        return NextResponse.json({ run: outcome.run });
      }
    }
  } catch (error) {
    if (error instanceof QuotaWindowPingStoreError) {
      const [status, message] = STORE_ERRORS[error.code];
      return createErrorResponse({
        status,
        message,
        type: status === 409 ? "conflict" : "not_found",
      });
    }
    return createErrorResponse({
      status: 500,
      message: "Quota window ping operation failed",
    });
  }
}

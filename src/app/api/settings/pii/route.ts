import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { updatePiiSettingsSchema } from "@/shared/validation/schemas/piiSettings";
import { getPiiSettings, setPiiSettings, type PiiSettings } from "@/lib/db/piiSettings";
import { getPiiDetectionStats } from "@/lib/pii/piiDetectionStats";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import { PII_BUILTIN_TYPES } from "@/shared/constants/piiTypes";
import { logAuditEvent, getAuditRequestContext } from "@/lib/compliance/index";

export const dynamic = "force-dynamic";

function buildPayload(settings: PiiSettings) {
  return {
    // Masking itself is switched by these opt-in feature flags (default off).
    requestMaskingEnabled: isFeatureFlagEnabled("PII_REDACTION_ENABLED"),
    responseSanitizationEnabled: isFeatureFlagEnabled("PII_RESPONSE_SANITIZATION"),
    availableTypes: [...PII_BUILTIN_TYPES],
    enabledTypes: settings.enabledTypes,
    customPatterns: settings.customPatterns,
    stats: getPiiDetectionStats(),
  };
}

/** GET /api/settings/pii — per-type selection, custom patterns and detection counters. */
export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    return NextResponse.json(buildPayload(getPiiSettings()));
  } catch (error) {
    console.error("[PII] Failed to read PII settings:", error);
    return createErrorResponse({ status: 500, message: "Failed to read PII settings" });
  }
}

/** PUT /api/settings/pii — replace the per-type selection and/or the custom pattern list. */
export async function PUT(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return createErrorResponse({ status: 400, message: "Invalid JSON body" });
  }

  const validation = validateBody(updatePiiSettingsSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    const saved = setPiiSettings(validation.data);
    const ctx = getAuditRequestContext(request);
    logAuditEvent({
      action: "settings.pii.updated",
      // Counts only: patterns can encode what the operator considers sensitive.
      metadata: {
        enabledTypes: saved.enabledTypes ? saved.enabledTypes.length : "all",
        customPatterns: saved.customPatterns.length,
      },
      ipAddress: ctx.ipAddress ?? undefined,
      requestId: ctx.requestId,
    });
    return NextResponse.json(buildPayload(saved));
  } catch (error) {
    console.error("[PII] Failed to save PII settings:", error);
    return createErrorResponse({ status: 500, message: "Failed to save PII settings" });
  }
}

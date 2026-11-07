import { NextResponse } from "next/server";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponse } from "@/lib/api/errorResponse";
import {
  clearQuotaAlertLatch,
  getQuotaAlertLatch,
  setQuotaAlertLatch,
} from "@/lib/db/quotaAlertLatch";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

/**
 * Persisted dedupe state for the opt-in dashboard quota alerts
 * (`quotaWindowAlerts.ts` / `useQuotaWindowAlerts`).
 *
 * GET → { latch } · PUT { latch } → { latch } · DELETE → { latch: {} }
 *
 * The latch only records which windows/credits already produced a toast, so a
 * page reload does not re-toast them. No upstream call, no quota consumed;
 * management auth is used because it is a persisted dashboard setting.
 */

export const dynamic = "force-dynamic";

const latchSchema = z.object({
  latch: z.record(z.string().max(200), z.number().finite()).optional(),
});

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    return NextResponse.json({ latch: getQuotaAlertLatch() });
  } catch {
    return createErrorResponse({ status: 500, message: "Failed to load quota alert state" });
  }
}

export async function PUT(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return createErrorResponse({
      status: 400,
      message: "Invalid JSON body",
      type: "invalid_request",
    });
  }
  const validation = validateBody(latchSchema, rawBody);
  if (isValidationFailure(validation)) {
    return createErrorResponse({ status: 400, message: "Invalid quota alert state" });
  }

  try {
    const latch = validation.data.latch ?? {};
    setQuotaAlertLatch(latch);
    return NextResponse.json({ latch });
  } catch {
    return createErrorResponse({ status: 500, message: "Failed to save quota alert state" });
  }
}

export async function DELETE(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    clearQuotaAlertLatch();
    return NextResponse.json({ latch: {} });
  } catch {
    return createErrorResponse({ status: 500, message: "Failed to reset quota alert state" });
  }
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { setAccountKeyLimit, getAccountKeyLimit } from "@/lib/db/registeredKeys";

// Issuance caps are operator configuration read by POST /api/v1/registered-keys, so this route
// takes the same management credential — see ../../../registered-keys/route.ts for why the guard
// is explicit here.

const limitsSchema = z.object({
  maxActiveKeys: z.number().int().positive().nullable().optional(),
  dailyIssueLimit: z.number().int().positive().nullable().optional(),
  hourlyIssueLimit: z.number().int().positive().nullable().optional(),
});

/**
 * GET /api/v1/accounts/[id]/limits
 * Get the current issuance limits for an account.
 */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const resolvedParams = await params;
  const limits = getAccountKeyLimit(resolvedParams.id);
  return NextResponse.json({ accountId: resolvedParams.id, limits: limits ?? null });
}

/**
 * PUT /api/v1/accounts/[id]/limits
 * Configure issuance limits for an account.
 */
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validation = validateBody(limitsSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const resolvedParams = await params;
  setAccountKeyLimit(resolvedParams.id, validation.data);
  const updated = getAccountKeyLimit(resolvedParams.id);
  return NextResponse.json({ accountId: resolvedParams.id, limits: updated });
}

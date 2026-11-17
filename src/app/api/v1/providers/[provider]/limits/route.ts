import { NextResponse } from "next/server";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { setProviderKeyLimit, getProviderKeyLimit } from "@/lib/db/registeredKeys";

// Issuance caps are operator configuration read by POST /api/v1/registered-keys, so this route
// takes the same management credential — see ../../../registered-keys/route.ts for why the guard
// is explicit here.

const limitsSchema = z.object({
  maxActiveKeys: z.number().int().positive().nullable().optional(),
  dailyIssueLimit: z.number().int().positive().nullable().optional(),
  hourlyIssueLimit: z.number().int().positive().nullable().optional(),
});

/**
 * GET /api/v1/providers/[provider]/limits
 * Get the current issuance limits for a provider.
 */
export async function GET(request: Request, { params }: { params: Promise<{ provider: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const { provider } = await params;
  const limits = getProviderKeyLimit(provider);
  return NextResponse.json({ provider, limits: limits ?? null });
}

/**
 * PUT /api/v1/providers/[provider]/limits
 * Configure issuance limits for a provider.
 */
export async function PUT(request: Request, { params }: { params: Promise<{ provider: string }> }) {
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

  const { provider } = await params;
  setProviderKeyLimit(provider, validation.data);
  const updated = getProviderKeyLimit(provider);
  return NextResponse.json({ provider, limits: updated });
}

import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { testPiiPatternSchema } from "@/shared/validation/schemas/piiSettings";
import { previewPiiCustomPattern } from "@/shared/utils/piiCustomPatterns";

export const dynamic = "force-dynamic";

/**
 * POST /api/settings/pii/test — dry-run one custom pattern against a sample
 * (at most 8 KB). Unsafe or invalid patterns are refused with 400 by the same
 * gate the save path uses. Nothing is stored.
 */
export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return createErrorResponse({ status: 400, message: "Invalid JSON body" });
  }

  const validation = validateBody(testPiiPatternSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    const result = previewPiiCustomPattern(validation.data);
    if (!result.valid) {
      return createErrorResponse({ status: 400, message: "Pattern rejected" });
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error("[PII] Pattern test failed:", error);
    return createErrorResponse({ status: 500, message: "Pattern test failed" });
  }
}

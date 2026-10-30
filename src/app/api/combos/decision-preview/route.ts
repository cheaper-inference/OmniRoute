import { NextResponse } from "next/server";
import { getPricingForModel } from "@/lib/db/settings";
import { buildDecisionPreview } from "@/lib/combos/decisionPreview";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { decisionPreviewSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

/**
 * POST /api/combos/decision-preview
 *
 * Generated decision-menu descriptions for the combo builder; with `prompt`, also one
 * live call to the configured decision service (it may bill that service).
 */
export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  const validation = validateBody(decisionPreviewSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    const result = await buildDecisionPreview(validation.data, {
      getPricing: getPricingForModel,
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 500 });
  }
}

/**
 * API: Validate Webhook URL
 * POST — Check if a URL is safe to use as a webhook endpoint (SSRF guard)
 */

import { z } from "zod";
import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { OutboundUrlGuardError } from "@/shared/network/outboundUrlGuard";
import { parseAndValidateWebhookUrl } from "@/shared/network/outboundUrlGuardPolicy";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";
import { WEBHOOK_URL_MAX_LENGTH } from "@/shared/constants/formLimits";

const validateUrlSchema = z.object({
  url: z.string().min(1).max(WEBHOOK_URL_MAX_LENGTH),
});

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validation = validateBody(validateUrlSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const { url } = validation.data;

  try {
    parseAndValidateWebhookUrl(url);
    return NextResponse.json({ valid: true });
  } catch (err) {
    // The guard also throws for text that is not an http(s) URL at all (OUTBOUND_URL_INVALID):
    // that is "invalid", not "a blocked private address".
    if (err instanceof OutboundUrlGuardError && err.code !== "OUTBOUND_URL_INVALID") {
      return NextResponse.json({ valid: false, reason: "blocked_private" });
    }
    return NextResponse.json({ valid: false, reason: "invalid_url" });
  }
}

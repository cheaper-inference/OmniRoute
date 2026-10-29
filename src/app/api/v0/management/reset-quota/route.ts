import { NextResponse } from "next/server";

import { cliProxyErrorResponse, requireCliProxyManagementAuth } from "@/lib/cliproxyCompat/http";
import { CliProxyResetQuotaSchema, resetCliProxyQuota } from "@/lib/cliproxyCompat/managementApi";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

/**
 * CLIProxyAPI-compatible `POST /v0/management/reset-quota`. Lifts OmniRoute's local
 * cooldown / model lockouts for one Claude or Codex OAuth account so routing resumes.
 */
export async function POST(request: Request) {
  const authError = await requireCliProxyManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(buildErrorBody(400, "Invalid JSON body"), { status: 400 });
  }
  const validation = validateBody(CliProxyResetQuotaSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    return NextResponse.json(await resetCliProxyQuota(validation.data.auth_index));
  } catch (error) {
    return cliProxyErrorResponse(error, "POST /v0/management/reset-quota");
  }
}

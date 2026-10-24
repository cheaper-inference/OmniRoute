import { NextResponse } from "next/server";

import { cliProxyErrorResponse, requireCliProxyManagementAuth } from "@/lib/cliproxyCompat/http";
import { CliProxyApiCallSchema, executeCliProxyApiCall } from "@/lib/cliproxyCompat/managementApi";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

/**
 * CLIProxyAPI-compatible `POST /v0/management/api-call`. Runs ONE allowlisted Claude/Codex
 * usage request with the account's OAuth token injected server-side and returns
 * `{ status_code, body }`. Not a generic proxy — see src/lib/cliproxyCompat/managementApi.ts.
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
  const validation = validateBody(CliProxyApiCallSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    return NextResponse.json(await executeCliProxyApiCall(validation.data));
  } catch (error) {
    return cliProxyErrorResponse(error, "POST /v0/management/api-call");
  }
}

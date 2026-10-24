import { NextResponse } from "next/server";

import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

import { CliProxyCompatError } from "./managementApi";

/**
 * Management auth for the CLIProxyAPI compat routes. `alwaysRequireAuth`: these routes act
 * with stored OAuth credentials, so they stay authenticated even with login disabled
 * (they are also ALWAYS_PROTECTED in routeGuard.ts). A dashboard session or a `manage`
 * scoped API key (what clients paste as the "management key") passes; inference-only keys
 * get 403 and anonymous callers 401.
 */
export function requireCliProxyManagementAuth(request: Request): Promise<Response | null> {
  return requireManagementAuth(request, { alwaysRequireAuth: true, invalidApiKeyStatus: 401 });
}

export function cliProxyErrorResponse(error: unknown, route: string): Response {
  if (error instanceof CliProxyCompatError) {
    return NextResponse.json(
      { error: sanitizeErrorMessage(error.message) || "Request failed.", code: error.code },
      { status: error.status }
    );
  }
  console.error(`[API] ${route} error: ${sanitizeErrorMessage(error)}`);
  return NextResponse.json(buildErrorBody(500, "Internal server error"), { status: 500 });
}

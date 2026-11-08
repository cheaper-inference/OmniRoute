import { NextResponse } from "next/server";

import { cliProxyErrorResponse, requireCliProxyManagementAuth } from "@/lib/cliproxyCompat/http";
import { listCliProxyAuthFiles } from "@/lib/cliproxyCompat/managementApi";

/**
 * CLIProxyAPI-compatible `GET /v0/management/auth-files` (also served at the root
 * `/v0/management/auth-files` through the next.config.mjs rewrite). Lists the Claude and
 * Codex OAuth connections — metadata only, never tokens.
 */
export async function GET(request: Request) {
  const authError = await requireCliProxyManagementAuth(request);
  if (authError) return authError;

  try {
    return NextResponse.json(await listCliProxyAuthFiles());
  } catch (error) {
    return cliProxyErrorResponse(error, "GET /v0/management/auth-files");
  }
}

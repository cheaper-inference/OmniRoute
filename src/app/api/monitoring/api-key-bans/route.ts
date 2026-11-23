import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getApiKeyBanSummary } from "@/lib/db/apiKeys/banSummary";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

const headers = { "Cache-Control": "private, no-store" };

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request, { alwaysRequireAuth: true });
  if (authError) return authError;

  try {
    return NextResponse.json(getApiKeyBanSummary(), { headers });
  } catch {
    return NextResponse.json(buildErrorBody(500, "Failed to load API key bans"), {
      status: 500,
      headers,
    });
  }
}

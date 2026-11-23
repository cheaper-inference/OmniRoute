import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getApiKeyBanSummary } from "@/lib/db/apiKeys/banSummary";

const headers = { "Cache-Control": "private, no-store" };

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request, { alwaysRequireAuth: true });
  if (authError) return authError;

  try {
    return NextResponse.json(getApiKeyBanSummary(), { headers });
  } catch {
    return NextResponse.json({ error: "Failed to load API key bans" }, { status: 500, headers });
  }
}

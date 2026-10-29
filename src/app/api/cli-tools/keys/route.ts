import { NextResponse } from "next/server";
import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { resolveOperatorCredential } from "@/lib/api/operatorCredential";
import { getApiKeys } from "@/lib/db/apiKeys";
import { maskStoredApiKey } from "@/lib/apiKeyExposure";

// GET /api/cli-tools/keys - List API keys; plaintext `rawKey` only for the instance operator
// (dashboard session / local CLI / login disabled). Machine credentials (API keys, `oma_`
// access tokens of any scope) get the masked listing so a delegated token cannot recover
// higher-privilege keys.
export async function GET(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  let operator: Awaited<ReturnType<typeof resolveOperatorCredential>>;
  try {
    operator = await resolveOperatorCredential(request);
  } catch {
    return createErrorResponse({
      status: 503,
      message: "Service temporarily unavailable",
      type: "server_error",
    });
  }

  try {
    const keys = await getApiKeys();
    const cliToolKeys = keys.map((key) => ({
      ...key,
      ...(operator ? { rawKey: key.key } : {}),
      key: maskStoredApiKey(key.key),
    }));
    return NextResponse.json({ keys: cliToolKeys, total: cliToolKeys.length });
  } catch (error) {
    console.log("Error fetching CLI tool keys:", error);
    return NextResponse.json({ error: "Failed to fetch CLI tool keys" }, { status: 500 });
  }
}

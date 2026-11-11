import { RosebudError } from "@omniroute/open-sse/services/rosebud/cli.ts";
import { rosebudAccount } from "@/lib/rosebud/provider";
import { makeDiagnosis } from "./codexAppServerHealth";

/** Check a Rosebud account and describe the outcome for the shared connection-test path. */
export async function testRosebudAccount(
  connectionId: string,
  check: (id: string) => Promise<{ status: string }> = rosebudAccount
) {
  try {
    const account = await check(connectionId);
    if (account.status === "active") {
      return {
        valid: true,
        error: null,
        refreshed: false,
        statusCode: 200,
        diagnosis: makeDiagnosis("ok", "upstream", null, null),
      };
    }
    const error = "Rosebud authorization required";
    return {
      valid: false,
      error,
      refreshed: false,
      statusCode: 401,
      diagnosis: makeDiagnosis("reauth_required", "upstream", error, "expired"),
    };
  } catch (cause) {
    const error = "Rosebud account check failed";
    return {
      valid: false,
      error,
      refreshed: false,
      statusCode: cause instanceof RosebudError ? cause.status : 502,
      diagnosis: makeDiagnosis(
        "runtime_error",
        "local",
        error,
        cause instanceof RosebudError ? cause.code : "account_check_failed"
      ),
    };
  }
}

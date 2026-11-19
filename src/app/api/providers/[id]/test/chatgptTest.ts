import {
  ChatGptDiscoveryError,
  discoverChatGptModels,
} from "@/lib/providerModels/chatgptDiscovery";
import { makeDiagnosis } from "./codexAppServerHealth";
import { classifyFailure, toSafeMessage } from "./publicErrorBoundary";

/** Retest probe for a ChatGPT (Sign in with ChatGPT) connection: the live catalog call. */
export async function testChatGptConnection(connection: any) {
  try {
    await discoverChatGptModels(connection);
    return {
      valid: true,
      error: null,
      refreshed: false,
      diagnosis: makeDiagnosis("ok", "oauth", null, null),
    };
  } catch (cause) {
    const known = cause instanceof ChatGptDiscoveryError;
    const error = toSafeMessage(
      known ? cause.message : "ChatGPT live catalog is temporarily unavailable."
    );
    const requiresReauth = (known && cause.requiresReauth) || connection.testStatus === "expired";
    const statusCode = known ? cause.status : 503;
    return {
      valid: false,
      error,
      statusCode,
      refreshed: false,
      diagnosis: requiresReauth
        ? makeDiagnosis("token_expired", "oauth", error, "expired")
        : classifyFailure({ error, statusCode }),
    };
  }
}

/**
 * A rejected ChatGPT refresh credential stays `expired` (re-authentication needed)
 * and must not park the connection behind a rate-limit cooldown.
 */
export function chatGptReauthUpdate(
  provider: string,
  result: { valid?: boolean },
  diagnosis: { code?: unknown }
): { testStatus: "expired"; rateLimitedUntil: null } | Record<string, never> {
  return provider === "chatgpt" && !result.valid && diagnosis.code === "expired"
    ? { testStatus: "expired", rateLimitedUntil: null }
    : {};
}

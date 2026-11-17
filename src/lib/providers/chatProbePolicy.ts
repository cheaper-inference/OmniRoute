import { getExecutor } from "@omniroute/open-sse/executors/index.ts";
import { chatProbeIsolationOf } from "@omniroute/open-sse/executors/chatProbeIsolation.ts";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { requiresWebSessionCredential } from "@/shared/providers/webSessionCredentials";

/**
 * Automated chat probes (model tests, combo tests, assessments) must never leave a
 * conversation on a signed-in provider account (#14780). This is the one place that
 * decides: the chat pipeline asks it for every target a probe reaches, after the
 * target's provider is resolved and before any credential is chosen.
 *
 * An API-key provider keeps no conversation history, so a probe is fine. A web-session
 * provider acts as the signed-in user and saves every chat to that account, unless its
 * executor declares that it runs chats in the provider's no-history mode
 * (`ChatProbeIsolatingExecutor`).
 */

/**
 * `x-internal-test` value that marks an assessment probe: gated like a live model test
 * (`combo-health-check`) but without the live test's breaker, cooldown and quota bypasses.
 */
export const ASSESSMENT_PROBE_MARK = "assessment";

/** `error.code` of the refusal, so a probe runner reports a skip rather than a failure. */
export const CHAT_PROBE_NOT_ISOLATED_CODE = "chat_probe_not_isolated";

export const CHAT_PROBE_NOT_ISOLATED_MESSAGE =
  "Skipped: web-session providers are excluded from chat probes to avoid creating provider conversations";

/** Whether an automated chat probe may reach this provider. */
export async function chatProbeLeavesNoConversation(provider: string): Promise<boolean> {
  const id = provider.trim().toLowerCase();
  if (!requiresWebSessionCredential(id)) return true;
  try {
    return chatProbeIsolationOf(await getExecutor(id)) !== null;
  } catch {
    // No executor to ask means nothing vouches for the probe: keep it off the account.
    return false;
  }
}

/** The refusal for a probe that would leave a conversation on `provider`, or null to let it run. */
export async function refuseUnisolatedChatProbe(provider: string): Promise<Response | null> {
  if (await chatProbeLeavesNoConversation(provider)) return null;
  return errorResponse(422, CHAT_PROBE_NOT_ISOLATED_MESSAGE, {
    type: "invalid_request_error",
    code: CHAT_PROBE_NOT_ISOLATED_CODE,
  });
}

/** Whether a probe response is the pipeline's refusal (read from its JSON error body). */
export function isChatProbeRefusal(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const error = (body as { error?: unknown }).error;
  return (
    !!error &&
    typeof error === "object" &&
    (error as { code?: unknown }).code === CHAT_PROBE_NOT_ISOLATED_CODE
  );
}

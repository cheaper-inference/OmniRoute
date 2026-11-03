import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance";
import { getApiKeyMetadata } from "@/lib/db/apiKeys";
import { isCliTokenAuthValid } from "@/lib/middleware/cliTokenAuth";
import { readSubjectFromHeaders } from "@/server/authz/assertAuth";
import { isDashboardSessionAuthenticated } from "@/shared/utils/apiAuth";
import { extractApiKey } from "@/sse/services/auth";

/**
 * Audit helpers shared by the settings writers (`PATCH /api/settings`,
 * `POST /api/settings/require-login`), so every refused settings write lands in the same
 * `settings.update_failed` row shape whichever route refused it.
 */

/**
 * Derive an audit actor string from the inbound request. Falls back to
 * `"dashboard"` for cookie sessions, `"apikey:<id>"` for Bearer API keys,
 * `"cli"` for CLI machine-token sessions, and `"anonymous"` otherwise. Best
 * effort — any lookup error degrades to `"unknown"` so the audit row still
 * carries actor context.
 */
export async function deriveSettingsAuditActor(request: Request): Promise<string> {
  try {
    if (await isDashboardSessionAuthenticated(request)) return "dashboard";
  } catch {
    /* fall through */
  }
  const subject = readSubjectFromHeaders(request.headers);
  if (subject.kind === "management_key" && subject.label === "local-cli-token") return "cli";
  try {
    if (await isCliTokenAuthValid(request)) return "cli";
  } catch {
    /* fall through */
  }
  try {
    const apiKey = extractApiKey(request);
    if (apiKey) {
      const meta = await getApiKeyMetadata(apiKey);
      if (meta?.id) return `apikey:${meta.id}`;
      return "apikey:unknown";
    }
  } catch {
    return "unknown";
  }
  return "anonymous";
}

/** Emit a settings.update_failed row. Never throws — audit must not break flow. */
export function emitSettingsFailureAudit(
  request: Request,
  actor: string,
  reason: string,
  attemptedKeys: string[]
) {
  try {
    const { ipAddress, requestId } = getAuditRequestContext(request);
    logAuditEvent({
      action: "settings.update_failed",
      actor,
      target: "settings",
      resourceType: "settings",
      status: "failure",
      ipAddress: ipAddress || undefined,
      requestId: requestId || undefined,
      details: { reason, attempted_keys: attemptedKeys },
    });
  } catch {
    /* best effort */
  }
}

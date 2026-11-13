import { persistCodexChildCooldown } from "../../services/codexAccount/index.ts";
import { sanitizeErrorMessage } from "../../utils/errorSanitization.ts";

type CodexFailoverCredentials = {
  connectionId?: string | null;
  providerSpecificData?: unknown;
};

export async function markCodexScopeRateLimited(params: {
  failedConnectionId: string;
  model: string | null;
  rateLimitedUntil: string;
  credentials?: CodexFailoverCredentials | null;
}): Promise<void> {
  const persisted = params.model
    ? await persistCodexChildCooldown({
        connectionId: params.failedConnectionId,
        model: params.model,
        rateLimitedUntil: params.rateLimitedUntil,
      }).catch((error) => {
        console.warn(
          `[codex] scope cooldown persist failed for ${params.failedConnectionId}: ${sanitizeErrorMessage(error instanceof Error ? error.message : String(error))}`
        );
        return null;
      })
    : null;

  if (
    persisted &&
    params.credentials &&
    String(params.credentials.connectionId) === params.failedConnectionId
  ) {
    params.credentials.providerSpecificData = persisted.providerSpecificData;
  }
}

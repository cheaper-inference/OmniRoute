import { updateProviderConnection } from "@/lib/db/providers";

import { isOpencodeFreeTierRefusalForProvider } from "../../executors/opencodeGeoBlock.ts";
import { PROVIDER_ERROR_TYPES } from "../../services/errorClassifier.ts";
import { noteOpencodeFreeTierSkip } from "../../services/opencodeFreeTierSkip.ts";
import { recordAntigravityVerificationUrl } from "./antigravityVerificationState.ts";

/**
 * chatCore leaf for PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR: a project/routing
 * refusal is recorded on the connection but never bans it.
 */
export async function handleProjectRouteFailure(params: {
  provider: string | null | undefined;
  connectionId: string;
  statusCode: number;
  persistentMessage: string;
  message: string;
  upstreamErrorBody: unknown;
  targetModel: string;
}): Promise<void> {
  const { provider, connectionId, statusCode, message } = params;
  await updateProviderConnection(connectionId, {
    lastErrorType: PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR,
    lastError: params.persistentMessage,
    errorCode: statusCode,
  });
  console.warn(
    `[provider] Node ${connectionId} project routing error (${statusCode}) -- not banning`
  );
  // Antigravity 403 VALIDATION_REQUIRED: keep Google's "verify your account"
  // link on the connection so the dashboard can offer a Verify button.
  await recordAntigravityVerificationUrl({
    provider,
    connectionId,
    upstreamErrorBody: params.upstreamErrorBody,
    message,
  });
  // #14313: free-tier refusal on the keyless path — record a short TTL
  // skip so auto-combo / noauth fallback stop re-picking it immediately.
  if (
    connectionId === "noauth" &&
    isOpencodeFreeTierRefusalForProvider(provider, statusCode, message)
  ) {
    noteOpencodeFreeTierSkip(provider, Date.now(), undefined, params.targetModel);
  }
}

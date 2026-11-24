import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import {
  errorResponse,
  modelCooldownResponse,
  unavailableResponse,
} from "@omniroute/open-sse/utils/error.ts";
import { echoableModelLockStatus } from "../services/modelLockUpstreamStatus.ts";
import * as log from "../utils/logger";

type CredentialCooldownState = {
  modelNotSupported?: boolean;
  lastError?: string;
  lastErrorCode?: number | string;
  cooldownModel?: string;
  cooldownScope?: string;
  retryAfterHuman?: string;
  retryAfter?: string;
  connectionsCount?: number;
};

/**
 * The status and message of an all-cooling-down answer. A model-only lock that kept a billing-class
 * upstream status (400/402) answers with that status and message, so an earlier
 * attempt's 429 cannot hide it. A 429 lock, which is also the default when the lock kept no
 * status, leaves the attempt's own status in front.
 */
function cooldownStatusAndMessage(
  credentials: CredentialCooldownState,
  lastError: string | null,
  lastStatus: number | null
) {
  const lockStatus = Number(credentials.lastErrorCode) || null;
  // Only the billing class (400/402) is echoed; getProviderCredentials already clamps, this
  // keeps a hand-built credentials object from echoing a 401/403/5xx as a local answer.
  const echoedStatus =
    credentials.cooldownScope === "model" ? echoableModelLockStatus(lockStatus) : null;
  if (echoedStatus !== null) {
    return { status: echoedStatus, errorMsg: credentials.lastError || lastError || "Unavailable" };
  }
  return {
    status: lastStatus || lockStatus || HTTP_STATUS.SERVICE_UNAVAILABLE,
    errorMsg: lastError || credentials.lastError || "Unavailable",
  };
}

/** Preserve the existing cooldown diagnostics, with a specific learned-rejection response. */
export function credentialCooldownResponse(
  credentials: CredentialCooldownState,
  provider: string,
  model: string,
  lastError: string | null,
  lastStatus: number | null
) {
  if (credentials.modelNotSupported === true) {
    return errorResponse(400, "The requested model is not supported.", {
      code: "model_not_supported",
      type: "invalid_request_error",
    });
  }
  const { status, errorMsg } = cooldownStatusAndMessage(credentials, lastError, lastStatus);
  const cooldownModel =
    typeof credentials.cooldownModel === "string" && credentials.cooldownModel.trim().length > 0
      ? credentials.cooldownModel.trim()
      : model;

  if (credentials.cooldownScope === "model" && Number(status) === HTTP_STATUS.RATE_LIMITED) {
    log.warn(
      "CHAT",
      `[${provider}/${cooldownModel}] all credentials cooling down${
        credentials.retryAfterHuman ? ` (${credentials.retryAfterHuman})` : ""
      }`
    );
    return modelCooldownResponse({
      model: cooldownModel,
      retryAfter: credentials.retryAfter,
      retryAfterAt: typeof credentials.retryAfter === "string" ? credentials.retryAfter : null,
      credentialsCoolingCount:
        typeof credentials.connectionsCount === "number" ? credentials.connectionsCount : null,
    });
  }

  log.warn("CHAT", `[${provider}/${model}] ${errorMsg} (${credentials.retryAfterHuman})`);
  return unavailableResponse(
    status,
    `[${provider}/${model}] ${errorMsg}`,
    credentials.retryAfter,
    credentials.retryAfterHuman
  );
}

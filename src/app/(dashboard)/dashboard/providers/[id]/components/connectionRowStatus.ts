import type { ConnectionRowConnection } from "./connectionRowTypes";
import { ERROR_TYPE_LABELS, providerText } from "../providerPageHelpers";

// ---------------------------------------------------------------------------
// inferErrorType
// ---------------------------------------------------------------------------

const PARKED_ROW_ERROR_TYPE: Record<string, string | undefined> = {
  deactivated: "account_deactivated",
  expired: "expired",
};

function inferErrorType(connection: ConnectionRowConnection, isCooldown: boolean): string | null {
  if (isCooldown) return "upstream_rate_limited";
  if (connection.testStatus === "banned") return "banned";
  if (connection.testStatus === "credits_exhausted") return "credits_exhausted";
  // The other parked verdicts carry no error type of their own, so the row would show whatever the
  // last failure said. Name them here, the way the model-health endpoint already does.
  const parked = PARKED_ROW_ERROR_TYPE[connection.testStatus];
  if (parked) return parked;
  if (connection.lastErrorType) return connection.lastErrorType;

  const code = Number(connection.errorCode);
  if (code === 401 || code === 403) return "upstream_auth_error";
  if (code === 429) return "upstream_rate_limited";
  if (code >= 500) return "upstream_unavailable";

  return inferTypeFromMessage((connection.lastError || "").toLowerCase());
}

/** The wording of the last failure, for rows that carry no status or code of their own. */
function inferTypeFromMessage(msg: string): string | null {
  if (!msg) return null;
  if (RUNTIME_WORDING.some((needle) => msg.includes(needle))) return "runtime_error";
  if (msg.includes("refresh failed")) return "token_refresh_failed";
  if (msg.includes("token expired") || msg.includes("expired")) return "token_expired";
  if (AUTH_WORDING.some((needle) => msg.includes(needle))) return "upstream_auth_error";
  if (RATE_WORDING.some((needle) => msg.includes(needle))) return "upstream_rate_limited";
  if (NETWORK_WORDING.some((needle) => msg.includes(needle))) return "network_error";
  if (msg.includes("not supported")) return "unsupported";
  return "upstream_error";
}

const RUNTIME_WORDING = ["runtime", "not runnable", "not installed", "healthcheck"];
const AUTH_WORDING = ["invalid api key", "token invalid", "revoked", "access denied", "unauthorized"];
const RATE_WORDING = ["rate limit", "quota", "too many requests", "429"];
const NETWORK_WORDING = ["fetch failed", "network", "timeout", "econn", "enotfound"];

// ---------------------------------------------------------------------------
// getStatusPresentation
// ---------------------------------------------------------------------------

type TFn = (key: string, values?: Record<string, unknown>) => string;

export function getStatusPresentation(
  connection: ConnectionRowConnection,
  effectiveStatus: string | undefined,
  isCooldown: boolean,
  t: TFn
) {
  if (connection.isActive === false) {
    return {
      statusVariant: "default",
      statusLabel: t("statusDisabled"),
      errorType: null,
      errorBadge: null,
      errorTextClass: "text-text-muted",
    };
  }

  if (connection.prefixShadowed?.code === "prefix_shadowed") {
    return {
      statusVariant: "warning",
      statusLabel: t("statusRuntimeIssue"),
      errorType: "prefix_shadowed",
      errorBadge: null,
      errorTextClass: "text-warning",
    };
  }

  if (effectiveStatus === "active" || effectiveStatus === "success") {
    return {
      statusVariant: "success",
      statusLabel: t("statusConnected"),
      errorType: null,
      errorBadge: null,
      errorTextClass: "text-text-muted",
    };
  }

  const errorType = inferErrorType(connection, isCooldown);
  const errorBadge = errorType ? ERROR_TYPE_LABELS[errorType] || null : null;

  if (errorType === "runtime_error") {
    return {
      statusVariant: "warning",
      statusLabel: t("statusRuntimeIssue"),
      errorType,
      errorBadge,
      errorTextClass: "text-warning",
    };
  }

  if (errorType === "account_deactivated") {
    return {
      statusVariant: "error",
      statusLabel: providerText(t, "statusDeactivated", "Deactivated"),
      errorType,
      errorBadge,
      errorTextClass: "text-error font-semibold",
    };
  }

  if (
    errorType === "upstream_auth_error" ||
    errorType === "auth_missing" ||
    errorType === "token_refresh_failed" ||
    errorType === "token_expired"
  ) {
    return {
      statusVariant: "error",
      statusLabel: t("statusAuthFailed"),
      errorType,
      errorBadge,
      errorTextClass: "text-error",
    };
  }

  if (errorType === "upstream_rate_limited") {
    return {
      statusVariant: "warning",
      statusLabel: t("statusRateLimited"),
      errorType,
      errorBadge,
      errorTextClass: "text-warning",
    };
  }

  if (errorType === "network_error") {
    return {
      statusVariant: "warning",
      statusLabel: t("statusNetworkIssue"),
      errorType,
      errorBadge,
      errorTextClass: "text-warning",
    };
  }

  if (errorType === "unsupported") {
    return {
      statusVariant: "default",
      statusLabel: t("statusTestUnsupported"),
      errorType,
      errorBadge,
      errorTextClass: "text-text-muted",
    };
  }

  if (errorType === "banned") {
    return {
      statusVariant: "error",
      statusLabel: providerText(t, "statusBanned", "Banned (403)"),
      errorType,
      errorBadge,
      errorTextClass: "text-error font-semibold",
    };
  }

  if (errorType === "credits_exhausted") {
    return {
      statusVariant: "warning",
      statusLabel: providerText(t, "statusCreditsExhausted", "Out of Credits"),
      errorType,
      errorBadge,
      errorTextClass: "text-warning",
    };
  }

  const fallbackStatusMap: Record<string, string> = {
    unavailable: t("statusUnavailable"),
    failed: t("statusFailed"),
    error: t("statusError"),
  };

  return {
    statusVariant: "error",
    statusLabel: fallbackStatusMap[effectiveStatus ?? ""] || effectiveStatus || t("statusError"),
    errorType,
    errorBadge,
    errorTextClass: "text-error",
  };
}

/**
 * chatCore per-request API-key health updater (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Byte-identical extraction of the `recordKeyHealthStatus` closure that lived at the top of
 * handleChatCore. Translates an upstream HTTP status into the in-memory key-health state
 * (apiKeyRotator) for the connection's currently-selected key, and persists the change to the
 * provider connection so it survives process restarts:
 *   - genuine 401/403 credential rejection → terminal invalid on a store key in one shot
 *     (a definitive credential rejection never recovers mid-session — HAC-116 D3); on an
 *     `env:<VAR>` credential it stays in-memory only (D2), because that connectionId is a
 *     synthetic sentinel with no backing `provider_connections` row. An ambiguous 403
 *     (no credential pattern in the body) keeps the 2× threshold.
 *   - 402 → terminal (insufficient balance) on single-credential providers; mark the
 *           current key invalid immediately (#5239), persisted on the active→invalid
 *           transition. openai-compatible / per-model-quota gateways keep the key —
 *           a 402 there is a per-model billing signal, not a dead credential.
 *   - 429 → per-key cooldown (#14573): cool only the rate-limited key for
 *           Retry-After (or a configurable default), never mark it invalid, so
 *           sibling extra keys keep serving. Skipped on per-model-quota gateways
 *           where a 429 is a per-model signal, mirroring the 402 rule.
 *   - 2xx → record a success, persisted only when recovering from a warning/invalid state.
 * Model availability failures remain model/routing telemetry even when an upstream reports them
 * with 401/403. A 403 classified by errorClassifier as routing/policy (PROJECT_ROUTE_ERROR,
 * REQUEST_REJECTED, PROVIDER_SAFETY_REFUSAL) or as Cloudflare/geo never touches credential
 * health — it is not the credential that was refused. Any other status only refreshes the
 * tracked extra-key set.
 */

import {
  recordKeySuccess,
  recordKeyTerminal,
  recordKeyCooldown,
  DEFAULT_KEY_COOLDOWN_MS,
  trackConnectionExtraKeys,
  type KeyHealth,
} from "../../services/apiKeyRotator.ts";
import { isModelUnavailableError } from "../../services/modelFamilyFallback.ts";
import { hasPerModelQuota } from "../../services/accountFallback.ts";
import {
  classifyProviderError,
  PROVIDER_ERROR_TYPES,
  type ProviderErrorType,
} from "../../services/errorClassifier.ts";
import { credentialSource, envVarName } from "../../services/credentialSource.ts";
import { updateProviderConnection } from "@/lib/db/providers";

type KeyHealthLog = {
  warn?: (tag: string, message: string) => void;
  error?: (tag: string, message: string) => void;
} | null;

const CREDENTIAL_FAILURE_PATTERNS = [
  /\b(?:invalid|incorrect|expired|missing|revoked)\s+api[\s_-]?key\b/i,
  /\bapi[\s_-]?key\s+(?:is\s+)?(?:invalid|incorrect|expired|missing|revoked|not\s+valid)\b/i,
  /\bauthentication[\s_-]+(?:failed|error|required)\b/i,
  /\b(?:invalid|expired|missing|revoked)\s+(?:token|credentials?|bearer)\b/i,
  /\bunauthorized\b/i,
  /\bnot\s+authenticated\b/i,
  /\bforbidden\b/i,
  /\baccess\s+denied\b/i,
];

function isModelCapabilityFailure(status: number, failureDetail: string): boolean {
  if (!failureDetail) return false;
  const normalizedDetail = failureDetail.replace(/[_-]+/g, " ");
  // Model-family fallback already owns these phrases. Use a model-capable status for
  // classification because some aggregators misreport the same model rejection as 401.
  return isModelUnavailableError(status === 401 ? 403 : status, normalizedDetail);
}

/**
 * Classifications that describe a request/account/routing problem rather than a dead
 * credential. The provider refused THIS request — or this project/config — not the API key,
 * so the same key stays usable for the next call. Mirrors projectRouteFailure.ts.
 */
const NON_CREDENTIAL_403_TYPES: readonly ProviderErrorType[] = [
  PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR,
  PROVIDER_ERROR_TYPES.REQUEST_REJECTED,
  PROVIDER_ERROR_TYPES.PROVIDER_SAFETY_REFUSAL,
  PROVIDER_ERROR_TYPES.ACCOUNT_DEACTIVATED,
  PROVIDER_ERROR_TYPES.FINGERPRINT_REJECTION,
  PROVIDER_ERROR_TYPES.GEO_BLOCKED,
];

/**
 * D6: a 403 the classifier resolves to a routing/policy/Cloudflare/geo condition is never a
 * credential rejection, however the CREDENTIAL_FAILURE_PATTERNS read on its body. An empty
 * body cannot be classified, so it falls through to the pattern match (unchanged behaviour).
 */
function isNonCredentialRefusal(
  status: number,
  failureDetail: string,
  provider: string | null | undefined
): boolean {
  if (status !== 403 || !failureDetail) return false;
  const classified = classifyProviderError(status, failureDetail, provider);
  if (!classified) return false;
  return NON_CREDENTIAL_403_TYPES.includes(classified);
}

function isCredentialFailure(
  status: number,
  failureDetail: string,
  provider: string | null | undefined = null
): boolean {
  if (status !== 401 && status !== 403) return false;
  if (isModelCapabilityFailure(status, failureDetail)) return false;
  if (isNonCredentialRefusal(status, failureDetail, provider)) return false;
  if (status === 401) return true;
  return CREDENTIAL_FAILURE_PATTERNS.some((pattern) => pattern.test(failureDetail));
}

export function recordKeyHealthStatus(
  status: number,
  creds: Record<string, unknown> | null | undefined,
  log?: KeyHealthLog,
  transport?: string,
  failureDetail = "",
  retryAfterMs?: number | null
): void {
  // CLIProxyAPI owns a shared external credential pool. Its auth failures cannot be
  // attributed to the native OmniRoute connection selected before proxy dispatch.
  if (transport === "cliproxyapi") return;

  const connId = creds?.connectionId as string | undefined;
  if (!connId) return;

  // #9827: a keyless (noauth) connection has no key to fail. Upstream 401s on
  // the anonymous path (e.g. Pollinations premium models that require a key)
  // must not poison the connection's key-health state — doing so flips the whole
  // anonymous pool to "all accounts unavailable". Mirrors the cliproxyapi guard
  // above: there is nothing to record when no key material exists.
  if (!creds?.apiKey && !creds?.accessToken) return;

  const source = credentialSource(creds);

  const psd = creds.providerSpecificData as Record<string, unknown> | undefined;
  const extraKeys = (psd?.extraApiKeys as string[] | undefined) ?? [];
  const health = psd?.apiKeyHealth as Record<string, KeyHealth> | undefined;
  const currentKeyId = (psd?.selectedKeyId as string | undefined) ?? "primary";

  trackConnectionExtraKeys(connId, extraKeys);

  if (source === "env") {
    const envVar = envVarName(connId);
    const errMsg = envVar ? `env var ${envVar}` : "env credential";
    log?.error?.(
      "AUTH",
      `${status} on env ${errMsg} — validation errors must mention the source var name (e.g. OPENAI_API_KEY)`
    );
    // D2: an `env:<VAR>` connectionId is a synthetic sentinel with no backing
    // provider_connections row — the DB write below would fail or, worse,
    // create a stray row. Record the health state in-memory only so the
    // rotator still stops selecting the refused env key, then stop.
    if (
      isCredentialFailure(
        status,
        failureDetail,
        typeof creds.provider === "string" ? creds.provider : null
      )
    ) {
      recordKeyTerminal(connId, currentKeyId);
    }
    return;
  }

  if (
    isCredentialFailure(
      status,
      failureDetail,
      typeof creds.provider === "string" ? creds.provider : null
    )
  ) {
    // D3: a definitive credential rejection never recovers mid-session — the
    // same key would just be refused again. Terminalize in one shot (the
    // ambiguous-403 case already returned above via isNonCredentialRefusal).
    const updatedHealth = recordKeyTerminal(connId, currentKeyId);
    log?.warn?.(
      "AUTH",
      `${status} on connection ${connId.slice(0, 8)} - key ${currentKeyId} marked invalid (credential rejected)`
    );

    // Persist health status to DB on every failure (not just invalid transitions)
    // This ensures in-memory state survives process restarts
    const prevStatus = health?.[currentKeyId]?.status;
    const prevFailures = health?.[currentKeyId]?.failures ?? 0;
    if (updatedHealth.status !== prevStatus || updatedHealth.failures !== prevFailures) {
      updateProviderConnection(connId, {
        providerSpecificData: {
          ...psd,
          apiKeyHealth: { ...health, [currentKeyId]: updatedHealth },
        },
      }).catch((err: unknown) => {
        log?.error?.(
          "DB",
          `Failed to persist apiKeyHealth: ${err instanceof Error ? err.message : String(err)}`
        );
      });
    }
  } else if (status === 402) {
    // 402 "Insufficient account balance" is terminal for this key on
    // single-credential providers — the balance won't recover mid-session
    // (#5239). openai-compatible / per-model-quota gateways multiplex many
    // upstreams behind one key: a 402 is a per-model billing signal and must
    // not invalidate the credential used by sibling models.
    const provider =
      typeof creds.provider === "string"
        ? creds.provider
        : typeof connId === "string"
          ? connId
          : null;
    if (hasPerModelQuota(provider)) {
      return;
    }
    const updatedHealth = recordKeyTerminal(connId, currentKeyId);
    log?.error?.(
      "AUTH",
      `402 on connection ${connId.slice(0, 8)} - key ${currentKeyId} marked invalid (insufficient balance)`
    );

    const prevStatus = health?.[currentKeyId]?.status;
    if (updatedHealth.status !== prevStatus) {
      updateProviderConnection(connId, {
        providerSpecificData: {
          ...psd,
          apiKeyHealth: { ...health, [currentKeyId]: updatedHealth },
        },
      }).catch((err: unknown) => {
        log?.error?.(
          "DB",
          `Failed to persist apiKeyHealth: ${err instanceof Error ? err.message : String(err)}`
        );
      });
    }
  } else if (status === 429) {
    // Per-key cooldown (#14573): a rate limit hits ONE key, not the credential
    // itself. Cool the selected key for Retry-After (or the configured default);
    // the rotator skips it until cooldownUntil passes and sibling keys keep
    // serving. Per-model-quota gateways multiplex upstreams behind one key — a
    // 429 there is a per-model signal, so leave key health alone (mirrors 402).
    const provider429 =
      typeof creds?.provider === "string"
        ? creds.provider
        : typeof connId === "string"
          ? connId
          : null;
    if (hasPerModelQuota(provider429)) {
      return;
    }
    const cooldownMs = retryAfterMs && retryAfterMs > 0 ? retryAfterMs : DEFAULT_KEY_COOLDOWN_MS;
    const updatedHealth = recordKeyCooldown(connId, currentKeyId, cooldownMs);
    log?.warn?.(
      "AUTH",
      `429 on connection ${connId.slice(0, 8)} - key ${currentKeyId} cooling for ${Math.ceil(cooldownMs / 1000)}s`
    );

    const prevCooldown = health?.[currentKeyId]?.cooldownUntil ?? null;
    if (updatedHealth.cooldownUntil !== prevCooldown) {
      updateProviderConnection(connId, {
        providerSpecificData: {
          ...psd,
          apiKeyHealth: { ...health, [currentKeyId]: updatedHealth },
        },
      }).catch((err: unknown) => {
        log?.error?.(
          "DB",
          `Failed to persist apiKeyHealth: ${err instanceof Error ? err.message : String(err)}`
        );
      });
    }
  } else if (status >= 200 && status < 300) {
    const updatedHealth = recordKeySuccess(connId, currentKeyId);
    const prevStatus = health?.[currentKeyId]?.status;
    if (prevStatus === "warning" || prevStatus === "invalid") {
      updateProviderConnection(connId, {
        providerSpecificData: {
          ...psd,
          apiKeyHealth: { ...health, [currentKeyId]: updatedHealth },
        },
      }).catch((err: unknown) => {
        log?.error?.(
          "DB",
          `Failed to persist apiKeyHealth: ${err instanceof Error ? err.message : String(err)}`
        );
      });
    }
  }
}

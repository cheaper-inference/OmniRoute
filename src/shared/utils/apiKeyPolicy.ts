/**
 * API Key Policy Enforcement — Shared middleware for all /v1/* endpoints.
 *
 * Enforces API key policies: model restrictions and budget limits.
 * Should be called after API key authentication in every endpoint that
 * accepts a model parameter.
 *
 * @module shared/utils/apiKeyPolicy
 */

import { extractApiKey } from "@/sse/services/auth";
import { resolveClientApiKey } from "@/sse/services/clientApiKeyResolver";
import { getApiKeyMetadata, isModelAllowedForKey, getApiKeyById } from "@/lib/db/apiKeys";
import { getCachedComboByName, getCachedComboForModel } from "@/lib/db/readCache";
import { isDashboardSessionAuthenticated } from "./apiAuth";
import { checkBudget } from "@/domain/costRules";
import { checkKeyQuota } from "@/domain/keyQuota";
import { checkTokenLimits } from "@omniroute/open-sse/services/tokenLimitCounter.ts";
import {
  errorResponse,
  buildErrorBody,
  sanitizeErrorMessage,
} from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import * as log from "@/sse/utils/logger";
import { checkRateLimit, RateLimitRule } from "./rateLimiter";
import {
  resolveCanonicalEndpointPath,
  resolveEndpointCategory,
} from "@/shared/constants/endpointCategories";
import { resolveQuotaKeyScope } from "@/lib/quota/quotaKey";
import { isQuotaModelName, parseQuotaModelName } from "@/lib/quota/quotaModelNaming";
import { buildApiKeyUsageLimitPolicyRejection } from "@/lib/usage/apiKeyUsageLimits";
import { buildTeamUsageLimitPolicyRejection } from "@/lib/usage/teamUsageLimits";
import { ALL_COMBOS_ACCESS_RULE } from "@/shared/constants/comboAccess";
import { hasApiKeyModelRestrictions } from "./resolvedModelAccess";
import { resolveSelfLoopBearer } from "@/shared/middleware/chatAdmissionIdentity";
import { timingSafeCompare } from "./timingSafeCompare";

// Default to no per-key request cap. API keys can still opt into explicit
// limits via Settings/API Keys, while provider/account quota controls remain
// responsible for upstream 429 handling and fallback.
// Exported so tests can lock in the "no implicit caps" contract from #2289.
export const DEFAULT_RATE_LIMITS: RateLimitRule[] = [];

const LEGACY_DEFAULT_RATE_LIMIT_PER_DAY = 1000;

export function buildDefaultRateLimits(rawValue?: string): RateLimitRule[] {
  const normalized = rawValue?.trim();
  if (normalized === undefined || normalized === "") return [];

  const limitPerDay = /^\d+$/.test(normalized)
    ? Number(normalized)
    : LEGACY_DEFAULT_RATE_LIMIT_PER_DAY;

  if (limitPerDay === 0) return [];

  return [
    { limit: limitPerDay, window: 86400 },
    { limit: limitPerDay * 5, window: 604800 },
    { limit: limitPerDay * 20, window: 2592000 },
  ];
}

const ENV_DEFAULT_RATE_LIMITS: RateLimitRule[] = buildDefaultRateLimits(
  process.env.DEFAULT_RATE_LIMIT_PER_DAY
);

interface AccessSchedule {
  enabled: boolean;
  from: string;
  until: string;
  days: number[];
  tz: string;
}

/** Metadata stored for an API key in the local database. */
export interface ApiKeyMetadata {
  codexServiceMode?: import("../constants/codexServiceMode").ApiKeyCodexServiceMode;
  id: string;
  name?: string;
  modelAccessMode?: "all" | "restricted";
  allowedModels?: string[];
  blockedModels?: string[];
  allowedCombos?: string[];
  allowedConnections?: string[];
  preferredConnections?: string[];
  allowedQuotas?: string[];
  noLog?: boolean;
  autoResolve?: boolean;
  budget?: number;
  usedBudget?: number;
  isActive?: boolean;
  isBanned?: boolean;
  expiresAt?: string | null;
  accessSchedule?: AccessSchedule | null;
  maxRequestsPerDay?: number | null;
  maxRequestsPerMinute?: number | null;
  throttleDelayMs?: number | null;
  maxSessions?: number | null;
  rateLimits?: RateLimitRule[] | null;
  scopes?: string[];
  allowedEndpoints?: string[];
  disableNonPublicModels?: boolean;
  allowUsageCommand?: boolean;
  usageLimitEnabled?: boolean;
  dailyUsageLimitUsd?: number | null;
  weeklyUsageLimitUsd?: number | null;
  compressionEnabled?: boolean;
  allowAutoCombos?: boolean;
  catalogScope?: "all" | "combos" | "models";
  forcedModel?: string | null;
}

/**
 * Returns true if the current time (in the schedule's timezone) is within
 * the configured window.
 * Supports overnight ranges (e.g. 22:00 until 06:00).
 */
function isWithinSchedule(schedule: AccessSchedule): boolean {
  if (!schedule.enabled) return true;

  const now = new Date();

  // Convert current UTC time to the configured timezone
  let localTimeStr: string;
  try {
    localTimeStr = new Intl.DateTimeFormat("en-US", {
      timeZone: schedule.tz,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(now);
  } catch {
    // Invalid timezone — fail open (don't block)
    return true;
  }

  // Intl may return "24:xx" instead of "00:xx" — normalize
  const normalizedTime = localTimeStr.replace(/^24:/, "00:");
  const [localHour, localMin] = normalizedTime.split(":").map(Number);
  const localMinutes = localHour * 60 + localMin;

  // Determine current weekday in the configured timezone
  let localDayStr: string;
  try {
    localDayStr = new Intl.DateTimeFormat("en-US", {
      timeZone: schedule.tz,
      weekday: "short",
    }).format(now);
  } catch {
    return true;
  }

  const dayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  const localDay = dayMap[localDayStr] ?? now.getDay();

  if (!schedule.days.includes(localDay)) return false;

  const [fromHour, fromMin] = schedule.from.split(":").map(Number);
  const [untilHour, untilMin] = schedule.until.split(":").map(Number);
  const fromMinutes = fromHour * 60 + fromMin;
  const untilMinutes = untilHour * 60 + untilMin;

  // Overnight window (e.g. 22:00 → 06:00)
  if (untilMinutes < fromMinutes) {
    return localMinutes >= fromMinutes || localMinutes < untilMinutes;
  }

  return localMinutes >= fromMinutes && localMinutes < untilMinutes;
}

// Legacy in-memory request counter has been replaced by Redis-backed multi-window rate limiter

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function normalizeComboAccessName(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.startsWith("combo/") ? trimmed.slice(6).trim() || trimmed : trimmed;
}

function matchesComboAccessRule(comboName: string, requestedModel: string, rule: string): boolean {
  if (rule === ALL_COMBOS_ACCESS_RULE) return true;
  const normalizedRule = normalizeComboAccessName(rule);
  if (!normalizedRule) return false;
  return (
    normalizedRule === comboName ||
    rule === requestedModel ||
    `combo/${normalizedRule}` === requestedModel
  );
}

/**
 * Whether a key's `allowedCombos` permits this combo by name.
 *
 * The catalog uses this so a key's `/v1/models` lists exactly the combos that
 * key can dispatch. `allowedCombos` is the gate for combos — `modelAccessMode`
 * and `allowedModels` gate provider models — so a combo must not be hidden just
 * because the key is `restricted` with an empty model allow-list. Listing a
 * combo the key can already dispatch grants no new access.
 *
 * An absent list means "no combo restriction configured", matching
 * `validateComboAccess`, which skips the check when `allowedCombos` is not an array.
 */
export function isComboNameAllowedForKey(
  allowedCombos: string[] | null | undefined,
  comboName: string
): boolean {
  if (!Array.isArray(allowedCombos)) return true;
  if (!comboName) return false;
  // In the catalog the requested model IS the combo id, so both arguments match.
  return allowedCombos.some((rule) => matchesComboAccessRule(comboName, comboName, rule));
}

function isAnthropicMessagesRequest(request: Request): boolean {
  if (request.headers.has("anthropic-version")) return true;

  try {
    const url = new URL(request.url);
    return url.pathname.endsWith("/v1/messages");
  } catch {
    return false;
  }
}

function policyErrorResponse(
  request: Request,
  statusCode: number,
  message: string,
  anthropicMessage = message,
  anthropicErrorType = "permission_error",
  anthropicStatusCode = statusCode
): Response {
  if (!isAnthropicMessagesRequest(request)) {
    return errorResponse(statusCode, message);
  }

  const safeMessage = sanitizeErrorMessage(anthropicMessage);
  return new Response(
    JSON.stringify({
      type: "error",
      error: {
        type: anthropicErrorType,
        message: safeMessage,
      },
    }),
    {
      status: anthropicStatusCode,
      headers: { "Content-Type": "application/json" },
    }
  );
}

async function resolveRequestedComboName(modelStr: string): Promise<string | null> {
  const exact = await getCachedComboByName(modelStr);
  if (exact && typeof exact.name === "string") return exact.name;

  if (modelStr.startsWith("combo/")) {
    const withoutPrefix = modelStr.slice(6);
    const prefixed = await getCachedComboByName(withoutPrefix);
    if (prefixed && typeof prefixed.name === "string") return prefixed.name;
  }

  const mapped = await getCachedComboForModel(modelStr);
  const mappedName = normalizeComboAccessName(mapped?.name);
  return mappedName;
}

/**
 * Built-in virtual routes (`auto/*`, `qtSd/*`) dispatch like combos but are not
 * persisted combo rows, so `resolveRequestedComboName` cannot find them. They
 * must still be matched against the key's combo allow-list; otherwise a key
 * restricted to one named combo could reach every provider through them
 * (GHSA-7j4q-6gx6-pg77).
 */
function isVirtualComboModel(modelStr: string): boolean {
  return modelStr.startsWith("auto/") || modelStr.startsWith("qtSd/");
}

async function isComboAllowedForKey(
  allowedCombos: string[],
  modelStr: string
): Promise<{ allowed: boolean; comboName: string | null }> {
  const comboName =
    (await resolveRequestedComboName(modelStr)) ??
    (isVirtualComboModel(modelStr) ? modelStr : null);
  if (!comboName) return { allowed: true, comboName: null };

  const allowed = allowedCombos.some((rule) => matchesComboAccessRule(comboName, modelStr, rule));
  return { allowed, comboName };
}

function quotaPolicyResponse(message: string, code: string): Response {
  const body = buildErrorBody(HTTP_STATUS.FORBIDDEN, message, undefined, { code });
  return new Response(JSON.stringify(body), {
    status: HTTP_STATUS.FORBIDDEN,
    headers: { "Content-Type": "application/json" },
  });
}

async function validateQuotaRoutingTarget(
  modelStr: string,
  allowedQuotas: string[]
): Promise<Response | null> {
  if (isQuotaModelName(modelStr) && allowedQuotas.length === 0) {
    return quotaPolicyResponse(
      `Model "${modelStr}" requires a quota-pool allocation; this API key is not allocated to any quota pool`,
      "QUOTA_NOT_ALLOCATED"
    );
  }
  if (allowedQuotas.length === 0) return null;

  try {
    const scope = await resolveQuotaKeyScope(allowedQuotas);
    const parsed = isQuotaModelName(modelStr) ? parseQuotaModelName(modelStr) : null;
    const allowed =
      parsed !== null &&
      scope.poolSlugs.includes(parsed.groupSlug) &&
      scope.providers.includes(parsed.provider);
    if (allowed) return null;
    return quotaPolicyResponse(
      isQuotaModelName(modelStr)
        ? `Model "${modelStr}" is not in this key's quota pools`
        : "This quota-exclusive API key may only use quotaShared-* models",
      "QUOTA_ONLY"
    );
  } catch (error) {
    log.error("API_POLICY", "Routing target quota check failed. Request blocked.", { error });
    return errorResponse(HTTP_STATUS.SERVICE_UNAVAILABLE, "API key quota policy unavailable");
  }
}

/**
 * Make the combo rejection actionable.
 *
 * The 403 below is a KEY-POLICY decision, not a routing fault — but the bare
 * "Combo X is not allowed for this API key" reads like a routing bug, so callers
 * (especially the AI agents that drive them) retry the same model or fall through
 * a whole compaction cascade on every attempt. Name the two real remedies so the
 * operator can fix it in one step instead of debugging combo routing.
 */
function comboCannotBeUsedMessage(modelStr: string, comboName: string | null): string {
  const name = comboName || modelStr;
  return (
    `Combo "${name}" is not allowed for this API key. ` +
    `This key's allowed combos do not include "${name}" — add "${name}" (or "combo/*") ` +
    `to this key's allowed combos in Dashboard → API Manager, or route to a combo ` +
    `this key already permits.`
  );
}

async function validateStandardRoutingTarget(
  request: Request,
  apiKey: string,
  apiKeyInfo: ApiKeyMetadata,
  modelStr: string
): Promise<Response | null> {
  let requestedComboName: string | null = null;
  if (Array.isArray(apiKeyInfo.allowedCombos)) {
    try {
      const comboAccess = await isComboAllowedForKey(apiKeyInfo.allowedCombos, modelStr);
      requestedComboName = comboAccess.comboName;
      if (!comboAccess.allowed) {
        return errorResponse(
          HTTP_STATUS.FORBIDDEN,
          comboCannotBeUsedMessage(modelStr, comboAccess.comboName)
        );
      }
    } catch (error) {
      log.error("API_POLICY", "Routing target combo check failed. Request blocked.", { error });
      return errorResponse(HTTP_STATUS.SERVICE_UNAVAILABLE, "API key combo policy unavailable");
    }
  }

  const hasModelRestrictions = hasApiKeyModelRestrictions(apiKeyInfo);
  if (!requestedComboName && hasModelRestrictions && modelStr.startsWith("auto/")) {
    requestedComboName = modelStr;
  }
  if (!requestedComboName && hasModelRestrictions) {
    try {
      requestedComboName = await resolveRequestedComboName(modelStr);
    } catch {
      requestedComboName = null;
    }
  }
  if (
    !requestedComboName &&
    hasModelRestrictions &&
    !(await isModelAllowedForKey(apiKey, modelStr))
  ) {
    return policyErrorResponse(
      request,
      HTTP_STATUS.FORBIDDEN,
      `Model "${modelStr}" is not allowed for this API key`,
      `Model "${modelStr}" is not enabled or quota is insufficient. Choose another allowed model.`,
      "invalid_request_error",
      HTTP_STATUS.BAD_REQUEST
    );
  }
  return null;
}

/**
 * Validate only the model/combo authorization of a routing target.
 *
 * The full request policy has already run before routing. Calling it again for a
 * policy-generated target would charge request limits twice and apply throttling
 * twice. This narrower check proves that routing did not widen the key's access
 * without consuming any budget, token-limit, or rate-limit state.
 */
export async function validateApiKeyRoutingTarget(
  request: Request,
  apiKey: string | null,
  apiKeyInfo: ApiKeyMetadata | null,
  modelStr: string | null
): Promise<Response | null> {
  if (!apiKey || !apiKeyInfo || !modelStr) return null;

  const allowedQuotas = Array.isArray(apiKeyInfo.allowedQuotas) ? apiKeyInfo.allowedQuotas : [];
  const quotaRejection = await validateQuotaRoutingTarget(modelStr, allowedQuotas);
  if (quotaRejection || allowedQuotas.length > 0) return quotaRejection;
  return validateStandardRoutingTarget(request, apiKey, apiKeyInfo, modelStr);
}

export interface ApiKeyPolicyResult {
  /** API key string (null if no key provided) */
  apiKey: string | null;
  /** Metadata from DB (null if no key or key not found) */
  apiKeyInfo: ApiKeyMetadata | null;
  /** If set, the request should be rejected with this Response */
  rejection: Response | null;
}

type PolicyValidationStage =
  "validateEndpointAccess" | "validateTeamUsage" | "validateQuotaAccess" | "validateModelAccess";

export interface EnforceApiKeyPolicyOptions {
  /**
   * Where the metered dollar budget is enforced for this request.
   *
   * `"enforce"` (the default) rejects here, the moment the key's allowance is
   * spent. That is correct for every endpoint that dispatches to a single,
   * already-determined provider.
   *
   * `"defer-to-candidate"` is for callers that route across several provider
   * candidates. The budget is scoped by apiKeyId and knows nothing about which
   * provider will serve the request, so rejecting here also rejects flat-rate
   * subscription capacity that the allowance does not pay for. A caller passing
   * this MUST re-apply the budget per resolved candidate — see
   * `lib/usage/meteredBudgetPolicy` — or it drops metered-spend enforcement
   * entirely. Every other check on this path is unaffected.
   */
  meteredBudget?: "enforce" | "defer-to-candidate";
  /** Test/diagnostic observer; it cannot alter policy outcomes. */
  validationObserver?: (stage: PolicyValidationStage) => void;
}

/**
 * Enforce API key policies for a request.
 *
 * Checks:
 * 1. Model restriction — if the key has `allowedModels`, verify the requested model is permitted
 * 2. Budget limit — if the key has a budget configured, verify it hasn't been exceeded
 *
 * @param request - The incoming HTTP request
 * @param modelStr - The model ID from the request body
 * @param options - See {@link EnforceApiKeyPolicyOptions}; omitted means every
 *   check is enforced here, which is the behaviour every caller had before the
 *   option existed.
 * @returns ApiKeyPolicyResult with apiKey, metadata, and optional rejection response
 *
 * @example
 * ```ts
 * const policy = await enforceApiKeyPolicy(request, body.model);
 * if (policy.rejection) return policy.rejection;
 * // proceed with request, optionally use policy.apiKeyInfo
 * ```
 */
/** Header carrying the id of the API key a dashboard playground request wants to
 *  test the policy for (never the key secret). */
const PLAYGROUND_KEY_ID_HEADER = "x-omniroute-playground-key-id";

/**
 * Dashboard playground support. An authenticated admin session may test a
 * specific API key's policy (allowed_models, budget, …) WITHOUT putting the key
 * secret on the wire: the browser sends only the key id via
 * `x-omniroute-playground-key-id` and we resolve the secret server-side.
 *
 * Security: honored ONLY for authenticated dashboard sessions, and only as a
 * fallback when no bearer key was presented — so it can never bypass auth or
 * escalate privileges, it only applies (narrows to) the selected key's policy.
 */
export async function resolvePlaygroundTestKey(request: Request): Promise<string | null> {
  const keyId = request.headers.get(PLAYGROUND_KEY_ID_HEADER);
  if (!keyId) return null;
  if (!(await isDashboardSessionAuthenticated(request))) return null;
  try {
    const row = await getApiKeyById(keyId);
    return typeof row?.key === "string" ? row.key : null;
  } catch {
    return null;
  }
}

type PolicyContext = {
  request: Request;
  apiKey: string;
  apiKeyInfo: ApiKeyMetadata;
  modelStr: string | null;
};

function validateKeyStatus(context: PolicyContext): Response | null {
  const { apiKeyInfo } = context;
  if (apiKeyInfo.isActive === false) {
    return errorResponse(HTTP_STATUS.FORBIDDEN, "This API key is disabled");
  }
  if (apiKeyInfo.isBanned === true) {
    return errorResponse(HTTP_STATUS.FORBIDDEN, "This API key is banned due to policy violations");
  }
  if (apiKeyInfo.expiresAt && Date.now() > new Date(apiKeyInfo.expiresAt).getTime()) {
    return errorResponse(HTTP_STATUS.FORBIDDEN, "This API key has expired");
  }
  return null;
}

async function validateKeyScheduleAndUsage(context: PolicyContext): Promise<Response | null> {
  const { request, apiKeyInfo } = context;
  if (apiKeyInfo.accessSchedule?.enabled && !isWithinSchedule(apiKeyInfo.accessSchedule)) {
    const { from, until, tz } = apiKeyInfo.accessSchedule;
    return errorResponse(
      HTTP_STATUS.FORBIDDEN,
      `Access denied outside allowed hours (${from}–${until} ${tz})`
    );
  }
  if (apiKeyInfo.usageLimitEnabled !== true) return null;

  try {
    const rejection = await buildApiKeyUsageLimitPolicyRejection(request, {
      id: apiKeyInfo.id,
      usageLimitEnabled: apiKeyInfo.usageLimitEnabled,
      dailyUsageLimitUsd: apiKeyInfo.dailyUsageLimitUsd,
      weeklyUsageLimitUsd: apiKeyInfo.weeklyUsageLimitUsd,
    });
    return rejection;
  } catch (error) {
    log.error("API_POLICY", "API key USD usage limit check failed. Request blocked.", { error });
    return errorResponse(HTTP_STATUS.SERVICE_UNAVAILABLE, "API key usage limit unavailable");
  }
}

async function validateTeamUsage(context: PolicyContext): Promise<Response | null> {
  try {
    return await buildTeamUsageLimitPolicyRejection(context.request, context.apiKeyInfo.id);
  } catch (error) {
    log.error("API_POLICY", "Team shared usage limit check failed. Request blocked.", { error });
    return errorResponse(HTTP_STATUS.SERVICE_UNAVAILABLE, "Team usage limit unavailable");
  }
}

function validateEndpointAccess(context: PolicyContext): Response | null {
  const { request, apiKeyInfo } = context;
  if (!apiKeyInfo.allowedEndpoints?.length) return null;
  try {
    // A route handler sees the client's original URL: `/v1/…` when the
    // `/v1/:path*` rewrite fired, `/api/v1/…` when the client hit the App
    // Router path directly (no rewrite), and the raw alias spelling
    // (`/chat/completions`, `/models`, `/codex/…`, `/v1/v1/…`) in every case.
    // The category prefixes are `/v1/…`, so canonicalize the path first or a
    // restricted key silently passes on those spellings (#13685).
    const pathname = resolveCanonicalEndpointPath(new URL(request.url).pathname);
    const category = resolveEndpointCategory(pathname);
    if (category && !apiKeyInfo.allowedEndpoints.includes(category)) {
      return errorResponse(
        HTTP_STATUS.FORBIDDEN,
        `Endpoint category "${category}" is not allowed for this API key`
      );
    }
  } catch {
    // URL parse failure — fail open, let other checks decide.
  }
  return null;
}

async function validateQuotaAccess(context: PolicyContext): Promise<Response | null> {
  const { apiKeyInfo, modelStr } = context;
  if (!modelStr) return null;
  const allowedQuotas = Array.isArray(apiKeyInfo.allowedQuotas) ? apiKeyInfo.allowedQuotas : [];
  if (isQuotaModelName(modelStr) && allowedQuotas.length === 0) {
    return quotaPolicyResponse(
      `Model "${modelStr}" requires a quota-pool allocation; this API key is not allocated to any quota pool`,
      "QUOTA_NOT_ALLOCATED"
    );
  }
  if (!allowedQuotas.length) return null;

  try {
    const scope = await resolveQuotaKeyScope(allowedQuotas);
    const parsed = isQuotaModelName(modelStr) ? parseQuotaModelName(modelStr) : null;
    const allowed =
      parsed !== null &&
      scope.poolSlugs.length > 0 &&
      scope.poolSlugs.includes(parsed.groupSlug) &&
      scope.providers.includes(parsed.provider);
    if (allowed) return null;
    const message = isQuotaModelName(modelStr)
      ? `Model "${modelStr}" is not in this key's quota pools`
      : "This quota-exclusive API key may only use quotaShared-* models";
    return quotaPolicyResponse(message, "QUOTA_ONLY");
  } catch (error) {
    log.error("API_POLICY", "Quota scope check failed. Request blocked.", { error });
    return errorResponse(HTTP_STATUS.SERVICE_UNAVAILABLE, "API key quota policy unavailable");
  }
}

/**
 * Whether this key is barred from the built-in `auto` / `auto/*` combos.
 *
 * Built-in auto ids are virtual, so they resolve to no stored combo and
 * `isComboAllowedForKey()` fails open on them; `validateModelAccess()` then
 * returns before the allow/deny model lists are consulted. This flag is the
 * only per-key gate that reaches them. It defaults to allowed (undefined) so
 * existing keys are unaffected.
 */
export function isAutoComboDeniedForKey(
  apiKeyInfo: { allowAutoCombos?: boolean } | null | undefined,
  modelStr: string | null | undefined,
  resolvedComboName: string | null = null
): boolean {
  if (!modelStr || (modelStr !== "auto" && !modelStr.startsWith("auto/"))) return false;
  if (modelStr === "auto" && resolvedComboName === "auto") return false;
  return apiKeyInfo?.allowAutoCombos === false;
}

function autoComboDeniedResponse(request: Request, modelStr: string): Response {
  return policyErrorResponse(
    request,
    HTTP_STATUS.FORBIDDEN,
    `Auto combo "${modelStr}" is not allowed for this API key`,
    `Auto combos are not enabled for this API key. Choose an explicit model or combo.`,
    "invalid_request_error",
    HTTP_STATUS.BAD_REQUEST
  );
}

/**
 * Bare `auto` falls through to the built-in router only when no persisted
 * combo literally named "auto" exists, so resolve the combo before deciding
 * whether `allowAutoCombos=false` applies. Resolution failure fails closed.
 */
async function resolveBareAutoPolicy(
  context: PolicyContext,
  requestedComboName: string | null
): Promise<{ comboName: string | null; rejection: Response | null }> {
  const { request, apiKeyInfo, modelStr } = context;
  let comboName = requestedComboName;
  if (!comboName && isAutoComboDeniedForKey(apiKeyInfo, modelStr)) {
    try {
      comboName = await resolveRequestedComboName(String(modelStr));
    } catch (error) {
      log.error("API_POLICY", "Bare auto combo resolution failed. Request blocked.", { error });
      return {
        comboName: null,
        rejection: errorResponse(
          HTTP_STATUS.SERVICE_UNAVAILABLE,
          "API key combo policy unavailable"
        ),
      };
    }
  }
  if (isAutoComboDeniedForKey(apiKeyInfo, modelStr, comboName)) {
    return { comboName, rejection: autoComboDeniedResponse(request, String(modelStr)) };
  }
  return { comboName, rejection: null };
}

async function validateModelAccess(context: PolicyContext): Promise<Response | null> {
  const { request, apiKey, apiKeyInfo, modelStr } = context;
  if (!modelStr || apiKeyInfo.allowedQuotas?.length) return null;
  // `auto/*` always denotes the built-in virtual router; bare `auto` is
  // resolved against persisted combos in resolveBareAutoPolicy() below.
  if (modelStr !== "auto" && isAutoComboDeniedForKey(apiKeyInfo, modelStr)) {
    return autoComboDeniedResponse(request, modelStr);
  }
  const comboAccess = await validateComboAccess(apiKeyInfo.allowedCombos, modelStr);
  if (comboAccess.rejection) return comboAccess.rejection;
  const autoPolicy = await resolveBareAutoPolicy(context, comboAccess.comboName);
  if (autoPolicy.rejection) return autoPolicy.rejection;
  let requestedComboName = autoPolicy.comboName;

  const hasModelRestrictions = hasApiKeyModelRestrictions(apiKeyInfo);
  if (!requestedComboName && hasModelRestrictions) {
    if (isVirtualComboModel(modelStr)) {
      requestedComboName = modelStr;
    } else {
      try {
        requestedComboName = await resolveRequestedComboName(modelStr);
      } catch {
        requestedComboName = null;
      }
    }
  }
  if (requestedComboName || !hasModelRestrictions) return null;
  if (await isModelAllowedForKey(apiKey, modelStr)) return null;
  return policyErrorResponse(
    request,
    HTTP_STATUS.FORBIDDEN,
    `Model "${modelStr}" is not allowed for this API key`,
    `Model "${modelStr}" is not enabled or quota is insufficient. Choose another allowed model.`,
    "invalid_request_error",
    HTTP_STATUS.BAD_REQUEST
  );
}

async function validateComboAccess(
  allowedCombos: string[] | undefined,
  modelStr: string
): Promise<{ comboName: string | null; rejection: Response | null }> {
  if (!Array.isArray(allowedCombos)) return { comboName: null, rejection: null };
  try {
    const comboAccess = await isComboAllowedForKey(allowedCombos, modelStr);
    if (comboAccess.allowed) return { comboName: comboAccess.comboName, rejection: null };
    return {
      comboName: comboAccess.comboName,
      rejection: errorResponse(
        HTTP_STATUS.FORBIDDEN,
        comboCannotBeUsedMessage(modelStr, comboAccess.comboName)
      ),
    };
  } catch (error) {
    log.error("API_POLICY", "Combo access check failed. Request blocked.", { error });
    return {
      comboName: null,
      rejection: errorResponse(HTTP_STATUS.SERVICE_UNAVAILABLE, "API key combo policy unavailable"),
    };
  }
}

/** "Resets in Xh Ym."-style suffix for a known future epoch-ms reset instant. */
function formatResetDurationSuffix(untilMs: unknown, nowMs = Date.now()): string {
  if (typeof untilMs !== "number" || !Number.isFinite(untilMs) || untilMs <= nowMs) return "";
  const totalMinutes = Math.max(1, Math.ceil((untilMs - nowMs) / 60_000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours > 0 ? `Resets in ${hours}h ${minutes}m.` : `Resets in ${minutes}m.`;
}

/**
 * The metered dollar budget check, skipped when the caller defers it to the
 * resolved candidate (see {@link EnforceApiKeyPolicyOptions.meteredBudget}).
 */
function validateBudgetUnlessDeferred(
  context: PolicyContext,
  options: EnforceApiKeyPolicyOptions | undefined
): Response | null {
  if (options?.meteredBudget === "defer-to-candidate") return null;
  return validateBudget(context);
}

function validateBudget(context: PolicyContext): Response | null {
  const { apiKeyInfo } = context;
  if (!apiKeyInfo.id) return null;
  try {
    const budgetOk = checkBudget(apiKeyInfo.id);
    if (budgetOk.allowed) return null;
    const resetSuffix = formatResetDurationSuffix(budgetOk.budgetResetAt);
    const reason = budgetOk.reason || "Budget limit exceeded";
    return errorResponse(
      HTTP_STATUS.RATE_LIMITED,
      resetSuffix ? `${reason} ${resetSuffix}` : reason,
      {
        code: "budget_exceeded",
        retryAfter: budgetOk.budgetResetAt,
      }
    );
  } catch (error) {
    log.error("API_POLICY", "Budget check failed. Request blocked.", { error });
    return errorResponse(HTTP_STATUS.SERVICE_UNAVAILABLE, "Budget policy unavailable");
  }
}

function validateTokenLimit(context: PolicyContext): Response | null {
  const { apiKeyInfo, modelStr } = context;
  if (!apiKeyInfo.id) return null;
  try {
    const breach = checkTokenLimits(apiKeyInfo.id, undefined, modelStr ?? undefined);
    if (!breach) return null;
    const scopeLabel =
      breach.scopeType === "global" ? "account" : `${breach.scopeType} "${breach.scopeValue}"`;
    const resetSuffix = formatResetDurationSuffix(breach.nextResetAt) || "Please try again later.";
    return errorResponse(
      HTTP_STATUS.RATE_LIMITED,
      `Token limit exceeded for ${scopeLabel}: ${breach.tokensUsed}/${breach.limitValue} tokens used in the current window. ${resetSuffix}`,
      { code: "token_limit_exceeded", retryAfter: breach.nextResetAt }
    );
  } catch (error) {
    log.error("API_POLICY", "Token limit check failed. Request blocked.", { error });
    return errorResponse(HTTP_STATUS.SERVICE_UNAVAILABLE, "Token limit policy unavailable");
  }
}

function validateKeyQuota(context: PolicyContext): Response | null {
  const { apiKeyInfo } = context;
  if (!apiKeyInfo.id) return null;
  try {
    const verdict = checkKeyQuota(apiKeyInfo.id);
    if (verdict.allowed) return null;
    return errorResponse(HTTP_STATUS.RATE_LIMITED, verdict.reason || "API key quota exceeded");
  } catch (error) {
    log.error("API_POLICY", "API key quota check failed. Request blocked.", { error });
    return errorResponse(HTTP_STATUS.SERVICE_UNAVAILABLE, "API key quota policy unavailable");
  }
}

function buildRateLimitRules(apiKeyInfo: ApiKeyMetadata): RateLimitRule[] {
  const custom = apiKeyInfo.rateLimits?.length;
  const rules = custom
    ? [...(apiKeyInfo.rateLimits as RateLimitRule[])]
    : [...DEFAULT_RATE_LIMITS, ...ENV_DEFAULT_RATE_LIMITS];
  if (!custom) {
    if (apiKeyInfo.maxRequestsPerDay)
      rules.push({ limit: apiKeyInfo.maxRequestsPerDay, window: 86400 });
    if (apiKeyInfo.maxRequestsPerMinute)
      rules.push({ limit: apiKeyInfo.maxRequestsPerMinute, window: 60 });
  }
  return rules;
}

async function validateRateLimitAndThrottle(context: PolicyContext): Promise<Response | null> {
  const { apiKeyInfo } = context;
  if (!apiKeyInfo.id) return null;
  const rules = buildRateLimitRules(apiKeyInfo);
  if (rules.length) {
    const result = await checkRateLimit(apiKeyInfo.id, rules);
    if (!result.allowed) {
      const window = result.failedWindow ? ` (${result.failedWindow}s window)` : "";
      const resetSuffix = formatResetDurationSuffix(result.resetAt) || "Please try again later.";
      return errorResponse(
        HTTP_STATUS.RATE_LIMITED,
        `Request limit exceeded${window}. ${resetSuffix}`,
        { code: "rate_limit_exceeded", retryAfter: result.resetAt }
      );
    }
  }
  if (apiKeyInfo.throttleDelayMs && apiKeyInfo.throttleDelayMs > 0) {
    await delay(Math.min(apiKeyInfo.throttleDelayMs, 300_000));
  }
  return null;
}

/**
 * A bare `x-api-key` / `x-goog-api-key` (no anthropic-version, no claude
 * user-agent) is accepted by the CLIENT_API auth layer (clientApi.ts
 * `extractBearer`) but ignored by the Issue-#2225-gated `extractApiKey()` used
 * for policy resolution — so a genuine key sent that way passed auth while
 * skipping its own allowedModels / budget / rate-limit policy
 * (GHSA-2phc-xp22-9f56). Resolve those headers here so the policy layer sees the
 * same key auth accepted. Bearer, URL-token and anthropic-gated paths are already
 * covered by `extractApiKey()`; unknown keys still fail open downstream, so this
 * only tightens enforcement for real keys.
 */
function extractUngatedClientApiKey(request: Request): string | null {
  const xApiKey = request.headers.get("x-api-key") ?? request.headers.get("X-Api-Key");
  if (xApiKey && xApiKey.trim()) return xApiKey.trim();
  const xGoog = request.headers.get("x-goog-api-key") ?? request.headers.get("X-Goog-Api-Key");
  if (xGoog && xGoog.trim()) return xGoog.trim();
  return null;
}

/**
 * The API key the policy layer evaluates for a request. The credential that
 * actually validated wins (a stale Bearer sent next to a valid x-api-key must
 * not hide that key's policy); then a real bearer key; then a bare
 * x-api-key/x-goog-api-key that auth accepted but extractApiKey() gates out;
 * otherwise an authenticated dashboard playground may test a specific key's
 * policy by id (resolved server-side, secret never sent).
 */
export async function resolvePolicyApiKey(request: Request): Promise<string | null> {
  const resolved = await resolveClientApiKey(request);
  return (
    (resolved.valid ? resolved.apiKey : null) ||
    extractApiKey(request) ||
    extractUngatedClientApiKey(request) ||
    (await resolvePlaygroundTestKey(request))
  );
}

/**
 * Authorization-only view of the key policy, for side paths that make an
 * upstream call on the key's behalf without dispatching a chat request (e.g.
 * `/v1/messages/count_tokens`). Checks key status, endpoint category and the
 * model/combo/quota authorization of `modelStr`; never consumes budget,
 * token-limit or rate-limit state. Returns the rejection, or null when allowed.
 */
export async function checkApiKeyAuthorization(
  request: Request,
  apiKey: string,
  apiKeyInfo: ApiKeyMetadata,
  modelStr: string
): Promise<Response | null> {
  const context = { request, apiKey, apiKeyInfo, modelStr };
  return (
    validateKeyStatus(context) ??
    validateEndpointAccess(context) ??
    (await validateApiKeyRoutingTarget(request, apiKey, apiKeyInfo, modelStr))
  );
}

/**
 * Header an internal self-loop sub-request (the Vision Bridge describe call)
 * uses to scope itself to the caller's API key.
 */
const SELF_LOOP_KEY_ID_HEADER = "x-omniroute-self-loop-key-id";

type SelfLoopScope = { key: string | null; rejection: Response | null };
const NO_SELF_LOOP_SCOPE: SelfLoopScope = { key: null, rejection: null };

/**
 * The self-loop bearer maps to an unrestricted synthetic key. When an internal
 * describe call acts for a restricted caller it names that caller's key id, and
 * the request is evaluated under THAT key's policy. Honored only together with
 * the self-loop bearer (which already has full access), so the header can only
 * narrow access; a client cannot use it to switch to another key. An id that
 * does not resolve fails closed instead of falling back to the unrestricted key.
 */
async function resolveSelfLoopScopedKey(
  request: Request,
  presentedKey: string | null
): Promise<SelfLoopScope> {
  const keyId = request.headers.get(SELF_LOOP_KEY_ID_HEADER)?.trim();
  if (!keyId || !presentedKey) return NO_SELF_LOOP_SCOPE;
  if (!timingSafeCompare(presentedKey, resolveSelfLoopBearer())) return NO_SELF_LOOP_SCOPE;
  try {
    const row = (await getApiKeyById(keyId)) as { key?: unknown } | null;
    if (typeof row?.key === "string" && row.key.length > 0) {
      return { key: row.key, rejection: null };
    }
  } catch (error) {
    log.error("API_POLICY", "Self-loop key scope lookup failed. Request blocked.", { error });
    return {
      key: null,
      rejection: errorResponse(HTTP_STATUS.SERVICE_UNAVAILABLE, "API key policy unavailable"),
    };
  }
  return {
    key: null,
    rejection: errorResponse(HTTP_STATUS.FORBIDDEN, "Scoped API key is not available"),
  };
}

/**
 * The key the policy evaluates: the presented key, or — for a self-loop scoped
 * to a caller's key — that caller's key. On a scope rejection the presented key
 * is kept so the result still names what the client sent.
 */
export async function resolveEnforcedPolicyKey(
  request: Request
): Promise<{ apiKey: string | null; selfLoopScope: SelfLoopScope }> {
  const presentedKey = await resolvePolicyApiKey(request);
  const selfLoopScope = await resolveSelfLoopScopedKey(request, presentedKey);
  if (selfLoopScope.rejection || !selfLoopScope.key) return { apiKey: presentedKey, selfLoopScope };
  return { apiKey: selfLoopScope.key, selfLoopScope };
}

/**
 * A self-loop scoped to a key that no longer resolves must not fall back to the
 * unrestricted self-loop identity.
 */
function unresolvedScopedKeyRejection(selfLoopScope: SelfLoopScope): Response | null {
  if (!selfLoopScope.key) return null;
  return errorResponse(HTTP_STATUS.FORBIDDEN, "Scoped API key is not available");
}

/**
 * Endpoint, Team usage, quota and model access checks, in this fixed order (endpoint
 * authorization must precede any Team budget lookup). The first rejection wins.
 */
async function runAccessValidators(
  context: PolicyContext,
  options?: EnforceApiKeyPolicyOptions
): Promise<Response | null> {
  const stages: Array<[PolicyValidationStage, () => Response | null | Promise<Response | null>]> = [
    ["validateEndpointAccess", () => validateEndpointAccess(context)],
    ["validateTeamUsage", () => validateTeamUsage(context)],
    ["validateQuotaAccess", () => validateQuotaAccess(context)],
    ["validateModelAccess", () => validateModelAccess(context)],
  ];
  for (const [stage, validate] of stages) {
    options?.validationObserver?.(stage);
    const rejection = await validate();
    if (rejection) return rejection;
  }
  return null;
}

/**
 * Internal sub-request of a parent request that already passed the full policy
 * (schedule, budget, limits): re-check authorization only, so the key's
 * allowances are not charged twice.
 */
async function validateSelfLoopScopedAccess(
  context: Parameters<typeof validateQuotaAccess>[0]
): Promise<Response | null> {
  return (await validateQuotaAccess(context)) ?? (await validateModelAccess(context));
}

export async function enforceApiKeyPolicy(
  request: Request,
  modelStr: string | null,
  options?: EnforceApiKeyPolicyOptions
): Promise<ApiKeyPolicyResult> {
  const { apiKey, selfLoopScope } = await resolveEnforcedPolicyKey(request);
  if (selfLoopScope.rejection) {
    return { apiKey, apiKeyInfo: null, rejection: selfLoopScope.rejection };
  }

  // No API key = local/session mode, skip policy checks
  if (!apiKey) {
    return { apiKey: null, apiKeyInfo: null, rejection: null };
  }

  // Fetch key metadata (includes allowedModels)
  let apiKeyInfo: ApiKeyMetadata | null = null;
  try {
    apiKeyInfo = await getApiKeyMetadata(apiKey);
  } catch (error) {
    // Fail-closed: if policy backend fails, reject the request
    log.error("API_POLICY", "Failed to fetch API key metadata. Request blocked.", { error });
    return {
      apiKey,
      apiKeyInfo: null,
      rejection: errorResponse(HTTP_STATUS.SERVICE_UNAVAILABLE, "API key policy unavailable"),
    };
  }

  // Key not found in DB — skip policy (auth layer handles validation)
  if (!apiKeyInfo) {
    return { apiKey, apiKeyInfo: null, rejection: unresolvedScopedKeyRejection(selfLoopScope) };
  }

  const context = { request, apiKey, apiKeyInfo, modelStr };
  const statusRejection = validateKeyStatus(context);
  if (statusRejection) return { apiKey, apiKeyInfo, rejection: statusRejection };
  if (selfLoopScope.key) {
    return { apiKey, apiKeyInfo, rejection: await validateSelfLoopScopedAccess(context) };
  }
  const scheduleRejection = await validateKeyScheduleAndUsage(context);
  if (scheduleRejection) return { apiKey, apiKeyInfo, rejection: scheduleRejection };
  const accessRejection = await runAccessValidators(context, options);
  if (accessRejection) return { apiKey, apiKeyInfo, rejection: accessRejection };

  const budgetRejection = validateBudgetUnlessDeferred(context, options);
  if (budgetRejection) return { apiKey, apiKeyInfo, rejection: budgetRejection };
  const keyQuotaRejection = validateKeyQuota(context);
  if (keyQuotaRejection) return { apiKey, apiKeyInfo, rejection: keyQuotaRejection };
  const tokenRejection = validateTokenLimit(context);
  if (tokenRejection) return { apiKey, apiKeyInfo, rejection: tokenRejection };
  const rateRejection = await validateRateLimitAndThrottle(context);
  if (rateRejection) return { apiKey, apiKeyInfo, rejection: rateRejection };

  return { apiKey, apiKeyInfo, rejection: null };
}

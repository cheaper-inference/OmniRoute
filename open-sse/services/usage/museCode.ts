/** usage/museCode.ts — Muse Code (Meta) usage fetcher.
 *
 * Two layers, mirroring the Xiaomi MiMo console-cookie precedent
 * (usage/xiaomi-mimo.ts):
 *
 * 1. Live console fetch (preferred): when the connection carries a Meta dev
 *    console session cookie (`providerSpecificData.museConsoleSession` or
 *    `MUSE_CONSOLE_SESSION`), GET `https://dev.meta.ai/api/portal/teams` to
 *    list teams, pick one (single team auto-select; otherwise
 *    `providerSpecificData.museTeamId`), then GET
 *    `/api/portal/teams/{team_id}/subscription-quota` and report the 5-hour
 *    (session) and weekly weighted windows via `createQuotaFromUsage()`.
 *    The cookie is sent only as a `Cookie: llama_dev_sess=…` header — never
 *    logged, echoed, or placed in URLs/errors. Payload numbers arrive as
 *    strings and resets as Unix seconds; both are parsed strictly, and
 *    used-over-limit is clamped to exhausted (remaining 0 / 0%).
 *
 * 2. Persisted-subscription fallback (default, keeps working): the
 *    subscription metadata captured at auth time (`subsTierName`,
 *    `subsTierId`, `isSubsActive`, `hasPaymentMethod`) from
 *    `providerSpecificData`. Missing/expired cookie, multi-team ambiguity,
 *    timeout or network failure all degrade to this shape with a hint
 *    message instead of a hard error. Error paths never echo raw upstream
 *    text — they go through `sanitizeErrorMessage()` (Hard Rule #12).
 */

import { z } from "zod";

import { throttleQuotaFetch } from "../quotaFetchThrottle.ts";
import { sanitizeErrorMessage } from "../../utils/error.ts";
import { createQuotaFromUsage, type UsageQuota } from "./quota.ts";
import { toRecord } from "./scalars.ts";

type JsonRecord = Record<string, unknown>;

const CONSOLE_BASE_URL = "https://dev.meta.ai/api/portal";
const CONSOLE_FETCH_TIMEOUT_MS = 8_000;
const SESSION_COOKIE_NAME = "llama_dev_sess";

const ACQUISITION_PATH = "DevTools > Application > Cookies > dev.meta.ai > llama_dev_sess";

const MISSING_COOKIE_HINT =
  `Muse Code live quota needs the dev.meta.ai console cookie (${SESSION_COOKIE_NAME}). ` +
  `Get it at ${ACQUISITION_PATH} (logged in at dev.meta.ai), then paste it into the ` +
  "connection's museConsoleSession field or set MUSE_CONSOLE_SESSION.";

const EXPIRED_COOKIE_HINT =
  `Muse Code console cookie expired or was rejected — re-paste the ${SESSION_COOKIE_NAME} ` +
  `cookie from ${ACQUISITION_PATH} into the connection's museConsoleSession field or ` +
  "MUSE_CONSOLE_SESSION.";

/** Pull the `llama_dev_sess` value out of a bare value or a full Cookie header. */
function extractSessionValue(raw: string): string {
  // Strip one optional `Cookie:` prefix first so the single-pair form
  // `Cookie: llama_dev_sess=…` matches the key=value branch below.
  const trimmed = raw.trim().replace(/^Cookie:\s*/i, "");
  // Accept a full `Cookie: a=1; llama_dev_sess=…; b=2` header (or a bare
  // `llama_dev_sess=…` pair) and keep only the session pair.
  const labelled = trimmed.match(/(?:^|;\s*)llama_dev_sess=([^;\s]+)/);
  const value = labelled ? labelled[1] : trimmed;
  // Never reuse a value carrying header-injection characters.
  return value.replace(/[\r\n;]/g, "").trim();
}

function getConsoleSession(providerSpecificData?: JsonRecord): string {
  const configured = providerSpecificData?.museConsoleSession;
  if (typeof configured === "string" && configured.trim()) {
    return extractSessionValue(configured);
  }
  const envValue = process.env.MUSE_CONSOLE_SESSION;
  return typeof envValue === "string" && envValue.trim() ? extractSessionValue(envValue) : "";
}

interface PortalFetch {
  status: number;
  body: JsonRecord;
}

async function fetchPortalJson(path: string, session: string): Promise<PortalFetch> {
  await throttleQuotaFetch();
  const response = await fetch(`${CONSOLE_BASE_URL}${path}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Cookie: `${SESSION_COOKIE_NAME}=${session}`,
    },
    signal: AbortSignal.timeout(CONSOLE_FETCH_TIMEOUT_MS),
  });
  let body: JsonRecord = {};
  try {
    body = toRecord(await response.json());
  } catch {
    // Non-JSON body — treated as an unrecognized / rejected payload below.
  }
  return { status: response.status, body };
}

function isAuthRejected(status: number): boolean {
  return status === 401 || status === 403;
}

type Team = { teamId: string; teamName: string };

// Strict zod shape for GET /teams: an array of { team_id, team_name? }.
// Any missing or empty team_id fails the whole payload → caller degrades.
const teamSchema = z
  .object({
    team_id: z.string().trim().min(1),
    team_name: z.string().trim().optional(),
  })
  .passthrough();

const teamsSchema = z.object({ teams: z.array(teamSchema) }).passthrough();

function parseTeams(body: JsonRecord): Team[] | null {
  const parsed = teamsSchema.safeParse(body);
  if (!parsed.success) return null;
  return parsed.data.teams.map((team) => ({
    teamId: team.team_id,
    teamName: team.team_name || team.team_id,
  }));
}

interface SubscriptionQuota {
  tier: string;
  windowUsed: number;
  windowTotal: number;
  windowResetsAt: number | null;
  weeklyUsed: number;
  weeklyTotal: number;
  weeklyResetsAt: number | null;
}

// Strict zod shape for the subscription-quota object. The four
// window/weekly used+limit values must be finite numbers (non-empty numeric
// strings coerce; null, "" and [] must not become 0) with limits > 0; resets,
// when present, must be positive finite.
const looseNumber = z.union([z.number(), z.string().trim().min(1)]).transform(Number);
const finiteNumber = looseNumber.pipe(z.number().finite());
const positiveNumber = looseNumber.pipe(z.number().finite().positive());
const resetsAt = positiveNumber.nullable().optional();

const subscriptionQuotaSchema = z.object({
  tier: z.string().trim().optional(),
  window_weighted_used: finiteNumber,
  window_weighted_limit: positiveNumber,
  window_resets_at: resetsAt,
  weekly_weighted_used: finiteNumber,
  weekly_weighted_limit: positiveNumber,
  weekly_resets_at: resetsAt,
});

const subscriptionQuotaBodySchema = z
  .object({ subscription_quota: subscriptionQuotaSchema })
  .passthrough();

function parseSubscriptionQuota(body: JsonRecord): SubscriptionQuota | null {
  const parsed = subscriptionQuotaBodySchema.safeParse(body);
  if (!parsed.success) return null;
  const quota = parsed.data.subscription_quota;
  return {
    tier: quota.tier || "Muse Code",
    windowUsed: quota.window_weighted_used,
    windowTotal: quota.window_weighted_limit,
    windowResetsAt: quota.window_resets_at ?? null,
    weeklyUsed: quota.weekly_weighted_used,
    weeklyTotal: quota.weekly_weighted_limit,
    weeklyResetsAt: quota.weekly_resets_at ?? null,
  };
}

function windowQuota(
  used: number,
  total: number,
  resetsAt: number | null,
  label: string
): UsageQuota {
  const exhausted = total > 0 && used > total;
  const quota = createQuotaFromUsage(used, total, resetsAt);
  quota.displayName = exhausted ? `${label} (exhausted)` : label;
  return quota;
}

type LiveResult = { plan: string; quotas: Record<string, UsageQuota> } | { message: string };

async function fetchLiveQuota(
  session: string,
  requestedTeamId: string | null
): Promise<LiveResult> {
  const teamsFetch = await fetchPortalJson("/teams", session);
  if (isAuthRejected(teamsFetch.status)) return { message: EXPIRED_COOKIE_HINT };

  const teams = parseTeams(teamsFetch.body);
  if (!teams || teams.length === 0) {
    return {
      message: sanitizeErrorMessage(
        "Muse Code console: teams payload unrecognized — cannot map the quota window."
      ),
    };
  }

  let team: Team | undefined;
  if (requestedTeamId) {
    team = teams.find((candidate) => candidate.teamId === requestedTeamId);
    if (!team) {
      // Neither the configured id nor upstream team names are echoed: both are
      // untrusted text that could reach HTML surfaces through the quota message.
      return {
        message:
          "Muse Code console: museTeamId matches none of this account's teams — set it to a " +
          "team_id shown in the console.",
      };
    }
  } else if (teams.length === 1) {
    team = teams[0];
  } else {
    return {
      message:
        "Muse Code console: multiple teams found — set the connection's museTeamId " +
        "(providerSpecificData) to the team_id shown in the console.",
    };
  }

  const quotaFetch = await fetchPortalJson(
    `/teams/${encodeURIComponent(team.teamId)}/subscription-quota`,
    session
  );
  if (isAuthRejected(quotaFetch.status)) return { message: EXPIRED_COOKIE_HINT };

  const quota = parseSubscriptionQuota(quotaFetch.body);
  if (!quota) {
    return {
      message: sanitizeErrorMessage(
        "Muse Code console: subscription-quota payload unrecognized — cannot map the quota window."
      ),
    };
  }

  return {
    plan: quota.tier,
    quotas: {
      session: windowQuota(
        quota.windowUsed,
        quota.windowTotal,
        quota.windowResetsAt,
        "session window"
      ),
      weekly: windowQuota(
        quota.weeklyUsed,
        quota.weeklyTotal,
        quota.weeklyResetsAt,
        "weekly window"
      ),
    },
  };
}

/** Muse Code usage fetcher.
 *
 * Live via the dev.meta.ai console cookie when configured; otherwise the
 * persisted subscription metadata from `providerSpecificData` (subsTierName,
 * subsTierId, isSubsActive, hasPaymentMethod) as an "unknown usage" response
 * so the quota page shows tier info without fabricating numbers.
 */
export async function getMuseUsage(
  _accessToken?: string,
  providerSpecificData: Record<string, unknown> = {},
  _connectionId?: string
): Promise<JsonRecord> {
  const psd = toRecord(providerSpecificData);

  const tierName = typeof psd.subsTierName === "string" ? psd.subsTierName : undefined;
  const tierId = typeof psd.subsTierId === "string" ? psd.subsTierId : undefined;
  const isActive = typeof psd.isSubsActive === "boolean" ? psd.isSubsActive : undefined;
  const hasPayment = typeof psd.hasPaymentMethod === "boolean" ? psd.hasPaymentMethod : undefined;

  const activity = isActive === undefined ? "activity unknown" : isActive ? "active" : "inactive";

  // Live console quota may be unavailable (no cookie). Return only
  // subscription metadata; omitting quota values distinguishes unreported
  // usage from exhaustion.
  const fallbackBase = {
    provider: "muse-code",
    plan: tierName ?? "unknown",
    subsTierId: tierId ?? undefined,
    isSubsActive: isActive ?? undefined,
    hasPaymentMethod: hasPayment ?? undefined,
    resetAt: null,
    unlimited: false,
    details: [],
  };
  const metadataMessage = tierName
    ? `Muse Code subscription: ${tierName} (${activity}). Live console quota is unavailable — paste the dev.meta.ai console cookie to enable it.`
    : "Muse Code subscription detected. Live console quota is unavailable — paste the dev.meta.ai console cookie to enable it.";

  const session = getConsoleSession(psd);
  if (!session) {
    return { ...fallbackBase, message: `${metadataMessage} ${MISSING_COOKIE_HINT}` };
  }

  const requestedTeamId =
    typeof psd.museTeamId === "string" && psd.museTeamId.trim() ? psd.museTeamId.trim() : null;

  try {
    const live = await fetchLiveQuota(session, requestedTeamId);
    if (!("message" in live)) {
      return { provider: "muse-code", plan: live.plan, quotas: live.quotas };
    }
    return { ...fallbackBase, message: live.message };
  } catch {
    // Timeout / network failure: never echo the raw error (it may embed the
    // cookie or upstream body); the sanitized fixed text goes to the client.
    const message = sanitizeErrorMessage(
      "Muse Code console quota fetch failed (network or timeout)."
    );
    return { ...fallbackBase, message };
  }
}

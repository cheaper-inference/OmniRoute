import { z } from "zod";
import { createQuotaFromUsage, type UsageQuota } from "./quota.ts";
import { requestMuseConsole } from "./museConsoleTransport.ts";

type ConsoleData = Record<string, unknown>;
type ConsoleReading = { plan: string; quotas: Record<string, UsageQuota> };
type ConsoleResult = ConsoleReading | { message: string };

const COOKIE = "llama_dev_sess";
const COOKIE_HELP = "DevTools > Application > Cookies > dev.meta.ai > llama_dev_sess";
const numberValue = z.union([z.number(), z.string().trim().min(1)]).transform(Number);
const usageValue = numberValue.pipe(z.number().finite().nonnegative());
const limitValue = numberValue.pipe(z.number().finite().positive());
const resetValue = limitValue.refine((n) => n * 1000 <= 8.64e15).nullish();
const teamsPayload = z.object({ teams: z.array(z.object({ team_id: z.string().trim().min(1) })) });
const quotaPayload = z.object({
  subscription_quota: z.object({
    tier: z.string().trim().optional(),
    window_weighted_used: usageValue,
    window_weighted_limit: limitValue,
    window_resets_at: resetValue,
    weekly_weighted_used: usageValue,
    weekly_weighted_limit: limitValue,
    weekly_resets_at: resetValue,
  }),
});

/** Accept a bare value or select exactly the named cookie from a pasted header. */
function sessionCookie(input: unknown): string | null {
  if (typeof input !== "string" || /[\r\n]/.test(input)) return null;
  const raw = input.trim();
  if (!raw) return null;
  const header = /^cookie:/i.test(raw);
  const pairs = raw.replace(/^cookie:\s*/i, "").split(";");
  const named = pairs.map((p) => p.trim()).filter((p) => p.startsWith(`${COOKIE}=`));
  if (named.length > 1) return null;
  const value = named.length === 1 ? named[0].slice(COOKIE.length + 1) : raw;
  if (!named.length && (header || pairs.length > 1 || raw.includes("="))) return null;
  return /^[\x21-\x2b\x2d-\x3a\x3c-\x5b\x5d-\x7e]+$/.test(value) ? value : null;
}

function configuredSession(data: ConsoleData): string | null {
  const own = data.museConsoleSession;
  if (typeof own === "string" && own.trim()) return sessionCookie(own);
  return sessionCookie(process.env.MUSE_CONSOLE_SESSION);
}

function statusDiagnostic(status: number): string | null {
  if (status === 401 || status === 403) {
    return `Muse Code console session expired or rejected; re-paste its value from ${COOKIE_HELP}.`;
  }
  return status >= 200 && status < 300 ? null : `Muse Code console answered HTTP ${status}.`;
}

function selectTeam(ids: string[], requested: unknown): string | null {
  const selected = typeof requested === "string" ? requested.trim() : "";
  if (selected) return ids.includes(selected) ? selected : null;
  return ids.length === 1 ? ids[0] : null;
}

function consoleWindow(
  used: number,
  limit: number,
  reset: number | null | undefined,
  label: string
): UsageQuota {
  return {
    ...createQuotaFromUsage(used, limit, reset),
    displayName: used >= limit ? `${label} (exhausted)` : label,
  };
}

function consoleReading(payload: unknown): ConsoleReading | null {
  const decoded = quotaPayload.safeParse(payload);
  if (!decoded.success) return null;
  const q = decoded.data.subscription_quota;
  return {
    plan: q.tier || "Muse Code",
    quotas: {
      session: consoleWindow(
        q.window_weighted_used,
        q.window_weighted_limit,
        q.window_resets_at,
        "session window"
      ),
      weekly: consoleWindow(
        q.weekly_weighted_used,
        q.weekly_weighted_limit,
        q.weekly_resets_at,
        "weekly window"
      ),
    },
  };
}

async function queryConsole(session: string, data: ConsoleData): Promise<ConsoleResult> {
  const listing = await requestMuseConsole("/teams", session);
  const listingError = statusDiagnostic(listing.status);
  if (listingError) return { message: listingError };
  const parsedTeams = teamsPayload.safeParse(listing.payload);
  if (!parsedTeams.success || !parsedTeams.data.teams.length) {
    return { message: "Muse Code console teams payload unrecognized." };
  }
  const team = selectTeam(
    parsedTeams.data.teams.map((t) => t.team_id),
    data.museTeamId
  );
  if (!team)
    return {
      message:
        "Muse Code console: multiple teams or an unmatched museTeamId; set a valid museTeamId.",
    };
  const response = await requestMuseConsole(
    `/teams/${encodeURIComponent(team)}/subscription-quota`,
    session
  );
  const quotaError = statusDiagnostic(response.status);
  if (quotaError) return { message: quotaError };
  return (
    consoleReading(response.payload) ?? { message: "Muse Code console quota payload unrecognized." }
  );
}

/** Console admission is optional; the caller owns fallback to stream evidence. */
export async function getMuseConsoleUsage(data: ConsoleData): Promise<ConsoleResult> {
  const session = configuredSession(data);
  if (!session) {
    return {
      message: `Configure museConsoleSession or MUSE_CONSOLE_SESSION with the cookie value from ${COOKIE_HELP}.`,
    };
  }
  try {
    return await queryConsole(session, data);
  } catch {
    // Never expose an upstream body, URL exception or cookie-bearing error.
    return { message: "Muse Code console quota fetch failed (network or timeout)." };
  }
}

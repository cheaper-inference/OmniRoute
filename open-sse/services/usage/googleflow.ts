/**
 * Google Flow credit balance (Veo Credits) -> UsageQuota for Limits page.
 *
 * Wire protocol: Google Flow UI batchexecute RPC `nzlxg`.
 * Endpoint: POST https://flow.google.com/_/FlowUi/data/batchexecute?rpcids=nzlxg
 * Body: f.req=[[["nzlxg","[]",null,"generic"]]]
 *
 * Response envelope:
 *   )]}'
 *   ... [["wrb.fr","nzlxg","[<balance>,...]",null,null,null,"generic"]] ...
 * where `[0]` is the integer credit balance displayed in the Flow account menu.
 */

import { type UsageQuota } from "./quota.ts";
import { sanitizeErrorMessage } from "../../utils/error.ts";

export interface GoogleFlowCreditsResult {
  credits: number;
  rawPayload?: unknown;
}

const XSSI_PREFIX = ")]}'";
const ONE_HOUR_MS = 60 * 60 * 1000;
/** Each Flow RPC is bounded so a stalled flow.google.com connection cannot hang the limits poll. */
export const FLOW_RPC_TIMEOUT_MS = 15_000;
const flowCreditsCache = new Map<
  string,
  { data: { quotas: Record<string, UsageQuota> }; timestamp: number }
>();

export function invalidateFlowCreditsCache(cacheKey?: string): void {
  if (cacheKey) {
    flowCreditsCache.delete(cacheKey);
  } else {
    flowCreditsCache.clear();
  }
}

/**
 * Normalizes user-supplied cookie input (raw header, JSON export, or bare SID)
 * into a valid Cookie header for flow.google.com.
 */
export function normalizeFlowCookies(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "";

  // Handle JSON cookie array (e.g. from EditThisCookie / Cookie-Editor)
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed
          .filter((c) => c && typeof c.name === "string" && typeof c.value === "string")
          .map((c) => `${c.name}=${c.value}`)
          .join("; ");
      }
    } catch {
      // Fall through to raw string treatment
    }
  }

  // Handle key-value format
  if (trimmed.includes("=")) {
    return trimmed;
  }

  // Bare __Secure-1PSID token
  return `__Secure-1PSID=${trimmed}`;
}

/** Credits from one `["wrb.fr","nzlxg","[<balance>,...]",...]` envelope item, if it is one. */
function creditsFromEnvelopeItem(item: unknown): GoogleFlowCreditsResult | null {
  if (!Array.isArray(item)) return null;
  const [marker, rpcid, payloadJson] = item;
  if (marker !== "wrb.fr" || rpcid !== "nzlxg" || typeof payloadJson !== "string") return null;
  const innerPayload = JSON.parse(payloadJson);
  if (!Array.isArray(innerPayload) || typeof innerPayload[0] !== "number") return null;
  return { credits: Math.max(0, Math.floor(innerPayload[0])), rawPayload: innerPayload };
}

/** Credits from one JSON chunk line of the batchexecute body; null for any other line. */
function creditsFromChunkLine(line: string): GoogleFlowCreditsResult | null {
  const trimmed = line.trim();
  if (!trimmed.startsWith("[") || !trimmed.endsWith("]")) return null;
  try {
    const parsed = JSON.parse(trimmed);
    if (!Array.isArray(parsed)) return null;
    for (const item of parsed) {
      const credits = creditsFromEnvelopeItem(item);
      if (credits) return credits;
    }
  } catch {
    // Ignore unparseable chunk lines
  }
  return null;
}

/**
 * Parses the raw batchexecute response body for the `nzlxg` RPC reply.
 */
export function parseFlowCreditsReply(responseText: string): GoogleFlowCreditsResult {
  const cleaned = responseText.startsWith(XSSI_PREFIX)
    ? responseText.slice(XSSI_PREFIX.length).trim()
    : responseText;

  // Split lines / chunk markers to find JSON arrays
  for (const line of cleaned.split("\n")) {
    const credits = creditsFromChunkLine(line);
    if (credits) return credits;
  }

  // Fallback: look for regex match on balance pattern inside nzlxg block
  const match = /"nzlxg"\s*,\s*"\\?\[(\d+)/.exec(responseText);
  if (match && match[1]) {
    return { credits: parseInt(match[1], 10) };
  }

  throw new Error("Unable to parse Google Flow credit balance from response");
}

export async function fetchFlowCredits(
  cookies: string,
  fetchImpl: typeof fetch = fetch,
  timeoutMs: number = FLOW_RPC_TIMEOUT_MS
): Promise<GoogleFlowCreditsResult> {
  const cookieHeader = normalizeFlowCookies(cookies);
  if (!cookieHeader) {
    throw new Error("Missing Google Flow cookies (__Secure-1PSID)");
  }

  const endpoint =
    "https://flow.google.com/_/AiSandboxAngularFrontend/data/batchexecute?rpcids=nzlxg";
  const headers: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    Cookie: cookieHeader,
    Origin: "https://flow.google.com",
    Referer: "https://flow.google.com/",
    "User-Agent":
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
  };

  const reqData =
    "f.req=" + encodeURIComponent(JSON.stringify([[["nzlxg", "[]", null, "generic"]]]));
  let response = await fetchImpl(endpoint, {
    method: "POST",
    headers,
    body: reqData,
    signal: AbortSignal.timeout(timeoutMs),
  });

  let text = await response.text();

  const xsrfMatch = /"xsrf"\s*,\s*"([^"]+)"/.exec(text);
  if (response.status === 400 && xsrfMatch && xsrfMatch[1]) {
    response = await fetchImpl(endpoint, {
      method: "POST",
      headers,
      body: `${reqData}&at=${encodeURIComponent(xsrfMatch[1])}`,
      signal: AbortSignal.timeout(timeoutMs),
    });
    text = await response.text();
  }

  // Also check Set-Cookie in response headers to update rotated __Secure-1PSIDTS if provided
  const setCookie = response.headers?.get ? response.headers.get("set-cookie") : null;
  if (setCookie && setCookie.includes("__Secure-1PSIDTS=")) {
    console.log("[FLOW_DEBUG] Received Set-Cookie with rotated __Secure-1PSIDTS");
  }

  if (!response.ok) {
    throw new Error(`Google Flow RPC failed with HTTP ${response.status}`);
  }

  if (text.includes("ServiceLogin") || text.includes('flowRedirect="public"')) {
    throw new Error("Google Flow session expired or unauthenticated");
  }

  return parseFlowCreditsReply(text);
}

/**
 * Transforms Google Flow credits into the standard UsageQuota record for OmniRoute Limits.
 */
export async function getGoogleFlowUsage(
  apiKeyOrCookie: string,
  providerSpecificData?: Record<string, unknown>,
  fetchImpl: typeof fetch = fetch
): Promise<{ quotas: Record<string, UsageQuota> }> {
  const cacheKey =
    typeof apiKeyOrCookie === "string" ? apiKeyOrCookie.trim().slice(0, 80) : "default";
  const now = Date.now();
  const cached = flowCreditsCache.get(cacheKey);
  const force = providerSpecificData?.forceRefresh === true || providerSpecificData?.force === true;

  if (!force && cached && now - cached.timestamp < ONE_HOUR_MS) {
    return cached.data;
  }

  try {
    const { credits } = await fetchFlowCredits(apiKeyOrCookie, fetchImpl);
    const quota: UsageQuota = {
      used: 0,
      total: credits,
      remaining: credits,
      remainingPercentage: credits >= 20 ? 100 : 0,
      resetAt: null,
      unlimited: false,
      displayName: "Veo Credits",
    };

    const result = {
      quotas: {
        veo_credits: quota,
      },
    };
    flowCreditsCache.set(cacheKey, { data: result, timestamp: now });
    return result;
  } catch (err: unknown) {
    if (cached) {
      return cached.data;
    }
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    throw new Error(`Failed to fetch Google Flow credits: ${msg}`);
  }
}

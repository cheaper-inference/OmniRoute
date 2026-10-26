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

/**
 * Parses the raw batchexecute response body for the `nzlxg` RPC reply.
 */
export function parseFlowCreditsReply(responseText: string): GoogleFlowCreditsResult {
  let cleaned = responseText;
  if (cleaned.startsWith(XSSI_PREFIX)) {
    cleaned = cleaned.slice(XSSI_PREFIX.length).trim();
  }

  // Split lines / chunk markers to find JSON arrays
  const lines = cleaned.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("[") || !trimmed.endsWith("]")) {
      continue;
    }

    try {
      const parsed = JSON.parse(trimmed);
      if (!Array.isArray(parsed)) continue;

      // Scan for the nzlxg response wrapper: ["wrb.fr", "nzlxg", "[...]", ...]
      for (const item of parsed) {
        if (!Array.isArray(item)) continue;
        const [marker, rpcid, payloadJson] = item;
        if (marker === "wrb.fr" && rpcid === "nzlxg" && typeof payloadJson === "string") {
          const innerPayload = JSON.parse(payloadJson);
          if (Array.isArray(innerPayload) && typeof innerPayload[0] === "number") {
            return {
              credits: Math.max(0, Math.floor(innerPayload[0])),
              rawPayload: innerPayload,
            };
          }
        }
      }
    } catch {
      // Ignore unparseable chunk lines
    }
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
  fetchImpl: typeof fetch = fetch
): Promise<GoogleFlowCreditsResult> {
  const cookieHeader = normalizeFlowCookies(cookies);
  if (!cookieHeader) {
    throw new Error("Missing Google Flow cookies (__Secure-1PSID)");
  }

  const endpoint = "https://flow.google.com/_/AiSandboxAngularFrontend/data/batchexecute?rpcids=nzlxg";
  const headers: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    Cookie: cookieHeader,
    Origin: "https://flow.google.com",
    Referer: "https://flow.google.com/",
    "User-Agent":
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
  };

  const reqData = "f.req=" + encodeURIComponent(JSON.stringify([[["nzlxg", "[]", null, "generic"]]]));
  let response = await fetchImpl(endpoint, {
    method: "POST",
    headers,
    body: reqData,
  });

  let text = await response.text();

  // If Google returns 400 with XSRF token, extract token and retry once
  if (response.status === 400 && text.includes('"xsrf"')) {
    const xsrfMatch = /"xsrf"\s*,\s*"([^"]+)"/.exec(text);
    if (xsrfMatch && xsrfMatch[1]) {
      response = await fetchImpl(endpoint, {
        method: "POST",
        headers,
        body: `${reqData}&at=${encodeURIComponent(xsrfMatch[1])}`,
      });
      text = await response.text();
    }
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
  _providerSpecificData?: Record<string, unknown>,
  fetchImpl: typeof fetch = fetch
): Promise<{ quotas: Record<string, UsageQuota> }> {
  try {
    const { credits } = await fetchFlowCredits(apiKeyOrCookie, fetchImpl);
    const quota: UsageQuota = {
      used: 0,
      total: credits,
      remaining: credits,
      remainingPercentage: credits > 0 ? 100 : 0,
      resetAt: null,
      unlimited: false,
      displayName: "Veo Credits",
    };

    return {
      quotas: {
        veo_credits: quota,
      },
    };
  } catch (err: unknown) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    throw new Error(`Failed to fetch Google Flow credits: ${msg}`);
  }
}

/**
 * chatCore executor client-header normalizer (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Pure helper extracted from chatCore: normalizes a Headers instance or a plain header object into a
 * lowercased-tolerant Record<string,string>, and backfills the client User-Agent (both casings) when
 * one is supplied and not already present. Returns null when nothing was collected. Side-effect-free;
 * OpenCode additionally retains explicit conversation identity before body translation.
 */
import { preserveOpencodeSessionIdentity } from "../../utils/opencodeSessionIdentity.ts";

// Pre-compiled set for O(1) lease control header checks (hot path)
const LEASE_CONTROL_HEADERS = new Set([
  "x-omniroute-lease-owner",
  "x-omniroute-lease-generation",
  "x-deadline-token",
]);

function isLeaseControlHeader(key: string): boolean {
  return LEASE_CONTROL_HEADERS.has(key.toLowerCase());
}

export function buildExecutorClientHeaders(
  headers: Headers | Record<string, unknown> | null | undefined,
  userAgent?: string | null,
  request?: { provider?: string; body?: unknown }
) {
  const normalized: Record<string, string> = {};

  if (headers instanceof Headers) {
    headers.forEach((value, key) => {
      if (isLeaseControlHeader(key)) return;
      normalized[key] = value;
    });
  } else if (headers && typeof headers === "object") {
    for (const [key, value] of Object.entries(headers)) {
      if (isLeaseControlHeader(key)) continue;
      if (typeof value === "string") {
        normalized[key] = value;
      }
    }
  }

  const normalizedUserAgent = typeof userAgent === "string" ? userAgent.trim() : "";
  if (normalizedUserAgent && !normalized["user-agent"] && !normalized["User-Agent"]) {
    normalized["user-agent"] = normalizedUserAgent;
    normalized["User-Agent"] = normalizedUserAgent;
  }

  preserveOpencodeSessionIdentity(normalized, request);
  return Object.keys(normalized).length > 0 ? normalized : null;
}

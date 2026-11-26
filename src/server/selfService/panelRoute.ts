/**
 * Whether the public self-service quota page (/quota/{provider}) exists.
 *
 * The page exists only while the QUOTA_SELF_PANEL flag is on and the provider segment, in the
 * same shape GET /api/v1/me/quota/{provider} accepts, names an entry of the provider registry
 * (id or alias). Everything else answers like a route that does not exist.
 *
 * The decision runs in src/proxy.ts, before rendering starts: the root loading.tsx wraps every
 * page in a Suspense boundary, so once its fallback streams the status is already 200 and a
 * notFound() thrown by the page can only swap the screen. The proxy answers the 404 itself. It
 * does not rewrite to the not-found route: the framework resolves a rewrite against the origin
 * it derives for the request, and treats it as a request to another server when that origin
 * differs (a loopback bind address, or the scheme a TLS proxy forwards). The page repeats the
 * same check.
 */
import { NextResponse, type NextRequest } from "next/server";

import { getProviderByAlias } from "@/shared/constants/providers";
import { selfQuotaProviderSegmentSchema } from "@/shared/schemas/selfQuota";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";

const QUOTA_PANEL_FLAG = "QUOTA_SELF_PANEL";
const QUOTA_PANEL_NOT_FOUND_BODY = "Not Found";
/** Only the lowercase spelling has a route; any other casing already falls to the native 404. */
const QUOTA_PANEL_PATH = /^\/quota\/([^/]+)\/?$/;

export interface QuotaPanelPage {
  /** Canonical registry id. */
  provider: string;
  /** Display name from the registry. */
  providerName: string;
}

function parseSegment(segment: string): string | null {
  const parsed = selfQuotaProviderSegmentSchema.safeParse(segment);
  return parsed.success ? parsed.data : null;
}

/**
 * The page behind /quota/<segment>, or null when it must not exist: flag off (or unreadable),
 * bad segment, provider not in the registry.
 */
export function resolveQuotaPanelPage(segment: string): QuotaPanelPage | null {
  try {
    if (!isFeatureFlagEnabled(QUOTA_PANEL_FLAG)) return null;
  } catch (err) {
    console.error(
      "[quota-panel] Feature flag lookup failed; the page answers 404:",
      err instanceof Error ? err.message : err
    );
    return null;
  }
  const id = parseSegment(segment);
  if (id === null) return null;
  const entry = getProviderByAlias(id);
  if (!entry) return null;
  return { provider: entry.id, providerName: entry.name };
}

/**
 * For src/proxy.ts. A 404 for a /quota/<segment> that must not exist. Null for every other
 * request.
 */
export function quotaPanelGateResponse(request: NextRequest): NextResponse | null {
  const match = QUOTA_PANEL_PATH.exec(request.nextUrl.pathname);
  if (!match) return null;

  let segment: string | null = null;
  try {
    segment = decodeURIComponent(match[1]);
  } catch {
    // Malformed percent-encoding: there is no such page.
  }
  if (segment !== null && resolveQuotaPanelPage(segment)) return null;

  return new NextResponse(QUOTA_PANEL_NOT_FOUND_BODY, {
    status: 404,
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
  });
}

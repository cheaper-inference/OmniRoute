/**
 * Whether the public self-service quota page (/quota/{provider}) exists.
 *
 * The page exists only while the QUOTA_SELF_PANEL flag is on and the provider segment, in the
 * same shape GET /api/v1/me/quota/{provider} accepts, names an entry of the provider registry
 * (id or alias). Everything else answers like a route that does not exist.
 *
 * The decision runs in src/proxy.ts, before rendering starts: the root loading.tsx wraps every
 * page in a Suspense boundary, so once its fallback streams the status is already 200 and a
 * notFound() thrown by the page can only swap the screen. Rewriting to the not-found route from
 * the proxy is what makes the HTTP status a real 404. The page repeats the same check.
 */
import { NextResponse, type NextRequest } from "next/server";

import { getProviderByAlias } from "@/shared/constants/providers";
import { selfQuotaProviderSegmentSchema } from "@/shared/schemas/selfQuota";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";

const QUOTA_PANEL_FLAG = "QUOTA_SELF_PANEL";
/** The App Router's internal not-found route; rendering it answers with status 404. */
const QUOTA_PANEL_NOT_FOUND_PATH = "/_not-found";
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
 * For src/proxy.ts. A rewrite to the not-found route for a /quota/<segment> that must not
 * exist; null for every other request.
 */
export function quotaPanelGateResponse(request: NextRequest): NextResponse | null {
  const match = QUOTA_PANEL_PATH.exec(request.nextUrl.pathname);
  if (!match) return null;

  let page: QuotaPanelPage | null = null;
  try {
    page = resolveQuotaPanelPage(decodeURIComponent(match[1]));
  } catch {
    // Malformed percent-encoding: there is no such page.
    page = null;
  }
  if (page) return null;

  const url = request.nextUrl.clone();
  url.pathname = QUOTA_PANEL_NOT_FOUND_PATH;
  url.search = "";
  return NextResponse.rewrite(url);
}

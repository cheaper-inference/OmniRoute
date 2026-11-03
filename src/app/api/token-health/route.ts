/**
 * Token Health API Route — Batch G
 *
 * Exposes aggregate health status of OAuth tokens.
 * Used by TokenHealthBadge in the Header.
 */

import { getProviderConnections } from "@/lib/db/providers";
import { getAllAccessTokens } from "@/sse/services/tokenRefresh";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { isDeprecatedProvider } from "@omniroute/open-sse/services/tokenRefresh.ts";
import { rotationGroupFor } from "@omniroute/open-sse/services/refreshSerializer.ts";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth.ts";

export async function GET() {
  try {
    const connections = await getProviderConnections({ authType: "oauth" });
    const oauthConns = (connections || []).filter((c) => c.isActive && c.refreshToken);

    const total = oauthConns.length;
    const healthy = oauthConns.filter((c) => c.testStatus === "active" || !c.lastError).length;
    const errored = oauthConns.filter(
      (c) => c.testStatus === "error" || c.lastErrorType === "token_refresh_failed"
    ).length;
    const lastCheck = oauthConns.reduce((latest, c) => {
      if (!c.lastHealthCheckAt) return latest;
      return latest && latest > c.lastHealthCheckAt ? latest : c.lastHealthCheckAt;
    }, null);

    return Response.json({
      total,
      healthy,
      errored,
      warning: total - healthy - errored,
      lastCheckAt: lastCheck,
      status: errored > 0 ? "error" : healthy < total ? "warning" : "healthy",
    });
  } catch (err) {
    return Response.json(
      { error: sanitizeErrorMessage((err as Error)?.message), status: "unknown" },
      { status: 500 }
    );
  }
}

/**
 * POST — bulk-refresh every eligible OAuth connection in a bounded wave
 * (see getAllAccessTokens). Eligibility mirrors the GET's filter
 * (`isActive` + a refresh token) plus the families the sweep must never
 * touch, each counted as `skipped` rather than refreshed:
 *
 * - the rotating Auth0 family (codex/openai) — proactive rotation revokes
 *   sibling accounts (same guard as /api/providers/[id]/refresh);
 * - cursor (no refresh token by design);
 * - github / ghe-copilot without a refresh token (device-code flow, the
 *   Copilot sub-token is not refreshable through the generic path);
 * - deprecated providers.
 *
 * The response carries counters only — never a token.
 */
export async function POST(request: Request) {
  const unauthorized = await requireManagementAuth(request);
  if (unauthorized) return unauthorized;

  try {
    const connections = await getProviderConnections({ authType: "oauth" });
    // The sweep's base is the active OAuth rows; the guards below decide per
    // row whether it is skipped (counted) or never eligible at all.
    const base = (connections || []).filter((c) => c.isActive && c.provider);

    const isSkipped = (c) => {
      if (rotationGroupFor(c.provider) === "openai-auth0") return true;
      if (c.provider === "cursor") return true;
      if ((c.provider === "github" || c.provider === "ghe-copilot") && !c.refreshToken) {
        return true;
      }
      return isDeprecatedProvider(c.provider);
    };

    const skipped = base.filter(isSkipped).length;

    // Eligible for the wave: not skipped and carrying a refresh token.
    // A plain provider without one is simply not eligible (not counted).
    const waveTargets = base.filter((c) => !isSkipped(c) && c.refreshToken);

    const results = await getAllAccessTokens({
      connections: waveTargets.map((c) => ({
        provider: c.provider,
        connectionId: c.id,
        refreshToken: c.refreshToken,
        accessToken: c.accessToken,
        expiresAt: c.expiresAt,
        providerSpecificData: c.providerSpecificData,
        isActive: c.isActive,
      })),
    });

    let refreshed = 0;
    let failed = 0;
    for (const value of Object.values(results)) {
      if (value == null) {
        failed += 1;
      } else {
        refreshed += 1;
      }
    }

    return Response.json({ refreshed, skipped, failed });
  } catch (err) {
    return Response.json({ error: sanitizeErrorMessage((err as Error)?.message) }, { status: 500 });
  }
}

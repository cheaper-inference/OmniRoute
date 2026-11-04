/**
 * MCP v2 Sidecar — Streamable HTTP transport, /api/mcp/v2
 *
 * The 2026-07-28 spec drops the initialize handshake and per-session state, so
 * this route is STATELESS: one JSON-RPC message per POST, no Mcp-Session-Id.
 * `server/discover`, `tools/list`, and `tools/call` are all served over this path.
 *
 * Auth classification is identical to v1's /api/mcp/stream: `requireManagementAuth`
 * applies the same loopback / dashboard-session / CLI-token / API-key
 * (mcp:connect scope) decision, so the v2 surface is never reachable with looser
 * auth than v1's.
 *
 * Gating: this route only serves when the operator has BOTH enabled MCP and set
 * `OMNIROUTE_MCP_V2=true`. v2 is experimental and off by default; without the flag
 * the handler answers 503 rather than exposing a second, less-tested surface.
 */

import { NextResponse } from "next/server";
import { getCachedSettings } from "@/lib/db/settings";
import { isMcpV2Enabled, handleMcpV2Http } from "@omniroute/open-sse/mcp-server/v2/server";
import { registerMcpV2HostHooks } from "@omniroute/open-sse/mcp-server/v2/hostHooks";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { isMcpScopeEnforcementEnabled } from "@/shared/utils/featureFlags";
import { getComboModelProvider, getComboModelString, getComboStepTarget } from "@/lib/combos/steps";
import { normalizeQuotaResponse } from "@/shared/contracts/quota";

registerMcpV2HostHooks({
  isScopeEnforcementEnabled: isMcpScopeEnforcementEnabled,
  getComboModelProvider,
  getComboModelString,
  getComboStepTarget,
  normalizeQuotaResponse: (raw, filters) => normalizeQuotaResponse(raw, filters),
});

async function guardEnabled(): Promise<NextResponse | null> {
  const settings = await getCachedSettings();
  if (!settings.mcpEnabled) {
    return NextResponse.json(
      { error: "MCP server is disabled. Enable it from the Endpoints page." },
      { status: 503 }
    );
  }
  if (!isMcpV2Enabled()) {
    return NextResponse.json(
      {
        error:
          "MCP v2 sidecar is disabled. Set OMNIROUTE_MCP_V2=true to enable the experimental 2026-07-28 server.",
      },
      { status: 503 }
    );
  }
  return null;
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request, { acceptMcpConnectScope: true });
  if (authError) return authError;
  const blocked = await guardEnabled();
  if (blocked) return blocked;
  return handleMcpV2Http(request);
}

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request, { acceptMcpConnectScope: true });
  if (authError) return authError;
  const blocked = await guardEnabled();
  if (blocked) return blocked;
  return handleMcpV2Http(request);
}

export async function DELETE(request: Request) {
  const authError = await requireManagementAuth(request, { acceptMcpConnectScope: true });
  if (authError) return authError;
  const blocked = await guardEnabled();
  if (blocked) return blocked;
  return handleMcpV2Http(request);
}

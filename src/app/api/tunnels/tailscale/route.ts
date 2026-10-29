import { NextResponse } from "next/server";
import { getTailscaleTunnelStatus } from "@/lib/tailscaleTunnel";
import { toPublicSafeTunnelError } from "@/lib/api/publicSafeTunnelError";
import { getRequestPeerLocality } from "@/shared/utils/apiAuth";
import { requireTailscaleAuth } from "./routeUtils";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authError = await requireTailscaleAuth(request);
  if (authError) return authError;

  try {
    // The status probes spawn on the host (`which`, `tailscale status --json`), but this
    // route stays remote-reachable for the dashboard: only loopback/LAN callers run them
    // (GHSA-35fw-cv32-2373 class, GHSA-jmq6-8j86-8xqj call-site gate).
    const status = await getTailscaleTunnelStatus({
      allowLocalProbe: getRequestPeerLocality(request) !== "remote",
    });
    return NextResponse.json(status);
  } catch (error) {
    return NextResponse.json(
      toPublicSafeTunnelError(
        error,
        "Failed to load the Tailscale status.",
        "tunnels/tailscale GET"
      ),
      { status: 500 }
    );
  }
}

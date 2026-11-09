import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getRequestPeerLocality, isAuthenticated } from "@/shared/utils/apiAuth";
import {
  formatValidationMessage,
  isValidationFailure,
  validateBody,
} from "@/shared/validation/helpers";
import {
  getCloudflaredTunnelStatus,
  startCloudflaredTunnel,
  stopCloudflaredTunnel,
} from "@/lib/cloudflaredTunnel";
import { toPublicSafeTunnelError } from "@/lib/api/publicSafeTunnelError";

export const dynamic = "force-dynamic";

const actionSchema = z.object({
  action: z.enum(["enable", "disable"]),
});

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return unauthorized();
  }

  try {
    // GET is exempt from the LOCAL_ONLY gate so a remote dashboard can poll it, but the
    // binary PATH lookup spawns `which`: only loopback/LAN callers run it
    // (GHSA-35fw-cv32-2373 class, GHSA-jmq6-8j86-8xqj call-site gate).
    const status = await getCloudflaredTunnelStatus({
      allowLocalProbe: getRequestPeerLocality(request) !== "remote",
    });
    return NextResponse.json(status);
  } catch (error) {
    return NextResponse.json(
      toPublicSafeTunnelError(
        error,
        "Failed to load the cloudflared tunnel status.",
        "tunnels/cloudflared GET"
      ),
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return unauthorized();
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validation = validateBody(actionSchema, rawBody);
  if (isValidationFailure(validation)) {
    // validateBody() returns { success, error } — it has no `response` field, so
    // the previous `return validation.response` returned undefined and Next
    // answered with a framework 500 instead of this 400.
    return NextResponse.json({ error: formatValidationMessage(validation.error) }, { status: 400 });
  }

  const parsed = validation.data;

  try {
    const status =
      parsed.action === "enable" ? await startCloudflaredTunnel() : await stopCloudflaredTunnel();

    return NextResponse.json({
      success: true,
      action: parsed.action,
      status,
    });
  } catch (error) {
    return NextResponse.json(
      toPublicSafeTunnelError(
        error,
        "Failed to update the cloudflared tunnel.",
        "tunnels/cloudflared POST"
      ),
      { status: 500 }
    );
  }
}

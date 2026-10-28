import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { revokeRegisteredKey } from "@/lib/db/registeredKeys";

/**
 * POST /api/v1/registered-keys/[id]/revoke
 *
 * Explicit revoke endpoint (supports clients that cannot issue DELETE requests).
 * Management-only like /api/keys — see ../../route.ts for why the guard is explicit here.
 */
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const resolvedParams = await params;
  const revoked = revokeRegisteredKey(resolvedParams.id);
  if (!revoked) {
    return NextResponse.json({ error: "Key not found or already revoked" }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    id: resolvedParams.id,
    revokedAt: new Date().toISOString(),
  });
}

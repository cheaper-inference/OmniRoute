/**
 * POST /api/jobs/:id/enable
 *
 * Enable a disabled job and (re)start its timer. LOCAL_ONLY.
 */
import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";
import { getJobRegistry } from "@/lib/jobRegistry";

export const dynamic = "force-dynamic";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const registry = getJobRegistry();
    if (!registry.listJobs().some((j) => j.id === id)) {
      return NextResponse.json(buildErrorBody(404, "Job not found"), { status: 404 });
    }
    registry.setEnabled(id, true);
    return NextResponse.json({ data: { id, enabled: true } });
  } catch (err) {
    console.error("[API] POST /api/jobs/:id/enable error:", err);
    return NextResponse.json(buildErrorBody(500, "Failed to enable job"), { status: 500 });
  }
}

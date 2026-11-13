import { NextResponse } from "next/server";

import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { isPrometheusMetricsEnabled, renderMetrics } from "@/lib/metrics/prometheus";

export const dynamic = "force-dynamic";

/**
 * GET /api/metrics — Prometheus scrape endpoint (OMNIROUTE_PROMETHEUS_METRICS, default off).
 * Off: 404, as if the route did not exist. On: management principal only (scrape with an
 * API key that has the manage scope).
 */
export async function GET(request: Request) {
  if (!isPrometheusMetricsEnabled()) return new NextResponse("Not found", { status: 404 });
  const authError = await requireManagementAuth(request, { alwaysRequireAuth: true });
  if (authError) return authError;
  return new NextResponse(renderMetrics(), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; version=0.0.4; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

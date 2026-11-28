/**
 * Read or update the local Radar sync opt-in. The feature flag is checked
 * before authentication, and only authenticated callers can change settings.
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { setRadarOptIn, getRadarSettings } from "@/lib/db/radar";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SettingsBodySchema = z.object({ optIn: z.boolean() });

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function GET(request: Request) {
  // Flag gate — MUST run before auth (byte-identical flag-off inertia).
  if (!isFeatureFlagEnabled("RADAR_ENABLED")) {
    return NextResponse.json(buildErrorBody(404, "Not found"), {
      status: 404,
      headers: { ...CORS_HEADERS, "Cache-Control": "no-store" },
    });
  }

  if (!(await isAuthenticated(request))) {
    return NextResponse.json(buildErrorBody(401, "Unauthorized"), {
      status: 401,
      headers: CORS_HEADERS,
    });
  }

  try {
    const settings = getRadarSettings();
    return NextResponse.json(
      { optIn: settings.optIn },
      { headers: { ...CORS_HEADERS, "Cache-Control": "no-store" } }
    );
  } catch (err: unknown) {
    const { sanitizeErrorMessage } = await import("@omniroute/open-sse/utils/error");
    return NextResponse.json(
      buildErrorBody(500, sanitizeErrorMessage(err) || "Failed to load Radar settings"),
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

export async function POST(request: Request) {
  // Flag gate — MUST run before auth (byte-identical flag-off inertia).
  if (!isFeatureFlagEnabled("RADAR_ENABLED")) {
    return NextResponse.json(buildErrorBody(404, "Not found"), {
      status: 404,
      headers: CORS_HEADERS,
    });
  }

  if (!(await isAuthenticated(request))) {
    return NextResponse.json(buildErrorBody(401, "Unauthorized"), {
      status: 401,
      headers: CORS_HEADERS,
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(buildErrorBody(400, "Invalid JSON body"), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  const parsed = SettingsBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      buildErrorBody(400, "Invalid request body", parsed.error.flatten().fieldErrors),
      { status: 400, headers: CORS_HEADERS }
    );
  }

  const { optIn } = parsed.data;
  try {
    setRadarOptIn(optIn);
    if (optIn) {
      // Arm the daily sync only after consent. Manual sync still works if
      // the scheduler cannot start.
      try {
        const { ensureRadarSyncScheduler } = await import("@/lib/radar/scheduler");
        ensureRadarSyncScheduler();
      } catch {
        // Starting the scheduler is best-effort.
      }
    }

    return NextResponse.json({ ok: true, optIn }, { headers: CORS_HEADERS });
  } catch (err: unknown) {
    const { sanitizeErrorMessage } = await import("@omniroute/open-sse/utils/error");
    return NextResponse.json(
      buildErrorBody(500, sanitizeErrorMessage(err) || "Failed to update Radar settings"),
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

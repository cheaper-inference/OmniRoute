import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { installMarketplacePlugin } from "@/lib/plugins/marketplace";
import { MarketplaceIntegrityError } from "@/lib/plugins/marketplaceIntegrity";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

const InstallBodySchema = z.object({
  name: z.string().trim().min(1),
  // Required by the signed install mode (PLUGIN_MARKETPLACE_INTEGRITY_ENABLED); ignored otherwise.
  version: z.string().trim().min(1).max(64).optional(),
});

export async function OPTIONS() {
  return handleCorsOptions();
}

/**
 * POST /api/plugins/marketplace/install — Install a plugin from marketplace by name
 * (and version, which the signed install mode requires).
 * Installing (and possibly activating) downloaded code is never anonymous, so the
 * management credential is required even when login is disabled, as for POST /api/plugins.
 */
export async function POST(request: NextRequest) {
  const authError = await requireManagementAuth(request, { alwaysRequireAuth: true });
  if (authError) return authError;
  try {
    const parsed = InstallBodySchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(buildErrorBody(400, "Missing or invalid 'name' field"), {
        status: 400,
        headers: CORS_HEADERS,
      });
    }
    const result = await installMarketplacePlugin(parsed.data);
    return NextResponse.json(result, { status: 201, headers: CORS_HEADERS });
  } catch (err: unknown) {
    if (err instanceof MarketplaceIntegrityError) {
      // Fixed, client-safe text and status chosen by the verification step itself.
      console.error("[plugins/marketplace] Install refused:", err.code);
      return NextResponse.json(
        buildErrorBody(err.status, err.message, undefined, { reason: err.code }),
        { status: err.status, headers: CORS_HEADERS }
      );
    }
    const msg = err instanceof Error ? err.message : "Failed to install marketplace plugin";
    console.error("[plugins/marketplace] Install error:", msg);
    return NextResponse.json(buildErrorBody(400, msg), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }
}

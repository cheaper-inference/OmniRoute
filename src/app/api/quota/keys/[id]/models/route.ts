/**
 * GET /api/quota/keys/[id]/models
 *
 * Returns the `qtSd/` virtual model IDs that a given API key would see in
 * /v1/models, through the shared listQuotaKeyModels helper
 * (src/lib/quota/quotaKeyModels.ts), which reuses the catalog.ts approach.
 *
 * Auth: requireManagementAuth (management-gated, not quota-key-gated).
 * Error sanitization: buildErrorBody (Hard Rule #12).
 * NOT LOCAL_ONLY — does not spawn processes.
 *
 * Part of: Task 2 — quota-share-v2 plan (2026-06-01).
 */

import { NextResponse } from "next/server";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getApiKeyById } from "@/lib/db/apiKeys";
import { listQuotaKeyModels } from "@/lib/quota/quotaKeyModels";

export const dynamic = "force-dynamic";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: RouteParams): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;

    const key = await getApiKeyById(id);
    if (!key) {
      return NextResponse.json(buildErrorBody(404, "API key not found"), { status: 404 });
    }

    const allowedQuotas: string[] = Array.isArray((key as Record<string, unknown>).allowedQuotas)
      ? ((key as Record<string, unknown>).allowedQuotas as string[])
      : [];

    const models = await listQuotaKeyModels(allowedQuotas);

    return NextResponse.json({ models });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to resolve key models";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}

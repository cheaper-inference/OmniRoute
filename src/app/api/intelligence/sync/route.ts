/**
 * API Route: /api/intelligence/sync
 *
 * POST — Trigger a manual intelligence sync (Arena ELO and/or models_dev_tier rebuild).
 * GET  — Get current intelligence sync status + per-source health.
 * DELETE — Clear all synced arena_elo intelligence data.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { intelligenceSyncRequestSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import {
  buildModelsDevTierEntries,
  getIntelligenceSourcesHealth,
  rebuildModelsDevTierIntelligence,
} from "@/lib/db/modelIntelligence";

async function runArenaSync(dryRun: boolean) {
  const { syncArenaElo } = await import("@/lib/arenaEloSync");
  return syncArenaElo(dryRun);
}

interface IntelligenceSyncOptions {
  dryRun?: boolean;
  rebuildTier?: boolean;
  syncArenaElo?: boolean;
}

/**
 * Run the requested intelligence sources.
 *
 * Back-compat: a body without an explicit source flag (including the historical
 * `{}` and `{ dryRun }`) is an Arena ELO sync, exactly as before this route
 * learned about `rebuildTier`. Arena keeps its historical top-level response
 * shape (and its 502 on failure); `tier` is additive.
 */
async function runIntelligenceSync(
  options: IntelligenceSyncOptions
): Promise<{ body: Record<string, unknown>; status: number }> {
  const { dryRun = false, rebuildTier = false, syncArenaElo = false } = options;

  const arenaResult = syncArenaElo || !rebuildTier ? await runArenaSync(dryRun) : null;

  let tier: { upserted: number; pruned: number } | null = null;
  if (rebuildTier) {
    // dryRun previews the rows a rebuild would write and touches nothing.
    const rebuilt = dryRun
      ? { upserted: buildModelsDevTierEntries().length, pruned: 0 }
      : rebuildModelsDevTierIntelligence();
    tier = { upserted: rebuilt.upserted, pruned: rebuilt.pruned };
  }

  const body: Record<string, unknown> = arenaResult ? { ...arenaResult } : { success: true };
  if (tier) body.tier = tier;
  return { body, status: arenaResult && !arenaResult.success ? 502 : 200 };
}

export async function POST(request: NextRequest) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  try {
    const validation = validateBody(intelligenceSyncRequestSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { body, status } = await runIntelligenceSync(validation.data);
    return NextResponse.json(body, { status });
  } catch (err) {
    return NextResponse.json({ error: sanitizeErrorMessage(err) }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { getArenaEloSyncStatus } = await import("@/lib/arenaEloSync");
    const status = getArenaEloSyncStatus();
    const sourcesDetail = getIntelligenceSourcesHealth();

    return NextResponse.json({
      ...status,
      sourcesDetail,
    });
  } catch (err) {
    return NextResponse.json({ error: sanitizeErrorMessage(err) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { clearSyncedIntelligence } = await import("@/lib/arenaEloSync");
    clearSyncedIntelligence();
    return NextResponse.json({ success: true, message: "Synced intelligence data cleared" });
  } catch (err) {
    return NextResponse.json({ error: sanitizeErrorMessage(err) }, { status: 500 });
  }
}

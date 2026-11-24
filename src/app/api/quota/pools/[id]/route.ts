/**
 * GET    /api/quota/pools/[id]  — get a single quota pool
 * PATCH  /api/quota/pools/[id]  — update pool name/allocations
 * DELETE /api/quota/pools/[id]  — delete pool
 *
 * Auth: requireManagementAuth
 * Zod:  PoolUpdateSchema from @/shared/schemas/quota (PATCH only)
 * Audit: quota.pool.updated / quota.pool.deleted (B26)
 * Sanitization: all error responses via buildErrorBody (Hard Rule #12, B25)
 *
 * Part of: Group B — REST routes for Quota Sharing (plan 22, frente F8).
 */

import { NextResponse } from "next/server";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { PoolUpdateSchema } from "@/shared/schemas/quota";
import { getPool, updatePool, deletePool } from "@/lib/db/quotaPools";
import { setPoolMemberBreakdown, withMemberBreakdown } from "@/lib/db/quotaMemberBreakdown";
import { logAuditEvent, getAuditRequestContext } from "@/lib/compliance/index";
import { reconcilePoolExclusivity } from "@/lib/quota/quotaKey";

export const dynamic = "force-dynamic";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: RouteParams): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const pool = getPool(id);
    if (!pool) {
      return NextResponse.json(buildErrorBody(404, "Pool not found"), { status: 404 });
    }
    return NextResponse.json({ pool: withMemberBreakdown([pool])[0] });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to get pool";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}

/**
 * The audit metadata of an update. The wizard always sends `borrowMode`, so the stored mode is
 * added as `previousBorrowMode` when the request changes it, and only then. Read before the write.
 */
function updateAuditMetadata<T extends { borrowMode?: string }>(
  id: string,
  data: T
): T & { previousBorrowMode?: string } {
  if (data.borrowMode === undefined) return data;
  const previous = getPool(id)?.borrowMode;
  return previous !== undefined && previous !== data.borrowMode
    ? { ...data, previousBorrowMode: previous }
    : data;
}

export async function PATCH(request: Request, { params }: RouteParams): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await request.json().catch(() => null);
    const parsed = PoolUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(buildErrorBody(400, parsed.error.message), { status: 400 });
    }
    const exclusivePresent = body !== null && typeof body === "object" && "exclusive" in body;

    // Combos must be reconciled when the pool's group OR connection set changes,
    // since the qtSd/ combo name embeds <groupSlug>/<provider>. Each provider in a
    // group is served by at most one pool, so removing this pool's CURRENT (old)
    // group+provider combos BEFORE the update — then re-syncing AFTER — cleanly
    // drops stale combos and mints the new ones, using the existing per-pool
    // helpers. Without the pre-update removal, a group/provider switch would leave
    // orphan qtSd/ combos a quota key still sees. Guarded + non-fatal.
    const combosNeedResync =
      body !== null && typeof body === "object" && ("connectionIds" in body || "groupId" in body);
    if (combosNeedResync) {
      try {
        const { removeQuotaCombosForPool } = await import("@/lib/quota/quotaCombos");
        await removeQuotaCombosForPool(id); // pool still has its OLD group/provider here
      } catch {
        // Guard: combo cleanup failure must never break pool update.
      }
    }

    // The previous mode and the previous keys are read with no await before the synchronous
    // write, so no other request can change the pool in between.
    const auditMetadata = updateAuditMetadata(id, parsed.data);
    // Keys allocated before the update, to know which keys are leaving.
    // Only needed when `exclusive` is explicitly present in the request body.
    const prevApiKeyIds: string[] = exclusivePresent
      ? (getPool(id)?.allocations ?? []).map((alloc) => alloc.apiKeyId)
      : [];
    const pool = updatePool(id, parsed.data);
    if (!pool) {
      return NextResponse.json(buildErrorBody(404, "Pool not found"), { status: 404 });
    }
    if (parsed.data.memberBreakdown !== undefined) {
      setPoolMemberBreakdown(id, parsed.data.memberBreakdown);
    }

    if (combosNeedResync) {
      try {
        const { syncQuotaCombos } = await import("@/lib/quota/quotaCombos");
        await syncQuotaCombos(id); // pool now has its NEW group/provider
      } catch {
        // Guard: combo-sync failure must never break pool update callers.
      }
    }

    // Reconcile allowedQuotas on API keys when exclusive flag is explicitly set.
    if (exclusivePresent) {
      const nextApiKeyIds = (parsed.data.allocations ?? []).map((a) => a.apiKeyId);
      await reconcilePoolExclusivity(
        id,
        prevApiKeyIds,
        nextApiKeyIds,
        parsed.data.exclusive ?? false
      );
    }

    const ctx = getAuditRequestContext(request);
    logAuditEvent({
      action: "quota.pool.updated",
      target: id,
      metadata: auditMetadata,
      ipAddress: ctx.ipAddress ?? undefined,
      requestId: ctx.requestId,
    });

    return NextResponse.json({ pool: withMemberBreakdown([pool])[0] });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update pool";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const existed = await deletePool(id);
    if (!existed) {
      return NextResponse.json(buildErrorBody(404, "Pool not found"), { status: 404 });
    }

    const ctx = getAuditRequestContext(request);
    logAuditEvent({
      action: "quota.pool.deleted",
      target: id,
      ipAddress: ctx.ipAddress ?? undefined,
      requestId: ctx.requestId,
    });

    return new Response(null, { status: 204 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to delete pool";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}

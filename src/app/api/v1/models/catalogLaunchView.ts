/**
 * Launch view engine for `/v1/models` (architecture 3.2, 3.3 steps 4-5).
 *
 * A launch session with a server view (`PATCH /api/launch/sessions/:id {view}`) sees
 * `intersect(authorizedCatalog, view.ids)` in view order. The launcher already ran the shared
 * selector (`src/shared/launch/viewSelect.ts`) over the catalog this same token was served, so
 * the gateway does not re-filter: it can only DROP ids (a model gone mid-session), never add
 * one, and never one the parent key could not already see (this runs after the key filter).
 *
 * Inert without an `olx_` bearer that carries a view: every function returns its input / an
 * empty suffix, so no other client's catalog or cache key changes.
 */

import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { resolveLaunchSessionToken, type LaunchSessionView } from "@/lib/db/launchSessions";
import { isLoopbackRequest } from "@/shared/utils/apiAuth";
import { extractApiKey } from "@/sse/services/auth";

type CatalogRow = Record<string, any>;

export type CatalogLaunchView = Pick<LaunchSessionView, "hash" | "ids">;

export function isCatalogLaunchView(view: unknown): view is CatalogLaunchView {
  return (
    Boolean(view) &&
    typeof (view as CatalogLaunchView).hash === "string" &&
    Array.isArray((view as CatalogLaunchView).ids)
  );
}

/**
 * Rows whose id is in the view, in view order. Rows sharing one id (the audio
 * transcription/speech pair) stay together in their catalog order. Ids absent from the
 * catalog are skipped, so the result is always a subset of `models`.
 */
export function applyLaunchView<T extends CatalogRow>(
  models: T[],
  view: CatalogLaunchView | null | undefined
): T[] {
  if (!isCatalogLaunchView(view)) return models;
  const byId = new Map<string, T[]>();
  for (const model of models) {
    if (typeof model?.id !== "string") continue;
    const rows = byId.get(model.id);
    if (rows) rows.push(model);
    else byId.set(model.id, [model]);
  }
  const out: T[] = [];
  const emitted = new Set<string>();
  for (const id of view.ids) {
    if (typeof id !== "string" || emitted.has(id)) continue;
    emitted.add(id);
    const rows = byId.get(id);
    if (rows) out.push(...rows);
  }
  return out;
}

/** The view carried by resolved key metadata (`getApiKeyMetadata` of an `olx_` bearer). */
export function launchViewFromKeyMetadata(
  metadata: { launchSession?: { view?: unknown } | null } | null | undefined
): CatalogLaunchView | null {
  const view = metadata?.launchSession?.view;
  return isCatalogLaunchView(view) ? view : null;
}

/**
 * Catalog cache key suffix `|view=<hash>` for an `olx_` bearer whose session has a view, else
 * "". The token already separates sessions in the key; the hash separates a re-PATCHed view.
 * Synchronous on purpose (the cache key builder is sync); reads one row by primary key.
 */
export function launchViewCacheKeySuffix(apiKey: string | null | undefined): string {
  if (typeof apiKey !== "string" || !apiKey.startsWith("olx_")) return "";
  try {
    const view = resolveLaunchSessionToken(apiKey)?.view;
    return isCatalogLaunchView(view) ? `|view=${view.hash}` : "";
  } catch {
    return "";
  }
}

/**
 * An anonymous launch session (no parent key) stands in for an anonymous LOOPBACK caller, so a
 * leaked token must not open the catalog to a remote peer. 401 for that case, null otherwise
 * (every non-`olx_` request returns null without a lookup).
 */
export function launchAnonymousRemoteRejection(
  request: Request,
  headers: Record<string, string>
): Response | null {
  const apiKey = extractApiKey(request);
  if (typeof apiKey !== "string" || !apiKey.startsWith("olx_")) return null;
  const session = resolveLaunchSessionToken(apiKey);
  if (!session || session.parentKeyId !== null || isLoopbackRequest(request)) return null;
  return Response.json(
    buildErrorBody(401, "Authentication required", undefined, { code: "invalid_api_key" }),
    { status: 401, headers }
  );
}

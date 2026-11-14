/**
 * Launch view engine for `/v1/models`.
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
import { opaqueTokenFingerprint } from "@omniroute/open-sse/utils/opaqueTokenFingerprint.ts";
import {
  resolveLaunchSessionToken,
  type LaunchSessionRecord,
  type LaunchSessionView,
} from "@/lib/db/launchSessions";
import { isLoopbackRequest } from "@/shared/utils/apiAuth";
import { extractApiKey } from "@/sse/services/auth";

type CatalogRow = Record<string, any>;

export type CatalogLaunchView = Pick<LaunchSessionView, "hash" | "ids" | "serve">;

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

/**
 * True when the view asks for the codex catalog envelope (`serve.shape: "codex"`): the same
 * `{object,data,models:[]}` body a header-detected codex client gets today, for the view rows.
 * Absent or "openai" keeps the byte-identical `{object,data}` payload.
 */
export function isCodexShapedLaunchView(view: CatalogLaunchView | null | undefined): boolean {
  return isCatalogLaunchView(view) && view.serve?.shape === "codex";
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
 * A codex-shaped view appends `|shape=codex`, so an openai and a codex view over the same rows
 * (same hash) never share an entry; an openai view keeps the original suffix.
 * Synchronous on purpose (the cache key builder is sync); reads one row by primary key.
 */
export function launchViewCacheKeySuffix(apiKey: string | null | undefined): string {
  if (typeof apiKey !== "string" || !apiKey.startsWith("olx_")) return "";
  try {
    return viewSuffix(resolveLaunchSessionToken(apiKey)?.view);
  } catch {
    return "";
  }
}

function viewSuffix(view: unknown): string {
  if (!isCatalogLaunchView(view)) return "";
  return isCodexShapedLaunchView(view) ? `|view=${view.hash}|shape=codex` : `|view=${view.hash}`;
}

// One session read per Request: the auth gate, the anonymous-remote gate and the cache key all
// ask about the same bearer. Keyed by the Request object, so the memo dies with the request
// and a revoke is seen by the next one (nothing outlives it).
const sessionByRequest = new WeakMap<Request, LaunchSessionRecord | null>();

/** The active session behind the request's `olx_` bearer (memoized per Request), else null. */
export function launchSessionForRequest(
  request: Request,
  options: { fresh?: boolean } = {}
): LaunchSessionRecord | null {
  if (!options.fresh && sessionByRequest.has(request)) {
    return sessionByRequest.get(request) ?? null;
  }
  const apiKey = extractApiKey(request);
  let session: LaunchSessionRecord | null = null;
  if (typeof apiKey === "string" && apiKey.startsWith("olx_")) {
    try {
      session = resolveLaunchSessionToken(apiKey);
    } catch {
      session = null;
    }
  }
  sessionByRequest.set(request, session);
  return session;
}

/** Credential identity of an anonymous launch session (no parent key) in the catalog cache. */
export const LAUNCH_ANONYMOUS_CATALOG_IDENTITY = "launch-anonymous";

/**
 * Catalog cache identity of an `olx_` bearer, or null for every other credential.
 *
 * A session sees exactly its parent's catalog (its metadata is the parent's, minus management
 * scopes the catalog never reads), narrowed by its view. So the cache keys the build on the
 * PARENT: `credential` is the parent credential's fingerprint stored at mint, which is the
 * same `opaqueTokenFingerprint` the caller computes for the parent key itself, so every session
 * of a parent and the parent key share one view-less build. `viewSuffix` separates a session
 * with a view (`|view=<hash>`, plus `|shape=codex`). An unknown, revoked or expired token gets
 * its own fingerprint (never a parent's entry, `shared: false`); the auth gate rejects it
 * before the cache. `fresh` re-reads the session row instead of the per-request memo.
 */
export function launchCatalogCacheIdentity(
  request: Request,
  options: { fresh?: boolean } = {}
): LaunchCatalogCacheIdentity | null {
  const apiKey = extractApiKey(request);
  if (typeof apiKey !== "string" || !apiKey.startsWith("olx_")) return null;
  const session = launchSessionForRequest(request, options);
  if (!session) {
    return { credential: opaqueTokenFingerprint(apiKey), viewSuffix: "", shared: false };
  }
  const credential =
    session.parentKeyId === null
      ? LAUNCH_ANONYMOUS_CATALOG_IDENTITY
      : session.parentCredentialHash || opaqueTokenFingerprint(apiKey);
  return { credential, viewSuffix: viewSuffix(session.view), shared: true };
}

export interface LaunchCatalogCacheIdentity {
  /** Fingerprint the cache key's credential dimension is derived from. */
  credential: string;
  /** `|view=<hash>[|shape=codex]`, or "" without a view. */
  viewSuffix: string;
  /** True when the entry is shared with the parent (an active session resolved). */
  shared: boolean;
}

/**
 * Thrown when a build keyed on a parent's entry finished after its session was revoked,
 * expired or re-viewed. Such a build may have run with no session metadata (an unfiltered
 * catalog), so it must neither be cached under the parent's key nor handed to joiners.
 */
export class LaunchSessionChangedError extends Error {
  constructor() {
    super("launch session changed during the catalog build");
    this.name = "LaunchSessionChangedError";
  }
}

/**
 * Wraps a catalog builder for a shared launch entry: after the build, the session is read
 * again (no memo); if it is no longer the identity the cache key was built from, the build is
 * refused with LaunchSessionChangedError instead of being stored. Revocation is monotonic, so
 * a session still active after the build was active for the whole build.
 */
export function guardLaunchCatalogBuild<T>(
  build: (request: Request) => Promise<T>,
  identity: LaunchCatalogCacheIdentity | null
): (request: Request) => Promise<T> {
  if (!identity?.shared) return build;
  return async (request) => {
    const result = await build(request);
    const now = launchCatalogCacheIdentity(request, { fresh: true });
    if (
      !now?.shared ||
      now.credential !== identity.credential ||
      now.viewSuffix !== identity.viewSuffix
    ) {
      sessionByRequest.delete(request);
      throw new LaunchSessionChangedError();
    }
    return result;
  };
}

/** Drops the per-request session memo (a retry after LaunchSessionChangedError re-reads it). */
export function forgetLaunchSessionForRequest(request: Request): void {
  sessionByRequest.delete(request);
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
  const session = launchSessionForRequest(request);
  if (!session || session.parentKeyId !== null || isLoopbackRequest(request)) return null;
  return Response.json(
    buildErrorBody(401, "Authentication required", undefined, { code: "invalid_api_key" }),
    { status: 401, headers }
  );
}

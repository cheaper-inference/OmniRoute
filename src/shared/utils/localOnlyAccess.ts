import type { LocalOnlyAccessSnapshot } from "@/shared/constants/localOnlyFeatures";

/**
 * Client side of "this feature only works on the local machine".
 *
 * The route guard rejects a local-only route for a remote caller with 403 and the body
 * `{ error: { code: "LOCAL_ONLY", … } }` (src/server/authz/policies/management.ts →
 * pipeline.ts `rejectionResponse`). This module is the one place that recognises that
 * rejection and remembers it for the session, so the dashboard stops asking.
 */

const LOCAL_ONLY_ERROR_CODE = "LOCAL_ONLY";

/** True for the parsed body of the guard's local-only rejection. */
export function isLocalOnlyErrorBody(status: number, body: unknown): boolean {
  if (status !== 403 || !body || typeof body !== "object") return false;
  const error = (body as { error?: unknown }).error;
  return (
    !!error &&
    typeof error === "object" &&
    (error as { code?: unknown }).code === LOCAL_ONLY_ERROR_CODE
  );
}

/** True when `res` is the guard's local-only rejection. The caller can still read the body. */
export async function isLocalOnlyResponse(res: Response): Promise<boolean> {
  if (res.status !== 403) return false;
  try {
    const readable = typeof res.clone === "function" ? res.clone() : res;
    return isLocalOnlyErrorBody(res.status, await readable.json());
  } catch {
    return false;
  }
}

const rejectedPaths = new Set<string>();
const listeners = new Set<() => void>();
let rejectionVersion = 0;

/** Record that the guard rejected `path` as local-only in this session. */
export function reportLocalOnlyRejection(path: string): void {
  if (rejectedPaths.has(path)) return;
  rejectedPaths.add(path);
  rejectionVersion += 1;
  for (const listener of listeners) listener();
}

/** `isLocalOnlyResponse` + `reportLocalOnlyRejection`: the usual call after a fetch. */
export async function detectLocalOnlyRejection(res: Response, path: string): Promise<boolean> {
  if (!(await isLocalOnlyResponse(res))) return false;
  reportLocalOnlyRejection(path);
  return true;
}

export function subscribeLocalOnlyRejections(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Changes whenever a new path is rejected (the `useSyncExternalStore` snapshot). */
export function getLocalOnlyRejectionVersion(): number {
  return rejectionVersion;
}

/**
 * Should the dashboard skip `path` and show the local-only notice?
 *   - the guard already rejected this very path, or
 *   - the session is known not to be local (the server said so, or any local-only request
 *     was rejected) and the server listed the path as blocked for such a session.
 */
export function isLocalOnlyPathBlocked(access: LocalOnlyAccessSnapshot, path: string): boolean {
  if (rejectedPaths.has(path)) return true;
  const notLocal = access.locality === "remote" || rejectedPaths.size > 0;
  return notLocal && access.remoteBlockedPaths.includes(path);
}

export function __resetLocalOnlyRejectionsForTests(): void {
  rejectedPaths.clear();
  rejectionVersion = 0;
  for (const listener of listeners) listener();
}

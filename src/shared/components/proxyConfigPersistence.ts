import {
  type ProxyAssignmentItem,
  normalizeScopeId,
  selectScopeAssignment,
} from "./proxyAssignment";

type ProxyRegistryLookup = { id: string; source?: string | null; notes?: string | null };

/** Parse a response body, substituting an empty object when JSON decoding fails. */
export async function readJson(response: Response) {
  return response.json().catch(() => ({}));
}

/** Fetch the matching normalized scope assignment; an unsuccessful response returns null. */
export async function fetchAssignmentForScope(scope: string, scopeId: string | null) {
  const params = new URLSearchParams({ scope });
  if (scopeId) params.set("scopeId", scopeId);

  const res = await fetch(`/api/settings/proxies/assignments?${params}`);
  if (!res.ok) return null;

  const payload = await readJson(res);
  const items: ProxyAssignmentItem[] = Array.isArray(payload?.items) ? payload.items : [];
  return selectScopeAssignment(items, scope, scopeId);
}

/** Prefer a cached registry row, otherwise fetch it by ID; unsuccessful responses return null. */
export async function fetchRegistryProxy(proxyId: string, cachedProxies: ProxyRegistryLookup[]) {
  const cached = cachedProxies.find((proxy) => proxy.id === proxyId);
  if (cached) return cached;

  const res = await fetch(`/api/settings/proxies?id=${encodeURIComponent(proxyId)}`);
  if (!res.ok) return null;
  return (await readJson(res)) as ProxyRegistryLookup;
}

/** Fetch assignments and deduplicate scope/normalized-ID pairs; unsuccessful responses return []. */
export async function fetchProxyUsage(proxyId: string) {
  const res = await fetch(`/api/settings/proxies?id=${encodeURIComponent(proxyId)}&whereUsed=1`);
  if (!res.ok) return [];

  const payload = await readJson(res);
  const assignments: ProxyAssignmentItem[] = Array.isArray(payload?.assignments)
    ? payload.assignments
    : [];
  const seen = new Set<string>();
  return assignments.filter((assignment) => {
    const key = `${assignment.scope || ""}:${normalizeScopeId(assignment.scopeId) || ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/** Recognize the registry secret placeholder so it is not saved as a literal credential. */
export function isRedactedSecret(value?: string | null) {
  return value === "***";
}

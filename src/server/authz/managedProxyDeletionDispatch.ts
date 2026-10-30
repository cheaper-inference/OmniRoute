import type { NextRequest } from "next/server";

import { AUTHZ_HEADER_PEER_LOCALITY, AUTHZ_HEADER_PROXY_DELETE_ORIGIN } from "./headers";

export const MANAGED_PROXY_DELETE_PATH = "/api/services/managed-proxy/registry-delete";

export function isProxyDeletionOrigin(pathname: string, method: string): boolean {
  return (
    (method === "DELETE" &&
      ["/api/settings/proxies", "/api/v1/management/proxies"].includes(pathname)) ||
    (method === "POST" && pathname === "/api/settings/proxies/batch-delete")
  );
}

/** Called only after the original enforced policy and browser-origin checks succeed. */
export function managedProxyDeletionDestination(
  request: NextRequest,
  normalizedPath: string,
  headers: Headers
): URL | null {
  if (
    headers.get(AUTHZ_HEADER_PEER_LOCALITY) !== "loopback" ||
    !isProxyDeletionOrigin(normalizedPath, request.method)
  )
    return null;

  headers.set(AUTHZ_HEADER_PROXY_DELETE_ORIGIN, normalizedPath);
  const destination = new URL(request.url);
  destination.pathname = `${request.nextUrl.basePath}${MANAGED_PROXY_DELETE_PATH}`;
  return destination;
}

/** Auth checks use the original allowlisted URL, without consuming the deletion body. */
export function proxyDeletionAuthRequest(request: Request): Request | null {
  const origin = request.headers.get(AUTHZ_HEADER_PROXY_DELETE_ORIGIN);
  if (!origin || !isProxyDeletionOrigin(origin, request.method)) return null;
  const url = new URL(request.url);
  url.pathname = origin;
  return new Request(url, {
    method: request.method,
    headers: request.headers,
    signal: request.signal,
  });
}

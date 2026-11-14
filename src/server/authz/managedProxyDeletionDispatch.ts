import type { NextRequest } from "next/server";

import { AUTHZ_HEADER_PEER_LOCALITY, AUTHZ_HEADER_PROXY_DELETE_ORIGIN } from "./headers";

export const MANAGED_PROXY_DELETE_PATH = "/api/services/managed-proxy/registry-delete";

/** Match only the method/path pairs eligible for local managed-proxy deletion dispatch. */
export function isProxyDeletionOrigin(pathname: string, method: string): boolean {
  return (
    (method === "DELETE" &&
      ["/api/settings/proxies", "/api/v1/management/proxies"].includes(pathname)) ||
    (method === "POST" && pathname === "/api/settings/proxies/batch-delete")
  );
}

/**
 * Build a local deletion rewrite and stamp its original allowlisted path in forwarded headers.
 * Call only after enforced policy and browser-origin checks; non-loopback requests return null.
 */
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

/**
 * Reconstruct the stamped, allowlisted origin URL for authentication without reading the body.
 * Return null when the original method/path pair is missing or not eligible for deletion.
 */
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

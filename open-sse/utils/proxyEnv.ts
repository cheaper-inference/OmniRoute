/** Environment routing only: no feature flags, server state or DB imports. */
import { normalizeProxyUrl } from "./proxyDispatcher.ts";

/**
 * Linear glob scan for a NO_PROXY host pattern containing `*`. Same matching semantics as
 * the scan proxyFetch used before it moved here — kept byte-for-byte equivalent on purpose.
 */
function matchesGlobHost(hostname: string, patternHost: string): boolean {
  const parts = patternHost.split("*");
  if (!hostname.startsWith(parts[0])) return false;
  let pos = parts[0].length;
  for (let i = 1; i < parts.length; i++) {
    const seg = parts[i];
    if (i === parts.length - 1) {
      return seg === "" || (hostname.endsWith(seg) && hostname.length - seg.length >= pos);
    }
    const idx = seg ? hostname.indexOf(seg, pos) : pos;
    if (idx === -1) return false;
    pos = idx + seg.length;
  }
  return true;
}

function matchesNoProxyPattern(pattern: string, hostname: string, port: string): boolean {
  if (pattern === "*") return true;
  const [patternHost, patternPort] = pattern.split(":");
  if (patternPort && patternPort !== port) return false;
  if (!patternHost) return false;
  if (patternHost.includes("*") && matchesGlobHost(hostname, patternHost)) return true;
  if (patternHost.startsWith(".")) {
    return hostname.endsWith(patternHost) || hostname === patternHost.slice(1);
  }
  return hostname === patternHost || hostname.endsWith(`.${patternHost}`);
}

export function noProxyMatch(targetUrl: string): boolean {
  const noProxy = process.env.NO_PROXY || process.env.no_proxy;
  if (!noProxy) return false;
  let target: URL;
  try {
    target = new URL(targetUrl);
  } catch {
    return false;
  }
  const hostname = target.hostname.toLowerCase();
  const port = target.port || (target.protocol === "https:" ? "443" : "80");
  return noProxy
    .split(",")
    .map((p) => p.trim().toLowerCase())
    .filter(Boolean)
    .some((pattern) => matchesNoProxyPattern(pattern, hostname, port));
}

export function resolveEnvProxyUrl(targetUrl: string): string | null {
  if (noProxyMatch(targetUrl)) return null;
  let protocol: string;
  try {
    protocol = new URL(targetUrl).protocol;
  } catch {
    return null;
  }
  const proxyUrl =
    protocol === "https:"
      ? process.env.HTTPS_PROXY ||
        process.env.https_proxy ||
        process.env.ALL_PROXY ||
        process.env.all_proxy
      : process.env.HTTP_PROXY ||
        process.env.http_proxy ||
        process.env.ALL_PROXY ||
        process.env.all_proxy;
  if (!proxyUrl) return null;
  return normalizeProxyUrl(proxyUrl, "environment proxy");
}

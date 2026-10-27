// #13593: a combo that calls this process's own listener must not take a
// public admission slot. The token lives only in this process.
import { randomBytes, timingSafeEqual } from "node:crypto";

export const SELF_HOP_HEADER = "x-omniroute-self-hop";

// One token per process, never persisted or logged. It lives on globalThis, not in a
// module-level variable: Next bundles open-sse, so the instrumentation bundle (whose
// copy of proxyFetch patches global fetch and stamps the header) and the route bundles
// (whose copy of chatAdmissionIdentity verifies it) each load their own copy of this
// module. A module-level token gave the two sides different values (same split #14740
// fixed for the self-loop secret).
const SELF_HOP_TOKEN_KEY = Symbol.for("omniroute.selfHopToken");
const selfHopStore = globalThis as unknown as Record<symbol, string | undefined>;

export function ownListenerSelfHopToken(): string {
  selfHopStore[SELF_HOP_TOKEN_KEY] ??= randomBytes(32).toString("hex");
  return selfHopStore[SELF_HOP_TOKEN_KEY];
}

export function listenPort(): string {
  return process.env.PORT || process.env.DASHBOARD_PORT || process.env.API_PORT || "20128";
}

export function isOwnListenerUrl(raw: string): boolean {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return false;
  }
  const host = url.hostname.replace(/^\[|\]$/g, "").toLowerCase();
  const loopback = host === "127.0.0.1" || host === "localhost" || host === "::1";
  const port = url.port || (url.protocol === "https:" ? "443" : "80");
  return loopback && port === listenPort();
}

export function isOwnListenerSelfHop(value: string | null | undefined): boolean {
  if (!value) return false;
  const got = Buffer.from(value.trim().toLowerCase());
  const expected = Buffer.from(ownListenerSelfHopToken().toLowerCase());
  if (got.length !== expected.length) return false;
  return timingSafeEqual(got, expected);
}

export function stampOwnListenerSelfHop(
  input: RequestInfo | URL,
  options: { headers?: HeadersInit }
): void {
  const raw =
    typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
  if (!isOwnListenerUrl(raw)) return;
  const headers = new Headers(
    options.headers ??
      (typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined)
  );
  if (!headers.has(SELF_HOP_HEADER)) headers.set(SELF_HOP_HEADER, ownListenerSelfHopToken());
  options.headers = headers;
}

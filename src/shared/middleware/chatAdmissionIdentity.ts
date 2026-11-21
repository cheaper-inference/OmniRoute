import { createHmac, randomBytes } from "crypto";
import { isOwnListenerSelfHop, SELF_HOP_HEADER } from "@omniroute/open-sse/utils/selfHop.ts";
import { getProcessStore, sharedSymbol } from "@/shared/utils/processSingleton";

const FINGERPRINT_KEY = "omniroute-admission-fingerprint-v1";

// Descriptive marker an internal sub-request sends next to the process token. It is
// never trusted on its own: any client can set it.
export const ADMISSION_BYPASS_HEADER = "x-omniroute-admission-bypass";

export function resolveSessionId(request: Request): string {
  const authHeader = request.headers.get("authorization") || "";
  const bearerMatch = /^bearer\s+(\S+)$/i.exec(authHeader.trim());
  if (bearerMatch) return fingerprint(bearerMatch[1]);

  const xApiKey = request.headers.get("x-api-key")?.trim();
  if (xApiKey) return fingerprint(xApiKey);

  const xGoogApiKey = request.headers.get("x-goog-api-key")?.trim();
  return xGoogApiKey ? fingerprint(xGoogApiKey) : "anonymous";
}

// Lazily generated, held in memory only for the lifetime of this process — never
// persisted, never logged. Used ONLY as the last-resort self-loop bearer when the
// operator hasn't set OMNIROUTE_API_KEY/ROUTER_API_KEY (#13679: the previous fallback
// was the checked-in literal "sk_omniroute", a predictable shared secret anyone reading
// the source could forge). Both the in-process caller (audioBridgeHelpers /
// visionBridgeHelpers) and the verifier (API-key validation) read this same value. It
// lives on globalThis because the proxy (Next middleware bundle) and the route handlers
// load separate copies of this module.
const SELF_LOOP_SECRET_KEY = sharedSymbol("selfLoopSecret");
const selfLoopStore = globalThis as unknown as Record<symbol, string | undefined>;

function getGeneratedSelfLoopSecret(): string {
  return getProcessStore("selfLoopSecret", () => randomBytes(32).toString("hex"));
}

/** The generated self-loop secret, or null when none was created yet. Never creates it. */
export function peekGeneratedSelfLoopSecret(): string | null {
  return selfLoopStore[SELF_LOOP_SECRET_KEY] ?? null;
}

export function resolveSelfLoopBearer(): string {
  return (
    process.env.OMNIROUTE_API_KEY?.trim() ||
    process.env.ROUTER_API_KEY?.trim() ||
    getGeneratedSelfLoopSecret()
  );
}

/**
 * True only for a request this process sent to its own listener: our own fetches (#13593)
 * and the internal sub-requests that also send ADMISSION_BYPASS_HEADER (the vision bridge
 * describe call) carry the per-process token, held in memory only. The bypass header and
 * any API key, the deployment env key (OMNIROUTE_API_KEY / ROUTER_API_KEY) included, are
 * things a client can send, so neither vouches for the bypass (same rule as the internal
 * test mark, #19292). The token compare is constant-time (isOwnListenerSelfHop).
 */
export function isInternalAdmissionBypass(request: Request): boolean {
  return isOwnListenerSelfHop(request.headers.get(SELF_HOP_HEADER));
}

function fingerprint(value: string): string {
  // Deterministic admission-lane fingerprint, never password verification.
  return `key_${createHmac("sha256", FINGERPRINT_KEY).update(value).digest("hex").slice(0, 16)}`;
}

import { readResponseTextWithinCap } from "../utils/responseBodyCap.ts";

export function isKimiCoding(provider: unknown): boolean {
  return provider === "kimi-coding" || provider === "kimi-coding-apikey";
}

const providerMessage =
  "You've reached your concurrent request limit. Please wait for your ongoing requests to finish and try again.";
const busyMessage =
  /^(?:too many concurrent requests\.?|you(?:'ve| have) reached your concurrent request limit\.(?: please wait for your ongoing requests to finish and try again\.)?)$/i;

export function isTypedKimiConcurrency(
  provider: unknown,
  status: number,
  message: unknown,
  code: unknown,
  type: unknown
): boolean {
  if (!isKimiCoding(provider) || status !== 403 || typeof message !== "string") return false;
  const identifiers = [code, type];
  return (
    busyMessage.test(message.trim()) &&
    identifiers.includes("concurrency_limit_exceeded") &&
    identifiers.every(
      (value) =>
        value == null || value === "concurrency_limit_exceeded" || value === "rate_limit_error"
    )
  );
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === "object" && !Array.isArray(value);

export function isKimiConcurrencyEnvelope(provider: unknown, body: unknown): boolean {
  if (!isKimiCoding(provider) || !isRecord(body) || !isRecord(body.error)) return false;
  if (
    Object.keys(body).some((key) => {
      if (key === "error" || (key === "type" && body.type === "error")) return false;
      return !(
        key === "request_id" &&
        typeof body.request_id === "string" &&
        /^[a-zA-Z0-9_.-]{1,128}$/.test(body.request_id)
      );
    })
  )
    return false;
  const err = body.error;
  if (Object.keys(err).some((key) => !["code", "type", "message"].includes(key))) return false;
  if (
    err.message === providerMessage &&
    err.code == null &&
    (err.type == null || err.type === "rate_limit_error")
  )
    return true;
  return isTypedKimiConcurrency(provider, 403, err.message, err.code, err.type);
}

// Only locally constructed responses are marked. A matching header value supplied by a peer
// cannot suppress partitioned quota or credential bookkeeping.
const markerKey = Symbol.for("omniroute.kimiCapacityHeaders.v1");
const registry = globalThis as typeof globalThis & { [markerKey]?: WeakSet<Headers> };
const capacityHeaders = (registry[markerKey] ??= new WeakSet<Headers>());
export function isKimiCapacityObservation(headers?: Headers | null): boolean {
  return !!headers && capacityHeaders.has(headers);
}

export function hasKimiAuthDenial(headers: Headers | Record<string, string> | null): boolean {
  if (!headers) return false;
  const challenge =
    headers instanceof Headers
      ? headers.get("www-authenticate")
      : Object.entries(headers).find(([name]) => name.toLowerCase() === "www-authenticate")?.[1];
  return (
    typeof challenge === "string" &&
    /\berror\s*=\s*"?(?:invalid_token|insufficient_scope|invalid_request)\b/i.test(challenge)
  );
}

/** A provider's busy 403 may be reported as retryable to callers without feeding a synthetic 429 into the limiter. */
export async function normalizeKimiConcurrency(
  provider: string,
  response: Response
): Promise<Response> {
  if (
    !isKimiCoding(provider) ||
    response.status !== 403 ||
    !response.body ||
    response.bodyUsed ||
    hasKimiAuthDenial(response.headers)
  )
    return response;
  try {
    const text = await readResponseTextWithinCap(response.clone(), 8192);
    if (!isKimiConcurrencyEnvelope(provider, JSON.parse(text))) return response;
  } catch {
    // Unparseable or oversized errors retain their original status and body.
    return response;
  }
  const headers = new Headers(response.headers);
  if (!headers.has("retry-after")) headers.set("retry-after", "1");
  const normalized = new Response(response.body, { status: 429, headers });
  capacityHeaders.add(normalized.headers);
  return normalized;
}

/**
 * Opt-in cap (CLIENT_RETRY_AFTER_MAX_SECONDS) on the Retry-After header that leaves the gateway.
 * Applied after the handler ran, so the account rest the handler computed from the upstream
 * header keeps its full length; only the client's copy is lowered. Unset or invalid = off.
 * shortcut: the JSON body `retry_after` field is not rewritten; upgrade if clients read it.
 */
function readCapSeconds(): number | null {
  const n = Math.floor(Number(process.env.CLIENT_RETRY_AFTER_MAX_SECONDS));
  return Number.isFinite(n) && n > 0 ? n : null;
}

export function capClientRetryAfter(response: Response): Response {
  const cap = readCapSeconds();
  if (cap === null || response.status < 400) return response;
  const raw = response.headers.get("retry-after")?.trim();
  if (!raw) return response;
  // Retry-After is delay-seconds or an HTTP-date.
  const seconds = /^\d+$/.test(raw)
    ? Number(raw)
    : Math.ceil((Date.parse(raw) - Date.now()) / 1000);
  if (!Number.isFinite(seconds) || seconds <= cap) return response;
  const headers = new Headers(response.headers);
  headers.set("Retry-After", String(cap));
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

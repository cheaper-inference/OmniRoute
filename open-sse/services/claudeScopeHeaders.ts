/**
 * Raw upstream headers of a failed Claude response, for the quota-scope decision only.
 *
 * The client response of a failed request is rebuilt and carries no `anthropic-ratelimit-*`
 * headers, but the combo only sees that response. The raw headers ride on the Response object
 * (a WeakMap, like the other per-Response routing policies). Only the unified rate-limit
 * family is kept. A retry hint (`Retry-After`, `x-ratelimit-reset`) is never copied, so no
 * cooldown can be computed from this channel.
 */
const UNIFIED_PREFIX = "anthropic-ratelimit-unified-";
const scopeHeaders = new WeakMap<Response, Headers>();

export function recordClaudeScopeHeaders(
  response: Response,
  upstream: Headers | null | undefined
): void {
  if (!upstream) return;
  const kept = new Headers();
  upstream.forEach((value, name) => {
    if (name.toLowerCase().startsWith(UNIFIED_PREFIX)) kept.set(name, value);
  });
  if (!kept.keys().next().done) scopeHeaders.set(response, kept);
}

/** `response` is typed loosely: combo callers hold a `{ status, headers }` view of a Response. */
export function readClaudeScopeHeaders(response: object): Headers | undefined {
  return scopeHeaders.get(response as Response);
}

/** A wrapper Response keeps the headers of the Response it replaces. */
export function inheritClaudeScopeHeaders(source: Response, target: Response): Response {
  const kept = scopeHeaders.get(source);
  if (kept) scopeHeaders.set(target, kept);
  return target;
}

/**
 * Upstream-rejection evidence for provider key validation.
 *
 * Individual validators historically bucket `401 || 403` into a canned
 * "Invalid API key". A provider-side *access refusal* (403 from an egress /
 * geo block, 451, an nginx "403 Forbidden" HTML page, "not available in your
 * region") is a different failure: the key may be perfectly valid, but this
 * OmniRoute instance is not allowed to reach the provider. Reporting it as an
 * invalid key sends the operator off rotating keys that are fine.
 *
 * Instead of re-auditing every validator, the shared transport
 * (`fetchWithProxyFallback`) records every upstream response observed during a
 * validation into an AsyncLocalStorage trace. `validateProviderApiKey` runs the
 * validator inside that trace and then:
 *   - refines the verdict from the decisive (last) upstream response
 *     ({@link refineValidationResult}), and
 *   - emits one sanitized log line per validation ({@link buildValidationLogRecord}):
 *     provider, endpoint without query/userinfo, HTTP status, truncated body —
 *     never the key, Authorization header or other secrets.
 */

import { AsyncLocalStorage } from "node:async_hooks";

export type ValidationRejectionKind =
  "auth" | "access_denied" | "forbidden_ambiguous" | "rate_limited" | "unavailable" | "other";

export interface ObservedValidationResponse {
  endpoint: string;
  status: number;
  /** Raw (unsanitized) body excerpt — only for non-2xx responses. */
  body?: string;
}

interface ValidationTrace {
  apiKey: string | null;
  responses: ObservedValidationResponse[];
}

const traceStorage = new AsyncLocalStorage<ValidationTrace>();

/** Bound how much of an error body we ever keep in memory. */
const MAX_CAPTURED_BODY_CHARS = 4096;
/** Bound the trace length (validators issue at most a handful of probes). */
const MAX_TRACE_RESPONSES = 16;
/** Upstream message excerpt surfaced to the operator in the validation error. */
const MAX_SURFACED_MESSAGE_CHARS = 200;
/** Body excerpt written to the log. */
const MAX_LOGGED_BODY_CHARS = 500;

// Mirrors the geo-block wording recognised at request time by
// open-sse/services/errorClassifier.ts (GEO_BLOCK_SIGNALS), plus generic
// region/egress refusals. Kept local so the validation path does not pull the
// request-time classifier (and its registry/DB imports) in.
const GEO_OR_EGRESS_SIGNALS =
  /unsupported[_\s-]*country|unsupported[_\s-]*region|country[,\s\w]*not supported|region[\s\w]*(is\s+)?not supported|location[\s\w]*(is\s+)?not supported|not available in your (country|region|location)|not (yet )?available in (your|this) (country|region)|geo[\s-]*(block|restrict)|sanction|embargo|restricted (country|region|territor)/i;

// Wording that identifies a genuine credential rejection carried by a 403.
const AUTH_REJECTION_SIGNALS =
  /invalid[\s_-]*(api[\s_-]*)?key|incorrect[\s_-]*(api[\s_-]*)?key|api[\s_-]*key[\s\w]*(invalid|not valid|expired|revoked|disabled)|invalid[\s_-]*(access[\s_-]*)?token|token[\s\w]*(invalid|expired|revoked)|unauthori[sz]ed|unauthenticated|authentication|invalid[\s_-]*credential|API_KEY_INVALID|invalid_api_key/i;

// Wording of a network / policy refusal that is not about the credential.
const ACCESS_BLOCK_SIGNALS =
  /access (is )?denied|request (was )?blocked|\bblocked\b|not allowed (from|in)|ip[\s-]*(address)?[\s\w]*(not allowed|blocked|denied|whitelist|allowlist)|firewall|\bwaf\b|cloudflare|forbidden by (policy|administrative rules)/i;

const HTML_PAGE = /<\s*(!doctype\s+html|html|head|body|title)\b/i;

/** Never let evidence collection stall a validation (e.g. a stream that never ends). */
const BODY_READ_TIMEOUT_MS = 2000;

// ---------------------------------------------------------------------------
// Trace
// ---------------------------------------------------------------------------

export function runWithValidationTrace<T>(
  apiKey: unknown,
  fn: () => Promise<T>
): Promise<{ value: T; responses: ObservedValidationResponse[] }> {
  const trace: ValidationTrace = {
    apiKey: typeof apiKey === "string" && apiKey.length > 0 ? apiKey : null,
    responses: [],
  };
  return traceStorage.run(trace, async () => {
    const value = await fn();
    return { value, responses: trace.responses };
  });
}

/**
 * Called by the shared validation transport for every upstream response.
 * No-op outside a validation trace. Never consumes the caller's body: error
 * bodies are read from a clone.
 */
export async function recordValidationResponse(url: string, response: Response): Promise<void> {
  const trace = traceStorage.getStore();
  if (!trace || !response || typeof response.status !== "number") return;

  const entry: ObservedValidationResponse = {
    endpoint: sanitizeValidationEndpoint(url),
    status: response.status,
  };
  if (!response.ok && typeof response.clone === "function") {
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      const text = await Promise.race([
        readBodyPrefix(response.clone(), MAX_CAPTURED_BODY_CHARS),
        new Promise<string>((resolve) => {
          timer = setTimeout(() => resolve(""), BODY_READ_TIMEOUT_MS);
          (timer as { unref?: () => void }).unref?.();
        }),
      ]);
      entry.body = text.slice(0, MAX_CAPTURED_BODY_CHARS);
    } catch {
      // Body unavailable (already consumed / aborted) — status alone still counts.
    } finally {
      if (timer) clearTimeout(timer);
    }
  }
  trace.responses.push(entry);
  if (trace.responses.length > MAX_TRACE_RESPONSES) trace.responses.shift();
}

/**
 * Read at most `maxChars` of a (cloned) body and cancel the rest, so a huge or
 * never-ending error body cannot stall validation or balloon memory.
 */
async function readBodyPrefix(response: Response, maxChars: number): Promise<string> {
  const body = response.body;
  if (!body || typeof body.getReader !== "function") {
    return (await response.text()).slice(0, maxChars);
  }
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let text = "";
  try {
    while (text.length < maxChars) {
      const { done, value } = await reader.read();
      if (done) break;
      text += decoder.decode(value, { stream: true });
    }
  } finally {
    reader.cancel().catch(() => {});
  }
  return text.slice(0, maxChars);
}

// ---------------------------------------------------------------------------
// Classification
// ---------------------------------------------------------------------------

export function classifyValidationRejection(
  status: number,
  body: string | undefined | null
): { kind: ValidationRejectionKind; explicit?: boolean } {
  const text = typeof body === "string" ? body : "";
  if (status === 401) return { kind: "auth" };
  // Explicit geo / region / egress wording wins over everything else, whatever
  // the status (Gemini answers geo blocks with 400 FAILED_PRECONDITION).
  if (status >= 400 && status < 500 && GEO_OR_EGRESS_SIGNALS.test(text)) {
    return { kind: "access_denied", explicit: true };
  }
  if (status === 451) return { kind: "access_denied", explicit: true };
  if (status === 403) {
    if (AUTH_REJECTION_SIGNALS.test(text)) return { kind: "auth" };
    // An HTML page instead of the API's own error format means an edge / WAF /
    // reverse proxy refused the request before it reached the API (e.g. the
    // default nginx "403 Forbidden" page).
    if (HTML_PAGE.test(text) || ACCESS_BLOCK_SIGNALS.test(text)) return { kind: "access_denied" };
    // A bare API 403 ("forbidden", empty body) is genuinely ambiguous: several
    // providers (AWS-signed APIs among them) answer bad credentials with 403.
    return { kind: "forbidden_ambiguous" };
  }
  if (status === 429) return { kind: "rate_limited" };
  if (status >= 500) return { kind: "unavailable" };
  return { kind: "other" };
}

// ---------------------------------------------------------------------------
// Sanitization
// ---------------------------------------------------------------------------

/** origin + pathname only: drops query (signatures, `?key=`), fragment and userinfo. */
export function sanitizeValidationEndpoint(url: string): string {
  try {
    const parsed = new URL(url);
    return `${parsed.protocol}//${parsed.host}${parsed.pathname}`;
  } catch {
    return "[unparseable-url]";
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Strip the validated key and anything that looks like a credential. */
export function redactValidationText(text: string, apiKey: string | null): string {
  let out = text;
  if (apiKey && apiKey.length >= 6) {
    out = out.replace(new RegExp(escapeRegExp(apiKey), "g"), "[REDACTED]");
  }
  return out
    .replace(/\bBearer\s+[A-Za-z0-9._~+/=-]{6,}/gi, "Bearer [REDACTED]")
    .replace(
      /\b(authorization|x-api-key|api[-_]?key|access[-_]?token|secret)(["']?\s*[:=]\s*["']?)[^\s"',;&]+/gi,
      "$1$2[REDACTED]"
    )
    .replace(
      /([?&](?:key|api_key|apikey|token|access_token|sig|signature)=)[^&\s"']+/gi,
      "$1[REDACTED]"
    )
    .replace(/\b(sk|fpk|pk|rk|xai|gsk|nvapi)[-_][A-Za-z0-9_-]{12,}/g, "[REDACTED]")
    .replace(/\bAIza[0-9A-Za-z_-]{20,}/g, "[REDACTED]");
}

function collapseWhitespace(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

/** Best-effort short human message out of a JSON / HTML / text error body. */
export function summarizeUpstreamBody(body: string | undefined, apiKey: string | null): string {
  if (!body) return "";
  const raw = body.trim();
  let message = "";

  if (raw.startsWith("{") || raw.startsWith("[")) {
    try {
      const parsed = JSON.parse(raw);
      const root = Array.isArray(parsed) ? parsed[0] : parsed;
      const err = root?.error;
      const candidates = [
        typeof err === "object" && err ? err.message : undefined,
        typeof err === "string" ? err : undefined,
        root?.message,
        root?.detail,
        root?.msg,
        root?.error_description,
      ];
      message = String(candidates.find((c) => typeof c === "string" && c.trim()) ?? "");
    } catch {
      // Not JSON after all — treated as text below.
    }
  }

  if (!message && /<\s*(html|head|body|title|h1)\b/i.test(raw)) {
    const title = raw.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
    const heading = raw.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1];
    message = title || heading || raw.replace(/<[^>]*>/g, " ");
  }

  if (!message) message = raw;
  return truncate(
    collapseWhitespace(redactValidationText(message, apiKey)),
    MAX_SURFACED_MESSAGE_CHARS
  );
}

// ---------------------------------------------------------------------------
// Verdict refinement
// ---------------------------------------------------------------------------

type ValidationResultLike = {
  valid?: boolean;
  error?: unknown;
  [key: string]: unknown;
};

const CANNED_INVALID_KEY = /^invalid api key$/i;

function describe(status: number, summary: string): string {
  return summary ? `HTTP ${status}: ${summary})` : `HTTP ${status})`;
}

export function buildAccessDeniedMessage(status: number, summary: string): string {
  return (
    `Access denied by provider (${describe(status, summary)} — the key was not rejected ` +
    `as invalid; the provider refused the request, possibly due to a region or egress ` +
    `(network location) restriction.`
  );
}

/**
 * Re-derive the verdict from the decisive (last) upstream response when the
 * validator's canned answer misstates it. Only two shapes are rewritten:
 *   - a canned "Invalid API key" whose last response was not a credential
 *     rejection (access refusal / 429 / 5xx);
 *   - any verdict whose last response was an explicit access refusal (451 or
 *     geo/region wording — e.g. a
 *     451 or geo-blocked 400 on a chat probe that a validator treats as
 *     "auth passed").
 * Everything else — including bespoke validator messages — passes through.
 */
export function refineValidationResult<T extends ValidationResultLike>(
  result: T,
  responses: ObservedValidationResponse[],
  apiKey: string | null
): {
  result: T;
  outcome: ValidationRejectionKind | "valid" | "passthrough";
  decisive?: ObservedValidationResponse;
} {
  const decisive = responses.length > 0 ? responses[responses.length - 1] : undefined;
  if (!result || typeof result !== "object") return { result, outcome: "passthrough", decisive };
  if (!decisive || (decisive.status >= 200 && decisive.status < 400)) {
    return { result, outcome: result.valid ? "valid" : "passthrough", decisive };
  }

  const { kind, explicit } = classifyValidationRejection(decisive.status, decisive.body);
  const summary = summarizeUpstreamBody(decisive.body, apiKey);
  const isCannedInvalid =
    result.valid === false &&
    typeof result.error === "string" &&
    CANNED_INVALID_KEY.test(result.error.trim());

  // A bare 403 only overrides the canned "Invalid API key"; overriding a
  // `valid: true` verdict needs an explicit refusal (451 / geo wording), since
  // some validators deliberately tolerate a 403 on an optional last probe.
  if (kind === "access_denied" && (isCannedInvalid || (result.valid === true && explicit))) {
    const refined = {
      ...result,
      valid: false,
      error: buildAccessDeniedMessage(decisive.status, summary),
    };
    delete (refined as ValidationResultLike).warning;
    return { result: refined, outcome: "access_denied", decisive };
  }
  if (isCannedInvalid && kind === "forbidden_ambiguous") {
    // Keep the "Invalid API key" verdict (consumers match on it) but surface the
    // evidence: a bare 403 may equally be a provider-side access refusal.
    return {
      result: {
        ...result,
        error:
          `Invalid API key (${describe(decisive.status, summary)} — the provider answered 403 ` +
          `without naming the cause; if the key is valid, the provider may be refusing access ` +
          `from this network or region.`,
      },
      outcome: "forbidden_ambiguous",
      decisive,
    };
  }
  if (isCannedInvalid && kind === "rate_limited") {
    return {
      result: {
        ...result,
        error: `Provider rate limited the validation request (${describe(decisive.status, summary)}`,
      },
      outcome: "rate_limited",
      decisive,
    };
  }
  if (isCannedInvalid && kind === "unavailable") {
    return {
      result: { ...result, error: `Provider unavailable (${describe(decisive.status, summary)}` },
      outcome: "unavailable",
      decisive,
    };
  }
  return { result, outcome: result.valid ? "valid" : kind, decisive };
}

// ---------------------------------------------------------------------------
// Logging
// ---------------------------------------------------------------------------

export interface ValidationLogRecord {
  provider: string;
  outcome: string;
  endpoint?: string;
  status?: number;
  body?: string;
  probes?: number;
}

export function buildValidationLogRecord({
  provider,
  apiKey,
  outcome,
  rejection,
  probes,
}: {
  provider: unknown;
  apiKey: unknown;
  outcome: string;
  rejection?: ObservedValidationResponse;
  probes?: number;
}): ValidationLogRecord {
  const key = typeof apiKey === "string" && apiKey.length > 0 ? apiKey : null;
  const record: ValidationLogRecord = {
    provider: typeof provider === "string" ? provider : "unknown",
    outcome,
  };
  if (typeof probes === "number") record.probes = probes;
  if (rejection) {
    record.endpoint = sanitizeValidationEndpoint(rejection.endpoint);
    record.status = rejection.status;
    if (rejection.body) {
      record.body = truncate(
        collapseWhitespace(redactValidationText(rejection.body, key)),
        MAX_LOGGED_BODY_CHARS
      );
    }
  }
  return record;
}

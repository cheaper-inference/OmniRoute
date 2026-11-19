import { isProviderSafetyStopsEnabled } from "./providerSafety.ts";

// Tencent / CodeBuddy wrap errors as {Response.Error}, {data.Response.Error},
// or {code, msg}. Detect and unwrap; other shapes pass through as empty fields.
// Callers must still route the message through sanitizeErrorMessage / buildErrorBody.

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function readNestedTencentError(record: Record<string, unknown> | null): {
  message: string | null;
  errorCode: unknown;
} {
  if (!record) return { message: null, errorCode: undefined };
  const response = asRecord(record.Response);
  if (!response) return { message: null, errorCode: undefined };
  const err = asRecord(response.Error);
  if (!err) return { message: null, errorCode: undefined };
  return {
    message: typeof err.Message === "string" ? err.Message : null,
    errorCode: err.Code,
  };
}

export interface TencentEnvelopeFields {
  message: string | null;
  errorCode: unknown;
}

/**
 * Unwrap a Tencent/CodeBuddy error envelope.
 *
 * Precedence matches parseUpstreamError's original fallback chain: top-level
 * `{code, msg}` wins over `{Response.Error}` and `{data.Response.Error}`.
 * Non-objects and OpenAI/Anthropic shapes return empty fields.
 */
export function unwrapTencentEnvelope(json: unknown): TencentEnvelopeFields {
  const record = asRecord(json);
  if (!record) return { message: null, errorCode: undefined };

  if (typeof record.msg === "string") {
    return { message: record.msg, errorCode: record.code };
  }

  const nested = readNestedTencentError(record);
  if (nested.message != null || nested.errorCode !== undefined) return nested;

  const fromData = readNestedTencentError(asRecord(record.data));
  if (fromData.message != null || fromData.errorCode !== undefined) return fromData;

  return { message: null, errorCode: undefined };
}

const UPSTREAM_METADATA_MAX_CHARS = 300;

/**
 * OpenRouter wraps the real provider failure in `error.metadata`
 * ({raw, provider_name}) and leaves `error.message` as "Provider returned
 * error" (#20520). Returns a short bounded " (Provider: raw)" suffix, or "".
 * Upstream-controlled text: consumers still route the message through
 * sanitizeErrorMessage / buildErrorBody (Rule #12).
 */
function summarizeUpstreamMetadata(errorObj: Record<string, unknown> | null): string {
  const metadata = asRecord(errorObj?.metadata);
  if (!metadata) return "";
  const provider = typeof metadata.provider_name === "string" ? metadata.provider_name.trim() : "";
  let raw = "";
  if (typeof metadata.raw === "string") raw = metadata.raw;
  else if (asRecord(metadata.raw) || Array.isArray(metadata.raw)) {
    try {
      raw = JSON.stringify(metadata.raw);
    } catch {
      raw = "";
    }
  }
  raw = raw.replace(/\s+/g, " ").trim().slice(0, UPSTREAM_METADATA_MAX_CHARS);
  if (!provider && !raw) return "";
  return ` (${[provider, raw].filter(Boolean).join(": ")})`;
}

/**
 * JSON error-field reader for parseUpstreamError: OpenAI-shaped fields first,
 * then Tencent/CodeBuddy envelope fallbacks. Lives here so frozen error.ts
 * does not grow. `envelopeMessage` is the ClinePass unwrap, when present.
 */
export function extractJsonErrorFields(
  json: unknown,
  envelopeMessage?: string | null
): { message: unknown; errorCode: unknown; errorType: unknown } {
  const record = asRecord(json) ?? {};
  const tencent = unwrapTencentEnvelope(record);
  const rootError = asRecord(record.error);
  // PROVIDER_SAFETY_STOPS_TERMINAL (#17049): also read a Responses failure's response.error.
  const errorObj =
    (rootError && Object.keys(rootError).length > 0) || !isProviderSafetyStopsEnabled()
      ? rootError
      : asRecord(asRecord(record.response)?.error);
  const metadataSuffix =
    !envelopeMessage && typeof errorObj?.message === "string" && errorObj.message
      ? summarizeUpstreamMetadata(errorObj)
      : "";
  return {
    message:
      envelopeMessage ||
      (metadataSuffix ? `${errorObj?.message}${metadataSuffix}` : errorObj?.message) ||
      record.message ||
      (typeof record.detail === "string" ? record.detail : null) ||
      tencent.message ||
      (typeof record.error === "string" ? record.error : null),
    errorCode: errorObj?.code || record.code || tencent.errorCode,
    errorType: errorObj?.type || record.type,
  };
}

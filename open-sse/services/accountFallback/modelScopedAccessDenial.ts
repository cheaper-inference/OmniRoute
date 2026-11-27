/**
 * ModelScope lists models that individual keys cannot access in its public catalog.
 * Its `401 { error: { code: "invalid_model" } }` reports a MODEL denial, not a
 * revoked credential. Kilo answers `PAID_MODEL_AUTH_REQUIRED` when a caller without
 * an entitled account asks for a paid model: the free models on the same connection
 * still work. Scope each exception to its known wire signature; an ordinary 401/403
 * must still expire or cool the credentials as usual.
 */
import { resolveProviderId } from "../../../src/shared/constants/providers";
import { getM365FailureScope } from "../m365ErrorPolicy.ts";

const MODELSCOPE_MODEL_MESSAGE =
  /the model does not exist or you do not have access to it(?:[.!?\s]|$)/i;
const MODELSCOPE_JSON_CODE = /["']code["']\s*:\s*["']invalid_model["']/i;
const INVALID_CREDENTIAL_MESSAGE =
  /\b(?:invalid|expired|revoked|missing)\s+(?:api[ -]?key|access[ -]?token|bearer[ -]?token)\b|\bauthentication expired\b/i;

/** Kilo's refusal of a paid model for a caller without an entitled account. */
export const KILO_PAID_MODEL_AUTH_REQUIRED = "PAID_MODEL_AUTH_REQUIRED";

type StructuredUpstreamError = { code?: unknown; type?: unknown; message?: unknown } | null;

const KILO_PROVIDERS = new Set(["kilo-gateway", "kilocode"]);

export function isModelScopedAccessDenial(
  provider: string | null | undefined,
  status: number,
  errorText: unknown,
  structuredError?: StructuredUpstreamError,
  upstreamErrorBody?: unknown
): boolean {
  if (getM365FailureScope(provider, status, errorText, structuredError) === "model") return true;
  if (isKiloPaidModelAuthRequired(provider, status, errorText, structuredError, upstreamErrorBody))
    return true;
  return isModelScopeAccessDenial(provider, status, errorText, structuredError);
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value && typeof value === "object") return value as Record<string, unknown>;
  if (typeof value !== "string" || !value.trim().startsWith("{")) return null;
  try {
    const parsed: unknown = JSON.parse(value);
    return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

/** `error_type`, `code`, `type`, `error.code` and `error.type` of a body (object or JSON text). */
function bodyCodes(body: unknown): unknown[] {
  const root = asRecord(body);
  if (!root) return [];
  const inner = asRecord(root.error);
  return [root.error_type, root.code, root.type, inner?.code, inner?.type];
}

function bodyMessages(body: unknown): string[] {
  const root = asRecord(body);
  if (!root) return typeof body === "string" ? [body] : [];
  const inner = asRecord(root.error);
  return [root.message, inner?.message, typeof root.error === "string" ? root.error : null].filter(
    (value): value is string => typeof value === "string"
  );
}

/** Only the exact code decides; the free-text message never does on its own. */
function isKiloPaidModelAuthRequired(
  provider: string | null | undefined,
  status: number,
  errorText: unknown,
  structuredError: StructuredUpstreamError | undefined,
  upstreamErrorBody: unknown
): boolean {
  if (!provider || !KILO_PROVIDERS.has(resolveProviderId(provider))) return false;
  if (status < 400 || status >= 500 || status === 429) return false;
  const messages = [
    ...bodyMessages(errorText),
    ...bodyMessages(upstreamErrorBody),
    structuredError?.message,
  ].filter((value): value is string => typeof value === "string");
  if (INVALID_CREDENTIAL_MESSAGE.test(messages.join(" "))) return false;
  const expected = KILO_PAID_MODEL_AUTH_REQUIRED.toLowerCase();
  return [
    structuredError?.code,
    structuredError?.type,
    ...bodyCodes(upstreamErrorBody),
    ...bodyCodes(errorText),
  ].some((value) => typeof value === "string" && value.trim().toLowerCase() === expected);
}

function isModelScopeAccessDenial(
  provider: string | null | undefined,
  status: number,
  errorText: unknown,
  structuredError?: StructuredUpstreamError
): boolean {
  if (provider?.toLowerCase() !== "modelscope" || (status !== 401 && status !== 403)) {
    return false;
  }
  let text = "";
  if (typeof errorText === "string") text = errorText;
  else {
    try {
      text = JSON.stringify(errorText ?? "");
    } catch {
      return false;
    }
  }
  const structuredMessage =
    typeof structuredError?.message === "string" ? structuredError.message : "";
  if (INVALID_CREDENTIAL_MESSAGE.test([text, structuredMessage].join(" "))) return false;
  return (
    (typeof structuredError?.code === "string" &&
      structuredError.code.toLowerCase() === "invalid_model") ||
    MODELSCOPE_JSON_CODE.test(text) ||
    MODELSCOPE_MODEL_MESSAGE.test(text)
  );
}

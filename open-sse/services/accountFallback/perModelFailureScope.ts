/**
 * accountFallback/perModelFailureScope.ts — whether a NON-QUOTA failure should lock
 * one model instead of cooling the whole connection.
 *
 * Extracted from services/accountFallback.ts (file-size gate, #12334). A Claude
 * OAuth connection multiplexes Fable 5, Opus, Sonnet and Haiku behind one
 * credential, so a 404/5xx names one model. Quota is a separate question:
 * hasPerModelQuota("claude") is false and a 429 stays account-wide.
 */
import { resolveProviderId } from "../../../src/shared/constants/providers";
import { hasPerModelQuota } from "../accountFallback.ts";

// Bounded quantifiers keep this ReDoS-safe.
const MODEL_NOT_FOUND_404_REGEX =
  /model_not_found|model[^\n]{0,120}(?:does not exist|not found|is not available|do not have access)/i;

// Bounded quantifiers keep this ReDoS-safe.
const MODEL_UNSUPPORTED_401_REGEX = /\bmodel\b[^\n]{0,120}\bis not supported\b/i;

/**
 * #16380: a 401 whose body attributes the failure to the MODEL (e.g. opencode /
 * OpenAI-compatible upstreams answer `Model <id> is not supported` after a
 * model was delisted) is model-scoped, mirroring the #15633 404 model_not_found
 * treatment: the key is healthy, so lock that model on that connection and keep
 * serving sibling models — never push the connection toward a terminal state.
 */
export function isModelUnsupported401(status: number | undefined, errorText: unknown): boolean {
  if (status !== 401) return false;
  const text = typeof errorText === "string" ? errorText : JSON.stringify(errorText ?? "");
  return MODEL_UNSUPPORTED_401_REGEX.test(text);
}

/**
 * #15633: a 404 whose body names a missing MODEL (e.g. Groq `model_not_found`) is
 * model-scoped for every provider — lock that model only, never the connection.
 * A bare endpoint/URL 404 carries no model wording and keeps the connection cooldown.
 */
export function isModelNotFound404(status: number | undefined, errorText: unknown): boolean {
  if (status !== 404) return false;
  const text = typeof errorText === "string" ? errorText : JSON.stringify(errorText ?? "");
  return MODEL_NOT_FOUND_404_REGEX.test(text);
}

/** Anthropic names a missing model without the generic "not found" wording. */
function isAnthropicModelNotFound(
  provider: string | null | undefined,
  model: string | null | undefined,
  status: number | undefined,
  errorText: unknown
): boolean {
  if (status !== 404 || !model || !provider || resolveProviderId(provider) !== "anthropic") {
    return false;
  }
  const expected = `model: ${model}`;
  let body = errorText;
  if (typeof body === "string") {
    if (body.trim() === expected) return true;
    try {
      body = JSON.parse(body);
    } catch {
      return false;
    }
  }
  if (!body || typeof body !== "object") return false;
  const error = (body as { error?: unknown }).error;
  if (!error || typeof error !== "object") return false;
  const message = (error as { message?: unknown }).message;
  return typeof message === "string" && message.trim() === expected;
}

function namesExactModel(
  text: string,
  marker: string,
  model: string,
  allowUrlSuffix = false
): boolean {
  const token = `${marker}${model}`;
  const index = text.indexOf(token);
  if (index < 0) return false;
  const following = text[index + token.length];
  return (
    following === undefined ||
    /[\s,;)]/.test(following) ||
    (allowUrlSuffix && /[?#]/.test(following))
  );
}

/** Only explicit attribution to the current model can narrow a 413/504 failure. */
export function isExplicitModelCapacityFailure(
  status: number | undefined,
  errorText: unknown,
  model: string | null | undefined
): boolean {
  if (!model || (status !== 413 && status !== 504)) return false;
  const text = (typeof errorText === "string" ? errorText : JSON.stringify(errorText ?? ""))
    .replace(/[`"']/g, "")
    .toLowerCase();
  const id = model.toLowerCase();
  if (status === 413) {
    return namesExactModel(text, "request too large for model ", id);
  }
  if (!/timeout|timed out/i.test(text)) return false;
  return (
    namesExactModel(text, `/models/${id}:`, "streamgeneratecontent", true) ||
    namesExactModel(text, `/models/${id}:`, "generatecontent", true) ||
    namesExactModel(text, "model ", id)
  );
}

/**
 * @param status - When 429, only per-model *quota* providers qualify. Omit for
 *   the non-quota question (404/5xx), which also includes Claude.
 */
export function hasPerModelFailureScope(
  provider: string | null | undefined,
  model: string | null | undefined = null,
  connectionPassthroughModels?: boolean,
  status?: number,
  errorText?: unknown
): boolean {
  if (
    isModelNotFound404(status, errorText) ||
    isAnthropicModelNotFound(provider, model, status, errorText) ||
    isModelUnsupported401(status, errorText) ||
    isExplicitModelCapacityFailure(status, errorText, model)
  )
    return true;
  if (status === 429) return hasPerModelQuota(provider, model, connectionPassthroughModels);
  if (hasPerModelQuota(provider, model, connectionPassthroughModels)) return true;
  if (typeof connectionPassthroughModels === "boolean") return connectionPassthroughModels;
  if (!provider) return false;
  return resolveProviderId(provider) === "claude";
}

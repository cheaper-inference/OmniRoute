// Reactive 400 field-downgrade (and auto-learn) retry, extracted verbatim in
// behavior from BaseExecutor.execute() (base.ts) to keep that file under its
// frozen size cap. On an upstream 400 that names an offending request field,
// the field is deleted from the live body and the SAME url is retried once per
// field (a field named on `messages[*]` is dropped from a rebuilt messages
// array instead); "Unsupported parameter" errors are optionally persisted to
// the provider's param blocklist (#6625).
import { readResponseTextWithinCap } from "../../utils/responseBodyCap.ts";
import {
  getParamFilterConfig,
  addParamToBlocklist,
  isAutoLearnGloballyEnabled,
} from "@/lib/db/paramFilters";
import { HTTP_STATUS } from "../../config/constants.ts";
import { isK31RejectionFinal } from "../../utils/kimiK31.ts";
import {
  findOffendingField,
  detectRejectedMessageFields,
  detectUnsupportedParam,
  isUnsupportedThinkingError,
  REASONING_REQUEST_FIELDS,
} from "../../config/providerFieldStrips.ts";

type FieldDowngradeLog = {
  debug?: (tag: string, message: string) => void;
  info?: (tag: string, message: string) => void;
  warn?: (tag: string, message: string) => void;
} | null;

export interface FieldDowngradeParams {
  response: Response;
  url: string;
  provider: string;
  model: string | undefined;
  /** Live request body; the offending field is deleted from it in place. */
  body: unknown;
  fetchOptions: RequestInit;
  fetchFn: (url: string, options: RequestInit) => Promise<Response>;
  /** Serializes (and, for Claude Code protocol, signs) the body before retrying. */
  serializeBody: (body: unknown) => string | Promise<string>;
  /** Fields already stripped in this execute() call (mutated). */
  strippedFields: Set<string>;
  /** Fields that must never be stripped or auto-learned (e.g. a per-key forced Codex service_tier). */
  protectedFields?: readonly string[];
  log?: FieldDowngradeLog;
}

/** Auto-learn "Unsupported parameter" errors; null when no retry was issued. */
async function applyAutoLearnRecovery(
  params: FieldDowngradeParams,
  record: Record<string, unknown>,
  errText: string
): Promise<Response | null> {
  const { url, provider, model, body, fetchOptions, fetchFn, serializeBody, strippedFields, log } =
    params;
  let response: Response | null = null;
  const autoLearned = detectUnsupportedParam(errText);
  if (
    autoLearned &&
    !params.protectedFields?.includes(autoLearned) &&
    !strippedFields.has(autoLearned) &&
    record[autoLearned] !== undefined
  ) {
    try {
      const config = getParamFilterConfig(provider);
      const shouldAutoLearn = isAutoLearnGloballyEnabled() || config?.autoLearn === true;
      if (shouldAutoLearn) {
        strippedFields.add(autoLearned);
        addParamToBlocklist(provider, autoLearned, model);
        delete record[autoLearned];
        const retryBody = await serializeBody(body);
        log?.info?.(
          "AUTO_LEARN",
          `Auto-learned "${autoLearned}" for provider ${provider} (model: ${model}) from 400 on ${url} — retrying`
        );
        response = await fetchFn(url, { ...fetchOptions, body: retryBody });
      }
    } catch (learnError) {
      log?.warn?.(
        "AUTO_LEARN",
        `Failed to persist auto-learned param "${autoLearned}" for ${provider}: ${String(learnError)}`
      );
    }
  }
  return response;
}

/**
 * Some upstreams (Ollama for Instruct-only models such as Qwen3-Coder) reject thinking by
 * naming the MODEL, not the field. Drop every top-level reasoning field the body carries
 * and retry once; null when no such field is present (e.g. Gemini's nested
 * generationConfig.thinkingConfig), so the caller falls through to auto-learn.
 */
async function applyThinkingUnsupportedRecovery(
  params: FieldDowngradeParams,
  record: Record<string, unknown>,
  errText: string
): Promise<Response | null> {
  const { url, model, body, fetchOptions, fetchFn, serializeBody, strippedFields, log } = params;
  const thinkingFields = REASONING_REQUEST_FIELDS.filter(
    (field) => !strippedFields.has(field) && record[field] !== undefined
  );
  if (thinkingFields.length === 0 || !isUnsupportedThinkingError(errText)) return null;
  for (const field of thinkingFields) {
    strippedFields.add(field);
    delete record[field];
  }
  const retryBody = await serializeBody(body);
  log?.info?.(
    "THINKING_UNSUPPORTED",
    `Upstream 400: ${model} has no thinking mode on ${url} — retrying without ${thinkingFields.join(", ")}`
  );
  return fetchFn(url, { ...fetchOptions, body: retryBody });
}

/**
 * The 400 names a field that lives on individual `messages[*]` entries (Groq
 * "'messages.N' : property 'X' is unsupported", pydantic extra_forbidden). Rebuild
 * `messages` without those fields — the caller's message objects stay untouched,
 * since combo fallback reuses them — and retry once; null when nothing applies.
 */
async function applyMessageFieldRecovery(
  params: FieldDowngradeParams,
  record: Record<string, unknown>,
  errText: string
): Promise<Response | null> {
  const { url, body, fetchOptions, fetchFn, serializeBody, strippedFields, log } = params;
  const messages = record.messages;
  if (!Array.isArray(messages)) return null;
  const hasField = (field: string) =>
    messages.some((m) => m && typeof m === "object" && Object.hasOwn(m, field));
  const fields = detectRejectedMessageFields(errText).filter(
    (field) =>
      !params.protectedFields?.includes(field) &&
      !strippedFields.has(`messages.*.${field}`) &&
      hasField(field)
  );
  if (fields.length === 0) return null;
  record.messages = messages.map((m) => {
    if (!m || typeof m !== "object" || !fields.some((f) => Object.hasOwn(m, f))) return m;
    const copy = { ...(m as Record<string, unknown>) };
    for (const field of fields) delete copy[field];
    return copy;
  });
  for (const field of fields) strippedFields.add(`messages.*.${field}`);
  const retryBody = await serializeBody(body);
  log?.debug?.(
    "FIELD_400",
    `Upstream 400 rejected messages[*].${fields.join(", messages[*].")} on ${url} — retrying without it`
  );
  return fetchFn(url, { ...fetchOptions, body: retryBody });
}

// Fields whose removal fixed a request, per provider and model. A caller reads them before its
// first send, so the next request skips the rejected round trip. In memory only; a field is
// learned only after the retry without it succeeds, and each entry expires, so one odd 400
// cannot strip a field for good. shortcut: no persistence across restarts, add it if cold starts hurt.
const LEARNED_TTL_MS = 60 * 60_000;
const LEARNED_MAX_KEYS = 500;
const learnedFields = new Map<string, { fields: Set<string>; expiresAt: number }>();

const learnedKey = (provider: string, model: string | undefined) => `${provider}\0${model ?? ""}`;

/** Fields a successful 400 retry dropped for this provider and model; empty when none or expired. */
export function getLearnedStrippedFields(provider: string, model: string | undefined): string[] {
  const key = learnedKey(provider, model);
  const entry = learnedFields.get(key);
  if (!entry) return [];
  if (entry.expiresAt <= Date.now()) {
    learnedFields.delete(key);
    return [];
  }
  return [...entry.fields];
}

/** @internal tests only: forget everything learned so far. */
export function __clearLearnedStrippedFieldsForTests(): void {
  learnedFields.clear();
}

function learnStrippedFields(provider: string, model: string | undefined, fields: string[]): void {
  if (fields.length === 0) return;
  const key = learnedKey(provider, model);
  const entry = learnedFields.get(key);
  const live = entry && entry.expiresAt > Date.now() ? entry.fields : new Set<string>();
  for (const field of fields) live.add(field);
  learnedFields.delete(key);
  learnedFields.set(key, { fields: live, expiresAt: Date.now() + LEARNED_TTL_MS });
  if (learnedFields.size > LEARNED_MAX_KEYS) {
    const oldest = learnedFields.keys().next().value;
    if (oldest !== undefined) learnedFields.delete(oldest);
  }
}

/** Returns the response to use going forward (the retry's when one was issued). */
export async function applyFieldDowngradeRecovery(params: FieldDowngradeParams): Promise<Response> {
  const before = new Set(params.strippedFields);
  const response = await recoverFromFieldRejection(params);
  if (response.ok) {
    const dropped = [...params.strippedFields].filter((field) => !before.has(field));
    learnStrippedFields(params.provider, params.model, dropped);
  }
  return response;
}

async function recoverFromFieldRejection(params: FieldDowngradeParams): Promise<Response> {
  const { url, fetchOptions, fetchFn, serializeBody, strippedFields, log } = params;
  const { response } = params;
  const body = params.body;
  if (response.status !== HTTP_STATUS.BAD_REQUEST || !body || typeof body !== "object") {
    return response;
  }
  const record = body as Record<string, unknown>;
  if (isK31RejectionFinal(params.model, record)) return response;

  const errText = await readResponseTextWithinCap(response.clone()).catch(() => "");
  const offending = findOffendingField(errText);
  if (
    offending &&
    !params.protectedFields?.includes(offending) &&
    !strippedFields.has(offending) &&
    record[offending] !== undefined
  ) {
    strippedFields.add(offending);
    delete record[offending];
    const retryBody = await serializeBody(body);
    log?.debug?.("FIELD_400", `Upstream 400 rejected ${offending} on ${url} — retrying without it`);
    return fetchFn(url, { ...fetchOptions, body: retryBody });
  }
  const messageFieldRetry = await applyMessageFieldRecovery(params, record, errText);
  if (messageFieldRetry) return messageFieldRetry;
  const thinkingRetry = await applyThinkingUnsupportedRecovery(params, record, errText);
  if (thinkingRetry) return thinkingRetry;
  return (await applyAutoLearnRecovery(params, record, errText)) ?? response;
}

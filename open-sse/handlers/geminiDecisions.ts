/**
 * Native Gemini Decision 1 transport. The wire protocol differs from Gemini
 * generateContent, OpenAI chat and TypeSafe System One. Keep it isolated.
 */
export const GOOGLE_DECISIONS_URL =
  "https://generativelanguage.googleapis.com/v1beta/decisions";
export const GOOGLE_DECISIONS_MODEL = "gemini-decision-1";
export const GOOGLE_DECISIONS_TIMEOUT_MS = 20_000;
const MAX_RESPONSE_BYTES = 2 * 1024 * 1024;

export type GeminiDecisionPayload = {
  model: string;
  input: unknown;
  questions: Record<string, unknown>;
};

export interface GeminiDecisionTransportResult {
  status: number;
  body: Record<string, unknown> | null;
  headers: Headers;
  latencyMs: number;
  /** True for a timeout; not a provider rate limit or a model-scoped error. */
  timedOut: boolean;
  transportError: string | null;
}

export function geminiDecisionErrorText(body: Record<string, unknown> | null): string | null {
  const error = body?.error;
  if (!error || typeof error !== "object" || Array.isArray(error)) return null;
  const message = (error as Record<string, unknown>).message;
  return typeof message === "string" ? message : null;
}

export function geminiDecisionInputTokens(body: Record<string, unknown> | null): number {
  const usage = body?.usage;
  if (!usage || typeof usage !== "object" || Array.isArray(usage)) return 0;
  const count = (usage as Record<string, unknown>).total_input_tokens;
  return typeof count === "number" && Number.isFinite(count) && count >= 0 ? count : 0;
}

export async function executeGeminiDecision(
  input: GeminiDecisionPayload,
  apiKey: string,
  options: {
    fetchImpl?: typeof fetch;
    signal?: AbortSignal;
    timeoutMs?: number;
  } = {}
): Promise<GeminiDecisionTransportResult> {
  const started = Date.now();
  const controller = new AbortController();
  const timeoutMs = Math.max(100, Math.min(options.timeoutMs ?? GOOGLE_DECISIONS_TIMEOUT_MS, 60_000));
  let timedOut = false;
  const timeout = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);
  const onAbort = () => controller.abort();
  options.signal?.addEventListener("abort", onAbort, { once: true });
  if (options.signal?.aborted) controller.abort();

  try {
    const response = await (options.fetchImpl ?? fetch)(GOOGLE_DECISIONS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        model: GOOGLE_DECISIONS_MODEL,
        input: input.input,
        questions: input.questions,
      }),
      signal: controller.signal,
    });
    const sizeHeader = Number(response.headers.get("content-length") || "0");
    if (sizeHeader > MAX_RESPONSE_BYTES) {
      return {
        status: 502, body: null, headers: new Headers(), latencyMs: Date.now() - started,
        timedOut: false, transportError: "Upstream Decisions response exceeded size limit",
      };
    }
    const text = await response.text();
    if (text.length > MAX_RESPONSE_BYTES) {
      return {
        status: 502, body: null, headers: new Headers(), latencyMs: Date.now() - started,
        timedOut: false, transportError: "Upstream Decisions response exceeded size limit",
      };
    }
    let body: unknown;
    try {
      body = JSON.parse(text);
    } catch {
      body = null;
    }
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return {
        status: 502, body: null, headers: new Headers(), latencyMs: Date.now() - started,
        timedOut: false, transportError: "Invalid upstream Decisions JSON response",
      };
    }
    const record = body as Record<string, unknown>;
    if (response.ok && (!record.answers || typeof record.answers !== "object" ||
      Array.isArray(record.answers))) {
      return {
        status: 502, body: null, headers: new Headers(), latencyMs: Date.now() - started,
        timedOut: false, transportError: "Upstream Decisions response lacks answers",
      };
    }
    return {
      status: response.status,
      body: record,
      headers: response.headers,
      latencyMs: Date.now() - started,
      timedOut: false,
      transportError: null,
    };
  } catch {
    return {
      status: options.signal?.aborted ? 499 : timedOut ? 504 : 502,
      body: null,
      headers: new Headers(),
      latencyMs: Date.now() - started,
      timedOut,
      transportError: options.signal?.aborted ? "Client request cancelled"
        : timedOut ? "Google Decisions request timed out" : "Google Decisions network error",
    };
  } finally {
    clearTimeout(timeout);
    options.signal?.removeEventListener("abort", onAbort);
  }
}

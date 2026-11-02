import type { SystemOneProvider } from "../config/systemOneRegistry.ts";

type Validation = { ok: true } | { ok: false; status: number; message: string };
type Question = Record<string, unknown>;

const OK: Validation = { ok: true };
const OLLAMA_UNSUPPORTED_FIELDS = ["stream", "tools", "temperature", "top_p", "max_tokens"];
const RAW_BASE64 = /^[A-Za-z0-9+/]+={0,2}$/;

function fail(message: string, status = 400): Validation {
  return { ok: false, status, message };
}

function candidateCount(question: Question): number | null {
  if (question.type === "choice") return Object.keys(question.criteria as object).length;
  if (question.type === "score") return (question.criteria as unknown[]).length;
  return null;
}

function candidateLimits(provider: SystemOneProvider, question: Question) {
  if (provider === "ollama-local") return { min: 2, max: 26 };
  // Native TypeSafe's current schema accepts one Score level.
  return { min: 1, max: question.type === "choice" ? 255 : 10 };
}

/** Gateway models have their own contracts; native Jev limits are not imposed on them. */
function validateCandidates(provider: SystemOneProvider, questions: Record<string, Question>) {
  if (provider === "openrouter") return OK;
  for (const [name, question] of Object.entries(questions)) {
    const count = candidateCount(question);
    if (count === null) continue;
    const { min, max } = candidateLimits(provider, question);
    if (count < min || count > max) {
      return fail(`${name}.criteria must contain ${min}–${max} candidates for ${provider}`);
    }
  }
  return OK;
}

function isRawBase64(image: unknown): boolean {
  return typeof image === "string" && image.length % 4 === 0 && RAW_BASE64.test(image);
}

function validateKeepAlive(value: unknown): Validation {
  if (value === undefined || typeof value === "string") return OK;
  return typeof value === "number" && Number.isFinite(value)
    ? OK
    : fail("keep_alive must be a duration string or finite number");
}

function validateOllamaImagesAndSize(body: Record<string, unknown>): Validation {
  const images = body.images;
  if (images !== undefined && !(Array.isArray(images) && images.every(isRawBase64))) {
    return fail("images must be raw base64; URLs and data URLs are not supported");
  }
  const hasImages = Array.isArray(images) && images.length > 0;
  const maxBytes = hasImages ? 32 * 1024 * 1024 : 64 * 1024;
  if (Buffer.byteLength(JSON.stringify(body), "utf8") <= maxBytes) return OK;
  return fail(
    `Ollama request body must not exceed ${hasImages ? "32 MiB with images" : "64 KiB"}`,
    413
  );
}

function validateOllama(body: Record<string, unknown>, questionCount: number): Validation {
  if (questionCount > 64) return fail("Ollama questions must contain 1–64 fields");
  const unsupported = OLLAMA_UNSUPPORTED_FIELDS.find((field) => body[field] !== undefined);
  if (unsupported) return fail(`Ollama System One does not support ${unsupported}`);
  const keepAlive = validateKeepAlive(body.keep_alive);
  return keepAlive.ok ? validateOllamaImagesAndSize(body) : keepAlive;
}

/** Apply only differences from the shared typed envelope, never truncate state. */
export function validateSystemOneBackendBody(
  provider: SystemOneProvider,
  body: Record<string, unknown>
): Validation {
  const questions = body.questions as Record<string, Question>;
  const candidates = validateCandidates(provider, questions);
  if (!candidates.ok) return candidates;
  if (provider === "typesafe" && Array.isArray(body.images) && body.images.length) {
    return fail("Native TypeSafe Jev accepts text state, not images");
  }
  return provider === "ollama-local" ? validateOllama(body, Object.keys(questions).length) : OK;
}

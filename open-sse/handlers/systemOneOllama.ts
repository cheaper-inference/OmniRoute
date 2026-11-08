/**
 * Local Ollama wire for System One decisions (#14667).
 *
 * A local Ollama serves typed decisions at `<host>/v1/systemone` with the same
 * `{ model, state, questions }` body and `{ model, answers, usage }` answer as
 * TypeSafe. The host is the `ollama-local` connection's base URL, resolved by the
 * route (src/app/api/v1/_shared/systemOneOllamaUrl.ts) into `target.upstreamUrl`,
 * never a request field. Ollama's contract is
 * narrower than native Jev, so the differences are checked here before any
 * upstream call: 2–26 candidates per choice/score question, at most 64
 * questions, no chat sampling fields, raw base64 images only, and a body cap.
 */

const MIN_CANDIDATES = 2;
const MAX_CANDIDATES = 26;
const MAX_QUESTIONS = 64;
const TEXT_BODY_MAX_BYTES = 64 * 1024;
const IMAGE_BODY_MAX_BYTES = 32 * 1024 * 1024;
const UNSUPPORTED_FIELDS = ["stream", "tools", "temperature", "top_p", "max_tokens"];
const RAW_BASE64 = /^[A-Za-z0-9+/]+={0,2}$/;

export type OllamaSystemOneValidation =
  { ok: true } | { ok: false; status: number; message: string };

const OK: OllamaSystemOneValidation = { ok: true };

function fail(message: string, status = 400): OllamaSystemOneValidation {
  return { ok: false, status, message };
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function candidateCount(question: Record<string, unknown>): number | null {
  if (question.type === "choice") {
    const criteria = asRecord(question.criteria);
    return criteria ? Object.keys(criteria).length : 0;
  }
  if (question.type === "score") {
    return Array.isArray(question.criteria) ? question.criteria.length : 0;
  }
  return null;
}

function isRawBase64(image: unknown): boolean {
  return typeof image === "string" && image.length % 4 === 0 && RAW_BASE64.test(image);
}

function validateQuestions(questions: Record<string, unknown>): OllamaSystemOneValidation {
  const entries = Object.entries(questions);
  if (entries.length > MAX_QUESTIONS) {
    return fail(`Ollama questions must contain 1–${MAX_QUESTIONS} fields`);
  }
  for (const [name, raw] of entries) {
    const count = candidateCount(asRecord(raw) ?? {});
    if (count === null) continue;
    if (count < MIN_CANDIDATES || count > MAX_CANDIDATES) {
      return fail(
        `${name}.criteria must contain ${MIN_CANDIDATES}–${MAX_CANDIDATES} candidates for ollama-local`
      );
    }
  }
  return OK;
}

function validateExtras(body: Record<string, unknown>): OllamaSystemOneValidation {
  const unsupported = UNSUPPORTED_FIELDS.find((field) => body[field] !== undefined);
  if (unsupported) return fail(`Ollama System One does not support ${unsupported}`);
  const keepAlive = body.keep_alive;
  if (
    keepAlive !== undefined &&
    typeof keepAlive !== "string" &&
    !(typeof keepAlive === "number" && Number.isFinite(keepAlive))
  ) {
    return fail("keep_alive must be a duration string or finite number");
  }
  const images = body.images;
  if (images !== undefined && !(Array.isArray(images) && images.every(isRawBase64))) {
    return fail("images must be raw base64; URLs and data URLs are not supported");
  }
  return OK;
}

/** Ollama-specific checks on top of the shared `/v1/systemone` schema. */
export function validateOllamaSystemOneBody(
  body: Record<string, unknown>
): OllamaSystemOneValidation {
  const questions = validateQuestions(asRecord(body.questions) ?? {});
  if (!questions.ok) return questions;
  const extras = validateExtras(body);
  if (!extras.ok) return extras;
  const hasImages = Array.isArray(body.images) && body.images.length > 0;
  const maxBytes = hasImages ? IMAGE_BODY_MAX_BYTES : TEXT_BODY_MAX_BYTES;
  if (Buffer.byteLength(JSON.stringify(body), "utf8") > maxBytes) {
    return fail(
      `Ollama request body must not exceed ${hasImages ? "32 MiB with images" : "64 KiB"}`,
      413
    );
  }
  return OK;
}

/** Upstream body: the typed envelope plus Ollama's optional `images` / `keep_alive`. */
export function buildOllamaSystemOneBody(
  upstreamModel: string,
  body: Record<string, unknown>
): Record<string, unknown> {
  return {
    model: upstreamModel,
    state: body.state,
    questions: body.questions,
    ...(body.images !== undefined ? { images: body.images } : {}),
    ...(body.keep_alive !== undefined ? { keep_alive: body.keep_alive } : {}),
  };
}

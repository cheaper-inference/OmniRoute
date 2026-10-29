/**
 * Cloudflare Workers AI transcription helpers (`@cf/deepgram/nova-3`).
 *
 * Kept out of audioTranscription.ts so that file stays under the file-size cap. The
 * handler there owns the request; this module holds the pure pieces: the account-scoped
 * upstream URL, the `success:false` envelope check, and the verbose_json mapping.
 *
 * Workers AI returns Deepgram's `results.channels[0].alternatives[0]` (inside the usual
 * Cloudflare `{ success, errors, result }` envelope) but no `utterances`, so segments are
 * built here from the word list: one segment per run of the same speaker.
 */

import { isJsonObject } from "../utils/kieTask.ts";

type JsonObject = Record<string, unknown>;

export type CloudflareTranscriptionCredentials = {
  accountId?: string;
  providerSpecificData?: Record<string, unknown> | null;
} | null;

type VerboseWord = { word: string; start: number; end: number; speaker?: number };
type VerboseSegment = { id: number; start: number; end: number; text: string; speaker?: number };

const finiteOr = (value: unknown, fallback: number): number =>
  typeof value === "number" && Number.isFinite(value) ? value : fallback;

/**
 * Account id for the connection, with the same precedence as the chat executor
 * (`open-sse/executors/cloudflare-ai.ts`): connection data, top-level field, env.
 */
export function resolveCloudflareAccountId(credentials?: CloudflareTranscriptionCredentials) {
  const fromConnection = credentials?.providerSpecificData?.accountId;
  const candidates = [fromConnection, credentials?.accountId, process.env.CLOUDFLARE_ACCOUNT_ID];
  const accountId = candidates.find((value) => typeof value === "string" && value.trim());
  return typeof accountId === "string" ? accountId.trim() : "";
}

/**
 * `{baseUrl}/{model}` with the account id spliced in. The id is URL-encoded so a value
 * holding `/`, `?` or `#` cannot change the path or add a query. The model id was already
 * checked by `hasUnsafeModelIdSyntax` and keeps its slashes (`@cf/deepgram/nova-3`).
 */
export function buildCloudflareTranscriptionUrl(
  baseUrl: string,
  accountId: string,
  modelId: string
): URL {
  const base = baseUrl.replace("{accountId}", encodeURIComponent(accountId)).replace(/\/+$/, "");
  return new URL(`${base}/${modelId}`);
}

/**
 * Cloudflare can answer HTTP 200 with `{ success: false, errors: [...] }`. Returns the
 * first error's code (or null) when that happens, `undefined` when the call succeeded.
 * Only the numeric code is surfaced; the vendor's message text is not echoed.
 */
export function readCloudflareEnvelopeError(data: unknown): { code: number | null } | undefined {
  if (!isJsonObject(data) || data.success !== false) return undefined;
  const first = Array.isArray(data.errors) ? data.errors.find(isJsonObject) : undefined;
  const code = first?.code;
  return { code: typeof code === "number" && Number.isFinite(code) ? code : null };
}

function firstAlternative(data: unknown): JsonObject {
  const root = isJsonObject(data) ? data : {};
  const result = isJsonObject(root.result) ? root.result : root;
  const results = isJsonObject(result.results) ? result.results : {};
  const channels = Array.isArray(results.channels) ? results.channels : [];
  const channel = isJsonObject(channels[0]) ? channels[0] : {};
  const alternatives = Array.isArray(channel.alternatives) ? channel.alternatives : [];
  return isJsonObject(alternatives[0]) ? alternatives[0] : {};
}

/** The plain transcript of a Workers AI Nova-3 response ("" when absent). */
export function readCloudflareTranscript(data: unknown): string {
  const transcript = firstAlternative(data).transcript;
  return typeof transcript === "string" ? transcript : "";
}

function toWords(rawWords: unknown): VerboseWord[] {
  if (!Array.isArray(rawWords)) return [];
  return rawWords.filter(isJsonObject).map((word) => {
    const label =
      typeof word.punctuated_word === "string" && word.punctuated_word
        ? word.punctuated_word
        : word.word;
    const speaker = word.speaker;
    return {
      word: typeof label === "string" ? label : "",
      start: finiteOr(word.start, 0),
      end: finiteOr(word.end, 0),
      ...(typeof speaker === "number" && Number.isFinite(speaker) ? { speaker } : {}),
    };
  });
}

/** One segment per run of consecutive words with the same speaker label. */
function toSpeakerRuns(words: VerboseWord[]): VerboseSegment[] {
  const segments: VerboseSegment[] = [];
  for (const word of words) {
    const last = segments[segments.length - 1];
    if (last && last.speaker === word.speaker) {
      last.end = word.end;
      last.text = last.text ? `${last.text} ${word.word}` : word.word;
      continue;
    }
    segments.push({
      id: segments.length,
      start: word.start,
      end: word.end,
      text: word.word,
      ...(word.speaker !== undefined ? { speaker: word.speaker } : {}),
    });
  }
  return segments;
}

/**
 * Build the OpenAI `verbose_json` envelope (same base shape as the native Deepgram path:
 * `task`, `language?`, `duration`, `text`, `segments`) plus the per-word list, the speaker
 * count when diarization produced labels, and Workers AI's neuron usage. Provider frames
 * are untrusted: non-object words are dropped and non-numeric fields fall back to 0.
 */
export function cloudflareNova3ToVerboseJson(data: unknown, requestedLanguage: string) {
  const alternative = firstAlternative(data);
  const text = typeof alternative.transcript === "string" ? alternative.transcript : "";
  const words = toWords(alternative.words);
  const segments = toSpeakerRuns(words);
  const speakers = new Set(words.map((word) => word.speaker).filter((s) => s !== undefined));

  const root = isJsonObject(data) ? data : {};
  const result = isJsonObject(root.result) ? root.result : root;
  const usage = isJsonObject(result.usage) ? result.usage : {};
  const neurons = usage.neurons;
  const detected = alternative.detected_language;
  const language = requestedLanguage || (typeof detected === "string" ? detected : "");

  return {
    task: "transcribe",
    ...(language ? { language } : {}),
    duration: words.length ? words[words.length - 1].end : 0,
    text,
    words,
    segments,
    ...(speakers.size ? { num_speakers: speakers.size } : {}),
    ...(typeof neurons === "number" && Number.isFinite(neurons) ? { usage: { neurons } } : {}),
  };
}

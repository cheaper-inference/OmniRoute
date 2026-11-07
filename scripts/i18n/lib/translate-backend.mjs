/**
 * OmniRoute — shared translation backend for the i18n tooling.
 *
 * Thin OpenAI-compatible chat-completions client used by
 * `scripts/i18n/sync-ui-keys.mjs` (and the locale bootstrap orchestrator that
 * builds on it) to translate UI strings. Configuration comes from the
 * environment only — this module never reads `.env` itself; the calling
 * script is responsible for loading it before `backendConfig()` runs:
 *
 *   OMNIROUTE_TRANSLATION_API_URL     base URL (…/v1) of the chat backend
 *   OMNIROUTE_TRANSLATION_API_KEY     bearer token
 *   OMNIROUTE_TRANSLATION_MODEL       model id
 *   OMNIROUTE_TRANSLATION_TIMEOUT_MS  per-request timeout (default 60000)
 *   OMNIROUTE_TRANSLATION_REASONING_EFFORT  optional, sent as-is when set
 *
 * Two translation modes are exposed:
 *   - `translateString(en, localeEntry, backend)` — one request per string.
 *   - `translateBatch(entries, localeEntry, backend)` — up to N strings per
 *     request, sent and returned as a JSON object keyed by caller-chosen ids.
 *     `parseBatchResponse` is the pure parser behind it; it throws whenever the
 *     model's answer cannot be trusted (not a JSON object, missing id,
 *     non-string or empty value) so callers can fall back to per-string calls.
 *
 * `localeEntry` is an entry of `config/i18n.json` (`code`, `english`, `native`,
 * `name`).
 */

import { translateStringsWithGoogle } from "./google-translate.mjs";
import process from "node:process";

function logWarn(...parts) {
  console.warn("[i18n-translate-backend] WARN", ...parts);
}

export function requireEnv(name) {
  const v = process.env[name];
  if (!v || !v.trim()) {
    throw new Error(
      `Missing required env var: ${name}. Set it in .env (see docs/guides/I18N.md → "Translation pipeline").`
    );
  }
  return v.trim();
}

/**
 * Pure over an env map. The primary model plus the optional fallback chain from
 * `OMNIROUTE_TRANSLATION_FALLBACK_MODELS` (comma-separated, in order; blanks and repeats of the
 * primary dropped). A wave used to stop dead when the one configured route hit its weekly quota
 * (Codex 429 until ~2026-10-24, release/v3.8.53 stuck with 14 drifted sources); with a chain,
 * each request moves to the next model when the current one fails for good.
 */
export function resolveModelChain(env = process.env) {
  const model = (env.OMNIROUTE_TRANSLATION_MODEL ?? "").trim();
  const seen = new Set([model]);
  const fallbackModels = String(env.OMNIROUTE_TRANSLATION_FALLBACK_MODELS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s && !seen.has(s) && seen.add(s));
  return { model, fallbackModels, models: [model, ...fallbackModels].filter(Boolean) };
}

/**
 * Pure. Whether a failed request deserves the next model of the chain. Quota, auth, missing
 * model, upstream errors, timeouts and network failures do; a request the backend rejected as
 * malformed (400/413/422) would fail identically everywhere and is thrown as-is.
 */
export function isFallbackWorthy(err) {
  const m = /upstream (\d{3})/.exec(String(err?.message ?? err));
  if (!m) return true;
  return !["400", "413", "422"].includes(m[1]);
}

// ----- Google fallback ---------------------------------------------------------------
// The LLM backend runs out of quota or credits (Codex weekly 429, 402 on a paid route) and a
// marker run used to stop until it came back. Every LLM entry point below now falls back to the
// structure-safe Google engine (lib/google-translate.mjs) when the model chain fails, and the
// first quota / credit / auth failure flips the whole process to Google, so the remaining keys
// do not each wait for an LLM round-trip that is known to fail.
//   OMNIROUTE_TRANSLATION_ENGINE=google      Google only (no LLM variables needed)
//   OMNIROUTE_TRANSLATION_GOOGLE_FALLBACK=0  disable the fallback

export function translationEngine(env = process.env) {
  return (env.OMNIROUTE_TRANSLATION_ENGINE || "llm").trim().toLowerCase() === "google"
    ? "google"
    : "llm";
}

export function googleFallbackEnabled(env = process.env) {
  return (env.OMNIROUTE_TRANSLATION_GOOGLE_FALLBACK ?? "1").trim() !== "0";
}

/** Pure. Errors after which the LLM backend is not worth trying again in this process. */
export function isQuotaLike(err) {
  return /upstream (401|402|403|429)\b|quota|credit|insufficient|billing|exhausted|payment/i.test(
    String(err?.message ?? err)
  );
}

export const llmCircuit = { open: false, reason: "", failures: 0 };

// Consecutive LLM failures (any fallback-worthy kind) after which the circuit opens: a hung or
// unreachable backend fails every request after its full timeout, so three in a row is enough.
export const LLM_FAILURE_LIMIT = 3;

export function resetLlmCircuit() {
  llmCircuit.open = false;
  llmCircuit.reason = "";
  llmCircuit.failures = 0;
}

/** Records an LLM failure; returns true when this failure opened the circuit. */
export function noteLlmFailure(err) {
  llmCircuit.failures++;
  if (llmCircuit.open) return false;
  if (!isQuotaLike(err) && llmCircuit.failures < LLM_FAILURE_LIMIT) return false;
  llmCircuit.open = true;
  llmCircuit.reason = String(err?.message ?? err).slice(0, 160);
  return true;
}

export function noteLlmSuccess() {
  llmCircuit.failures = 0;
}

function useGoogleFirst(backend) {
  return (backend?.engine ?? translationEngine()) === "google" || llmCircuit.open;
}

/**
 * Runs the LLM path, and on failure (or with the circuit open / the google engine) the Google
 * path. `google()` returning null for an item means that item could not be produced safely.
 */
export async function withGoogleFallback(llm, google, label = "translation", backend = null) {
  if (useGoogleFirst(backend)) return google();
  try {
    const value = await llm();
    noteLlmSuccess();
    return value;
  } catch (err) {
    const fallback = backend?.googleFallback ?? googleFallbackEnabled();
    // A malformed request (400/413/422) is the caller's bug and stays loud, like the model chain
    // treats it; quota, credits, auth, 5xx, timeouts and network failures go to Google.
    if (!fallback || !(isFallbackWorthy(err) || isQuotaLike(err))) throw err;
    if (noteLlmFailure(err)) {
      logWarn(`LLM backend unavailable (${llmCircuit.reason}) — the rest of this run uses Google`);
    } else {
      logWarn(`${label}: LLM failed (${String(err?.message ?? err).slice(0, 120)}) — using Google`);
    }
    return google();
  }
}

function googleStrings(texts, localeEntry, backend) {
  return (backend?.googleStrings ?? translateStringsWithGoogle)(texts, localeEntry.code, {
    protectedTerms: ["OmniRoute"],
  });
}

export function backendConfig() {
  if (translationEngine() === "google") {
    return {
      engine: "google",
      apiUrl: "google-translate",
      model: "google",
      fallbackModels: [],
      timeoutMs: 30000,
    };
  }
  const apiUrl = requireEnv("OMNIROUTE_TRANSLATION_API_URL").replace(/\/$/, "");
  const apiKey = requireEnv("OMNIROUTE_TRANSLATION_API_KEY");
  const model = requireEnv("OMNIROUTE_TRANSLATION_MODEL");
  const { fallbackModels } = resolveModelChain();
  const timeoutMs = Number(process.env.OMNIROUTE_TRANSLATION_TIMEOUT_MS || 60000);
  const reasoningEffort = process.env.OMNIROUTE_TRANSLATION_REASONING_EFFORT?.trim();
  return {
    apiUrl,
    apiKey,
    model,
    fallbackModels,
    timeoutMs,
    ...(reasoningEffort ? { reasoningEffort } : {}),
  };
}

/**
 * One request through the model chain: the configured model first, then each fallback in
 * order whenever the previous one failed for a reason the next model could fix
 * (`isFallbackWorthy`). Every model keeps `callChatOnce`'s own single retry on transient
 * failures, so a chain of two models makes at most four attempts per request.
 */
export async function callChat(messages, backend, retry = 0) {
  const chain = [backend.model, ...(backend.fallbackModels ?? [])].filter(Boolean);
  let lastErr;
  for (let i = 0; i < chain.length; i++) {
    try {
      const content = await callChatOnce(messages, { ...backend, model: chain[i] }, retry);
      if (i > 0) console.warn(`[i18n-fallback] success index=${i}`);
      return content;
    } catch (err) {
      lastErr = err;
      if (i < chain.length - 1 && isFallbackWorthy(err)) {
        console.warn(`[i18n-fallback] attempt index=${i + 1}`);
        continue;
      }
      throw err;
    }
  }
  throw lastErr ?? new Error("no translation model configured");
}

export async function callChatOnce(
  messages,
  { apiUrl, apiKey, model, timeoutMs, reasoningEffort },
  retry = 0
) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${apiUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.15,
        stream: false,
        ...(reasoningEffort ? { reasoning_effort: reasoningEffort } : {}),
      }),
      signal: ctrl.signal,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      const transient = res.status === 408 || res.status === 429 || res.status >= 500;
      if (transient && retry < 1) {
        const wait = 1500 + retry * 1500;
        logWarn(`upstream ${res.status} — retrying after ${wait}ms`);
        await new Promise((r) => setTimeout(r, wait));
        return callChatOnce(
          messages,
          { apiUrl, apiKey, model, timeoutMs, reasoningEffort },
          retry + 1
        );
      }
      throw new Error(`upstream ${res.status}: ${text.slice(0, 200)}`);
    }
    const json = await res.json();
    const content = json?.choices?.[0]?.message?.content;
    if (typeof content !== "string" || !content) {
      throw new Error("upstream returned empty content");
    }
    return content;
  } catch (err) {
    if (err?.name === "AbortError") {
      if (retry < 1) {
        logWarn(`timeout after ${timeoutMs}ms — retrying`);
        return callChatOnce(
          messages,
          { apiUrl, apiKey, model, timeoutMs, reasoningEffort },
          retry + 1
        );
      }
      throw new Error(`timeout after ${timeoutMs}ms`);
    }
    if (
      retry < 1 &&
      err instanceof TypeError &&
      /fetch failed|ECONN|ENOTFOUND|network/i.test(String(err.cause ?? err.message))
    ) {
      logWarn(`network error: ${err.message} — retrying`);
      await new Promise((r) => setTimeout(r, 1500));
      return callChatOnce(
        messages,
        { apiUrl, apiKey, model, timeoutMs, reasoningEffort },
        retry + 1
      );
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

// ----- Per-string mode -----------------------------------------------------

export const TRANSLATION_SYSTEM = (englishName, native) =>
  [
    `You are a professional translator for technical software UI strings.`,
    `Translate the user's English UI string into ${englishName} (native: ${native}).`,
    `Return ONLY the translated string — no quotes, no commentary, no surrounding markdown.`,
    `Preserve placeholders such as {name}, {{count}}, %s, %d, and any HTML tags exactly.`,
    `Keep rich-text tag names (<em>, <prefix>, and any other <tag>) exactly as written — translate the text around them, never the tag names themselves.`,
    `Do NOT translate command names (npm/git/curl/etc), code identifiers, URLs, or environment variable names.`,
    `Keep the same casing style (Title Case stays Title Case, sentence case stays sentence case).`,
    `Keep punctuation and trailing whitespace identical to the source.`,
  ].join(" ");

/**
 * Restores the ICU literal escape the backends drop around angle placeholders.
 *
 * English writes `'<name>'`: those single quotes are ICU's escape, so the span
 * renders as the literal text `<name>`. Translations come back as a bare
 * `<nome>`, which ICU then parses as an (unclosed) tag and the message fails to
 * compile — every locale in the first batch shipped two of these.
 *
 * Only messages whose English side quotes EVERY angle span are touched: when the
 * source mixes real markup (`<b>`) with a literal span there is no safe way to
 * tell which is which, so the translation is left exactly as it came back. An
 * apostrophe inside the span is doubled, otherwise it closes the literal early.
 */
export function preserveIcuLiteralQuotes(englishValue, translated) {
  if (typeof englishValue !== "string" || typeof translated !== "string") return translated;
  if (!englishValue.includes("'<")) return translated;
  // Every "<" in the source must be the start of an escaped span.
  for (let i = 0; i < englishValue.length; i++) {
    if (englishValue[i] === "<" && englishValue[i - 1] !== "'") return translated;
  }
  return translated.replace(
    /(?<!')<([^<>]*)>(?!')/g,
    (_m, inner) => `'<${inner.replace(/'/g, "''")}>'`
  );
}

export async function translateString(englishValue, localeEntry, backend) {
  const englishName = localeEntry.english ?? localeEntry.name;
  const native = localeEntry.native ?? localeEntry.name;
  const messages = [
    { role: "system", content: TRANSLATION_SYSTEM(englishName, native) },
    { role: "user", content: englishValue },
  ];
  let viaGoogle = false;
  const out = await withGoogleFallback(
    () => (backend.callChat ?? callChat)(messages, backend),
    async () => {
      viaGoogle = true;
      const [value] = await googleStrings([englishValue], localeEntry, backend);
      if (value == null) throw new Error("google translate could not restore the string");
      return value;
    },
    `string for ${localeEntry.code}`,
    backend
  );
  return viaGoogle ? out : preserveIcuLiteralQuotes(englishValue, out.trim());
}

// ----- Batch mode ----------------------------------------------------------

export const BATCH_SYSTEM = (englishName, native) =>
  [
    `You are a professional UI translator for a developer tool (OmniRoute).`,
    `Translate every value of the JSON object the user sends from English into ${englishName} (native: ${native}).`,
    `Keep the keys EXACTLY as given. Keep ICU placeholders like {count} or {name}, HTML tags, product names, provider names, URLs, file paths and code unchanged.`,
    `Keep rich-text tag names (<em>, <prefix>, and any other <tag>) exactly as written — translate the text around them, never the tag names themselves.`,
    `Return ONLY a JSON object with the same keys and translated string values — no prose, no markdown fence.`,
  ].join(" ");

/**
 * Pure parser for a batch answer. Accepts a bare JSON object or one wrapped in
 * a ```json fence; anything else (prose around the object, arrays, invalid
 * JSON) throws. Every id in `expectedIds` must be present as an OWN property
 * (an inherited name such as `constructor` counts as missing) with a non-empty
 * string value — an empty translation would replace the `__MISSING__` marker
 * for good, so it fails the batch instead (the per-string path rejects empty
 * completions the same way). Values are trimmed, like `translateString` does.
 *
 * @param {string} text raw assistant content
 * @param {string[]} expectedIds ids the caller sent (and expects back)
 * @returns {Map<string, string>} id → translated value, in `expectedIds` order
 */
export function parseBatchResponse(text, expectedIds) {
  const trimmed = String(text)
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
  if (!trimmed.startsWith("{") || !trimmed.endsWith("}")) {
    throw new Error("batch response is not a JSON object");
  }
  let parsed;
  try {
    parsed = JSON.parse(trimmed);
  } catch (err) {
    throw new Error(`batch response is not valid JSON: ${err.message}`);
  }
  const out = new Map();
  for (const id of expectedIds) {
    if (!Object.hasOwn(parsed, id)) throw new Error(`batch response missing id ${id}`);
    if (typeof parsed[id] !== "string") {
      throw new Error(`batch response has non-string value for ${id}`);
    }
    const value = parsed[id].trim();
    if (!value) throw new Error(`batch response has empty value for ${id}`);
    out.set(id, value);
  }
  return out;
}

/**
 * Translates up to N strings in ONE chat request. `entries` are
 * `{ id, text }` pairs; the ids are echoed back as the keys of the answer.
 * Throws (via `callChat` or `parseBatchResponse`) when the batch cannot be
 * trusted — callers are expected to fall back to `translateString`.
 *
 * @returns {Promise<Map<string, string>>} id → translated value
 */
export async function translateBatch(entries, localeEntry, backend) {
  const englishName = localeEntry.english ?? localeEntry.name;
  const native = localeEntry.native ?? localeEntry.name;
  const payload = Object.fromEntries(entries.map((e) => [e.id, e.text]));
  const messages = [
    { role: "system", content: BATCH_SYSTEM(englishName, native) },
    { role: "user", content: JSON.stringify(payload) },
  ];
  let viaGoogle = false;
  const out = await withGoogleFallback(
    () => (backend.callChat ?? callChat)(messages, backend),
    async () => {
      viaGoogle = true;
      const values = await googleStrings(
        entries.map((e) => e.text),
        localeEntry,
        backend
      );
      // an unrestorable item fails the batch: the caller retries one by one
      if (values.some((v) => v == null)) {
        throw new Error("google translate could not restore a batch item");
      }
      return new Map(entries.map((e, i) => [e.id, values[i]]));
    },
    `batch of ${entries.length} for ${localeEntry.code}`,
    backend
  );
  if (viaGoogle) return out;
  // A parse failure stays loud: the caller falls back to per-string translation.
  const parsed = parseBatchResponse(
    out,
    entries.map((e) => e.id)
  );
  for (const entry of entries) {
    if (parsed.has(entry.id)) {
      parsed.set(entry.id, preserveIcuLiteralQuotes(entry.text, parsed.get(entry.id)));
    }
  }
  return parsed;
}

// ----- Multi-locale batch mode -----------------------------------------------
// One chat request translates up to N keys into M locales. The answer is one
// JSON object per line, one line per locale: `{"<code>":{"<id>":"<value>"}}`.
// A broken line fails only its own locale — the other lines still apply, and
// the caller retries the failed locales through the single-locale path.

export function multiLocaleBatchSystem(targetDescs) {
  const targets = targetDescs.map((l) => `${l.code} = ${l.english ?? l.code}`).join(", ");
  const count = targetDescs.length;
  return [
    `You translate short interface strings from English into each target language. Target languages (code = name): ${targets}.`,
    `Keep ICU placeholders like {count}, plural syntax, rich-text tags (never translate a tag name), URLs and quoted '<name>' spans unchanged.`,
    `Answer with exactly ${count} line${count === 1 ? "" : "s"}, one JSON object per line, one line per target language in the order given, keeping the ids of the input object: {"<code>":{"<id>":"<translation>"}}. No prose, no code fence.`,
  ].join("\n");
}

// Repair candidates for a single answer line, mirroring the tolerant reader
// of the local translation launcher: a trailing brace too many or missing.
function repairLocaleLine(line) {
  const candidates = [
    line,
    line.replace(/\}\s*$/, ""),
    `${line}}`,
    line.replace(/\}\s*\}\s*$/, "}"),
  ];
  for (const candidate of candidates) {
    try {
      const parsed = JSON.parse(candidate);
      if (parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      /* try the next candidate */
    }
  }
  return null;
}

/**
 * Pure parser for a multi-locale batch answer. Tries a whole JSON object
 * first, then falls back to one JSON object per line. Every expected locale
 * must map to an OWN object holding every expected id as an OWN non-empty
 * string; locales that fail this check land in `failedLocales` instead of
 * failing the whole parse. Unknown locale codes are ignored, the first
 * occurrence of a duplicated code wins, values are trimmed.
 *
 * @param {string} text raw assistant content
 * @param {string[]} expectedLocaleCodes locale codes the caller sent
 * @param {string[]} expectedIds short caller ids (`1..K`) used in the request
 * @returns {{ perLocale: Map<string, Map<string, string>>, failedLocales: string[] }}
 */
export function parseMultiLocaleBatchResponse(text, expectedLocaleCodes, expectedIds) {
  const expected = new Set(expectedLocaleCodes);
  // Strip fences and per-line trailing commas so pasted answers still parse.
  const cleaned = String(text)
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
  const merged = new Map();
  const record = (code, row) => {
    if (!expected.has(code) || merged.has(code)) return;
    if (row === null || typeof row !== "object" || Array.isArray(row)) return;
    merged.set(code, row);
  };
  if (cleaned) {
    // Whole-object attempt: `{"fr":{"1":"x"},"de":{"1":"y"}}`.
    let whole = null;
    try {
      const parsed = JSON.parse(cleaned);
      if (parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)) whole = parsed;
    } catch {
      whole = null;
    }
    if (whole) {
      for (const [code, row] of Object.entries(whole)) record(code, row);
    } else {
      for (const raw of cleaned.split("\n")) {
        const line = raw.trim().replace(/,$/, "");
        if (!line) continue;
        const parsed = repairLocaleLine(line);
        if (!parsed) continue;
        for (const [code, row] of Object.entries(parsed)) record(code, row);
      }
    }
  }
  const perLocale = new Map();
  const failedLocales = [];
  for (const code of expectedLocaleCodes) {
    const row = merged.get(code);
    if (row === undefined) {
      failedLocales.push(code);
      continue;
    }
    const values = new Map();
    let ok = true;
    for (const id of expectedIds) {
      if (!Object.hasOwn(row, id) || typeof row[id] !== "string") {
        ok = false;
        break;
      }
      const value = row[id].trim();
      if (!value) {
        ok = false;
        break;
      }
      values.set(id, value);
    }
    if (ok) perLocale.set(code, values);
    else failedLocales.push(code);
  }
  return { perLocale, failedLocales };
}

/**
 * Translates up to N keys into M locales in ONE chat request. `keyEntries`
 * are `{ id, text }` pairs using the caller's key paths; the request uses
 * short ids (`1..K`) so the answer repeats less text, and the returned maps
 * are keyed back by caller id. Returns a partial result when at least one
 * locale parses — the caller retries `failedLocales` through `translateBatch`.
 * Throws when the request itself fails or when no locale could be read.
 *
 * @returns {Promise<{ perLocale: Map<string, Map<string, string>>, failedLocales: string[] }>}
 */
export async function translateMultiLocaleBatch(keyEntries, localeEntries, backend) {
  const ids = keyEntries.map((_, i) => String(i + 1));
  const payload = Object.fromEntries(keyEntries.map((e, i) => [ids[i], e.text]));
  const messages = [
    { role: "system", content: multiLocaleBatchSystem(localeEntries) },
    { role: "user", content: JSON.stringify(payload) },
  ];
  const expectedCodes = localeEntries.map((l) => l.code);
  const viaGoogle = async () => {
    const perLocale = new Map();
    const failedLocales = [];
    await Promise.all(
      localeEntries.map(async (loc) => {
        const values = await googleStrings(
          keyEntries.map((e) => e.text),
          loc,
          backend
        );
        if (values.some((v) => v == null)) failedLocales.push(loc.code);
        else perLocale.set(loc.code, new Map(keyEntries.map((e, i) => [e.id, values[i]])));
      })
    );
    if (perLocale.size === 0 && expectedCodes.length > 0) {
      throw new Error("multi-locale batch translated no locale: google could not restore any");
    }
    return { perLocale, failedLocales };
  };
  if (useGoogleFirst(backend)) return viaGoogle();
  let out;
  try {
    out = await (backend.callChat ?? callChat)(messages, backend);
  } catch (err) {
    return withGoogleFallback(
      () => Promise.reject(err),
      viaGoogle,
      `multi-locale batch of ${keyEntries.length}`,
      backend
    );
  }
  const parsed = parseMultiLocaleBatchResponse(out, expectedCodes, ids);
  const perLocale = new Map();
  for (const [code, values] of parsed.perLocale) {
    const mapped = new Map();
    keyEntries.forEach((entry, i) => {
      const value = values.get(ids[i]);
      mapped.set(entry.id, preserveIcuLiteralQuotes(entry.text, value));
    });
    perLocale.set(code, mapped);
  }
  if (perLocale.size === 0 && expectedCodes.length > 0) {
    throw new Error("multi-locale batch translated no locale: no locale translated");
  }
  return { perLocale, failedLocales: parsed.failedLocales };
}

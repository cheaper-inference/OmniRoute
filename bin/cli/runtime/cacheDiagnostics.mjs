import { channel } from "node:diagnostics_channel";
import { createHmac, randomBytes } from "node:crypto";
import { resolveDataDir } from "../data-dir.mjs";
import { createCacheUsageParser } from "./cacheDiagnosticsProtocol.mjs";
import { createCacheDiagnosticsSink } from "./cacheDiagnosticsSink.mjs";
import { createTokenBreakdown } from "./tokenBreakdown.mjs";
import { runtimeDiagnosticsLog } from "./runtimeDiagnosticsLog.mjs";
const MAX_BODY = 8 * 1024 * 1024;
const noop = { async stop() {} };

/** Bundled fetch body channels first shipped in Undici 7.11; Node 22 bundles 6.x.
 * Channel subscription alone is not a publisher capability check. */
export function supportsCacheBodyDiagnostics(version = process.versions.undici) {
  const match = /^(\d+)\.(\d+)\.(\d+)/.exec(version ?? "");
  return Boolean(match && (+match[1] > 7 || (+match[1] === 7 && +match[2] >= 11)));
}

/** Only the two known HTTPS transports are observed; never persist URLs, headers or raw bodies. */
function endpoint(request) {
  try {
    const origin = new URL(String(request.origin));
    const url = new URL(request.path, origin);
    if (url.origin !== origin.origin || request.method !== "POST" || url.protocol !== "https:")
      return null;
    if (
      url.hostname === "api.openai.com" &&
      ["/v1/responses", "/v1/chat/completions"].includes(url.pathname)
    )
      return "openai";
    if (url.hostname === "chatgpt.com" && url.pathname === "/backend-api/codex/responses")
      return "codex";
  } catch {
    /* An unrelated malformed request is not diagnostic evidence. */
  }
  return null;
}
/** Read a lower-case header name from Undici pairs or a header object; missing values are empty. */
function header(headers, name) {
  if (Array.isArray(headers)) {
    for (let i = 0; i < headers.length; i += 2)
      if (String(headers[i]).toLowerCase() === name) return String(headers[i + 1] ?? "");
  } else if (headers && typeof headers === "object") {
    for (const [key, value] of Object.entries(headers))
      if (key.toLowerCase() === name) return String(value);
  }
  return "";
}

/** Passive, explicitly enabled observer; every synchronous diagnostic callback is fail-safe. */
export function startCacheDiagnostics({
  env = process.env,
  dataDir = resolveDataDir(),
  sinkFactory = createCacheDiagnosticsSink,
  log = runtimeDiagnosticsLog,
  pendingTimeoutMs = 120000,
  tokenCounter,
  // Internal test seam for an owned local fetch service; the CLI always uses endpoint().
  requestClassifier = endpoint,
} = {}) {
  if (env.OMNIROUTE_CACHE_DIAGNOSTICS !== "1") return noop;
  let sink;
  try {
    sink = sinkFactory(dataDir);
  } catch {
    log("WARNING", "Private cache diagnostics could not initialize");
    return noop;
  }
  const bodySupported = supportsCacheBodyDiagnostics();
  if (!bodySupported)
    log(
      "WARNING",
      "Cache body diagnostics unavailable with bundled fetch; body and token observations are unsupported"
    );
  const key = randomBytes(32),
    pending = new Map(),
    groups = new Map(),
    subscriptions = [];
  /** Hash request material with a per-run key so persisted fingerprints cannot link separate runs. */
  const fingerprint = (value) => createHmac("sha256", key).update(value).digest("hex");
  const counter =
    bodySupported && env.OMNIROUTE_TOKEN_BREAKDOWN === "1"
      ? (tokenCounter ?? createTokenBreakdown())
      : null;
  let stopped = false;
  /** Register a guarded diagnostic listener and retain it for shutdown unsubscription. */
  function listen(name, fn) {
    const target = channel(`undici:request:${name}`);
    const callback = (message) => {
      if (!stopped)
        try {
          fn(message);
        } catch {
          log("WARNING", "Cache observation was unavailable");
        }
    };
    target.subscribe(callback);
    subscriptions.push([target, callback]);
  }
  /** Remove one pending request and persist only its bounded usage observation and fingerprints. */
  function finish(request, failure) {
    const entry = pending.get(request);
    if (!entry) return;
    pending.delete(request);
    const observation = entry.parser?.finish() ?? {
      status: "unavailable",
      terminal: false,
      inputTokens: null,
      outputTokens: null,
      cacheReadTokens: null,
      cacheWriteTokens: null,
    };
    sink.write({
      event: "cache_usage",
      provider: entry.provider,
      requestFingerprint: entry.fingerprint ?? null,
      requestState: entry.requestState,
      sessionKnown: entry.sessionKnown ?? false,
      accountKnown: entry.accountKnown ?? false,
      inputHeadFingerprint: entry.inputHeadFingerprint ?? null,
      itemFingerprints: entry.itemFingerprints ?? [],
      omittedItems: entry.omittedItems ?? 0,
      sameCapturedBody: entry.sameCapturedBody ?? null,
      ...observation,
      status: failure ?? entry.responseState ?? observation.status,
    });
  }
  listen("create", ({ request }) => {
    // The existing dispatch context carries trusted per-key noLog policy across fetch adapters.
    if (
      globalThis[Symbol.for("omniroute.providerRequestCapture.state")]?.context?.getStore()?.capture
        ?.diagnosticsOptOut === true
    )
      return;
    const provider = requestClassifier(request);
    if (!provider || pending.size >= 8) return;
    pending.set(request, {
      provider,
      started: Date.now(),
      chunks: [],
      bytes: 0,
      requestState: bodySupported ? "unavailable" : "unsupported_body_diagnostics",
      responseState: bodySupported ? undefined : "unsupported_body_diagnostics",
    });
  });
  listen("bodyChunkSent", ({ request, chunk }) => {
    const entry = pending.get(request);
    if (!bodySupported || !entry || entry.requestState === "oversized") return;
    const bytes = Buffer.from(chunk);
    entry.bytes += bytes.length;
    if (entry.bytes > MAX_BODY) {
      entry.chunks = [];
      entry.requestState = "oversized";
      return;
    }
    entry.chunks.push(bytes);
  });
  listen("bodySent", ({ request }) => {
    const entry = pending.get(request);
    if (!bodySupported || !entry || entry.requestState === "oversized" || !entry.bytes) return;
    const bytes = Buffer.concat(entry.chunks);
    entry.chunks = [];
    const work = setImmediate(() => {
      if (stopped) return;
      try {
        const body = JSON.parse(bytes.toString("utf8"));
        entry.requestState = "captured";
        entry.fingerprint = fingerprint(bytes);
        const session =
          header(request.headers, "session_id") ||
          header(request.headers, "session-id") ||
          header(request.headers, "x-claude-code-session-id") ||
          body.session_id ||
          body.prompt_cache_key;
        const items = Array.isArray(body.messages)
          ? body.messages
          : Array.isArray(body.input)
            ? body.input
            : [];
        entry.inputHeadFingerprint = fingerprint(
          JSON.stringify(body.messages ?? body.input ?? "").slice(0, 8192)
        );
        entry.itemFingerprints = items
          .slice(0, 256)
          .map((item) => fingerprint(JSON.stringify(item)));
        entry.omittedItems = Math.max(0, items.length - 256);
        entry.accountKnown = Boolean(
          header(request.headers, "authorization") || header(request.headers, "chatgpt-account-id")
        );
        entry.sessionKnown = typeof session === "string" && session.length > 0;
        const group = fingerprint(
          JSON.stringify([
            entry.provider,
            header(request.headers, "authorization"),
            header(request.headers, "chatgpt-account-id"),
            body.model,
            entry.sessionKnown ? session : null,
          ])
        );
        entry.sameCapturedBody = groups.has(group) ? groups.get(group) === entry.fingerprint : null;
        groups.delete(group);
        groups.set(group, entry.fingerprint);
        if (groups.size > 64) groups.delete(groups.keys().next().value);
        if (counter)
          void counter.submit(bytes).then((result) => {
            if (!stopped)
              sink.write({
                event: "token_breakdown",
                provider: entry.provider,
                requestFingerprint: entry.fingerprint,
                ...result,
              });
          });
      } catch {
        entry.requestState = "invalid_json";
      }
    });
    work.unref();
  });
  listen("headers", ({ request, response }) => {
    const entry = pending.get(request);
    if (!entry || !bodySupported) return;
    const encoding = header(response.headers, "content-encoding");
    if (encoding && encoding.toLowerCase() !== "identity") {
      entry.responseState = "unsupported_encoding";
      return;
    }
    entry.parser = createCacheUsageParser({
      sse: header(response.headers, "content-type").includes("text/event-stream"),
    });
  });
  listen("bodyChunkReceived", ({ request, chunk }) => {
    pending.get(request)?.parser?.push(chunk);
  });
  listen("trailers", ({ request }) => {
    const work = setImmediate(() => finish(request));
    work.unref();
  });
  listen("error", ({ request }) => finish(request, "transport_error"));
  const timer = setInterval(
    () => {
      for (const [request, entry] of pending)
        if (Date.now() - entry.started >= pendingTimeoutMs) finish(request, "timeout");
    },
    Math.min(1000, pendingTimeoutMs)
  );
  timer.unref();
  if (bodySupported) log("INFO", "Private cache diagnostics enabled");
  return {
    /** Unsubscribe observers, discard pending bodies, and await worker and sink cleanup. */
    async stop() {
      if (stopped) return;
      stopped = true;
      clearInterval(timer);
      for (const [target, fn] of subscriptions) target.unsubscribe(fn);
      pending.clear();
      groups.clear();
      await counter?.stop();
      await sink.close();
      log("DEBUG", "Private cache diagnostics stopped");
    },
  };
}

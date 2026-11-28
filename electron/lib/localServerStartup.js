/**
 * localServerStartup.js — start the embedded OmniRoute server on the next free port.
 *
 * The desktop shell asks the embedded server for its default port (20128). When that port is
 * taken, the opt-in flow below tries the next five (20129 to 20133), one at a time, and only
 * trusts what the spawned child reports over its private IPC channel:
 *
 *   - `omniroute:embedded-bound`        the child's main listener is bound on `port`
 *   - `omniroute:embedded-bind-failed`  the child's main listener could not bind (`code`)
 *
 * A health check never proves a port is ours: another program on 20128 can answer 200. Only the
 * bind confirmed by the CURRENT child (right token, right port) plus a health check of that
 * same port authorizes `publish()`, which is where the caller updates its URL, tray, IPC and
 * client snippets. Nothing here reserves and releases a port to "test" it, and there is no
 * ephemeral-port fallback.
 *
 * This module stays CommonJS and dependency-free: the packaged app does not ship zod, so the
 * IPC events and the flag value are validated by hand with the same strictness a schema would
 * give (exact type, integer port in range, bounded string code, matching attempt token).
 *
 * @typedef {{ type: "omniroute:embedded-bound", port: number, token: string }} EmbeddedBoundEvent
 * @typedef {{ type: "omniroute:embedded-bind-failed", port: number, code: string, token: string }} EmbeddedBindFailedEvent
 * @typedef {EmbeddedBoundEvent | EmbeddedBindFailedEvent} EmbeddedBindEvent
 * @typedef {{ kind: "ready", port: number }
 *   | { kind: "bind-error", code: string }
 *   | { kind: "failed", reason: "exit" | "startup" | "timeout" | "cancelled" | "cleanup" }} EmbeddedStartResult
 */

const crypto = require("crypto");

const DEFAULT_EMBEDDED_PORT = 20128;
/** How many consecutive ports after the default may be tried (20129 to 20133). */
const PORT_FALLBACK_SPAN = 5;
const MAX_PORT = 65535;

const EMBEDDED_BOUND_EVENT = "omniroute:embedded-bound";
const EMBEDDED_BIND_FAILED_EVENT = "omniroute:embedded-bind-failed";

/** Opt-in flag, read from the environment by the main process before it spawns the server. */
const FALLBACK_FLAG_ENV = "ELECTRON_LOCAL_PORT_FALLBACK_ENABLED";
/** Env var carrying the per-attempt token from the shell to the child. */
const ATTEMPT_TOKEN_ENV = "OMNIROUTE_EMBEDDED_BIND_TOKEN";

const DEFAULT_STARTUP_TIMEOUT_MS = 180000;
const DEFAULT_EXIT_TIMEOUT_MS = 5000;

const TOKEN_PATTERN = /^[A-Za-z0-9-]{16,64}$/;
const CODE_PATTERN = /^[A-Z0-9_]{1,32}$/;

/** Same truthy spellings the registered feature flag accepts ("true", "1", "yes"). */
function isFallbackFlagEnabled(value) {
  if (typeof value !== "string") return false;
  const normalized = value.trim().toLowerCase();
  return normalized === "true" || normalized === "1" || normalized === "yes";
}

function isSet(value) {
  return typeof value === "string" && value.trim() !== "";
}

/**
 * Whether an old bundle's wrapper can report its bind. A bundle without the marker never emits
 * the events, so the discovery stays off and the startup is the legacy one.
 * @param {string} wrapperSource contents of the bundle's server-ws.mjs
 */
function bundleReportsBind(wrapperSource) {
  return typeof wrapperSource === "string" && wrapperSource.includes(EMBEDDED_BOUND_EVENT);
}

/**
 * Decide whether the port search may run. Every condition must hold: the flag is on, the
 * bundle reports its bind, the shell is local, graphical and packaged, the port asked for is
 * the default, and the operator set no port of their own.
 * @param {{
 *   env: Record<string, string | undefined>,
 *   requestedPort: number,
 *   remoteServerUrl?: string | null,
 *   isDev: boolean,
 *   isHeadless: boolean,
 *   bundleReportsBind: boolean | (() => boolean),
 * }} input
 * @returns {{ enabled: boolean, reason: string }}
 */
function resolveFallbackPolicy(input) {
  const { env, requestedPort } = input;
  if (!isFallbackFlagEnabled(env && env[FALLBACK_FLAG_ENV])) {
    return { enabled: false, reason: "flag-off" };
  }
  if (input.remoteServerUrl) return { enabled: false, reason: "remote-mode" };
  if (input.isDev) return { enabled: false, reason: "dev" };
  if (input.isHeadless) return { enabled: false, reason: "headless" };
  if (requestedPort !== DEFAULT_EMBEDDED_PORT) return { enabled: false, reason: "custom-port" };
  if (isSet(env.PORT) || isSet(env.OMNIROUTE_PORT)) {
    return { enabled: false, reason: "explicit-port" };
  }
  if (isSet(env.API_PORT) || isSet(env.DASHBOARD_PORT)) {
    return { enabled: false, reason: "split-port" };
  }
  // May be a function so the wrapper file is only read once everything else already allows it.
  const reportsBind =
    typeof input.bundleReportsBind === "function"
      ? input.bundleReportsBind()
      : input.bundleReportsBind;
  if (!reportsBind) return { enabled: false, reason: "legacy-bundle" };
  return { enabled: true, reason: "enabled" };
}

/** A fresh, unguessable id for one spawn attempt. */
function createAttemptToken() {
  return crypto.randomUUID();
}

/**
 * Validate one IPC message from the child. Returns the event only when it is well formed AND
 * belongs to this attempt (same port, same token); anything else is ignored by the caller.
 * @param {unknown} message
 * @param {{ port: number, token: string }} expected
 * @returns {EmbeddedBindEvent | null}
 */
function parseEmbeddedBindEvent(message, expected) {
  if (!message || typeof message !== "object" || Array.isArray(message)) return null;
  const { type, port, token, code } = /** @type {Record<string, unknown>} */ (message);
  if (type !== EMBEDDED_BOUND_EVENT && type !== EMBEDDED_BIND_FAILED_EVENT) return null;
  if (!Number.isInteger(port) || port < 1 || port > MAX_PORT) return null;
  if (typeof token !== "string" || !TOKEN_PATTERN.test(token)) return null;
  if (port !== expected.port || token !== expected.token) return null;
  if (type === EMBEDDED_BOUND_EVENT) return { type, port, token };
  if (typeof code !== "string" || !CODE_PATTERN.test(code)) return null;
  return { type, port, code, token };
}

/**
 * Try the requested port and, when allowed, the next five, strictly in order. Moves on only
 * after an `EADDRINUSE` the active child itself reported (startAttempt resolves it once that
 * child has exited). Any other outcome ends the search.
 * @param {{
 *   requestedPort: number,
 *   allowFallback: boolean,
 *   signal: AbortSignal,
 *   startAttempt: (port: number, signal: AbortSignal) => Promise<EmbeddedStartResult>,
 * }} options
 * @returns {Promise<EmbeddedStartResult>}
 */
async function startEmbeddedOnAvailablePort(options) {
  const { requestedPort, allowFallback, signal, startAttempt } = options;
  const lastPort = allowFallback
    ? Math.min(requestedPort + PORT_FALLBACK_SPAN, MAX_PORT)
    : requestedPort;

  /** @type {EmbeddedStartResult} */
  let result = { kind: "failed", reason: "cancelled" };
  for (let port = requestedPort; port <= lastPort; port += 1) {
    if (signal.aborted) return { kind: "failed", reason: "cancelled" };
    result = await startAttempt(port, signal);
    const portTaken = result.kind === "bind-error" && result.code === "EADDRINUSE";
    if (!portTaken) return result;
  }
  return result;
}

function delay(ms) {
  return new Promise((resolve) => {
    const timer = setTimeout(resolve, ms);
    if (typeof timer.unref === "function") timer.unref();
  });
}

/**
 * One spawn attempt on one port. Resolves when the child proved it is serving (bound + health
 * check on that port), proved it could not bind, or died, timed out or was cancelled. The child
 * is always gone by the time a non-ready result resolves.
 * @param {{
 *   port: number,
 *   signal: AbortSignal,
 *   deadlineAt: number,
 *   exitTimeoutMs: number,
 *   spawnChild: (port: number, token: string) => import("events").EventEmitter,
 *   stopChild: (child: any, signal?: "SIGTERM" | "SIGKILL") => void,
 *   waitUntilReady: (port: number, timeoutMs: number) => Promise<boolean>,
 *   nowFn: () => number,
 * }} attempt
 * @returns {Promise<EmbeddedStartResult>}
 */
function runEmbeddedAttempt(attempt) {
  const { port, signal, deadlineAt, exitTimeoutMs, spawnChild, stopChild, waitUntilReady, nowFn } =
    attempt;
  const token = createAttemptToken();

  return new Promise((resolve) => {
    const child = spawnChild(port, token);
    let settled = false;
    let exited = false;
    let resolveExit = () => {};
    const exitedPromise = new Promise((r) => {
      resolveExit = r;
    });
    // Permanent: whatever else happens, we need to know when this child is really gone.
    child.once("exit", () => {
      exited = true;
      resolveExit();
    });

    const timer = setTimeout(
      () => finish({ kind: "failed", reason: "timeout" }, true),
      Math.max(1, deadlineAt - nowFn())
    );
    if (typeof timer.unref === "function") timer.unref();

    /** Resolves true once the child's exit is confirmed, false when it outlived both signals. */
    async function ensureChildGone() {
      if (exited) return true;
      stopChild(child, "SIGTERM");
      await Promise.race([exitedPromise, delay(exitTimeoutMs)]);
      if (exited) return true;
      stopChild(child, "SIGKILL");
      await Promise.race([exitedPromise, delay(exitTimeoutMs)]);
      return exited;
    }

    /** Settle once. A non-ready result resolves only after the child is gone. */
    function finish(result, stopChildFirst) {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      child.removeListener("message", onMessage);
      child.removeListener("exit", onEarlyExit);
      child.removeListener("error", onError);
      signal.removeEventListener("abort", onAbort);
      const gone = stopChildFirst ? ensureChildGone() : exitedPromise.then(() => true);
      // A child that may still be alive must not be followed by another attempt, so the
      // original result (often a retryable EADDRINUSE) gives way to a terminal cleanup failure.
      gone.then((confirmed) => resolve(confirmed ? result : { kind: "failed", reason: "cleanup" }));
    }

    function onEarlyExit() {
      // Ended before reporting a bind: a startup failure, never evidence of a free port.
      finish({ kind: "failed", reason: "exit" }, false);
    }
    function onError() {
      finish({ kind: "failed", reason: "startup" }, true);
    }
    function onAbort() {
      finish({ kind: "failed", reason: "cancelled" }, true);
    }

    function onMessage(message) {
      if (settled) return;
      const event = parseEmbeddedBindEvent(message, { port, token });
      if (!event) return;
      child.removeListener("message", onMessage);
      if (event.type === EMBEDDED_BIND_FAILED_EVENT) {
        finish({ kind: "bind-error", code: event.code }, true);
        return;
      }
      // Bound: only now may the health check run, and only against this child's own port.
      const remainingMs = Math.max(1, deadlineAt - nowFn());
      waitUntilReady(port, remainingMs).then(
        (ready) => {
          if (settled) return;
          if (ready) {
            settled = true;
            clearTimeout(timer);
            child.removeListener("exit", onEarlyExit);
            child.removeListener("error", onError);
            signal.removeEventListener("abort", onAbort);
            resolve({ kind: "ready", port });
          } else {
            finish({ kind: "failed", reason: "timeout" }, true);
          }
        },
        () => finish({ kind: "failed", reason: "startup" }, true)
      );
    }

    child.on("message", onMessage);
    child.on("exit", onEarlyExit);
    child.on("error", onError);
    if (signal.aborted) onAbort();
    else signal.addEventListener("abort", onAbort, { once: true });
  });
}

/**
 * Text for the error box shown when the search ends without a serving child.
 * @param {EmbeddedStartResult} result
 * @param {number} requestedPort
 * @returns {{ title: string, message: string }}
 */
function describeStartupFailure(result, requestedPort) {
  const title = "OmniRoute could not start its local server";
  const lastPort = Math.min(requestedPort + PORT_FALLBACK_SPAN, MAX_PORT);
  if (result.kind === "bind-error" && result.code === "EADDRINUSE") {
    return {
      title,
      message: `Ports ${requestedPort} to ${lastPort} are all in use by other programs. Close one of them and start OmniRoute again.`,
    };
  }
  if (result.kind === "bind-error" && result.code === "EACCES") {
    return {
      title,
      message: `The system does not allow OmniRoute to listen on port ${requestedPort}. Check your security software or permissions and start OmniRoute again.`,
    };
  }
  if (result.kind === "bind-error") {
    return {
      title,
      message: `OmniRoute could not listen on port ${requestedPort} (${result.code}).`,
    };
  }
  if (result.kind === "failed" && result.reason === "cleanup") {
    return {
      title,
      message:
        "A previous OmniRoute server process did not exit during cleanup, so no new one was started. Quit it from your system task manager and start OmniRoute again.",
    };
  }
  const detail = result.kind === "failed" ? result.reason : "unknown";
  return {
    title,
    message: `The embedded server stopped before it was ready (${detail}). Check the application log for the server output.`,
  };
}

/**
 * Start the embedded server, searching for a free port when the policy allows it, and publish
 * the confirmed port exactly once. This is the single entry point the main process uses.
 * @param {{
 *   requestedPort: number,
 *   allowFallback: boolean,
 *   signal: AbortSignal,
 *   spawnChild: (port: number, token: string) => import("events").EventEmitter,
 *   stopChild: (child: any, signal?: "SIGTERM" | "SIGKILL") => void,
 *   waitUntilReady: (port: number, timeoutMs: number) => Promise<boolean>,
 *   publish: (port: number) => void,
 *   timeoutMs?: number,
 *   exitTimeoutMs?: number,
 *   nowFn?: () => number,
 * }} options
 * @returns {Promise<EmbeddedStartResult>}
 */
async function startLocalEmbeddedServer(options) {
  const nowFn = options.nowFn || Date.now;
  const deadlineAt = nowFn() + (options.timeoutMs || DEFAULT_STARTUP_TIMEOUT_MS);
  const exitTimeoutMs = options.exitTimeoutMs || DEFAULT_EXIT_TIMEOUT_MS;

  const result = await startEmbeddedOnAvailablePort({
    requestedPort: options.requestedPort,
    allowFallback: options.allowFallback,
    signal: options.signal,
    startAttempt: (port, signal) =>
      runEmbeddedAttempt({
        port,
        signal,
        deadlineAt,
        exitTimeoutMs,
        spawnChild: options.spawnChild,
        stopChild: options.stopChild,
        waitUntilReady: options.waitUntilReady,
        nowFn,
      }),
  });

  // A close during the final health check must not publish a port nobody serves any more.
  if (result.kind === "ready" && !options.signal.aborted) options.publish(result.port);
  if (result.kind === "ready" && options.signal.aborted) {
    return { kind: "failed", reason: "cancelled" };
  }
  return result;
}

module.exports = {
  ATTEMPT_TOKEN_ENV,
  DEFAULT_EMBEDDED_PORT,
  EMBEDDED_BIND_FAILED_EVENT,
  EMBEDDED_BOUND_EVENT,
  FALLBACK_FLAG_ENV,
  PORT_FALLBACK_SPAN,
  bundleReportsBind,
  createAttemptToken,
  describeStartupFailure,
  isFallbackFlagEnabled,
  parseEmbeddedBindEvent,
  resolveFallbackPolicy,
  runEmbeddedAttempt,
  startEmbeddedOnAvailablePort,
  startLocalEmbeddedServer,
};

// bin/cli/launch/core/errors.mjs: LaunchError taxonomy -> exit codes and output.

import { EXIT_CODES, LaunchError, isLaunchError } from "../contract.mjs";

export { EXIT_CODES, LaunchError, isLaunchError };

/** Exit code used when the child never ran and the error is not a LaunchError. */
export const INTERNAL_EXIT = EXIT_CODES.Internal;

/** Signal name -> 128 + n (run.mjs:622-624, launch.mjs:212). */
export const SIGNAL_EXIT_CODES = Object.freeze({ SIGHUP: 129, SIGINT: 130, SIGTERM: 143 });

/**
 * Any value a `throw` can carry.
 * @typedef {Error | LaunchError | string | number | boolean | object | null | undefined} Thrown
 */

/**
 * Any thrown value -> LaunchError. A LaunchError is returned unchanged; anything else becomes
 * `Internal` with a generic message (never the raw stack, Hard Rule #12).
 * @param {Thrown} error
 * @returns {LaunchError}
 */
export function toLaunchError(error) {
  if (isLaunchError(error)) return /** @type {LaunchError} */ (error);
  const detail = error instanceof Error && error.message ? `: ${error.message}` : "";
  return new LaunchError("Internal", `internal error${detail}`, { cause: error });
}

/**
 * Exit code for an error. `BudgetExceeded` (null) keeps the child's code when known, else 1.
 * @param {Thrown} error
 * @param {number} [childCode]
 */
export function exitCodeFor(error, childCode) {
  const code = toLaunchError(error).exitCode;
  if (code === null) return typeof childCode === "number" ? childCode : 1;
  return code;
}

/**
 * Text for stderr: `omnirouter: <message>` plus an indented hint line.
 * @param {Thrown} error
 * @param {{ prefix?: string }} [options]
 */
export function formatError(error, options = {}) {
  const err = toLaunchError(error);
  const prefix = options.prefix ?? "omnirouter";
  const lines = [`${prefix}: ${err.message}`];
  if (err.hint) lines.push(`  hint: ${err.hint}`);
  return `${lines.join("\n")}\n`;
}

/** `--json` error body: `{error:{code,message,hint}}`. */
export function errorJson(error) {
  return toLaunchError(error).toJSON();
}

const AUTH_STATUSES = new Set([401, 403]);
const BAD_REQUEST_STATUSES = new Set([400, 422]);

function authFailed(status, what) {
  return new LaunchError("AuthFailed", `${what} was refused (HTTP ${status})`, {
    hint: "check --api-key / --context, or log in with `omniroute login`",
  });
}

function endpointNotFound(what, code) {
  return new LaunchError(code, `${what}: endpoint not found (HTTP 404)`, {
    hint:
      code === "GatewayTooOld"
        ? "upgrade the OmniRoute gateway, or use `omniroute run <tool>` (unscoped)"
        : undefined,
  });
}

/**
 * HTTP status from a gateway call -> LaunchError, or null when the status is not an error.
 * @param {number} status
 * @param {string} what e.g. "session mint"
 * @param {{ notFound?: import("../contract.d.ts").LaunchErrorCode, badRequest?: import("../contract.d.ts").LaunchErrorCode }} [map]
 */
export function httpError(status, what, map = {}) {
  if (status >= 200 && status < 300) return null;
  if (AUTH_STATUSES.has(status)) return authFailed(status, what);
  if (status === 404 && map.notFound) return endpointNotFound(what, map.notFound);
  if (BAD_REQUEST_STATUSES.has(status) && map.badRequest) {
    return new LaunchError(map.badRequest, `${what} was rejected (HTTP ${status})`);
  }
  return new LaunchError("GatewayUnreachable", `${what} failed (HTTP ${status})`);
}

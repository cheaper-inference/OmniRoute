// bin/cli/launch/contract/errors.mjs: error codes, exit codes and LaunchError.
// Part of the launcher contract; import it through ../contract.mjs (pure: no I/O).

/** @typedef {import("../contract.d.ts").LaunchErrorCode} LaunchErrorCode */

/** Error code -> process exit code. `null` = the child's own code is kept (warnings). */
export const EXIT_CODES = Object.freeze({
  UsageError: 2,
  ModelRequired: 2,
  ModelNotFound: 2,
  ModelUnsuitable: 2,
  ConfigConflict: 2,
  UnsupportedPlatform: 2,
  AuthFailed: 77,
  GatewayUnreachable: 69,
  ToolVersionTooOld: 69,
  GatewayTooOld: 69,
  FeatureUnsupported: 69,
  PreflightFailed: 69,
  NoProviders: 69,
  ViewInvalid: 70,
  Internal: 70,
  PortInUse: 75,
  GatewayStartTimeout: 75,
  StateLocked: 75,
  ToolNotFound: 127,
  BudgetExceeded: null,
});

/** Every error code, as a frozen name -> name map (`ERROR_CODES.ModelRequired`). */
export const ERROR_CODES = Object.freeze(
  Object.fromEntries(Object.keys(EXIT_CODES).map((code) => [code, code]))
);

/** Codes an adapter's plan() may throw. */
export const ADAPTER_ERROR_CODES = Object.freeze([
  "ModelRequired",
  "ModelUnsuitable",
  "ConfigConflict",
  "UnsupportedPlatform",
  "ModelNotFound",
]);

export class LaunchError extends Error {
  /**
   * @param {LaunchErrorCode} code one of ERROR_CODES
   * @param {string} message user-facing, printed as `omnirouter: <message>`
   * @param {{ hint?: string, cause?: import("../contract.d.ts").Thrown }} [options]
   */
  constructor(code, message, options = {}) {
    if (!Object.prototype.hasOwnProperty.call(EXIT_CODES, code)) {
      throw new TypeError(`Unknown LaunchError code: ${String(code)}`);
    }
    super(message, options.cause === undefined ? undefined : { cause: options.cause });
    this.name = "LaunchError";
    this.code = code;
    if (options.hint !== undefined) this.hint = options.hint;
  }

  /** Exit code for this error; `null` means keep the child's code. */
  get exitCode() {
    return EXIT_CODES[this.code];
  }

  /** `--json` error shape: `{error:{code,message,hint}}`. */
  toJSON() {
    const error = { code: this.code, message: this.message };
    if (this.hint !== undefined) error.hint = this.hint;
    return { error };
  }
}

/** @returns {boolean} true for a LaunchError (also across module copies). */
export function isLaunchError(value) {
  return (
    value instanceof LaunchError ||
    (value instanceof Error &&
      value.name === "LaunchError" &&
      typeof value.code === "string" &&
      Object.prototype.hasOwnProperty.call(EXIT_CODES, value.code))
  );
}

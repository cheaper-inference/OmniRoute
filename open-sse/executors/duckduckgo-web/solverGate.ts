// Which DuckDuckGo anti-abuse challenge solver this process may use.
//
// The challenge program arrives from the upstream (duck.ai, base64 in the x-vqd-hash-1
// header). node:vm is not a security boundary: code evaluated in a context can walk the
// constructor chain back to the server realm and reach `process`. So the in-process
// solver is off unless the operator opts in, and the default path is the browser pool,
// where the challenge runs inside a Chromium page instead of the server process.

type EnvLike = Record<string, string | undefined>;

export const DDG_UNSAFE_NODE_SOLVER_ENV = "OMNIROUTE_DDG_UNSAFE_NODE_SOLVER";

export const DDG_SOLVER_UNAVAILABLE_MESSAGE =
  "DuckDuckGo AI Chat needs the browser pool: set OMNIROUTE_BROWSER_POOL=on. The in-process " +
  "challenge solver is off because node:vm does not isolate the upstream challenge program " +
  `from the server (${DDG_UNSAFE_NODE_SOLVER_ENV}=1 turns it back on at your own risk).`;

function isOn(raw: string | undefined): boolean {
  return raw === "1" || raw === "true" || raw === "on";
}

/** The browser-backed path (OMNIROUTE_BROWSER_POOL=on or WEB_COOKIE_USE_BROWSER=1). */
export function isDuckDuckGoBrowserBackedEnabled(env: EnvLike = process.env): boolean {
  return isOn(env.WEB_COOKIE_USE_BROWSER) || isOn(env.OMNIROUTE_BROWSER_POOL);
}

/** The in-process node:vm solver, only with an explicit opt-in. */
export function isDuckDuckGoNodeSolverEnabled(env: EnvLike = process.env): boolean {
  return isOn(env[DDG_UNSAFE_NODE_SOLVER_ENV]);
}

/** True when this process has some way to answer the challenge. */
export function canSolveDuckDuckGoChallenge(env: EnvLike = process.env): boolean {
  return isDuckDuckGoBrowserBackedEnabled(env) || isDuckDuckGoNodeSolverEnabled(env);
}

export class DuckDuckGoNodeSolverDisabledError extends Error {
  constructor() {
    super(
      `The in-process DuckDuckGo challenge solver is off (${DDG_UNSAFE_NODE_SOLVER_ENV} is not set)`
    );
    this.name = "DuckDuckGoNodeSolverDisabledError";
  }
}

let unsafeSolverWarned = false;

/** One warning per process when the operator turned the in-process solver on. */
export function warnUnsafeNodeSolverOnce(): void {
  if (unsafeSolverWarned) return;
  unsafeSolverWarned = true;
  console.warn(
    `[duckduckgo-web] ${DDG_UNSAFE_NODE_SOLVER_ENV} is on: the upstream challenge program runs ` +
      "inside the server process with node:vm, which does not isolate it. Prefer OMNIROUTE_BROWSER_POOL=on."
  );
}

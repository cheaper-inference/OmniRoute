// bin/cli/launch/core/trace.mjs: opt-in startup timing trace for `omnirouter launch`.
//
// OMNIROUTE_LAUNCH_TRACE=1 prints one stderr line per pipeline step with the milliseconds since
// process start (performance.now() counts from the process time origin). Off by default: the
// flag is read once at module load, so a disabled trace costs one boolean check per step.
// Lines carry step names only, never tokens, URLs or argv.

const ENABLED = process.env.OMNIROUTE_LAUNCH_TRACE === "1";

/** True when OMNIROUTE_LAUNCH_TRACE=1 was set at startup. */
export function traceEnabled() {
  return ENABLED;
}

/**
 * Record that `step` just finished.
 * @param {string} step short step name, e.g. "catalog fetch"
 */
export function trace(step) {
  if (!ENABLED) return;
  try {
    process.stderr.write(`omnirouter: trace ${performance.now().toFixed(1)}ms ${step}\n`);
  } catch {
    // tracing must never break a launch
  }
}

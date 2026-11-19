/**
 * Keep routine CLI failures readable. Operators can opt into stack traces
 * locally with OMNIROUTE_DEBUG_STACK=1 when diagnosing unexpected failures.
 */
export function formatCliError(error, showStack = process.env.OMNIROUTE_DEBUG_STACK === "1") {
  const message = error?.message || String(error);
  return showStack && error?.stack ? String(error.stack) : String(message);
}

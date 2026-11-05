/**
 * Provenance of process-pressure sheds.
 *
 * A `resource_pressure` / `heap_pressure` 503 means this process is shedding load from its own
 * V8/cgroup state, so retrying another combo target cannot help. The same status and body can
 * also arrive from an upstream (a chained gateway), and that one must keep ordinary fallback.
 * Only a response this process built is branded; the WeakMap identity cannot be forged by an
 * upstream body or header. Internal wrappers that must allocate a new Response inherit the brand.
 */
const localPressureResponses = new WeakSet<Response>();

/** Brand a 503 created by one of this process's pressure guards. */
export function markLocalProcessPressureResponse(response: Response): Response {
  localPressureResponses.add(response);
  return response;
}

/** True only for a pressure shed this process created (or an internal wrapper of one). */
export function isMarkedLocalProcessPressureResponse(response: Response): boolean {
  return localPressureResponses.has(response);
}

/** Preserve the brand when an internal response wrapper must allocate. */
export function inheritLocalProcessPressureResponse(source: Response, target: Response): Response {
  if (localPressureResponses.has(source)) localPressureResponses.add(target);
  return target;
}

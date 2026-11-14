// bin/cli/launch/core/pipeline/settle.mjs: settle a step started early, unwrap it when consumed.

/**
 * `start()`'s promise (or its synchronous throw) settled into `{ ok, value | error }`: never rejects,
 * so a result started early and consumed later is never an unhandled rejection.
 */
export function settle(start) {
  try {
    return Promise.resolve(start()).then(
      (value) => ({ ok: true, value }),
      (error) => ({ ok: false, error })
    );
  } catch (error) {
    return Promise.resolve({ ok: false, error });
  }
}

/** The value of a settled result, or its error thrown. */
export function unwrap(result) {
  if (result.ok) return result.value;
  throw result.error;
}

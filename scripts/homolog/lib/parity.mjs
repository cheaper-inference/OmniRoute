/**
 * Pure deployment parity assessment (testable without network).
 * @param {{status?: string, version?: string}} health corpo de /api/monitoring/health
 * @param {{expectedVersion: string, httpStatus: number}} ctx
 * @returns {{ok: boolean, failures: string[]}}
 */
export function evaluateParity(health, ctx) {
  const failures = [];
  if (ctx.httpStatus !== 200) failures.push(`health HTTP ${ctx.httpStatus} (expected 200)`);
  if (health?.status !== "healthy")
    failures.push(`status "${health?.status}" (expected "healthy")`);
  if (health?.version !== ctx.expectedVersion)
    failures.push(`version "${health?.version}" (expected "${ctx.expectedVersion}")`);
  return { ok: failures.length === 0, failures };
}

/**
 * Readiness gate for allowlisted no-auth providers in the `auto`/`auto-*` pools (#15446).
 *
 * Some no-auth providers are local CLIs (`devin-cli-agentic`): a fresh install without
 * the CLI — or with it logged out — must not put a dead candidate into every auto/*
 * pool. The probe that answers "is it ready?" spawns the CLI, so it lives in the app
 * layer and is registered at boot (`registerNoAuthReadiness`); this module keeps the
 * routing engine free of that dependency. Probes MUST be non-blocking cached reads —
 * they run on the auto-combo hot path.
 *
 * Direct `<alias>/<model>` routing is unaffected; this only gates auto/* admission.
 */

/** Returns true only when the provider is confirmed ready right now. */
export type NoAuthReadinessProbe = () => boolean;

/**
 * Providers that stay out of auto/* until a registered probe confirms them. Fail closed:
 * if the app layer never registered the probe (non-server entry, boot failure), the
 * provider is treated as not ready rather than silently admitted.
 */
const PROBE_REQUIRED = new Set<string>(["devin-cli-agentic"]);

const probes = new Map<string, NoAuthReadinessProbe>();

/** Register (or replace) the readiness probe for one no-auth provider. Idempotent. */
export function registerNoAuthReadiness(providerId: string, probe: NoAuthReadinessProbe): void {
  probes.set(providerId, probe);
}

/** True unless `providerId` needs a probe that has not confirmed it (or is missing/throws). */
export function isNoAuthProviderReadyForAutoRouting(providerId: string): boolean {
  const probe = probes.get(providerId);
  if (!probe) return !PROBE_REQUIRED.has(providerId);
  try {
    return probe() === true;
  } catch {
    return false;
  }
}

/** Test-only: forget every registered probe. */
export function __resetNoAuthReadinessForTests(): void {
  probes.clear();
}

/**
 * Read the current Antigravity timing preference without coupling this
 * physical-send transport boundary to the dashboard/settings module.
 * Explicit saved values take precedence; old fork DBs used a nested
 * resilienceSettings.antigravity.timingTelemetryEnabled field.
 */
export function resolveAntigravityTimingTelemetryEnabled(
  settings: unknown,
  envEnabled: boolean
): boolean {
  if (!settings || typeof settings !== "object" || Array.isArray(settings))
    return envEnabled;
  const root = settings as Record<string, unknown>;
  const resilience = root.resilienceSettings;
  if (!resilience || typeof resilience !== "object" || Array.isArray(resilience))
    return envEnabled;
  const stored = resilience as Record<string, unknown>;
  const next = stored.antigravityTimingTelemetry;
  if (next && typeof next === "object" && !Array.isArray(next)) {
    const enabled = (next as Record<string, unknown>).enabled;
    if (typeof enabled === "boolean") return enabled;
  }
  const legacy = stored.antigravity;
  if (legacy && typeof legacy === "object" && !Array.isArray(legacy)) {
    const enabled = (legacy as Record<string, unknown>).timingTelemetryEnabled;
    if (typeof enabled === "boolean") return enabled;
  }
  return envEnabled;
}

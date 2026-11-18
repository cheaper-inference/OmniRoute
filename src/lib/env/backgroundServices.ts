const TRUTHY_ENV_VALUES = new Set(["1", "true", "yes", "on"]);

/**
 * Whether OMNIROUTE_DISABLE_BACKGROUND_SERVICES is on. One reader for the schedulers that gate on
 * this flag, so they agree on which spellings count as "on".
 */
export function isBackgroundServicesDisabled(env: NodeJS.ProcessEnv = process.env): boolean {
  const raw = env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES;
  if (!raw) return false;
  return TRUTHY_ENV_VALUES.has(raw.trim().toLowerCase());
}

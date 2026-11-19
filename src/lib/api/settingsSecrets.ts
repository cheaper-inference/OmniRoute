/**
 * Stored settings that hold a credential. The management settings API never returns their
 * value: a configured secret reads back as {@link SETTINGS_SECRET_MASK} and an unset one stays
 * empty, so a client can still tell "configured" from "not configured". A write that sends the
 * mask back unchanged keeps the stored value, so a form that round-trips what it read cannot
 * overwrite a secret with the mask.
 */
export const SETTINGS_SECRET_KEYS = [
  "oidcClientSecret",
  "entraGraphClientSecret",
  "skillsmpApiKey",
  "cliproxyapi_api_key",
  "qdrantApiKey",
  "ngrokAuthToken",
] as const;

export const SETTINGS_SECRET_MASK = "********";

function isConfigured(value: unknown): boolean {
  if (typeof value === "string") return value.length > 0;
  return value !== null && value !== undefined && value !== false;
}

/** Copy of `settings` with every configured secret replaced by the mask. */
export function maskSecretSettings<T extends Record<string, unknown>>(settings: T): T {
  const masked: Record<string, unknown> = { ...settings };
  for (const key of SETTINGS_SECRET_KEYS) {
    if (Object.hasOwn(masked, key) && isConfigured(masked[key])) {
      masked[key] = SETTINGS_SECRET_MASK;
    }
  }
  return masked as T;
}

/** The secret keys in a settings write whose value is the mask, i.e. left unchanged. */
export function unchangedSecretSettingKeys(update: Record<string, unknown>): string[] {
  return SETTINGS_SECRET_KEYS.filter(
    (key) => Object.hasOwn(update, key) && update[key] === SETTINGS_SECRET_MASK
  );
}

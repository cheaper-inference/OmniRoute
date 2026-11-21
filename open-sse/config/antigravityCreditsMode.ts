/** Shared by the Antigravity runtime and the dashboard settings schema. */
export const ANTIGRAVITY_CREDITS_MODES = ["off", "retry", "always"] as const;
export type CreditsMode = (typeof ANTIGRAVITY_CREDITS_MODES)[number];

export function isAntigravityCreditsMode(value: unknown): value is CreditsMode {
  return ANTIGRAVITY_CREDITS_MODES.some((mode) => mode === value);
}

export function normalizeAntigravityCreditsMode(value: unknown): CreditsMode {
  const mode = typeof value === "string" ? value.trim().toLowerCase() : null;
  return isAntigravityCreditsMode(mode) ? mode : "off";
}

/** Stored overrides are canonical only; fail closed on corrupt or manually imported values. */
export function normalizeAntigravityCreditsOverride(value: unknown): CreditsMode | null {
  if (value === null || value === undefined) return null;
  return isAntigravityCreditsMode(value) ? value : "off";
}

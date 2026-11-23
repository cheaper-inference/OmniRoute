export const API_KEY_BAN_REASONS = [
  "prompt_injection",
  "compromised_key",
  "policy_violation",
] as const;

export type ApiKeyBanReason = (typeof API_KEY_BAN_REASONS)[number];

export function parseApiKeyBanReason(value: unknown): ApiKeyBanReason | null {
  return API_KEY_BAN_REASONS.find((reason) => reason === value) ?? null;
}

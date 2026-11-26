import { randomBytes } from "node:crypto";

export const SYSTEM_API_KEY_SOURCE = "system";

// A separate credential namespace also reserves the secret after the row is deleted.
const SYSTEM_API_KEY_PREFIX = "osk_";

export function isSystemApiKeySecret(key: unknown): boolean {
  return typeof key === "string" && key.startsWith(SYSTEM_API_KEY_PREFIX);
}

export function generateSystemApiKeySecret(): string {
  return SYSTEM_API_KEY_PREFIX + randomBytes(32).toString("base64url");
}

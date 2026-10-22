/**
 * Providers whose dashboard sign-in is the OAuth2 device-code flow (RFC 8628).
 *
 * The list drives the OAuth modal: a provider on it skips the browser-PKCE
 * step and shows the device-code panel — the verification URL plus the code
 * the user enters there.
 */
export const DEVICE_CODE_PROVIDERS = new Set([
  "github",
  "kiro",
  "amazon-q",
  "kimi-coding",
  "kilocode",
  "codebuddy-cn",
  "codebuddy-intl",
  "ghe-copilot",
  "grok-cli",
  "muse-code",
  // MiniMax Code: the account service issues a device code the user confirms
  // in the browser; the credential lands in the local MiniMax Code profile.
  "minimax-code",
]);

/**
 * No-auth providers that are on that list.
 *
 * A no-auth provider stores no credential of its own — it reads the profile
 * of a local CLI — and can still offer a device-code sign-in in the dashboard.
 * The sign-in writes the credential into that profile; the dashboard row is
 * the account, the credential lives in the provider's own store.
 */
export const NOAUTH_DEVICE_CODE_PROVIDER_IDS = new Set(["minimax-code"]);

/**
 * No-auth providers whose dashboard sign-in is the OAuth2 device-code flow
 * (RFC 8628) — they are also listed in OAuthModal's DEVICE_CODE_PROVIDERS.
 *
 * A no-auth provider stores no credential of its own — it reads the profile
 * of a local CLI — and can still offer a device-code sign-in in the dashboard.
 * The sign-in writes the credential into that profile; the dashboard row is
 * the account, the credential lives in the provider's own store.
 */
export const NOAUTH_DEVICE_CODE_PROVIDER_IDS = new Set(["minimax-code"]);

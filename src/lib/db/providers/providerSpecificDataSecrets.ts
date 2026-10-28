import { isWordPressLoggedInKey } from "@omniroute/open-sse/utils/wordpressSessionKey.ts";

/**
 * Declared providerSpecificData fields that contain credentials and must use the
 * same at-rest encryption as top-level connection tokens (#16836).
 *
 * Do not blanket-encrypt the JSON object: workspace/identity fields are queried
 * by SQLite and must remain readable. Unknown fields remain unchanged.
 *
 * This is the ONE list for every consumer: encryptConnectionFields /
 * decryptConnectionFields (src/lib/db/encryption.ts), the lazy connection views,
 * the first-use sweep of legacy plaintext rows (./migrations.ts), the provider API
 * response sanitizer (src/lib/providers/requestDefaults.ts — strips these fields,
 * masks `extraApiKeys` like `apiKey`) and the compliance audit summary
 * (src/lib/compliance/providerAudit.ts). A field added here is covered on every side;
 * tests/unit/provider-specific-data-secrets-drift.test.ts iterates the list.
 */
export const PROVIDER_SPECIFIC_SECRET_FIELDS = [
  "consoleApiKey",
  "alibabaConsoleCookie",
  "alibabaConsoleSecToken",
  "xiaomiMimoConsoleCookie",
  // Console-only quota cookies/tokens live alongside the inference API key;
  // none are SQLite identity fields. Keeping them plaintext on disk exposes
  // the cloud-console account to anyone who can read the database.
  "qwenCloudCookie",
  "qwenCloudSecToken",
  "volcConsoleCookie",
  "volcCsrfToken",
  // Ollama Cloud's optional quota-scraping session credentials are the same
  // class of browser cookie as the Qwen/Volcengine console credentials above.
  // Only encrypt credential fields; workspace/identity JSON stays queryable.
  "ollamaUsageCookie",
  "ollamaCloudUsageCookie",
  "ollamaCloudCookie",
  "usageCookie",
  // Some connectors store a second credential or session token inside the
  // metadata object. These fields are already redacted from dashboard/audit
  // responses, but without declaring them here their SQLite values leak in
  // plaintext. Keep non-secret IDs (workspaceId/chatgptUserId) queryable.
  "accessToken",
  "refreshToken",
  "idToken",
  "apiKey",
  "secretAccessKey",
  "awsSecretAccessKey",
  "sessionToken",
  "awsSessionToken",
  "openCodeGoAuthCookie",
  "opencodeGoAuthCookie",
  "authCookie",
  // The key-rotation pool: a LIST of full upstream API keys. Every entry is
  // enveloped (see mapProviderSpecificDataSecrets); the dashboard shows and
  // edits the list, so the API returns it masked exactly like `apiKey`.
  "extraApiKeys",
  // Short-lived provider sub-tokens that refresh / mint flows write back into
  // the metadata object (open-sse/executors/ghe-copilot.ts,
  // open-sse/services/tokenRefresh/providers/museCode.ts + kiro.ts,
  // open-sse/executors/lmarena.ts).
  "copilotToken",
  "dcaToken",
  "clientSecret",
  "recaptchaV3Token",
  // Web-session providers keep the browser session under these keys
  // (src/shared/providers/webSessionCredentials.ts → storageKeys). Identity and
  // display fields of those providers (uuid, uid, sid, deviceId, userId, email,
  // projectId, space ids, …) are not credentials and stay queryable.
  "cookie",
  "cookies",
  "storageState",
  "origins",
  "token",
  "token_v2",
  "userToken",
  "access_token",
  "refresh_token",
  "jwt",
  "sso",
  "sso-rw",
  "session",
  "session-token",
  "sessionCookie",
  "sessionKey",
  "sessionid",
  "__Secure-next-auth.session-token",
  "__Secure-authjs.session-token",
  "__Secure-better-auth.session_token",
  "__Secure-1PSID",
  "__Secure-1PSIDTS",
  "__client",
  "__session",
  "__vercel_session",
  "app-config-uuid",
  "hy_token",
  "hf-chat",
  "p-b",
  "kimi-auth",
  "duckai",
  "chatglm_session",
  "manus_session",
  "ecto_1_sess",
  "abra_sess",
  "convex-session-id",
  "convexSessionId",
  "nt_session",
  "si_ses_id",
  "ttwid",
  "arena-auth-prod-v1",
  "arena-auth-prod-v1.0",
  "arena-auth-prod-v1.1",
  "maxaiAccessToken",
  "ucCookies",
  "ucClientCookie",
  "clientCookie",
  "wordpress_logged_in",
] as const;

/**
 * Not credentials at rest, but never echoed to a client or written to an audit record:
 * the transient ChatGPT Web (Codex) handles, the system-managed Codex fingerprint seed
 * (mirrors sub2api stripping `codex_fingerprint_seed`) and the runtime-only Codex
 * identity carriers (in-memory per request, never persisted). The server-side
 * partial-update merge keeps them alive without the client round-tripping them.
 */
export const PROVIDER_SPECIFIC_RESPONSE_ONLY_FIELDS = [
  "runtimeKey",
  "validationId",
  "codexFingerprintSeed",
  "codexClientIdentity",
  "codexOriginalIdentityHeaders",
  "codexTurnStateEcho",
] as const;

export type ProviderSpecificSecretField = (typeof PROVIDER_SPECIFIC_SECRET_FIELDS)[number];

/**
 * True for a key that holds a credential even though it is not a fixed name in
 * PROVIDER_SPECIFIC_SECRET_FIELDS: WordPress names its session cookie
 * `wordpress_logged_in_<siteHash>`, so veoaifree-web rows may store any suffixed variant
 * (open-sse/utils/wordpressSessionKey.ts, #17041).
 */
export function isProviderSpecificSecretKey(key: string): boolean {
  return (
    (PROVIDER_SPECIFIC_SECRET_FIELDS as readonly string[]).includes(key) ||
    isWordPressLoggedInKey(key)
  );
}

/** Declared secret fields plus any dynamically-named secret key present in `data`. */
export function providerSpecificSecretKeysIn(data: Record<string, unknown>): string[] {
  const keys: string[] = [...PROVIDER_SPECIFIC_SECRET_FIELDS];
  for (const key of Object.keys(data)) {
    if (!keys.includes(key) && isWordPressLoggedInKey(key)) keys.push(key);
  }
  return keys;
}

type SecretTransform = (
  secret: string,
  field: ProviderSpecificSecretField
) => string | null | undefined;

/**
 * Apply `transform` to one declared value: a string, or each string entry of a list
 * (the `extraApiKeys` pool). Returns the input itself when nothing changed, so callers
 * can skip the copy. A list entry that transforms to null/undefined is DROPPED — an
 * undecryptable token must never be forwarded upstream as if it were a key — while
 * non-string / empty entries and non-string, non-list values pass through untouched.
 */
function mapSecretValue(
  value: unknown,
  field: ProviderSpecificSecretField,
  transform: SecretTransform
): unknown {
  if (typeof value === "string") return value ? transform(value, field) : value;
  if (!Array.isArray(value)) return value;
  let changed = false;
  const next: unknown[] = [];
  for (const entry of value) {
    if (typeof entry !== "string" || !entry) {
      next.push(entry);
      continue;
    }
    const mapped = transform(entry, field);
    if (mapped !== entry) changed = true;
    if (mapped === null || mapped === undefined) continue;
    next.push(mapped);
  }
  return changed ? next : value;
}

/** Return a fresh object only if a recognized secret field actually changes. */
export function mapProviderSpecificDataSecrets(data: unknown, transform: SecretTransform): unknown {
  if (!data || typeof data !== "object" || Array.isArray(data)) return data;
  const original = data as Record<string, unknown>;
  let updated: Record<string, unknown> | null = null;
  for (const field of providerSpecificSecretKeysIn(original)) {
    const secret = original[field];
    const value = mapSecretValue(secret, field as ProviderSpecificSecretField, transform);
    if (value !== secret) {
      updated ??= { ...original };
      updated[field] = value;
    }
  }
  return updated ?? data;
}

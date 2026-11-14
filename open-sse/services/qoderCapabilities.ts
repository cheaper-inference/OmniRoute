type QoderCredentials = {
  apiKey?: unknown;
  accessToken?: unknown;
  refreshToken?: unknown;
  providerSpecificData?: unknown;
};

/**
 * `providerSpecificData.authMethod` written by the Qoder device-code sign-in
 * (src/lib/oauth/providers/qoder.ts → mapTokens).
 */
export const QODER_DEVICE_AUTH_METHOD = "device_code";

/** Error code returned when a sign-in-only (device flow) account is asked to serve chat. */
export const QODER_SIGN_IN_ONLY_CODE = "qoder_sign_in_only";

/**
 * Public message for the refusal. Deliberately static: it never interpolates a
 * credential, so it cannot leak the device token.
 */
export const QODER_SIGN_IN_ONLY_MESSAGE =
  "This Qoder account was added with browser sign-in (device code). It is sign-in only and cannot serve chat yet: no Qoder endpoint that accepts device tokens is supported. Use a Qoder Personal Access Token (pt-, requires the local qodercli) or a DashScope API key for chat.";

/** Match the executor's credential precedence, including the optional host PAT. */
export function resolveQoderAuthToken(credentials: QoderCredentials): string {
  for (const key of ["apiKey", "accessToken", "refreshToken"] as const) {
    const token = credentials[key];
    if (typeof token === "string" && token.trim()) return token.trim();
  }
  return String(process.env.QODER_PERSONAL_ACCESS_TOKEN || "").trim();
}

/** Qoder device-flow tokens: `dt-` (access) and `drt-` (refresh). */
export function isQoderDeviceToken(token: unknown): boolean {
  if (typeof token !== "string") return false;
  const value = token.trim();
  return value.startsWith("dt-") || value.startsWith("drt-");
}

/**
 * True when the credential belongs to a device-code sign-in. Such accounts can
 * sign in, but no supported Qoder endpoint accepts their `dt-` token, and the
 * HTTP path would send it to DashScope — so they must never serve chat.
 */
export function isQoderSignInOnlyCredential(credentials: QoderCredentials | null | undefined) {
  if (!credentials || typeof credentials !== "object") return false;
  const psd = credentials.providerSpecificData;
  if (
    psd &&
    typeof psd === "object" &&
    (psd as Record<string, unknown>).authMethod === QODER_DEVICE_AUTH_METHOD
  ) {
    return true;
  }
  // Inspect only the token the executor would actually use (same precedence as
  // resolveQoderAuthToken), so lazily decrypted lower-priority slots stay untouched.
  return isQoderDeviceToken(resolveQoderAuthToken(credentials));
}

/** Connection-selection predicate: a Qoder connection that may serve chat at all. */
export function qoderConnectionCanServeChat(credentials: QoderCredentials): boolean {
  return !isQoderSignInOnlyCredential(credentials);
}

export function qoderSupportsCallerTools(credentials: QoderCredentials): boolean {
  if (isQoderSignInOnlyCredential(credentials)) return false;
  return !resolveQoderAuthToken(credentials).startsWith("pt-");
}

export function hasQoderCallerTools(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const request = body as Record<string, unknown>;
  return [request.tools, request.functions].some(
    (tools) => Array.isArray(tools) && tools.length > 0
  );
}

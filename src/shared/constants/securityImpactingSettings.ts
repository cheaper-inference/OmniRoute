/**
 * Settings keys whose change broadens attack surface. Spec §Security:
 * `PATCH /api/settings` requires password re-auth when any of these is present
 * in the body, and every other settings writer that skips that gate (e.g. the
 * legacy JSON import) MUST drop them instead of persisting them.
 *
 * - `localOnlyManageScopeBypassEnabled` / `localOnlyManageScopeBypassPrefixes`:
 *   T-011 bypass kill-switch + per-prefix list. Operator must re-confirm
 *   before broadening the LOCAL_ONLY carve-out.
 * - `requireLogin`: dashboard login enforcement toggle.
 * - `newPassword`: password rotation (existing). Handled by the same gate so
 *   the password-verify only fires ONCE per PATCH.
 * - `oidcEnabled` / `oidcDisablePasswordLogin` / `oidcClientSecret`: who may log
 *   in to the dashboard.
 * - `oidcIssuer` / `oidcClientId` / `oidcAllowedSubjects` / `oidcAdmissionClaim` /
 *   `oidcRedirectPath` / `oidcScopes`: the OIDC identity config — which IdP's ID tokens are trusted, the
 *   audience they must carry, where the authorization code is sent and which subjects
 *   may log in. Changing them without re-auth would let a stolen session or management
 *   credential point dashboard login at an attacker-controlled IdP, allowlist the
 *   attacker's own subject, or send the code to another host. Every `oidc*` key of the
 *   settings schema belongs here (pinned by `tests/unit/oidc-settings-reauth.test.ts`).
 * - `corsOrigins` / `bruteForceProtection`: which browser origins may call the management
 *   API with the operator's cookie, and whether repeated failed logins are throttled.
 *   Loosening either weakens the login defenses, so both need the same re-auth (the Security
 *   tab asks for the current password) and are dropped by the JSON import.
 *
 * Every key here is also OPERATOR-ONLY on `PATCH /api/settings`: a manage-scoped API key or an
 * `oma_` access token is refused with 403 even when it knows the password
 * (`tests/unit/security-settings-operator.test.ts`).
 *
 * Note: `mcpEnabled` is NOT gated server-side — the dedicated MCP page
 * (/dashboard/mcp) toggles it via patchSetting() without a currentPassword
 * prompt. The Authz section can still prompt client-side for consistency,
 * but the server accepts the change without re-auth.
 */
export const SECURITY_IMPACTING_SETTINGS_KEYS = [
  "localOnlyManageScopeBypassEnabled",
  "localOnlyManageScopeBypassPrefixes",
  "requireLogin",
  "newPassword",
  "oidcEnabled",
  "oidcDisablePasswordLogin",
  "oidcClientSecret",
  "oidcIssuer",
  "oidcClientId",
  "oidcAllowedSubjects",
  "oidcAdmissionClaim",
  "oidcRedirectPath",
  "oidcScopes",
  "corsOrigins",
  "bruteForceProtection",
] as const;

/**
 * Dashboard session state written by the server, never by an operator: the cutoff a password
 * change sets (`SESSIONS_VALID_AFTER_SETTING`) and the ids of signed-out sessions
 * (`REVOKED_SESSIONS_SETTING`), both in `src/shared/utils/dashboardSessionToken.ts`. Kept as
 * literals so this constants module does not pull in `jose`; the names are pinned to those
 * constants by `tests/unit/settings-import-json-session-state.test.ts`.
 */
export const DASHBOARD_SESSION_STATE_SETTINGS_KEYS = [
  "sessionsValidAfter",
  "revokedDashboardSessions",
] as const;

/**
 * Keys a settings writer without password re-auth (the legacy JSON import) must drop: the
 * password hash and any `currentPassword`, every key `PATCH /api/settings` only accepts after
 * re-auth, and the session state above — importing an older backup must not revive dashboard
 * sessions a password change or a sign-out already ended.
 */
export const IMPORT_STRIPPED_SETTINGS_KEYS = [
  "password",
  "currentPassword",
  ...SECURITY_IMPACTING_SETTINGS_KEYS,
  ...DASHBOARD_SESSION_STATE_SETTINGS_KEYS,
] as const;

/**
 * credentialSource.ts — provenance of the API key a request ran with (HAC-116 D1).
 *
 * The gateway can serve a provider from two very different places:
 *   - "store": a row in `provider_connections.api_key` (gateway/dashboard-managed,
 *     encrypted at rest). It is mutable via updateProviderConnection() — the
 *     operator can replace the key.
 *   - "env":   a process-env fallback credential synthesized headless, e.g.
 *     GEMINI_API_KEY / JINA_AI_API_KEY. Its connectionId is a synthetic
 *     `env:<ENV_VAR>` sentinel with NO backing DB row, so it must never be
 *     mutated or persisted.
 *
 * Provenance is decided by the connectionId prefix alone — never by a file name
 * (`provider-credentials.json` holds OAuth client metadata, not provider API
 * keys — see gemini.ts / jina.ts). This is the single source of truth for
 * behaviour selection and user-facing messaging.
 */

export const ENV_CONNECTION_PREFIX = "env:";

export type CredentialSource = "store" | "env";

/**
 * Classify a credential's source from its connectionId.
 * Any `env:<VAR>` sentinel is "env"; everything else (including a missing id)
 * is treated as "store".
 */
export function credentialSource(
  creds: { connectionId?: unknown } | null | undefined
): CredentialSource {
  const connId = creds?.connectionId;
  return typeof connId === "string" && connId.startsWith(ENV_CONNECTION_PREFIX) ? "env" : "store";
}

/**
 * The name of the environment variable backing an `env:<VAR>` credential
 * (`env:GEMINI_API_KEY` → `GEMINI_API_KEY`). Returns null for store credentials.
 * Safe to log / surface: it is the variable name, never its value.
 */
export function envVarName(connectionId: string | null | undefined): string | null {
  if (typeof connectionId !== "string" || !connectionId.startsWith(ENV_CONNECTION_PREFIX)) {
    return null;
  }
  const name = connectionId.slice(ENV_CONNECTION_PREFIX.length).trim();
  return name.length > 0 ? name : null;
}

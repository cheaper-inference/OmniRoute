/**
 * Single parser for the REQUIRE_API_KEY value.
 *
 * The request gate (`isRequireApiKeyEnabled`), the Next startup exposure
 * warning (`nonLoopbackApiKeyGuard.ts`) and the CLI `serve` warning
 * (`bin/cli/utils/serverHost.mjs`) all parse the value through this function,
 * so they agree on what an env value means. The gate checks a DB override
 * first; the two warnings read only the env value. With a DB override of
 * "false" and env "true" the gate is off and neither warning fires (a gap that
 * predates this parser). Plain `.mjs` so the CLI can import it without a
 * TypeScript loader.
 *
 * Enabled: "true", "1", "yes", ignoring case and surrounding whitespace.
 * Anything else, including unset, empty, "on" and unknown values, is disabled.
 *
 * @param {string | undefined | null} value raw env or DB override value
 * @returns {boolean}
 */
export function isRequireApiKeyValueEnabled(value) {
  if (value === undefined || value === null) return false;
  const normalized = String(value).trim().toLowerCase();
  return normalized === "true" || normalized === "1" || normalized === "yes";
}

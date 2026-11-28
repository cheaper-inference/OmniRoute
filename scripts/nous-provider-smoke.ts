/**
 * Functional smoke test for the Nous device-code provider module.
 *
 * Calls the real `requestDeviceCode` against the live Nous Portal and asserts the
 * shape the OAuth dispatcher needs. It does NOT poll or approve — that needs a
 * human in a browser — so it is safe to run repeatedly and leaves no state.
 *
 *   npx tsx scripts/nous-provider-smoke.ts
 */
import { nous } from "../src/lib/oauth/providers/nous";
import { PROVIDERS } from "../src/lib/oauth/providers/index";
import { OAUTH_PROVIDERS } from "../src/shared/constants/providers/oauth";

function check(label: string, ok: boolean, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? ` — ${detail}` : ""}`);
  if (!ok) process.exitCode = 1;
}

async function main() {
  // 1. registration wiring
  check("registered in PROVIDERS as nous-oauth", "nous-oauth" in PROVIDERS);
  check(
    "nous-oauth module exposes the OAuth interface",
    typeof nous.requestDeviceCode === "function" &&
      typeof nous.pollToken === "function" &&
      typeof nous.mapTokens === "function" &&
      nous.flowType === "device_code",
    `flowType=${nous.flowType}`
  );
  check("catalog entry exists", "nous-oauth" in OAUTH_PROVIDERS);
  check(
    "catalog does not collide with the api-key provider",
    OAUTH_PROVIDERS["nous-oauth"].id !== "nous-research"
  );
  check(
    "alias is distinct from the api-key provider's `nous` alias",
    OAUTH_PROVIDERS["nous-oauth"].alias !== "nous",
    `alias=${OAUTH_PROVIDERS["nous-oauth"].alias}`
  );

  // 2. live device authorization against the real Portal
  const dc = await nous.requestDeviceCode(nous.config);
  check("device_code returned", typeof dc.device_code === "string" && dc.device_code.length > 20);
  check(
    "user_code returned",
    typeof dc.user_code === "string" && dc.user_code.length >= 6,
    dc.user_code
  );
  check(
    "verification_uri_complete carries the code",
    typeof dc.verification_uri_complete === "string" &&
      dc.verification_uri_complete.includes(dc.user_code),
    dc.verification_uri_complete
  );
  check("expires_in is a positive number", Number(dc.expires_in) > 0, String(dc.expires_in));
  check("interval is a positive number", Number(dc.interval) > 0, String(dc.interval));

  // 3. one poll before approval must report pending, not fail
  const poll = await nous.pollToken(nous.config, dc.device_code);
  check(
    "unapproved poll reports authorization_pending",
    poll.ok === false && (poll.data as { error?: string }).error === "authorization_pending",
    JSON.stringify(poll.data)
  );

  // 4. token mapping shape
  const mapped = nous.mapTokens({
    access_token: "a",
    refresh_token: "r",
    expires_in: 3599,
  }) as Record<string, unknown>;
  check(
    "mapTokens carries access + rotating refresh token",
    mapped.accessToken === "a" && mapped.refreshToken === "r" && mapped.expiresIn === 3599
  );
}

main().catch((error) => {
  console.error("FAIL  threw:", error);
  process.exitCode = 1;
});

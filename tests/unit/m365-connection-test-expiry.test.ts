import test from "node:test";
import assert from "node:assert/strict";
import { validateProviderApiKey } from "../../src/lib/providers/validation.ts";

const CHATHUB = "11111111-1111-4111-8111-111111111111@22222222-2222-4222-8222-222222222222";
/** An unsigned JWT-shaped token whose `exp` is `seconds` from now. */
function token(seconds: number): string {
  const part = (value: unknown) => Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${part({ alg: "none" })}.${part({ exp: Math.floor(Date.now() / 1000) + seconds })}.sig`;
}
const pasted = (accessToken: string) => `access_token=${accessToken}; chathubPath=${CHATHUB}`;
const validate = (apiKey: string, extra: Record<string, unknown> = {}) =>
  validateProviderApiKey({ provider: "copilot-m365-web", apiKey, ...extra });

test("an expired sign-in with nothing to refresh it fails the connection test", async () => {
  const result = await validate(pasted(token(-3600)));
  assert.equal(result.valid, false);
  assert.match(String(result.error), /sign-in expired at \d{4}-\d\d-\d\dT.*Sign in again/);
});

test("a stored token refreshed since the paste is judged instead of the stale paste", async () => {
  const result = await validate(pasted(token(-3600)), {
    credentials: { accessToken: token(3600) },
  });
  assert.equal(result.valid, true);
});

test("an expired token passes when a refresh token can renew it", async () => {
  for (const extra of [
    { credentials: { refreshToken: "stored-refresh" } },
    { providerSpecificData: { refreshToken: "legacy-refresh" } },
  ]) {
    const result = await validate(pasted(token(-3600)), extra);
    assert.equal(result.valid, true, JSON.stringify(Object.keys(extra)));
  }
});

test("an unexpired token, or one whose expiry cannot be read, keeps the format check", async () => {
  for (const accessToken of [token(3600), "opaque-token-without-claims"]) {
    const result = await validate(pasted(accessToken));
    assert.equal(result.valid, true, accessToken);
  }
});

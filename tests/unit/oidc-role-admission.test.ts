import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { exportJWK, generateKeyPair, SignJWT } from "jose";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-oidc-role-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = "test-jwt-secret-for-oidc-role";

const core = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const callback = await import("../../src/app/api/auth/oidc/callback/route.ts");
const originalStore = callback.oidcCallbackInternals.getCookieStore;
const originalFetch = globalThis.fetch;
let cookies: Record<string, string> = {};

const { privateKey, publicKey } = await generateKeyPair("RS256");
const jwk = { ...(await exportJWK(publicKey)), kid: "role-test" };

test.beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  cookies = { oidc_state: "state", oidc_nonce: "nonce" };
  callback.oidcCallbackInternals.clearJwksCache();
  callback.oidcCallbackInternals.getCookieStore = async () => ({
    get: (name: string) => (cookies[name] ? { value: cookies[name] } : undefined),
    set: (name: string, value: string) => {
      cookies[name] = value;
    },
  });
});

test.after(() => {
  callback.oidcCallbackInternals.getCookieStore = originalStore;
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  delete process.env.JWT_SECRET;
});

async function login(
  claims: Record<string, unknown>,
  subjects: string[] = ["user-123"],
  policy?: unknown
) {
  await updateSettings({
    requireLogin: true,
    password: "",
    oidcEnabled: true,
    oidcIssuer: "https://idp.test",
    oidcClientId: "role-test-client",
    oidcClientSecret: "secret",
    oidcAllowedSubjects: subjects,
    ...(policy === undefined ? {} : { oidcAdmissionClaim: policy }),
  });
  const idToken = await new SignJWT({
    iss: "https://idp.test",
    aud: "role-test-client",
    sub: "user-123",
    nonce: "nonce",
    ...claims,
  })
    .setProtectedHeader({ alg: "RS256", kid: "role-test" })
    .setIssuedAt()
    .setExpirationTime("5m")
    .sign(privateKey);
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url.endsWith("/.well-known/openid-configuration")) {
      return Response.json({
        token_endpoint: "https://idp.test/token",
        jwks_uri: "https://idp.test/jwks",
      });
    }
    if (url.endsWith("/token")) return Response.json({ id_token: idToken });
    if (url.endsWith("/jwks")) return Response.json({ keys: [jwk] });
    throw new Error(`unexpected URL: ${url}`);
  }) as typeof fetch;
  const response = await callback.GET(
    new Request("http://localhost/api/auth/oidc/callback?state=state&code=code")
  );
  return response.headers.get("location") || "";
}

const rolePolicy = { path: "realm_access.roles", values: ["admin"] };

test("matching nested ID-token role grants dashboard session without a subject list", async () => {
  const location = await login({ realm_access: { roles: ["viewer", "admin"] } }, [], rolePolicy);
  assert.ok(location.endsWith("/dashboard"), location);
  assert.ok(cookies.auth_token);
});

for (const [name, claim] of [
  ["missing", undefined],
  ["wrong role", { roles: ["viewer"] }],
  ["wrong type", { roles: "admin" }],
  ["mixed types", { roles: ["admin", 42] }],
  ["wrong shape", ["admin"]],
] as const) {
  test(`${name} role claim fails closed without a session`, async () => {
    const location = await login({ realm_access: claim }, [], rolePolicy);
    assert.ok(location.includes("oidc_error=role_not_allowed"), location);
    assert.equal(cookies.auth_token, undefined);
  });
}

test("subject allowlist and role policy must both pass", async () => {
  const location = await login(
    { realm_access: { roles: ["admin"] } },
    ["someone-else"],
    rolePolicy
  );
  assert.ok(location.includes("oidc_error=subject_not_allowed"), location);
  assert.equal(cookies.auth_token, undefined);
});

test("legacy subject allowlist remains sufficient when no claim policy is configured", async () => {
  const location = await login({}, ["user-123"]);
  assert.ok(location.endsWith("/dashboard"), location);
  assert.ok(cookies.auth_token);
});

test("invalid persisted role policy fails closed before contacting the IdP", async () => {
  await updateSettings({
    requireLogin: true,
    password: "",
    oidcEnabled: true,
    oidcIssuer: "https://idp.test",
    oidcClientId: "role-test-client",
    oidcClientSecret: "secret",
    oidcAllowedSubjects: ["user-123"],
    oidcAdmissionClaim: { path: "realm_access.roles", values: [] },
  });
  globalThis.fetch = (() => {
    throw new Error("unexpected network request");
  }) as typeof fetch;
  const response = await callback.GET(
    new Request("http://localhost/api/auth/oidc/callback?state=state&code=code")
  );
  assert.ok(response.headers.get("location")?.includes("oidc_error=not_configured"));
  assert.equal(cookies.auth_token, undefined);
});

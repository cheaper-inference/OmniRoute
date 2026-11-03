import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";
import { exportJWK, generateKeyPair, SignJWT } from "jose";

const DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-oidc-loopback-"));
process.env.DATA_DIR = DATA_DIR;
process.env.JWT_SECRET = "test-jwt-secret-for-oidc-loopback";

const core = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const callback = await import("../../src/app/api/auth/oidc/callback/route.ts");
const originalStore = callback.oidcCallbackInternals.getCookieStore;
const { privateKey, publicKey } = await generateKeyPair("RS256");
const jwk = { ...(await exportJWK(publicKey)), kid: "loopback-key" };
let idToken = "";
let tokenExchanges = 0;
const server = http.createServer((request, response) => {
  response.setHeader("content-type", "application/json");
  if (request.url === "/.well-known/openid-configuration") {
    response.end(
      JSON.stringify({ issuer, token_endpoint: `${issuer}/token`, jwks_uri: `${issuer}/jwks` })
    );
  } else if (request.url === "/jwks") {
    response.end(JSON.stringify({ keys: [jwk] }));
  } else if (request.url === "/token" && request.method === "POST") {
    tokenExchanges++;
    response.end(JSON.stringify({ id_token: idToken }));
  } else {
    response.writeHead(404).end();
  }
});
await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = server.address();
if (!address || typeof address === "string") throw new Error("loopback server unavailable");
const issuer = `http://127.0.0.1:${address.port}`;

async function requestWithRoles(roles: unknown) {
  const cookies: Record<string, string> = { oidc_state: "state", oidc_nonce: "nonce" };
  callback.oidcCallbackInternals.getCookieStore = async () => ({
    get: (name: string) => (cookies[name] ? { value: cookies[name] } : undefined),
    set: (name: string, value: string) => {
      cookies[name] = value;
    },
  });
  idToken = await new SignJWT({
    iss: issuer,
    aud: "loopback-client",
    sub: "user-123",
    nonce: "nonce",
    realm_access: { roles },
  })
    .setProtectedHeader({ alg: "RS256", kid: "loopback-key" })
    .setIssuedAt()
    .setExpirationTime("5m")
    .sign(privateKey);
  const result = await callback.GET(
    new Request("http://localhost/api/auth/oidc/callback?state=state&code=local-code")
  );
  return { location: result.headers.get("location") || "", authToken: cookies.auth_token };
}

test.after(async () => {
  callback.oidcCallbackInternals.getCookieStore = originalStore;
  await new Promise<void>((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve()))
  );
  core.resetDbInstance();
  fs.rmSync(DATA_DIR, { recursive: true, force: true });
  delete process.env.JWT_SECRET;
});

test("local HTTP IdP: ID-token role controls real JWKS/token callback exchange", async () => {
  await updateSettings({
    requireLogin: true,
    password: "",
    oidcEnabled: true,
    oidcIssuer: issuer,
    oidcClientId: "loopback-client",
    oidcClientSecret: "local-secret",
    oidcAllowedSubjects: [],
    oidcAdmissionClaim: { path: "realm_access.roles", values: ["admin"] },
  });
  const allowed = await requestWithRoles(["viewer", "admin"]);
  assert.ok(allowed.location.endsWith("/dashboard"), allowed.location);
  assert.ok(allowed.authToken);

  const denied = await requestWithRoles(["viewer"]);
  assert.ok(denied.location.includes("oidc_error=role_not_allowed"), denied.location);
  assert.equal(denied.authToken, undefined);
  assert.equal(tokenExchanges, 2);
});

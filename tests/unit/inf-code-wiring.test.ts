import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-inf-code-wiring-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { rotationGroupFor } = await import("../../open-sse/services/refreshSerializer.ts");
const { OAUTH_TEST_CONFIG } =
  await import("../../src/app/api/providers/[id]/test/oauthTestConfig.ts");
const { getProvider } = await import("../../src/lib/oauth/providers.ts");

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const INF_CODE_ENV = [
  "INF_CODE_API_BASE",
  "INF_CODE_OAUTH_BASE_URL",
  "INF_CODE_OAUTH_REFRESH_URL",
  "INF_CODE_OAUTH_TOKEN_URL",
];

let importId = 0;

/** Both endpoint tables read env at module load, so each case needs a fresh instance. */
async function endpointsWithEnv(env: Record<string, string>) {
  const saved = Object.fromEntries(INF_CODE_ENV.map((name) => [name, process.env[name]]));
  for (const name of INF_CODE_ENV) delete process.env[name];
  Object.assign(process.env, env);
  importId += 1;
  try {
    const { OAUTH_ENDPOINTS } = await import(
      `../../open-sse/config/constants.ts?inf-code-env=${importId}`
    );
    const { inf_codeProvider } = await import(
      `../../open-sse/config/providers/registry/inf-code/index.ts?inf-code-env=${importId}`
    );
    return { endpoints: OAUTH_ENDPOINTS.infcode, oauth: inf_codeProvider.oauth };
  } finally {
    for (const name of INF_CODE_ENV) {
      if (saved[name] === undefined) delete process.env[name];
      else process.env[name] = saved[name];
    }
  }
}

test("a private instance refreshes against its own host, not the public SaaS", async () => {
  const { endpoints, oauth } = await endpointsWithEnv({
    INF_CODE_OAUTH_BASE_URL: "https://infone-acme.tokensinfinity.com",
  });
  const expected = "https://infone-acme.tokensinfinity.com/acode/v1/refresh_token";
  assert.equal(endpoints.token, expected);
  assert.equal(oauth.refreshUrl, expected);
  assert.equal(oauth.tokenUrl, expected);
  assert.equal(oauth.authUrl, "https://infone-acme.tokensinfinity.com/infcode/login");
});

test("INF_CODE_OAUTH_REFRESH_URL is the override the refresh call honours", async () => {
  const { endpoints } = await endpointsWithEnv({
    INF_CODE_OAUTH_REFRESH_URL: "https://gateway.example.com/refresh",
  });
  assert.equal(endpoints.token, "https://gateway.example.com/refresh");
});

test("the auth-code exchange override never redirects refresh tokens to that endpoint", async () => {
  const exchangeUrl = "https://gateway.example.com/acode/v1/login_by_authcode";
  const { endpoints, oauth } = await endpointsWithEnv({ INF_CODE_OAUTH_TOKEN_URL: exchangeUrl });
  const expected = "https://www.tokensinfinity.com/acode/v1/refresh_token";
  assert.equal(endpoints.token, expected);
  assert.equal(oauth.tokenUrl, expected);
  assert.equal(oauth.refreshUrl, expected);
});

test("inf-code refreshes on its own rotation lane because its refresh token is single-use", () => {
  assert.equal(rotationGroupFor("inf-code"), "inf-code");
});

test("Test Connection probes the InfCode userinfo endpoint with the bearer token", () => {
  const config = OAUTH_TEST_CONFIG["inf-code"];
  assert.ok(config, "without an entry the route answers 'Provider test not supported'");
  assert.equal(config.url, "https://www.tokensinfinity.com/acode/v1/userinfo");
  assert.equal(config.method, "GET");
  assert.equal(config.authHeader, "Authorization");
  assert.equal(config.authPrefix, "Bearer ");
  assert.equal(config.refreshable, true);
});

function jwtExpiringIn(seconds: number): string {
  const encode = (value: unknown) => Buffer.from(JSON.stringify(value)).toString("base64url");
  const exp = Math.floor(Date.now() / 1000) + seconds;
  return `${encode({ alg: "none" })}.${encode({ exp })}.signature`;
}

test("login stores the access token expiry when the exchange omits expires_in", () => {
  const provider = getProvider("inf-code");
  const mapped = provider.mapTokens(
    { access_token: jwtExpiringIn(3600), refresh_token: "rt" },
    { userInfo: {} }
  );
  assert.ok(mapped.expiresIn > 3590 && mapped.expiresIn <= 3600, String(mapped.expiresIn));
});

test("login keeps an explicit expires_in over the JWT claim", () => {
  const provider = getProvider("inf-code");
  const mapped = provider.mapTokens(
    { access_token: jwtExpiringIn(3600), refresh_token: "rt", expires_in: 120 },
    { userInfo: {} }
  );
  assert.equal(mapped.expiresIn, 120);
});

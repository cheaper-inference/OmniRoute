import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-veoaifree-cred-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "veoaifree-optional-key-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { getProviderCredentials } = await import("../../src/sse/services/auth.ts");
const { supportsApiKeyOnFreeProvider, providerAllowsOptionalApiKey } =
  await import("../../src/shared/constants/providers.ts");
const { requiresWebSessionCredential, hasUsableWebSessionCredential } =
  await import("../../src/shared/providers/webSessionCredentials.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("veoaifree-web and veo-free support optional credentials and require web-session cookies", () => {
  assert.equal(providerAllowsOptionalApiKey("veoaifree-web"), true);
  assert.equal(providerAllowsOptionalApiKey("veo-free"), true);
  assert.equal(supportsApiKeyOnFreeProvider("veoaifree-web"), true);
  assert.equal(supportsApiKeyOnFreeProvider("veo-free"), true);
  assert.equal(requiresWebSessionCredential("veoaifree-web"), true);
  assert.equal(requiresWebSessionCredential("veo-free"), true);
});

test("veoaifree-web without a stored connection uses synthetic no-auth credentials", async () => {
  await core.ensureDbInitialized();
  const creds = await getProviderCredentials("veoaifree-web");
  assert.ok(creds);
  assert.equal((creds as { connectionId?: string }).connectionId, "noauth");
  assert.equal((creds as { apiKey?: unknown }).apiKey, null);
});

test("veoaifree-web prefers stored web-session credentials with cookie in providerSpecificData", async () => {
  await core.ensureDbInitialized();
  const created = await providersDb.createProviderConnection({
    provider: "veoaifree-web",
    authType: "cookie",
    name: "Veo web session",
    apiKey: null,
    providerSpecificData: {
      cookie: "wordpress_logged_in_hash=my_cookie_value",
    },
  });
  assert.ok(created?.id);

  const creds = await getProviderCredentials("veoaifree-web");
  assert.ok(creds);
  assert.equal((creds as { connectionId?: string }).connectionId, created.id);
  assert.equal(
    (creds as { providerSpecificData?: { cookie?: string } }).providerSpecificData?.cookie,
    "wordpress_logged_in_hash=my_cookie_value"
  );

  // Deactivate so subsequent test can test a fresh connection
  await providersDb.updateProviderConnection(created.id, { isActive: false });
});

test("veoaifree-web recognizes alias veo-free and wordpress_logged_in in providerSpecificData", async () => {
  await core.ensureDbInitialized();
  assert.equal(
    hasUsableWebSessionCredential("veo-free", {
      wordpress_logged_in_session: "wp_user_auth_val",
    }),
    true
  );

  const created = await providersDb.createProviderConnection({
    provider: "veoaifree-web",
    authType: "cookie",
    name: "Veo alias session",
    apiKey: null,
    providerSpecificData: {
      wordpress_logged_in_session: "wp_user_auth_val",
    },
  });
  assert.ok(created?.id);

  // Querying using alias veo-free should resolve and return the connection
  const creds = await getProviderCredentials("veo-free");
  assert.ok(creds);
  assert.equal((creds as { connectionId?: string }).connectionId, created.id);
  assert.equal(
    (creds as { providerSpecificData?: { wordpress_logged_in_session?: string } })
      .providerSpecificData?.wordpress_logged_in_session,
    "wp_user_auth_val"
  );
});

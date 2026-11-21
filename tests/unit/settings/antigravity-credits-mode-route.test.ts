/** Regression coverage for the real Settings route, SQLite rows and runtime store. */
import test from "node:test";
import assert from "node:assert/strict";
import { setupSettingsFixture } from "../_mocks/settings.ts";
import { makeManagementSessionRequest } from "../../helpers/managementSession.ts";

const fixture = setupSettingsFixture("antigravity-credits-mode");
process.env.INITIAL_PASSWORD = "test-initial-password";
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";

const core = await import("../../../src/lib/db/core.ts");
const { getSettings } = await import("../../../src/lib/db/settings.ts");
const runtime = await import("../../../src/lib/config/runtimeSettings.ts");
const route = await import("../../../src/app/api/settings/route.ts");
const credits = await import("../../../open-sse/services/antigravityCredits.ts");
const URL = "http://localhost/api/settings";
const initialEnv = process.env.ANTIGRAVITY_CREDITS;

test.beforeEach(async () => {
  await fixture.resetStorage();
  process.env.ANTIGRAVITY_CREDITS = "  ReTrY  ";
});

test.after(() => {
  if (initialEnv === undefined) delete process.env.ANTIGRAVITY_CREDITS;
  else process.env.ANTIGRAVITY_CREDITS = initialEnv;
  runtime.resetRuntimeSettingsStateForTests();
  core.resetDbInstance();
  fixture.cleanup();
});

async function patch(mode: unknown) {
  return route.PATCH(
    await makeManagementSessionRequest(URL, {
      method: "PATCH",
      body: { antigravityCreditsMode: mode },
    })
  );
}

async function get() {
  const response = await route.GET(await makeManagementSessionRequest(URL));
  assert.equal(response.status, 200);
  return (await response.json()) as Record<string, unknown>;
}

test("startup and unrelated PATCH keep inherited env mode without pinning it", async () => {
  await runtime.applyRuntimeSettings(await getSettings(), { force: true, source: "startup" });
  assert.equal(credits.getCreditsMode(), "retry");
  assert.equal((await get()).antigravityCreditsMode, "retry");
  const response = await route.PATCH(
    await makeManagementSessionRequest(URL, { method: "PATCH", body: { stickyRoundRobinLimit: 4 } })
  );
  assert.equal(response.status, 200);
  assert.equal((await response.json()).antigravityCreditsMode, "retry");
  assert.equal(
    core
      .getDbInstance()
      .prepare("SELECT 1 FROM key_value WHERE namespace = 'settings' AND key = ?")
      .get("antigravityCreditsMode"),
    undefined
  );
  process.env.ANTIGRAVITY_CREDITS = "always";
  assert.equal(credits.getCreditsMode(), "always");
  assert.equal((await get()).antigravityCreditsMode, "always");
});

test("valid modes persist through PATCH, apply live, and survive a cold start", async () => {
  process.env.ANTIGRAVITY_CREDITS = "always";
  for (const mode of ["off", "retry", "always", "off"] as const) {
    const response = await patch(mode);
    assert.equal(response.status, 200);
    assert.equal((await response.json()).antigravityCreditsMode, mode);
    assert.equal((await get()).antigravityCreditsMode, mode);
    assert.equal((await getSettings()).antigravityCreditsMode, mode);
    assert.equal(credits.getCreditsMode(), mode);
  }
  runtime.resetRuntimeSettingsStateForTests();
  core.resetDbInstance();
  assert.equal(credits.getCreditsMode(), "always");
  const changes = await runtime.applyRuntimeSettings(await getSettings(), {
    force: true,
    source: "startup",
  });
  assert.ok(changes.some(({ section }) => section === "antigravityCredits"));
  assert.equal(credits.getCreditsMode(), "off");
  await runtime.applyRuntimeSettings({}, { source: "partial settings" });
  assert.equal(credits.getCreditsMode(), "off");
  await runtime.applyRuntimeSettings(
    { antigravityCreditsMode: null },
    { source: "hot-reload:poll" }
  );
  assert.equal(credits.getCreditsMode(), "always");
});

test("invalid PATCH modes are rejected and do not change the persisted or runtime value", async () => {
  assert.equal((await patch("off")).status, 200);
  for (const mode of ["invalid", "ALWAYS", " retry ", null, true, 0]) {
    assert.equal((await patch(mode)).status, 400);
    assert.equal((await get()).antigravityCreditsMode, "off");
    assert.equal(credits.getCreditsMode(), "off");
  }
});

test("malformed persisted override is disabled instead of falling through to paid env mode", async () => {
  process.env.ANTIGRAVITY_CREDITS = "always";
  core
    .getDbInstance()
    .prepare("INSERT INTO key_value (namespace, key, value) VALUES ('settings', ?, ?)")
    .run("antigravityCreditsMode", JSON.stringify(" ALWAYS "));
  await runtime.applyRuntimeSettings(await getSettings(), { force: true, source: "startup" });
  assert.equal((await get()).antigravityCreditsMode, "off");
  assert.equal(credits.getCreditsMode(), "off");
});

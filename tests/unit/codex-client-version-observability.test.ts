import assert from "node:assert/strict";
import test from "node:test";
import * as codexClient from "../../open-sse/config/codexClient.ts";

const originalVersion = process.env.CODEX_CLIENT_VERSION;
const registryResponse = (version = "0.160.1") => Response.json({ name: "@openai/codex", version });

test.beforeEach(() => {
  delete process.env.CODEX_CLIENT_VERSION;
});

test.afterEach(() => {
  codexClient.resetCodexClientVersionCacheForTests?.();
  test.mock.restoreAll();
  if (originalVersion === undefined) delete process.env.CODEX_CLIENT_VERSION;
  else process.env.CODEX_CLIENT_VERSION = originalVersion;
});

/**
 * #16714: a refresh failure used to be swallowed by a bare `catch {}`, so a
 * deployment with a blocked registry (proxy / corporate egress) silently kept
 * the pinned version and no operator could tell why the live catalog was short.
 */
test("a failed refresh is reported through the logger instead of being swallowed", async () => {
  const warnings: string[] = [];
  test.mock.method(console, "warn", (...args: unknown[]) => {
    warnings.push(args.map(String).join(" "));
  });

  const version = await codexClient.refreshCodexClientVersion(async () => {
    throw new Error("registry blocked");
  });

  assert.equal(version, codexClient.DEFAULT_CODEX_CLIENT_VERSION);
  assert.equal(warnings.length, 1, "a failed refresh must emit exactly one warning");
  assert.match(warnings[0], /codex/i);
  assert.match(warnings[0], /registry blocked/);
  assert.match(
    warnings[0],
    new RegExp(codexClient.DEFAULT_CODEX_CLIENT_VERSION.replace(/\./g, "\\."))
  );
});

test("a successful refresh does not warn", async () => {
  const warnings: string[] = [];
  test.mock.method(console, "warn", (...args: unknown[]) => {
    warnings.push(args.map(String).join(" "));
  });

  assert.equal(
    await codexClient.refreshCodexClientVersion(async () => registryResponse()),
    "0.160.1"
  );
  assert.deepEqual(warnings, []);
});

test("the refresh outcome is observable so discovery can report a degraded catalog", async () => {
  const failed = await codexClient.refreshCodexClientVersion(async () => {
    throw new Error("offline");
  });
  assert.equal(failed, codexClient.DEFAULT_CODEX_CLIENT_VERSION);
  assert.equal(codexClient.getCodexClientVersionSource(), "fallback");

  codexClient.resetCodexClientVersionCacheForTests();

  assert.equal(
    await codexClient.refreshCodexClientVersion(async () => registryResponse()),
    "0.160.1"
  );
  assert.equal(codexClient.getCodexClientVersionSource(), "registry");
});

test("an env override reports the override source without touching the network", async () => {
  process.env.CODEX_CLIENT_VERSION = "0.149.0";
  await codexClient.refreshCodexClientVersion(async () => {
    assert.fail("an explicit version must not fetch metadata");
  });
  assert.equal(codexClient.getCodexClientVersionSource(), "override");
});

test("removing the override stops reporting the override source", () => {
  process.env.CODEX_CLIENT_VERSION = "0.149.0";
  assert.equal(codexClient.getCodexClientVersion(), "0.149.0");
  assert.equal(codexClient.getCodexClientVersionSource(), "override");

  delete process.env.CODEX_CLIENT_VERSION;

  // Reading the version must not latch the source: with the override gone the
  // answer has to fall back to the real cache state, not a stale "override".
  assert.equal(codexClient.getCodexClientVersion(), codexClient.DEFAULT_CODEX_CLIENT_VERSION);
  assert.equal(codexClient.getCodexClientVersionSource(), "fallback");
});

test("a non-ok response is reported too, not only a thrown error", async () => {
  const warnings: string[] = [];
  test.mock.method(console, "warn", (...args: unknown[]) => {
    warnings.push(args.map(String).join(" "));
  });

  assert.equal(
    await codexClient.refreshCodexClientVersion(async () => new Response(null, { status: 503 })),
    codexClient.DEFAULT_CODEX_CLIENT_VERSION
  );
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /503/);

  codexClient.resetCodexClientVersionCacheForTests();

  assert.equal(
    await codexClient.refreshCodexClientVersion(async () => new Response("bad json")),
    codexClient.DEFAULT_CODEX_CLIENT_VERSION
  );
  assert.equal(warnings.length, 2);
});

/**
 * The pin is intentionally a floor: npm lagging behind it is a healthy state,
 * not a failed refresh, so it must neither warn nor flag the catalog as degraded.
 */
test("a registry version older than the pinned floor is healthy: no warning, source pinned", async () => {
  const warnings: string[] = [];
  test.mock.method(console, "warn", (...args: unknown[]) => {
    warnings.push(args.map(String).join(" "));
  });
  let fetches = 0;

  assert.equal(
    await codexClient.refreshCodexClientVersion(async () => {
      fetches += 1;
      return registryResponse("0.1.0");
    }),
    codexClient.DEFAULT_CODEX_CLIENT_VERSION
  );
  assert.deepEqual(warnings, []);
  assert.equal(codexClient.getCodexClientVersionSource(), "pinned");

  // Healthy outcome: wait out the long cache TTL, not the 5-minute failure retry.
  await codexClient.refreshCodexClientVersion(async () => {
    fetches += 1;
    return registryResponse("0.1.0");
  });
  assert.equal(fetches, 1, "an older registry version must not be re-fetched on the retry window");
});

test("an older registry version keeps reporting the registry source once a newer one was applied", async () => {
  const warnings: string[] = [];
  test.mock.method(console, "warn", (...args: unknown[]) => {
    warnings.push(args.map(String).join(" "));
  });
  assert.equal(
    await codexClient.refreshCodexClientVersion(async () => registryResponse("0.160.1")),
    "0.160.1"
  );
  assert.equal(codexClient.getCodexClientVersionSource(), "registry");

  // Force the next refresh past the cache window by simulating elapsed time.
  const realNow = Date.now;
  test.mock.method(Date, "now", () => realNow() + codexClient.CODEX_VERSION_CACHE_TTL_MS + 1);
  assert.equal(
    await codexClient.refreshCodexClientVersion(async () => registryResponse("0.1.0")),
    "0.160.1"
  );
  assert.deepEqual(warnings, []);
  assert.equal(codexClient.getCodexClientVersionSource(), "registry");
});

test("a registry that recovers after a failure stops reporting the fallback source", async () => {
  test.mock.method(console, "warn", () => {});
  await codexClient.refreshCodexClientVersion(async () => {
    throw new Error("offline");
  });
  assert.equal(codexClient.getCodexClientVersionSource(), "fallback");

  const realNow = Date.now;
  test.mock.method(Date, "now", () => realNow() + 10 * 60 * 1000);
  await codexClient.refreshCodexClientVersion(async () => registryResponse("0.1.0"));
  assert.equal(codexClient.getCodexClientVersionSource(), "pinned");
});

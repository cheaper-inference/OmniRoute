import test from "node:test";
import assert from "node:assert/strict";

import {
  resolveAntigravityIdeVersion,
  resolveAntigravityCliVersion,
  getCachedAntigravityIdeVersion,
  getCachedAntigravityCliVersion,
  clearAntigravityVersionCaches,
  ANTIGRAVITY_IDE_VERSION_OVERRIDE_ENV,
  ANTIGRAVITY_CLI_VERSION_OVERRIDE_ENV,
  ANTIGRAVITY_IDE_FALLBACK_VERSION,
  ANTIGRAVITY_CLI_FALLBACK_VERSION,
} from "../../../open-sse/services/antigravityVersion.ts";

// A fetch that must never be called: when the operator override is set, the
// resolver returns it without touching the release feed or GitHub.
const forbiddenFetch = (() => {
  throw new Error("fetch must not run when an override is set");
}) as unknown as typeof fetch;

function withEnv(name: string, value: string | undefined, run: () => Promise<void>): Promise<void> {
  const previous = process.env[name];
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
  clearAntigravityVersionCaches();
  return run().finally(() => {
    if (previous === undefined) delete process.env[name];
    else process.env[name] = previous;
    clearAntigravityVersionCaches();
  });
}

test("IDE override is authoritative and skips the feed (even when lower than the pinned floor)", async () => {
  await withEnv(ANTIGRAVITY_IDE_VERSION_OVERRIDE_ENV, "2.0.0", async () => {
    assert.equal(await resolveAntigravityIdeVersion(forbiddenFetch), "2.0.0");
    assert.equal(getCachedAntigravityIdeVersion(), "2.0.0");
  });
});

test("CLI override is authoritative and skips the GitHub release lookup", async () => {
  await withEnv(ANTIGRAVITY_CLI_VERSION_OVERRIDE_ENV, "1.5.4", async () => {
    assert.equal(await resolveAntigravityCliVersion(forbiddenFetch), "1.5.4");
    assert.equal(getCachedAntigravityCliVersion(), "1.5.4");
  });
});

test("a malformed override is rejected and the pinned fallback is used", async () => {
  await withEnv(ANTIGRAVITY_IDE_VERSION_OVERRIDE_ENV, "not-a-version", async () => {
    const stub = (async () => ({ ok: false, status: 503 })) as unknown as typeof fetch;
    assert.equal(await resolveAntigravityIdeVersion(stub), ANTIGRAVITY_IDE_FALLBACK_VERSION);
  });
});

test("a 'v'-prefixed / suffixed override is normalized to x.y.z", async () => {
  await withEnv(ANTIGRAVITY_CLI_VERSION_OVERRIDE_ENV, "v1.5.4-beta.2", async () => {
    assert.equal(await resolveAntigravityCliVersion(forbiddenFetch), "1.5.4");
  });
});

test("without an override the resolver still falls back to the pinned floor on a failed fetch", async () => {
  await withEnv(ANTIGRAVITY_IDE_VERSION_OVERRIDE_ENV, undefined, async () => {
    const stub = (async () => ({ ok: false, status: 503 })) as unknown as typeof fetch;
    assert.equal(await resolveAntigravityIdeVersion(stub), ANTIGRAVITY_IDE_FALLBACK_VERSION);
  });
  await withEnv(ANTIGRAVITY_CLI_VERSION_OVERRIDE_ENV, undefined, async () => {
    const stub = (async () => ({ ok: false, status: 503 })) as unknown as typeof fetch;
    assert.equal(await resolveAntigravityCliVersion(stub), ANTIGRAVITY_CLI_FALLBACK_VERSION);
  });
});

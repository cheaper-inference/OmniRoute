/**
 * `expiryFirstOrder: "deadline"` must not be undone by OAuth session spreading.
 *
 * After any strategy picks an account, getProviderCredentials moves a request to a
 * peer OAuth account (priority <= selected + 1) that has fewer foreign sessions in
 * flight. Measured 2026-11-09 on a two-account Claude pool: with one Claude Code
 * conversation every request went to the account whose week resets first (Max), but
 * as soon as a second conversation ran in parallel it was moved to the other account
 * (Team, resetting two days later), so Team kept being spent.
 *
 * Deadline order is an explicit "spend this account first" decision, so spreading
 * is skipped there. The default rate order keeps spreading as before.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-expiry-spread-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "expiry-spread-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const auth = await import("../../src/sse/services/auth.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");
const oauthOccupancy = await import("../../open-sse/services/oauthSessionOccupancy.ts");

const HOUR = 60 * 60 * 1000;

async function seedClaude(name: string, priority: number) {
  return providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name,
    accessToken: `token-${name}`,
    refreshToken: `refresh-${name}`,
    isActive: true,
    priority,
    testStatus: "active",
  });
}

function windowAt(remainingPercentage: number, resetInMs: number) {
  return { remainingPercentage, resetAt: new Date(Date.now() + resetInMs).toISOString() };
}

async function seedPool() {
  const team = await seedClaude("team", 1);
  const max = await seedClaude("max", 2);
  // Team: week resets in ~87h; Max: week resets in ~38h (the 2026-11-09 shape).
  quotaCache.setQuotaCache(team.id, "claude", {
    "session (5h)": windowAt(82, 4.7 * HOUR),
    "weekly (7d)": windowAt(30, 87 * HOUR),
  });
  quotaCache.setQuotaCache(max.id, "claude", { "weekly (7d)": windowAt(51, 38 * HOUR) });
  return { team, max };
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("deadline order keeps a second concurrent session on the nearest-deadline account", async () => {
  await settingsDb.updateSettings({
    fallbackStrategy: "fill-first",
    providerStrategies: {
      claude: { fallbackStrategy: "expiry-first", expiryFirstOrder: "deadline" },
    },
  });
  const { max } = await seedPool();

  const first = await auth.getProviderCredentials("claude", null, null, null, {
    sessionKey: "conversation-a",
    reserveOAuthSession: true,
  });
  assert.equal(first.connectionId, max.id);
  assert.equal(oauthOccupancy.getForeignOAuthSessionCount(max.id, "conversation-b"), 1);

  const second = await auth.getProviderCredentials("claude", null, null, null, {
    sessionKey: "conversation-b",
    reserveOAuthSession: true,
  });
  assert.equal(second.connectionId, max.id, "spreading must not move it to the later deadline");

  first.releaseOAuthSession?.();
  second.releaseOAuthSession?.();
});

test("rate order still spreads a concurrent session to the free peer", async () => {
  await settingsDb.updateSettings({
    fallbackStrategy: "fill-first",
    providerStrategies: { claude: { fallbackStrategy: "expiry-first" } },
  });
  const { team, max } = await seedPool();
  const release = oauthOccupancy.reserveOAuthSession(max.id, "conversation-c");

  const next = await auth.getProviderCredentials("claude", null, null, null, {
    sessionKey: "conversation-d",
    reserveOAuthSession: true,
  });
  assert.equal(next.connectionId, team.id);

  next.releaseOAuthSession?.();
  release();
});

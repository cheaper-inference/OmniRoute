/**
 * Releasing the PERSISTED half of a recovered quota-family lock (#20343).
 *
 * A family lock is stored twice: in the in-memory lockout store AND on the connection
 * row (`antigravityFamilyRateLimitedUntil[family]` for Antigravity/agy,
 * `codexScopeRateLimitedUntil[scope]` for Codex). The connection-row copy is rehydrated
 * on the next credential read, so clearing only the in-memory entry would restore the
 * lock immediately and the early recovery the probe just proved would never reach
 * routing.
 *
 * Real DB (a temp DATA_DIR) and real connection rows; no network.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-release-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { releasePersistedFamilyLock } =
  await import("../../src/lib/credentialHealth/quotaProbeRecoveryRelease.ts");
const { lockProviderAliases } =
  await import("../../src/lib/credentialHealth/lockProviderAliases.ts");

const DAY = 24 * 3_600_000;

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function antigravityConnection(psd: Record<string, unknown>): Promise<string> {
  const conn = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: `agy-${Math.random().toString(36).slice(2, 8)}`,
    isActive: true,
    providerSpecificData: psd,
  });
  return String((conn as { id: string }).id);
}

async function codexConnection(psd: Record<string, unknown>): Promise<string> {
  const conn = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: `cx-${Math.random().toString(36).slice(2, 8)}`,
    isActive: true,
    providerSpecificData: psd,
  });
  return String((conn as { id: string }).id);
}

async function psdOf(id: string): Promise<Record<string, unknown>> {
  const conn = (await providersDb.getProviderConnectionById(id)) as {
    providerSpecificData?: Record<string, unknown> | null;
  } | null;
  return (conn?.providerSpecificData ?? {}) as Record<string, unknown>;
}

function candidate(overrides: Record<string, unknown>) {
  return {
    provider: "antigravity",
    connectionId: "unknown",
    model: "family:gemini",
    scope: "quota_family" as const,
    reason: "quota_exhausted",
    until: Date.now() + 5 * DAY,
    lockedAt: Date.now(),
    ...overrides,
  };
}

test("both Antigravity spellings are one lock set", () => {
  assert.deepEqual(lockProviderAliases("agy"), ["agy", "antigravity"]);
  assert.deepEqual(lockProviderAliases("antigravity"), ["agy", "antigravity"]);
  assert.deepEqual(lockProviderAliases("codex"), ["codex"], "no alias pair of its own");
  assert.deepEqual(lockProviderAliases(null), []);
});

test("recovering one Antigravity family drops only that family's saved deadline", async () => {
  const until = new Date(Date.now() + 5 * DAY).toISOString();
  const connId = await antigravityConnection({
    antigravityFamilyRateLimitedUntil: { gemini: until, claude: until, argon: until },
    unrelated: "kept",
  });

  assert.equal(
    await releasePersistedFamilyLock(candidate({ connectionId: connId, model: "family:gemini" })),
    true
  );

  const psd = await psdOf(connId);
  assert.deepEqual(
    psd.antigravityFamilyRateLimitedUntil,
    { claude: until, argon: until },
    "the sibling families keep their deadlines"
  );
  assert.equal(psd.unrelated, "kept", "unrelated connection state is untouched");
});

test("the family record is dropped entirely once its last deadline goes", async () => {
  const connId = await antigravityConnection({
    antigravityFamilyRateLimitedUntil: { claude: new Date(Date.now() + 5 * DAY).toISOString() },
  });

  await releasePersistedFamilyLock(candidate({ connectionId: connId, model: "family:claude" }));

  assert.equal(
    (await psdOf(connId)).antigravityFamilyRateLimitedUntil,
    undefined,
    "an empty record is removed, not left as {}"
  );
});

test("a family with no saved deadline reports nothing released", async () => {
  const connId = await antigravityConnection({
    antigravityFamilyRateLimitedUntil: {
      claude: new Date(Date.now() + 5 * DAY).toISOString(),
    },
  });
  assert.equal(
    await releasePersistedFamilyLock(candidate({ connectionId: connId, model: "family:argon" })),
    false
  );
});

test("an exact lock never releases a family record shared by its siblings", async () => {
  const until = new Date(Date.now() + 5 * DAY).toISOString();
  const connId = await antigravityConnection({
    antigravityFamilyRateLimitedUntil: { gemini: until },
  });

  assert.equal(
    await releasePersistedFamilyLock(
      candidate({ connectionId: connId, model: "gemini-3-pro", scope: "exact" })
    ),
    false
  );
  assert.deepEqual((await psdOf(connId)).antigravityFamilyRateLimitedUntil, { gemini: until });
});

test("a Codex recovery clears the matching scope cooldown only", async () => {
  const until = new Date(Date.now() + 5 * DAY).toISOString();
  const connId = await codexConnection({
    codexScopeRateLimitedUntil: { codex: until, spark: until },
  });

  assert.equal(
    await releasePersistedFamilyLock(
      candidate({ provider: "codex", connectionId: connId, model: "codex" })
    ),
    true
  );

  const psd = await psdOf(connId);
  assert.deepEqual(
    psd.codexScopeRateLimitedUntil,
    { spark: until },
    "the spark scope keeps its own cooldown"
  );

  await releasePersistedFamilyLock(
    candidate({ provider: "codex", connectionId: connId, model: "spark" })
  );
  assert.deepEqual((await psdOf(connId)).codexScopeRateLimitedUntil, {});
});

test("a lock whose provider keeps no connection-row record is a quiet no-op", async () => {
  const connId = await antigravityConnection({});
  assert.equal(
    await releasePersistedFamilyLock(
      candidate({ provider: "openai", connectionId: connId, model: "family:gemini" })
    ),
    false,
    "an unknown bucket or provider must not guess at stored state"
  );
});

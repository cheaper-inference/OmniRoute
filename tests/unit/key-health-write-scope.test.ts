// recordKeyHealthStatus() persisted `{ ...creds.providerSpecificData, apiKeyHealth }`. In the
// chat path those credentials are a per-request copy carrying request-local keys
// (`ccSessionId`, `targetFormat`, `apiType`, the rotated `selectedKeyId`), so one request's
// values became stored connection state, and the stale snapshot overwrote concurrent edits.
// Only the apiKeyHealth slice may be written. A persisted sticky key in cooldown must also not
// be handed back by the rotator.
import test from "node:test";
import { credentialFingerprint } from "../../src/shared/utils/credentialFingerprint.ts";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createHash } from "node:crypto";
import { scanStatusLists, statusListNames } from "../helpers/statusListScan";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-key-health-scope-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const {
  createProviderConnection,
  getProviderConnectionById,
  updateProviderConnection,
  mergeConnectionProviderSpecificData,
  setConnectionRateLimitUntil,
  parseCooldownUntilMs,
} = await import("../../src/lib/db/providers.ts");
const { recordKeyHealthStatus } = await import("../../open-sse/handlers/chatCore/keyHealth.ts");
const { recordKeyCooldown, resolveKeyForRequest, removeConnectionHealth } =
  await import("../../open-sse/services/apiKeyRotator.ts");
const auth = await import("../../src/sse/services/auth.ts");

test("the parked-status vocabulary keeps its dependency-free home", () => {
  const leafSource = fs.readFileSync(
    path.join(process.cwd(), "src/shared/utils/parkedStatus.ts"),
    "utf8"
  );
  // Type-only imports are erased at load, so they cannot create a load-order edge. A re-export or
  // a require creates the same edge as an import and was invisible to the first version of this guard.
  const runtimeEdges = [
    /^\s*import\s+(?!type\b)\S/m,
    /\bimport\s*\(/,
    /^\s*export\s+\*(\s+as\s+\w+)?\s+from\s+/m,
    /^\s*export\s*\{[^}]*\}\s*from\s+/m,
    /\brequire\s*\(/,
  ];
  assert.equal(
    runtimeEdges.some((pattern) => pattern.test(leafSource)),
    false,
    "the predicate module must reach no other module at runtime, by any syntax"
  );
});

test("the db-facing module does not republish the vocabulary", async () => {
  const wrapper = await import("../../src/shared/utils/terminalStatus.ts");
  for (const name of ["isParkedTestStatus", "TERMINAL_TEST_STATUSES"]) {
    assert.equal(
      name in wrapper,
      false,
      `re-publishing ${name} through the db-facing module recreates the cycle for every importer`
    );
  }
  // An aliased or namespaced re-export publishes neither symbol under its own name, so compare what
  // the module actually hands out against the vocabulary's own values.
  const home = await import("../../src/shared/utils/parkedStatus.ts");
  const vocabulary = [home.isParkedTestStatus, home.TERMINAL_TEST_STATUSES, home.PARKED_EXCEPT_QUOTA_EXHAUSTION];
  for (const [key, value] of Object.entries(wrapper)) {
    const republished =
      vocabulary.includes(value as never) ||
      (typeof value === "object" &&
        value !== null &&
        vocabulary.some((symbol) => Object.values(value as object).includes(symbol)));
    assert.equal(
      republished,
      false,
      `the db-facing module must not republish the vocabulary as ${key}`
    );
  }
});

test("every availability mirror agrees that a deactivated row is parked", async () => {
  const { resolveProviderAvailability } = await import("../../src/lib/providerAvailability.ts");
  const { isProviderUsable } = await import("../../src/lib/freeProviderRankings.ts");
  const input = {
    isActive: true,
    hasCredential: true,
    testStatus: "deactivated",
    lastErrorAt: "2026-01-01T00:00:00.000Z",
  } as unknown as Parameters<typeof resolveProviderAvailability>[0];

  assert.equal(
    resolveProviderAvailability(input).state,
    "STALE_TERMINAL",
    "a parked status must not resolve to AVAILABLE just because this classifier has its own list"
  );
  const connection = {
    id: "avail-deactivated",
    provider: "openai",
    isActive: true,
    testStatus: "deactivated",
    rateLimitedUntil: null,
  } as unknown as Parameters<typeof isProviderUsable>[0][number];
  assert.equal(
    isProviderUsable([connection]),
    false,
    "the ranking must not offer a parked connection as usable"
  );
});

test("the resilience explanation reads the same terminal vocabulary", async () => {
  const { isTerminalStatus } = await import("../../src/lib/usage/resilienceExplain.ts");
  for (const status of ["banned", "expired", "deactivated", "credits_exhausted", " Deactivated "]) {
    assert.equal(isTerminalStatus(status), true, `${status} must read as terminal`);
  }
  assert.equal(isTerminalStatus("active"), false);
});

test("connection recovery keeps quota exhaustion recoverable", async () => {
  const { PARKED_EXCEPT_QUOTA_EXHAUSTION } = await import(
    "../../src/shared/utils/parkedStatus.ts"
  );
  for (const status of ["banned", "expired", "deactivated"]) {
    assert.equal(PARKED_EXCEPT_QUOTA_EXHAUSTION.has(status), true, `${status} is terminal here`);
  }
  assert.equal(
    PARKED_EXCEPT_QUOTA_EXHAUSTION.has("credits_exhausted"),
    false,
    "metered quotas reset on a time window and recover through the reprobe"
  );
});

test("the optional-key path honours the parked vocabulary", async () => {
  const { isConnectionHealthy } = await import("../../src/sse/services/noAuthOptionalApiKey.ts");
  const row = (testStatus: string | null, rateLimitedUntil: string | null = null) =>
    ({ testStatus, rateLimitedUntil }) as never;
  for (const status of ["banned", "expired", "deactivated", "credits_exhausted", " Banned "]) {
    assert.equal(isConnectionHealthy(row(status)), false, `${status} must not be handed out`);
  }
  assert.equal(isConnectionHealthy(row("unavailable")), false);
  assert.equal(isConnectionHealthy(row(null, new Date(Date.now() + 60_000).toISOString())), false);
  assert.equal(isConnectionHealthy(row("active")), true, "a healthy row must still be usable");
});

test("warmup skips every parked status, including quota exhaustion", async () => {
  const { isWarmupSkippedStatus } = await import("../../src/lib/warmupScheduler.ts");
  for (const status of ["banned", "expired", "deactivated", "credits_exhausted", " Banned "]) {
    assert.equal(isWarmupSkippedStatus(status), true, `${status} must not be warmed`);
  }
  assert.equal(isWarmupSkippedStatus("active"), false);
});

test("quota exhaustion is not parked for the callers that refresh it", async () => {
  const { PARKED_EXCEPT_QUOTA_EXHAUSTION, TERMINAL_TEST_STATUSES } = await import(
    "../../src/shared/utils/parkedStatus.ts"
  );
  assert.equal(TERMINAL_TEST_STATUSES.has("credits_exhausted"), true);
  assert.equal(
    PARKED_EXCEPT_QUOTA_EXHAUSTION.has("credits_exhausted"),
    false,
    "a sweep whose job is to refresh quota exhaustion must not treat it as parked"
  );
  for (const status of ["banned", "expired", "deactivated"]) {
    assert.equal(PARKED_EXCEPT_QUOTA_EXHAUSTION.has(status), true);
  }
});

test("the vision bridge refuses parked statuses but not quota exhaustion", async () => {
  const { hasTerminalConnectionStatus } = await import(
    "../../src/lib/guardrails/visionBridgeCredentials.ts"
  );
  const row = (testStatus: string) => ({ testStatus }) as { testStatus: string };
  for (const status of ["banned", "expired", "deactivated", "disabled", " Banned "]) {
    assert.equal(hasTerminalConnectionStatus(row(status) as never), true, `${status} is terminal`);
  }
  assert.equal(
    hasTerminalConnectionStatus(row("credits_exhausted") as never),
    false,
    "the request gate allows quota exhaustion for free models; the bridge must agree"
  );
});

test("the credential fingerprint has a single implementation", () => {
  const readers = [
    "open-sse/handlers/chatCore/keyHealth.ts",
    "src/lib/db/providers/keyHealthDelta.ts",
  ];
  for (const rel of readers) {
    const source = fs.readFileSync(path.join(process.cwd(), rel), "utf8");
    assert.equal(
      /createHash\s*\(/.test(source),
      false,
      `${rel} must use the shared fingerprint; two implementations silently drop every delta`
    );
    assert.equal(/shared\/utils\/credentialFingerprint/.test(source), true);
  }
});

test("muse claim candidates treat a parked row as unavailable", async () => {
  const { museClaimCandidates } = await import("../../src/sse/services/museSessionOwnership.ts");
  const rows = [
    { id: "muse-parked", authType: "oauth", testStatus: "deactivated", rateLimitedUntil: null },
    { id: "muse-live", authType: "oauth", testStatus: "active", rateLimitedUntil: null },
  ];
  const candidates = museClaimCandidates(rows, "muse-code");
  assert.equal(candidates.find((c) => c.id === "muse-parked")?.unavailable, true);
  assert.equal(
    candidates.find((c) => c.id === "muse-live")?.unavailable,
    false,
    "the live row is the control: the flag must not be unconditional"
  );
});

test("no module outside the vocabulary home declares its own parked set", async () => {
  const { TERMINAL_TEST_STATUSES, PARKED_EXCEPT_QUOTA_EXHAUSTION } = await import(
    "../../src/shared/utils/parkedStatus.ts"
  );
  const KNOWN_STATUSES = new Set([
    ...TERMINAL_TEST_STATUSES,
    ...PARKED_EXCEPT_QUOTA_EXHAUSTION,
    "invalid",
    "error",
    "unavailable",
    "rate_limited",
    "disabled",
    "active",
    "warning",
    "quota_exhausted",
  ]);
  const offenders = scanStatusLists(
    ["src", "open-sse"],
    KNOWN_STATUSES,
    TERMINAL_TEST_STATUSES,
    (rel) => rel.endsWith("shared/utils/parkedStatus.ts")
  );
  assert.deepEqual(offenders, [], "a private status list drifts from the gate by construction");
});

// The guard above is green on a clean tree, so prove it can see a list at all, and prove each of
// its inputs matters: a green scan that cannot red is indistinguishable from one that looked at
// nothing, and an oracle nobody pins is an oracle that can be emptied unnoticed.
test("the status-list scan sees a list, ignores rows, and depends on its inputs", async () => {
  const { TERMINAL_TEST_STATUSES } = await import("../../src/shared/utils/parkedStatus.ts");
  const known = new Set([...TERMINAL_TEST_STATUSES, "active"]);
  const scan = (source: string, oracle = known) =>
    statusListNames("probe.ts", source, oracle, TERMINAL_TEST_STATUSES);

  assert.deepEqual(scan('const SUBSET = ["deactivated", "expired"];\n'), ["probe.ts:SUBSET"]);
  // A mixed list is not a status list: it carries something that is not a status at all.
  assert.deepEqual(scan('const MIXED = ["deactivated", "something-else"];\n'), []);
  // A row list is data, and a presentation list is presentation.
  assert.deepEqual(
    scan('const ROWS = [{ status: "deactivated" }];\nconst CHIP_OPTIONS = ["deactivated"];\n'),
    []
  );
  // The oracle is an input, not a constant: an empty known-status set stops the scan, which is
  // exactly why the guard passes the real vocabulary rather than a literal of its own.
  assert.deepEqual(scan('const SUBSET = ["deactivated"];\n', new Set()), []);
});

test("the scan reads the tree it claims to read", async () => {
  const { sourceFiles } = await import("../helpers/classScan.ts");
  const files = sourceFiles("src", "open-sse");
  assert.ok(files.length > 1000, `expected the whole tree, got ${files.length} files`);
  assert.ok(
    files.some((file) => file.endsWith("src/shared/utils/parkedStatus.ts")),
    "the vocabulary home must be in the scanned set"
  );
  assert.ok(
    !files.some((file) => /\.(test|spec|d)\.tsx?$/.test(file)),
    "test and declaration files are excluded by the shared walker"
  );
});

test("generation matching without credentials fails loudly instead of dropping every delta", async () => {
  const { mergeKeyHealthDelta } = await import("../../src/lib/db/providers/keyHealthDelta.ts");
  assert.throws(
    () =>
      mergeKeyHealthDelta(
        { apiKeyHealth: { primary: { status: "ok", failures: 0 } } },
        { primary: { status: "invalid", failures: 1, generation: "abc" } },
        {},
        { matchKeyGeneration: true }
      ),
    /matchKeyGeneration requires the connection credentials/
  );
  // Supplying the row's own material lets the same call through.
  const merged = mergeKeyHealthDelta(
    null,
    { primary: { status: "invalid", failures: 1, generation: credentialFingerprint("sk-live") } },
    { apiKey: "sk-live" },
    { matchKeyGeneration: true }
  );
  assert.equal(merged.primary?.status, "invalid");
});

test("an ISO cooldown deadline counts as limited", async () => {
  const { createProviderConnection, updateProviderConnection } = await import(
    "../../src/lib/db/providers.ts"
  );
  const { isConnectionRateLimited } = await import("../../src/lib/db/providers/rateLimit.ts");
  const conn = await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "IsoTail",
    apiKey: "sk-iso",
    isActive: true,
  });
  // The dashboard writes ISO text into the same column the chat path writes epoch milliseconds to.
  await updateProviderConnection(conn.id, {
    rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
  });
  assert.equal(isConnectionRateLimited(conn.id), true, "an ISO deadline is still a deadline");

  await updateProviderConnection(conn.id, {
    rateLimitedUntil: new Date(Date.now() - 60_000).toISOString(),
  });
  assert.equal(isConnectionRateLimited(conn.id), false, "an elapsed deadline is not limited");
});


test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const K0 = "sk-primary-key-health";
const K1 = "sk-extra-key-health";

const fixtureKeys = new Map<string, string>();
let fixtureSerial = 0;

async function seedConnection(extra: Record<string, unknown> = {}, provider = "openai") {
  const key = `${K0}-${++fixtureSerial}`;
  const conn = (await createProviderConnection({
    provider,
    authType: "apikey",
    name: `key-health-${Math.random().toString(36).slice(2)}`,
    apiKey: key,
    providerSpecificData: { extraApiKeys: [K1], ...extra },
  })) as { id: string };
  fixtureKeys.set(conn.id, key);
  return conn.id;
}

async function storedPsd(id: string): Promise<Record<string, unknown>> {
  const row = (await getProviderConnectionById(id)) as {
    providerSpecificData?: Record<string, unknown>;
  };
  return row?.providerSpecificData ?? {};
}

// The write is fire-and-forget; give it a turn of the event loop and a DB round trip.
const settle = () => new Promise((resolve) => setTimeout(resolve, 150));

function requestCreds(id: string, psd: Record<string, unknown>) {
  return {
    connectionId: id,
    apiKey: fixtureKeys.get(id) ?? K0,
    providerSpecificData: {
      ...psd,
      ccSessionId: "session-of-another-caller",
      targetFormat: "claude",
      apiType: "responses",
      selectedKeyId: "extra_0",
    },
  } as Record<string, unknown>;
}

test("a key-health write stores apiKeyHealth only, not request-local keys", async () => {
  const id = await seedConnection();
  recordKeyHealthStatus(429, requestCreds(id, await storedPsd(id)));
  await settle();
  const psd = await storedPsd(id);
  assert.ok(psd.apiKeyHealth, "apiKeyHealth was persisted");
  for (const key of ["ccSessionId", "targetFormat", "apiType", "selectedKeyId"]) {
    assert.equal(psd[key], undefined, `${key} leaked into the stored connection`);
  }
  removeConnectionHealth(id);
});

test("a key-health write keeps a concurrent change to providerSpecificData", async () => {
  const id = await seedConnection({ note: "old" });
  const snapshot = await storedPsd(id);
  await updateProviderConnection(id, { providerSpecificData: { ...snapshot, note: "new" } });
  recordKeyHealthStatus(429, requestCreds(id, snapshot));
  await settle();
  assert.equal((await storedPsd(id)).note, "new");
  removeConnectionHealth(id);
});

test("a sticky key in cooldown is not handed back by the rotator", () => {
  const id = "key-health-sticky-cooldown";
  recordKeyCooldown(id, "extra_0", 60_000);
  const resolved = resolveKeyForRequest(id, K0, [K1], "extra_0");
  assert.notEqual(resolved?.keyId, "extra_0");
  removeConnectionHealth(id);
});

test("a stale inference snapshot keeps a sibling verdict committed after dispatch", async () => {
  const id = await seedConnection();
  const snapshot = await storedPsd(id);
  const rejectedAt = "2026-01-01T00:00:00.000Z";
  await updateProviderConnection(id, {
    providerSpecificData: {
      ...snapshot,
      apiKeyHealth: { primary: { status: "invalid", failures: 2, rejectedAt } },
    },
  });
  recordKeyHealthStatus(429, requestCreds(id, snapshot));
  await settle();
  const health = (await storedPsd(id)).apiKeyHealth as Record<string, { rejectedAt?: string }>;
  assert.equal(health.primary?.rejectedAt, rejectedAt);
  assert.ok(health.extra_0, "the current key outcome is still written");
  removeConnectionHealth(id);
});

test("an older live sibling entry cannot overwrite its newer database verdict", async () => {
  const id = await seedConnection();
  const snapshot = await storedPsd(id);
  recordKeyCooldown(id, "primary", 60_000);
  const rejectedAt = "2026-01-01T00:00:00.000Z";
  await updateProviderConnection(id, {
    providerSpecificData: {
      ...snapshot,
      apiKeyHealth: { primary: { status: "invalid", failures: 2, rejectedAt } },
    },
  });
  recordKeyHealthStatus(429, requestCreds(id, snapshot));
  await settle();
  const health = (await storedPsd(id)).apiKeyHealth as Record<string, { rejectedAt?: string }>;
  assert.equal(health.primary?.rejectedAt, rejectedAt);
  removeConnectionHealth(id);
});

test("per-key writes accumulate in SQLite and recovery changes only the observed key", async () => {
  const id = await seedConnection();
  const snapshot = await storedPsd(id);
  const primary = {
    ...requestCreds(id, snapshot),
    providerSpecificData: { ...snapshot, selectedKeyId: "primary" },
  };
  recordKeyHealthStatus(401, primary, undefined, undefined, "", null, 1);
  recordKeyHealthStatus(401, requestCreds(id, snapshot), undefined, undefined, "", null, 2);
  await settle();
  const before = (await storedPsd(id)).apiKeyHealth as Record<
    string,
    { rejectedAt?: string | null; status: string }
  >;
  assert.ok(before.primary.rejectedAt);
  assert.ok(before.extra_0.rejectedAt);
  recordKeyHealthStatus(200, primary, undefined, undefined, "", null, 3);
  await settle();
  const after = (await storedPsd(id)).apiKeyHealth as Record<
    string,
    { rejectedAt?: string | null; status: string }
  >;
  assert.equal(after.primary.rejectedAt ?? null, null);
  assert.equal(after.primary.status, "active");
  assert.deepEqual(
    after.extra_0,
    before.extra_0,
    "recovering primary must not edit sibling health"
  );
  removeConnectionHealth(id);
});

test("ordinary provider-data patches retain their existing whole-map replacement semantics", async () => {
  const id = await seedConnection({
    apiKeyHealth: { primary: { status: "invalid", failures: 2 } },
  });
  await mergeConnectionProviderSpecificData(id, {
    apiKeyHealth: { extra_0: { status: "active", failures: 0 } },
  });
  assert.deepEqual((await storedPsd(id)).apiKeyHealth, {
    extra_0: { status: "active", failures: 0 },
  });
});

test("a cold-process 429 does not erase a terminal verdict already committed for that key", async () => {
  const id = await seedConnection();
  const snapshot = await storedPsd(id);
  const rejectedAt = "2026-02-01T00:00:00.000Z";
  await updateProviderConnection(id, {
    providerSpecificData: {
      ...snapshot,
      apiKeyHealth: { extra_0: { status: "invalid", failures: 2, rejectedAt } },
    },
  });
  recordKeyHealthStatus(429, requestCreds(id, snapshot), undefined, undefined, "", 60_000, 1);
  await settle();
  const entry = (
    (await storedPsd(id)).apiKeyHealth as Record<
      string,
      { status: string; failures: number; rejectedAt?: string; cooldownUntil?: string | null }
    >
  ).extra_0;
  assert.equal(entry.status, "invalid");
  assert.equal(entry.failures, 2);
  assert.equal(entry.rejectedAt, rejectedAt);
  assert.ok(entry.cooldownUntil);
  removeConnectionHealth(id);
});

for (const replacement of [[], ["replacement-extra-material"]]) {
  test(`a late verdict cannot persist after the selected extra is ${replacement.length ? "replaced" : "deleted"}`, async () => {
    const id = await seedConnection();
    const snapshot = await storedPsd(id);
    await updateProviderConnection(id, {
      providerSpecificData: { ...snapshot, extraApiKeys: replacement, apiKeyHealth: {} },
    });
    recordKeyHealthStatus(401, requestCreds(id, snapshot), undefined, undefined, "", null, 1);
    await settle();
    const health = (await storedPsd(id)).apiKeyHealth as Record<string, unknown> | undefined;
    assert.equal(health?.extra_0, undefined, "the old material no longer belongs to this key id");
    removeConnectionHealth(id);
  });
}

test("the opt-in transaction filters non-key entries in both stored map and delta", async () => {
  const id = await seedConnection({
    apiKeyHealth: JSON.parse(
      '{"primary":{"status":"invalid","failures":2},"__proto__":{"leaked":true},"ccSessionId":{"secret":"not-a-health-entry"}}'
    ),
  });
  await mergeConnectionProviderSpecificData(
    id,
    {
      apiKeyHealth: JSON.parse(
        '{"extra_0":{"status":"active","failures":0},"targetFormat":{"secret":"not-a-health-entry"}}'
      ),
    },
    { mergeApiKeyHealth: true }
  );
  assert.deepEqual(Object.keys((await storedPsd(id)).apiKeyHealth as object).sort(), [
    "extra_0",
    "primary",
  ]);
});

test("a replaced credential does not inherit its predecessor's invalid verdict on 429", async () => {
  const oldGeneration = createHash("sha256")
    .update("retired-extra-material")
    .digest("hex")
    .slice(0, 16);
  const id = await seedConnection({
    apiKeyHealth: {
      extra_0: {
        status: "invalid",
        failures: 2,
        rejectedAt: "2026-01-01T00:00:00.000Z",
        generation: oldGeneration,
      },
    },
  });
  recordKeyHealthStatus(
    429,
    requestCreds(id, await storedPsd(id)),
    undefined,
    undefined,
    "",
    30_000,
    1
  );
  await settle();
  const entry = (
    (await storedPsd(id)).apiKeyHealth as Record<string, { status: string; rejectedAt?: string }>
  ).extra_0;
  assert.equal(entry.status, "active");
  assert.equal(entry.rejectedAt, undefined);
  removeConnectionHealth(id);
});

test("a stale live rejection on 429 cannot resurrect a verdict cleared in storage", async () => {
  const id = await seedConnection();
  const snapshot = await storedPsd(id);
  recordKeyHealthStatus(401, requestCreds(id, snapshot), undefined, undefined, "", null, 1);
  await settle();
  const data = await storedPsd(id);
  await updateProviderConnection(id, {
    providerSpecificData: { ...data, apiKeyHealth: { extra_0: { status: "active", failures: 0 } } },
  });
  recordKeyHealthStatus(429, requestCreds(id, snapshot), undefined, undefined, "", 30_000, 2);
  await settle();
  const entry = (
    (await storedPsd(id)).apiKeyHealth as Record<
      string,
      { status: string; failures: number; rejectedAt?: string }
    >
  ).extra_0;
  assert.equal(entry.status, "active");
  assert.equal(entry.failures, 0);
  assert.equal(entry.rejectedAt ?? null, null);
  removeConnectionHealth(id);
});

test("a probe failure cannot unpark a verdict parked while the probe was in flight", async () => {
  const id = await seedConnection();
  const parkedUntil = "2099-01-01T00:00:00.000Z";
  await updateProviderConnection(id, { testStatus: "banned", rateLimitedUntil: parkedUntil });
  // The probe carried the row as it was before parking: "error" plus a 30s retry window.
  await updateProviderConnection(
    id,
    {
      testStatus: "error",
      rateLimitedUntil: new Date(Date.now() + 30_000).toISOString(),
      lastError: "Account deactivated",
    },
    { probeHealthWrite: { outcome: "failure", startedAt: new Date(Date.now() - 60_000).toISOString() } }
  );
  const row = (await getProviderConnectionById(id)) as {
    testStatus?: string;
    rateLimitedUntil?: string;
    lastError?: string;
  };
  assert.equal(row.testStatus, "banned", "the row read inside the transaction is the authority");
  assert.equal(row.rateLimitedUntil, parkedUntil);
  assert.equal(row.lastError, "Account deactivated");
});

test("a deactivated row is parked and an unparked row still records the failure", async () => {
  const parkedId = await seedConnection();
  const parkedUntil = "2099-02-02T00:00:00.000Z";
  await updateProviderConnection(parkedId, { testStatus: "deactivated", rateLimitedUntil: parkedUntil });
  await updateProviderConnection(
    parkedId,
    { testStatus: "error", rateLimitedUntil: null },
    { probeHealthWrite: { outcome: "failure", startedAt: new Date(Date.now() - 60_000).toISOString() } }
  );
  const parked = (await getProviderConnectionById(parkedId)) as {
    testStatus?: string;
    rateLimitedUntil?: string;
  };
  assert.equal(parked.testStatus, "deactivated");
  assert.equal(parked.rateLimitedUntil, parkedUntil);

  const freshId = await seedConnection();
  await updateProviderConnection(
    freshId,
    { testStatus: "error", rateLimitedUntil: new Date(Date.now() + 30_000).toISOString() },
    { probeHealthWrite: { outcome: "failure", startedAt: new Date(Date.now() - 60_000).toISOString() } }
  );
  const fresh = (await getProviderConnectionById(freshId)) as {
    testStatus?: string;
    rateLimitedUntil?: string;
  };
  assert.equal(fresh.testStatus, "error");
  assert.ok(Date.parse(String(fresh.rateLimitedUntil)) > Date.now());
});

test("a passing probe cannot clear a cooldown stored while the probe was in flight", async () => {
  const id = await seedConnection();
  const parkedUntil = "2099-03-03T00:00:00.000Z";
  await updateProviderConnection(id, { testStatus: "active", rateLimitedUntil: parkedUntil });
  await updateProviderConnection(
    id,
    { testStatus: "active", rateLimitedUntil: null },
    { probeHealthWrite: { outcome: "success", startedAt: new Date(Date.now() - 60_000).toISOString() } }
  );
  const row = (await getProviderConnectionById(id)) as { rateLimitedUntil?: string };
  assert.equal(row.rateLimitedUntil, parkedUntil, "a passing probe must not overrule a quota statement");

  // Without the option the probe write clears it, which is the ordinary success path.
  const plainId = await seedConnection();
  await updateProviderConnection(plainId, { rateLimitedUntil: parkedUntil });
  await updateProviderConnection(plainId, { rateLimitedUntil: null });
  const plain = (await getProviderConnectionById(plainId)) as { rateLimitedUntil?: string };
  assert.equal(plain.rateLimitedUntil ?? null, null);
});

test("a failed probe cannot replace a parked verdict that predates it", async () => {
  const id = await seedConnection();
  await updateProviderConnection(id, {
    testStatus: "deactivated",
    lastErrorAt: "2026-01-01T00:00:00.000Z",
    isActive: false,
  });
  await updateProviderConnection(
    id,
    { testStatus: "expired", rateLimitedUntil: null, lastErrorType: "token_expired" },
    {
      probeHealthWrite: {
        outcome: "failure",
        startedAt: new Date(Date.now() - 1_000).toISOString(),
      },
    }
  );
  const row = (await getProviderConnectionById(id)) as {
    testStatus?: string;
    lastErrorType?: string;
  };
  assert.equal(row.testStatus, "deactivated", "one failed request does not lift a ban");
  assert.equal(row.lastErrorType, "token_expired", "the probe still reports what it saw");
});

test("a chatgpt expired probe failure cannot replace a parked verdict", async () => {
  const id = await seedConnection();
  const parkedUntil = "2099-04-04T00:00:00.000Z";
  await updateProviderConnection(id, {
    testStatus: "banned",
    rateLimitedUntil: parkedUntil,
    // A real parked row always carries the verdict's timestamp; without it the ordering
    // fallback, not the rule under test, would be what keeps the verdict.
    lastErrorAt: "2026-01-01T00:00:00.000Z",
  });
  await updateProviderConnection(
    id,
    { testStatus: "expired", rateLimitedUntil: null },
    { probeHealthWrite: { outcome: "failure", startedAt: new Date(Date.now() - 60_000).toISOString() } }
  );
  const row = (await getProviderConnectionById(id)) as {
    testStatus?: string;
    rateLimitedUntil?: string;
  };
  assert.equal(row.testStatus, "banned", "a different parked status does not outrank the stored one");
  assert.equal(
    row.rateLimitedUntil ?? null,
    null,
    "the expired verdict clears the retry cooldown by product contract"
  );
});

test("a deactivated connection is not handed out for dispatch", async () => {
  const provider = "mistral";
  const id = await seedConnection({}, provider);
  await updateProviderConnection(id, { testStatus: "banned", isActive: true });
  assert.equal(
    (await auth.getProviderCredentials(provider))?.connectionId,
    undefined,
    "control: a banned row is blocked"
  );

  await updateProviderConnection(id, { testStatus: "deactivated", isActive: true });
  assert.equal(
    (await auth.getProviderCredentials(provider))?.connectionId,
    undefined,
    "a deactivated row must be blocked like the other parked verdicts"
  );

  await updateProviderConnection(id, { testStatus: "active", isActive: true });
  const live = await auth.getProviderCredentials(provider);
  assert.equal(live?.connectionId, id, "control: the same row is selectable once it is active");
});

test("a passing probe cannot un-park a verdict that arrived after it started", async () => {
  const id = await seedConnection();
  const parkedAt = new Date().toISOString();
  await updateProviderConnection(id, {
    testStatus: "banned",
    lastErrorAt: parkedAt,
    isActive: false,
    rateLimitedUntil: "2099-06-06T00:00:00.000Z",
  });
  await updateProviderConnection(
    id,
    { testStatus: "active", isActive: true, rateLimitedUntil: null },
    {
      probeHealthWrite: {
        outcome: "success",
        startedAt: new Date(Date.parse(parkedAt) - 5_000).toISOString(),
      },
    }
  );
  const row = (await getProviderConnectionById(id)) as {
    testStatus?: string;
    isActive?: boolean;
    rateLimitedUntil?: string;
  };
  assert.equal(row.testStatus, "banned", "a verdict newer than the probe must survive it");
  assert.equal(row.isActive, false, "and must not be switched back on");
  assert.equal(row.rateLimitedUntil, "2099-06-06T00:00:00.000Z");
});

test("a credits-exhausted row keeps its activation when the probe cannot speak for it", async () => {
  const id = await seedConnection();
  const parkedAt = new Date().toISOString();
  await updateProviderConnection(id, {
    testStatus: "credits_exhausted",
    lastErrorAt: parkedAt,
    isActive: true,
    rateLimitedUntil: "2099-07-07T00:00:00.000Z",
  });
  await updateProviderConnection(
    id,
    { testStatus: "active", isActive: true, rateLimitedUntil: null },
    {
      probeHealthWrite: {
        outcome: "success",
        startedAt: new Date(Date.parse(parkedAt) - 5_000).toISOString(),
      },
    }
  );
  const row = (await getProviderConnectionById(id)) as {
    testStatus?: string;
    isActive?: boolean;
    rateLimitedUntil?: string;
  };
  assert.equal(row.testStatus, "credits_exhausted");
  assert.equal(row.isActive, true, "a quota-parked row stays enabled; the writer decides activation");
  assert.equal(row.rateLimitedUntil, "2099-07-07T00:00:00.000Z");
});

test("a parked verdict without a usable timestamp is not cleared by a passing probe", async () => {
  const id = await seedConnection();
  await updateProviderConnection(id, {
    testStatus: "banned",
    isActive: false,
  });
  await updateProviderConnection(
    id,
    { testStatus: "active", isActive: true },
    { probeHealthWrite: { outcome: "success", startedAt: new Date().toISOString() } }
  );
  const row = (await getProviderConnectionById(id)) as { testStatus?: string; isActive?: boolean };
  assert.equal(
    row.testStatus,
    "banned",
    "without a comparable timestamp the probe may not claim the verdict is older"
  );
  assert.equal(row.isActive, false);
});

test("a passing probe racing a ban keeps the ban marker", async () => {
  const id = await seedConnection();
  const parkedAt = new Date().toISOString();
  await updateProviderConnection(
    id,
    { testStatus: "banned", isActive: false, lastErrorAt: parkedAt, lastError: "banned" },
    { permanentBan: true }
  );
  const before = (await getProviderConnectionById(id)) as {
    providerSpecificData?: Record<string, unknown>;
  };
  assert.ok(before.providerSpecificData?.banDisabledAt, "the ban write marks the row");

  await updateProviderConnection(
    id,
    { testStatus: "active", isActive: true },
    {
      probeHealthWrite: {
        outcome: "success",
        startedAt: new Date(Date.parse(parkedAt) - 5_000).toISOString(),
      },
    }
  );
  const after = (await getProviderConnectionById(id)) as {
    testStatus?: string;
    isActive?: boolean;
    providerSpecificData?: Record<string, unknown>;
  };
  assert.equal(after.testStatus, "banned");
  assert.equal(after.isActive, false);
  assert.ok(
    after.providerSpecificData?.banDisabledAt,
    "the marker records what the write actually did, so it must survive"
  );
});

test("a verdict parked during the probe keeps its evidence, not the stale clear-state", async () => {
  const id = await seedConnection();
  const parkedAt = new Date().toISOString();
  await updateProviderConnection(id, {
    testStatus: "deactivated",
    lastError: "This account has been deactivated",
    lastErrorType: "account_deactivated",
    lastErrorAt: parkedAt,
    errorCode: "account_deactivated",
    isActive: false,
    rateLimitedUntil: "2099-08-08T00:00:00.000Z",
  });
  await updateProviderConnection(
    id,
    {
      testStatus: "active",
      isActive: true,
      lastError: null,
      lastErrorAt: null,
      lastErrorType: null,
      lastErrorSource: null,
      errorCode: null,
      rateLimitedUntil: null,
      backoffLevel: 0,
    },
    {
      probeHealthWrite: {
        outcome: "success",
        startedAt: new Date(Date.parse(parkedAt) - 5_000).toISOString(),
      },
    }
  );
  const row = (await getProviderConnectionById(id)) as {
    testStatus?: string;
    isActive?: boolean;
    lastError?: string | null;
    lastErrorAt?: string | null;
    lastErrorType?: string | null;
    errorCode?: string | null;
    rateLimitedUntil?: string | null;
  };
  assert.equal(row.testStatus, "deactivated");
  assert.equal(row.isActive, false);
  assert.equal(row.lastError, "This account has been deactivated");
  assert.equal(row.lastErrorAt, parkedAt);
  assert.equal(row.lastErrorType, "account_deactivated");
  assert.equal(row.errorCode, "account_deactivated");
  assert.equal(row.rateLimitedUntil, "2099-08-08T00:00:00.000Z");
});

test("a verdict stamped in the probe's own start millisecond is not cleared", async () => {
  const id = await seedConnection();
  const stamp = new Date().toISOString();
  await updateProviderConnection(id, {
    testStatus: "deactivated",
    lastErrorAt: stamp,
    isActive: false,
  });
  await updateProviderConnection(
    id,
    { testStatus: "active", isActive: true },
    { probeHealthWrite: { outcome: "success", startedAt: stamp } }
  );
  const row = (await getProviderConnectionById(id)) as { testStatus?: string; isActive?: boolean };
  assert.equal(row.testStatus, "deactivated", "equality is not proof that the verdict is older");
  assert.equal(row.isActive, false);
});

test("a passing probe still recovers a verdict parked before it started", async () => {
  const id = await seedConnection();
  await updateProviderConnection(id, {
    testStatus: "banned",
    lastErrorAt: "2026-01-01T00:00:00.000Z",
    isActive: false,
  });
  await updateProviderConnection(
    id,
    { testStatus: "active", isActive: true },
    { probeHealthWrite: { outcome: "success", startedAt: new Date().toISOString() } }
  );
  const row = (await getProviderConnectionById(id)) as { testStatus?: string; isActive?: boolean };
  assert.equal(row.testStatus, "active", "an older verdict is exactly what a passing probe may clear");
  assert.equal(row.isActive, true);
});

test("a padded parked status is still parked", async () => {
  const provider = "groq";
  const id = await seedConnection({}, provider);
  await updateProviderConnection(id, { testStatus: " banned ", isActive: true });
  assert.equal(
    (await auth.getProviderCredentials(provider))?.connectionId,
    undefined,
    "whitespace must not turn a parked verdict into a selectable one"
  );

  await updateProviderConnection(id, { testStatus: "active", isActive: true });
  assert.equal(
    (await auth.getProviderCredentials(provider))?.connectionId,
    id,
    "control: the same row is selectable once it is active"
  );
});

test("a cooldown written in the chat epoch-ms shape survives a passing probe", async () => {
  const id = await seedConnection();
  const until = Date.now() + 30 * 24 * 3600 * 1000;
  setConnectionRateLimitUntil(id, until);
  const stored = (await getProviderConnectionById(id)) as { rateLimitedUntil?: string };
  assert.ok(
    String(stored.rateLimitedUntil).includes("."),
    "the chat path stores epoch ms in a TEXT column, so the value carries a decimal"
  );
  assert.equal(parseCooldownUntilMs(stored.rateLimitedUntil), until);

  await updateProviderConnection(
    id,
    { rateLimitedUntil: null, testStatus: "active" },
    { probeHealthWrite: { outcome: "success", startedAt: new Date(Date.now() - 60_000).toISOString() } }
  );
  const row = (await getProviderConnectionById(id)) as { rateLimitedUntil?: string };
  assert.equal(
    parseCooldownUntilMs(row.rateLimitedUntil),
    until,
    "a passing probe must not clear a quota statement in the epoch-ms shape"
  );
});

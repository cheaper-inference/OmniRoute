/**
 * Egress probe: the address of every family the tunnel exposes.
 *
 * The egress probe stopped at the first echo target that answered and kept a
 * single address, so a log line never said which family that address belonged
 * to, and the address of the other family was never known at all. The journal
 * path now measures both echo targets and every line carries the address
 * observed for each family, one column per family.
 *
 * The probe itself is injected (`_setEgressProbeForTests`); the echo targets
 * and the addresses are produced by the production readers, never by a
 * hand-written table.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-egress-families-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const proxyLogger = await import("../../src/lib/proxyLogger.ts");
const proxyEgress = await import("../../src/lib/proxyEgress.ts");
const echoTarget = await import("../../src/lib/proxyEchoTarget.ts");
const egressAddress = await import("../../src/shared/network/egressAddress.ts");
const { proxyConfigToUrl } = await import("../../open-sse/utils/proxyDispatcher.ts");
const { mergeAppliedProxySink, safeLogEvents } =
  await import("../../src/sse/handlers/chatHelpers.ts");
const { tryOpenSync } = await import("../../src/lib/db/adapters/driverFactory.ts");
const { ensureProxyLogsColumns, hasColumn } = await import("../../src/lib/db/schemaColumns.ts");

const { probeEchoTargetsInParallel, resolveEgressEchoUrls } = echoTarget;
// The echo targets come from the production reader, in the order it returns them:
// the IPv6-first one, then the IPv4-only one.
const [dualTarget, ipv4Target] = resolveEgressEchoUrls({});
const { buildEgressObservation, getCachedEgressObservation } = proxyEgress;
const { demapEgressAddress, egressAddressFamily, observedEgressAddresses } = egressAddress;
const { EGRESS_FAMILY_LABEL_ARGUMENT } = egressAddress;

const PROBE_BUDGET_MS = 6000;
const PROXY = { type: "http", host: "127.0.0.1", port: 18099 };
const PROXY_URL = proxyConfigToUrl(PROXY) as string;

function resetStorage() {
  proxyEgress.clearEgressCache();
  proxyEgress._setEgressProbeForTests(null);
  proxyLogger.clearProxyLogs();
  core.closeDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  proxyEgress._setEgressProbeForTests(null);
  proxyEgress.clearEgressCache();
  proxyLogger.clearProxyLogs();
  core.closeDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

/** Let the fire-and-forget background measurement of the journal path settle. */
async function waitFor(predicate: () => boolean, label: string): Promise<void> {
  for (let i = 0; i < 200; i++) {
    if (predicate()) return;
    await new Promise((resolve) => setTimeout(resolve, 5));
  }
  assert.fail(`timed out waiting for ${label}`);
}

function journalArgs() {
  return {
    result: { success: true, status: 200, error: null },
    proxyInfo: mergeAppliedProxySink(
      { proxy: null, level: "direct", levelId: null },
      {
        proxy: PROXY,
      }
    ),
    proxyLatency: 5,
    provider: "openai",
    model: "gpt-5",
    sourceFormat: "openai",
    targetFormat: "openai",
    credentials: { connectionId: "conn-12345678" },
    comboName: null,
    clientRawRequest: null,
    correlationId: "corr-egress-families",
  };
}

function lastPersistedRow(): {
  egress_ip: string | null;
  egress_ip_v4: string | null;
  egress_ip_v6: string | null;
} {
  const db = core.getDbInstance();
  const row = db
    .prepare(
      "SELECT egress_ip, egress_ip_v4, egress_ip_v6 FROM proxy_logs ORDER BY rowid DESC LIMIT 1"
    )
    .get() as {
    egress_ip: string | null;
    egress_ip_v4: string | null;
    egress_ip_v6: string | null;
  };
  return row;
}

// ──────────────── Address family classification ────────────────

test("a mapped IPv4 address is classified as IPv4", () => {
  assert.equal(egressAddressFamily("203.0.113.7"), "ipv4");
  assert.equal(egressAddressFamily("::ffff:203.0.113.7"), "ipv4");
  assert.equal(egressAddressFamily("2001:db8::1"), "ipv6");
});

test("an address that is not an IP literal has no family", () => {
  assert.equal(egressAddressFamily("proxy.example.net"), null);
  assert.equal(egressAddressFamily("fe80::1%eth0"), null);
  assert.equal(egressAddressFamily(""), null);
  assert.equal(egressAddressFamily(null), null);
  assert.equal(egressAddressFamily(42), null);
});

test("the demapping helper strips the mapped prefix", () => {
  assert.equal(demapEgressAddress("::ffff:203.0.113.7"), "203.0.113.7");
  assert.equal(demapEgressAddress("203.0.113.7"), "203.0.113.7");
  assert.equal(demapEgressAddress("2001:db8::1"), "2001:db8::1");
});

test("an entry that is not an address is refused instead of crashing", () => {
  assert.equal(
    demapEgressAddress(42),
    null,
    "a value that is not a string is refused: no address is invented"
  );
  const malformed = {
    primary: 42,
    ipv4: null,
    ipv6: null,
  } as unknown as { primary: string | null; ipv4: string | null; ipv6: string | null };
  assert.deepEqual(
    observedEgressAddresses(malformed),
    [],
    "an address that is not a string is not rendered"
  );
});

test("the family label argument maps each family to its version", () => {
  assert.equal(EGRESS_FAMILY_LABEL_ARGUMENT.ipv4, "4");
  assert.equal(EGRESS_FAMILY_LABEL_ARGUMENT.ipv6, "6");
});

test("the observed address list keeps the primary first and only the observed families", () => {
  assert.deepEqual(
    observedEgressAddresses({ primary: "2001:db8::1", ipv4: "203.0.113.7", ipv6: "2001:db8::1" }),
    [
      { address: "2001:db8::1", family: "ipv6" },
      { address: "203.0.113.7", family: "ipv4" },
    ]
  );
  // No primary address but one observed family: that address alone, with its family.
  assert.deepEqual(observedEgressAddresses({ primary: null, ipv4: "203.0.113.7", ipv6: null }), [
    { address: "203.0.113.7", family: "ipv4" },
  ]);
  // Nothing known: no address at all.
  assert.deepEqual(observedEgressAddresses({ primary: null, ipv4: null, ipv6: null }), []);
});

// ──────────────── The parallel echo helper ────────────────

test("both targets are queried with the full deadline", async () => {
  const attempts: Array<{ url: string; timeoutMs: number }> = [];
  await probeEchoTargetsInParallel(
    async (url, timeoutMs) => {
      attempts.push({ url, timeoutMs });
      return `{"ip":"203.0.113.7"}`;
    },
    PROBE_BUDGET_MS,
    {}
  );
  assert.deepEqual(
    attempts.map((attempt) => attempt.url),
    [dualTarget, ipv4Target],
    "the target order is unchanged"
  );
  assert.deepEqual(
    attempts.map((attempt) => attempt.timeoutMs),
    [PROBE_BUDGET_MS, PROBE_BUDGET_MS],
    "each target gets the whole deadline, so the total stays within the budget"
  );
});

test("the answers keep the target order", async () => {
  const answers = await probeEchoTargetsInParallel(
    async (url) => (url === dualTarget ? '{"ip":"2001:db8::1"}' : '{"ip":"203.0.113.7"}'),
    PROBE_BUDGET_MS,
    {}
  );
  assert.deepEqual(
    answers.map((answer) => answer.url),
    [dualTarget, ipv4Target]
  );
});

test("a failing target does not stop the other one", async () => {
  const answers = await probeEchoTargetsInParallel(
    async (url) => {
      if (url === dualTarget) throw new Error("This operation was aborted");
      return '{"ip":"203.0.113.7"}';
    },
    PROBE_BUDGET_MS,
    {}
  );
  assert.equal(answers.length, 1);
  assert.equal(answers[0].url, ipv4Target);
});

test("when every target fails the last error is rethrown", async () => {
  await assert.rejects(
    () =>
      probeEchoTargetsInParallel(
        async (url) => {
          throw new Error(`ECONNREFUSED ${url}`);
        },
        PROBE_BUDGET_MS,
        {}
      ),
    /ECONNREFUSED .*api4\.ipify\.org/,
    "the surfaced error must be the last attempt's error"
  );
});

test("an operator override pins one target and one request", async () => {
  const tried: string[] = [];
  const answers = await probeEchoTargetsInParallel(
    async (url) => {
      tried.push(url);
      return '{"ip":"203.0.113.7"}';
    },
    PROBE_BUDGET_MS,
    { OMNIROUTE_PROXY_ECHO_URL: "https://echo.internal/ip" }
  );
  assert.deepEqual(tried, ["https://echo.internal/ip"]);
  assert.equal(answers.length, 1);
});

// ──────────────── The rule that reads the measured addresses ────────────────

test("a dual-stack tunnel keeps the IPv6 address as the primary and records the IPv4 address beside it", async () => {
  const answers = await probeEchoTargetsInParallel(
    async (url) => (url === dualTarget ? '{"ip":"2001:db8::1"}' : '{"ip":"203.0.113.7"}'),
    PROBE_BUDGET_MS,
    {}
  );
  const observation = buildEgressObservation(answers.map((answer) => ({ body: answer.result })));
  assert.equal(observation.ip, "2001:db8::1", "the primary address is the first target's answer");
  assert.equal(observation.ipv6, "2001:db8::1");
  assert.equal(observation.ipv4, "203.0.113.7");
});

test("an IPv4-only tunnel records the IPv4 address and leaves the IPv6 column null", async () => {
  const answers = await probeEchoTargetsInParallel(
    async (url) => {
      if (url === dualTarget) throw new Error("This operation was aborted");
      return '{"ip":"203.0.113.7"}';
    },
    PROBE_BUDGET_MS,
    {}
  );
  const observation = buildEgressObservation(answers.map((answer) => ({ body: answer.result })));
  assert.equal(observation.ip, "203.0.113.7");
  assert.equal(observation.ipv4, "203.0.113.7");
  assert.equal(observation.ipv6, null, "a family that was not observed stays null");
});

test("an unusable first response leaves the primary null and the other family recorded", async () => {
  const observation = buildEgressObservation([
    { body: "not json" },
    { body: '{"ip":"203.0.113.7"}' },
  ]);
  assert.equal(observation.ip, null, "the first answer wins even when it carries no address");
  assert.equal(observation.ipv4, "203.0.113.7");
  assert.equal(observation.ipv6, null);
});

test("a mapped IPv4 address is stored unmapped", () => {
  const observation = buildEgressObservation([{ body: '{"ip":"::ffff:203.0.113.7"}' }]);
  assert.equal(
    observation.ipv4,
    "203.0.113.7",
    "the stored address is demapped, never the v6: form"
  );
  assert.equal(
    observation.ip,
    "::ffff:203.0.113.7",
    "the primary address keeps the value it was read with"
  );
});

test("the primary address is always one of the two family columns", () => {
  for (const answers of [
    [{ body: '{"ip":"2001:db8::1"}' }, { body: '{"ip":"203.0.113.7"}' }],
    [{ body: '{"ip":"203.0.113.7"}' }],
    [{ body: '{"ip":"::ffff:203.0.113.7"}' }],
  ]) {
    const observation = buildEgressObservation(answers);
    const primary = observation.ip;
    if (!primary) continue;
    const family = egressAddressFamily(primary);
    if (!family) continue;
    const demapped = demapEgressAddress(primary);
    const column = family === "ipv4" ? observation.ipv4 : observation.ipv6;
    assert.equal(column, demapped, "the primary address must be carried by its own family column");
  }
});

// ──────────────── The cache and the two probe modes ────────────────

test("a sequential measurement never clears the families already recorded", async () => {
  proxyEgress._setEgressProbeForTests(async () => ({
    ip: "2001:db8::1",
    latencyMs: 3,
    ipv4: "203.0.113.7",
    ipv6: "2001:db8::1",
    complete: true,
  }));
  await proxyEgress.resolveEgressIp(PROXY_URL, { force: true });

  // A later measurement that observes no family at all must not erase them.
  proxyEgress._setEgressProbeForTests(async () => ({ ip: "2001:db8::1", latencyMs: 4 }));
  await proxyEgress.resolveEgressIp(PROXY_URL, { force: true });

  const observation = getCachedEgressObservation(PROXY_URL);
  assert.ok(observation, "the entry stays live");
  assert.equal(observation.ipv4, "203.0.113.7");
  assert.equal(observation.ipv6, "2001:db8::1");
  assert.equal(observation.complete, true, "completeness never goes back to false");
});

test("a sequential measurement of another address of the same family refreshes that family column", async () => {
  // The journal measured the tunnel: one IPv4 address, no IPv6.
  proxyEgress._setEgressProbeForTests(async () => ({
    ip: "203.0.113.7",
    latencyMs: 3,
    ipv4: "203.0.113.7",
    ipv6: null,
    complete: true,
  }));
  await proxyEgress.resolveEgressIp(PROXY_URL, { force: true, mode: "dual" });

  // The operator validates the pool: the sequential measurement stops at the
  // first target that answers and sees another address of the same family.
  let calls = 0;
  proxyEgress._setEgressProbeForTests(async () => {
    calls++;
    return { ip: "203.0.113.9", latencyMs: 4, complete: false };
  });
  await proxyEgress.resolveEgressIp(PROXY_URL, { force: true });

  const observation = getCachedEgressObservation(PROXY_URL);
  assert.ok(observation, "the entry stays live");
  assert.equal(observation.ip, "203.0.113.9", "the reported address is the measured one");
  assert.equal(
    observation.ipv4,
    "203.0.113.9",
    "the column of the measured family is refreshed with the measured address"
  );
  assert.equal(observation.ipv6, null, "the family that was not observed keeps its value");
  assert.equal(observation.complete, true, "completeness never goes back to false");

  // The invariant: the reported address is carried by the column of its family.
  const primary = observation.ip;
  assert.ok(primary);
  const family = egressAddressFamily(primary);
  assert.ok(family, "the measured address is classifiable");
  assert.equal(
    demapEgressAddress(primary),
    family === "ipv4" ? observation.ipv4 : observation.ipv6,
    "the reported address is always carried by the column of its own family"
  );

  // The line written afterwards carries that address and that family.
  await safeLogEvents(journalArgs());
  proxyLogger.flushProxyLogsSync();
  const row = lastPersistedRow();
  assert.equal(row.egress_ip, "203.0.113.9");
  assert.equal(row.egress_ip_v4, "203.0.113.9");
  assert.equal(row.egress_ip_v6, null);
  assert.equal(calls, 1, "a complete observation is not measured again for the next line");
});

test("a sequential measurement of the other family refreshes that column and keeps the first one", async () => {
  // The journal measured the tunnel: one IPv4 address, no IPv6.
  proxyEgress._setEgressProbeForTests(async () => ({
    ip: "203.0.113.7",
    latencyMs: 3,
    ipv4: "203.0.113.7",
    ipv6: null,
    complete: true,
  }));
  await proxyEgress.resolveEgressIp(PROXY_URL, { force: true, mode: "dual" });

  // The operator action measures the other family: the IPv6 address of the
  // same tunnel, whose /64 changed its address in the meantime.
  proxyEgress._setEgressProbeForTests(async () => ({
    ip: "2001:db8::2",
    latencyMs: 4,
    complete: false,
  }));
  await proxyEgress.resolveEgressIp(PROXY_URL, { force: true });

  const observation = getCachedEgressObservation(PROXY_URL);
  assert.ok(observation, "the entry stays live");
  assert.equal(observation.ip, "2001:db8::2");
  assert.equal(
    observation.ipv6,
    "2001:db8::2",
    "the column of the measured family is refreshed with the measured address"
  );
  assert.equal(
    observation.ipv4,
    "203.0.113.7",
    "the family the measurement did not observe keeps the value it had"
  );
});

test("a complete cache entry is not probed again before the TTL", async () => {
  let calls = 0;
  proxyEgress._setEgressProbeForTests(async () => {
    calls++;
    return { ip: "203.0.113.7", latencyMs: 2, complete: true };
  });
  await proxyEgress.resolveEgressIp(PROXY_URL, { force: true });
  assert.equal(calls, 1);

  const observation = getCachedEgressObservation(PROXY_URL);
  assert.ok(observation, "the measurement is cached");
  assert.equal(observation.complete, true, "the entry says every echo target was queried");

  proxyEgress.warmEgressIp(PROXY_URL);
  await new Promise((resolve) => setTimeout(resolve, 20));
  assert.equal(calls, 1, "a live and complete entry is not measured again");
});

test("the cache keeps one entry per proxy URL whatever the number of measurements", async () => {
  proxyEgress._setEgressProbeForTests(async () => ({
    ip: "2001:db8::1",
    latencyMs: 2,
    ipv4: "203.0.113.7",
    ipv6: "2001:db8::1",
    complete: true,
  }));
  for (let i = 0; i < 5; i++) {
    await proxyEgress.resolveEgressIp(PROXY_URL, { force: true });
  }
  const observation = getCachedEgressObservation(PROXY_URL);
  assert.ok(observation, "the URL keeps one live entry");
  assert.equal(
    observation.ipv4,
    "203.0.113.7",
    "every measurement landed in that one entry, not in one entry per measurement"
  );
  assert.equal(observation.ipv6, "2001:db8::1");

  // The documented deletion path brings the cache back to its starting level.
  proxyEgress.clearEgressCache();
  assert.equal(getCachedEgressObservation(PROXY_URL), null);
});

test("a total probe failure is a complete observation, cached until the TTL, and never re-probed per log line", async () => {
  let calls = 0;
  proxyEgress._setEgressProbeForTests(async () => {
    calls++;
    return { ip: null, latencyMs: 9, error: "ECONNREFUSED api4.ipify.org", complete: true };
  });

  await safeLogEvents(journalArgs());
  await waitFor(() => calls > 0, "the first background measurement");
  const observation = getCachedEgressObservation(PROXY_URL);
  assert.ok(observation, "the failed observation is cached");
  assert.equal(
    observation.complete,
    true,
    "both targets were queried: the observation is complete"
  );
  assert.equal(observation.ip, null);
  assert.equal(observation.ipv4, null);
  assert.equal(observation.ipv6, null);

  const callsAfterFirstLine = calls;
  await safeLogEvents(journalArgs());
  await safeLogEvents(journalArgs());
  await new Promise((resolve) => setTimeout(resolve, 20));
  assert.equal(calls, callsAfterFirstLine, "the journal never re-probes a complete observation");

  proxyLogger.flushProxyLogsSync();
  const row = lastPersistedRow();
  assert.equal(row.egress_ip, null);
  assert.equal(row.egress_ip_v4, null);
  assert.equal(row.egress_ip_v6, null);
});

test("an incomplete cache entry is completed in the background and the next line carries both families", async () => {
  let calls = 0;
  // A sequential measurement: the first target answered, the second was never queried.
  proxyEgress._setEgressProbeForTests(async () => {
    calls++;
    return { ip: "2001:db8::1", latencyMs: 3, complete: false };
  });
  await proxyEgress.resolveEgressIp(PROXY_URL);
  const incomplete = getCachedEgressObservation(PROXY_URL);
  assert.ok(incomplete);
  assert.equal(incomplete.complete, false);

  // The dual measurement now answers both targets.
  proxyEgress._setEgressProbeForTests(async () => {
    calls++;
    return {
      ip: "2001:db8::1",
      latencyMs: 4,
      ipv4: "203.0.113.7",
      ipv6: "2001:db8::1",
      complete: true,
    };
  });

  await safeLogEvents(journalArgs());
  await waitFor(
    () => (getCachedEgressObservation(PROXY_URL)?.complete ?? false) === true,
    "the enrichment"
  );
  assert.equal(calls, 2, "the enrichment costs one measurement per URL and per TTL");

  await safeLogEvents(journalArgs());
  proxyLogger.flushProxyLogsSync();
  const row = lastPersistedRow();
  assert.equal(row.egress_ip, "2001:db8::1");
  assert.equal(row.egress_ip_v4, "203.0.113.7");
  assert.equal(row.egress_ip_v6, "2001:db8::1");
  assert.equal(calls, 2, "a complete entry is not measured again");
});

test("a journal line written by the egress path carries the address of each family", async () => {
  proxyEgress._setEgressProbeForTests(async () => ({
    ip: "2001:db8::1",
    latencyMs: 3,
    ipv4: "203.0.113.7",
    ipv6: "2001:db8::1",
    complete: true,
  }));
  await proxyEgress.resolveEgressIp(PROXY_URL, { force: true, mode: "dual" });

  await safeLogEvents(journalArgs());
  proxyLogger.flushProxyLogsSync();

  const row = lastPersistedRow();
  assert.equal(row.egress_ip, "2001:db8::1", "the primary address is unchanged");
  assert.equal(row.egress_ip_v4, "203.0.113.7");
  assert.equal(row.egress_ip_v6, "2001:db8::1");

  const [logged] = proxyLogger.getProxyLogs();
  assert.equal(logged.egressIp, "2001:db8::1");
  assert.equal(logged.egressIpv4, "203.0.113.7");
  assert.equal(logged.egressIpv6, "2001:db8::1");
});

// ──────────────── The columns in the database ────────────────

test("the new columns exist after the migration and the reconciler is idempotent", async () => {
  const db = core.getDbInstance();
  assert.equal(hasColumn(db, "proxy_logs", "egress_ip_v4"), true, "column exists after migration");
  assert.equal(hasColumn(db, "proxy_logs", "egress_ip_v6"), true, "column exists after migration");
  assert.doesNotThrow(() => ensureProxyLogsColumns(db));
  assert.doesNotThrow(() => ensureProxyLogsColumns(db));
  assert.equal(hasColumn(db, "proxy_logs", "egress_ip_v4"), true);
  assert.equal(hasColumn(db, "proxy_logs", "egress_ip_v6"), true);
});

test("a restored database without the new columns gets them from the reconciler", () => {
  const restored = tryOpenSync(":memory:");
  assert.ok(restored, "expected a synchronous sqlite adapter for :memory:");
  const db = restored!;
  try {
    db.exec("CREATE TABLE proxy_logs (id TEXT PRIMARY KEY, egress_ip TEXT)");
    assert.equal(hasColumn(db, "proxy_logs", "egress_ip_v4"), false);
    ensureProxyLogsColumns(db);
    assert.equal(hasColumn(db, "proxy_logs", "egress_ip_v4"), true);
    assert.equal(hasColumn(db, "proxy_logs", "egress_ip_v6"), true);
    assert.doesNotThrow(() => ensureProxyLogsColumns(db));
  } finally {
    db.close?.();
  }
});

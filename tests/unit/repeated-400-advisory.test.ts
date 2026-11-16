// @ts-nocheck
/**
 * Opt-in repeated-400 advisory (OMNIROUTE_REPEATED_400_ADVISORY, default off). A scan over the
 * last 6 h finds an active account whose newest unbroken run of identical normalized 400s holds
 * at least 20 rows and spans at least 10 minutes, and writes one audit row per (account,
 * signature). The scan only reads call logs: it never marks an account as failed.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { createTempDataDir } from "../_setup/tempDataDir.ts";

const { cleanup } = createTempDataDir("omniroute-repeated-400-");
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.OMNIROUTE_REPEATED_400_ADVISORY;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { getAuditLog } = await import("../../src/lib/compliance/index.ts");
const job = await import("../../src/lib/jobs/repeated400Advisory.ts");

const ACTION = "account.repeated_400";
const NOW = Date.parse("2026-11-13T12:00:00.000Z");
const MIN = 60_000;
const db = () => core.getDbInstance();
let seq = 0;

async function account(name, isActive = true) {
  const created = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name,
    apiKey: ["sk", "test", name].join("-"),
    isActive,
    testStatus: "active",
  });
  return created.id;
}
/** One logical call row `agoMin` minutes before NOW. */
function row(connectionId, agoMin, status, message = null, requestType = null) {
  db()
    .prepare(
      `INSERT INTO call_logs (id, timestamp, status, provider, connection_id, error_summary, request_type)
       VALUES (?, ?, ?, 'openai', ?, ?, ?)`
    )
    .run(
      `row-${(seq += 1)}`,
      new Date(NOW - agoMin * MIN).toISOString(),
      status,
      connectionId,
      message,
      requestType
    );
}
/** `count` identical 400s evenly spread from `fromMin` to `toMin` minutes ago. */
function run400(connectionId, count, fromMin, toMin, message = "invalid schema: field x") {
  for (let i = 0; i < count; i += 1) {
    const ago = count === 1 ? fromMin : fromMin - ((fromMin - toMin) * i) / (count - 1);
    row(connectionId, ago, 400, message);
  }
}
const alerts = () => getAuditLog({ action: ACTION, limit: 100 });
const scan = (owner = "A", now = NOW) => job.runRepeated400Scan({ now, owner });
const ON = () => (process.env.OMNIROUTE_REPEATED_400_ADVISORY = "true");

test.before(async () => {
  await core.ensureDbInitialized();
});
test.beforeEach(() => {
  delete process.env.OMNIROUTE_REPEATED_400_ADVISORY;
  getAuditLog({ limit: 1 }); // creates audit_log on first use
  db().exec("DELETE FROM call_logs; DELETE FROM audit_log;");
  db().prepare("DELETE FROM key_value WHERE namespace = 'repeated400'").run();
});
test.after(() => {
  job.stopRepeated400AdvisoryJob();
  delete process.env.OMNIROUTE_REPEATED_400_ADVISORY;
  return cleanup();
});

test("off by default: a qualifying run writes nothing and the scan does not run", async () => {
  const id = await account("off");
  run400(id, 30, 60, 5);
  assert.equal((await scan()).state, "off");
  assert.equal(alerts().length, 0);
});

test("on: a run of 20+ identical 400s over 10+ minutes writes one audit row and leaves the account alone", async () => {
  const id = await account("alert");
  const before = db().prepare("SELECT * FROM provider_connections WHERE id = ?").get(id);
  run400(id, 25, 60, 5);
  ON();
  const result = await scan();
  assert.equal(result.state, "scanned");
  assert.equal(result.alerted, 1);
  const [entry] = alerts();
  assert.equal(entry.target, id);
  assert.equal(entry.details.count, 25);
  assert.ok(entry.details.spanMinutes >= 50);
  assert.equal(entry.details.provider, "openai");
  assert.match(entry.details.signature, /invalid schema: field x/);
  assert.deepEqual(db().prepare("SELECT * FROM provider_connections WHERE id = ?").get(id), before);
});

test("once per (account, signature): a second scan does not repeat the alert", async () => {
  const id = await account("once");
  run400(id, 25, 60, 5);
  ON();
  await scan();
  const again = await scan("A", NOW + 5 * MIN);
  assert.equal(again.alerted, 0);
  assert.equal(alerts().length, 1);
});

test("the span gate drops a retry storm: 25 identical 400s inside 2 minutes", async () => {
  const id = await account("storm");
  run400(id, 25, 4, 2);
  ON();
  assert.equal((await scan()).alerted, 0);
});

test("the count gate: 19 identical 400s over an hour is not enough", async () => {
  const id = await account("few");
  run400(id, 19, 60, 5);
  ON();
  assert.equal((await scan()).alerted, 0);
});

test("a success breaks the run: 400s with the same message before it do not count", async () => {
  const id = await account("success");
  // 15 identical 400s, a success, then 10 more of the same message: 25 in a row by message,
  // but only 10 since the last success, so no alert.
  run400(id, 15, 120, 60);
  row(id, 50, 200, "invalid schema: field x"); // a success row that carries the same text
  run400(id, 10, 40, 5);
  ON();
  assert.equal((await scan()).alerted, 0);
});

test("a different message breaks the run; ids and numbers in the message do not", async () => {
  const a = await account("mixed");
  run400(a, 12, 60, 35, "bad request");
  row(a, 30, 400, "something else");
  run400(a, 12, 28, 5, "bad request");
  const b = await account("numbers");
  for (let i = 0; i < 25; i += 1) {
    row(
      b,
      60 - 2 * i,
      400,
      `request ${1000 + i} rejected (id 7f3a9c1e-2b4d-4e6f-8a1b-${String(i).padStart(12, "0")})`
    );
  }
  ON();
  await scan();
  assert.deepEqual(
    alerts().map((e) => e.target),
    [b]
  );
});

test("rows older than 6 hours, upstream attempt rows and inactive accounts are ignored", async () => {
  const old = await account("old");
  run400(old, 25, 400, 365);
  const attempts = await account("attempts");
  for (let i = 0; i < 25; i += 1)
    row(attempts, 60 - 2 * i, 400, "invalid schema", "upstream_http_attempt");
  const inactive = await account("inactive", false);
  run400(inactive, 25, 60, 5);
  ON();
  assert.equal((await scan()).alerted, 0);
});

test("re-arm: the run ends, then a new run alerts again; a new signature alerts too", async () => {
  const id = await account("rearm");
  const insert = (ts: number, status: number, message: string | null, tag: string) =>
    db()
      .prepare(
        "INSERT INTO call_logs (id, timestamp, status, provider, connection_id, error_summary) VALUES (?, ?, ?, 'openai', ?, ?)"
      )
      .run(`rearm-${tag}`, new Date(ts).toISOString(), status, id, message);
  run400(id, 25, 60, 5);
  ON();
  await scan();
  assert.equal(alerts().length, 1);

  insert(NOW - MIN, 200, null, "ok"); // a success ends the run
  assert.equal((await scan("A", NOW + 5 * MIN)).alerted, 0);

  // 25 new identical 400s, 5 to 53 minutes after NOW, scanned an hour later
  const later = NOW + 60 * MIN;
  for (let i = 0; i < 25; i += 1) {
    insert(NOW + (5 + 2 * i) * MIN, 400, "invalid schema: field x", `again-${i}`);
  }
  assert.equal((await scan("A", later)).alerted, 1);
  assert.equal(alerts().length, 2);

  // 25 identical 400s with a new message: a new signature alerts too
  for (let i = 0; i < 25; i += 1) {
    insert(later + (1 + 2 * i) * MIN, 400, "quota blocked for model", `sig-${i}`);
  }
  assert.equal((await scan("A", later + 60 * MIN)).alerted, 1);
  assert.equal(alerts().length, 3);
});

test("the per-account read runs only for accounts that logged a 400 in the window", async () => {
  const quiet = await account("quiet");
  for (let i = 0; i < 30; i += 1) row(quiet, 60 - 2 * i, 200);
  const noisy = await account("noisy");
  run400(noisy, 25, 60, 5);
  ON();
  // Count the per-account reads through a wrapper on the prepared statement text.
  const handle = db();
  const original = handle.prepare.bind(handle);
  const perAccountReads: unknown[][] = [];
  handle.prepare = (sql: string) => {
    const statement = original(sql);
    if (!/FROM call_logs\s+WHERE connection_id = \?/.test(sql)) return statement;
    const all = statement.all.bind(statement);
    statement.all = (...args: unknown[]) => {
      perAccountReads.push(args);
      return all(...args);
    };
    return statement;
  };
  try {
    assert.equal((await scan()).alerted, 1);
  } finally {
    handle.prepare = original;
  }
  assert.deepEqual(
    perAccountReads.map((args) => args[0]),
    [noisy],
    "the quiet account is not read"
  );
});

test("leader lock: a second instance skips the scan while the lease holds, and takes over after it", async () => {
  const id = await account("lease");
  run400(id, 25, 60, 5);
  ON();
  assert.equal((await scan("A")).state, "scanned");
  assert.equal((await scan("B", NOW + MIN)).state, "not-leader");
  assert.equal(
    (await scan("A", NOW + 2 * MIN)).state,
    "scanned",
    "the leader renews its own lease"
  );
  assert.equal((await scan("B", NOW + 60 * MIN)).state, "scanned", "an expired lease passes to B");
  assert.equal(alerts().length, 1, "the alert state is shared, so B does not repeat it");
});

test("the job starts only with the flag on, and stop clears its timers", () => {
  assert.equal(job.startRepeated400AdvisoryJob(), null);
  ON();
  const timer = job.startRepeated400AdvisoryJob();
  assert.ok(timer);
  assert.equal(job.startRepeated400AdvisoryJob(), timer, "a second start keeps the first timer");
  job.stopRepeated400AdvisoryJob();
  assert.equal(job.startRepeated400AdvisoryJob() !== null, true);
  job.stopRepeated400AdvisoryJob();
});

test("the lease is taken in one write transaction, so two owners never both scan", async () => {
  const id = await account("race");
  run400(id, 25, 60, 5);
  ON();
  const handle = db();
  const original = handle.immediate.bind(handle);
  let used = 0;
  handle.immediate = (fn) => {
    used += 1;
    return original(fn);
  };
  try {
    assert.equal((await scan("A")).state, "scanned");
  } finally {
    handle.immediate = original;
  }
  assert.ok(used >= 1, "the lease check-and-set runs inside db.immediate");
});

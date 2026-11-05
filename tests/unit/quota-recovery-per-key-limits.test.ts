/**
 * Quota session recovery (#14982) must not let one API key monopolise the
 * ticket table or the scheduler: active tickets are capped per key, each tick
 * rotates across keys, and payload-free rows are eventually deleted.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-recovery-limits-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.STORAGE_ENCRYPTION_KEY = "quota-recovery-limits-test-key";
process.env.API_KEY_SECRET = "quota-recovery-limits-api-key-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const tickets = await import("../../src/lib/db/quotaRecoveryTickets.ts");
const recovery = await import("../../src/lib/quota/quotaSessionRecovery.ts");

const flooder = await apiKeysDb.createApiKey("recovery-flooder", "machine-quota-recovery");
const neighbour = await apiKeysDb.createApiKey("recovery-neighbour", "machine-quota-recovery");

test.after(() => {
  delete process.env.OMNIROUTE_QUOTA_RECOVERY_MAX_PER_KEY;
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const BODY = {
  model: "openai/gpt-4o-mini",
  stream: false,
  messages: [{ role: "user", content: "hi" }],
};

function park(key: string, turn: string): Promise<Response> {
  return recovery.maybeQueueQuotaSessionRecovery({
    request: new Request("http://localhost/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "x-omniroute-quota-recovery": "auto",
        "x-omniroute-session": "limits-session",
        "x-omniroute-recovery-turn": turn,
      },
    }),
    body: BODY,
    response: new Response(JSON.stringify({ error: { message: "Quota exhausted" } }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    }),
    endpoint: "chat/completions",
  });
}

function enqueue(
  apiKeyId: string,
  turnKey: string,
  nextAttemptAt: string,
  expiresAt: string,
  endpoint = "responses"
) {
  return tickets.enqueueQuotaRecoveryTicket({
    apiKeyId,
    turnKey,
    endpoint,
    requestPayload: JSON.stringify({ turnKey }),
    nextAttemptAt,
    expiresAt,
  });
}

test("the per-key limit defaults to 64 and ignores invalid overrides", () => {
  delete process.env.OMNIROUTE_QUOTA_RECOVERY_MAX_PER_KEY;
  assert.equal(recovery.quotaRecoveryMaxTicketsPerKey(), 64);
  for (const invalid of ["0", "-3", "1.5", "abc", ""]) {
    process.env.OMNIROUTE_QUOTA_RECOVERY_MAX_PER_KEY = invalid;
    assert.equal(recovery.quotaRecoveryMaxTicketsPerKey(), 64, invalid);
  }
  process.env.OMNIROUTE_QUOTA_RECOVERY_MAX_PER_KEY = "1";
  assert.equal(recovery.quotaRecoveryMaxTicketsPerKey(), 1);
  process.env.OMNIROUTE_QUOTA_RECOVERY_MAX_PER_KEY = "3";
  assert.equal(recovery.quotaRecoveryMaxTicketsPerKey(), 3);
});

test("a key at its active-ticket limit gets the original quota error, other keys do not", async () => {
  process.env.OMNIROUTE_QUOTA_RECOVERY_MAX_PER_KEY = "3";
  const accepted: string[] = [];
  for (const turn of ["t1", "t2", "t3"]) {
    const response = await park(flooder.key, turn);
    assert.equal(response.status, 202, turn);
    accepted.push(((await response.json()) as { recovery: { id: string } }).recovery.id);
  }

  const refused = await park(flooder.key, "t4");
  assert.equal(refused.status, 429);
  const stored = core
    .getDbInstance()
    .prepare("SELECT COUNT(*) AS n FROM quota_recovery_tickets WHERE api_key_id = ?")
    .get(flooder.id) as { n: number };
  assert.equal(stored.n, 3);

  // Retrying an already-parked turn is idempotent, not a new ticket.
  const retried = await park(flooder.key, "t1");
  assert.equal(retried.status, 202);
  assert.equal(((await retried.json()) as { recovery: { id: string } }).recovery.id, accepted[0]);

  assert.equal((await park(neighbour.key, "t1")).status, 202);

  // Cancelling frees a slot.
  assert.equal(tickets.cancelQuotaRecoveryTicket(accepted[1], flooder.id), true);
  assert.equal((await park(flooder.key, "t4")).status, 202);
});

test("running and confirmation-required tickets count toward the limit, finished ones do not", () => {
  const due = "2026-09-28T09:00:00.000Z";
  const expires = "2099-01-01T00:00:00.000Z";
  const setState = (id: string, state: string) =>
    core
      .getDbInstance()
      .prepare("UPDATE quota_recovery_tickets SET state = ? WHERE id = ?")
      .run(state, id);
  const limited = (turnKey: string) =>
    tickets.enqueueQuotaRecoveryTicket({
      apiKeyId: "state-key",
      turnKey,
      endpoint: "responses",
      requestPayload: JSON.stringify({ turnKey }),
      nextAttemptAt: due,
      expiresAt: expires,
      maxActivePerKey: 2,
    });

  setState(limited("running").id, "running");
  setState(limited("confirm").id, "needs_confirmation");
  assert.throws(() => limited("third"), /limit reached/);

  setState(limited("running").id, "completed");
  setState(limited("confirm").id, "failed");
  assert.equal(limited("third").state, "pending");
  assert.equal(limited("fourth").state, "pending");
});

test("re-sending the turn of a running or confirmation-required ticket returns that ticket", () => {
  const resend = () =>
    tickets.enqueueQuotaRecoveryTicket({
      apiKeyId: "resend-key",
      turnKey: "busy",
      endpoint: "responses",
      requestPayload: JSON.stringify({ turnKey: "busy" }),
      nextAttemptAt: "2018-01-01T00:00:00.000Z",
      expiresAt: "2099-01-01T00:00:00.000Z",
      maxActivePerKey: 1,
    });
  const parked = resend();
  assert.equal(
    tickets.claimQuotaRecoveryTicket(parked.id, new Date("2018-01-01T00:01:00.000Z"))?.state,
    "running"
  );
  // The key is at its limit of 1, but this turn already holds the slot.
  assert.deepEqual([resend().id, resend().state], [parked.id, "running"]);

  assert.equal(tickets.markQuotaRecoveryNeedsConfirmation(parked.id), true);
  assert.deepEqual([resend().id, resend().state], [parked.id, "needs_confirmation"]);
});

test("the per-key count stays on the due index after planner statistics exist", () => {
  // Statistics as PRAGMA optimize (sqlitePlannerStats.ts) wrote them for a table where
  // one key holds 40 active and 1000 completed tickets. With them, a plain or unary-+
  // count is planned as a table scan that reads `state` past every payload of the key.
  const db = core.getDbInstance();
  const seen: string[] = [];
  const prepare = db.prepare.bind(db);
  db.prepare = (sql: string) => {
    seen.push(sql);
    return prepare(sql);
  };
  db.exec("ANALYZE quota_recovery_tickets");
  db.exec("DELETE FROM sqlite_stat1 WHERE tbl = 'quota_recovery_tickets'");
  db.exec(`INSERT INTO sqlite_stat1 (tbl, idx, stat) VALUES
    ('quota_recovery_tickets', 'idx_quota_recovery_due', '1440 320 2'),
    ('quota_recovery_tickets', 'sqlite_autoindex_quota_recovery_tickets_2', '1440 39 1'),
    ('quota_recovery_tickets', 'sqlite_autoindex_quota_recovery_tickets_1', '1440 1')`);
  db.exec("ANALYZE sqlite_schema");
  try {
    tickets.enqueueQuotaRecoveryTicket({
      apiKeyId: "planned-key",
      turnKey: "planned-turn",
      endpoint: "responses",
      requestPayload: "{}",
      nextAttemptAt: "2026-01-01T00:00:00.000Z",
      expiresAt: "2026-01-02T00:00:00.000Z",
      maxActivePerKey: 64,
    });
    const count = seen.find((sql) => sql.includes("COUNT(*) AS active"));
    assert.ok(count, "the capped enqueue runs the per-key count");
    const plan = (prepare(`EXPLAIN QUERY PLAN ${count}`).all("planned-key") as { detail: string }[])
      .map((row) => row.detail)
      .join(" | ");
    assert.match(plan, /USING INDEX idx_quota_recovery_due \(state=\?\)/);
  } finally {
    db.prepare = prepare;
    db.exec("DELETE FROM sqlite_stat1 WHERE tbl = 'quota_recovery_tickets'");
    db.exec("ANALYZE sqlite_schema");
    db.prepare("DELETE FROM quota_recovery_tickets WHERE api_key_id = 'planned-key'").run();
  }
});

test("a due batch rotates across keys instead of draining one key's backlog first", () => {
  const due = "2026-09-28T09:00:00.000Z";
  const expires = "2026-09-29T09:00:00.000Z";
  for (let i = 0; i < 30; i++) {
    const at = new Date(Date.parse(due) + i * 1000).toISOString();
    // The key's turns span endpoints; rotation is per key, not per endpoint.
    const endpoint = i === 1 ? "chat/completions" : "responses";
    enqueue("rr-heavy", `heavy-${String(i).padStart(2, "0")}`, at, expires, endpoint);
  }
  // Became due a minute later than the whole backlog of the other key.
  enqueue("rr-light", "light-0", "2026-09-28T09:01:00.000Z", expires);
  // Still pending but already past its expiry: never handed to dispatch.
  enqueue("rr-stale", "stale-0", due, "2026-09-28T09:02:00.000Z");

  const batch = tickets
    .listDueQuotaRecoveryTickets(new Date("2026-09-28T09:05:00Z"), 25)
    .filter((t) => t.apiKeyId.startsWith("rr-"));
  assert.equal(batch[0].apiKeyId, "rr-heavy");
  assert.equal(batch[0].turnKey, "heavy-00");
  assert.equal(batch[1].apiKeyId, "rr-light");
  assert.equal(batch[2].turnKey, "heavy-01");
  assert.equal(batch.filter((t) => t.apiKeyId === "rr-light").length, 1);
  assert.equal(batch.filter((t) => t.apiKeyId === "rr-stale").length, 0);
});

test("a due batch takes only pending, unexpired tickets and breaks ties in insert order", () => {
  const now = "2026-08-01T00:05:00.000Z";
  const due = "2026-08-01T00:00:00.000Z";
  const expires = "2026-08-02T00:00:00.000Z";
  enqueue("tie-a", "a-1", due, expires);
  enqueue("tie-b", "b-1", due, expires);
  enqueue("tie-a", "a-2", due, expires);
  const running = enqueue("tie-c", "c-running", "2026-07-31T23:00:00.000Z", expires);
  core
    .getDbInstance()
    .prepare("UPDATE quota_recovery_tickets SET state = 'running' WHERE id = ?")
    .run(running.id);
  // Expiry is exclusive: a ticket that expires at the tick's time is not dispatched.
  enqueue("tie-d", "d-expires-now", due, now);

  const batch = tickets
    .listDueQuotaRecoveryTickets(new Date(now), 25)
    .filter((t) => t.apiKeyId.startsWith("tie-"))
    .map((t) => t.turnKey);
  assert.deepEqual(batch, ["a-1", "b-1", "a-2"]);
});

test("a due batch goes by due time, not insert order, and stops at the limit", () => {
  // Nothing else in this file is due in 2020, so the batch holds only these rows.
  const now = new Date("2020-01-01T00:05:00.000Z");
  const expires = "2020-01-02T00:00:00.000Z";
  enqueue("ord-b", "b-1", "2020-01-01T00:02:00.000Z", expires);
  enqueue("ord-a", "a-late", "2020-01-01T00:03:00.000Z", expires);
  enqueue("ord-a", "a-early", "2020-01-01T00:01:00.000Z", expires);

  const keys = (limit: number) =>
    tickets.listDueQuotaRecoveryTickets(now, limit).map((t) => t.turnKey);
  assert.deepEqual(keys(25), ["a-early", "b-1", "a-late"]);
  assert.deepEqual(keys(2), ["a-early", "b-1"]);
});

test("a due batch never exceeds 100 tickets, whatever limit the caller asks for", () => {
  // Nothing else in this file is due in 2019.
  const now = new Date("2019-01-01T01:00:00.000Z");
  for (let i = 0; i < 101; i++) {
    enqueue(`cap-${i % 3}`, `cap-${i}`, "2019-01-01T00:00:00.000Z", "2019-01-02T00:00:00.000Z");
  }
  assert.equal(tickets.listDueQuotaRecoveryTickets(now, 500).length, 100);
  assert.equal(tickets.listDueQuotaRecoveryTickets(now, 0).length, 1);
});

test("a tick deletes payload-free rows a day after they expired and keeps recent ones", async () => {
  const old = enqueue("purge-key", "old", "2026-09-01T00:00:00.000Z", "2026-09-01T01:00:00.000Z");
  const recent = enqueue(
    "purge-key",
    "recent",
    "2026-09-02T00:00:00.000Z",
    "2026-09-02T12:00:00.000Z"
  );
  const cancelled = enqueue(
    "purge-key",
    "cancelled",
    "2026-09-01T00:00:00.000Z",
    "2026-09-01T01:00:00.000Z"
  );
  assert.equal(tickets.cancelQuotaRecoveryTicket(cancelled.id, "purge-key"), true);

  // Clear unrelated due rows so the tick has nothing to dispatch.
  core
    .getDbInstance()
    .prepare("DELETE FROM quota_recovery_tickets WHERE api_key_id <> 'purge-key'")
    .run();

  await recovery.runQuotaSessionRecoveryTick(new Date("2026-09-02T13:00:00Z"));

  assert.equal(tickets.getQuotaRecoveryTicket(old.id, "purge-key"), null);
  assert.equal(tickets.getQuotaRecoveryTicket(cancelled.id, "purge-key"), null);
  assert.equal(tickets.getQuotaRecoveryTicket(recent.id, "purge-key")?.state, "expired");
});

test("the purge deletes only expired and cancelled rows, from exactly a day after expiry", () => {
  const now = new Date("2026-10-10T12:00:00.000Z");
  const dayAgo = new Date(now.getTime() - 24 * 60 * 60_000);
  const at = (ms: number) => new Date(dayAgo.getTime() + ms).toISOString();
  const setState = (id: string, state: string) =>
    core
      .getDbInstance()
      .prepare("UPDATE quota_recovery_tickets SET state = ? WHERE id = ?")
      .run(state, id);
  const rows = {
    expiredAtCutoff: enqueue("purge-states", "expired-cutoff", at(-1000), at(0)),
    expiredAfterCutoff: enqueue("purge-states", "expired-after", at(-1000), at(1)),
    completed: enqueue("purge-states", "completed", at(-1000), at(-1)),
    failed: enqueue("purge-states", "failed", at(-1000), at(-1)),
    running: enqueue("purge-states", "running", at(-1000), at(-1)),
    confirm: enqueue("purge-states", "confirm", at(-1000), at(-1)),
  };
  setState(rows.expiredAtCutoff.id, "expired");
  setState(rows.expiredAfterCutoff.id, "expired");
  setState(rows.completed.id, "completed");
  setState(rows.failed.id, "failed");
  setState(rows.running.id, "running");
  setState(rows.confirm.id, "needs_confirmation");

  tickets.purgeFinishedQuotaRecoveryTickets(now);

  const state = (id: string) => tickets.getQuotaRecoveryTicket(id, "purge-states")?.state ?? null;
  assert.equal(state(rows.expiredAtCutoff.id), null);
  assert.equal(state(rows.expiredAfterCutoff.id), "expired");
  assert.equal(state(rows.completed.id), "completed");
  assert.equal(state(rows.failed.id), "failed");
  assert.equal(state(rows.running.id), "running");
  assert.equal(state(rows.confirm.id), "needs_confirmation");
});

test("at the batch limit, tickets tied on rank and due time go in insert order", () => {
  // Nothing else in this file is due in 2016. The keys are inserted in reverse name
  // order, so a cut that falls back to api_key_id instead of rowid keeps other tickets.
  const now = new Date("2016-01-01T00:05:00.000Z");
  const due = "2016-01-01T00:00:00.000Z";
  const expires = "2016-01-02T00:00:00.000Z";
  for (const key of ["cut-c", "cut-b", "cut-a"]) enqueue(key, `${key}-1`, due, expires);

  try {
    const keys = (limit: number) =>
      tickets.listDueQuotaRecoveryTickets(now, limit).map((t) => t.apiKeyId);
    assert.deepEqual(keys(2), ["cut-c", "cut-b"]);
    assert.deepEqual(keys(25), ["cut-c", "cut-b", "cut-a"]);
  } finally {
    // These stay pending; remove them so a later test's batch does not pick them up.
    core
      .getDbInstance()
      .prepare("DELETE FROM quota_recovery_tickets WHERE api_key_id LIKE 'cut-%'")
      .run();
  }
});

test("a tick expires stale tickets before it lists due ones, so they take no batch slot", async () => {
  // The batch's LIMIT runs before its expiry check. A pending ticket past its expiry
  // that is due first would take one of the 25 slots and then be dropped.
  const now = new Date("2015-01-01T00:05:00.000Z");
  enqueue("tick-stale", "stale", "2015-01-01T00:00:00.000Z", "2015-01-01T00:01:00.000Z");
  // Claims use the wall clock, so these must not expire before the test runs.
  const fill = Array.from({ length: 25 }, (_, i) =>
    enqueue(
      `tick-fill-${String(i).padStart(2, "0")}`,
      `fill-${i}`,
      new Date(Date.parse("2015-01-01T00:01:00.000Z") + i * 1000).toISOString(),
      "2099-01-01T00:00:00.000Z"
    )
  );

  try {
    await recovery.runQuotaSessionRecoveryTick(now);
    // Their stored request has no body, so each dispatch fails without calling upstream.
    const states = fill.map((t) => tickets.getQuotaRecoveryTicket(t.id, t.apiKeyId)?.state);
    assert.deepEqual(new Set(states), new Set(["failed"]));
  } finally {
    // The 2099 expiry keeps these rows from ever being purged; remove them here.
    core
      .getDbInstance()
      .prepare("DELETE FROM quota_recovery_tickets WHERE api_key_id LIKE 'tick-%'")
      .run();
  }
});

/** Open a second handle on the live DB file with the same driver the suite uses. */
async function openPeerDb(file: string): Promise<{
  prepare: (sql: string) => { run: (...args: unknown[]) => unknown };
  close: () => void;
}> {
  const driver = core.getDbInstance().driver;
  if (driver === "better-sqlite3") {
    const Database = (await import("better-sqlite3")).default;
    const other = new Database(file);
    other.pragma("busy_timeout = 0");
    return {
      prepare: (sql: string) => other.prepare(sql),
      close: () => other.close(),
    };
  }
  const { DatabaseSync } = await import("node:sqlite");
  const other = new DatabaseSync(file);
  other.exec("PRAGMA busy_timeout = 0");
  return {
    prepare: (sql: string) => other.prepare(sql),
    close: () => other.close(),
  };
}

test("an expired pending ticket does not take a due-batch slot from a later valid one", () => {
  // With expiry filtered only after LIMIT, the stale row would fill the only slot and
  // the still-valid ticket would wait another tick.
  const now = new Date("2018-06-01T00:05:00.000Z");
  enqueue("steal-stale", "stale", "2018-06-01T00:01:00.000Z", "2018-06-01T00:02:00.000Z");
  enqueue("steal-live", "live", "2018-06-01T00:03:00.000Z", "2018-06-02T00:00:00.000Z");
  try {
    const batch = tickets.listDueQuotaRecoveryTickets(now, 1).map((t) => t.turnKey);
    assert.deepEqual(batch, ["live"]);
  } finally {
    core
      .getDbInstance()
      .prepare("DELETE FROM quota_recovery_tickets WHERE api_key_id LIKE 'steal-%'")
      .run();
  }
});

test("another connection cannot add a ticket between the per-key count and the insert", async () => {
  // A second process sharing the database must wait for the write lock: with only a
  // read transaction (or none), both could count below the limit and both insert.
  const other = await openPeerDb(core.SQLITE_FILE as string);
  const db = core.getDbInstance();
  const prepare = db.prepare.bind(db);
  let intrusion = "not attempted";
  db.prepare = (sql: string) => {
    if (sql.includes("COUNT(*) AS active")) {
      try {
        other
          .prepare(
            `INSERT INTO quota_recovery_tickets (id, api_key_id, turn_key, request_hash, endpoint,
               request_ciphertext, next_attempt_at, expires_at, created_at, updated_at)
             VALUES ('race-intruder', 'race-key', 'intruder', 'h', 'responses', 'x', ?, ?, ?, ?)`
          )
          .run(
            "2026-01-01T00:00:00.000Z",
            "2099-01-01T00:00:00.000Z",
            "2026-01-01T00:00:00.000Z",
            "2026-01-01T00:00:00.000Z"
          );
        intrusion = "inserted";
      } catch (error) {
        intrusion = (error as Error).message;
      }
    }
    return prepare(sql);
  };
  try {
    const ticket = tickets.enqueueQuotaRecoveryTicket({
      apiKeyId: "race-key",
      turnKey: "first",
      endpoint: "responses",
      requestPayload: "{}",
      nextAttemptAt: "2026-01-01T00:00:00.000Z",
      expiresAt: "2099-01-01T00:00:00.000Z",
      maxActivePerKey: 1,
    });
    assert.equal(ticket.turnKey, "first");
    assert.match(intrusion, /locked|busy/i);
  } finally {
    db.prepare = prepare;
    other.close();
    db.prepare("DELETE FROM quota_recovery_tickets WHERE api_key_id = 'race-key'").run();
  }
});

test("when more keys are due than the batch holds, the earliest-due keys get the slots", () => {
  // Nothing else in this file is due in 2017. The later-due key is inserted first, so a
  // cut that ranks one-per-key tickets by insert order alone would keep the wrong key.
  const now = new Date("2017-01-01T00:05:00.000Z");
  const expires = "2017-01-02T00:00:00.000Z";
  enqueue("slot-late", "late-1", "2017-01-01T00:02:00.000Z", expires);
  enqueue("slot-early", "early-1", "2017-01-01T00:01:00.000Z", expires);
  try {
    const keys = (limit: number) =>
      tickets.listDueQuotaRecoveryTickets(now, limit).map((t) => t.apiKeyId);
    assert.deepEqual(keys(1), ["slot-early"]);
    assert.deepEqual(keys(25), ["slot-early", "slot-late"]);
  } finally {
    core
      .getDbInstance()
      .prepare("DELETE FROM quota_recovery_tickets WHERE api_key_id LIKE 'slot-%'")
      .run();
  }
});

test("a turn another connection parks just before the transaction is returned at the limit", async () => {
  // The existing-turn lookup must run under the write lock too: looked up earlier, it
  // misses the other connection's row, the count then sees the key at its limit and the
  // re-sent turn gets the original quota error instead of its ticket.
  const { createHash } = await import("node:crypto");
  const other = await openPeerDb(core.SQLITE_FILE as string);
  const db = core.getDbInstance();
  const immediate = db.immediate.bind(db);
  const payload = JSON.stringify({ turnKey: "shared" });
  const hash = createHash("sha256").update("responses").update("\0").update(payload).digest("hex");
  const at = (turnKey: string) =>
    tickets.enqueueQuotaRecoveryTicket({
      apiKeyId: "lookup-key",
      turnKey,
      endpoint: "responses",
      requestPayload: turnKey === "shared" ? payload : "{}",
      nextAttemptAt: "2026-01-01T00:00:00.000Z",
      expiresAt: "2099-01-01T00:00:00.000Z",
      maxActivePerKey: 2,
    });
  at("first");
  let intruded = false;
  db.immediate = (fn: () => void) => {
    if (!intruded) {
      intruded = true;
      other
        .prepare(
          `INSERT INTO quota_recovery_tickets (id, api_key_id, turn_key, request_hash, endpoint,
             request_ciphertext, next_attempt_at, expires_at, created_at, updated_at)
           VALUES ('lookup-other', 'lookup-key', 'shared', ?, 'responses', 'x', ?, ?, ?, ?)`
        )
        .run(
          hash,
          "2026-01-01T00:00:00.000Z",
          "2099-01-01T00:00:00.000Z",
          "2026-01-01T00:00:00.000Z",
          "2026-01-01T00:00:00.000Z"
        );
    }
    immediate(fn);
  };
  try {
    assert.equal(at("shared").id, "lookup-other");
    assert.equal(intruded, true);
  } finally {
    db.immediate = immediate;
    other.close();
    db.prepare("DELETE FROM quota_recovery_tickets WHERE api_key_id = 'lookup-key'").run();
  }
});

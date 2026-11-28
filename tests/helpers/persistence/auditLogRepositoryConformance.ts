import assert from "node:assert/strict";
import test from "node:test";

import type {
  AuditLogRepository,
  AuditLogRow,
} from "../../../src/domain/persistence/auditLogRepository.ts";

export interface AuditLogSeedRow {
  timestamp: string;
  action: string;
  actor?: string;
  target?: string | null;
  status?: string | null;
  resourceType?: string | null;
  requestId?: string | null;
}

export interface AuditLogRepositoryHarness {
  auditLog: AuditLogRepository;
  reset(): Promise<void>;
  /** Write rows the way the application writer does, bypassing the contract. */
  seed(rows: AuditLogSeedRow[]): Promise<void>;
}

function promised<T>(value: Promise<T>): Promise<T> {
  assert.ok(value instanceof Promise, "every repository operation returns a Promise");
  return value;
}

const actions = (rows: AuditLogRow[]) => rows.map((row) => row.action);

const ROWS: AuditLogSeedRow[] = [
  {
    timestamp: "2026-01-01T00:00:00.000Z",
    action: "config.change",
    actor: "admin",
    target: "system",
    status: "success",
    resourceType: "settings",
    requestId: "req-a",
  },
  {
    timestamp: "2026-01-02T00:00:00.000Z",
    action: "auth.login.success",
    actor: "admin",
    status: "success",
    resourceType: "auth",
    requestId: "req-b",
  },
  {
    timestamp: "2026-01-03T00:00:00.000Z",
    action: "config.change",
    actor: "operator",
    target: "pii",
    status: "failure",
    resourceType: "settings",
    requestId: "req-c",
  },
  {
    timestamp: "2026-01-03T00:00:00.000Z",
    action: "provider.credentials.created",
    actor: "system",
    target: "conn-1",
    status: "success",
    resourceType: "provider",
  },
];

export function registerAuditLogRepositoryConformance(
  createHarness: () => Promise<AuditLogRepositoryHarness>
): void {
  test("audit repository: schema setup is repeatable and an empty log reads as empty", async () => {
    const harness = await createHarness();
    await harness.reset();
    const { auditLog } = harness;
    await promised(auditLog.ensureSchema());
    await promised(auditLog.ensureSchema());
    assert.deepEqual(await promised(auditLog.list({}, 100, 0)), []);
    assert.equal(await promised(auditLog.count({})), 0);
    assert.deepEqual(await promised(auditLog.listByActionSince("x", "2000-01-01")), []);
    assert.equal(await promised(auditLog.deleteBefore("2100-01-01")), 0);
  });

  test("audit repository: newest first, ties broken by newest id, paging as given", async () => {
    const harness = await createHarness();
    await harness.reset();
    await harness.auditLog.ensureSchema();
    await harness.seed(ROWS);
    const { auditLog } = harness;

    assert.deepEqual(actions(await auditLog.list({}, 100, 0)), [
      "provider.credentials.created",
      "config.change",
      "auth.login.success",
      "config.change",
    ]);
    assert.deepEqual(actions(await auditLog.list({}, 2, 1)), [
      "config.change",
      "auth.login.success",
    ]);
    const [newest] = await auditLog.list({}, 1, 0);
    assert.equal(newest.actor, "system");
    assert.equal(newest.target, "conn-1");
    assert.equal(newest.resource_type, "provider");
    assert.equal(newest.request_id, null);
    assert.equal(typeof newest.id, "number");
  });

  test("audit repository: text filters match substrings and combine with AND", async () => {
    const harness = await createHarness();
    await harness.reset();
    await harness.auditLog.ensureSchema();
    await harness.seed(ROWS);
    const { auditLog } = harness;

    assert.equal(await auditLog.count({ action: "config" }), 2);
    assert.equal(await auditLog.count({ action: "config", actor: "oper" }), 1);
    assert.equal(await auditLog.count({ resourceType: "auth" }), 1);
    assert.equal(await auditLog.count({ status: "fail" }), 1);
    assert.equal(await auditLog.count({ requestId: "req-" }), 3);
    assert.equal(await auditLog.count({ target: "conn" }), 1);
    assert.equal(await auditLog.count({ target: "onn-" }), 1, "matches inside the value");
    assert.equal(await auditLog.count({ action: "change" }), 2, "matches inside the value");
    assert.deepEqual(
      (await auditLog.list({ action: "config" }, 100, 0)).map((row) => row.request_id),
      ["req-c", "req-a"]
    );
  });

  test("audit repository: from/to are inclusive and level=high keeps allow-listed actions", async () => {
    const harness = await createHarness();
    await harness.reset();
    await harness.auditLog.ensureSchema();
    await harness.seed(ROWS);
    const { auditLog } = harness;

    assert.equal(
      await auditLog.count({ from: "2026-01-02T00:00:00.000Z", to: "2026-01-03T00:00:00.000Z" }),
      3
    );
    assert.equal(await auditLog.count({ to: "2026-01-01T00:00:00.000Z" }), 1);

    const high = await auditLog.list({ levelFilter: "high" }, 100, 0);
    assert.deepEqual(actions(high), ["provider.credentials.created", "auth.login.success"]);
    assert.equal(await auditLog.count({ levelFilter: "high" }), 2);
  });

  test("audit repository: action-since read is an exact match with a text cutoff and no cap", async () => {
    const harness = await createHarness();
    await harness.reset();
    await harness.auditLog.ensureSchema();
    await harness.seed(ROWS);
    const { auditLog } = harness;

    const rows = await auditLog.listByActionSince("config.change", "2026-01-01T00:00:00.000Z");
    assert.deepEqual(
      rows.map((row) => row.request_id),
      ["req-c", "req-a"]
    );
    assert.deepEqual(await auditLog.listByActionSince("config", "2000-01-01"), []);
    assert.equal(
      (await auditLog.listByActionSince("config.change", "2026-01-02T00:00:00.000Z")).length,
      1
    );

    await harness.seed(
      Array.from({ length: 600 }, (_, index) => ({
        timestamp: `2026-02-01T00:00:${String(index % 60).padStart(2, "0")}.000Z`,
        action: "bulk.action",
      }))
    );
    assert.equal((await auditLog.listByActionSince("bulk.action", "2026-02-01")).length, 600);
  });

  test("audit repository: deleteBefore removes only strictly older rows and reports the count", async () => {
    const harness = await createHarness();
    await harness.reset();
    await harness.auditLog.ensureSchema();
    await harness.seed(ROWS);
    const { auditLog } = harness;

    assert.equal(await promised(auditLog.deleteBefore("2026-01-02T00:00:00.000Z")), 1);
    assert.equal(await auditLog.count({}), 3);
    assert.equal(await auditLog.deleteBefore("2026-01-02T00:00:00.000Z"), 0);
    assert.equal(await auditLog.deleteBefore("2100-01-01T00:00:00.000Z"), 3);
    assert.equal(await auditLog.count({}), 0);
  });
}

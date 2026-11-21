/**
 * The admin side of consented lending: the pool routes accept and return the
 * borrow mode, and they never write a key holder's lending consent.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-admin-lending-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-quota-admin-lending-secret";

const core = await import("../../src/lib/db/core.ts");
const compliance = await import("../../src/lib/compliance/index.ts");
const { createPool, getPool, updatePool } = await import("../../src/lib/db/quotaPools.ts");
const { getAllocationLending, setAllocationLending } =
  await import("../../src/lib/db/quotaLending.ts");
const { PoolCreateSchema, PoolUpdateSchema } = await import("../../src/shared/schemas/quota.ts");
const { QuotaPoolSchema } = await import("../../src/lib/quota/dimensions.ts");
const poolsRoute = await import("../../src/app/api/quota/pools/route.ts");
const poolIdRoute = await import("../../src/app/api/quota/pools/[id]/route.ts");

const EN = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "src", "i18n", "messages", "en.json"), "utf-8")
) as { quotaShare: Record<string, string> };

const UNTIL = 4102444800000; // 2100-01-01T00:00:00Z

compliance.initAuditLog();

const id = createPool({
  connectionId: "conn-admin-lending",
  name: "shared",
  allocations: [
    { apiKeyId: "a", weight: 50, policy: "hard" },
    { apiKeyId: "b", weight: 50, policy: "hard" },
  ],
}).id;
setAllocationLending(id, "a", { lendingPercent: 30, lendingUntil: UNTIL });

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function auditMetadata(action: string, target: string): Array<Record<string, unknown>> {
  const events = compliance.getAuditLog({ action, limit: 50 }) as Array<{
    target?: string;
    metadata?: unknown;
  }>;
  return events
    .filter((e) => e.target === target)
    .map((e) => (e.metadata ?? {}) as Record<string, unknown>);
}

test("the admin schemas drop lending fields and accept only the two modes", () => {
  const parsed = PoolUpdateSchema.parse({
    borrowMode: "consent",
    allocations: [
      { apiKeyId: "a", weight: 50, policy: "hard", lendingPercent: 100, lendingUntil: 1 },
    ],
  });
  assert.deepEqual(parsed.allocations, [{ apiKeyId: "a", weight: 50, policy: "hard" }]);
  assert.equal(parsed.borrowMode, "consent");
  assert.equal(PoolUpdateSchema.safeParse({ borrowMode: "other" }).success, false);
  assert.equal(PoolCreateSchema.parse({ connectionId: "c", name: "n" }).borrowMode, undefined);
  assert.equal(
    PoolCreateSchema.parse({ connectionId: "c", name: "n", borrowMode: "consent" }).borrowMode,
    "consent"
  );
  assert.equal(
    PoolCreateSchema.safeParse({ connectionId: "c", name: "n", borrowMode: "other" }).success,
    false
  );
  assert.equal(PoolUpdateSchema.parse({ name: "x" }).borrowMode, undefined);
  const pool = QuotaPoolSchema.parse({
    id: "p",
    connectionId: "c",
    name: "n",
    createdAt: "2026-01-01T00:00:00.000Z",
  });
  assert.equal(pool.borrowMode, "saturation");
});

test("an admin edit that echoes tampered lending fields leaves the stored consent alone", () => {
  updatePool(
    id,
    PoolUpdateSchema.parse({
      allocations: [
        { apiKeyId: "a", weight: 60, policy: "hard", lendingPercent: 100, lendingUntil: null },
        { apiKeyId: "b", weight: 40, policy: "hard", lendingPercent: 100 },
      ],
    })
  );
  assert.deepEqual(getAllocationLending(id, "a"), { lendingPercent: 30, lendingUntil: UNTIL });
  assert.deepEqual(getAllocationLending(id, "b"), { lendingPercent: 0, lendingUntil: null });
});

test("what the admin routes return carries the mode and the consent, read-only", async () => {
  const local = createPool({
    connectionId: "conn-admin-lending-read",
    name: "shared-read",
    allocations: [
      { apiKeyId: "a", weight: 60, policy: "hard" },
      { apiKeyId: "b", weight: 40, policy: "hard" },
    ],
  }).id;
  setAllocationLending(local, "a", { lendingPercent: 30, lendingUntil: UNTIL });
  const pool = JSON.parse(JSON.stringify(getPool(local)));
  assert.equal(pool.borrowMode, "saturation");
  assert.deepEqual(
    pool.allocations.find((a: { apiKeyId: string }) => a.apiKeyId === "a"),
    { apiKeyId: "a", weight: 60, policy: "hard", lendingPercent: 30, lendingUntil: UNTIL }
  );

  const res = await poolIdRoute.GET(
    await makeManagementSessionRequest(`http://localhost/api/quota/pools/${local}`),
    { params: Promise.resolve({ id: local }) }
  );
  assert.equal(res.status, 200);
  const body = (await res.json()) as { pool: typeof pool };
  assert.equal(body.pool.borrowMode, "saturation");
  assert.deepEqual(
    body.pool.allocations.find((a: { apiKeyId: string }) => a.apiKeyId === "a"),
    { apiKeyId: "a", weight: 60, policy: "hard", lendingPercent: 30, lendingUntil: UNTIL }
  );
});

test("a pool created with a borrow mode keeps it, and the audit record names it", async () => {
  const res = await poolsRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/quota/pools", {
      method: "POST",
      body: { connectionId: "conn-admin-create", name: "By consent", borrowMode: "consent" },
    })
  );
  assert.equal(res.status, 201);
  const { pool } = (await res.json()) as { pool: { id: string; borrowMode: string } };
  assert.equal(pool.borrowMode, "consent");
  assert.equal(getPool(pool.id)?.borrowMode, "consent");
  assert.deepEqual(
    auditMetadata("quota.pool.created", pool.id).map((m) => m.borrowMode),
    ["consent"]
  );

  const plain = await poolsRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/quota/pools", {
      method: "POST",
      body: { connectionId: "conn-admin-plain", name: "Plain" },
    })
  );
  const created = (await plain.json()) as { pool: { id: string; borrowMode: string } };
  assert.equal(created.pool.borrowMode, "saturation");
  assert.deepEqual(
    auditMetadata("quota.pool.created", created.pool.id).map((m) => m.borrowMode),
    ["saturation"]
  );
});

test("switching a pool back to saturation keeps every stored consent", async () => {
  const patch = (body: Record<string, unknown>) =>
    makeManagementSessionRequest(`http://localhost/api/quota/pools/${id}`, {
      method: "PATCH",
      body,
    }).then((req) => poolIdRoute.PATCH(req, { params: Promise.resolve({ id }) }));

  assert.equal((await patch({ borrowMode: "consent" })).status, 200);
  assert.equal(getPool(id)?.borrowMode, "consent");
  setAllocationLending(id, "b", { lendingPercent: 50, lendingUntil: null });

  const res = await patch({
    borrowMode: "saturation",
    allocations: [
      { apiKeyId: "a", weight: 60, policy: "hard", lendingPercent: 0 },
      { apiKeyId: "b", weight: 40, policy: "hard", lendingPercent: 0, lendingUntil: 1 },
    ],
  });
  assert.equal(res.status, 200);
  assert.equal(getPool(id)?.borrowMode, "saturation");
  assert.deepEqual(getAllocationLending(id, "a"), { lendingPercent: 30, lendingUntil: UNTIL });
  assert.deepEqual(getAllocationLending(id, "b"), { lendingPercent: 50, lendingUntil: null });

  const switched = auditMetadata("quota.pool.updated", id).find(
    (m) => m.borrowMode === "saturation"
  );
  assert.ok(switched, "the update audit record names the new mode");
  assert.doesNotMatch(JSON.stringify(switched), /lendingPercent|lendingUntil/);

  // An edit without the field changes nothing about the mode.
  assert.equal((await patch({ name: "renamed" })).status, 200);
  assert.equal(getPool(id)?.borrowMode, "saturation");
});

test("the new quotaShare strings are the planned English text", () => {
  const expected: Record<string, string> = {
    borrowModeLabel: "Borrowing",
    borrowModeSaturation: "By saturation",
    borrowModeConsent: "By consent",
    borrowModeSaturationHint:
      "A key may pass its share while the account is below the saturation threshold.",
    borrowModeConsentHint:
      "A key may pass its share only within the idle share other keys agreed to lend. With no lender, a key stops at its share even while the account has room. Key holders give that consent themselves.",
    lendingBadge: "lends {percent}%",
    lendingBadgeUntil: "lends {percent}% until {date}",
    lendingBadgeExpired: "lending expired",
  };
  for (const [key, text] of Object.entries(expected)) {
    assert.equal(EN.quotaShare[key], text, `quotaShare.${key}`);
  }
});

test("the update audit record names the previous mode only when the mode changed", async () => {
  const poolId = createPool({
    connectionId: "conn-admin-mode-audit",
    name: "mode-audit",
    allocations: [{ apiKeyId: "a", weight: 100, policy: "hard" }],
  }).id;
  const patch = (body: Record<string, unknown>) =>
    makeManagementSessionRequest(`http://localhost/api/quota/pools/${poolId}`, {
      method: "PATCH",
      body,
    }).then((req) => poolIdRoute.PATCH(req, { params: Promise.resolve({ id: poolId }) }));
  const latest = () => auditMetadata("quota.pool.updated", poolId)[0];

  assert.equal((await patch({ name: "mode-audit-1", borrowMode: "consent" })).status, 200);
  assert.equal(latest()?.name, "mode-audit-1");
  assert.equal(latest()?.borrowMode, "consent");
  assert.equal(latest()?.previousBorrowMode, "saturation");

  // The wizard always sends the mode: an unchanged mode adds no previous mode.
  assert.equal((await patch({ name: "mode-audit-2", borrowMode: "consent" })).status, 200);
  assert.equal(latest()?.name, "mode-audit-2");
  assert.equal("previousBorrowMode" in (latest() ?? {}), false);

  assert.equal((await patch({ name: "mode-audit-3" })).status, 200);
  assert.equal(latest()?.name, "mode-audit-3");
  assert.equal("previousBorrowMode" in (latest() ?? {}), false);
});

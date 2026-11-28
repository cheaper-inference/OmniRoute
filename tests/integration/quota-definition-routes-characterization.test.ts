/**
 * Characterization: quota group and schedule definition routes.
 *
 * Pins the HTTP status codes, response shapes and persisted fields of the
 * management routes so the persistence boundary can move behind repositories
 * without changing what callers observe. Runs unchanged against the code
 * before and after the repository migration.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-definitions-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-quota-definitions-secret";

const core = await import("../../src/lib/db/core.ts");
const readCache = await import("../../src/lib/db/readCache.ts");
const poolsDb = await import("../../src/lib/db/quotaPools.ts");
const groupsRoute = await import("../../src/app/api/quota/groups/route.ts");
const groupRoute = await import("../../src/app/api/quota/groups/[id]/route.ts");
const schedulesRoute = await import("../../src/app/api/quota/pools/[id]/schedules/route.ts");

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function params(id: string) {
  return { params: Promise.resolve({ id }) };
}

async function request(url: string, method = "GET", body?: Record<string, unknown>) {
  return makeManagementSessionRequest(url, body === undefined ? { method } : { method, body });
}

function insertConnection(id: string) {
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO provider_connections (id, provider, auth_type, name, is_active, created_at, updated_at)
       VALUES (?, 'openai', 'apikey', ?, 1, datetime('now'), datetime('now'))`
    )
    .run(id, id);
}

test.beforeEach(resetDb);
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("groups: list, create, rename, re-read and delete keep their status codes and shapes", async () => {
  const listed = await groupsRoute.GET(await request("http://localhost/api/quota/groups"));
  assert.equal(listed.status, 200);
  const initial = await listed.json();
  assert.deepEqual(Object.keys(initial), ["groups"]);
  assert.deepEqual(
    initial.groups.map((g: { id: string; name: string }) => [g.id, g.name]),
    [["group-demo", "GroupDemo"]]
  );

  const created = await groupsRoute.POST(
    await request("http://localhost/api/quota/groups", "POST", { name: "Team A" })
  );
  assert.equal(created.status, 201);
  const { group } = await created.json();
  assert.deepEqual(Object.keys(group).sort(), ["createdAt", "id", "name"]);
  assert.equal(group.name, "Team A");
  assert.match(group.id, /^[0-9a-f-]{36}$/);

  const versionBefore = readCache.getModelCatalogCacheVersion();
  const renamed = await groupRoute.PATCH(
    await request(`http://localhost/api/quota/groups/${group.id}`, "PATCH", { name: "Team B" }),
    params(group.id)
  );
  assert.equal(renamed.status, 200);
  assert.deepEqual(await renamed.json(), {
    group: { id: group.id, name: "Team B", createdAt: group.createdAt },
  });
  assert.ok(
    readCache.getModelCatalogCacheVersion() > versionBefore,
    "a rename invalidates the model catalog"
  );

  const missingRename = await groupRoute.PATCH(
    await request("http://localhost/api/quota/groups/missing", "PATCH", { name: "X" }),
    params("missing")
  );
  assert.equal(missingRename.status, 404);
  const versionAfterMiss = readCache.getModelCatalogCacheVersion();

  const afterList = await (
    await groupsRoute.GET(await request("http://localhost/api/quota/groups"))
  ).json();
  assert.deepEqual(
    afterList.groups.map((g: { id: string }) => g.id),
    ["group-demo", group.id]
  );
  assert.equal(readCache.getModelCatalogCacheVersion(), versionAfterMiss);

  const deleted = await groupRoute.DELETE(
    await request(`http://localhost/api/quota/groups/${group.id}`, "DELETE"),
    params(group.id)
  );
  assert.equal(deleted.status, 204);
  const missing = await groupRoute.DELETE(
    await request(`http://localhost/api/quota/groups/${group.id}`, "DELETE"),
    params(group.id)
  );
  assert.equal(missing.status, 404);
});

test("groups: seed group and groups still referenced by a pool are refused with 409", async () => {
  const seed = await groupRoute.DELETE(
    await request("http://localhost/api/quota/groups/group-demo", "DELETE"),
    params("group-demo")
  );
  assert.equal(seed.status, 409);
  assert.match(JSON.stringify(await seed.json()), /protected seed group/);

  const { group } = await (
    await groupsRoute.POST(
      await request("http://localhost/api/quota/groups", "POST", { name: "In use" })
    )
  ).json();
  insertConnection("conn-a");
  const pool = poolsDb.createPool({ connectionId: "conn-a", name: "Pool", groupId: group.id });

  const inUse = await groupRoute.DELETE(
    await request(`http://localhost/api/quota/groups/${group.id}`, "DELETE"),
    params(group.id)
  );
  assert.equal(inUse.status, 409);
  assert.match(JSON.stringify(await inUse.json()), /has pools/);
  const stillThere = core
    .getDbInstance()
    .prepare("SELECT COUNT(*) AS cnt FROM quota_groups WHERE id = ?")
    .get(group.id) as { cnt: number };
  assert.equal(stillThere.cnt, 1);

  await poolsDb.deletePool(pool.id);
  const freed = await groupRoute.DELETE(
    await request(`http://localhost/api/quota/groups/${group.id}`, "DELETE"),
    params(group.id)
  );
  assert.equal(freed.status, 204);
});

test("schedules: PUT replaces the set and GET reads timezone and window fields back verbatim", async () => {
  insertConnection("conn-s");
  const pool = poolsDb.createPool({ connectionId: "conn-s", name: "Scheduled" });
  const url = `http://localhost/api/quota/pools/${pool.id}/schedules`;

  const empty = await schedulesRoute.GET(await request(url), params(pool.id));
  assert.equal(empty.status, 200);
  assert.deepEqual(await empty.json(), { schedules: [] });

  const put = await schedulesRoute.PUT(
    await request(url, "PUT", {
      schedules: [
        {
          id: "s-low",
          days: [5, 1, 3],
          startMinute: 22 * 60,
          endMinute: 6 * 60,
          timezone: "America/Sao_Paulo",
          mode: "allow",
          reserves: [{ window: "weekly", percent: 12.5 }],
          budgetValue: 1000,
          budgetUnit: "tokens",
          budgetWindow: "5h",
          priority: 1,
          enabled: true,
        },
        {
          id: "s-high",
          label: "Blackout",
          days: [0],
          startMinute: 0,
          endMinute: 1440,
          timezone: null,
          mode: "block",
          budgetWindow: "weekly",
          priority: 9,
          enabled: false,
        },
      ],
    }),
    params(pool.id)
  );
  assert.equal(put.status, 200);
  const expected = {
    schedules: [
      {
        id: "s-high",
        poolId: pool.id,
        days: [0],
        startMinute: 0,
        endMinute: 1440,
        timezone: null,
        mode: "block",
        reserves: [],
        budgetWindow: "weekly",
        priority: 9,
        enabled: false,
        label: "Blackout",
      },
      {
        id: "s-low",
        poolId: pool.id,
        days: [1, 3, 5],
        startMinute: 1320,
        endMinute: 360,
        timezone: "America/Sao_Paulo",
        mode: "allow",
        reserves: [{ window: "weekly", percent: 12.5 }],
        budgetWindow: "5h",
        priority: 1,
        enabled: true,
        budgetValue: 1000,
        budgetUnit: "tokens",
      },
    ],
  };
  assert.deepEqual(await put.json(), expected);

  const row = core
    .getDbInstance()
    .prepare("SELECT days, timezone, budget_window, reserves FROM quota_schedules WHERE id = ?")
    .get("s-low");
  assert.deepEqual(row, {
    days: "1,3,5",
    timezone: "America/Sao_Paulo",
    budget_window: "5h",
    reserves: '[{"window":"weekly","percent":12.5}]',
  });

  const read = await schedulesRoute.GET(await request(url), params(pool.id));
  assert.deepEqual(await read.json(), expected);

  const cleared = await schedulesRoute.PUT(
    await request(url, "PUT", { schedules: [] }),
    params(pool.id)
  );
  assert.deepEqual(await cleared.json(), { schedules: [] });
});

test("schedules: unknown pools are 404 on both verbs and nothing is written", async () => {
  const url = "http://localhost/api/quota/pools/nope/schedules";
  const get = await schedulesRoute.GET(await request(url), params("nope"));
  assert.equal(get.status, 404);
  const put = await schedulesRoute.PUT(
    await request(url, "PUT", {
      schedules: [
        {
          days: [1],
          startMinute: 0,
          endMinute: 60,
          budgetWindow: "daily",
          priority: 0,
          enabled: true,
        },
      ],
    }),
    params("nope")
  );
  assert.equal(put.status, 404);
  const count = core
    .getDbInstance()
    .prepare("SELECT COUNT(*) AS cnt FROM quota_schedules")
    .get() as {
    cnt: number;
  };
  assert.equal(count.cnt, 0);
});

test("schedules: replacing a pool's member connections drops its schedules", async () => {
  insertConnection("conn-1");
  insertConnection("conn-2");
  const pool = poolsDb.createPool({ connectionId: "conn-1", name: "Members" });
  const url = `http://localhost/api/quota/pools/${pool.id}/schedules`;
  await schedulesRoute.PUT(
    await request(url, "PUT", {
      schedules: [
        {
          days: [1],
          startMinute: 0,
          endMinute: 60,
          budgetWindow: "daily",
          priority: 0,
          enabled: true,
        },
      ],
    }),
    params(pool.id)
  );
  assert.equal(
    (await (await schedulesRoute.GET(await request(url), params(pool.id))).json()).schedules.length,
    1
  );

  poolsDb.updatePool(pool.id, { name: "Renamed only" });
  assert.equal(
    (await (await schedulesRoute.GET(await request(url), params(pool.id))).json()).schedules.length,
    1,
    "a pool update without connectionIds keeps schedules"
  );

  poolsDb.updatePool(pool.id, { connectionIds: ["conn-2"] });
  assert.deepEqual(await (await schedulesRoute.GET(await request(url), params(pool.id))).json(), {
    schedules: [],
  });
});

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "mitm-ingest-failures-"));
process.env.DATA_DIR = DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsMitmRoute = await import("../../src/app/api/settings/mitm/route.ts");

const mitmDir = path.join(DATA_DIR, "mitm");
const statsFile = path.join(mitmDir, "stats.json");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function readRouteStats() {
  const res = await settingsMitmRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/settings/mitm")
  );
  assert.equal(res.status, 200);
  return (await res.json()).stats;
}

// The proxy writes `ingestFailures` to stats.json. readStats copied a fixed field list, so
// the dashboard response never carried it and a broken capture path looked like an empty one.
test("settings/mitm stats forwards the ingest failure count from stats.json", async () => {
  fs.mkdirSync(mitmDir, { recursive: true });
  fs.writeFileSync(
    statsFile,
    JSON.stringify({ totalRequests: 5, interceptedRequests: 3, ingestFailures: 4 })
  );
  const stats = await readRouteStats();
  assert.equal(stats.ingestFailures, 4);
  assert.equal(stats.interceptedRequests, 3, "existing fields stay");
});

test("settings/mitm stats reports zero ingest failures for an older stats.json and a missing file", async () => {
  fs.writeFileSync(statsFile, JSON.stringify({ totalRequests: 1 }));
  assert.equal((await readRouteStats()).ingestFailures, 0);

  fs.rmSync(statsFile, { force: true });
  assert.equal((await readRouteStats()).ingestFailures, 0);
});

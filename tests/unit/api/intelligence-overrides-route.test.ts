import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { NextRequest } from "next/server";
import { makeManagementSessionRequest } from "../../helpers/managementSession.ts";

// DATA_DIR must be set before the DB core module evaluates its singleton.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-intel-overrides-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const modelIntelligenceDb = await import("../../../src/lib/db/modelIntelligence.ts");
const taskFitness = await import("../../../open-sse/services/autoCombo/taskFitness.ts");
const overridesRoute = await import("../../../src/app/api/intelligence/overrides/route.ts");

const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const URL_BASE = "http://localhost/api/intelligence/overrides";

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  taskFitness.invalidateFitnessCache();
}

function asNextRequest(request: Request): NextRequest {
  return new NextRequest(request);
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
});

async function postOverride(body: unknown) {
  return overridesRoute.POST(
    asNextRequest(
      await makeManagementSessionRequest(URL_BASE, { method: "POST", body: body as never })
    )
  );
}

test("POST and DELETE reject an unauthenticated request with 401", async () => {
  process.env.INITIAL_PASSWORD = "intel-overrides-route-test-password";
  await settingsDb.updateSettings({ requireLogin: true });

  const post = await overridesRoute.POST(
    asNextRequest(
      new Request(URL_BASE, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ model: "gpt-4o", category: "coding", score: 0.5 }),
      })
    )
  );
  assert.equal(post.status, 401);

  const del = await overridesRoute.DELETE(
    asNextRequest(new Request(`${URL_BASE}?model=gpt-4o&category=coding`, { method: "DELETE" }))
  );
  assert.equal(del.status, 401);
  assert.equal(modelIntelligenceDb.listModelIntelligence({ source: "user_override" }).length, 0);
});

test("POST returns 400 for a non-JSON body", async () => {
  const res = await overridesRoute.POST(
    asNextRequest(
      await makeManagementSessionRequest(URL_BASE, {
        method: "POST",
        body: "not-json{",
        headers: { "content-type": "application/json" },
      })
    )
  );
  assert.equal(res.status, 400);
});

test("POST returns 400 when the Zod schema rejects the body", async () => {
  for (const bad of [
    { model: "gpt-4o", category: "coding", score: 1.5 },
    { model: "gpt-4o", category: "not-a-category", score: 0.5 },
    { model: "   ", category: "coding", score: 0.5 },
    { model: "gpt-4o", category: "coding", score: 0.5, extra: true },
  ]) {
    const res = await postOverride(bad);
    assert.equal(res.status, 400, JSON.stringify(bad));
  }
  assert.equal(modelIntelligenceDb.listModelIntelligence({ source: "user_override" }).length, 0);
});

test("POST persists a user_override row and invalidates the fitness cache", async () => {
  // Prime the lookup cache with a miss so a stale cache would be observable.
  const before = taskFitness.getTaskFitnessWithSource("Override-Probe-Model", "coding");
  assert.notEqual(before.source, "user_override");

  const res = await postOverride({
    model: "  Override-Probe-Model ",
    category: "coding",
    score: 0.31,
  });
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.success, true);
  assert.deepEqual(body.entry, {
    model: "override-probe-model",
    category: "coding",
    score: 0.31,
    source: "user_override",
    expiresAt: null,
  });

  const row = modelIntelligenceDb.getModelIntelligenceBySource(
    "override-probe-model",
    "user_override",
    "coding"
  );
  assert.equal(row?.score, 0.31);

  const after = taskFitness.getTaskFitnessWithSource("override-probe-model", "coding");
  assert.deepEqual(after, { score: 0.31, source: "user_override" });
});

test("DELETE removes the override (query params), reports deleted, and falls back", async () => {
  await postOverride({ model: "override-probe-model", category: "coding", score: 0.31 });
  assert.equal(
    taskFitness.getTaskFitnessWithSource("override-probe-model", "coding").source,
    "user_override"
  );

  const res = await overridesRoute.DELETE(
    asNextRequest(
      await makeManagementSessionRequest(`${URL_BASE}?model=Override-Probe-Model&category=coding`, {
        method: "DELETE",
      })
    )
  );
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { success: true, deleted: true });
  assert.notEqual(
    taskFitness.getTaskFitnessWithSource("override-probe-model", "coding").source,
    "user_override"
  );

  const again = await overridesRoute.DELETE(
    asNextRequest(
      await makeManagementSessionRequest(`${URL_BASE}?model=override-probe-model&category=coding`, {
        method: "DELETE",
      })
    )
  );
  assert.deepEqual(await again.json(), { success: true, deleted: false });
});

test("DELETE accepts a JSON body and returns 400 when model/category are missing", async () => {
  await postOverride({ model: "override-probe-model", category: "review", score: 0.2 });

  const viaBody = await overridesRoute.DELETE(
    asNextRequest(
      await makeManagementSessionRequest(URL_BASE, {
        method: "DELETE",
        body: { model: "override-probe-model", category: "review" },
      })
    )
  );
  assert.equal(viaBody.status, 200);
  assert.deepEqual(await viaBody.json(), { success: true, deleted: true });

  const missing = await overridesRoute.DELETE(
    asNextRequest(
      await makeManagementSessionRequest(`${URL_BASE}?model=only-model`, { method: "DELETE" })
    )
  );
  assert.equal(missing.status, 400);
});

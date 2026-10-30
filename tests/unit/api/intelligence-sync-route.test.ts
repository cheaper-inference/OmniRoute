import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { NextRequest } from "next/server";
import { makeManagementSessionRequest } from "../../helpers/managementSession.ts";

// DATA_DIR must be set before the DB core module evaluates its singleton.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-intel-sync-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const modelIntelligenceDb = await import("../../../src/lib/db/modelIntelligence.ts");
const modelsDevSync = await import("../../../src/lib/modelsDevSync.ts");
const syncRoute = await import("../../../src/app/api/intelligence/sync/route.ts");

const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const ORIGINAL_FETCH = globalThis.fetch;
const URL_BASE = "http://localhost/api/intelligence/sync";

let fetchCalls = 0;

function installArenaFetch(mode: "ok" | "fail") {
  fetchCalls = 0;
  globalThis.fetch = (async (input: unknown) => {
    fetchCalls++;
    if (mode === "fail") return new Response("upstream down", { status: 503 });
    const url = String(input);
    const category = url.includes("name=code") ? "code" : "text";
    return new Response(
      JSON.stringify({
        meta: { leaderboard: category, model_count: 2 },
        models: [
          { model: "arena-model-a", score: 1500, votes: 9000, rank: 1 },
          { model: "arena-model-b", score: 1000, votes: 9000, rank: 2 },
        ],
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }) as typeof fetch;
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function asNextRequest(request: Request): NextRequest {
  return new NextRequest(request);
}

async function post(body: unknown) {
  return syncRoute.POST(
    asNextRequest(
      await makeManagementSessionRequest(URL_BASE, { method: "POST", body: body as never })
    )
  );
}

function seedCapabilities() {
  modelsDevSync.ensureCapabilitiesTable();
  const db = core.getDbInstance();
  const insert = db.prepare(`
    INSERT INTO model_capabilities (
      provider, model_id, tool_call, reasoning, attachment, structured_output,
      temperature, modalities_input, modalities_output, knowledge_cutoff,
      release_date, last_updated, status, family, open_weights,
      limit_context, limit_input, limit_output, interleaved_field, last_synced
    ) VALUES (?, ?, ?, ?, NULL, NULL, NULL, '[]', '[]', NULL, NULL, NULL, NULL, NULL, NULL, ?, NULL, NULL, NULL, datetime('now'))
  `);
  insert.run("acme", "tier-model-one", 1, 1, 200000);
  insert.run("acme", "tier-model-two", 1, 0, 200000);
}

test.beforeEach(async () => {
  await resetStorage();
});

test.afterEach(() => {
  globalThis.fetch = ORIGINAL_FETCH;
});

test.after(() => {
  globalThis.fetch = ORIGINAL_FETCH;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
});

test("POST and GET reject an unauthenticated request with 401", async () => {
  process.env.INITIAL_PASSWORD = "intel-sync-route-test-password";
  await settingsDb.updateSettings({ requireLogin: true });
  installArenaFetch("ok");

  const postRes = await syncRoute.POST(
    asNextRequest(
      new Request(URL_BASE, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ dryRun: true }),
      })
    )
  );
  assert.equal(postRes.status, 401);
  const getRes = await syncRoute.GET(asNextRequest(new Request(URL_BASE)));
  assert.equal(getRes.status, 401);
  assert.equal(fetchCalls, 0, "an unauthenticated call must not reach the upstream");
});

test("POST returns 400 for invalid JSON and for unknown body keys", async () => {
  const badJson = await syncRoute.POST(
    asNextRequest(
      await makeManagementSessionRequest(URL_BASE, {
        method: "POST",
        body: "{nope",
        headers: { "content-type": "application/json" },
      })
    )
  );
  assert.equal(badJson.status, 400);
  assert.equal((await post({ dryRun: true, bogus: 1 })).status, 400);
});

test("POST {dryRun:true} still previews the Arena sync and writes nothing", async () => {
  installArenaFetch("ok");
  const res = await post({ dryRun: true });
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.success, true);
  assert.equal(body.source, "arena_elo");
  assert.ok(body.modelCount > 0, "dry run reports the entries it would sync");
  assert.ok(fetchCalls > 0, "dry run must contact the Arena API");
  assert.equal(modelIntelligenceDb.listModelIntelligence({ source: "arena_elo" }).length, 0);
});

test("POST with an Arena failure keeps returning 502 with the error", async () => {
  installArenaFetch("fail");
  for (const payload of [{ dryRun: true }, { syncArenaElo: true, dryRun: true }]) {
    const res = await post(payload);
    assert.equal(res.status, 502, JSON.stringify(payload));
    const body = await res.json();
    assert.equal(body.success, false);
    assert.equal(body.source, "arena_elo");
    assert.ok(body.error);
  }
});

test("POST {rebuildTier:true} rebuilds only models_dev_tier and never contacts Arena", async () => {
  installArenaFetch("ok");
  seedCapabilities();

  const res = await post({ rebuildTier: true });
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.success, true);
  assert.equal(fetchCalls, 0);
  assert.equal(body.tier.upserted, 14, "2 models x 7 categories");
  assert.equal(body.tier.pruned, 0);
  assert.equal(modelIntelligenceDb.listModelIntelligence({ source: "models_dev_tier" }).length, 14);
});

test("POST {rebuildTier:true, dryRun:true} previews the tier rebuild without writing", async () => {
  seedCapabilities();
  const res = await post({ rebuildTier: true, dryRun: true });
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.tier.upserted, 14);
  assert.equal(modelIntelligenceDb.listModelIntelligence({ source: "models_dev_tier" }).length, 0);
});

test("POST {syncArenaElo:true, rebuildTier:true} reports 502 on Arena failure but still rebuilds the tier", async () => {
  installArenaFetch("fail");
  seedCapabilities();
  const res = await post({ syncArenaElo: true, rebuildTier: true, dryRun: false });
  assert.equal(res.status, 502);
  const body = await res.json();
  assert.equal(body.success, false);
  assert.equal(body.tier.upserted, 14);
  assert.equal(modelIntelligenceDb.listModelIntelligence({ source: "models_dev_tier" }).length, 14);
});

test("GET returns the Arena status plus per-source health in sourcesDetail", async () => {
  seedCapabilities();
  modelIntelligenceDb.rebuildModelsDevTierIntelligence();
  const res = await syncRoute.GET(asNextRequest(await makeManagementSessionRequest(URL_BASE)));
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.ok("enabled" in body && "intervalMs" in body, "legacy status fields are preserved");
  assert.equal(body.sourcesDetail.models_dev_tier.count, 14);
  assert.equal(body.sourcesDetail.user_override.count, 0);
  assert.equal(body.sourcesDetail.arena_elo.count, 0);
});

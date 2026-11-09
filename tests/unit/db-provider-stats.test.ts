/**
 * #3175 — provider/model call statistics aggregated from call_logs.
 * Guards the SQL extracted out of the /api/provider-stats route (Hard Rule #5).
 * Both aggregates are bounded to a 7-day window (buildProviderStatsSince) and
 * exclude providers whose connections are gone (EXISTS provider_connections),
 * while keyless providers stay visible: they have no connection row.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-db-provider-stats-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const stats = await import("../../src/lib/db/providerStats.ts");
const { NOAUTH_PROVIDERS } = await import("../../src/shared/constants/providers.ts");

function insertCallLog(row: Record<string, unknown>) {
  const db = core.getDbInstance();
  const full = {
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "openai/gpt-4.1",
    requested_model: null,
    provider: "openai",
    account: null,
    connection_id: null,
    duration: 100,
    tokens_in: 10,
    tokens_out: 20,
    cache_source: "upstream",
    source_format: null,
    target_format: null,
    api_key_id: null,
    api_key_name: null,
    combo_name: null,
    combo_step_id: null,
    combo_execution_key: null,
    error_summary: null,
    detail_state: "none",
    artifact_relpath: null,
    artifact_size_bytes: null,
    artifact_sha256: null,
    has_request_body: 0,
    has_response_body: 0,
    has_pipeline_details: 0,
    request_summary: null,
    ...row,
    id: row.id ?? `log-${Math.random().toString(16).slice(2)}`,
    timestamp: row.timestamp ?? new Date().toISOString(),
  };
  db.prepare(
    `INSERT INTO call_logs (
      id, timestamp, method, path, status, model, requested_model, provider, account,
      connection_id, duration, tokens_in, tokens_out, cache_source, source_format, target_format,
      api_key_id, api_key_name, combo_name, combo_step_id, combo_execution_key,
      error_summary, detail_state, artifact_relpath, artifact_size_bytes, artifact_sha256,
      has_request_body, has_response_body, has_pipeline_details, request_summary
    ) VALUES (
      @id, @timestamp, @method, @path, @status, @model, @requested_model, @provider, @account,
      @connection_id, @duration, @tokens_in, @tokens_out, @cache_source, @source_format, @target_format,
      @api_key_id, @api_key_name, @combo_name, @combo_step_id, @combo_execution_key,
      @error_summary, @detail_state, @artifact_relpath, @artifact_size_bytes, @artifact_sha256,
      @has_request_body, @has_response_body, @has_pipeline_details, @request_summary
    )`
  ).run(full);
}

function insertConnection(id: string, provider: string) {
  const now = new Date().toISOString();
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO provider_connections (id, provider, created_at, updated_at) VALUES (?, ?, ?, ?)`
    )
    .run(id, provider, now, now);
}

function queryPlan(sql: string, params: Record<string, unknown> = {}): string {
  return (
    core.getDbInstance().prepare(`EXPLAIN QUERY PLAN ${sql}`).all(params) as Array<{
      detail: string;
    }>
  )
    .map((r) => r.detail)
    .join(" | ");
}

test.before(() => {
  core.resetDbInstance();
});

// resetDbInstance alone is not enough: the SQLite file survives in TEST_DATA_DIR,
// so every test first re-creates a fresh schema over a wiped file.
test.beforeEach(() => {
  core.resetDbInstance();
  for (const name of fs.readdirSync(TEST_DATA_DIR)) {
    fs.rmSync(path.join(TEST_DATA_DIR, name), { recursive: true, force: true });
  }
  core.resetDbInstance();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("getProviderCallStats aggregates totals, success and latency per provider", () => {
  const since = stats.buildProviderStatsSince();
  insertConnection("conn-openai", "openai");
  insertConnection("conn-anthropic", "anthropic");
  insertCallLog({ provider: "openai", status: 200, duration: 100, tokens_in: 10, tokens_out: 20 });
  insertCallLog({ provider: "openai", status: 500, duration: 300, tokens_in: 5, tokens_out: 0 });
  insertCallLog({ provider: "anthropic", status: 200, duration: 50, tokens_in: 1, tokens_out: 2 });
  // excluded: provider '-' / null
  insertCallLog({ provider: "-", status: 200 });
  // excluded: a provider whose connection is gone (no provider_connections row)
  insertCallLog({ provider: "ghost-provider", status: 200, model: "ghost/model" });

  const rows = stats.getProviderCallStats(since);
  const openai = rows.find((r) => r.provider === "openai");
  assert.ok(openai, "openai stats present");
  assert.equal(openai.totalRequests, 2);
  assert.equal(openai.successfulRequests, 1); // only the 200
  assert.equal(openai.avgLatencyMs, 200); // (100+300)/2
  assert.equal(openai.totalTokensIn, 15);
  assert.equal(openai.totalTokensOut, 20);
  assert.ok(!rows.some((r) => r.provider === "-"), "provider '-' is excluded");
  assert.ok(!rows.some((r) => r.provider === "ghost-provider"), "orphaned provider is excluded");
  // ordered by totalRequests desc → openai (2) before anthropic (1)
  assert.equal(rows[0].provider, "openai");
});

test("getModelCallStats groups by provider+model", () => {
  const since = stats.buildProviderStatsSince();
  // a live connection, so its rows are not excluded by the provider guard
  insertConnection("conn-models", "openai");
  insertCallLog({ provider: "openai", status: 200, model: "openai/gpt-4.1" });
  insertCallLog({ provider: "openai", status: 500, model: "openai/gpt-4.1" });
  // older than the 7-day window: counted by an unbounded query, not by the windowed one
  insertCallLog({
    provider: "openai",
    status: 200,
    model: "openai/gpt-4.1",
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  });

  const rows = stats.getModelCallStats(since);
  const m = rows.find((r) => r.model === "openai/gpt-4.1" && r.provider === "openai");
  assert.ok(m, "model row present");
  assert.equal(m.requests, 2); // the windowed rows only, the 10-day-old row is out
  assert.equal(m.successfulRequests, 1);
});

test("window: rows older than the window start are excluded", () => {
  const now = new Date("2026-10-19T00:00:00.000Z");
  const since = stats.buildProviderStatsSince(now);
  const dayMs = 24 * 60 * 60 * 1000;
  assert.equal(since, new Date(now.getTime() - 7 * dayMs).toISOString());

  insertConnection("conn-openai", "openai");
  insertCallLog({ provider: "openai", status: 200, timestamp: now.toISOString() });
  insertCallLog({
    provider: "openai",
    status: 200,
    timestamp: new Date(now.getTime() - 10 * dayMs).toISOString(),
  });

  const rows = stats.getProviderCallStats(since);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].provider, "openai");
  assert.equal(rows[0].totalRequests, 1);

  const models = stats.getModelCallStats(since);
  assert.equal(models.length, 1);
  assert.equal(models[0].requests, 1);
});

test("a provider without a live connection is excluded from both aggregates", () => {
  const since = stats.buildProviderStatsSince();
  insertConnection("conn-openai", "openai");
  insertCallLog({ provider: "openai", status: 200 });
  // orphaned: call_logs rows exist, no provider_connections row
  insertCallLog({ provider: "ghost-provider", status: 200 });

  const rows = stats.getProviderCallStats(since);
  assert.deepEqual(
    rows.map((r) => r.provider),
    ["openai"]
  );
  const models = stats.getModelCallStats(since);
  assert.ok(!models.some((r) => r.provider === "ghost-provider"));
});

test("a keyless provider keeps its stats without a connection row", () => {
  const since = stats.buildProviderStatsSince();
  // The keyless provider list comes from production: every entry requests
  // through a shared synthetic connection, so none owns a provider_connections row.
  const keylessProvider = Object.keys(NOAUTH_PROVIDERS)[0];
  insertConnection("conn-openai", "openai");
  insertCallLog({ provider: "openai", status: 200 });
  insertCallLog({
    provider: keylessProvider,
    status: 200,
    model: `${keylessProvider}/free-model`,
  });
  insertCallLog({ provider: "ghost-provider", status: 200 });

  const providers = stats.getProviderCallStats(since).map((r) => r.provider);
  assert.deepEqual(providers.sort(), [keylessProvider, "openai"].sort());

  const models = stats.getModelCallStats(since).map((r) => r.provider);
  assert.ok(models.includes(keylessProvider), "keyless provider model rows are kept");
  assert.ok(!models.includes("ghost-provider"), "a removed provider stays excluded");
});

test("planner uses the provider/timestamp indexes, no table scan", () => {
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  const dayMs = 24 * 60 * 60 * 1000;
  const recent = new Date(Date.now() - dayMs).toISOString();
  const old = new Date(Date.now() - 10 * dayMs).toISOString();
  db.transaction(() => {
    for (let i = 0; i < 100; i++) {
      db.prepare(
        `INSERT INTO call_logs (id, timestamp, provider, model, status, duration, tokens_in, tokens_out)
         VALUES (?, ?, ?, ?, 200, 100, 10, 20)`
      ).run(`perf-${i}`, i % 2 === 0 ? recent : old, "openai", "openai/gpt-4.1");
    }
    db.prepare(
      `INSERT INTO provider_connections (id, provider, created_at, updated_at) VALUES (?, ?, ?, ?)`
    ).run("perf-conn", "openai", now, now);
  })();
  const since = stats.buildProviderStatsSince();

  // The statements under test are the ones the route serves, not a copy of them.
  const params = {
    since,
    keylessProviderIds: JSON.stringify(Object.keys(NOAUTH_PROVIDERS)),
  };
  const providerPlan = queryPlan(stats.PROVIDER_CALL_STATS_SQL, params);
  assert.ok(
    providerPlan.includes("USING INDEX idx_cl_provider_timestamp"),
    `provider query must use idx_cl_provider_timestamp, got: ${providerPlan}`
  );
  assert.ok(
    !providerPlan.includes("SCAN TABLE"),
    `provider query must not table-scan, got: ${providerPlan}`
  );

  const modelPlan = queryPlan(stats.MODEL_CALL_STATS_SQL, params);
  assert.ok(
    modelPlan.includes("USING COVERING INDEX idx_cl_health_matrix_cover"),
    `model query must use idx_cl_health_matrix_cover, got: ${modelPlan}`
  );
  assert.ok(
    !modelPlan.includes("SCAN TABLE"),
    `model query must not table-scan, got: ${modelPlan}`
  );
});

test("the shipped aggregates keep the window predicate and the keyless exception", () => {
  assert.ok(
    stats.PROVIDER_CALL_STATS_SQL.includes("c.timestamp >= @since"),
    "the provider aggregate must bound the lookback in SQL"
  );
  assert.ok(
    stats.PROVIDER_CALL_STATS_SQL.includes("json_each(@keylessProviderIds)"),
    "the provider aggregate must keep the keyless exception in SQL"
  );
  assert.ok(
    stats.MODEL_CALL_STATS_SQL.includes("c.timestamp >= @since"),
    "the model aggregate must bound the lookback in SQL"
  );
  assert.ok(
    stats.MODEL_CALL_STATS_SQL.includes("json_each(@keylessProviderIds)"),
    "the model aggregate must keep the keyless exception in SQL"
  );
});

test("bounded aggregates stay under the response threshold on a large table", () => {
  const db = core.getDbInstance();
  const now = new Date();
  const dayMs = 24 * 60 * 60 * 1000;
  const recent = new Date(now.getTime() - dayMs).toISOString();
  const old = new Date(now.getTime() - 10 * dayMs).toISOString();
  const rowCount = 100000;
  const insert = db.prepare(
    `INSERT INTO call_logs (id, timestamp, provider, model, status, duration, tokens_in, tokens_out)
     VALUES (?, ?, 'openai', 'openai/gpt-4.1', 200, 100, 10, 20)`
  );
  db.transaction(() => {
    for (let i = 0; i < rowCount; i++) insert.run(`big-${i}`, i % 2 === 0 ? recent : old);
  })();
  insertConnection("conn-big", "openai");
  const since = stats.buildProviderStatsSince();

  const started = performance.now();
  const rows = stats.getProviderCallStats(since);
  const providerMs = performance.now() - started;
  assert.ok(providerMs < 1500, `bounded provider query took ${providerMs.toFixed(1)} ms`);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].totalRequests, Math.floor(rowCount / 2));

  const startedModel = performance.now();
  const models = stats.getModelCallStats(since);
  const modelMs = performance.now() - startedModel;
  assert.ok(modelMs < 1500, `bounded model query took ${modelMs.toFixed(1)} ms`);
  assert.equal(models[0].requests, Math.floor(rowCount / 2));
});

test("a keyless search provider keeps its stats without a connection row", () => {
  const since = stats.buildProviderStatsSince();
  // Keyless search providers (authType: "none") are exempted from the connection
  // guard alongside no-auth AI cards: searxng-search, context7, duckduckgo-free.
  // Their requests run on a shared synthetic connection, so none owns a
  // provider_connections row — yet their call_logs rows must still appear.
  insertCallLog({ provider: "searxng-search", status: 200, model: "searxng-search/web" });
  insertCallLog({ provider: "ghost-provider", status: 200 });

  const providers = stats.getProviderCallStats(since).map((r) => r.provider);
  assert.ok(providers.includes("searxng-search"), "keyless search provider is kept");
  assert.ok(!providers.includes("ghost-provider"), "a removed provider stays excluded");

  const models = stats.getModelCallStats(since);
  const m = models.find((r) => r.provider === "searxng-search");
  assert.ok(m, "keyless search provider model row is present");
  assert.equal(m.requests, 1);
  assert.equal(m.model, "searxng-search/web");
});

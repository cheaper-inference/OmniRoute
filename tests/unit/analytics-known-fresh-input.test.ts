import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const data = fs.mkdtempSync(path.join(os.tmpdir(), "analytics-known-fresh-"));
process.env.DATA_DIR = data;
process.env.SQLITE_FILE = path.join(data, "storage.sqlite");
process.env.OMNIROUTE_SQLITE_FILE = process.env.SQLITE_FILE;
process.env.APP_LOG_TO_FILE = "false";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const core = await import("../../src/lib/db/core.ts");
const { getCachedInputAnalytics } = await import("../../src/lib/db/cachedInputAnalytics.ts");
const options = {
  sinceIso: null,
  untilIso: null,
  rawCutoffDate: "2020-02-01",
  apiKeyWhere: "",
  apiKeyParams: {},
};

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(data, { recursive: true, force: true });
});

test.beforeEach(() => {
  const db = core.getDbInstance();
  db.exec("DELETE FROM usage_history; DELETE FROM daily_usage_summary;");
});

function seedRawFixtures() {
  const db = core.getDbInstance();
  const insert = db.prepare(`INSERT INTO usage_history
    (provider, model, timestamp, tokens_input, tokens_output, tokens_cache_read, api_key_id)
    VALUES ('fixture', ?, '2020-03-01T12:00:00.000Z', ?, 0, ?, 'fixture-key')`);
  for (const [index, [input, cached]] of [
    [1000, 400],
    [500, null],
    [100, 900],
    [200, 0],
  ].entries()) {
    insert.run(index % 2 ? "vendor/Model" : "Model", input, cached);
  }
}

test("raw known fresh input excludes unknown and inconsistent reads in both query branches", () => {
  seedRawFixtures();
  const db = core.getDbInstance();
  for (const query of [options, { ...options, sinceIso: "2020-03-01" }]) {
    const result = getCachedInputAnalytics(query, (model) => model.split("/").at(-1)!);
    assert.equal(result.summary.knownFreshInputTokens, 800);
    assert.equal(result.summary.cachedInputTokensComplete, false);
    assert.equal(result.byModel.length, 1);
    assert.equal(result.byModel[0].knownFreshInputTokens, 800);
  }
  assert.equal(
    db
      .prepare<{ n: number }>(
        "SELECT COUNT(*) as n FROM usage_history WHERE tokens_cache_read IS NULL"
      )
      .get()?.n,
    1
  );
});

test("archives contribute only complete consistent rows and never leak into key filters", () => {
  seedRawFixtures();
  const db = core.getDbInstance();
  const insert = db.prepare(`INSERT INTO daily_usage_summary
    (provider, model, date, total_requests, total_input_tokens, total_output_tokens,
     total_cost, total_cache_read_tokens, cached_input_unknown_requests)
    VALUES ('archive', ?, '2020-01-01', 1, ?, 0, 0, ?, ?)`);
  insert.run("known", 1000, 400, 0);
  insert.run("unknown", 500, null, 1);
  insert.run("inconsistent", 100, 900, 0);
  insert.run("mixed", 2000, 200, 1);
  const result = getCachedInputAnalytics(options);
  assert.equal(result.summary.knownFreshInputTokens, 1400);
  assert.equal(result.summary.cachedInputTokensComplete, false);
  assert.equal(result.byModel.find((row) => row.model === "known")?.knownFreshInputTokens, 600);
  for (const model of ["unknown", "inconsistent", "mixed"]) {
    assert.equal(result.byModel.find((row) => row.model === model)?.knownFreshInputTokens, 0);
  }
  const filtered = getCachedInputAnalytics({
    ...options,
    apiKeyWhere: "api_key_id = @key",
    apiKeyParams: { key: "fixture-key" },
  });
  assert.equal(filtered.summary.knownFreshInputTokens, 800);
  assert.equal(filtered.summary.cachedInputTokensComplete, false);
});

test("malformed source counters never inflate known fresh input", () => {
  const db = core.getDbInstance();
  const raw = db.prepare(`INSERT INTO usage_history
    (provider, model, timestamp, tokens_input, tokens_cache_read)
    VALUES ('malformed', 'malformed', '2020-03-01', ?, ?)`);
  const archive = db.prepare(`INSERT INTO daily_usage_summary
    (provider, model, date, total_requests, total_input_tokens, total_cache_read_tokens, cached_input_unknown_requests)
    VALUES ('malformed', ?, '2020-01-01', 1, ?, ?, 0)`);
  for (const [i, [input, cache]] of [
    [100, -10],
    [100, 0.5],
    [100.5, 0],
    [9007199254740992, 0],
  ].entries()) {
    raw.run(input, cache);
    archive.run(`malformed-${i}`, input, cache);
  }
  const result = getCachedInputAnalytics(options);
  for (const row of result.byModel.filter((row) => row.model.startsWith("malformed"))) {
    assert.equal(row.knownFreshInputTokens, 0);
  }
});

test("shared model keeps provider-specific known input through archive and key filtering", () => {
  const db = core.getDbInstance();
  const raw = db.prepare(`INSERT INTO usage_history
    (provider, model, timestamp, tokens_input, tokens_output, tokens_cache_read, api_key_id)
    VALUES (?, ?, '2020-03-01T12:00:00.000Z', ?, 0, ?, ?)`);
  raw.run("Alpha", "vendor/Model", 100, 40, "alpha-key");
  raw.run("alpha", "Model", 60, 0, "alpha-key");
  raw.run("beta", "Model", 300, 100, "beta-key");
  raw.run("beta", "Model", 80, null, "beta-key");
  const archive = db.prepare(`INSERT INTO daily_usage_summary
    (provider, model, date, total_requests, total_input_tokens, total_output_tokens,
     total_cost, total_cache_read_tokens, cached_input_unknown_requests)
    VALUES (?, ?, '2020-01-01', 1, ?, 0, 0, ?, ?)`);
  archive.run("alpha", "Model", 50, 10, 0);
  archive.run("beta", "Model", 100, 20, 1);
  const normalize = (model: string) => model.split("/").at(-1)!;

  const all = getCachedInputAnalytics(options, normalize);
  assert.equal(all.summary.knownFreshInputTokens, 360);
  assert.deepEqual(all.byModel, [
    {
      model: "model",
      knownFreshInputTokens: 360,
      cachedInputTokens: 170,
      cachedInputTokensComplete: false,
    },
  ]);
  assert.deepEqual(all.byProviderModel.get("alpha:model"), {
    knownFreshInputTokens: 160,
    cachedInputTokens: 50,
    cachedInputTokensComplete: true,
  });
  assert.deepEqual(all.byProviderModel.get("beta:model"), {
    knownFreshInputTokens: 200,
    cachedInputTokens: 120,
    cachedInputTokensComplete: false,
  });
  assert.equal(all.byProviderModel.size, 2);

  const recent = getCachedInputAnalytics({ ...options, sinceIso: "2020-03-01" }, normalize);
  assert.equal(recent.summary.knownFreshInputTokens, 320);
  assert.equal(recent.byModel[0].knownFreshInputTokens, 320);
  assert.equal(recent.byProviderModel.get("alpha:model")?.knownFreshInputTokens, 120);
  assert.equal(recent.byProviderModel.get("beta:model")?.knownFreshInputTokens, 200);

  const keyOptions = {
    ...options,
    apiKeyWhere: "api_key_id = @key",
    apiKeyParams: { key: "alpha-key" },
  };
  const filtered = getCachedInputAnalytics(keyOptions, normalize);
  assert.deepEqual(filtered.summary, {
    knownFreshInputTokens: 120,
    cachedInputTokens: 40,
    cachedInputTokensComplete: false,
  });
  assert.equal(filtered.byModel[0].knownFreshInputTokens, 120);
  assert.deepEqual(filtered.byProviderModel.get("alpha:model"), filtered.summary);
  assert.equal(filtered.byProviderModel.size, 1);
  assert.equal(filtered.byProviderModel.has("beta:model"), false);

  const filteredRecent = getCachedInputAnalytics(
    { ...keyOptions, sinceIso: "2020-03-01" },
    normalize
  );
  assert.equal(filteredRecent.byProviderModel.get("alpha:model")?.knownFreshInputTokens, 120);
  assert.equal(filteredRecent.byProviderModel.get("alpha:model")?.cachedInputTokensComplete, true);
});

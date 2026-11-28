import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

// Facade-level behavior of the interception-rule, parameter-filter and MITM-alias stores.
// These tests only use the exported functions plus raw key_value rows, so they hold on
// both the pre-repository modules and the repository-backed facades.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-request-rules-char-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const interception = await import("../../../src/lib/db/interceptionRules.ts");
const paramFilters = await import("../../../src/lib/db/paramFilters.ts");
const mitmAlias = await import("../../../src/lib/db/models/mitmAlias.ts");

function resetStorage(): void {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function rawRows(namespace: string): Array<{ key: string; value: string }> {
  return core
    .getDbInstance()
    .prepare("SELECT key, value FROM key_value WHERE namespace = ? ORDER BY key")
    .all(namespace) as Array<{ key: string; value: string }>;
}

function insertRaw(namespace: string, key: string, value: string): void {
  core
    .getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run(namespace, key, value);
}

test.beforeEach(() => {
  resetStorage();
  // The facades keep module-level caches; a facade write invalidates them.
  interception.deleteInterceptionRules("__cache_reset__");
  paramFilters.deleteParamFilterConfig("__cache_reset__");
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("interception rules: reads are synchronous and normalize stored rows", () => {
  insertRaw(
    "interception_rules",
    "anthropic",
    JSON.stringify({
      interceptSearch: true,
      interceptFetch: "yes",
      fetchBackend: "unknown",
      fetchProxyUrl: "  https://proxy.example  ",
      models: {
        "claude-a": { interceptFetch: false, fetchBackend: "jina" },
        "claude-b": { interceptFetch: "no" },
        "claude-c": "not-an-object",
      },
    })
  );
  insertRaw("interception_rules", "broken", "{not json");
  insertRaw("interception_rules", "array", "[1,2]");
  interception.deleteInterceptionRules("__cache_reset__");

  const rules = interception.getInterceptionRules("anthropic");
  assert.ok(!(rules instanceof Promise));
  assert.deepEqual(rules, {
    interceptSearch: true,
    interceptFetch: undefined,
    fetchBackend: undefined,
    fetchProxyUrl: "https://proxy.example",
    models: {
      "claude-a": {
        interceptSearch: undefined,
        interceptFetch: false,
        fetchBackend: "jina",
        fetchProxyUrl: undefined,
      },
    },
  });
  assert.equal(interception.getInterceptionRules("broken"), null);
  assert.equal(interception.getInterceptionRules("array"), null);
  assert.equal(interception.getInterceptionRules(""), null);
  // Lookup keys are not trimmed (only writes trim the provider key).
  assert.equal(interception.getInterceptionRules(" anthropic "), null);
});

test("interception rules: writes trim the key, drop empty models and serialize in order", () => {
  interception.setInterceptionRules("  openai  ", {
    models: {},
    fetchProxyUrl: "https://p",
    interceptSearch: false,
  });
  interception.setInterceptionRules("   ", { interceptSearch: true });
  assert.deepEqual(rawRows("interception_rules"), [
    {
      key: "openai",
      value: JSON.stringify({ interceptSearch: false, fetchProxyUrl: "https://p" }),
    },
  ]);
  assert.equal(interception.getInterceptionRules("openai")?.interceptSearch, false);

  interception.setInterceptionRules("openai", {
    interceptFetch: true,
    fetchBackend: "tavily",
    models: { "gpt-x": { interceptSearch: true } },
  });
  assert.equal(
    rawRows("interception_rules")[0].value,
    JSON.stringify({
      interceptFetch: true,
      fetchBackend: "tavily",
      models: { "gpt-x": { interceptSearch: true } },
    })
  );
  assert.equal(interception.resolveInterceptSearch("openai", "gpt-x"), true);
  assert.equal(interception.resolveInterceptSearch("openai", " gpt-x "), true);
  assert.equal(interception.resolveInterceptSearch(" openai ", "other"), undefined);
  assert.equal(interception.resolveInterceptFetch("openai", "other"), true);

  interception.deleteInterceptionRules("  openai ");
  assert.deepEqual(rawRows("interception_rules"), []);
  assert.equal(interception.getInterceptionRules("openai"), null);
});

test("interception rules: cached reads ignore external rows until a facade write", () => {
  assert.equal(interception.getInterceptionRules("gemini"), null);
  insertRaw("interception_rules", "gemini", JSON.stringify({ interceptSearch: true }));
  assert.equal(interception.getInterceptionRules("gemini"), null);
  interception.deleteInterceptionRules("unrelated");
  assert.equal(interception.getInterceptionRules("gemini")?.interceptSearch, true);
  // Empty provider keys are a no-op and do not invalidate the cache.
  insertRaw("interception_rules", "mistral", JSON.stringify({ interceptFetch: true }));
  interception.deleteInterceptionRules("  ");
  interception.setInterceptionRules("", { interceptFetch: true });
  assert.equal(interception.getInterceptionRules("mistral"), null);
});

test("param filters: synchronous alias-aware reads over stored rows", () => {
  insertRaw("provider_param_filters", "cc", JSON.stringify({ block: ["top_p"], allow: "x" }));
  insertRaw(
    "provider_param_filters",
    "nvidia",
    JSON.stringify({
      block: ["a", 1],
      allow: ["b"],
      autoLearn: "true",
      models: { m1: { block: [] }, m2: { allow: ["c"] }, m3: [] },
    })
  );
  insertRaw("provider_param_filters", "broken", "{");
  paramFilters.deleteParamFilterConfig("__cache_reset__");

  const fromAlias = paramFilters.getParamFilterConfig("claude");
  assert.ok(!(fromAlias instanceof Promise));
  assert.deepEqual(fromAlias, { block: ["top_p"], allow: [], models: undefined, autoLearn: false });
  assert.strictEqual(paramFilters.getParamFilterConfig("cc"), fromAlias);
  assert.deepEqual(paramFilters.getParamFilterConfig("nvidia"), {
    block: ["a"],
    allow: ["b"],
    models: { m2: { allow: ["c"] } },
    autoLearn: false,
  });
  assert.equal(paramFilters.getParamFilterConfig("broken"), null);
  assert.equal(paramFilters.getParamFilterConfig(""), null);
  assert.deepEqual([...paramFilters.loadParamFilterConfigs().keys()].sort(), [
    "cc",
    "claude",
    "nvidia",
  ]);
});

test("param filters: a canonical row wins over a legacy alias row", () => {
  insertRaw("provider_param_filters", "claude", JSON.stringify({ block: ["canonical"] }));
  insertRaw("provider_param_filters", "cc", JSON.stringify({ block: ["alias"] }));
  paramFilters.deleteParamFilterConfig("__cache_reset__");
  assert.deepEqual(paramFilters.getParamFilterConfig("claude")?.block, ["canonical"]);
  assert.deepEqual(paramFilters.getParamFilterConfig("cc")?.block, ["canonical"]);
  // Rows come back in key order; an alias that sorts after its canonical id must not win.
  insertRaw("provider_param_filters", "codex", JSON.stringify({ block: ["canonical"] }));
  insertRaw("provider_param_filters", "cx", JSON.stringify({ block: ["alias"] }));
  paramFilters.deleteParamFilterConfig("__cache_reset__");
  assert.deepEqual(paramFilters.getParamFilterConfig("codex")?.block, ["canonical"]);
  assert.deepEqual(paramFilters.getParamFilterConfig("cx")?.block, ["canonical"]);
  assert.deepEqual(paramFilters.loadParamFilterConfigs().get("cx")?.block, ["alias"]);
});

test("param filters: writes store canonical keys and delete removes every alias row", () => {
  paramFilters.setParamFilterConfig("cc", {
    models: {},
    allow: ["x"],
    block: undefined as unknown as string[],
  });
  assert.deepEqual(rawRows("provider_param_filters"), [
    { key: "claude", value: JSON.stringify({ block: [], allow: ["x"], autoLearn: false }) },
  ]);
  insertRaw("provider_param_filters", "cc", "{malformed");
  insertRaw("provider_param_filters", "openai", JSON.stringify({ block: ["keep"] }));
  paramFilters.deleteParamFilterConfig("claude");
  assert.deepEqual(
    rawRows("provider_param_filters").map((row) => row.key),
    ["openai"]
  );
  assert.equal(paramFilters.getParamFilterConfig("cc"), null);
  assert.deepEqual(paramFilters.getParamFilterConfig("openai")?.block, ["keep"]);
});

test("param filters: auto-learn helpers persist through the same store", () => {
  paramFilters.setGlobalAutoLearnEnabled(true);
  assert.equal(paramFilters.isAutoLearnGloballyEnabled(), true);
  assert.deepEqual(rawRows("provider_param_filters"), [
    {
      key: "__global__",
      value: JSON.stringify({ block: [], allow: [], autoLearn: true }),
    },
  ]);
  paramFilters.addParamToBlocklist("prov", "thinking");
  paramFilters.addParamToBlocklist("prov", "temperature", "model-a");
  paramFilters.addParamToBlocklist("prov", "temperature", "model-a");
  paramFilters.addParamToBlocklist("", "temperature");
  assert.deepEqual(paramFilters.getParamFilterConfig("prov"), {
    block: ["thinking"],
    allow: [],
    autoLearn: false,
    models: { "model-a": { block: ["temperature"] } },
  });
  assert.equal(
    rawRows("provider_param_filters").find((row) => row.key === "prov")?.value,
    JSON.stringify({
      block: ["thinking"],
      allow: [],
      autoLearn: false,
      models: { "model-a": { block: ["temperature"] } },
    })
  );
});

test("param filters: cached reads ignore external rows until a facade write", () => {
  assert.equal(paramFilters.getParamFilterConfig("groq"), null);
  insertRaw("provider_param_filters", "groq", JSON.stringify({ block: ["n"] }));
  assert.equal(paramFilters.getParamFilterConfig("groq"), null);
  paramFilters.setParamFilterConfig("other", { block: [], allow: [] });
  assert.deepEqual(paramFilters.getParamFilterConfig("groq")?.block, ["n"]);
});

test("MITM aliases: async reads, missing tools and malformed rows", async () => {
  const pending = mitmAlias.getMitmAlias("antigravity");
  assert.ok(pending instanceof Promise);
  assert.deepEqual(await pending, {});
  insertRaw("mitmAlias", "empty", "");
  insertRaw("mitmAlias", "kiro", JSON.stringify({ a: "kiro/b" }));
  assert.deepEqual(await mitmAlias.getMitmAlias("empty"), {});
  // A single-tool read treats an empty value as {}, the full listing tries to parse it.
  await assert.rejects(mitmAlias.getMitmAlias(), SyntaxError);
  core.getDbInstance().prepare("DELETE FROM key_value WHERE key = 'empty'").run();
  assert.deepEqual(await mitmAlias.getMitmAlias(), { kiro: { a: "kiro/b" } });
  // An empty tool name lists every tool.
  assert.deepEqual(await mitmAlias.getMitmAlias(""), { kiro: { a: "kiro/b" } });
  insertRaw("mitmAlias", "bad", "{oops");
  await assert.rejects(mitmAlias.getMitmAlias("bad"), SyntaxError);
  await assert.rejects(mitmAlias.getMitmAlias(), SyntaxError);
});

test("MITM aliases: writes replace a tool's mappings and land before the first await", async () => {
  const pending = mitmAlias.setMitmAliasAll("antigravity", { "gemini-x": "antigravity/y" });
  // Synchronous callers (agent-bridge sync) fire this without awaiting.
  assert.deepEqual(rawRows("mitmAlias"), [
    { key: "antigravity", value: JSON.stringify({ "gemini-x": "antigravity/y" }) },
  ]);
  assert.ok(pending instanceof Promise);
  assert.equal(await pending, undefined);
  await mitmAlias.setMitmAliasAll("antigravity", null);
  assert.deepEqual(rawRows("mitmAlias"), [{ key: "antigravity", value: "{}" }]);
});

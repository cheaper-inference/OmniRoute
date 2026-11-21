import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import type { InterceptionRuleRepository } from "../../../src/domain/persistence/interceptionRuleRepository.ts";
import type { MitmAliasRepository } from "../../../src/domain/persistence/mitmAliasRepository.ts";
import type { ParamFilterRepository } from "../../../src/domain/persistence/paramFilterRepository.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "request-rule-repositories-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const interceptionModule =
  await import("../../../src/lib/db/repositories/sqliteInterceptionRuleRepository.ts");
const paramFilterModule =
  await import("../../../src/lib/db/repositories/sqliteParamFilterRepository.ts");
const { sqliteMitmAliasRepository } =
  await import("../../../src/lib/db/repositories/sqliteMitmAliasRepository.ts");
const interceptionFacade = await import("../../../src/lib/db/interceptionRules.ts");
const paramFilterFacade = await import("../../../src/lib/db/paramFilters.ts");
const mitmAliasFacade = await import("../../../src/lib/db/models/mitmAlias.ts");

const interceptionRules: InterceptionRuleRepository =
  interceptionModule.sqliteInterceptionRuleRepository;
const paramFilters: ParamFilterRepository = paramFilterModule.sqliteParamFilterRepository;
const mitmAliases: MitmAliasRepository = sqliteMitmAliasRepository;

function promised<T>(value: Promise<T>): Promise<T> {
  assert.ok(value instanceof Promise, "every repository operation returns a Promise");
  return value;
}

function insertRaw(namespace: string, key: string, value: string): void {
  core
    .getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run(namespace, key, value);
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("interception repository: Promise CRUD keyed exactly as stored", async () => {
  assert.deepEqual(await promised(interceptionRules.list()), []);
  assert.equal(
    await promised(interceptionRules.upsert(" spaced ", { interceptSearch: true, models: {} })),
    undefined
  );
  await interceptionRules.upsert("openai", {
    interceptFetch: false,
    models: { m: { fetchBackend: "jina" } },
  });
  insertRaw("interception_rules", "broken", "not json");
  assert.deepEqual(await interceptionRules.list(), [
    {
      provider: " spaced ",
      rules: {
        interceptSearch: true,
        interceptFetch: undefined,
        fetchBackend: undefined,
        fetchProxyUrl: undefined,
        models: undefined,
      },
    },
    {
      provider: "openai",
      rules: {
        interceptSearch: undefined,
        interceptFetch: false,
        fetchBackend: undefined,
        fetchProxyUrl: undefined,
        models: {
          m: {
            interceptSearch: undefined,
            interceptFetch: undefined,
            fetchBackend: "jina",
            fetchProxyUrl: undefined,
          },
        },
      },
    },
  ]);
  assert.equal(await promised(interceptionRules.deleteByProvider("missing")), undefined);
  await interceptionRules.deleteByProvider(" spaced ");
  assert.deepEqual(
    (await interceptionRules.list()).map((entry) => entry.provider),
    ["openai"]
  );
});

test("param filter repository: Promise CRUD, raw keys and atomic multi-key delete", async () => {
  assert.deepEqual(await promised(paramFilters.list()), []);
  assert.deepEqual(await promised(paramFilters.listProviderKeys()), []);
  assert.equal(
    await promised(
      paramFilters.upsert("cc", { block: ["top_p"], allow: undefined as unknown as string[] })
    ),
    undefined
  );
  insertRaw("provider_param_filters", "malformed", "{");
  assert.deepEqual(await paramFilters.list(), [
    {
      provider: "cc",
      filter: { block: ["top_p"], allow: [], models: undefined, autoLearn: false },
    },
  ]);
  assert.deepEqual((await paramFilters.listProviderKeys()).sort(), ["cc", "malformed"]);
  assert.equal(
    await promised(paramFilters.deleteByProviders(["cc", "malformed", "unknown"])),
    undefined
  );
  assert.deepEqual(await paramFilters.listProviderKeys(), []);
});

test("param filter repository: a failing multi-key delete rolls back", async () => {
  await paramFilters.upsert("a", { block: ["x"], allow: [] });
  await paramFilters.upsert("b", { block: ["y"], allow: [] });
  const poison = { toString: () => "b" } as unknown as string;
  await assert.rejects(paramFilters.deleteByProviders(["a", poison]));
  assert.deepEqual((await paramFilters.listProviderKeys()).sort(), ["a", "b"]);
});

test("MITM alias repository: Promise CRUD with the stored JSON shape", async () => {
  assert.deepEqual(await promised(mitmAliases.findByTool("antigravity")), {});
  assert.deepEqual(await promised(mitmAliases.listAll()), {});
  assert.equal(
    await promised(mitmAliases.replace("antigravity", { a: { model: "x" } })),
    undefined
  );
  await mitmAliases.replace("kiro", undefined);
  assert.deepEqual(await mitmAliases.findByTool("antigravity"), { a: { model: "x" } });
  assert.deepEqual(await mitmAliases.listAll(), {
    antigravity: { a: { model: "x" } },
    kiro: {},
  });
  insertRaw("mitmAlias", "broken", "{");
  await assert.rejects(mitmAliases.findByTool("broken"), SyntaxError);
  await assert.rejects(mitmAliases.listAll(), SyntaxError);
});

test("synchronous bindings share storage with the Promise repositories", async () => {
  interceptionModule.sqliteInterceptionRuleLegacySync.upsert("p", { interceptFetch: true });
  assert.deepEqual(
    (await interceptionRules.list()).map((entry) => entry.rules.interceptFetch),
    [true]
  );
  await interceptionRules.upsert("q", { interceptSearch: false });
  assert.equal(interceptionModule.sqliteInterceptionRuleLegacySync.list().length, 2);

  paramFilterModule.sqliteParamFilterLegacySync.upsert("p", { block: ["n"], allow: [] });
  assert.deepEqual((await paramFilters.list())[0].filter.block, ["n"]);
  await paramFilters.deleteByProviders(["p"]);
  assert.deepEqual(paramFilterModule.sqliteParamFilterLegacySync.listProviderKeys(), []);
});

test("facades delegate persistence through the repository modules", async (t) => {
  const interceptionSync = interceptionModule.sqliteInterceptionRuleLegacySync;
  const filterSync = paramFilterModule.sqliteParamFilterLegacySync;
  const calls: string[] = [];
  t.mock.method(interceptionSync, "upsert", (provider: string) => {
    calls.push(`interception.upsert:${provider}`);
  });
  t.mock.method(interceptionSync, "list", () => {
    calls.push("interception.list");
    return [{ provider: "stub", rules: { interceptSearch: true } }];
  });
  t.mock.method(filterSync, "upsert", (provider: string) => {
    calls.push(`filter.upsert:${provider}`);
  });
  t.mock.method(filterSync, "list", () => {
    calls.push("filter.list");
    return [{ provider: "stub", filter: { block: ["z"], allow: [] } }];
  });
  t.mock.method(sqliteMitmAliasRepository, "replace", async (tool: string) => {
    calls.push(`mitm.replace:${tool}`);
  });
  t.mock.method(sqliteMitmAliasRepository, "findByTool", async () => ({ stub: true }));

  interceptionFacade.setInterceptionRules(" stub ", { interceptSearch: true });
  assert.equal(interceptionFacade.resolveInterceptSearch("stub", null), true);
  paramFilterFacade.setParamFilterConfig("stub", { block: ["z"], allow: [] });
  assert.deepEqual(paramFilterFacade.getParamFilterConfig("stub")?.block, ["z"]);
  await mitmAliasFacade.setMitmAliasAll("tool", {});
  assert.deepEqual(await mitmAliasFacade.getMitmAlias("tool"), { stub: true });

  assert.deepEqual(calls, [
    "interception.upsert:stub",
    "interception.list",
    "filter.upsert:stub",
    "filter.list",
    "mitm.replace:tool",
  ]);
  const rows = core
    .getDbInstance()
    .prepare("SELECT COUNT(*) AS n FROM key_value WHERE key IN ('stub', 'tool')")
    .get() as { n: number };
  assert.equal(rows.n, 0, "facade writes reach SQLite only through the repository modules");

  // Leave the facade caches cold for later tests in this process.
  t.mock.restoreAll();
  interceptionFacade.deleteInterceptionRules("stub");
  paramFilterFacade.deleteParamFilterConfig("stub");
});

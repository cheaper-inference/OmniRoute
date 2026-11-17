// scripts/release/facts.mjs — the facts document behind every derived number, the
// infrastructure-error classification of the tsx probe, and the committed snapshot.
import { afterEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  CODE_FACT_KEYS,
  DEFAULT_FACTS_TIMEOUT_MS,
  FACTS_SNAPSHOT_PATH,
  __resetSpawnSyncForTest,
  __setSpawnSyncForTest,
  classifyProbeResult,
  collectFacts,
  getFactAt,
  loadFactsSnapshot,
  normalizeFacts,
  readCodeFacts,
  readCodeFactsResult,
  resolveFactsTimeoutMs,
  runFactsCli,
  serializeFacts,
  writeFactsSnapshot,
} from "../../scripts/release/facts.mjs";

type SpawnCall = { cmd: string; args: string[]; opts: Record<string, unknown> };

const CODE = {
  freeSteady: 1623225000,
  entries: 465,
  freeFirst: 2223725000,
  freeGated: 6000000,
  freePools: 34,
  engines: 12,
  cliTotal: 39,
  cliCode: 28,
  cliAgent: 11,
  mcpTools: 110,
  mcpScopes: 33,
  providers: 393,
  freeForever: 51,
  modePacks: ["ship-fast", "cost-saver"],
  catalogDate: "2026-11-09",
  sortBy: "reliability",
  intelligentKeys: 16,
  hardStop: 44,
  trainsOnPrompts: 22,
  freeTierCount: 74,
  freeTierReg: 74,
  manifestFreeTier: 74,
  freeTierBudget: { steady: 1623225000, pools: [], oneTime: [] },
};

const calls: SpawnCall[] = [];
function fakeSpawn(result: Record<string, unknown>) {
  __setSpawnSyncForTest((cmd: string, args: string[], opts: Record<string, unknown>) => {
    calls.push({ cmd, args, opts });
    return result;
  });
}

afterEach(() => {
  __resetSpawnSyncForTest();
  calls.length = 0;
  delete process.env.OMNIROUTE_FACTS_TIMEOUT_MS;
});

describe("probe result classification (infrastructure, never drift)", () => {
  const cases: Array<[string, Record<string, unknown>, string]> = [
    [
      "spawnSync timeout",
      { error: Object.assign(new Error("t"), { code: "ETIMEDOUT" }) },
      "timeout",
    ],
    ["killed by a signal", { status: null, signal: "SIGKILL", stdout: "" }, "timeout"],
    [
      "node missing",
      { error: Object.assign(new Error("spawn ENOENT"), { code: "ENOENT" }) },
      "spawn",
    ],
    ["non-zero exit", { status: 1, stdout: "", stderr: "tsx not found" }, "exit"],
    ["no facts line", { status: 0, stdout: "[DB] ready\n" }, "parse"],
    ["broken JSON", { status: 0, stdout: "@@{not json\n" }, "parse"],
    ["JSON that is not an object", { status: 0, stdout: "@@[1,2]\n" }, "parse"],
  ];
  for (const [name, result, kind] of cases) {
    it(`${name} → error.kind=${kind}`, () => {
      const r = classifyProbeResult(result, 1234);
      assert.equal(r.facts, null);
      assert.equal(r.error?.kind, kind);
      assert.match(r.error.detail, /infrastructure failure, not a documentation divergence/);
    });
  }

  it("a clean run returns the facts line, ignoring the app's log noise", () => {
    const r = classifyProbeResult(
      { status: 0, stdout: `[Migration] Applied: 001\n@@${JSON.stringify(CODE)}\n` },
      1
    );
    assert.equal(r.error, null);
    assert.deepEqual(r.facts, CODE);
  });
});

describe("readCodeFactsResult / readCodeFacts", () => {
  it("a simulated timeout is classified as timeout, and readCodeFacts() stays null-compatible", () => {
    fakeSpawn({
      error: Object.assign(new Error("spawnSync node ETIMEDOUT"), { code: "ETIMEDOUT" }),
    });
    const r = readCodeFactsResult({ timeoutMs: 5 });
    assert.equal(r.facts, null);
    assert.equal(r.error?.kind, "timeout");
    assert.match(r.error.detail, /5 ms/);
    assert.equal(readCodeFacts(), null);
  });

  it("runs the probe module under tsx with an isolated DATA_DIR and the configured timeout", () => {
    process.env.OMNIROUTE_FACTS_TIMEOUT_MS = "4321";
    fakeSpawn({ status: 0, stdout: `@@${JSON.stringify(CODE)}\n` });
    const r = readCodeFactsResult();
    assert.deepEqual(r.facts, CODE);
    assert.equal(calls.length, 1);
    const { cmd, args, opts } = calls[0];
    assert.equal(cmd, process.execPath);
    assert.deepEqual(args.slice(0, 2), ["--import", "tsx/esm"]);
    assert.match(args[2], /scripts[\\/]release[\\/]lib[\\/]code-facts-probe\.mjs$/);
    assert.equal(opts.timeout, 4321);
    const env = opts.env as Record<string, string>;
    assert.ok(env.DATA_DIR.startsWith(os.tmpdir()), "DATA_DIR must be a throwaway dir");
    assert.notEqual(env.DATA_DIR, path.join(os.homedir(), ".omniroute"));
    assert.equal(
      fs.existsSync(env.DATA_DIR),
      false,
      "the throwaway DATA_DIR is removed afterwards"
    );
  });

  it("the timeout resolves arg > OMNIROUTE_FACTS_TIMEOUT_MS > 600000", () => {
    assert.equal(resolveFactsTimeoutMs(undefined, {}), DEFAULT_FACTS_TIMEOUT_MS);
    assert.equal(DEFAULT_FACTS_TIMEOUT_MS, 600000);
    assert.equal(resolveFactsTimeoutMs(undefined, { OMNIROUTE_FACTS_TIMEOUT_MS: "9000" }), 9000);
    assert.equal(resolveFactsTimeoutMs(77, { OMNIROUTE_FACTS_TIMEOUT_MS: "9000" }), 77);
    assert.equal(resolveFactsTimeoutMs(undefined, { OMNIROUTE_FACTS_TIMEOUT_MS: "nope" }), 600000);
    assert.equal(resolveFactsTimeoutMs(-1, {}), 600000);
  });

  it("a thrown spawnSync is a spawn error, not an exception", () => {
    __setSpawnSyncForTest(() => {
      throw new Error("EAGAIN");
    });
    assert.equal(readCodeFactsResult().error?.kind, "spawn");
  });
});

describe("collectFacts", () => {
  function tempTree() {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "release-facts-"));
    const w = (rel: string, text: string) => {
      fs.mkdirSync(path.dirname(path.join(root, rel)), { recursive: true });
      fs.writeFileSync(path.join(root, rel), text);
    };
    w("package.json", JSON.stringify({ version: "9.9.9" }));
    w("docs/reference/PROVIDER_REFERENCE.md", "Total providers: **391**.\n");
    w("src/lib/db/migrations/001_a.sql", "");
    w("src/lib/db/migrations/002_b.sql", "");
    w("config/i18n.json", JSON.stringify({ locales: [{ code: "en" }, { code: "pt-BR" }] }));
    w(
      "src/shared/constants/routingStrategies.ts",
      'export const ROUTING_STRATEGY_VALUES = ["priority", "weighted"];\n'
    );
    w(
      "open-sse/services/autoCombo/scoring.ts",
      "export const DEFAULT_WEIGHTS = {\n  quota: 1,\n  health: 2,\n};\n"
    );
    w(
      "config/quality/quality-baseline.json",
      JSON.stringify({
        metrics: {
          "coverage.branches": { value: 4 },
          "coverage.functions": { value: 3 },
          "coverage.lines": { value: 2 },
          "coverage.statements": { value: 1 },
        },
      })
    );
    w("open-sse/executors/a.ts", "");
    w("open-sse/executors/index.ts", "");
    return root;
  }

  it("builds the document from the tree at `root` in the fixed key order", () => {
    const root = tempTree();
    try {
      fakeSpawn({ status: 0, stdout: `@@${JSON.stringify(CODE)}\n` });
      const { facts, error } = collectFacts({ root });
      assert.equal(error, null);
      assert.equal(calls[0].opts.cwd, root, "the probe measures the same tree");
      assert.deepEqual(Object.keys(facts), [
        "schemaVersion",
        "version",
        "providers",
        "providerReferenceTotal",
        "migrations",
        "locales",
        "routingStrategies",
        "scoringFactors",
        "coverageFloors",
        "executors",
        "oauthProviders",
        "a2aSkills",
        "cloudAgents",
        "code",
      ]);
      assert.equal(facts.schemaVersion, 1);
      assert.equal(facts.version, "9.9.9");
      assert.equal(facts.providers, 393, "providers = code.providers (live modules)");
      assert.equal(facts.providerReferenceTotal, 391, "the total written in PROVIDER_REFERENCE");
      assert.equal(facts.migrations, 2);
      assert.equal(facts.locales, 2);
      assert.equal(facts.routingStrategies, 2);
      assert.equal(facts.scoringFactors, 2);
      assert.deepEqual(Object.entries(facts.coverageFloors), [
        ["statements", 1],
        ["lines", 2],
        ["functions", 3],
        ["branches", 4],
      ]);
      assert.equal(facts.executors, 1, "index.ts is not an implementation");
      assert.deepEqual(Object.keys(facts.code), CODE_FACT_KEYS);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  it("returns facts:null with the infrastructure error — a partial document never escapes", () => {
    fakeSpawn({ status: 1, stdout: "", stderr: "boom" });
    const r = collectFacts();
    assert.equal(r.facts, null);
    assert.equal(r.error?.kind, "exit");
  });
});

describe("snapshot serialization", () => {
  it("is stable: same facts in any key order → the same bytes, 2-space JSON + newline", () => {
    const a = normalizeFacts({ schemaVersion: 1, version: "1.0.0", code: CODE, providers: 3 });
    const shuffledCode = Object.fromEntries(Object.entries(CODE).reverse());
    const b = { code: shuffledCode, providers: 3, version: "1.0.0", schemaVersion: 1 };
    assert.equal(serializeFacts(a), serializeFacts(b));
    const text = serializeFacts(b);
    assert.ok(text.endsWith("}\n"));
    assert.match(text, /^\{\n {2}"schemaVersion": 1,\n {2}"version": "1.0.0",/);
  });

  it("prints exactly what Prettier prints (lint-staged formats staged JSON)", async () => {
    const prettier = await import("prettier");
    const config = (await prettier.resolveConfig("docs/reference/derived-facts.json")) ?? {};
    const samples = [
      loadFactsSnapshot(),
      {
        schemaVersion: 1,
        code: {
          ...CODE,
          modePacks: [
            "a-very-long-pack-name",
            "another-long-pack-name",
            "and-a-third-long-one",
            "x",
          ],
          freeTierBudget: {
            pools: [{ provider: "a", tokens: 1 }],
            names: ["A"],
            empty: [],
            none: {},
          },
        },
      },
    ];
    for (const facts of samples) {
      const text = serializeFacts(facts);
      assert.equal(await prettier.format(text, { ...config, parser: "json" }), text);
    }
  });

  it("keeps an unknown key, after the known ones, instead of dropping it", () => {
    const text = serializeFacts({ zeta: 1, schemaVersion: 1, alpha: 2 });
    assert.deepEqual(Object.keys(JSON.parse(text)), ["schemaVersion", "alpha", "zeta"]);
  });

  it("writeFactsSnapshot only reports a change when the bytes change", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "release-facts-snap-"));
    try {
      const facts = { schemaVersion: 1, version: "1.0.0", code: CODE };
      assert.equal(writeFactsSnapshot(facts, root), true);
      assert.equal(writeFactsSnapshot({ ...facts }, root), false);
      assert.deepEqual(loadFactsSnapshot(root), normalizeFacts(facts));
      assert.equal(loadFactsSnapshot(path.join(root, "missing")), null);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  it("the committed snapshot is in canonical form (a refresh with the same facts is a no-op)", () => {
    const committed = fs.readFileSync(FACTS_SNAPSHOT_PATH, "utf8");
    const snap = loadFactsSnapshot();
    assert.ok(snap, `${FACTS_SNAPSHOT_PATH} must exist and parse`);
    assert.equal(serializeFacts(snap), committed);
    assert.equal(snap.schemaVersion, 1);
    assert.deepEqual(Object.keys(snap.code), CODE_FACT_KEYS);
    assert.equal(snap.providers, snap.code.providers);
  });
});

describe("npm run facts", () => {
  const io = () => {
    const out: string[] = [];
    const err: string[] = [];
    return { out, err, sink: { out: (s: string) => out.push(s), err: (s: string) => err.push(s) } };
  };

  it("--snapshot --key=<dotted path> prints one value", () => {
    const { out, sink } = io();
    assert.equal(runFactsCli(["--snapshot", "--key=code.mcpTools"], sink), 0);
    assert.equal(out[0], String(loadFactsSnapshot().code.mcpTools));
  });

  it("an unknown key exits 1", () => {
    const { err, sink } = io();
    assert.equal(runFactsCli(["--snapshot", "--key=code.nope"], sink), 1);
    assert.match(err[0], /no fact at code\.nope/);
  });

  it("exits 2 (infrastructure) when the live facts cannot be collected", () => {
    fakeSpawn({ error: Object.assign(new Error("t"), { code: "ETIMEDOUT" }) });
    const { err, sink } = io();
    assert.equal(runFactsCli([], sink), 2);
    assert.match(err[0], /not a documentation divergence/);
  });

  it("getFactAt walks dotted paths and returns undefined for a missing one", () => {
    const f = { a: { b: { c: 0 } } };
    assert.equal(getFactAt(f, "a.b.c"), 0);
    assert.equal(getFactAt(f, "a.x.c"), undefined);
  });
});

// The README diagram generators draw their derived numbers from the facts snapshot
// (scripts/docs/readmeFacts.mjs), not from literals: changing the facts changes the copy, and the
// committed snapshot reproduces the committed SVGs (byte-for-byte checks live in
// tests/unit/docs/readme-*-svg.test.ts).
import { after, before, describe, it } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { RF, README_FACTS, readmeFact } from "../../scripts/docs/readmeFacts.mjs";
import { loadFactsSnapshot } from "../../scripts/release/facts.mjs";

const GENERATORS = {
  hero: ["gen-readme-hero.mjs", "HERO_COPY"],
  pillars: ["gen-readme-promise-pillars.mjs", "PROMISE_PILLARS_COPY"],
  comparison: ["gen-readme-comparison-table.mjs", "COMPARISON_TABLE_COPY"],
  cascade: ["gen-readme-tier-cascade.mjs", "TIER_CASCADE_COPY"],
  grid: ["gen-readme-strategies-grid.mjs", "STRATEGIES_GRID_COPY"],
  cli: ["gen-readme-cli-terminal.mjs", "CLI_TERMINAL_COPY"],
} as const;

type Copies = Record<keyof typeof GENERATORS | "budget", Record<string, string[]>>;

// Imports every generator in a child process whose OMNIROUTE_DERIVED_FACTS_PATH points at
// `facts`, and returns their copy objects (the generators build them at module load).
function copiesFor(facts: object, dir: string): Copies {
  const file = path.join(dir, `facts-${Math.random().toString(36).slice(2)}.json`);
  fs.writeFileSync(file, JSON.stringify(facts));
  const script = Object.entries(GENERATORS)
    .map(
      ([key, [mod, name]]) =>
        `out.${key} = (await import(${JSON.stringify(path.resolve("scripts/docs", mod))})).${name};`
    )
    .concat(
      `out.budget = (await import(${JSON.stringify(
        path.resolve("scripts/docs/gen-readme-free-tier-budget.mjs")
      )})).buildFreeTierBudgetCopy();`
    )
    .join("\n");
  const r = spawnSync(
    process.execPath,
    [
      "--input-type=module",
      "-e",
      `const out = {};\n${script}\nconsole.log("@@" + JSON.stringify(out));`,
    ],
    {
      encoding: "utf8",
      timeout: 240000,
      env: { ...process.env, OMNIROUTE_DERIVED_FACTS_PATH: file },
    }
  );
  assert.equal(r.status, 0, r.stderr);
  const line = r.stdout.split("\n").find((l) => l.startsWith("@@"));
  assert.ok(line, `no copy printed: ${r.stdout}${r.stderr}`);
  return JSON.parse(line.slice(2));
}

const flat = (copy: Record<string, string[]>) => Object.values(copy).flat().join("\n");

describe("README generators follow the facts snapshot", () => {
  let dir: string;
  let base: Copies;
  let bumped: Copies;
  const snapshot = loadFactsSnapshot();
  const changed = {
    ...snapshot,
    providers: 987,
    routingStrategies: 76,
    scoringFactors: 54,
    locales: 43,
    code: {
      ...snapshot.code,
      mcpTools: 321,
      freeForever: 98,
      cliTotal: 65,
      engines: 32,
      freeSteady: 2.5e9,
      freeTierBudget: {
        ...snapshot.code.freeTierBudget,
        steady: 3.33e9,
        poolCount: 77,
        modelCount: 888,
        pools: [{ provider: "zz-test", name: "ZZ Test", tokens: 5e8, caps: 0 }],
      },
    },
  };

  before(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), "readme-facts-"));
    base = copiesFor(snapshot, dir);
    bumped = copiesFor(changed, dir);
  });
  after(() => fs.rmSync(dir, { recursive: true, force: true }));

  it("readmeFacts exposes the committed snapshot", () => {
    assert.deepEqual(README_FACTS, snapshot);
    assert.equal(RF.providers, snapshot.providers);
    assert.equal(RF.mcpTools, snapshot.code.mcpTools);
    assert.equal(RF.freeSteadyBillions, (snapshot.code.freeSteady / 1e9).toFixed(2));
    assert.throws(() => readmeFact("code.modePacks"), /no numeric fact/);
  });

  it("hero: provider total, routing strategies and steady free tokens", () => {
    assert.ok(flat(base.hero).includes(`${snapshot.providers} providers`));
    assert.ok(base.hero.stats.includes(String(snapshot.providers)));
    const text = flat(bumped.hero);
    assert.ok(text.includes("Every AI tool → 987 providers"));
    assert.ok(bumped.hero.stats.includes("987"));
    assert.ok(bumped.hero.stats.includes("76"));
    assert.ok(bumped.hero.stats.includes("~2.50B"));
    assert.ok(!text.includes(String(snapshot.providers)), "no stale provider total left");
  });

  it("promise pillars: providers, free-forever, CLI integrations, MCP tools", () => {
    const text = flat(bumped.pillars);
    assert.ok(text.includes("987 providers."));
    assert.ok(text.includes("across 987 providers"));
    assert.ok(text.includes("free tier, 98 free"));
    assert.ok(text.includes("65 CLI/agent integrations"));
    assert.ok(text.includes("MCP (321"));
    assert.ok(flat(base.pillars).includes(`MCP (${snapshot.code.mcpTools}`));
  });

  it("comparison table: OmniRoute's own cells", () => {
    for (const v of ["987", "76", "32 eng", "321", "43"])
      assert.ok(bumped.comparison.values.includes(v), v);
    assert.ok(!bumped.comparison.values.includes(String(snapshot.providers)));
    // competitors' cells are copy, not facts
    for (const v of ["40+", "400+*", "100+", "~5"])
      assert.ok(bumped.comparison.values.includes(v), v);
  });

  it("tier cascade and strategies grid: strategy total and scoring factors", () => {
    assert.ok(flat(bumped.cascade).includes("76 routing strategies"));
    assert.ok(flat(bumped.grid).includes("live 54-factor scoring"));
    assert.ok(flat(base.grid).includes(`live ${snapshot.scoringFactors}-factor scoring`));
    // the grid's strategy total is curated with its tiles (the title names the missing ones)
    assert.deepEqual(bumped.grid.kicker, base.grid.kicker);
  });

  it("free-tier budget card: drawn from code.freeTierBudget, not the live catalog", () => {
    const b = snapshot.code.freeTierBudget;
    assert.ok(base.budget.heroMeta.includes(`${b.poolCount} recurring pools`));
    assert.ok(base.budget.heroMeta.includes(`${b.modelCount} catalog entries`));
    assert.deepEqual(bumped.budget.hero, ["~3.33B"]);
    assert.ok(bumped.budget.heroMeta.includes("77 recurring pools"));
    assert.ok(bumped.budget.heroMeta.includes("888 catalog entries"));
    assert.deepEqual(bumped.budget.poolNames, ["ZZ Test "]);
  });

  it("cli terminal: the providers-list footer derives from the provider total", () => {
    const n = (copy: Record<string, string[]>) =>
      Number(/… (\d+) more providers/.exec(copy.footers.join("\n"))?.[1]);
    assert.equal(n(bumped.cli) - n(base.cli), 987 - snapshot.providers);
  });

  it("a facts file without a needed number fails loudly instead of drawing a blank", () => {
    const file = path.join(dir, "broken.json");
    fs.writeFileSync(
      file,
      JSON.stringify({ ...snapshot, code: { ...snapshot.code, mcpTools: null } })
    );
    const r = spawnSync(
      process.execPath,
      [
        "--input-type=module",
        "-e",
        `await import(${JSON.stringify(path.resolve("scripts/docs/readmeFacts.mjs"))});`,
      ],
      {
        encoding: "utf8",
        timeout: 60000,
        env: { ...process.env, OMNIROUTE_DERIVED_FACTS_PATH: file },
      }
    );
    assert.notEqual(r.status, 0);
    assert.match(r.stderr, /no numeric fact at "code\.mcpTools"/);
  });
});

describe("summarizeFreeTierBudget (the probe's reduction of the catalog)", () => {
  it("dedupes shared pools, sums per-model caps, sorts deterministically", async () => {
    const { summarizeFreeTierBudget } = await import("../../scripts/docs/readmeFactsFreeTier.mjs");
    const t = {
      steadyRecurringTokens: 10,
      firstMonthRealisticTokens: 20,
      boostMonthlyTokens: 3,
      gatedRecurringTokens: 4,
      poolCount: 2,
      modelCount: 6,
      uncappedProviders: ["u1", "u1"],
      gatedProviders: ["g1"],
      perModel: [
        { provider: "a", freeType: "recurring-monthly", monthlyTokens: 100, poolKey: "a:pool" },
        { provider: "a", freeType: "recurring-monthly", monthlyTokens: 300, poolKey: "a:pool" },
        { provider: "b", freeType: "recurring-daily", monthlyTokens: 50 },
        { provider: "b", freeType: "recurring-daily", monthlyTokens: 60 },
        { provider: "c", freeType: "one-time-initial", creditTokens: 7, tos: "avoid" },
        { provider: "d", freeType: "discontinued", monthlyTokens: 0 },
      ],
    };
    const names: Record<string, string> = {
      a: "Alpha (beta)",
      b: "Bravo — x",
      u1: "Uni",
      g1: "Gee",
    };
    const s = summarizeFreeTierBudget(t, (id: string) => names[id]);
    assert.deepEqual(s.pools, [
      { provider: "a", name: "Alpha", tokens: 300, caps: 0 },
      { provider: "b", name: "Bravo", tokens: 110, caps: 2 },
    ]);
    assert.deepEqual(s.oneTime, [{ provider: "c", v: 7 }]);
    assert.equal(s.discontinued, 1);
    assert.equal(s.avoidProviders, 1);
    assert.deepEqual(s.uncappedNames, ["Uni"]);
    assert.deepEqual(s.gatedProviderNames, ["Gee"]);
    assert.equal(
      JSON.stringify(s),
      JSON.stringify(summarizeFreeTierBudget(t, (id: string) => names[id]))
    );
  });
});

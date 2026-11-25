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
import {
  RF,
  README_FACTS,
  readmeFact,
  readmeFactText,
  hasFreeLabel,
} from "../../scripts/docs/readmeFacts.mjs";
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
      headlineSteady: 2.5e9,
      headlineSteadyLabel: "~2.5B",
      headlineFirstLabel: "~4.4B",
      hasFreeProviders: 987,
      rowSumLiveLabel: "~333M",
      rowSumTotalLabel: "~77.7B",
      freePublishedPools: 66,
      freeAccessRows: 555,
      catalogDate: "2099-01-02",
      publicFreeTierBudget: {
        ...snapshot.code.publicFreeTierBudget,
        steady: 3.33e9,
        pools: [{ provider: "zz-test", name: "ZZ Test", tokens: 5e8, caps: 0 }],
      },
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
    assert.equal(RF.headlineSteadyLabel, snapshot.code.headlineSteadyLabel);
    assert.throws(() => readmeFact("code.modePacks"), /no numeric fact/);
  });

  it("free-tier labels come from the snapshot, never from a local formatter", () => {
    assert.equal(RF.rowSumTotalLabel, snapshot.code.rowSumTotalLabel);
    assert.equal(RF.headlineFirstLabel, snapshot.code.headlineFirstLabel);
    assert.equal(RF.rowSumLiveLabel, snapshot.code.rowSumLiveLabel);
    assert.equal(RF.rowSumRetiredPct, `${(snapshot.code.rowSumRetiredShare * 100).toFixed(1)}%`);
    assert.equal(RF.freeProvidersTotal, snapshot.code.freeProviders.total);
    assert.equal(RF.freePublishedPools, snapshot.code.freePublishedPools);
    assert.equal(RF.freeAccessRows, snapshot.code.freeAccessRows);
    assert.equal(RF.freeModels, snapshot.code.freeModels);
    assert.equal(RF.hasFreeProviders, snapshot.code.hasFreeProviders);
    assert.equal(RF.hasFreeLabel, hasFreeLabel(snapshot.code.hasFreeProviders));
    assert.equal(RF.catalogDate, snapshot.code.catalogDate);
    // F-A (owner, 2026-11-24): rounded down to the ten, with a plus, so a recount cannot overstate it.
    assert.equal(hasFreeLabel(144), "140+");
    assert.equal(hasFreeLabel(150), "150+");
    assert.equal(hasFreeLabel(9), "9");
    assert.equal(readmeFactText("code.rowSumTotalLabel"), snapshot.code.rowSumTotalLabel);
    assert.throws(() => readmeFactText("code.headlineSteady"), /no text fact/);
    assert.equal("freeSteadyBillions" in RF, false);
  });

  it("no generator reads a legacy free-tier key", () => {
    const LEGACY = /code\.(?:freeSteady|freeFirst|freePools|entries)\b|code\??\.freeTierBudget\b/;
    const files = fs
      .readdirSync("scripts/docs")
      .filter((f) => /^gen-readme-.*\.mjs$/.test(f) || f === "readmeFacts.mjs")
      .map((f) => path.join("scripts/docs", f));
    assert.ok(files.length > 5);
    for (const file of files) {
      assert.doesNotMatch(fs.readFileSync(file, "utf8"), LEGACY, file);
    }
  });

  it("hero: provider total, routing strategies and steady free tokens", () => {
    assert.ok(flat(base.hero).includes(`${snapshot.providers} providers`));
    assert.ok(base.hero.stats.includes(String(snapshot.providers)));
    const text = flat(bumped.hero);
    assert.ok(text.includes("Every AI tool → 987 providers"));
    assert.ok(bumped.hero.stats.includes("987"));
    assert.ok(bumped.hero.stats.includes("76"));
    assert.ok(text.includes("980+"), "the free-offer label follows hasFreeProviders");
    // D48: the big figure and the real one travel as one string, never split across entries.
    const pair = Object.values(bumped.hero)
      .flat()
      .filter((s) => /~77\.7B as others count · ~2\.5B real/i.test(s));
    assert.ok(pair.length > 0, "the short pair is one string of the hero copy");
    assert.ok(!text.includes("~333M"), "the live row sum stays off the hero");
    assert.ok(!/row by row|per live row/i.test(text));
    // D51: the tool line at the top of the README does not change.
    assert.match(bumped.hero.tools[0], /Antigravity/);
    assert.match(bumped.hero.tools[0], /FREE Claude \/ GPT \/ Gemini/);
    assert.ok(!text.includes(String(snapshot.providers)), "no stale provider total left");
  });

  it("promise pillars: providers, free-forever, CLI integrations, MCP tools", () => {
    const text = flat(bumped.pillars);
    assert.ok(text.includes("987 providers."));
    assert.ok(text.includes("across 987 providers"));
    assert.ok(text.includes("980+ with a free offer, 98 free"));
    assert.ok(!text.includes("150+"), "the free-offer label follows hasFreeProviders");
    assert.ok(text.includes("with a free offer, 98 free forever"));
    assert.ok(text.includes("65 CLI/agent integrations"));
    assert.ok(text.includes("MCP (321"));
    assert.ok(flat(base.pillars).includes(`MCP (${snapshot.code.mcpTools}`));
  });

  it("comparison table: OmniRoute's own cells", () => {
    for (const v of ["987", "980+", "76", "32 eng", "321", "43"])
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
    // The grid's strategy total counts the tiles drawn in the SVG.
    assert.deepEqual(bumped.grid.kicker, base.grid.kicker);
  });

  it("free-tier budget card: drawn from the public facts, not the live catalog", () => {
    const c = snapshot.code;
    assert.ok(
      base.budget.heroMeta.join("").includes(`${c.freePublishedPools} pools with a published quota`)
    );
    assert.ok(
      base.budget.heroMeta.join("").includes(`${c.freeAccessRows} catalog rows with free access`)
    );
    const text = flat(bumped.budget);
    assert.deepEqual(bumped.budget.hero, ["~2.5B"]);
    assert.equal(bumped.budget.big[0], "~77.7B");
    assert.ok(text.indexOf("~77.7B") < text.indexOf("~2.5B"), "the big figure comes first");
    assert.ok(bumped.budget.heroSub.join("").includes("~4.4B in your first month"));
    assert.ok(bumped.budget.heroMeta.join("").includes("66 pools with a published quota"));
    assert.ok(bumped.budget.heroMeta.join("").includes("555 catalog rows with free access"));
    assert.ok(bumped.budget.ladder.join("").includes("~333M summed per live row"));
    assert.ok(bumped.budget.ladder.join("").includes("2099-01-02"));
    assert.deepEqual(bumped.budget.poolNames, ["ZZ Test "]);
  });

  it("cli terminal: the provider total comes from the facts and only the title draws it", () => {
    // `providers list` prints the operator's own connections, never the catalog, so the replay
    // must not show a catalog-total footer (the old "… N more providers" was invented output).
    for (const copy of [base.cli, bumped.cli]) {
      assert.doesNotMatch(copy.footers.join("\n"), /more providers/);
    }
    assert.ok(!flat(bumped.cli).includes("987"), "the screens draw no provider total");

    // The accessible title still states the total, drawn from the facts snapshot.
    const factsFile = path.join(dir, "cli-terminal-facts.json");
    const out = path.join(dir, "cli-terminal.svg");
    fs.writeFileSync(factsFile, JSON.stringify(changed));
    const r = spawnSync(
      process.execPath,
      [path.resolve("scripts/docs/gen-readme-cli-terminal.mjs"), "--out", out],
      {
        encoding: "utf8",
        timeout: 240000,
        env: { ...process.env, OMNIROUTE_DERIVED_FACTS_PATH: factsFile },
      }
    );
    assert.equal(r.status, 0, r.stderr);
    const svg = fs.readFileSync(out, "utf8");
    assert.match(svg, /OmniRoute registers 987 providers/);
    assert.doesNotMatch(svg, new RegExp(`registers ${snapshot.providers} providers`));
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

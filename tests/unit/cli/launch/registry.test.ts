import test from "node:test";
import assert from "node:assert/strict";

import {
  createRegistry,
  getLaunchRegistry,
  launchRegistry,
} from "../../../../bin/cli/launch/registry.mjs";
import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { ADAPTER_INDEX } from "../../../../bin/cli/launch/adapters/index.mjs";
import { ADAPTERS } from "../../../../bin/cli/launch/adapters/all.mjs";
import { defineAdapter } from "../../../../bin/cli/launch/contract.mjs";
import { listManifestTargets } from "../../../../bin/cli/cli-manifest.mjs";
import rawManifest from "../../../../config/cli-tools-manifest.json" with { type: "json" };

const ALL_IDS = [
  "aider",
  "claude",
  "cline",
  "codex",
  "continue",
  "copilot",
  "crush",
  "deepseek",
  "gemini",
  "goose",
  "hermes",
  "kilo",
  "kimi",
  "omp",
  "openclaw",
  "opencode",
  "pi",
  "pool",
  "qwen",
];
const CORE = [
  "claude",
  "codex",
  "opencode",
  "pi",
  "omp",
  "hermes",
  "openclaw",
  "crush",
  "cline",
  "aider",
  "deepseek",
  "qwen",
];
const SUPPORTED = ["kilo", "goose", "gemini", "continue", "copilot", "kimi", "pool"];

const ADAPTERS_DIR = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../../../bin/cli/launch/adapters"
);

/** Eager registry over the real adapters: same ids, order and metadata as the lazy default. */
const eagerRegistry = createRegistry({ adapters: ADAPTERS });

test("all 19 adapter ids resolve through load", async () => {
  assert.equal(launchRegistry, getLaunchRegistry());
  for (const id of ALL_IDS) {
    assert.equal((await launchRegistry.load(id))?.id, id, id);
    assert.equal(launchRegistry.resolve(id), id);
  }
});

test("manifest aliases resolve, case-insensitive and trimmed", async () => {
  assert.equal((await launchRegistry.load("cc"))?.id, "claude");
  assert.equal((await launchRegistry.load("cn"))?.id, "continue");
  assert.equal((await launchRegistry.load("dsh"))?.id, "deepseek");
  assert.equal((await launchRegistry.load("  CC "))?.id, "claude");
  assert.equal(launchRegistry.resolve("KILOCODE"), "kilo");
  assert.equal(launchRegistry.resolve("poolside"), "pool");
  assert.ok(launchRegistry.aliasesOf("claude").includes("cc"));
  assert.equal(launchRegistry.entry("cc")?.id, "claude");
});

test("unknown ids resolve to undefined", async () => {
  for (const bad of ["nope", "", "  ", undefined, null, "droid", "whycodes", "amp"]) {
    assert.equal(launchRegistry.get(bad as never), undefined, String(bad));
    assert.equal(await launchRegistry.load(bad as never), undefined, String(bad));
    assert.equal(launchRegistry.resolve(bad as never), undefined);
  }
  assert.deepEqual(launchRegistry.aliasesOf("nope"), []);
  assert.equal(launchRegistry.entry("nope"), undefined);
});

test("ids() follows manifest declaration order and matches listManifestTargets", async () => {
  const expected = Object.entries(rawManifest.tools)
    .filter(([, entry]) => entry.surfaces.launch === true)
    .map(([id]) => id);
  assert.deepEqual(launchRegistry.ids(), expected);
  assert.deepEqual(launchRegistry.ids(), listManifestTargets("launch"));
  assert.deepEqual(
    (await launchRegistry.loadAll()).map((a) => a.id),
    expected
  );
  assert.deepEqual(
    eagerRegistry.list().map((a) => a.id),
    expected
  );
});

test("manifest launch:true ids and registry ids are the same set; no later tier registered", async () => {
  const manifestIds = Object.entries(rawManifest.tools)
    .filter(([, entry]) => entry.surfaces.launch === true)
    .map(([id]) => id);
  assert.deepEqual([...manifestIds].sort(), [...launchRegistry.ids()].sort());
  assert.deepEqual([...launchRegistry.ids()].sort(), [...ALL_IDS].sort());
  for (const adapter of await launchRegistry.loadAll()) {
    assert.notEqual(adapter.capabilities.tier, "later", adapter.id);
  }
  for (const id of Object.keys(rawManifest.tools)) {
    assert.equal(
      typeof rawManifest.tools[id as keyof typeof rawManifest.tools].surfaces.launch,
      "boolean",
      id
    );
  }
});

test("tier filter returns the core 12 and the supported 7", async () => {
  for (const registry of [launchRegistry, eagerRegistry]) {
    assert.deepEqual(
      (await registry.loadAll({ tier: "core" })).map((a) => a.id).sort(),
      [...CORE].sort()
    );
    assert.deepEqual(
      (await registry.loadAll({ tier: "supported" })).map((a) => a.id).sort(),
      [...SUPPORTED].sort()
    );
  }
  assert.deepEqual(
    eagerRegistry
      .list({ tier: "core" })
      .map((a) => a.id)
      .sort(),
    [...CORE].sort()
  );
});

test("every registered adapter re-validates and has a displayName", async () => {
  for (const adapter of await launchRegistry.loadAll()) {
    assert.doesNotThrow(() => defineAdapter({ ...adapter }), adapter.id);
    const { displayName } = launchRegistry.entry(adapter.id)!;
    assert.equal(typeof displayName, "string", adapter.id);
    assert.ok(displayName.length > 0, adapter.id);
    if (adapter.displayName) assert.equal(displayName, adapter.displayName);
  }
  assert.equal(ADAPTERS.length, 19);
});

test("manifest aliases are unique and never collide with another tool id", () => {
  const seen = new Map<string, string>();
  for (const [id, entry] of Object.entries(rawManifest.tools)) {
    for (const alias of entry.aliases) {
      assert.equal(seen.has(alias), false, `duplicate alias ${alias}`);
      assert.equal(
        Object.hasOwn(rawManifest.tools, alias),
        false,
        `alias ${alias} equals a tool id`
      );
      seen.set(alias, id);
    }
  }
});

test("createRegistry accepts injected adapters and manifest and drops tier later", () => {
  const mk = (id: string, tier: string) => ({
    id,
    displayName: id.toUpperCase(),
    capabilities: { tier },
  });
  const manifest = {
    tools: {
      b: { aliases: ["bee"], surfaces: { launch: true } },
      a: { aliases: ["ay"], surfaces: { launch: true } },
      l: { aliases: ["later-alias"], surfaces: { launch: true } },
    },
  };
  const reg = createRegistry({
    adapters: [mk("a", "core"), mk("b", "supported"), mk("l", "later"), mk("z", "core")] as never,
    manifest: manifest as never,
  });
  assert.deepEqual(reg.ids(), ["b", "a", "z"]);
  assert.equal(reg.get("BEE")?.id, "b");
  assert.equal(reg.get("l"), undefined);
  assert.equal(reg.get("later-alias"), undefined);
  assert.deepEqual(
    reg.list({ tier: "supported" }).map((x) => x.id),
    ["b"]
  );
  assert.deepEqual(reg.aliasesOf("a"), ["ay"]);
  assert.equal(Object.isFrozen(reg), true);
});

test("the static adapter index matches the real adapters (ids, order, metadata, no later tier)", async () => {
  const files = readdirSync(ADAPTERS_DIR)
    .filter((name) => name.endsWith(".mjs") && name !== "index.mjs" && name !== "all.mjs")
    .sort();
  const real = [];
  for (const name of files) {
    real.push((await import(pathToFileURL(join(ADAPTERS_DIR, name)).href)).default);
  }
  const eligible = real.filter((adapter) => adapter.capabilities.tier !== "later");
  assert.deepEqual(
    ADAPTERS.map((a) => a.id),
    eligible.map((a) => a.id),
    "all.mjs lists every non-later adapter file in file order"
  );
  assert.deepEqual(
    ADAPTER_INDEX.map((item) => item.id),
    eligible.map((a) => a.id),
    "index ids and order"
  );
  for (const [i, item] of ADAPTER_INDEX.entries()) {
    const adapter = eligible[i];
    assert.equal(item.displayName, adapter.displayName, `${item.id} displayName`);
    assert.equal(item.tier, adapter.capabilities.tier, `${item.id} tier`);
    assert.deepEqual([...item.aliases], [...(adapter.aliases || [])], `${item.id} aliases`);
    assert.equal(await item.load(), ADAPTERS[i], `${item.id} load() returns the adapter`);
  }
  for (const adapter of real.filter((a) => a.capabilities.tier === "later")) {
    assert.ok(!ADAPTER_INDEX.some((item) => item.id === adapter.id), `${adapter.id} is later`);
  }
});

test("the lazy default registry matches an eager registry over the same adapters", async () => {
  assert.deepEqual(launchRegistry.ids(), eagerRegistry.ids());
  for (const id of eagerRegistry.ids()) {
    const lazy = launchRegistry.entry(id)!;
    const eager = eagerRegistry.entry(id)!;
    assert.deepEqual(
      { id: lazy.id, displayName: lazy.displayName, tier: lazy.tier, aliases: lazy.aliases },
      { id: eager.id, displayName: eager.displayName, tier: eager.tier, aliases: eager.aliases },
      id
    );
    assert.equal(eager.adapter, eagerRegistry.get(id));
    assert.deepEqual(launchRegistry.aliasesOf(id), eagerRegistry.aliasesOf(id));
  }
  assert.deepEqual(await launchRegistry.loadAll(), await eagerRegistry.loadAll());
});

test("a lazy registry loads on demand, caches, and get/list need a prior load", async () => {
  const loads: string[] = [];
  const mk = (id: string, tier = "core") => ({
    id,
    displayName: id.toUpperCase(),
    tier,
    aliases: [`${id}-alias`],
    load: async () => {
      loads.push(id);
      return { id, displayName: id.toUpperCase(), capabilities: { tier } };
    },
  });
  const reg = createRegistry({
    index: [mk("a"), mk("b", "supported"), mk("l", "later")] as never,
    manifest: { tools: {} } as never,
  });
  assert.deepEqual(reg.ids(), ["a", "b"]);
  assert.equal(reg.resolve("A-ALIAS"), "a");
  assert.deepEqual(reg.aliasesOf("b"), ["b-alias"]);
  assert.deepEqual(reg.entry("a"), {
    id: "a",
    displayName: "A",
    tier: "core",
    aliases: ["a-alias"],
  });
  assert.equal(reg.resolve("l"), undefined);
  assert.deepEqual(loads, [], "metadata calls load nothing");
  assert.throws(() => reg.get("a"), /load\(id\)/);
  assert.throws(() => reg.list(), /loadAll\(\)/);
  assert.equal(reg.get("nope"), undefined);
  assert.equal(await reg.load("nope"), undefined);

  const [first, second] = await Promise.all([reg.load("a-alias"), reg.load("a")]);
  assert.equal(first, second);
  assert.equal(reg.get("a"), first);
  assert.deepEqual(loads, ["a"], "concurrent loads share one import");
  assert.deepEqual(
    (await reg.loadAll()).map((x) => x.id),
    ["a", "b"]
  );
  assert.deepEqual(loads, ["a", "b"]);
  assert.deepEqual(
    reg.list({ tier: "supported" }).map((x) => x.id),
    ["b"]
  );
  assert.equal(Object.isFrozen(reg), true);
});

test("a failed lazy load is not cached", async () => {
  let attempts = 0;
  const reg = createRegistry({
    index: [
      {
        id: "x",
        tier: "core",
        load: async () => {
          attempts++;
          if (attempts === 1) throw new Error("boom");
          return { id: "x", capabilities: { tier: "core" } };
        },
      },
    ] as never,
    manifest: { tools: {} } as never,
  });
  await assert.rejects(reg.load("x"), /boom/);
  assert.equal((await reg.load("x"))?.id, "x");
  assert.equal(attempts, 2);
});

test("an eager registry offers load/loadAll resolving to the injected adapters", async () => {
  const a = { id: "a", displayName: "A", capabilities: { tier: "core" } };
  const reg = createRegistry({ adapters: [a] as never, manifest: { tools: {} } as never });
  assert.equal(await reg.load("a"), a);
  assert.equal(await reg.load("zzz"), undefined);
  assert.deepEqual(await reg.loadAll(), [a]);
  assert.equal(reg.entry("a")?.adapter, a);
});

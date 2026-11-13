import test from "node:test";
import assert from "node:assert/strict";

import {
  createRegistry,
  getLaunchRegistry,
  launchRegistry,
} from "../../../../bin/cli/launch/registry.mjs";
import { ADAPTERS } from "../../../../bin/cli/launch/adapters/index.mjs";
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

test("all 19 adapter ids resolve through get", () => {
  assert.equal(launchRegistry, getLaunchRegistry());
  for (const id of ALL_IDS) {
    assert.equal(launchRegistry.get(id)?.id, id, id);
    assert.equal(launchRegistry.resolve(id), id);
  }
});

test("manifest aliases resolve, case-insensitive and trimmed", () => {
  assert.equal(launchRegistry.get("cc")?.id, "claude");
  assert.equal(launchRegistry.get("cn")?.id, "continue");
  assert.equal(launchRegistry.get("dsh")?.id, "deepseek");
  assert.equal(launchRegistry.get("  CC ")?.id, "claude");
  assert.equal(launchRegistry.resolve("KILOCODE"), "kilo");
  assert.equal(launchRegistry.resolve("poolside"), "pool");
  assert.ok(launchRegistry.aliasesOf("claude").includes("cc"));
  assert.equal(launchRegistry.entry("cc")?.id, "claude");
});

test("unknown ids resolve to undefined", () => {
  for (const bad of ["nope", "", "  ", undefined, null, "droid", "whycodes", "amp"]) {
    assert.equal(launchRegistry.get(bad as never), undefined, String(bad));
    assert.equal(launchRegistry.resolve(bad as never), undefined);
  }
  assert.deepEqual(launchRegistry.aliasesOf("nope"), []);
  assert.equal(launchRegistry.entry("nope"), undefined);
});

test("ids() follows manifest declaration order and matches listManifestTargets", () => {
  const expected = Object.entries(rawManifest.tools)
    .filter(([, entry]) => entry.surfaces.launch === true)
    .map(([id]) => id);
  assert.deepEqual(launchRegistry.ids(), expected);
  assert.deepEqual(launchRegistry.ids(), listManifestTargets("launch"));
  assert.deepEqual(
    launchRegistry.list().map((a) => a.id),
    expected
  );
});

test("manifest launch:true ids and registry ids are the same set; no later tier registered", () => {
  const manifestIds = Object.entries(rawManifest.tools)
    .filter(([, entry]) => entry.surfaces.launch === true)
    .map(([id]) => id);
  assert.deepEqual([...manifestIds].sort(), [...launchRegistry.ids()].sort());
  assert.deepEqual([...launchRegistry.ids()].sort(), [...ALL_IDS].sort());
  for (const adapter of launchRegistry.list()) {
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

test("tier filter returns the core 12 and the supported 7", () => {
  assert.deepEqual(
    launchRegistry
      .list({ tier: "core" })
      .map((a) => a.id)
      .sort(),
    [...CORE].sort()
  );
  assert.deepEqual(
    launchRegistry
      .list({ tier: "supported" })
      .map((a) => a.id)
      .sort(),
    [...SUPPORTED].sort()
  );
});

test("every registered adapter re-validates and has a displayName", () => {
  for (const adapter of launchRegistry.list()) {
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

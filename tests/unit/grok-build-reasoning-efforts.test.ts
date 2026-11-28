import assert from "node:assert/strict";
import test from "node:test";
import { parse as parseToml } from "smol-toml";

import {
  applyGrokBuildConfig,
  resetGrokBuildConfig,
} from "../../src/shared/services/grokBuildConfig.ts";

const base = {
  baseUrl: "http://localhost:20128/v1",
  apiKey: "k-test",
  model: "xai/grok-4.7",
  contextWindow: 500000,
};

type EffortRow = {
  id: string;
  value: string;
  label: string;
  description: string;
  default: boolean;
};
type ModelTable = {
  supports_reasoning_effort?: boolean;
  reasoning_effort?: string;
  reasoning_efforts?: EffortRow[];
  context_window?: number;
};
const modelTable = (toml: string, slot = "omniroute"): ModelTable =>
  ((parseToml(toml).model as Record<string, ModelTable>) ?? {})[slot] ?? {};

test("default: no efforts passed means no reasoning keys and the same file as before", () => {
  const out = applyGrokBuildConfig("", base);
  assert.doesNotMatch(out, /reasoning/);
  assert.equal(modelTable(out).context_window, 500000);
});

test("efforts are sanitized to Grok rungs and deduped, with the configured default flagged", () => {
  const out = applyGrokBuildConfig("", {
    ...base,
    reasoningEfforts: ["ultra", "low", "medium", "LOW", "high", "bogus", "xhigh"],
    reasoningEffort: "xhigh",
  });
  const table = modelTable(out);
  assert.equal(table.supports_reasoning_effort, true);
  assert.equal(table.reasoning_effort, "xhigh");
  assert.deepEqual(
    table.reasoning_efforts?.map((r) => r.id),
    ["low", "medium", "high", "xhigh"]
  );
  assert.deepEqual(
    table.reasoning_efforts?.map((r) => r.default),
    [false, false, false, true]
  );
  assert.equal(table.reasoning_efforts?.[0].value, "low");
});

test("default effort falls back to medium, then high, then the first rung", () => {
  const pick = (efforts: string[]) =>
    modelTable(applyGrokBuildConfig("", { ...base, reasoningEfforts: efforts })).reasoning_effort;
  assert.equal(pick(["low", "medium", "high"]), "medium");
  assert.equal(pick(["low", "high"]), "high");
  assert.equal(pick(["low", "xhigh"]), "low");
});

test("an empty or all-invalid list writes no reasoning keys", () => {
  for (const efforts of [[], ["ultra", "nope"]]) {
    const out = applyGrokBuildConfig("", { ...base, reasoningEfforts: efforts });
    assert.doesNotMatch(out, /reasoning/);
  }
});

test("re-apply replaces the effort tables and a later apply without efforts removes them", () => {
  const first = applyGrokBuildConfig("", { ...base, reasoningEfforts: ["low", "high"] });
  const second = applyGrokBuildConfig(first, { ...base, reasoningEfforts: ["medium"] });
  assert.deepEqual(
    modelTable(second).reasoning_efforts?.map((r) => r.id),
    ["medium"]
  );
  const third = applyGrokBuildConfig(second, base);
  assert.doesNotMatch(third, /reasoning/);
  assert.equal(modelTable(third).context_window, 500000);
});

test("reset removes the effort tables with the model slot and keeps unrelated TOML", () => {
  const source = '# keep me\n[models]\ntheme = "dark"\n';
  const applied = applyGrokBuildConfig(source, { ...base, reasoningEfforts: ["low", "high"] });
  const reset = resetGrokBuildConfig(applied);
  assert.doesNotMatch(reset, /reasoning|omniroute/);
  assert.match(reset, /# keep me/);
  assert.match(reset, /theme = "dark"/);
});

test("the main slot effort tables do not touch a subagent slot", () => {
  const out = applyGrokBuildConfig("", {
    ...base,
    reasoningEfforts: ["low", "high"],
    subagentModels: { explore: { model: "xai/grok-4.7-mini", contextWindow: 200000 } },
  });
  assert.equal(modelTable(out, "omniroute-explore").reasoning_efforts, undefined);
  assert.equal(modelTable(out).reasoning_efforts?.length, 2);
});

test("the settings route passes efforts to the writer only when the body carries them", async () => {
  const fs = await import("node:fs");
  const os = await import("node:os");
  const path = await import("node:path");
  const home = fs.mkdtempSync(path.join(os.tmpdir(), "grok-efforts-route-"));
  const prior = { GROK_HOME: process.env.GROK_HOME, DATA_DIR: process.env.DATA_DIR };
  process.env.GROK_HOME = home;
  process.env.DATA_DIR = path.join(home, "data");
  const route = await import("../../src/app/api/cli-tools/grok-build-settings/route.ts");
  const post = (body: Record<string, unknown>) =>
    route.POST(
      new Request("http://localhost/api/cli-tools/grok-build-settings", {
        method: "POST",
        headers: { "content-type": "application/json", host: "localhost" },
        body: JSON.stringify({
          baseUrl: "http://localhost:20128",
          apiKey: "k-test",
          model: "xai/grok-4.7",
          ...body,
        }),
      })
    );
  try {
    const without = await post({});
    assert.equal(without.status, 200);
    const plain = fs.readFileSync(path.join(home, "config.toml"), "utf8");
    assert.doesNotMatch(plain, /reasoning/);

    const withEfforts = await post({ reasoningEfforts: ["low", "high", "ultra"] });
    assert.equal(withEfforts.status, 200);
    const toml = fs.readFileSync(path.join(home, "config.toml"), "utf8");
    assert.match(toml, /supports_reasoning_effort = true/);
    assert.equal((toml.match(/\[\[model\.omniroute\.reasoning_efforts\]\]/g) ?? []).length, 2);
  } finally {
    for (const [key, value] of Object.entries(prior)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    fs.rmSync(home, { recursive: true, force: true });
  }
});

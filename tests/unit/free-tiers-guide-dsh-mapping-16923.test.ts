import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * #16923: docs/getting-started/FREE-TIERS-GUIDE.md maps the dsh "Our Free Model" plugin's two
 * upstream lanes onto existing OmniRoute providers instead of adding a new provider. These
 * cases pin every fact that section states, so a registry or policy change that makes the
 * guide wrong fails here instead of silently drifting.
 */

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-dsh-guide-16923-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { parseModel } = await import("../../open-sse/services/model.ts");
const { isFreeModel, providerHasFreeModels } = await import("../../src/shared/utils/freeModels.ts");

const GUIDE = fs.readFileSync(
  path.join(import.meta.dirname, "../../docs/getting-started/FREE-TIERS-GUIDE.md"),
  "utf8"
);
const REMOVED = fs.readFileSync(
  path.join(import.meta.dirname, "../../docs/reference/REMOVED_PROVIDERS.md"),
  "utf8"
);

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("the guide carries the dsh mapping section", () => {
  assert.match(GUIDE, /## Coming From dsh "Our Free Model"/);
});

test("Kilo lane: kilo-gateway is keyless-capable, aliased kg, passthrough, with kilo-auto/free", () => {
  const kilo = REGISTRY["kilo-gateway"];
  assert.ok(kilo, "kilo-gateway must exist");
  assert.equal(kilo.alias, "kg");
  assert.equal(kilo.authType, "optional");
  assert.equal(kilo.passthroughModels, true);
  assert.equal(kilo.baseUrl, "https://api.kilo.ai/api/gateway/chat/completions");
  assert.ok(kilo.models.some((m: { id: string }) => m.id === "kilo-auto/free"));
  assert.equal(providerHasFreeModels("kilo-gateway"), true);
  assert.equal(isFreeModel("kilo-gateway", { id: "kilo-auto/free" }), true);
});

test("Kilo lane: the documented kg/<model> example resolves to kilo-gateway", () => {
  const parsed = parseModel("kg/kilo-auto/free");
  assert.equal(parsed.provider, "kilo-gateway");
  assert.equal(parsed.model, "kilo-auto/free");
});

test("OpenCode lane: opencode-zen needs a key and lists the plugin's free-lane ids", () => {
  const zen = REGISTRY["opencode-zen"];
  assert.ok(zen, "opencode-zen must exist");
  assert.equal(zen.authType, "apikey");
  const ids = new Set<string>();
  for (const m of zen.models as Array<{ id: string; aliases?: string[] }>) {
    ids.add(m.id);
    for (const a of m.aliases ?? []) ids.add(a);
  }
  for (const id of [
    "deepseek-v4.1-flash-free",
    "deepseek-v4-flash-free",
    "mimo-v2.6-flash-free",
    "nemotron-3.5-lightning-free",
  ]) {
    assert.ok(ids.has(id), `${id} must stay in the opencode-zen catalog`);
  }
});

test("OpenCode lane: OmniRoute neither offers a keyless OpenCode provider nor badges the offer free", () => {
  assert.equal(REGISTRY["opencode"], undefined);
  assert.match(REMOVED, /\|\s*`opencode`\s*\|\s*`oc`\s*\|/);
  assert.equal(providerHasFreeModels("opencode-zen"), false);
  assert.equal(isFreeModel("opencode-zen", { id: "deepseek-v4.1-flash-free" }), false);
});

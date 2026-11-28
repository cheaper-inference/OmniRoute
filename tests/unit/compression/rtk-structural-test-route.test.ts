import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { cleanupTempDataDir } from "../../_setup/tempDataDir.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rtk-test-route-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
process.env.DATA_DIR = TEST_DATA_DIR;
delete process.env.INITIAL_PASSWORD;

const route = await import("../../../src/app/api/context/rtk/test/route.ts");
const { RTK_STRUCTURAL_RENDERERS_FLAG } =
  await import("../../../open-sse/services/compression/engines/rtk/structuralFlag.ts");

const FLAG_RESOLVER_KEY = Symbol.for("omniroute.featureFlagResolver");
const store = globalThis as Record<symbol, unknown>;
const originalResolver = store[FLAG_RESOLVER_KEY];

const DIFF = [
  "diff --git a/a.txt b/a.txt",
  "index 1111111..2222222 100644",
  "--- a/a.txt",
  "+++ b/a.txt",
  "@@ -1,5 +1,5 @@",
  " one",
  " two",
  "-three",
  "+THREE",
  " four",
  " five",
  "",
].join("\n");

function countFlagLookups(value: boolean): { count: number } {
  const lookups = { count: 0 };
  store[FLAG_RESOLVER_KEY] = (key: string) => {
    if (key !== RTK_STRUCTURAL_RENDERERS_FLAG) return false;
    lookups.count++;
    return value;
  };
  return lookups;
}

async function preview(config?: Record<string, unknown>) {
  const res = await route.POST(
    new Request("http://localhost/api/context/rtk/test", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text: DIFF, command: "git diff", config }),
    })
  );
  assert.equal(res.status, 200);
  return (await res.json()) as { text: string; techniquesUsed: string[] };
}

test.afterEach(() => {
  if (originalResolver === undefined) delete store[FLAG_RESOLVER_KEY];
  else store[FLAG_RESOLVER_KEY] = originalResolver;
});

test.after(async () => {
  await cleanupTempDataDir(TEST_DATA_DIR);
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_INITIAL_PASSWORD !== undefined)
    process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
});

test("the preview never resolves the structural flag while its gate is closed", async () => {
  const lookups = countFlagLookups(true);
  for (const config of [
    undefined,
    { enableRenderers: false },
    { enableRenderers: true, applyToToolResults: false },
  ]) {
    const out = await preview(config);
    assert.ok(!out.techniquesUsed.includes("rtk-render:unified-diff"), JSON.stringify(config));
  }
  assert.equal(lookups.count, 0);
});

test("the preview resolves the flag once and renders when the gate is open", async () => {
  const lookups = countFlagLookups(true);
  const on = await preview({ enableRenderers: true });
  assert.ok(on.techniquesUsed.includes("rtk-render:unified-diff"), on.techniquesUsed.join(","));
  assert.equal(lookups.count, 1);
  lookups.count = 0;
  countFlagLookups(false);
  const off = await preview({ enableRenderers: true });
  assert.ok(!off.techniquesUsed.includes("rtk-render:unified-diff"));
});

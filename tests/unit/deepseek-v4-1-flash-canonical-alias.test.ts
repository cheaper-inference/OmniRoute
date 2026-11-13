import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-deepseek-alias-"));

const { getModelInfoCore } = await import("../../open-sse/services/model.ts");
const { resolveCanonicalProviderModel } =
  await import("../../open-sse/services/modelCanonicalization.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

test.after(() => {
  resetDbInstance();
});

// The registry lists `deepseek-v4-1-flash` as an alias of `deepseek-flash`, but the canonical
// map only knew the two dotted spellings. A prefixed request kept the unknown hyphen id and
// sent it upstream.
test("the hyphen alias canonicalizes to deepseek-flash like the dotted aliases", () => {
  assert.deepEqual(resolveCanonicalProviderModel("deepseek", "deepseek-v4-1-flash"), {
    provider: "deepseek",
    model: "deepseek-flash",
  });
});

test("a prefixed deepseek/deepseek-v4-1-flash request routes to deepseek-flash", async () => {
  const info = await getModelInfoCore("deepseek/deepseek-v4-1-flash", {});
  assert.equal(info.errorType, undefined);
  assert.equal(info.provider, "deepseek");
  assert.equal(info.model, "deepseek-flash");
});

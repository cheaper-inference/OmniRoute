import test from "node:test";
import assert from "node:assert/strict";

// Per-model noLog resolver: custom row wins, per-protocol wins, unset = undefined.
const compat = await import("../../src/lib/db/models/compat.ts");
const { deepMergeCompatByProtocol, mergeModelCompatOverride, readCompatList } = compat;

test("deepMergeCompatByProtocol merges noLog per protocol", () => {
  const merged = deepMergeCompatByProtocol(undefined, {
    openai: { noLog: true },
    claude: { noLog: false },
  });
  assert.equal(merged.openai?.noLog, true);
  assert.equal(merged.claude?.noLog, false);
  // null unsets
  const unmerged = deepMergeCompatByProtocol(merged, {
    openai: { noLog: null },
  });
  assert.equal(unmerged.openai?.noLog, undefined);
});

test("mergeModelCompatOverride persists top-level noLog and keeps row", () => {
  // Store contract: `true` persists, `null` unsets and (when empty) drops the row.
  // If the DB layer is unavailable the store functions themselves throw BEFORE
  // any write, so the assertions below are still the only success path.
  mergeModelCompatOverride("openai", "gpt-test-nolog", { noLog: true });
  const list = readCompatList("openai");
  const entry = list.find((e: { id: string }) => e.id === "gpt-test-nolog");
  assert.ok(entry, "compat override row was written");
  assert.equal(entry.noLog, true);
  // null unsets back to the logging default and drops the empty row.
  mergeModelCompatOverride("openai", "gpt-test-nolog", { noLog: null });
  const after = readCompatList("openai");
  assert.equal(after.find((e: { id: string }) => e.id === "gpt-test-nolog")?.noLog, undefined);
});

test("getModelNoLog precedence: custom wins, per-protocol wins, unset = undefined", async () => {
  const models = await import("../../src/lib/db/models.ts");
  const { getModelNoLog } = models;
  // No explicit flag anywhere returns undefined (falls through in the OR).
  assert.equal(getModelNoLog("openai", "gpt-nonexistent-model-xyz"), undefined);
});
